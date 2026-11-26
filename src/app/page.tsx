import React from 'react';
import type { Metadata } from 'next';
import { ARTICLES, toArticleCard, selectFeaturedArticles } from '@/data/news';
import { SECTIONS, sectionPath } from '@/data/sections';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperLead } from '@/components/NewspaperLead';
import { SectionBlock } from '@/components/SectionBlock';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { LegacyQueryRedirect } from '@/components/LegacyQueryRedirect';
import { JsonLd, pageAlternates, PUBLISHER, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: pageAlternates('/'),
};

// Нүүрний булангуудын дараалал. Зурагт тойм дээд талын онцлох хэсэгт гардаг тул энд байхгүй.
const HOME_SECTION_ORDER = ['mongolia', 'tech', 'robotics', 'law', 'industry', 'interview', 'opinion'];

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
      alternateName: 'AI Mongolia — хиймэл оюуны мэдээ',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'mn',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/hailt?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function HomePage() {
  const cards = ARTICLES.map(toArticleCard);
  const { mainLead, reviewLead } = selectFeaturedArticles(cards);
  const leadIds = new Set([mainLead?.id, reviewLead?.id].filter(Boolean));
  const remaining = cards.filter((a) => !leadIds.has(a.id));

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <LegacyQueryRedirect />
      <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
        <NewspaperHeader activeSection="all" isHome />

        <main className="flex-1">
          <NewspaperLead mainLead={mainLead} reviewLead={reviewLead} />

          <div className="max-w-7xl mx-auto px-4 pt-8">
            {HOME_SECTION_ORDER.map((id) => {
              const section = SECTIONS.find((s) => s.id === id);
              if (!section) return null;
              return (
                <SectionBlock
                  key={id}
                  title={section.label}
                  articles={remaining.filter((a) => a.category === id)}
                  href={sectionPath(id)}
                />
              );
            })}
          </div>
        </main>

        <NewspaperFooter />
      </div>
    </>
  );
}
