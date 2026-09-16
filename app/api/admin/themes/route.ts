import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Theme } from '@/types';
import { themes as defaultThemes } from '@/data/themes';

const THEMES_FILE = path.join(process.cwd(), 'data', 'themes.json');

function getStoredThemes(): Theme[] {
  try {
    if (fs.existsSync(THEMES_FILE)) {
      const content = fs.readFileSync(THEMES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.themes) && parsed.themes.length > 0) {
        return parsed.themes;
      }
    }
  } catch (err) {
    console.error('Error reading themes.json:', err);
  }
  return defaultThemes;
}

function saveThemes(themes: Theme[]) {
  try {
    const dir = path.dirname(THEMES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(THEMES_FILE, JSON.stringify({ themes }, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving themes.json:', err);
    return false;
  }
}

export async function GET() {
  const themes = getStoredThemes();
  return NextResponse.json({ success: true, themes }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = getStoredThemes();

    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const id = body.id || slug;
    const existingIndex = existing.findIndex((t) => t.id === id || t.slug === slug);

    const themeData: Theme = {
      id,
      slug,
      name: body.name,
      tagline: body.tagline || 'Modern production-ready web template.',
      description: body.description || body.tagline || '',
      category: body.category || 'SaaS',
      price: typeof body.price === 'number' ? body.price : Number(body.price) || 0,
      isFree: Boolean(body.isFree),
      isFeatured: Boolean(body.isFeatured),
      isPopular: Boolean(body.isPopular),
      technology: Array.isArray(body.technology)
        ? body.technology
        : typeof body.technology === 'string'
        ? body.technology.split(',').map((s: string) => s.trim())
        : ['Next.js 15', 'TypeScript', 'Tailwind CSS'],
      previewImage:
        body.previewImage ||
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      screenshots: {
        desktop:
          body.screenshots?.desktop ||
          body.previewImage ||
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
        tablet:
          body.screenshots?.tablet ||
          body.previewImage ||
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        mobile:
          body.screenshots?.mobile ||
          body.previewImage ||
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      },
      demoUrl: body.demoUrl || 'https://techusar.com/themes',
      purchaseUrl: body.purchaseUrl || '',
      features: Array.isArray(body.features)
        ? body.features
        : typeof body.features === 'string'
        ? body.features.split('\n').filter(Boolean)
        : ['Engineered with Next.js 15 App Router and React Server Components'],
      sectionsIncluded: Array.isArray(body.sectionsIncluded)
        ? body.sectionsIncluded
        : typeof body.sectionsIncluded === 'string'
        ? body.sectionsIncluded.split('\n').filter(Boolean)
        : ['Hero Section', 'Features Bento Grid', 'Pricing Table', 'FAQ Accordion'],
      releaseDate: body.releaseDate || new Date().toISOString().split('T')[0],
      version: body.version || '1.0.0',
      downloadsCount: Number(body.downloadsCount) || 120,
      rating: Number(body.rating) || 4.9,
      license:
        body.license ||
        'Standard Commercial License (Unlimited Personal & Commercial Projects)',
      overview: body.overview || body.description || '',
      techStack: {
        framework: body.techStack?.framework || 'Next.js 15 (App Router)',
        styling: body.techStack?.styling || 'Tailwind CSS v4',
        animations: body.techStack?.animations || 'Motion',
        icons: body.techStack?.icons || 'Lucide React',
        typeSafety: body.techStack?.typeSafety || 'Strict TypeScript',
      },
    };

    let updatedThemes: Theme[];
    if (existingIndex >= 0) {
      updatedThemes = [...existing];
      updatedThemes[existingIndex] = themeData;
    } else {
      updatedThemes = [themeData, ...existing];
    }

    const saved = saveThemes(updatedThemes);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write themes data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, theme: themeData }, { status: 200 });
  } catch (err) {
    console.error('Error updating theme:', err);
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

    const existing = getStoredThemes();
    const filtered = existing.filter((t) => t.id !== id && t.slug !== id);

    if (filtered.length === existing.length) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    const saved = saveThemes(filtered);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write themes data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Theme deleted' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting theme:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
