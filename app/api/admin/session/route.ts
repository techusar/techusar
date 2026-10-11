import { NextRequest, NextResponse } from 'next/server';
import { validateAdminRequest, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const { authorized, session } = validateAdminRequest(req);

  if (!authorized || !session) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
      name: 'Hafiz Muhammad Usman',
    },
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    sameSite: 'lax',
  });
  return response;
}
