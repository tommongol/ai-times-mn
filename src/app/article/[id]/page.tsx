import React from 'react';
import { ARTICLES } from '@/data/news';
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
  return <ArticleDetailClient initialId={resolved?.id} />;
}
