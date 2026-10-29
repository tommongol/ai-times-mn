import { NextResponse } from 'next/server';
import { ARTICLES } from '@/data/news';

// Гол мэдээ (нүүрний «Хадаас материал») — mongol.guru-гийн нүүр хуудас үүнийг уншиж харуулна.
// Нүүртэй адил дүрмээр сонгоно. Статик: байршуулалт бүрд шинэчлэгдэнэ.

export const dynamic = 'force-static';

const SITE = 'https://ai.mongol.guru';

export function GET() {
  const lead = ARTICLES.find((a) => a.isMainLead) || ARTICLES[0];
  if (!lead) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json({
    id: lead.id,
    title: lead.title,
    summary: lead.subtitle || lead.summary,
    category: lead.categoryName,
    publishedAt: lead.publishedAt,
    image: lead.coverImage ? new URL(lead.coverImage, SITE).href : null,
    url: `${SITE}/article/${encodeURIComponent(lead.id)}`,
  });
}
