import { NextRequest, NextResponse } from 'next/server';
import { Project } from '@/types';
import { getDbProjects, saveDbProject, deleteDbProject, isDbConfigured } from '@/lib/db';
import { validateAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const projects = await getDbProjects();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    projects,
  });
}

export async function POST(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse();
  }

  try {
    const body = await req.json();

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

    const projectData: Project = {
      id,
      slug,
      title: String(body.title).slice(0, 200),
      client: String(body.client || 'Client Project').slice(0, 100),
      category: body.category || 'Web App',
      year: body.year || new Date().getFullYear().toString(),
      role: body.role || 'Full-Stack Web Developer',
      shortDescription: body.shortDescription || body.description?.slice(0, 150) || '',
      description: body.description || body.shortDescription || '',
      technologies: Array.isArray(body.technologies)
        ? body.technologies.slice(0, 20).map((s: unknown) => String(s).slice(0, 50))
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
        { label: 'Quality Audit', value: 'Verified' },
        { label: 'Delivery', value: 'On Time' },
      ],
      keyFeatures: body.keyFeatures || [
        'Responsive layout across mobile, tablet, and desktop',
        'Optimized performance and fast page transitions',
      ],
    };

    const saved = await saveDbProject(projectData);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write project to database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      project: projectData,
    }, { status: 201 });
  } catch (err) {
    console.error('Error saving project:', err);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse();
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }

    const deleted = await deleteDbProject(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      deletedId: id,
    }, { status: 200 });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
