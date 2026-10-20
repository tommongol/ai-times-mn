import React from 'react';
import { ARTICLES, LIVE_WIRE, toArticleCard } from '@/data/news';
import { HomeClient } from '@/components/HomeClient';

export default function HomePage() {
  const cardArticles = ARTICLES.map(toArticleCard);
  return <HomeClient articles={cardArticles} liveWire={LIVE_WIRE} />;
}
