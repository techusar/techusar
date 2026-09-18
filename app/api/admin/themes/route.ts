import { NextRequest, NextResponse } from 'next/server';
import { Theme } from '@/types';
import { getDbThemes, saveDbTheme, deleteDbTheme, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const themes = await getDbThemes();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    themes,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
      demoUrl: body.demoUrl || 'https://techusar.dev/themes',
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

    const saved = await saveDbTheme(themeData);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write theme to database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      theme: themeData,
    }, { status: 200 });
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

    const deleted = await deleteDbTheme(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete theme' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      message: 'Theme deleted',
    }, { status: 200 });
  } catch (err) {
    console.error('Error deleting theme:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
