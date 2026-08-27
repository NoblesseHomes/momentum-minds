'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  TbClockBolt,
  TbHeartHandshake,
  TbPuzzle,
  TbRefresh,
  TbUsersGroup,
} from 'react-icons/tb';
// concept v3 §5 — five differentiators, presented as a trust block
// (short pitch, not new information) next to a single large photo.
const REASONS = [
  {
    Icon: TbRefresh,
    title: 'Flexibilita',
    text: 'Objem spolupráce se přizpůsobuje potřebám klienta — od jednorázové služby po dlouhodobé projekty.',
  },
  {
    Icon: TbUsersGroup,
    title: 'B2B zkušenost',
    text: 'Rozumíme prostředí agentur práce, průmyslových podniků i výrobních společností.',
  },
  {
    Icon: TbClockBolt,
    title: 'Rychlá reakce',
    text: 'Umíme rychle reagovat na nové projekty, nové lokality, růst objemu i krátkodobé požadavky.',
  },
  {
    Icon: TbPuzzle,
    title: 'Individuální řešení',
    text: 'Služby kombinujeme podle konkrétního zadání, nenabízíme univerzální balíček.',
  },
  {
    Icon: TbHeartHandshake,
    title: 'Dlouhodobé partnerství',
    text: 'Cílem není jedna zakázka, ale spolupráce, která se rozvíjí spolu s potřebami klienta.',
  },
];

function useRevealProps(delay = 0) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return { initial: false };
  return {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.4, ease: 'easeOut', delay },
  };
}

export default function WhyUs() {
  const headingReveal = useRevealProps();
  const photoReveal = useRevealProps(0.06);
  const listReveal = useRevealProps(0.1);

  return (
    <section id="proc-my" className="section-space border-t border-border bg-surface">
      <div className="container-page">
        <motion.div {...headingReveal} className="max-w-2xl">
          <h2 className="text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
            Proč Momentum Minds
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div {...photoReveal} className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/why-team.jpg"
              alt="Dvě kolegyně řeší projekt u stolu v kanceláři"
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-72 w-full object-cover grayscale-[35%] contrast-[1.05] sm:h-96 lg:h-[28rem]"
            />
            <span className="absolute left-3 top-3 rounded-[1.25rem] bg-text-primary/70 px-2.5 py-1 font-mono text-tag uppercase tracking-wide text-white backdrop-blur-sm">
              Ilustrační foto
            </span>
          </motion.div>

          <motion.div {...listReveal} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {REASONS.map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary/10">
                  <Icon size={20} strokeWidth={1.5} className="text-accent-primary" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-1 text-body-sm text-text-secondary lg:text-body-sm-desktop">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
