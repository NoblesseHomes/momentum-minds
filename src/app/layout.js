import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';
import { cookies } from 'next/headers';
import CookieBanner from '@/components/CookieBanner';
import AnalyticsScripts from '@/components/AnalyticsScripts';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
});

// TODO: nahradit skutečnou doménou po nasazení (viz .env / hosting).
const siteUrl = process.env.SITE_URL;
const title = 'Momentum Minds | Marketing náboru a zpracování kovů';
const description =
  'Momentum Minds spojuje marketing náboru s navazující organizační podporou a průmyslové služby v oblasti zpracování kovů.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: 'MomentumMinds s.r.o.' }],
  creator: 'MomentumMinds s.r.o.',
  publisher: 'MomentumMinds s.r.o.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteUrl,
    siteName: 'Momentum Minds',
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Momentum Minds — Ideas that create momentum.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();

  const consent = cookieStore.get('local-cookie-consent')?.value;

  const consentHasValue = consent === 'granted' || consent === 'denied';
  const isAnalyticsGranted = consent === 'granted';
  return (
    <html
      lang="cs"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Momentum" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        {!consentHasValue && <CookieBanner />}

        <AnalyticsScripts isGranted={isAnalyticsGranted} />
      </body>
    </html>
  );
}
