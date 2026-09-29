import { NextRequest, NextResponse } from 'next/server';
import { getDbSiteSettings, saveDbSiteSettings, isDbConfigured } from '@/lib/db';
import defaultSiteSettingsData from '@/data/site-settings.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getDbSiteSettings();
    return NextResponse.json({
      success: true,
      source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
      settings,
    });
  } catch (err) {
    console.warn('[Settings API] Fallback to default settings:', err);
    return NextResponse.json({
      success: true,
      source: 'json_fallback',
      settings: defaultSiteSettingsData,
    });
  }
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
