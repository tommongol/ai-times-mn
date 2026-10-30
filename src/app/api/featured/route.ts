import { NextResponse } from 'next/server';
import { ARTICLES, NewsArticle, selectFeaturedArticles } from '@/data/news';

// Нүүрний хоёр онцлох материал — «Хадаас материал» ба «Зурагт тойм». mongol.guru-гийн нүүр хуудас
// үүнийг уншиж харуулна. Нүүртэй яг ижил selectFeaturedArticles() дүрмээр хамгийн шинэ хоёр мэдээг сонгоно.

export const dynamic = 'force-static';

const SITE = 'https://ai.mongol.guru';

function card(a: NewsArticle) {
  return {
    id: a.id,
    title: a.title,
    summary: a.summary || a.subtitle,
    image: a.coverImage ? new URL(a.coverImage, SITE).href : null,
    url: `${SITE}/article/${encodeURIComponent(a.id)}`,
  };
}

export function GET() {
  const { mainLead, reviewLead } = selectFeaturedArticles(ARTICLES);
  const items = [mainLead, reviewLead].filter((a): a is NewsArticle => Boolean(a)).map(card);
  return NextResponse.json({ items });
}
