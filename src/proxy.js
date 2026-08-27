import { NextResponse } from 'next/server';

export function proxy(request) {
  const response = NextResponse.next();

  const guestToken = request.cookies.get('guest_token');

  if (!guestToken) {
    response.cookies.set('guest_token', crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 год
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
