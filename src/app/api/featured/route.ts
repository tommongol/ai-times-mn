import { NextResponse } from 'next/server';
import { ARTICLES, NewsArticle } from '@/data/news';

// Нүүрний хоёр онцлох материал — «Хадаас материал» ба «Зурагт тойм». mongol.guru-гийн нүүр хуудас
// үүнийг уншиж харуулна. Нүүртэй адил дүрмээр сонгоно. Статик: байршуулалт бүрд шинэчлэгдэнэ.

export const dynamic = 'force-static';

const SITE = 'https://ai.mongol.guru';

function card(a: NewsArticle) {
  return {
    id: a.id,
    title: a.title,
    summary: a.subtitle || a.summary,
    image: a.coverImage ? new URL(a.coverImage, SITE).href : null,
    url: `${SITE}/article/${encodeURIComponent(a.id)}`,
  };
}

export function GET() {
  const lead = ARTICLES.find((a) => a.isMainLead) || ARTICLES[0];
  const review = ARTICLES.find((a) => a.category === 'review' && a.id !== lead?.id);
  const items = [lead, review].filter((a): a is NewsArticle => Boolean(a)).map(card);
  return NextResponse.json({ items });
}
