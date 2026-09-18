import { NextRequest, NextResponse } from 'next/server';
import { getDbSiteSettings, saveDbSiteSettings, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const settings = await getDbSiteSettings();
  return NextResponse.json({
    success: true,
    source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
    settings,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = await getDbSiteSettings();
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveDbSiteSettings(updated);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to write settings to database' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      settings: updated,
    });
  } catch (err) {
    console.error('Error in settings POST:', err);
    return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 });
  }
}
