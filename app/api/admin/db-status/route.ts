import { NextRequest, NextResponse } from 'next/server';
import { testDbStatus, initDbSchema, isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const status = await testDbStatus();
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.action === 'init-schema') {
      const ok = await initDbSchema();
      const status = await testDbStatus();
      return NextResponse.json({ success: ok, ...status });
    }

    const status = await testDbStatus();
    return NextResponse.json({ success: true, ...status });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
