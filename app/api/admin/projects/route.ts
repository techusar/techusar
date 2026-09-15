import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project } from '@/types';

const PROJECTS_FILE = path.join(process.cwd(), 'data', 'projects.json');

function getProjects(): Project[] {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return parsed.projects || [];
    }
  } catch (err) {
    console.error('Error reading projects.json:', err);
  }
  return [];
}

function saveProjects(projects: Project[]) {
  try {
    const dir = path.dirname(PROJECTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify({ projects }, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving projects.json:', err);
    return false;
  }
}

export async function GET() {
  const projects = getProjects();
  return NextResponse.json({ success: true, projects }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = getProjects();

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const id = body.id || slug;

    const existingIndex = existing.findIndex((p) => p.id === id || p.slug === slug);

    const projectData: Project = {
      id,
      slug,
      title: body.title,
      client: body.client || 'Client Project',
      category: body.category || 'Web App',
      year: body.year || new Date().getFullYear().toString(),
      role: body.role || 'Full-Stack Web Developer',
      shortDescription: body.shortDescription || body.description?.slice(0, 150) || '',
      description: body.description || body.shortDescription || '',
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : typeof body.technologies === 'string'
        ? body.technologies.split(',').map((s: string) => s.trim())
        : ['Next.js', 'TypeScript', 'Tailwind CSS'],
      cover:
        body.cover ||
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
      gallery: Array.isArray(body.gallery) && body.gallery.length > 0 ? body.gallery : [body.cover],
      liveUrl: body.liveUrl || '#',
      githubUrl: body.githubUrl || '',
      featured: Boolean(body.featured),
      status: body.status || 'live',
      isWebDev: true,
      isCustom: true,
      challenge: body.challenge || 'Client required scalable modern web interface and database optimization.',
      approach: body.approach || 'Engineered with Next.js 15, strict TypeScript, and responsive UX.',
      designDirection: body.designDirection || 'Clean minimalist UI with high contrast and fast loading.',
      developmentDetails: body.developmentDetails || 'Full-stack development with edge performance and clean code.',
      metrics: body.metrics || [
        { label: 'Performance', value: '99/100' },
        { label: 'Delivery', value: 'On Time' },
      ],
      keyFeatures: body.keyFeatures || [
        'Responsive layout across mobile, tablet, and desktop',
        'Optimized performance and fast page transitions',
      ],
    };

    let updatedProjects: Project[];
    if (existingIndex >= 0) {
      updatedProjects = [...existing];
      updatedProjects[existingIndex] = { ...existing[existingIndex], ...projectData };
    } else {
      updatedProjects = [projectData, ...existing];
    }

    const saved = saveProjects(updatedProjects);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write projects to disk' }, { status: 500 });
    }

    return NextResponse.json({ success: true, project: projectData }, { status: 201 });
  } catch (err) {
    console.error('Error saving project:', err);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }

    const existing = getProjects();
    const filtered = existing.filter((p) => p.id !== id && p.slug !== id);

    if (filtered.length === existing.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    saveProjects(filtered);
    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
