import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

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
  title: 'Momentum Minds — Ideas that create momentum. Solutions that deliver results.',
  description:
    'Momentum Minds spojuje recruitment marketing s navazující organizační podporou a průmyslové služby v oblasti zpracování kovů.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="cs"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
