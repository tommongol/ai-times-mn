import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/data/news';

const SITE_URL = 'https://ai.mongol.guru';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/tovhimol`, changeFrequency: 'yearly', priority: 0.5 },
    ...ARTICLES.map((art) => ({
      url: `${SITE_URL}/article/${encodeURIComponent(art.id)}`,
      lastModified: art.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
