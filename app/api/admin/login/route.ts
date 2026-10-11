import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
  checkLoginRateLimit,
  recordFailedLogin,
  recordSuccessfulLogin,
} from '@/lib/adminAuth';

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

// Constant-time string equality check to mitigate timing attacks
function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Perform dummy comparison of equal length to avoid short-circuit timing leak
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Check rate limit
  const rateLimit = checkLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed login attempts. Please try again in ${rateLimit.waitSeconds} seconds.`,
      },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await req.json();

    const normalizedUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!normalizedUser || !cleanPass) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // Configured admin credentials via environment variables with safe server defaults
    const configuredUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const configuredPass = (process.env.ADMIN_PASSWORD || 'techusar17').trim();

    const isUserMatch = timingSafeCompare(normalizedUser, configuredUser);
    const isPassMatch = timingSafeCompare(cleanPass, configuredPass);

    if (!isUserMatch || !isPassMatch) {
      recordFailedLogin(ip);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid username or password.',
        },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful login
    recordSuccessfulLogin(ip);

    // Generate cryptographically signed HMAC token
    const token = createAdminSessionToken(normalizedUser);

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        username: normalizedUser,
        role: 'superadmin',
        name: 'Hafiz Muhammad Usman',
      },
    });

    // Set secure HttpOnly session cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication failed.' }, { status: 500 });
  }
}
