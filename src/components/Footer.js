const NAV_ITEMS = [
  { href: '#sluzby', label: 'Co nabízíme' },
  { href: '#proc-my', label: 'Proč my' },
  { href: '#kontakt', label: 'Kontakty' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
              Momentum Minds
            </span>
            {/* concept v3 §7.7 — direction list, translated to Czech
                (the doc's exact EN wording was dropped, see Services.js) */}
            <p className="mt-2 max-w-xs font-mono text-body-sm text-text-secondary">
              Marketing a reklama | Obchodní podpora | Zpracování kovů a montáž
            </p>
          </div>

          <nav aria-label="Navigace v patičce" className="flex flex-col gap-2 sm:items-end">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-body-sm text-text-secondary transition-colors duration-150 ease-out hover:text-accent-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-body-sm text-text-muted sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p>MomentumMinds s.r.o. · IČO: 24670804</p>
            <p>Olšanská 54/3, Žižkov, 130 00 Praha 3</p>
            <p>Zapsaná v obchodním rejstříku vedeném Městským soudem v Praze pod sp. zn. C 164926</p>
          </div>
          <span>&copy; {new Date().getFullYear()} MomentumMinds s.r.o.</span>
        </div>
      </div>
    </footer>
  );
}
