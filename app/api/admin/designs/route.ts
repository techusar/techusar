import { NextRequest, NextResponse } from 'next/server';
import { DesignProject } from '@/types';
import { getDbDesigns, saveDbDesign, deleteDbDesign, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const designs = await getDbDesigns();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    designs,
  });
}

export async function POST(req: NextRequest) {
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

    const designData: DesignProject = {
      id,
      slug,
      title: body.title,
      category: body.category || 'Brand Identity',
      year: body.year || new Date().getFullYear().toString(),
      client: body.client || 'Private Client',
      cover:
        body.cover ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      gallery:
        Array.isArray(body.gallery) && body.gallery.length > 0
          ? body.gallery
          : [
              body.cover ||
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
            ],
      description: body.description || 'Comprehensive visual identity and graphic design system.',
      brief: body.brief || 'Develop a distinctive, high-impact design artifact.',
      concept: body.concept || 'Rooted in geometric Swiss balance and precision vector craftsmanship.',
      tools: Array.isArray(body.tools)
        ? body.tools
        : typeof body.tools === 'string'
        ? body.tools.split(',').map((s: string) => s.trim())
        : ['Adobe Illustrator', 'Photoshop', 'Figma'],
      colorPalette: Array.isArray(body.colorPalette) && body.colorPalette.length > 0
        ? body.colorPalette
        : [
            { hex: '#111827', name: 'Charcoal Noir' },
            { hex: '#F3F4F6', name: 'Pure Chalk' },
            { hex: '#2563EB', name: 'Cobalt Accent' },
          ],
      typography: Array.isArray(body.typography) && body.typography.length > 0
        ? body.typography
        : [{ family: 'Inter Display / Helvetica Neue', role: 'Display & Identity', sample: 'TECHUSAR DESIGN 2026' }],
      deliverables: Array.isArray(body.deliverables)
        ? body.deliverables
        : typeof body.deliverables === 'string'
        ? body.deliverables.split('\n').filter(Boolean)
        : ['Vector Logo Suite', 'Brand Guidelines Manual', 'Social Media Assets'],
      highlights: Array.isArray(body.highlights)
        ? body.highlights
        : typeof body.highlights === 'string'
        ? body.highlights.split('\n').filter(Boolean)
        : ['Custom bespoke vector icon set', '100% scalable vector artwork'],
    };

    const saved = await saveDbDesign(designData);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write design project to database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      design: designData,
    }, { status: 200 });
  } catch (err) {
    console.error('Error updating design project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deleted = await deleteDbDesign(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete design project' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      message: 'Design project deleted',
    }, { status: 200 });
  } catch (err) {
    console.error('Error deleting design project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
