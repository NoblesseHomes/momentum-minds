// src/components/CookieBanner.js

'use client';

import { useTransition } from 'react';
import { TbCookie } from 'react-icons/tb';
import { saveCookieConsent } from '@/app/actions';

export default function CookieBanner() {
  const [isPending, startTransition] = useTransition();

  const handleConsent = (status) => {
    startTransition(async () => {
      await saveCookieConsent(status);

      // Reload triggers Server Components again, so layout.js re-reads the cookie.
      window.location.reload();
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">
      <div className="flex items-center gap-2">
        <TbCookie
          size={20}
          className="text-accent-primary"
          aria-hidden="true"
        />
        <h3 className="font-display text-base font-semibold text-text-primary">
          Soubory cookie
        </h3>
      </div>

      <p className="mt-2 text-body-sm text-text-secondary lg:text-body-sm-desktop">
        Používáme Google Analytics k měření návštěvnosti a zlepšování fungování
        webu. Souhlasíte s použitím analytických cookies?
      </p>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleConsent('denied')}
          className="cursor-pointer rounded-lg border border-border-strong px-4 py-2 text-body-sm font-medium text-text-primary transition-colors duration-150 ease-out hover:bg-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          Odmítnout
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => handleConsent('granted')}
          className="cursor-pointer rounded-lg bg-accent-primary px-4 py-2 text-body-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Přijmout
        </button>
      </div>
    </div>
  );
}
