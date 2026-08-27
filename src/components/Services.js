'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  TbBuildingFactory2,
  TbCheck,
  TbMapPin,
  TbSpeakerphone,
  TbUserCheck,
} from 'react-icons/tb';

// design-system §6: fade + translateY(8px), 400ms, once per element,
// disabled entirely under prefers-reduced-motion.
function useRevealProps(delay = 0) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return { initial: false };
  }

  return {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.4, ease: 'easeOut', delay },
  };
}

// concept v2 §3.1 — Recruitment Marketing
const RECRUITMENT_MARKETING = [
  'Vytváření a úprava pracovních nabídek',
  'Propagace pracovních nabídek',
  'Příprava náborových kampaní',
  'Reklamní texty a obsah',
  'Grafické a promo materiály',
  'Online marketing pracovních pozic',
  'Cílení podle profese, lokality a cílové skupiny',
  'HR marketing',
  'Dlouhodobá marketingová podpora náboru',
];

// concept v2 §3.1 — Workforce Support
const WORKFORCE_SUPPORT = [
  'Organizační podpora při náboru',
  'Komunikace a koordinace kandidátů',
  'Pomoc s organizací příjezdu pracovníků',
  'Koordinace dopravy',
  'Pomoc se zajištěním ubytování',
  'Organizace vstupních a dalších potřebných školení',
  'Administrativní podpora spojená s nástupem do práce',
  'Překladatelská a tlumočnická podpora',
  'Koordinace dalších procesů spojených s nástupem zaměstnanců',
];

// concept v2 §3.2 — Industrial Services & Metalworking
const INDUSTRIAL_WORK = [
  'Zpracování kovu',
  'Zámečnické práce',
  'Svařování',
  'Mechanické opracování kovových dílů',
  'Obsluha vybraných výrobních technologií',
  'Příprava jednotlivých komponent',
  'Kompletace',
  'Montáž kovových konstrukcí',
  'Montáž jednotlivých uzlů a komponent',
  'Dokončovací a pomocné výrobní práce',
  'Další práce dle konkrétního zadání zákazníka',
];

// concept v2 §3.2 — accents to underline in the section text
const INDUSTRIAL_PRINCIPLES = [
  'Dodržování požadavků zákazníka',
  'Kvalita provedení',
  'Organizace prací',
  'Dohodnutý rozsah zakázky',
  'Flexibilita při změně potřeb',
  'Dodržené termíny',
];

// Temporary licensed stock (Unsplash License, free) standing in for real
// company photography until it's supplied — flagged as illustrative
// rather than passed off as the company's own site/staff.
function DirectionImage({ src, alt }) {
  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-border">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="h-56 w-full object-cover grayscale-[35%] contrast-[1.05] sm:h-72 lg:h-80"
      />
      <span className="absolute left-3 top-3 rounded-[1.25rem] bg-text-primary/70 px-2.5 py-1 font-mono text-tag uppercase tracking-wide text-white backdrop-blur-sm">
        Ilustrační foto
      </span>
    </div>
  );
}

function CompactList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2.5 text-body-sm text-text-secondary lg:text-body-sm-desktop">
          <span
            className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-text-muted"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DirectionHeader({ index, Icon, title, intro }) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="flex items-center gap-4 lg:block">
        <span
          className="font-display text-4xl font-bold text-accent-primary/15 lg:text-5xl"
          aria-hidden="true"
        >
          {index}
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 lg:mt-4">
          <Icon size={22} strokeWidth={1.5} className="text-accent-primary" aria-hidden="true" />
        </span>
      </div>

      <h3 className="mt-4 text-h3 font-display font-semibold text-text-primary lg:text-h3-desktop">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-body text-text-secondary lg:text-body-desktop">{intro}</p>
    </div>
  );
}

export default function Services() {
  const headingReveal = useRevealProps();
  const blockOneReveal = useRevealProps(0.06);
  const blockTwoReveal = useRevealProps(0.06);

  return (
    <section id="sluzby" className="section-space">
      <div className="container-page">
        <motion.div {...headingReveal} className="max-w-2xl">
          <h2 className="text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
            Co nabízíme
          </h2>
          <p className="mt-3 text-body-lg text-text-secondary lg:text-body-lg-desktop">
            Dvě samostatná řešení, jeden přístup: přebíráme přesně vymezenou část vašeho
            procesu a plníme ji jako spolehlivý, vestavěný partner.
          </p>
        </motion.div>

        {/* Block 1 — Recruitment Marketing & Workforce Support */}
        <motion.div {...blockOneReveal} className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-16 lg:grid-cols-[280px_1fr] lg:gap-16">
          <DirectionHeader
            index="01"
            Icon={TbSpeakerphone}
            title="Recruitment Marketing and Workforce Support"
            intro="Marketing náboru a organizační podpora nástupu zaměstnanců do práce — pro agentury práce, personální společnosti a zaměstnavatele s pravidelnou potřebou náboru."
          />

          <div>
            <DirectionImage
              src="/images/services/recruitment.jpg"
              alt="Dva kolegové procházejí uličkou skladu a konzultují průběh práce"
            />

            <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-surface md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2">
                  <TbSpeakerphone size={18} className="text-accent-primary" aria-hidden="true" />
                  <h4 className="font-display text-base font-semibold text-text-primary">
                    Recruitment Marketing
                  </h4>
                </div>
                <div className="mt-4">
                  <CompactList items={RECRUITMENT_MARKETING} />
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2">
                  <TbUserCheck size={18} className="text-accent-primary" aria-hidden="true" />
                  <h4 className="font-display text-base font-semibold text-text-primary">
                    Workforce Support
                  </h4>
                </div>
                <div className="mt-4">
                  <CompactList items={WORKFORCE_SUPPORT} />
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-accent-primary/5 px-4 py-3 text-body-sm text-text-secondary lg:text-body-sm-desktop">
              <TbCheck size={16} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
              <span>
                <strong className="font-medium text-text-primary">Pro agentury práce:</strong>{' '}
                rozsah spolupráce si zvolíte sami — pouze reklama a propagace, nebo reklama +
                podpora náboru + koordinace souvisejících služeb.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Block 2 — Industrial Services & Metalworking */}
        <motion.div {...blockTwoReveal} className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-16 lg:grid-cols-[280px_1fr] lg:gap-16">
          <DirectionHeader
            index="02"
            Icon={TbBuildingFactory2}
            title="Industrial Services and Metalworking"
            intro="Převzetí přesně vymezené části zakázky nebo výrobního procesu klienta a její realizace přímo na místě u zákazníka. Nemáme vlastní výrobní halu."
          />

          <div>
            <DirectionImage
              src="/images/services/industrial.jpg"
              alt="Jiskry od úhlové brusky při opracování kovu v průmyslovém provozu"
            />

            <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {INDUSTRIAL_WORK.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2.5 text-body-sm text-text-secondary lg:text-body-sm-desktop"
                  >
                    <span
                      className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-text-muted"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-lg border border-accent-primary/25 bg-accent-primary/5 px-4 py-4">
              <TbMapPin size={20} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
              <div>
                <p className="text-body font-medium text-text-primary lg:text-body-desktop">
                  Pracujeme na místě u zákazníka — bez vlastní výroby.
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {INDUSTRIAL_PRINCIPLES.map((principle) => (
                    <li
                      key={principle}
                      className="flex items-center gap-1.5 text-body-sm text-text-secondary lg:text-body-sm-desktop"
                    >
                      <TbCheck size={14} className="shrink-0 text-accent-primary" aria-hidden="true" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
