import React from 'react';

export const SITE_URL = 'https://ai.mongol.guru';
export const SITE_NAME = 'AI Mongolia';
export const SITE_TITLE = 'AI Mongolia — Хиймэл оюуны мэдээ, шинжилгээ';
export const SITE_DESCRIPTION =
  'Хиймэл оюуны салбарын хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, технологийн шинжилгээг нэг дороос.';
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};
export const LOGO_URL = `${SITE_URL}/logo.png`;

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

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
