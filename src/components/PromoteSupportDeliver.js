'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { TbBriefcase2, TbRocket, TbTools } from 'react-icons/tb';

// concept v3 §3 — Promote / Support / Deliver: not a third business line,
// just the framework that explains how the two real directions work.
// Placed as a compact strip right under hero, before the detailed
// services blocks (§10, step 3 of the page order). Kept as the English
// framework words per the bilingual convention (§6) — short EN labels,
// Czech explanatory copy underneath.
const ITEMS = [
  {
    Icon: TbRocket,
    word: 'Promote',
    src: '/images/services/promote.jpg',
    alt: 'Tým plánuje náborovou kampaň u tabule s poznámkami',
    text: 'Dáváme pracovním nabídkám viditelnost a cílíme je přesně na správnou skupinu.',
  },
  {
    Icon: TbBriefcase2,
    word: 'Support',
    src: '/images/services/support.jpg',
    alt: 'Administrativní podpis dokumentu na pracovním stole',
    text: 'Zajišťujeme organizační, logistickou a administrativní podporu kolem nástupu.',
  },
  {
    Icon: TbTools,
    word: 'Deliver',
    src: '/images/services/industrial.jpg',
    alt: 'Jiskry od úhlové brusky při opracování kovu',
    text: 'Přebíráme vymezenou část výrobní zakázky a odpovídáme za její realizaci.',
  },
];

function revealProps(reduceMotion, delay = 0) {
  if (reduceMotion) return { initial: false };
  return {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.4, ease: 'easeOut', delay },
  };
}

export default function PromoteSupportDeliver() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border bg-bg">
      <div className="container-page grid grid-cols-1 gap-6 py-10 sm:grid-cols-3 lg:gap-8 lg:py-12">
        {ITEMS.map(({ Icon, word, src, alt, text }, i) => {
          const reveal = revealProps(reduceMotion, i * 0.06);
          return (
            <motion.div key={word} {...reveal} className="flex gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="64px"
                  className="object-cover grayscale-[35%] contrast-[1.05]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-text-primary/40">
                  <Icon size={22} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                </span>
              </div>
              <div>
                <span className="font-display text-base font-semibold text-text-primary">
                  {word}
                </span>
                <p className="mt-1 text-body-sm text-text-secondary lg:text-body-sm-desktop">
                  {text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
