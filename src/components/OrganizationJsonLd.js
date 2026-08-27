// Structured data (schema.org Organization) for rich results / knowledge
// panels. Only facts confirmed for the company are included — no phone
// number yet (still a placeholder in Contact.js), so it's left out here
// rather than feeding search engines a fake one.
export default function OrganizationJsonLd({ siteUrl }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MomentumMinds s.r.o.',
    alternateName: 'Momentum Minds',
    slogan: 'Ideas that create momentum. Solutions that deliver results.',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    image: `${siteUrl}/og-image.png`,
    description:
      'Momentum Minds spojuje marketing náboru s navazující organizační podporou a průmyslové služby v oblasti zpracování kovů.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Olšanská 54/3',
      addressLocality: 'Praha 3 – Žižkov',
      postalCode: '130 00',
      addressCountry: 'CZ',
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'IČO',
      value: '24670804',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@momentumminds.cz',
      areaServed: 'CZ',
      availableLanguage: ['Czech'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Czech Republic',
    },
    knowsAbout: [
      'Recruitment Marketing & Advertising',
      'Business Support',
      'Metalworking & Assembly',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Marketing & Advertising',
          description:
            'Reklama, marketing a propagace pracovních nabídek pro agentury práce a zaměstnavatele s pravidelnou potřebou náboru.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Support',
          description:
            'Organizační, logistická a administrativní podpora kolem náboru a nástupu zaměstnanců.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Metalworking & Assembly',
          description:
            'Zpracování kovů, montáž a další výrobní práce realizované přímo na místě u zákazníka.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
