import rawArticles from './articles.json';
import rawLiveWire from './live_wire.json';
import { NewsArticle, ArticleCardData, LiveWireItem, NAV_SECTIONS, LEGACY_SECTION_ALIASES } from './types';

export type { NewsArticle, ArticleCardData, LiveWireItem };
export { NAV_SECTIONS };

// Мэдээ автоматаар нэмэгдэхэд хуучин ангилал (models, policy, companies) ирсэн ч шинэ булан руугаа орно
function normalizeCategory(art: NewsArticle): NewsArticle {
  const category = (LEGACY_SECTION_ALIASES[art.category] || art.category) as NewsArticle['category'];
  const section = NAV_SECTIONS.find((s) => s.id === category);
  return section ? { ...art, category, categoryName: section.name } : art;
}

function articleTimestamp(art: { publishedAt?: string; publishedTime?: string }): number {
  const dt = `${art.publishedAt || '1970-01-01'}T${art.publishedTime || '00:00'}`;
  const t = Date.parse(dt);
  return Number.isNaN(t) ? 0 : t;
}

function extractContentImages(html?: string): string[] {
  if (!html) return [];
  const matches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const m of matches) {
    const url = m[1]?.trim();
    if (url && !seen.has(url)) {
      seen.add(url);
      urls.push(url);
    }
  }
  return urls;
}

export const ARTICLES: NewsArticle[] = (rawArticles as NewsArticle[])
  .map(normalizeCategory)
  .sort((a, b) => articleTimestamp(b) - articleTimestamp(a));

export const LIVE_WIRE: LiveWireItem[] = rawLiveWire as LiveWireItem[];

/**
 * Нүүр хуудасны болон mongol.guru (/api/featured)-ийн хоёр онцлох мэдээг
 * огнооны эрэмбээр автоматаар сонгоно:
 * 1) mainLead — Хамгийн сүүлд орсон Хадаас материал (review бус, isMainLead=true эсвэл хамгийн шинэ нийтлэл)
 * 2) reviewLead — Хамгийн сүүлд орсон Зурагт тойм (category === 'review')
 */
export function selectFeaturedArticles<T extends { id: string; category: string; isMainLead?: boolean }>(
  list: T[]
): { mainLead: T; reviewLead: T | null } {
  const nonReview = list.filter((a) => a.category !== 'review');
  const mainLead = nonReview.find((a) => a.isMainLead) || nonReview[0] || list[0];
  const reviewLead = list.find((a) => a.category === 'review' && a.id !== mainLead?.id) || null;
  return { mainLead, reviewLead };
}

export function toArticleCard(art: NewsArticle): ArticleCardData {
  const autoThumbs =
    art.previewImages && art.previewImages.length > 0
      ? art.previewImages
      : art.category === 'review'
        ? extractContentImages(art.content).slice(0, 6)
        : undefined;

  return {
    id: art.id,
    slug: art.slug,
    title: art.title,
    subtitle: art.subtitle,
    category: art.category,
    categoryName: art.categoryName,
    primarySource: art.primarySource,
    primarySourceUrl: art.primarySourceUrl,
    publishedAt: art.publishedAt,
    publishedTime: art.publishedTime,
    readCount: art.readCount,
    readTime: art.readTime,
    tags: art.tags,
    rank: art.rank,
    coverImage: art.coverImage,
    imageCaption: art.imageCaption,
    isMainLead: art.isMainLead,
    isHot: art.isHot,
    previewImages: autoThumbs,
    summary: art.summary,
  };
}
