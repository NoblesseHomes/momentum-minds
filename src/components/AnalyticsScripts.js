// src/components/AnalyticsScripts.js

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsScripts({ isGranted }) {
  if (!isGranted || !GA_ID) {
    return null;
  }

  return (
    <>
      <Analytics />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
