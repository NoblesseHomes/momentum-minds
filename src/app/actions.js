// src/app/actions.js

'use server';

import { cookies } from 'next/headers';

export async function saveCookieConsent(status) {
  if (status !== 'granted' && status !== 'denied') {
    throw new Error('Invalid cookie consent status');
  }

  const cookieStore = await cookies();

  cookieStore.set('local-cookie-consent', status, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
