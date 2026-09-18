import { neon, neonConfig } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { Project, Theme, DesignProject } from '@/types';
import { BlogPost } from '@/lib/blog';
import { projects as defaultProjects } from '@/data/projects';
import { themes as defaultThemes } from '@/data/themes';
import { designProjects as defaultDesigns } from '@/data/design-projects';

// Optional: Enable connection caching if in serverless environment
neonConfig.fetchConnectionCache = true;

const DATA_DIR = path.join(process.cwd(), 'data');

// Helper to get Database URL from various standard environment names
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  );
}

export function isDbConfigured(): boolean {
  const url = getDatabaseUrl();
  return Boolean(url && url.trim().length > 0 && url.startsWith('postgres'));
}

// SQL query runner for Neon
function getSqlClient() {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) return null;
  return neon(dbUrl);
}

// File system fallbacks
function readJson<T>(filename: string, fallback: T): T {
  try {
    const p = path.join(DATA_DIR, filename);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn(`[DB] Error reading fallback file ${filename}:`, err);
  }
  return fallback;
}

function writeJson(filename: string, data: unknown) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const p = path.join(DATA_DIR, filename);
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`[DB] Error writing fallback file ${filename}:`, err);
  }
}

// Database schema initialization
let schemaInitialized = false;
let initPromise: Promise<boolean> | null = null;

async function runSchemaInit(sql: NonNullable<ReturnType<typeof getSqlClient>>): Promise<boolean> {
  const tableDefinitions = [
    {
      name: 'site_settings',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'projects',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          slug TEXT,
          data JSONB NOT NULL,
          order_index INT DEFAULT 0,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'themes',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS themes (
          id TEXT PRIMARY KEY,
          slug TEXT,
          data JSONB NOT NULL,
          order_index INT DEFAULT 0,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'design_projects',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS design_projects (
          id TEXT PRIMARY KEY,
          slug TEXT,
          data JSONB NOT NULL,
          order_index INT DEFAULT 0,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'blog_posts',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id TEXT PRIMARY KEY,
          slug TEXT,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'media_uploads',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS media_uploads (
          id TEXT PRIMARY KEY,
          filename TEXT NOT NULL,
          url TEXT NOT NULL,
          size INT DEFAULT 0,
          type TEXT DEFAULT 'general',
          title TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'submissions',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS submissions (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          data JSONB NOT NULL,
          status TEXT DEFAULT 'new',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
    {
      name: 'analytics_events',
      query: () => sql`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id TEXT PRIMARY KEY,
          event_type TEXT NOT NULL,
          data JSONB NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    },
  ];

  for (const table of tableDefinitions) {
    try {
      await table.query();
    } catch (err: unknown) {
      const errMsg = String(err);
      // Ignore benign concurrency race errors where pg_type or table was created simultaneously
      if (
        errMsg.includes('already exists') ||
        errMsg.includes('pg_type_typname_nsp_index') ||
        errMsg.includes('duplicate key')
      ) {
        // Table or type was created by concurrent query
      } else {
        console.warn(`[Neon DB] Note on creating table ${table.name}:`, err);
      }
    }
  }

  // Auto-seed if empty
  await autoSeedIfEmpty(sql);

  return true;
}

export async function initDbSchema(): Promise<boolean> {
  const sql = getSqlClient();
  if (!sql) return false;
  if (schemaInitialized) return true;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const ok = await runSchemaInit(sql);
      if (ok) {
        schemaInitialized = true;
        console.log('[Neon DB] Schema tables verified and ready.');
      }
      return ok;
    } catch (err) {
      console.error('[Neon DB] Failed to initialize schema:', err);
      return false;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

// Auto seed default data into Neon DB if database tables are empty
async function autoSeedIfEmpty(sql: NonNullable<ReturnType<typeof getSqlClient>>) {
  try {
    // 1. Site settings seed
    try {
      const settingsCheck = await sql`SELECT key FROM site_settings WHERE key = 'main' LIMIT 1`;
      if (settingsCheck.length === 0) {
        const defaultSettings = readJson('site-settings.json', {
          logoUrl: '',
          brandName: 'TechUsar',
          tagline: 'Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder',
          ownerName: 'Hafiz Muhammad Usman',
          heroTitle: 'Hafiz Muhammad Usman',
          heroSubtitle: 'Senior Graphic Designer (5+ Years) & Full-Stack Next.js Developer (2+ Years). Crafting high-converting web apps, digital brand identities, custom AI bots, and accounting tools.',
          heroBadge: 'Available for Custom AI Agents & Web Projects',
          heroAvatarUrl: '',
          bannerUrl: '',
          phone: '+92 331 8917330',
          displayPhone: '0331-8917330',
          whatsapp: 'https://wa.me/923318917330',
          whatsappNumber: '923318917330',
          email: 'techusar17@gmail.com',
          location: 'Kharadar Lyari, Karachi, Pakistan',
          bio: 'Hafiz-e-Quran, graphic designer with 5+ years experience and full-stack software engineer.',
          githubUrl: 'https://github.com/TechUsar',
          linkedinUrl: 'https://linkedin.com',
          behanceUrl: 'https://behance.net',
          dribbbleUrl: 'https://dribbble.com',
        });
        await sql`
          INSERT INTO site_settings (key, data, updated_at)
          VALUES ('main', ${JSON.stringify(defaultSettings)}::jsonb, NOW())
          ON CONFLICT (key) DO NOTHING
        `;
      }
    } catch (err) {
      console.warn('[Neon DB] Seed site_settings skipped:', err);
    }

    // 2. Projects seed
    try {
      const projectsCheck = await sql`SELECT id FROM projects LIMIT 1`;
      if (projectsCheck.length === 0) {
        const stored = readJson<{ projects?: Project[] }>('projects.json', { projects: defaultProjects });
        const list = Array.isArray(stored.projects) && stored.projects.length > 0 ? stored.projects : defaultProjects;
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          await sql`
            INSERT INTO projects (id, slug, data, order_index, updated_at)
            VALUES (${item.id}, ${item.slug || item.id}, ${JSON.stringify(item)}::jsonb, ${i}, NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        }
      }
    } catch (err) {
      console.warn('[Neon DB] Seed projects skipped:', err);
    }

    // 3. Themes seed
    try {
      const themesCheck = await sql`SELECT id FROM themes LIMIT 1`;
      if (themesCheck.length === 0) {
        const stored = readJson<{ themes?: Theme[] }>('themes.json', { themes: defaultThemes });
        const list = Array.isArray(stored.themes) && stored.themes.length > 0 ? stored.themes : defaultThemes;
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          await sql`
            INSERT INTO themes (id, slug, data, order_index, updated_at)
            VALUES (${item.id}, ${item.slug || item.id}, ${JSON.stringify(item)}::jsonb, ${i}, NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        }
      }
    } catch (err) {
      console.warn('[Neon DB] Seed themes skipped:', err);
    }

    // 4. Design Projects seed
    try {
      const designsCheck = await sql`SELECT id FROM design_projects LIMIT 1`;
      if (designsCheck.length === 0) {
        const stored = readJson<{ designProjects?: DesignProject[] }>('design-projects.json', { designProjects: defaultDesigns });
        const list = Array.isArray(stored.designProjects) && stored.designProjects.length > 0 ? stored.designProjects : defaultDesigns;
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          await sql`
            INSERT INTO design_projects (id, slug, data, order_index, updated_at)
            VALUES (${item.id}, ${item.slug || item.id}, ${JSON.stringify(item)}::jsonb, ${i}, NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        }
      }
    } catch (err) {
      console.warn('[Neon DB] Seed design_projects skipped:', err);
    }

    // 5. Blogs seed
    try {
      const blogsCheck = await sql`SELECT id FROM blog_posts LIMIT 1`;
      if (blogsCheck.length === 0) {
        const stored = readJson<BlogPost[]>('blog-posts.json', []);
        for (const item of stored) {
          await sql`
            INSERT INTO blog_posts (id, slug, data, updated_at)
            VALUES (${item.id}, ${item.slug}, ${JSON.stringify(item)}::jsonb, NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        }
      }
    } catch (err) {
      console.warn('[Neon DB] Seed blog_posts skipped:', err);
    }
  } catch (seedErr) {
    console.warn('[Neon DB] Auto-seed non-fatal error:', seedErr);
  }
}

// ----------------------------------------------------
// SITE SETTINGS CRUD
// ----------------------------------------------------
export async function getDbSiteSettings(): Promise<Record<string, unknown>> {
  const fallback = readJson('site-settings.json', {
    logoUrl: '',
    brandName: 'TechUsar',
    tagline: 'Graphic Designer & Full-Stack Developer | Custom AI Agents & Bot Builder',
    ownerName: 'Hafiz Muhammad Usman',
    heroTitle: 'Hafiz Muhammad Usman',
    heroSubtitle: 'Senior Graphic Designer (5+ Years) & Full-Stack Next.js Developer (2+ Years). Crafting high-converting web apps, digital brand identities, custom AI bots, and accounting tools.',
    heroBadge: 'Available for Custom AI Agents & Web Projects',
    heroAvatarUrl: '',
    bannerUrl: '',
    phone: '+92 331 8917330',
    displayPhone: '0331-8917330',
    whatsapp: 'https://wa.me/923318917330',
    whatsappNumber: '923318917330',
    email: 'techusar17@gmail.com',
    location: 'Kharadar Lyari, Karachi, Pakistan',
    bio: 'Hafiz-e-Quran, graphic designer with 5+ years experience and full-stack software engineer.',
    githubUrl: 'https://github.com/techusar',
    linkedinUrl: 'https://www.linkedin.com/in/hafiz-muhammad-usman-514888397/',
    twitterUrl: 'https://x.com/techusar',
    behanceUrl: 'https://behance.net',
    dribbbleUrl: 'https://dribbble.com',
  });

  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM site_settings WHERE key = 'main' LIMIT 1`;
    if (rows.length > 0 && rows[0].data) {
      return { ...fallback, ...(rows[0].data as Record<string, unknown>) };
    }
  } catch (err) {
    console.error('[Neon DB] getDbSiteSettings error:', err);
  }
  return fallback;
}

export async function saveDbSiteSettings(settings: Record<string, unknown>): Promise<boolean> {
  // Always write fallback to JSON file as well
  writeJson('site-settings.json', settings);

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO site_settings (key, data, updated_at)
      VALUES ('main', ${JSON.stringify(settings)}::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE SET
        data = ${JSON.stringify(settings)}::jsonb,
        updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbSiteSettings error:', err);
    return false;
  }
}

// ----------------------------------------------------
// PROJECTS CRUD
// ----------------------------------------------------
export async function getDbProjects(): Promise<Project[]> {
  const fallback = readJson<{ projects?: Project[] }>('projects.json', { projects: defaultProjects }).projects || defaultProjects;
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM projects ORDER BY order_index ASC, updated_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => r.data as Project);
    }
  } catch (err) {
    console.error('[Neon DB] getDbProjects error:', err);
  }
  return fallback;
}

export async function saveDbProject(project: Project): Promise<boolean> {
  // Update local fallback
  const existing = readJson<{ projects?: Project[] }>('projects.json', { projects: defaultProjects }).projects || [];
  const idx = existing.findIndex((p) => p.id === project.id || p.slug === project.slug);
  if (idx >= 0) existing[idx] = project;
  else existing.unshift(project);
  writeJson('projects.json', { projects: existing });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO projects (id, slug, data, updated_at)
      VALUES (${project.id}, ${project.slug || project.id}, ${JSON.stringify(project)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        slug = ${project.slug || project.id},
        data = ${JSON.stringify(project)}::jsonb,
        updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbProject error:', err);
    return false;
  }
}

export async function deleteDbProject(id: string): Promise<boolean> {
  const existing = readJson<{ projects?: Project[] }>('projects.json', { projects: defaultProjects }).projects || [];
  const filtered = existing.filter((p) => p.id !== id);
  writeJson('projects.json', { projects: filtered });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbProject error:', err);
    return false;
  }
}

// ----------------------------------------------------
// THEMES CRUD
// ----------------------------------------------------
export async function getDbThemes(): Promise<Theme[]> {
  const fallback = readJson<{ themes?: Theme[] }>('themes.json', { themes: defaultThemes }).themes || defaultThemes;
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM themes ORDER BY order_index ASC, updated_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => r.data as Theme);
    }
  } catch (err) {
    console.error('[Neon DB] getDbThemes error:', err);
  }
  return fallback;
}

export async function saveDbTheme(theme: Theme): Promise<boolean> {
  const existing = readJson<{ themes?: Theme[] }>('themes.json', { themes: defaultThemes }).themes || [];
  const idx = existing.findIndex((t) => t.id === theme.id || t.slug === theme.slug);
  if (idx >= 0) existing[idx] = theme;
  else existing.unshift(theme);
  writeJson('themes.json', { themes: existing });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO themes (id, slug, data, updated_at)
      VALUES (${theme.id}, ${theme.slug || theme.id}, ${JSON.stringify(theme)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        slug = ${theme.slug || theme.id},
        data = ${JSON.stringify(theme)}::jsonb,
        updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbTheme error:', err);
    return false;
  }
}

export async function deleteDbTheme(id: string): Promise<boolean> {
  const existing = readJson<{ themes?: Theme[] }>('themes.json', { themes: defaultThemes }).themes || [];
  const filtered = existing.filter((t) => t.id !== id);
  writeJson('themes.json', { themes: filtered });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM themes WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbTheme error:', err);
    return false;
  }
}

// ----------------------------------------------------
// DESIGN PROJECTS CRUD
// ----------------------------------------------------
export async function getDbDesigns(): Promise<DesignProject[]> {
  const fallback = readJson<{ designProjects?: DesignProject[] }>('design-projects.json', { designProjects: defaultDesigns }).designProjects || defaultDesigns;
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM design_projects ORDER BY order_index ASC, updated_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => r.data as DesignProject);
    }
  } catch (err) {
    console.error('[Neon DB] getDbDesigns error:', err);
  }
  return fallback;
}

export async function saveDbDesign(design: DesignProject): Promise<boolean> {
  const existing = readJson<{ designProjects?: DesignProject[] }>('design-projects.json', { designProjects: defaultDesigns }).designProjects || [];
  const idx = existing.findIndex((d) => d.id === design.id || d.slug === design.slug);
  if (idx >= 0) existing[idx] = design;
  else existing.unshift(design);
  writeJson('design-projects.json', { designProjects: existing });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO design_projects (id, slug, data, updated_at)
      VALUES (${design.id}, ${design.slug || design.id}, ${JSON.stringify(design)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        slug = ${design.slug || design.id},
        data = ${JSON.stringify(design)}::jsonb,
        updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbDesign error:', err);
    return false;
  }
}

export async function deleteDbDesign(id: string): Promise<boolean> {
  const existing = readJson<{ designProjects?: DesignProject[] }>('design-projects.json', { designProjects: defaultDesigns }).designProjects || [];
  const filtered = existing.filter((d) => d.id !== id);
  writeJson('design-projects.json', { designProjects: filtered });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM design_projects WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbDesign error:', err);
    return false;
  }
}

// ----------------------------------------------------
// BLOGS CRUD
// ----------------------------------------------------
export async function getDbBlogs(): Promise<BlogPost[]> {
  const fallback = readJson<BlogPost[]>('blog-posts.json', []);
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM blog_posts ORDER BY updated_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => r.data as BlogPost);
    }
  } catch (err) {
    console.error('[Neon DB] getDbBlogs error:', err);
  }
  return fallback;
}

export async function saveDbBlog(post: BlogPost): Promise<boolean> {
  const existing = readJson<BlogPost[]>('blog-posts.json', []);
  const idx = existing.findIndex((p) => p.id === post.id || p.slug === post.slug);
  if (idx >= 0) existing[idx] = post;
  else existing.unshift(post);
  writeJson('blog-posts.json', existing);

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO blog_posts (id, slug, data, updated_at)
      VALUES (${post.id}, ${post.slug}, ${JSON.stringify(post)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        slug = ${post.slug},
        data = ${JSON.stringify(post)}::jsonb,
        updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbBlog error:', err);
    return false;
  }
}

export async function deleteDbBlog(id: string): Promise<boolean> {
  const existing = readJson<BlogPost[]>('blog-posts.json', []);
  const filtered = existing.filter((p) => p.id !== id);
  writeJson('blog-posts.json', filtered);

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbBlog error:', err);
    return false;
  }
}

// ----------------------------------------------------
// MEDIA CRUD
// ----------------------------------------------------
export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  title?: string;
  createdAt: string;
}

export async function getDbMedia(): Promise<MediaItem[]> {
  const fallback = readJson<{ media?: MediaItem[] }>('uploaded-media.json', { media: [] }).media || [];
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT id, filename, url, size, type, title, created_at FROM media_uploads ORDER BY created_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => ({
        id: r.id as string,
        filename: r.filename as string,
        url: r.url as string,
        size: Number(r.size) || 0,
        type: (r.type as string) || 'general',
        title: (r.title as string) || '',
        createdAt: r.created_at ? new Date(r.created_at as string).toISOString() : new Date().toISOString(),
      }));
    }
  } catch (err) {
    console.error('[Neon DB] getDbMedia error:', err);
  }
  return fallback;
}

export async function saveDbMedia(item: MediaItem): Promise<boolean> {
  const existing = readJson<{ media?: MediaItem[] }>('uploaded-media.json', { media: [] }).media || [];
  existing.unshift(item);
  writeJson('uploaded-media.json', { media: existing });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO media_uploads (id, filename, url, size, type, title, created_at)
      VALUES (${item.id}, ${item.filename}, ${item.url}, ${item.size || 0}, ${item.type || 'general'}, ${item.title || ''}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        filename = ${item.filename},
        url = ${item.url},
        size = ${item.size || 0},
        type = ${item.type || 'general'},
        title = ${item.title || ''}
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbMedia error:', err);
    return false;
  }
}

export async function deleteDbMedia(id: string): Promise<boolean> {
  const existing = readJson<{ media?: MediaItem[] }>('uploaded-media.json', { media: [] }).media || [];
  const filtered = existing.filter((m) => m.id !== id);
  writeJson('uploaded-media.json', { media: filtered });

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM media_uploads WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbMedia error:', err);
    return false;
  }
}

// ----------------------------------------------------
// FORM SUBMISSIONS CRUD
// ----------------------------------------------------
export interface FormSubmissionRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  formType: string;
  projectType?: string;
  budget?: string;
  message: string;
  services?: string[];
  createdAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'archived';
  notes?: string;
  sourcePage?: string;
  whatsappUrl?: string;
}

export async function getDbSubmissions(): Promise<FormSubmissionRecord[]> {
  const fallback = readJson<FormSubmissionRecord[]>('submissions.json', []);
  const sql = getSqlClient();
  if (!sql) return fallback;

  try {
    await initDbSchema();
    const rows = await sql`SELECT data FROM submissions ORDER BY created_at DESC`;
    if (rows.length > 0) {
      return rows.map((r) => r.data as FormSubmissionRecord);
    }
  } catch (err) {
    console.error('[Neon DB] getDbSubmissions error:', err);
  }
  return fallback;
}

export async function saveDbSubmission(submission: FormSubmissionRecord): Promise<boolean> {
  const existing = readJson<FormSubmissionRecord[]>('submissions.json', []);
  const idx = existing.findIndex((s) => s.id === submission.id);
  if (idx >= 0) existing[idx] = submission;
  else existing.unshift(submission);
  writeJson('submissions.json', existing);

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`
      INSERT INTO submissions (id, name, email, data, status, created_at)
      VALUES (${submission.id}, ${submission.name || ''}, ${submission.email || ''}, ${JSON.stringify(submission)}::jsonb, ${submission.status || 'new'}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        name = ${submission.name || ''},
        email = ${submission.email || ''},
        data = ${JSON.stringify(submission)}::jsonb,
        status = ${submission.status || 'new'}
    `;
    return true;
  } catch (err) {
    console.error('[Neon DB] saveDbSubmission error:', err);
    return false;
  }
}

export async function deleteDbSubmission(id: string): Promise<boolean> {
  const existing = readJson<FormSubmissionRecord[]>('submissions.json', []);
  const filtered = existing.filter((s) => s.id !== id);
  writeJson('submissions.json', filtered);

  const sql = getSqlClient();
  if (!sql) return true;

  try {
    await initDbSchema();
    await sql`DELETE FROM submissions WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('[Neon DB] deleteDbSubmission error:', err);
    return false;
  }
}

// ----------------------------------------------------
// DATABASE HEALTH & STATUS
// ----------------------------------------------------
export async function testDbStatus(): Promise<{
  connected: boolean;
  provider: string;
  configured: boolean;
  databaseUrlMasked?: string;
  latencyMs?: number;
  tables?: {
    siteSettings: number;
    projects: number;
    themes: number;
    designs: number;
    blogs: number;
    media: number;
    submissions: number;
  };
  error?: string;
}> {
  const dbUrl = getDatabaseUrl();
  const configured = isDbConfigured();

  if (!configured || !dbUrl) {
    return {
      connected: false,
      provider: 'JSON Storage (Neon Database URL not configured)',
      configured: false,
      error: 'DATABASE_URL environment variable is not set. Add your Neon connection string in Settings/Secrets.',
    };
  }

  // Mask database URL for security (hide password)
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':••••••@');

  const start = Date.now();
  const sql = getSqlClient();
  if (!sql) {
    return {
      connected: false,
      provider: 'Neon PostgreSQL',
      configured: true,
      databaseUrlMasked: maskedUrl,
      error: 'Could not create SQL client.',
    };
  }

  try {
    const pingResult = await sql`SELECT 1 as ping`;
    const latency = Date.now() - start;

    if (pingResult.length > 0) {
      await initDbSchema();

      // Count records in tables safely
      let settingsCount = 0;
      let projectsCount = 0;
      let themesCount = 0;
      let designsCount = 0;
      let blogsCount = 0;
      let mediaCount = 0;
      let submissionsCount = 0;

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM site_settings`;
        settingsCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM projects`;
        projectsCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM themes`;
        themesCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM design_projects`;
        designsCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM blog_posts`;
        blogsCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM media_uploads`;
        mediaCount = res?.count || 0;
      } catch {}

      try {
        const [res] = await sql`SELECT count(*)::int as count FROM submissions`;
        submissionsCount = res?.count || 0;
      } catch {}

      return {
        connected: true,
        provider: 'Neon Serverless PostgreSQL',
        configured: true,
        databaseUrlMasked: maskedUrl,
        latencyMs: latency,
        tables: {
          siteSettings: settingsCount,
          projects: projectsCount,
          themes: themesCount,
          designs: designsCount,
          blogs: blogsCount,
          media: mediaCount,
          submissions: submissionsCount,
        },
      };
    }

    return {
      connected: false,
      provider: 'Neon PostgreSQL',
      configured: true,
      databaseUrlMasked: maskedUrl,
      error: 'Ping returned no result.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      provider: 'Neon PostgreSQL',
      configured: true,
      databaseUrlMasked: maskedUrl,
      error: errorMsg,
    };
  }
}
