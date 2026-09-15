import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

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

export async function GET() {
  const data = await getAnalytics();
  return NextResponse.json({ success: true, analytics: data }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, page, isUnique, element, label, category } = body;
    const analytics = await getAnalytics();
    const today = new Date().toISOString().split('T')[0];

    analytics.dailyStats = analytics.dailyStats || {};
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = { visits: 0, unique: 0, clicks: 0, formsFilled: 0 };
    }

    if (type === 'visit') {
      analytics.totalVisits = (analytics.totalVisits || 0) + 1;
      analytics.dailyStats[today].visits = (analytics.dailyStats[today].visits || 0) + 1;

      if (isUnique) {
        analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
        analytics.dailyStats[today].unique = (analytics.dailyStats[today].unique || 0) + 1;
      }

      if (page) {
        analytics.pageViews = analytics.pageViews || {};
        analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
      }
    } else if (type === 'click') {
      analytics.totalClicks = (analytics.totalClicks || 0) + 1;
      analytics.dailyStats[today].clicks = (analytics.dailyStats[today].clicks || 0) + 1;

      const targetKey = element || 'general_click';
      analytics.clicksByTarget = analytics.clicksByTarget || {};
      analytics.clicksByTarget[targetKey] = (analytics.clicksByTarget[targetKey] || 0) + 1;

      analytics.recentClicks = analytics.recentClicks || [];
      analytics.recentClicks.unshift({
        id: `clk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        element: targetKey,
        label: label || 'Interactive click',
        page: page || '/',
        category: category || 'interaction',
        timestamp: new Date().toISOString(),
      });

      // Keep up to 200 recent real clicks for analysis
      if (analytics.recentClicks.length > 200) {
        analytics.recentClicks = analytics.recentClicks.slice(0, 200);
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

export async function DELETE() {
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
