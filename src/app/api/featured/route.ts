import { NextResponse } from 'next/server';
import { ARTICLES, NewsArticle, selectFeaturedArticles } from '@/data/news';

// Нүүрний хоёр онцлох материал — «Хадаас материал» ба «Зурагт тойм». mongol.guru-гийн нүүр хуудас
// үүнийг уншиж харуулна. Нүүртэй адил дүрмээр сонгоно. Статик: байршуулалт бүрд шинэчлэгдэнэ.

export const dynamic = 'force-static';

const SITE = 'https://ai.mongol.guru';

// HTML догол мөрийг энгийн текст болгоно: тэмдэглэгээ, entity, илүү зай хасна.
function clean(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Нийтлэлийн бие дэх <p> догол мөрүүд; богино тайлбар, зургийн гарчгийг оруулахгүй.
function paragraphs(html?: string): string[] {
  if (!html) return [];
  return [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => clean(m[1])).filter((t) => t.length >= 60);
}

function cut(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : text;
}

function card(a: NewsArticle) {
  // Эхний догол мөр нь ихэвчлэн summary-той давхцдаг тул «body» нь хоёр дахь догол мөр.
  const [first, ...rest] = paragraphs(a.content);
  return {
    id: a.id,
    title: a.title,
    subtitle: a.subtitle || '',
    summary: a.summary || first || a.subtitle || '',
    body: cut(rest[0] || '', 600),
    image: a.coverImage ? new URL(a.coverImage, SITE).href : null,
    url: `${SITE}/article/${encodeURIComponent(a.id)}`,
  };
}

export function GET() {
  const { mainLead, reviewLead } = selectFeaturedArticles(ARTICLES);
  const items = [mainLead, reviewLead].filter((a): a is NewsArticle => Boolean(a)).map(card);
  return NextResponse.json({ items });
}
