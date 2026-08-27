'use client';

import { useSyncExternalStore } from 'react';
import { TbCookie } from 'react-icons/tb';

// Single source of truth for the consent decision — GoogleAnalytics.js
// reads the same key/event via the exports below, so the two files
// never need to know about each other's internals.
const STORAGE_KEY = 'mm-cookie-consent';
const CHANGE_EVENT = 'mm-consent-change';

export function getStoredConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing / blocked storage — treat as "declined" so the
    // banner doesn't loop asking on every render.
    return 'declined';
  }
}

function setStoredConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore — GoogleAnalytics.js simply won't load in this case.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

// Shared subscription for useSyncExternalStore — both this banner and
// GoogleAnalytics.js use it so each re-renders the instant the visitor's
// decision changes, with no manual setState-in-effect involved.
export function subscribeConsent(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function getServerSnapshot() {
  return null; // no decision exists yet during SSR
}

// A slim, non-blocking bottom bar — not a dimmed modal overlay. The
// site-concept doc rules out marketing popups/modals; this is a
// GDPR-required consent gate, kept as unobtrusive as that purpose allows.
// Styled dark-on-light (the footer's inversion option from design-system
// §7.6) with an elevation shadow so it visibly floats above the page
// instead of blending into the light `--color-bg` body behind it.
export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    getServerSnapshot
  );

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Nastavení cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-accent-primary bg-text-primary shadow-[0_-8px_30px_rgba(26,29,34,0.25)]"
    >
      <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <TbCookie
            size={22}
            className="mt-0.5 shrink-0 text-accent-secondary"
            aria-hidden="true"
          />
          <p className="max-w-2xl text-body-sm text-white/80 lg:text-body-desktop">
            Tento web používá cookies pro měření návštěvnosti pomocí nástroje
            Google Analytics. Údaje slouží výhradně ke zlepšování obsahu a
            fungování stránky. Souhlas je dobrovolný a lze jej kdykoli odvolat
            vymazáním dat prohlížeče.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setStoredConsent('declined')}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-white/10"
          >
            Odmítnout
          </button>
          <button
            type="button"
            onClick={() => setStoredConsent('accepted')}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-accent-primary px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover"
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
