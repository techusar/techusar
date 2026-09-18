import { NextResponse } from 'next/server';
import {
  getDbSiteSettings,
  getDbProjects,
  getDbThemes,
  getDbDesigns,
  getDbBlogs,
  getDbMedia,
  isDbConfigured,
} from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [settings, projects, themes, designs, blogs, media] = await Promise.all([
      getDbSiteSettings(),
      getDbProjects(),
      getDbThemes(),
      getDbDesigns(),
      getDbBlogs(),
      getDbMedia(),
    ]);

    return NextResponse.json(
      {
        success: true,
        source: isDbConfigured() ? 'neon_postgresql' : 'json_fallback',
        settings,
        projects,
        themes,
        designs,
        blogs,
        media,
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
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error fetching dynamic content from db:', err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
