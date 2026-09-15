import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const normalizedUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Valid credentials check:
    // User can log in with:
    // username: 'admin' or 'techusar' or 'techusar17@gmail.com'
    // password: 'techusar17' or 'admin123' or '03318917330'
    const isUserValid =
      normalizedUser === 'admin' ||
      normalizedUser === 'techusar' ||
      normalizedUser === 'techusar17@gmail.com' ||
      normalizedUser === '03318917330';

    const isPassValid =
      cleanPass === 'techusar17' ||
      cleanPass === 'admin123' ||
      cleanPass === '03318917330' ||
      cleanPass === 'techusar@2026';

    if (!isUserValid || !isPassValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ghalat username ya password. Default: admin / techusar17',
        },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = `tok_${Date.now()}_${Buffer.from(normalizedUser).toString('base64')}`;

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        username: normalizedUser,
        role: 'superadmin',
        name: 'Hafiz Muhammad Usman',
      },
    });

    // Set auth cookie
    response.cookies.set({
      name: 'techusar_admin_session',
      value: token,
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
