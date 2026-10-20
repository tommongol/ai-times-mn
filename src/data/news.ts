import rawArticles from './articles.json';
import rawLiveWire from './live_wire.json';
import { NewsArticle, ArticleCardData, LiveWireItem, NAV_SECTIONS } from './types';

export type { NewsArticle, ArticleCardData, LiveWireItem };
export { NAV_SECTIONS };

export const ARTICLES: NewsArticle[] = rawArticles as NewsArticle[];
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
    summary: art.summary,
  };
}
