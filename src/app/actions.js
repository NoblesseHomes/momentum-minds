// src/app/actions.js

'use server';

import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '60s'),
});

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

// Basic escaping so form input can never break out of the HTML email
// template (e.g. a message containing "</p><script>...").
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildFeedbackEmailHtml({ name, email, phone, topic, message }) {
  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:6px 12px 6px 0;color:#5b6169;font-size:13px;white-space:nowrap;">${label}</td>
           <td style="padding:6px 0;font-size:14px;color:#1a1d22;">${value}</td>
         </tr>`
      : '';

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1d22;">
      <div style="background-color:#2b6e5e;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;font-size:18px;color:#ffffff;">Nová zpráva z kontaktního formuláře</h1>
      </div>
      <div style="border:1px solid #c7cbce;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            ${row('Jméno', escapeHtml(name))}
            ${row('E-mail', `<a href="mailto:${escapeHtml(email)}" style="color:#2b6e5e;">${escapeHtml(email)}</a>`)}
            ${row('Telefon', phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#2b6e5e;">${escapeHtml(phone)}</a>` : '')}
            ${row('Zájem o', escapeHtml(topic))}
          </tbody>
        </table>
        <hr style="border:none;border-top:1px solid #c7cbce;margin:16px 0;" />
        <p style="margin:0 0 4px;color:#5b6169;font-size:13px;">Zpráva</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:14px;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

// Claudflare
async function verifyTurnstile(token) {
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();

    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function sendFeedbackEmail(formData) {
  const cookieStore = await cookies();
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const topic = formData.get('topic')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  // Each required field gets its own message so the visitor knows exactly
  // what's missing, instead of one combined "fill everything in" error.
  const requiredFields = [
    { value: name, error: 'Vyplňte prosím jméno.' },
    { value: email, error: 'Vyplňte prosím e-mail.' },
    { value: message, error: 'Vyplňte prosím zprávu.' },
  ];

  const missingField = requiredFields.find((field) => !field.value);
  if (missingField) {
    return { success: false, error: missingField.error };
  }

  const turnstileToken = formData.get('cf-turnstile-response')?.toString();

  const turnstileValid = await verifyTurnstile(turnstileToken);

  if (!turnstileValid) {
    return {
      success: false,
      error: 'Turnstile verification failed',
    };
  }

  const guestToken = cookieStore.get('guest_token') ?? null;

  if (!guestToken) {
    return {
      success: false,
      error: 'Chyba při odesílání, zkuste to prosím později.',
    };
  }

  const { success } = await ratelimit.limit(guestToken);

  if (!success) {
    return {
      success: false, // добавил для консистентности структуры ответа
      error: 'Příliš mnoho požadavků. Počkejte prosím minutu.',
    };
  }

  try {
    // Resend's SDK does not throw on API errors — it resolves with
    // { data, error }, so the error has to be checked explicitly instead
    // of relying on catch to see it.
    const { error } = await resend.emails.send({
      // Po připojení vlastní domény v Resendu nahraďte za info@momentumminds.cz.
      from: 'Momentum Minds <info@yourdomain.com>',
      to: 'info@yourdomain.com',
      replyTo: email,
      subject: `Nová poptávka z webu — ${name}`,
      html: buildFeedbackEmailHtml({ name, email, phone, topic, message }),
    });

    if (error) {
      console.error('Chyba Resend API (sendFeedbackEmail):', error);
      return {
        success: false,
        error: 'Zprávu se nepodařilo odeslat. Zkuste to prosím později.',
      };
    }

    return { success: true };
  } catch (error) {
    // Skutečnou chybu logujeme na serveru, uživateli jde jen obecná zpráva.
    console.error('Chyba Server Action (sendFeedbackEmail):', error);
    return {
      success: false,
      error: 'Zprávu se nepodařilo odeslat. Zkuste to prosím později.',
    };
  }
}
