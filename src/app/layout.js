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

export const metadata = {
  title:
    'Momentum Minds — Ideas that create momentum. Solutions that deliver results.',
  description:
    'Momentum Minds spojuje recruitment marketing s navazující organizační podporou a průmyslové služby v oblasti zpracování kovů.',
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
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        {!consentHasValue && <CookieBanner />}

        <AnalyticsScripts isGranted={isAnalyticsGranted} />
      </body>
    </html>
  );
}
