import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Secret used to sign admin session tokens
// Uses ADMIN_SESSION_SECRET or a persistent server secret fallback
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  'techusar-secure-production-session-secret-key-2026';

export const ADMIN_COOKIE_NAME = 'techusar_admin_session';

export interface AdminSession {
  username: string;
  role: 'superadmin';
  issuedAt: number;
  expiresAt: number;
}

/**
 * Creates a cryptographically signed HMAC token for the admin session.
 * Format: base64(payload).signature
 */
export function createAdminSessionToken(username: string): string {
  const payload: AdminSession = {
    username,
    role: 'superadmin',
    issuedAt: Date.now(),
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies the admin session token string.
 * Returns the decoded AdminSession if valid, null otherwise.
 */
export function verifyAdminSessionToken(token: string | null | undefined): AdminSession | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  if (!encodedPayload || !signature) return null;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encodedPayload)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonStr) as AdminSession;

    if (!payload || payload.role !== 'superadmin' || !payload.expiresAt) {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates whether the incoming NextRequest is authorized as an admin.
 * Checks both the HttpOnly cookie and the Authorization Bearer header.
 */
export function validateAdminRequest(req: NextRequest): { authorized: boolean; session?: AdminSession } {
  // 1. Try Cookie
  const cookieVal = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookieVal) {
    const session = verifyAdminSessionToken(cookieVal);
    if (session) {
      return { authorized: true, session };
    }
  }

  // 2. Try Authorization Bearer header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = verifyAdminSessionToken(token);
    if (session) {
      return { authorized: true, session };
    }
  }

  return { authorized: false };
}

/**
 * Helper to return a 401 Unauthorized response
 */
export function unauthorizedResponse(message = 'Unauthorized admin access required.') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}

// In-memory rate limiter for login attempts (per IP)
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
  lastAttempt: number;
}
const loginAttempts = new Map<string, RateLimitRecord>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) {
    return { allowed: true };
  }

  if (record.lockedUntil > now) {
    const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  // Reset window after 15 minutes of inactivity
  if (now - record.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0, lastAttempt: now };
  record.attempts += 1;
  record.lastAttempt = now;

  // Lock for 15 minutes after 5 consecutive failed attempts
  if (record.attempts >= 5) {
    record.lockedUntil = now + 15 * 60 * 1000;
  }

  loginAttempts.set(ip, record);
}

export function recordSuccessfulLogin(ip: string): void {
  loginAttempts.delete(ip);
}
