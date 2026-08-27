'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { TbCircleCheck, TbMail, TbMapPin, TbPhone } from 'react-icons/tb';

const TOPICS = [
  'Marketing a reklama',
  'Obchodní podpora',
  'Zpracování kovů a montáž',
  'Jiné',
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

export default function Contact() {
  const headingReveal = useRevealProps();
  const formReveal = useRevealProps(0.06);

  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // No backend endpoint is wired up yet — this only enforces the GDPR
  // gate and shows the inline confirmation the design system calls for
  // (§7.5). Replace with a real submit handler (API route / email
  // service) before launch.
  function handleSubmit(event) {
    event.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="section-space">
      <div className="container-page">
        <motion.div {...headingReveal} className="max-w-2xl">
          <h2 className="text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
            Pojďme společně nastavit řešení
          </h2>
          <p className="mt-3 text-body-lg text-text-secondary lg:text-body-lg-desktop">
            Potřebujete zvýšit dosah svých pracovních nabídek? Hledáte partnera, který
            kromě marketingu zajistí i navazující organizační a logistickou podporu? Nebo
            potřebujete externě realizovat část výrobní zakázky přímo ve vašem provozu?
            Řekněte nám, co potřebujete — společně nastavíme řešení podle vašeho projektu.
          </p>
        </motion.div>

        <motion.div
          {...formReveal}
          className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16"
        >
          <div>
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/contact-office.jpg"
                alt="Kancelář s výhledem na město"
                width={1400}
                height={1600}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-56 w-full object-cover grayscale-[35%] contrast-[1.05] sm:h-72"
              />
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <TbMapPin size={20} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
                <span className="text-body text-text-secondary lg:text-body-desktop">
                  MomentumMinds s.r.o.
                  <br />
                  Olšanská 54/3, Žižkov
                  <br />
                  130 00 Praha 3
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TbMail size={20} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
                <a
                  href="mailto:info@momentumminds.cz"
                  className="text-body text-text-secondary underline-offset-4 hover:text-accent-primary hover:underline lg:text-body-desktop"
                >
                  info@momentumminds.cz (doplnit)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <TbPhone size={20} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
                <a
                  href="tel:+420000000000"
                  className="text-body text-text-secondary underline-offset-4 hover:text-accent-primary hover:underline lg:text-body-desktop"
                >
                  +420 000 000 000 (doplnit)
                </a>
              </li>
              <li className="font-mono text-body-sm text-text-muted">
                IČO: 24670804
                <br />
                Zapsaná v obchodním rejstříku vedeném Městským soudem v Praze
                pod sp. zn. C 164926
              </li>
            </ul>
          </div>

          {submitted ? (
            <div className="flex items-start gap-3 rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-6">
              <TbCircleCheck size={22} className="mt-0.5 shrink-0 text-accent-primary" aria-hidden="true" />
              <p className="text-body text-text-primary lg:text-body-desktop">
                Zpráva odeslána. Ozveme se vám co nejdříve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-body-sm font-medium text-text-secondary">
                    Jméno a příjmení
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 text-body text-text-primary outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-body-sm font-medium text-text-secondary">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 text-body text-text-primary outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="text-body-sm font-medium text-text-secondary">
                    Telefon <span className="text-text-muted">(nepovinné)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 text-body text-text-primary outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="text-body-sm font-medium text-text-secondary">
                    Mám zájem o
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    defaultValue={TOPICS[0]}
                    className="mt-1.5 h-11 w-full rounded-lg border border-border bg-surface px-3 text-body text-text-primary outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                  >
                    {TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-body-sm font-medium text-text-secondary">
                  Zpráva
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 min-h-32 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-body text-text-primary outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                />
              </div>

              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      if (event.target.checked) setConsentError(false);
                    }}
                    aria-describedby={consentError ? 'consent-error' : undefined}
                    aria-invalid={consentError}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent-primary focus:ring-[3px] focus:ring-accent-primary/15"
                  />
                  <span className="text-body-sm text-text-secondary">
                    Souhlasím se zpracováním osobních údajů za účelem vyřízení mého dotazu.
                  </span>
                </label>
                {consentError && (
                  <p id="consent-error" role="alert" className="mt-1.5 text-body-sm text-danger">
                    Pro odeslání formuláře je nutný souhlas se zpracováním osobních údajů.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-accent-primary-hover"
              >
                Kontaktujte nás
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
