import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ARTICLES, toArticleCard } from '@/data/news';
import { SECTION_PAGE_SIZE, SectionInfo, sectionPath } from '@/data/sections';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { ArticleRow } from '@/components/ArticleRow';
import {
  JsonLd,
  PUBLISHER,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  breadcrumbJsonLd,
  pageAlternates,
} from '@/lib/seo';

export function sectionArticles(sectionId: string) {
  return ARTICLES.filter((a) => a.category === sectionId);
}

export function sectionPageCount(sectionId: string): number {
  return Math.max(1, Math.ceil(sectionArticles(sectionId).length / SECTION_PAGE_SIZE));
}

export function sectionMetadata(section: SectionInfo, page: number): Metadata {
  const total = sectionArticles(section.id).length;
  const suffix = page > 1 ? ` — ${page}-р хуудас` : '';
  const title = `${section.label}: хиймэл оюуны мэдээ${suffix} — ${SITE_NAME}`;
  const url = sectionPath(section.id, page);
  return {
    title,
    description: section.description,
    alternates: pageAlternates(url),
    // Хоосон буланг хайлтад оруулахгүй
    ...(total === 0 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      url,
      title,
      description: section.description,
      siteName: SITE_NAME,
      locale: 'mn_MN',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: section.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

function pageNumbers(current: number, last: number): (number | null)[] {
  const wanted = new Set([1, last, current - 1, current, current + 1]);
  const pages = [...wanted].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b);
  const out: (number | null)[] = [];
  pages.forEach((n, i) => {
    if (i > 0 && n - pages[i - 1] > 1) out.push(null);
    out.push(n);
  });
  return out;
}

export function SectionListing({ section, page }: { section: SectionInfo; page: number }) {
  const all = sectionArticles(section.id);
  const lastPage = sectionPageCount(section.id);
  const start = (page - 1) * SECTION_PAGE_SIZE;
  const items = all.slice(start, start + SECTION_PAGE_SIZE).map(toArticleCard);
  const url = `${SITE_URL}${sectionPath(section.id, page)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        url,
        name: `${section.label}: хиймэл оюуны мэдээ`,
        description: section.description,
        inLanguage: 'mn',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: PUBLISHER,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((a, idx) => ({
            '@type': 'ListItem',
            position: start + idx + 1,
            url: absoluteUrl(`/article/${encodeURIComponent(a.id)}`),
            name: a.title,
          })),
        },
      },
      breadcrumbJsonLd([{ name: 'Нүүр', path: '/' }, { name: section.label, path: sectionPath(section.id) }]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
        <NewspaperHeader activeSection={section.id} />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="pb-4 mb-6 border-b-2 border-black">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="w-3 h-3 bg-[#00FF66] inline-block border border-black"></span>
                <h1 className="font-mono text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                  /// {section.name}
                </h1>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-[#00FF66]">
                  {all.length} НИЙТЛЭЛ
                </span>
                {lastPage > 1 && (
                  <span className="font-mono text-xs text-neutral-600">
                    ХУУДАС {page}/{lastPage}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
                {section.description}
              </p>
            </div>

            {items.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {items.map((art, idx) => (
                  <ArticleRow key={art.id} art={art} eager={idx < 2} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-neutral-50 border-2 border-black p-8 my-6">
                <h2 className="font-mono text-base font-black text-black mb-2 uppercase">
                  ЭНЭ АНГИЛАЛД УДАХГҮЙ МЭДЭЭ НЭМЭГДЭНЭ
                </h2>
                <p className="text-xs text-neutral-600 max-w-md mx-auto font-mono">
                  Шинэ булан нээгдлээ. Анхны нийтлэлүүд бэлтгэгдэж байна.
                </p>
              </div>
            )}

            {lastPage > 1 && (
              <nav
                aria-label="Хуудаслалт"
                className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold"
              >
                {page > 1 && (
                  <Link
                    href={sectionPath(section.id, page - 1)}
                    rel="prev"
                    className="px-3 py-2 border border-black bg-white hover:bg-black hover:text-[#00FF66] transition-colors uppercase"
                  >
                    ← ӨМНӨХ
                  </Link>
                )}
                {pageNumbers(page, lastPage).map((n, idx) =>
                  n === null ? (
                    <span key={`gap-${idx}`} className="px-1 text-neutral-500">
                      …
                    </span>
                  ) : (
                    <Link
                      key={n}
                      href={sectionPath(section.id, n)}
                      aria-current={n === page ? 'page' : undefined}
                      aria-label={`${n}-р хуудас`}
                      className={`px-3 py-2 border border-black transition-colors ${
                        n === page ? 'bg-black text-[#00FF66]' : 'bg-white hover:bg-black hover:text-[#00FF66]'
                      }`}
                    >
                      {n}
                    </Link>
                  )
                )}
                {page < lastPage && (
                  <Link
                    href={sectionPath(section.id, page + 1)}
                    rel="next"
                    className="px-3 py-2 border border-black bg-white hover:bg-black hover:text-[#00FF66] transition-colors uppercase"
                  >
                    ДАРААХ →
                  </Link>
                )}
              </nav>
            )}
          </div>
        </main>

        <NewspaperFooter />
      </div>
    </>
  );
}
