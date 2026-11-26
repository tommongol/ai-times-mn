import { NextResponse } from 'next/server';
import { ARTICLES } from '@/data/news';

// Хайлтын хуудас (/hailt) хэрэгтэй үедээ л татах хөнгөн жагсаалт. Нүүр хуудсанд бүх нийтлэлийг
// ачаалахгүйн тулд тусад нь гаргасан. Статик: байршуулалт бүрд шинэчлэгдэнэ.

export const dynamic = 'force-static';

export function GET() {
  const items = ARTICLES.map((a) => ({
    id: a.id,
    title: a.title,
    subtitle: a.subtitle || '',
    summary: a.summary,
    category: a.category,
    categoryName: a.categoryName,
    tags: a.tags || [],
    publishedAt: a.publishedAt,
    publishedTime: a.publishedTime,
    readCount: a.readCount || 0,
    coverImage: a.coverImage,
  }));
  return NextResponse.json(
    { items },
    { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' } }
  );
}
