'use client';

import { useEffect, useState } from 'react';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { href: '#sluzby', label: 'Co nabízíme' },
  { href: '#partneri', label: 'Partneři' },
  { href: '#kontakt', label: 'Kontakty' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'border-b border-border bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-black"
        >
          Momentum Minds
        </a>

        <nav
          aria-label="Hlavní navigace"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-body font-medium text-text-secondary transition-colors duration-150 ease-out hover:bg-surface hover:text-accent-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#kontakt"
          className="hidden items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover md:inline-flex"
        >
          Kontaktovat
          <FiArrowRight size={14} aria-hidden="true" />
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-text-primary md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
          </span>
          {menuOpen ? (
            <FiX size={20} aria-hidden="true" />
          ) : (
            <FiMenu size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-bg md:hidden"
        >
          <nav
            aria-label="Mobilní navigace"
            className="container-page flex flex-col gap-1 py-4"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-body font-medium text-text-primary transition-colors duration-150 ease-out hover:bg-surface hover:text-accent-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent-primary px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover"
            >
              Kontaktovat
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
