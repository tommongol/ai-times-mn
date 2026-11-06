import { ArticleDetailClient } from '@/components/ArticleDetailClient';

export default function ArticleNotFound() {
  return (
    <ArticleDetailClient
      article={null}
      prevArticle={null}
      nextArticle={null}
      relatedArticles={[]}
      trendingArticles={[]}
      moreStories={[]}
    />
  );
}
