import React from 'react';
import type { Metadata } from 'next';
import { ARTICLES, toArticleCard } from '@/data/news';
import { HomeClient } from '@/components/HomeClient';
import { JsonLd, PUBLISHER, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      ...PUBLISHER,
      description: SITE_DESCRIPTION,
      inLanguage: 'mn',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'mn',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function HomePage() {
  const cardArticles = ARTICLES.map(toArticleCard);
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeClient articles={cardArticles} />
    </>
  );
}
