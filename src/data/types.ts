export type ArticleCategory =
  | 'all'
  | 'review'
  | 'tech'
  | 'robotics'
  | 'law'
  | 'industry'
  | 'interview'
  | 'opinion';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ArticleCategory;
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
  previewImages?: string[];
  summary: string;
  content: string;
  sources: { name: string; url: string }[];
}

export type ArticleCardData = Omit<NewsArticle, 'content' | 'sources'> & {
  content?: string;
  sources?: { name: string; url: string }[];
};

export interface LiveWireItem {
  time: string;
  title: string;
  source: string;
}

export const NAV_SECTIONS = [
  { id: 'all', name: 'БҮХ МЭДЭЭ' },
  { id: 'review', name: 'ЗУРАГТ ТОЙМ' },
  { id: 'tech', name: 'AI ТЕХНОЛОГИ' },
  { id: 'robotics', name: 'РОБОТ' },
  { id: 'law', name: 'ХУУЛЬ, ШҮҮХ & БОДЛОГО' },
  { id: 'industry', name: 'САЛБАР & БИЗНЕС' },
  { id: 'interview', name: 'НАМТАР & ХӨРӨГ' },
  { id: 'opinion', name: 'ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ' },
] as const;

// Нэгтгэсэн хуучин ангиллын холбоос (?section=models г.м.) шинэ ангилал руугаа очно
export const LEGACY_SECTION_ALIASES: Record<string, string> = {
  models: 'tech',
  policy: 'law',
  companies: 'industry',
};
