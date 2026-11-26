import React from 'react';

export const SITE_URL = 'https://ai.mongol.guru';
export const SITE_NAME = 'AI Mongolia';
export const SITE_TITLE = 'AI Mongolia — Хиймэл оюуны (AI) мэдээ монгол хэлээр';
export const SITE_DESCRIPTION =
  'Хиймэл оюун ухааны өдөр тутмын мэдээ, шинжилгээ, зурагт тойм монгол хэлээр: шинэ AI загвар, робот, хууль бодлого, бизнес, ярилцлага.';
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};
export const LOGO_URL = `${SITE_URL}/logo.png`;
export const RSS_PATH = '/rss.xml';

/** Хуудасны canonical хаяг + RSS-ийн холбоос. Хуудас бүр alternates-ээ өөрөө зарладаг тул хамтад нь өгнө. */
export function pageAlternates(canonical: string) {
  return {
    canonical,
    types: { 'application/rss+xml': [{ url: RSS_PATH, title: `${SITE_NAME} — хиймэл оюуны мэдээ` }] },
  };
}

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export const PUBLISHER = {
  '@type': 'NewsMediaOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
  email: 'hello@mongol.guru',
};

/** Нийтлэлийн огноо, цагийг Улаанбаатарын бүсээр (UTC+8) ISO хэлбэрт. */
export function isoDateUB(publishedAt?: string, publishedTime?: string): string | undefined {
  if (!publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) return undefined;
  const time = publishedTime && /^\d{1,2}:\d{2}$/.test(publishedTime) ? publishedTime.padStart(5, '0') : '09:00';
  return `${publishedAt}T${time}:00+08:00`;
}

/** schema.org BreadcrumbList. Сүүлийн зүйлд хаяг заавал биш. */
export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      ...(it.path ? { item: absoluteUrl(it.path) } : {}),
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
