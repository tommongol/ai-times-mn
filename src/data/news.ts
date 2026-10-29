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

export const ARTICLES: NewsArticle[] = (rawArticles as NewsArticle[]).map(normalizeCategory);
export const LIVE_WIRE: LiveWireItem[] = rawLiveWire as LiveWireItem[];

export function toArticleCard(art: NewsArticle): ArticleCardData {
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
    previewImages: art.previewImages,
    summary: art.summary,
  };
}
