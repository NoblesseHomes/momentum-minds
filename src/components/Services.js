'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TbBriefcase, TbCar, TbHome2, TbLanguage, TbShieldCheck, TbSpeakerphone } from 'react-icons/tb';

// Order follows the concept doc §5.3: business → private-individual
// audience, a deliberate gradient rather than a random shuffle. The 6th
// card (admin/consulting) isn't in the original 5-service spec — added
// on request to fill out the grid to an even count; the registry does
// cover a broader scope than these categories (see concept doc §1).
const SERVICES = [
  {
    id: 'marketing',
    title: 'Marketing a reklama',
    description:
      'Kampaně a propagace pro firmy, které potřebují zviditelnit svou nabídku na trhu.',
    Icon: TbSpeakerphone,
  },
  {
    id: 'bozp',
    title: 'Školení BOZP',
    description:
      'Školení bezpečnosti a ochrany zdraví při práci pro firmy se zahraničním personálem.',
    Icon: TbShieldCheck,
  },
  {
    id: 'preklady',
    title: 'Překlady a doprovod',
    description:
      'Tlumočení a osobní doprovod při jednáních, na úřadech a v dalších praktických situacích.',
    Icon: TbLanguage,
  },
  {
    id: 'doprava',
    title: 'Doprava a transfer',
    description:
      'Spolehlivá přeprava osob — pro firemní i soukromé cesty v rámci Česka.',
    Icon: TbCar,
  },
  {
    id: 'ubytovani',
    title: 'Ubytování',
    description:
      'Pomoc se zajištěním bydlení při stěhování nebo nástupu do pracovního poměru.',
    Icon: TbHome2,
  },
  {
    id: 'administrativa',
    title: 'Poradenství a administrativa',
    description:
      'Pomoc s dalšími praktickými a úředními záležitostmi nad rámec výše uvedených oblastí.',
    Icon: TbBriefcase,
  },
];

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

function ServiceCard({ service, index }) {
  const revealProps = useRevealProps(index * 0.06);

  return (
    <motion.article
      {...revealProps}
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong"
    >
      <service.Icon
        size={32}
        strokeWidth={1.5}
        className="text-accent-primary"
        aria-hidden="true"
      />

      <h3 className="mt-4 text-h3 font-display font-semibold text-text-primary lg:text-h3-desktop">
        {service.title}
      </h3>

      <p className="mt-2 text-body text-text-secondary lg:text-body-desktop">
        {service.description}
      </p>
    </motion.article>
  );
}

export default function Services() {
  const headingReveal = useRevealProps();
  const ctaReveal = useRevealProps(SERVICES.length * 0.06);

  return (
    <section id="sluzby" className="section-space">
      <div className="container-page">
        <motion.div {...headingReveal} className="max-w-2xl">
          <h2 className="text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
            Co nabízíme
          </h2>
          <p className="mt-3 text-body-lg text-text-secondary lg:text-body-lg-desktop">
            Šest oblastí, ve kterých pomáháme firmám i jednotlivcům řešit praktické záležitosti.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div {...ctaReveal} className="mt-10 text-center">
          <a
            href="#kontakt"
            className="text-body font-medium text-accent-primary underline decoration-border-strong underline-offset-4 transition-colors duration-150 ease-out hover:text-accent-primary-hover"
          >
            Nenašli jste, co hledáte? Napište nám.
          </a>
        </motion.div>
      </div>
    </section>
  );
}
