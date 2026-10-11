import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { validateAdminRequest, unauthorizedResponse } from '@/lib/adminAuth';

const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

export interface ClickRecord {
  id: string;
  element: string;
  label: string;
  page: string;
  category?: string;
  timestamp: string;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  pageViews: Record<string, number>;
  clicksByTarget: Record<string, number>;
  recentClicks: ClickRecord[];
  dailyStats: Record<string, { visits: number; unique: number; clicks: number; formsFilled: number }>;
}

async function getAnalytics(): Promise<AnalyticsData> {
  try {
    const raw = await fs.readFile(ANALYTICS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      totalVisits: parsed.totalVisits || 0,
      uniqueVisitors: parsed.uniqueVisitors || 0,
      totalClicks: parsed.totalClicks || 0,
      pageViews: parsed.pageViews || {},
      clicksByTarget: parsed.clicksByTarget || {},
      recentClicks: Array.isArray(parsed.recentClicks) ? parsed.recentClicks : [],
      dailyStats: parsed.dailyStats || {},
    };
  } catch {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      totalClicks: 0,
      pageViews: {},
      clicksByTarget: {},
      recentClicks: [],
      dailyStats: {},
    };
  }
}

async function saveAnalytics(data: AnalyticsData): Promise<void> {
  const dir = path.dirname(ANALYTICS_FILE);
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// In-memory rate limiter for public event ingestion (by IP)
interface AnalyticsRateRecord {
  count: number;
  resetAt: number;
}
const eventLimits = new Map<string, AnalyticsRateRecord>();

function checkAnalyticsRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = eventLimits.get(ip);
  if (!record || record.resetAt < now) {
    eventLimits.set(ip, { count: 1, resetAt: now + 60 * 1000 }); // 1 minute window
    return true;
  }
  if (record.count >= 60) {
    return false; // Limit to 60 events/minute per IP
  }
  record.count += 1;
  return true;
}

const ALLOWED_EVENT_TYPES = new Set(['visit', 'click', 'form_submission']);

/**
 * GET — PRIVATE ANALYTICS REPORTING
 * Requires admin authentication so site metrics and visitor data are not exposed to the public.
 */
export async function GET(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse('Authentication required to access analytics reporting.');
  }

  const data = await getAnalytics();
  return NextResponse.json(
    { success: true, analytics: data },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}

/**
 * POST — PUBLIC ANALYTICS INGESTION
 * Strict validation, rate limiting, and bounded storage.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  if (!checkAnalyticsRateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { type, page, isUnique, element, label, category } = body;

    if (!type || typeof type !== 'string' || !ALLOWED_EVENT_TYPES.has(type)) {
      return NextResponse.json({ success: false, error: 'Invalid event type' }, { status: 400 });
    }

    const cleanPage = typeof page === 'string' ? page.slice(0, 100).replace(/[^a-zA-Z0-9_\-/?#=.]/g, '') : '/';
    const cleanElement = typeof element === 'string' ? element.slice(0, 80).replace(/[^a-zA-Z0-9_-]/g, '_') : 'general_click';
    const cleanLabel = typeof label === 'string' ? label.slice(0, 120) : 'Interactive click';
    const cleanCategory = typeof category === 'string' ? category.slice(0, 50) : 'interaction';

    const analytics = await getAnalytics();
    const today = new Date().toISOString().split('T')[0];

    analytics.dailyStats = analytics.dailyStats || {};
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = { visits: 0, unique: 0, clicks: 0, formsFilled: 0 };
    }

    // Limit dailyStats history to the last 90 days to prevent unbounded file growth
    const dailyKeys = Object.keys(analytics.dailyStats);
    if (dailyKeys.length > 90) {
      dailyKeys.sort();
      const removeKeys = dailyKeys.slice(0, dailyKeys.length - 90);
      removeKeys.forEach((k) => delete analytics.dailyStats[k]);
    }

    if (type === 'visit') {
      analytics.totalVisits = (analytics.totalVisits || 0) + 1;
      analytics.dailyStats[today].visits = (analytics.dailyStats[today].visits || 0) + 1;

      if (Boolean(isUnique)) {
        analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
        analytics.dailyStats[today].unique = (analytics.dailyStats[today].unique || 0) + 1;
      }

      if (cleanPage) {
        analytics.pageViews = analytics.pageViews || {};
        analytics.pageViews[cleanPage] = (analytics.pageViews[cleanPage] || 0) + 1;
      }
    } else if (type === 'click') {
      analytics.totalClicks = (analytics.totalClicks || 0) + 1;
      analytics.dailyStats[today].clicks = (analytics.dailyStats[today].clicks || 0) + 1;

      analytics.clicksByTarget = analytics.clicksByTarget || {};
      analytics.clicksByTarget[cleanElement] = (analytics.clicksByTarget[cleanElement] || 0) + 1;

      analytics.recentClicks = analytics.recentClicks || [];
      analytics.recentClicks.unshift({
        id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        element: cleanElement,
        label: cleanLabel,
        page: cleanPage,
        category: cleanCategory,
        timestamp: new Date().toISOString(),
      });

      // Keep up to 100 recent clicks to bound memory and file size
      if (analytics.recentClicks.length > 100) {
        analytics.recentClicks = analytics.recentClicks.slice(0, 100);
      }
    } else if (type === 'form_submission') {
      analytics.dailyStats[today].formsFilled = (analytics.dailyStats[today].formsFilled || 0) + 1;
    }

    await saveAnalytics(analytics);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/**
 * DELETE — PROTECTED RESET OPERATION
 * Only administrators can reset analytics data.
 */
export async function DELETE(req: NextRequest) {
  const { authorized } = validateAdminRequest(req);
  if (!authorized) {
    return unauthorizedResponse('Authentication required to reset analytics data.');
  }

  try {
    const freshAnalytics: AnalyticsData = {
      totalVisits: 0,
      uniqueVisitors: 0,
      totalClicks: 0,
      pageViews: {},
      clicksByTarget: {},
      recentClicks: [],
      dailyStats: {},
    };
    await saveAnalytics(freshAnalytics);
    return NextResponse.json({ success: true, message: 'Analytics reset successfully' });
  } catch (error) {
    console.error('Failed to reset analytics:', error);
    return NextResponse.json({ success: false, error: 'Failed to reset' }, { status: 500 });
  }
}
