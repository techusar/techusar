import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DesignProject } from '@/types';
import { designProjects as defaultDesigns } from '@/data/design-projects';

const DESIGNS_FILE = path.join(process.cwd(), 'data', 'design-projects.json');

function getStoredDesigns(): DesignProject[] {
  try {
    if (fs.existsSync(DESIGNS_FILE)) {
      const content = fs.readFileSync(DESIGNS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.designProjects) && parsed.designProjects.length > 0) {
        return parsed.designProjects;
      }
    }
  } catch (err) {
    console.error('Error reading design-projects.json:', err);
  }
  return defaultDesigns;
}

function saveDesigns(designProjects: DesignProject[]) {
  try {
    const dir = path.dirname(DESIGNS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DESIGNS_FILE, JSON.stringify({ designProjects }, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving design-projects.json:', err);
    return false;
  }
}

export async function GET() {
  const designs = getStoredDesigns();
  return NextResponse.json({ success: true, designs }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = getStoredDesigns();

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
    const existingIndex = existing.findIndex((d) => d.id === id || d.slug === slug);

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

    let updatedDesigns: DesignProject[];
    if (existingIndex >= 0) {
      updatedDesigns = [...existing];
      updatedDesigns[existingIndex] = designData;
    } else {
      updatedDesigns = [designData, ...existing];
    }

    const saved = saveDesigns(updatedDesigns);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write design projects data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, design: designData }, { status: 200 });
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

    const existing = getStoredDesigns();
    const filtered = existing.filter((d) => d.id !== id && d.slug !== id);

    if (filtered.length === existing.length) {
      return NextResponse.json({ error: 'Design project not found' }, { status: 404 });
    }

    const saved = saveDesigns(filtered);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write design projects data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Design project deleted' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting design project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
