const SITE_URL = process.env.SITE_URL;

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL.replace(/\/$/, '')}/sitemap.xml`,
  };
}
