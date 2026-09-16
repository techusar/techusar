import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

export async function GET() {
  const dataDir = path.join(process.cwd(), 'data');

  const settingsFile = path.join(dataDir, 'site-settings.json');
  const projectsFile = path.join(dataDir, 'projects.json');
  const themesFile = path.join(dataDir, 'themes.json');
  const designsFile = path.join(dataDir, 'design-projects.json');
  const blogsFile = path.join(dataDir, 'blog-posts.json');
  const mediaFile = path.join(dataDir, 'uploaded-media.json');

  const settings = readJsonFile(settingsFile, {
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

  const projectsData = readJsonFile(projectsFile, { projects: [] });
  const themesData = readJsonFile(themesFile, { themes: [] });
  const designsData = readJsonFile(designsFile, { designProjects: [] });
  const blogsData = readJsonFile(blogsFile, { posts: [] });
  const mediaData = readJsonFile(mediaFile, { media: [] });

  return NextResponse.json(
    {
      success: true,
      settings,
      projects: projectsData.projects || [],
      themes: themesData.themes || [],
      designs: designsData.designProjects || [],
      blogs: blogsData.posts || [],
      media: mediaData.media || [],
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
      },
    }
  );
}
