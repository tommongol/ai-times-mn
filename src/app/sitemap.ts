import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/data/news';
import { SECTIONS, sectionPath } from '@/data/sections';
import { SITE_URL, absoluteUrl, isoDateUB } from '@/lib/seo';

// Хайлтын системд зориулсан бүх хуудасны жагсаалт. Хайлтын хуудас (/hailt), цуцлах/баталгаажуулах
// хуудас энд орохгүй. lastModified нь тухайн хуудсын хамгийн шинэ нийтлэлийн огноо.

function latestDate(list: { publishedAt: string; publishedTime: string }[]): string | undefined {
  return list.length ? isoDateUB(list[0].publishedAt, list[0].publishedTime) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = SECTIONS.map((s) => ({ s, list: ARTICLES.filter((a) => a.category === s.id) })).filter(
    ({ list }) => list.length > 0
  );

  return [
    { url: SITE_URL, lastModified: latestDate(ARTICLES), changeFrequency: 'hourly', priority: 1 },
    ...sections.map(({ s, list }) => ({
      url: `${SITE_URL}${sectionPath(s.id)}`,
      lastModified: latestDate(list),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/tuhai`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/tovhimol`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/nuutslal`, changeFrequency: 'yearly', priority: 0.2 },
    ...ARTICLES.map((art) => ({
      url: `${SITE_URL}/article/${encodeURIComponent(art.id)}`,
      lastModified: isoDateUB(art.publishedAt, art.publishedTime),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      // SVG нүүр зургийг зургийн хайлтад санал болгохгүй
      images: art.coverImage && !/\.svg$/i.test(art.coverImage) ? [absoluteUrl(art.coverImage)] : undefined,
    })),
  ];
}
