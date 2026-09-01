'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  TbBuildingFactory2,
  TbCheck,
  TbInfoCircle,
  TbMapPin,
  TbSpeakerphone,
  TbUserCheck,
} from 'react-icons/tb';
import Eyebrow from '@/components/Eyebrow';

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

// concept v3 §4.1 — Marketing & Advertising (main direction)
const MARKETING_ADVERTISING = [
  'Vytváření a úprava pracovních nabídek',
  'Propagace pracovních nabídek',
  'Příprava náborových kampaní',
  'Reklamní texty a obsah',
  'Grafické a promo materiály',
  'Online marketing a distribuce obsahu',
  'Cílení podle profese, lokality a cílové skupiny',
  'HR marketing',
  'Dlouhodobá marketingová podpora náboru',
];

// concept v3 §4.2 — Business Support (renamed from "Workforce Support")
const BUSINESS_SUPPORT = [
  'Organizační komunikace',
  'Koordinace příjezdu lidí',
  'Doprava',
  'Pomoc s organizací a koordinací ubytování',
  'Organizace školení',
  'Administrativní podpora',
  'Překladatelské a tlumočnické služby',
  'Organizační podpora adaptačních procesů',
  'Další doplňkové služby na vyžádání klienta',
];

// concept v2 §3.2 — Metalworking & Assembly
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
// Full-bleed hero-style banner per direction — mirrors the Hero
// component's photo+gradient+overlaid-copy treatment so each direction
// reads as a real anchor section instead of a sidebar label next to a
// small thumbnail.
function DirectionBanner({ index, Icon, title, intro, src, alt }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        priority={index === '01'}
        sizes="100vw"
        className="h-72 w-full object-cover grayscale-[35%] contrast-[1.05] sm:h-96 lg:h-[28rem]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(26,29,34,0.9)_0%,rgba(26,29,34,0.55)_45%,rgba(26,29,34,0.15)_75%,rgba(26,29,34,0.35)_100%)]"
        aria-hidden="true"
      />

      <span
        className="absolute right-4 top-4 font-display text-5xl font-bold text-white/25 sm:right-6 sm:top-6 lg:text-6xl"
        aria-hidden="true"
      >
        {index}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-white"
            aria-hidden="true"
          />
        </span>
        <h3 className="mt-4 text-h3 font-display font-semibold text-white lg:text-h3-desktop">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-body text-white/85 lg:text-body-desktop">
          {intro}
        </p>
      </div>
    </div>
  );
}

function CompactList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
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
  );
}

// Each service column carries its own photo (concept v3 §10 asks for two
// distinct photos in this block — marketing prep vs. organizational/
// logistics — rather than one shared image), so the card itself reads
// as a media tile, not a plain text list in a box.
function ServiceColumn({ Icon, title, items, src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative h-44 w-full sm:h-52">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover grayscale-[35%] contrast-[1.05]"
        />
      </div>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-accent-primary" aria-hidden="true" />
          <h4 className="font-display text-base font-semibold text-text-primary">
            {title}
          </h4>
        </div>
        <div className="mt-4">
          <CompactList items={items} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const headingReveal = useRevealProps();
  const blockOneReveal = useRevealProps(0.06);
  const blockOneMediaReveal = useRevealProps(0.12);
  const blockTwoReveal = useRevealProps(0.06);
  const blockTwoMediaReveal = useRevealProps(0.12);

  return (
    <section id="sluzby" className="section-space">
      <div className="container-page">
        <motion.div {...headingReveal} className="max-w-2xl">
          <Eyebrow>What we offer</Eyebrow>
          <h2 className="mt-2 text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
            Co nabízíme
          </h2>
          <p className="mt-3 text-body-lg text-text-secondary lg:text-body-lg-desktop">
            Dva samostatné směry, jeden přístup: přebíráme přesně vymezenou část
            vašeho procesu a plníme ji jako spolehlivý, vestavěný partner.
          </p>
        </motion.div>

        {/* Block 2 — Metalworking & Assembly */}
        <div className="mt-16 border-t border-border pt-16">
          <motion.div {...blockTwoReveal}>
            <DirectionBanner
              index="02"
              Icon={TbBuildingFactory2}
              title="Metalworking & Assembly"
              intro="Převzetí přesně vymezené části zakázky nebo výrobního procesu klienta a její realizace přímo na místě u zákazníka. Nemáme vlastní výrobní halu."
              src="/images/services/industrial.jpg"
              alt="Jiskry od úhlové brusky při opracování kovu v průmyslovém provozu"
            />
          </motion.div>

          <motion.div
            {...blockTwoMediaReveal}
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]"
          >
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

            <div className="relative min-h-[14rem] overflow-hidden rounded-2xl border border-border lg:min-h-full">
              <Image
                src="/images/services/assembly.jpg"
                alt="Montáž karoserie na výrobní lince pomocí robotických ramen"
                fill
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="object-cover grayscale-[35%] contrast-[1.05]"
              />
            </div>
          </motion.div>

          <motion.div
            {...blockTwoMediaReveal}
            className="mt-6 flex items-start gap-3 rounded-lg border border-accent-primary/25 bg-accent-primary/5 px-4 py-4"
          >
            <TbMapPin
              size={20}
              className="mt-0.5 shrink-0 text-accent-primary"
              aria-hidden="true"
            />
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
                    <TbCheck
                      size={14}
                      className="shrink-0 text-accent-primary"
                      aria-hidden="true"
                    />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        {/* Block 1 — Marketing & Advertising + Business Support (concept v3
            §7.3 treats these as one combined "direction 1" block) */}
        <div className="mt-16 border-t border-border pt-16">
          <motion.div {...blockOneReveal}>
            <DirectionBanner
              index="01"
              Icon={TbSpeakerphone}
              title="Marketing & Advertising"
              intro="Reklama, marketing a propagace pracovních nabídek — hlavně pro agentury práce, personální společnosti a zaměstnavatele s pravidelnou potřebou náboru. Business Support tento směr doplňuje o organizační zajištění."
              src="/images/services/recruitment.jpg"
              alt="Dva kolegové procházejí uličkou skladu a konzultují průběh práce"
            />
          </motion.div>

          <motion.div
            {...blockOneMediaReveal}
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <ServiceColumn
              Icon={TbSpeakerphone}
              title="Marketing & Advertising"
              items={MARKETING_ADVERTISING}
              src="/images/services/promote.jpg"
              alt="Tým plánuje náborovou kampaň u tabule s poznámkami"
            />
            <ServiceColumn
              Icon={TbUserCheck}
              title="Business Support"
              items={BUSINESS_SUPPORT}
              src="/images/services/support.jpg"
              alt="Administrativní podpis dokumentu na pracovním stole"
            />
          </motion.div>

          <motion.p
            {...blockOneMediaReveal}
            className="mt-6 flex items-start gap-2.5 rounded-lg bg-accent-primary/5 px-4 py-3 text-body-sm text-text-secondary lg:text-body-sm-desktop"
          >
            <TbCheck
              size={16}
              className="mt-0.5 shrink-0 text-accent-primary"
              aria-hidden="true"
            />
            <span>
              <strong className="font-medium text-text-primary">
                Vy řídíte nábor. My zajišťujeme podporu kolem něj.
              </strong>{' '}
              Rozsah spolupráce si zvolíte sami — pouze reklama a propagace,
              nebo reklama + organizační, logistická a administrativní podpora.
            </span>
          </motion.p>

          {/* concept v3 §1 — required legal scope clarification, must be
              visible, not fine print. */}
          <motion.p
            {...blockOneMediaReveal}
            className="mt-4 flex items-start gap-2.5 rounded-lg border border-border px-4 py-3 text-body-sm text-text-secondary lg:text-body-sm-desktop"
          >
            <TbInfoCircle
              size={16}
              className="mt-0.5 shrink-0 text-text-muted"
              aria-hidden="true"
            />
            <span>
              Momentum Minds není personální agentura a nezajišťuje
              zprostředkování zaměstnání. Samotný výběr kandidátů a
              pracovněprávní vztahy zůstávají plně v kompetenci klienta.
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
