import React from 'react';
import { ARTICLES, LIVE_WIRE, toArticleCard } from '@/data/news';
import { ArticleDetailClient } from '@/components/ArticleDetailClient';

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

  return (
    <ArticleDetailClient
      article={article}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      relatedArticles={relatedArticles}
      trendingArticles={trendingArticles}
      moreStories={moreStories}
      liveWire={LIVE_WIRE.slice(0, 6)}
    />
  );
}
