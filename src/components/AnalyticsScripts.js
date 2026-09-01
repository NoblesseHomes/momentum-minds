// src/components/AnalyticsScripts.js

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

const GA_ID = 'G-JN69PSHBGK';

export default function AnalyticsScripts({ isGranted }) {
  if (!isGranted) {
    return null;
  }

  return (
    <>
      <Analytics />
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />

          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
        `}
          </Script>
        </>
      )}
    </>
  );
}
