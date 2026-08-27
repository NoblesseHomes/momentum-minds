import Link from 'next/link';
import { TbArrowLeft } from 'react-icons/tb';

export const metadata = {
  title: 'Ochrana osobních údajů a cookies | Momentum Minds',
  description:
    'Informace o zpracování osobních údajů a používání cookies na webu Momentum Minds v souladu s GDPR.',
};

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-h3 font-display font-semibold text-text-primary lg:text-h3-desktop">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-body text-text-secondary lg:text-body-desktop">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="section-space">
      <div className="container-page max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-accent-primary hover:underline"
        >
          <TbArrowLeft size={16} aria-hidden="true" />
          Zpět na hlavní stránku
        </Link>

        <h1 className="mt-6 text-h2 font-display font-bold text-text-primary lg:text-h2-desktop">
          Ochrana osobních údajů a cookies
        </h1>
        <p className="mt-3 text-body-lg text-text-secondary lg:text-body-lg-desktop">
          Tento dokument vysvětluje, jaké osobní údaje MomentumMinds s.r.o.
          zpracovává v souvislosti s provozem webu momentumminds.cz, k jakému
          účelu a jaká práva v této souvislosti máte.
        </p>
        <p className="mt-2 font-mono text-body-sm text-text-muted">
          Poslední aktualizace: 27. srpna 2026
        </p>

        <div className="mt-10 space-y-10">
          <Section id="spravce" title="1. Správce osobních údajů">
            <p>
              Správcem osobních údajů je společnost{' '}
              <strong className="font-medium text-text-primary">
                MomentumMinds s.r.o.
              </strong>
              , se sídlem Olšanská 54/3, Žižkov, 130 00 Praha 3, IČO 24670804,
              zapsaná v obchodním rejstříku vedeném Městským soudem v Praze
              pod sp. zn. C 164926.
            </p>
            <p>
              Ve věcech ochrany osobních údajů nás můžete kontaktovat na
              e-mailu{' '}
              <a
                href="mailto:info@momentumminds.cz"
                className="text-accent-primary hover:underline"
              >
                info@momentumminds.cz
              </a>
              .
            </p>
          </Section>

          <Section id="kontaktni-formular" title="2. Údaje z kontaktního formuláře">
            <p>
              Pokud nás oslovíte přes kontaktní formulář na webu, zpracováváme
              údaje, které nám sami poskytnete: jméno a příjmení, e-mail,
              telefon, vybranou oblast zájmu a obsah zprávy.
            </p>
            <p>
              <strong className="font-medium text-text-primary">Účel:</strong>{' '}
              vyřízení vašeho dotazu a příprava nabídky spolupráce.
              <br />
              <strong className="font-medium text-text-primary">
                Právní základ:
              </strong>{' '}
              jednání o uzavření smlouvy na váš podnět (čl. 6 odst. 1 písm. b)
              GDPR) a náš oprávněný zájem na vyřízení dotazu.
              <br />
              <strong className="font-medium text-text-primary">
                Doba uchování:
              </strong>{' '}
              po dobu jednání o spolupráci, nejdéle 24 měsíců od posledního
              kontaktu, pokud nevznikne smluvní vztah s delší archivační
              povinností.
            </p>
            <p>
              Formulář je chráněn nástrojem Cloudflare Turnstile proti
              automatizovanému zneužití (spamu) a odesílán přes službu Resend.
              Oba jsou zpracovateli podle čl. 28 GDPR.
            </p>
          </Section>

          <Section id="cookies" title="3. Cookies">
            <p>
              Web používá cookies v rozsahu, který si zvolíte v cookie liště
              při první návštěvě. Souhlas je dobrovolný a můžete jej kdykoli
              odvolat vymazáním dat prohlížeče pro tuto doménu — lišta se pak
              zobrazí znovu.
            </p>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-body-sm lg:text-body-sm-desktop">
                <thead>
                  <tr className="border-b border-border bg-surface text-left font-mono text-tag uppercase tracking-wide text-text-muted">
                    <th className="px-4 py-3 font-medium">Cookie</th>
                    <th className="px-4 py-3 font-medium">Účel</th>
                    <th className="px-4 py-3 font-medium">Platnost</th>
                    <th className="px-4 py-3 font-medium">Vyžaduje souhlas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 font-mono text-text-primary">
                      local-cookie-consent
                    </td>
                    <td className="px-4 py-3">
                      Uchovává vaši volbu ohledně analytických cookies.
                    </td>
                    <td className="px-4 py-3">1 rok</td>
                    <td className="px-4 py-3">Ne — nezbytná</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-text-primary">
                      guest_token
                    </td>
                    <td className="px-4 py-3">
                      Anonymní identifikátor proti zneužití kontaktního
                      formuláře (ochrana před nadměrným počtem požadavků).
                    </td>
                    <td className="px-4 py-3">1 rok</td>
                    <td className="px-4 py-3">Ne — nezbytná</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-text-primary">
                      cf_clearance / cf-turnstile
                    </td>
                    <td className="px-4 py-3">
                      Ověření, že formulář odesílá člověk, ne robot
                      (Cloudflare Turnstile).
                    </td>
                    <td className="px-4 py-3">dle Cloudflare</td>
                    <td className="px-4 py-3">Ne — nezbytná</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-text-primary">
                      _ga, _ga_*, _gid
                    </td>
                    <td className="px-4 py-3">
                      Google Analytics — anonymizovaná statistika
                      návštěvnosti webu.
                    </td>
                    <td className="px-4 py-3">až 2 roky</td>
                    <td className="px-4 py-3">Ano</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="prijemci" title="4. Příjemci a zpracovatelé">
            <p>Osobní údaje mohou být zpřístupněny těmto zpracovatelům:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Resend — doručování e-mailů z kontaktního formuláře</li>
              <li>Cloudflare — ochrana formuláře proti zneužití (Turnstile)</li>
              <li>
                Google Analytics (Google Ireland Limited) — pouze při vašem
                souhlasu s analytickými cookies
              </li>
              <li>
                poskytovatel hostingu a infrastruktury, na které web běží
              </li>
            </ul>
            <p>
              Osobní údaje nepředáváme žádným třetím stranám za účelem jejich
              vlastního marketingu.
            </p>
          </Section>

          <Section id="prava" title="5. Vaše práva">
            <p>V souladu s GDPR máte právo:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>na přístup ke svým osobním údajům,</li>
              <li>na opravu nepřesných údajů,</li>
              <li>na výmaz („právo být zapomenut“),</li>
              <li>na omezení zpracování,</li>
              <li>na přenositelnost údajů,</li>
              <li>vznést námitku proti zpracování,</li>
              <li>kdykoli odvolat souhlas, aniž je tím dotčena zákonnost zpracování před jeho odvoláním.</li>
            </ul>
            <p>
              Svá práva můžete uplatnit na e-mailu{' '}
              <a
                href="mailto:info@momentumminds.cz"
                className="text-accent-primary hover:underline"
              >
                info@momentumminds.cz
              </a>
              . Máte také právo podat stížnost u Úřadu pro ochranu osobních
              údajů (Pplk. Sochora 27, 170 00 Praha 7,{' '}
              <a
                href="https://www.uoou.cz"
                target="_blank"
                rel="noreferrer"
                className="text-accent-primary hover:underline"
              >
                uoou.cz
              </a>
              ).
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
