import rawArticles from './articles.json';
import rawLiveWire from './live_wire.json';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: 'all' | 'industry' | 'companies' | 'tech' | 'society' | 'interview' | 'opinion';
  categoryName: string;
  primarySource: string;
  primarySourceUrl: string;
  publishedAt: string;
  publishedTime: string;
  readCount: number;
  readTime?: string;
  tags?: string[];
  rank?: number;
  coverImage: string;
  imageCaption?: string;
  isMainLead?: boolean;
  isHot?: boolean;
  summary: string;
  content: string;
  sources: { name: string; url: string }[];
}

export interface LiveWireItem {
  time: string;
  title: string;
  source: string;
}

export const NAV_SECTIONS = [
  { id: 'all', name: 'БҮХ МЭДЭЭ' },
  { id: 'tech', name: 'AI ТЕХНОЛОГИ' },
  { id: 'companies', name: 'КОМПАНИУД' },
  { id: 'industry', name: 'САЛБАР & БИЗНЕС' },
  { id: 'society', name: 'БОДЛОГО & ХУУЛЬ' },
  { id: 'interview', name: 'ЯРИЛЦЛАГА' },
  { id: 'opinion', name: 'ШИНЖИЛГЭЭ' },
] as const;

export const ARTICLES: NewsArticle[] = rawArticles as NewsArticle[];
export const LIVE_WIRE: LiveWireItem[] = rawLiveWire as LiveWireItem[];
