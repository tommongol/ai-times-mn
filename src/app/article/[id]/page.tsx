import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, toArticleCard, type NewsArticle } from '@/data/news';
import { ArticleDetailClient } from '@/components/ArticleDetailClient';
import {
  JsonLd,
  PUBLISHER,
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '@/lib/seo';
import { publicImageSize } from '@/lib/imageSize';

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
  if (!art.publishedAt) return undefined;
  const time = art.publishedTime && /^\d{1,2}:\d{2}$/.test(art.publishedTime) ? art.publishedTime.padStart(5, '0') : '09:00';
  return `${art.publishedAt}T${time}:00+08:00`;
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
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description,
      siteName: SITE_NAME,
      locale: 'mn_MN',
      images: [image],
      publishedTime: published,
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
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title.slice(0, 110),
    description: articleDescription(article),
    image: [article.coverImage ? absoluteUrl(article.coverImage) : DEFAULT_OG_IMAGE.url],
    datePublished: published,
    dateModified: published,
    inLanguage: 'mn',
    articleSection: article.categoryName,
    keywords: article.tags?.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${articlePath(article)}` },
    url: `${SITE_URL}${articlePath(article)}`,
    author: author
      ? { '@type': /AI Mongolia|Баг/i.test(author) ? 'Organization' : 'Person', name: author }
      : { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: PUBLISHER,
  };

  return (
    <>
    <JsonLd data={articleJsonLd} />
    <ArticleDetailClient
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      relatedArticles={relatedArticles}
      trendingArticles={trendingArticles}
      moreStories={moreStories}
    />
    </>
  );
}
