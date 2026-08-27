'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import { getStoredConsent, subscribeConsent } from '@/components/CookieConsent';

// Set in .env.local (see .env.example) — the site ships with no
// analytics wired up until a real GA4 Measurement ID is provided.
const GA_MEASUREMENT_ID = 'idxxxxxxxxxxx';

function getConsentedSnapshot() {
  return getStoredConsent() === 'accepted';
}

function getServerSnapshot() {
  return false;
}

// Loads the gtag.js scripts only once the visitor has actively accepted
// cookies via CookieConsent.js — never before, and it unmounts itself
// immediately if the visitor later declines (e.g. from another tab).
export default function GoogleAnalytics() {
  const consented = useSyncExternalStore(
    subscribeConsent,
    getConsentedSnapshot,
    getServerSnapshot
  );

  if (!GA_MEASUREMENT_ID || !consented) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
