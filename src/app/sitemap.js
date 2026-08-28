const SITE_URL = process.env.SITE_URL;

export default function sitemap() {
  // 1. Защита от падения сборки, если переменная окружения не задана
  if (!SITE_URL) {
    return [];
  }

  return [
    {
      // 2. Убираем дублирование слэшей для главной страницы
      url: SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // Изменено с yearly
      priority: 1.0,
    },
    {
      // 3. Безопасная склейка пути для второй страницы
      url: `${SITE_URL.replace(/\/$/, '')}/ochrana-osobnich-udaju`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Изменено с monthly
      priority: 0.3, // Изменено с 0.8
    },
  ];
}
