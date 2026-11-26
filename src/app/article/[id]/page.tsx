import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ARTICLES, toArticleCard, type NewsArticle } from '@/data/news';
import { ArticleDetail } from '@/components/ArticleDetail';
import {
  JsonLd,
  PUBLISHER,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  breadcrumbJsonLd,
  isoDateUB,
  pageAlternates,
} from '@/lib/seo';
import { publicImageSize } from '@/lib/imageSize';
import { enhanceArticleHtml } from '@/lib/articleHtml';
import { getSection, sectionPath } from '@/data/sections';

function findArticle(rawId: string): NewsArticle | null {
  const articleId = decodeURIComponent(rawId || '');
  return ARTICLES.find((a) => a.id === articleId || a.slug === articleId) || null;
}

function articlePath(art: NewsArticle): string {
  return `/article/${encodeURIComponent(art.id)}`;
}

function articleDescription(art: NewsArticle): string {
  const text = (art.subtitle || art.summary || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > 200 ? `${text.slice(0, 197)}…` : text;
}

function articleIsoDate(art: NewsArticle): string | undefined {
  return isoDateUB(art.publishedAt, art.publishedTime);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const article = findArticle(resolved?.id || '');
  if (!article) return { title: `Мэдээ олдсонгүй — ${SITE_NAME}`, robots: { index: false } };

  const title = `${article.title} — ${SITE_NAME}`;
  const description = articleDescription(article);
  const url = articlePath(article);
  // Social cards need a raster picture with its size; an SVG cover falls back to the site card.
  const size = article.coverImage ? publicImageSize(article.coverImage) : null;
  const image = article.coverImage && size
    ? { url: absoluteUrl(article.coverImage), alt: article.title, ...size }
    : DEFAULT_OG_IMAGE;
  const published = articleIsoDate(article);
  const author = (article as NewsArticle & { author?: string }).author;

  return {
    title,
    description,
    alternates: pageAlternates(url),
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description,
      siteName: SITE_NAME,
      locale: 'mn_MN',
      images: [image],
      publishedTime: published,
      modifiedTime: published,
      section: article.categoryName,
      tags: article.tags,
      authors: author ? [author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [image.url],
    },
  };
}

export function generateStaticParams() {
  return ARTICLES.map((art) => ({
    id: art.id,
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const articleId = decodeURIComponent(resolved?.id || '');

  const currentIndex = ARTICLES.findIndex(
    (a) => a.id === articleId || a.slug === articleId
  );

  const article = currentIndex >= 0 ? ARTICLES[currentIndex] : null;
  if (!article) notFound();
  // Slug-аар орсон хаяг нэг л хаягт нэгдэнэ: /article/<id>
  if (article.id !== articleId) permanentRedirect(articlePath(article));
  const prevArticle =
    currentIndex > 0 ? toArticleCard(ARTICLES[currentIndex - 1]) : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < ARTICLES.length - 1
      ? toArticleCard(ARTICLES[currentIndex + 1])
      : null;

  const sameCat = article
    ? ARTICLES.filter((a) => a.id !== article.id && a.category === article.category)
    : [];
  const others = article
    ? ARTICLES.filter((a) => a.id !== article.id && a.category !== article.category)
    : ARTICLES;
  const relatedArticles = [...sameCat, ...others].slice(0, 6).map(toArticleCard);

  const trendingArticles = [...ARTICLES]
    .filter((a) => a.id !== article?.id)
    .sort((a, b) => (b.readCount || 0) - (a.readCount || 0))
    .slice(0, 5)
    .map(toArticleCard);

  const excludeIds = new Set([
    article?.id,
    ...relatedArticles.map((r) => r.id),
  ]);
  const moreStories = ARTICLES.filter((a) => !excludeIds.has(a.id))
    .slice(0, 4)
    .map(toArticleCard);

  const author = (article as NewsArticle & { author?: string }).author;
  const published = articleIsoDate(article);
  const url = `${SITE_URL}${articlePath(article)}`;
  const coverSize = article.coverImage ? publicImageSize(article.coverImage) : null;
  const section = getSection(article.category);
  const wordCount = article.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${url}#article`,
        headline: article.title.slice(0, 110),
        description: articleDescription(article),
        image: article.coverImage
          ? [
              coverSize
                ? { '@type': 'ImageObject', url: absoluteUrl(article.coverImage), ...coverSize }
                : absoluteUrl(article.coverImage),
            ]
          : [DEFAULT_OG_IMAGE.url],
        datePublished: published,
        dateModified: published,
        inLanguage: 'mn',
        articleSection: article.categoryName,
        keywords: article.tags?.join(', '),
        wordCount,
        isAccessibleForFree: true,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        author: author
          ? { '@type': /AI Mongolia|Баг/i.test(author) ? 'Organization' : 'Person', name: author }
          : { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: PUBLISHER,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      breadcrumbJsonLd([
        { name: 'Нүүр', path: '/' },
        ...(section ? [{ name: section.label, path: sectionPath(section.id) }] : []),
        { name: article.title },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <ArticleDetail
        article={article}
        contentHtml={enhanceArticleHtml(article.content)}
        coverSize={coverSize}
        publishedIso={published}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        relatedArticles={relatedArticles}
        trendingArticles={trendingArticles}
        moreStories={moreStories}
      />
    </>
  );
}
