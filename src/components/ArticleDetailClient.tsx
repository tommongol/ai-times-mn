'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Share2,
  Clock,
  Eye,
  Flame,
  Radio,
  Layers,
} from 'lucide-react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { useNews } from '@/context/NewsContext';
import { ARTICLES as DEFAULT_ARTICLES, LIVE_WIRE as DEFAULT_LIVE_WIRE, NAV_SECTIONS } from '@/data/news';

export function ArticleDetailClient({ initialId }: { initialId?: string }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { articles: contextArticles, liveWire: contextLiveWire } = useNews();

  const articles = contextArticles && contextArticles.length > 0 ? contextArticles : DEFAULT_ARTICLES;
  const liveWire = contextLiveWire && contextLiveWire.length > 0 ? contextLiveWire : DEFAULT_LIVE_WIRE;

  const articleId = decodeURIComponent(initialId || params?.id || '');

  const currentIndex = useMemo(() => {
    return articles.findIndex((a) => a.id === articleId || a.slug === articleId);
  }, [articles, articleId]);

  let article = currentIndex >= 0 ? articles[currentIndex] : null;

  // Bulletproof fallback: If article has stale template from old browser cache, replace with fresh server article
  if (
    !article ||
    article.content.includes('1. Үйл явдлын') ||
    article.content.includes('AImedee.mn') ||
    article.summary.includes('албан ёсны мэдээллээр:')
  ) {
    const fresh = DEFAULT_ARTICLES.find((a) => a.id === articleId || a.slug === articleId);
    if (fresh) article = fresh;
  }

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

  // Related / Recommended articles (same category first, then latest other stories)
  const relatedArticles = useMemo(() => {
    if (!article) return articles.slice(0, 6);
    const sameCat = articles.filter(
      (a) => a.id !== article.id && a.category === article.category
    );
    const others = articles.filter(
      (a) => a.id !== article.id && a.category !== article.category
    );
    return [...sameCat, ...others].slice(0, 6);
  }, [articles, article]);

  // Top 5 most-read stories
  const trendingArticles = useMemo(() => {
    return [...articles]
      .filter((a) => a.id !== article?.id)
      .sort((a, b) => (b.readCount || 0) - (a.readCount || 0))
      .slice(0, 5);
  }, [articles, article]);

  // Bottom 4 stories from other categories
  const moreStories = useMemo(() => {
    const excludeIds = new Set([
      article?.id,
      ...relatedArticles.map((r) => r.id),
    ]);
    return articles.filter((a) => !excludeIds.has(a.id)).slice(0, 4);
  }, [articles, article, relatedArticles]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Мэдээний холбоосыг хууллаа.');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans">
        <NewspaperHeader
          activeSection="all"
          onSelectSection={(sec) => router.push(`/?section=${sec}`)}
          searchQuery=""
          onSearchChange={(q) => {
            if (q) router.push(`/?q=${encodeURIComponent(q)}`);
          }}
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white border-2 border-black p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-mono text-2xl font-black mb-3 uppercase">
              [404] МЭДЭЭ ОЛДСОНГҮЙ
            </h1>
            <p className="text-neutral-600 mb-6">
              Таны хайсан нийтлэл устгагдсан эсвэл хаяг нь өөрчлөгдсөн байна.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-black text-[#00FF66] font-mono text-xs font-bold px-5 py-3 uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>НҮҮР ХУУДАС РУУ БУЦАХ</span>
            </Link>
          </div>
        </main>
        <NewspaperFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
      {/* Global Masthead & Navigation */}
      <NewspaperHeader
        activeSection={article.category}
        onSelectSection={(sec) => router.push(`/?section=${sec}`)}
        searchQuery=""
        onSearchChange={(q) => {
          if (q) router.push(`/?q=${encodeURIComponent(q)}`);
        }}
      />

      {/* Breadcrumb & Reader Toolbar */}
      <div className="bg-neutral-900 text-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-[#00FF66] hover:text-black text-white font-bold px-3 py-1.5 border border-neutral-700 transition-colors uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>НҮҮР ХУУДАС</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <Link
              href={`/?section=${article.category}`}
              className="bg-[#00FF66] text-black font-black px-2.5 py-1 uppercase tracking-wider hover:bg-white transition-colors"
            >
              {article.categoryName}
            </Link>
            <span className="text-neutral-400">
              {article.publishedAt} • {article.publishedTime}
            </span>
            {article.readTime && (
              <span className="inline-flex items-center gap-1 bg-neutral-800 text-[#00FF66] font-bold px-2.5 py-1 border border-neutral-700">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 text-neutral-400">
              <Eye className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>{(article.readCount || 1250).toLocaleString()} уншсан</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 border border-neutral-700 transition-colors cursor-pointer uppercase font-bold"
              title="Хэвлэх"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ХЭВЛЭХ</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-[#00FF66] hover:text-black text-neutral-200 border border-neutral-700 transition-colors cursor-pointer uppercase font-bold"
              title="Холбоос хуулах"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ХУВААЛЦАХ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 12-Column Editorial Page Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT / MAIN READER COLUMN (8 Cols) */}
          <article className="lg:col-span-8 bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {/* Article Header */}
            <header className="pb-6 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
                <span>/// {article.categoryName}</span>
                {article.primarySource && (
                  <>
                    <span>•</span>
                    <span>ЭХ СУРВАЛЖ: {article.primarySource}</span>
                  </>
                )}
              </div>

              <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-[1.18] tracking-tight mb-4">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-4">
                  {article.subtitle}
                </p>
              )}

              {/* Topic Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2 font-mono text-xs">
                  <span className="font-bold text-neutral-500">// СЭДВҮҮД:</span>
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/?q=${encodeURIComponent(tag)}`}
                      className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 hover:border-black hover:bg-black hover:text-[#00FF66] text-black font-semibold transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Primary Cover Image & Caption */}
            <div className="mb-6 space-y-2">
              <div className="w-full overflow-hidden flex items-center justify-center">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  fetchPriority="high"
                  decoding="async"
                  className="max-h-[540px] max-w-full w-auto h-auto object-contain mx-auto"
                />
              </div>
              {article.imageCaption && (
                <p className="text-xs font-sans text-neutral-500 mt-2">
                  // {article.imageCaption}
                </p>
              )}
            </div>

            {/* Editorial Lead Summary (Clean, elegant, no harsh black box) */}
            <div className="text-base sm:text-lg text-neutral-800 leading-relaxed font-serif mb-8 border-l-2 border-emerald-600 pl-4 py-1 italic">
              {article.summary}
            </div>

            {/* Full Continuous Article Body (HTML + Inline Figures) */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Appendix: Primary Sources (Clean, small, discreet inline list) */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-8 pt-3 font-sans text-xs text-neutral-500 leading-relaxed">
                <span className="font-bold text-neutral-700 uppercase tracking-wider mr-2">
                  Эх сурвалжууд:
                </span>
                <span className="inline">
                  {article.sources.map((src, idx) => (
                    <React.Fragment key={idx}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                      >
                        {src.name}
                      </a>
                      {idx < article.sources.length - 1 && (
                        <span className="mx-1.5 text-neutral-400">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            )}

            {/* Previous / Next Article Navigation */}
            <div className="mt-10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/article/${prevArticle.id}`}
                  prefetch={false}
                  className="group p-4 bg-neutral-50 hover:bg-black hover:text-white border border-black transition-colors flex flex-col justify-between"
                >
                  <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-[#00FF66] uppercase flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>ӨМНӨХ НИЙТЛЭЛ</span>
                  </span>
                  <span className="font-black text-sm line-clamp-2 leading-snug">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle && (
                <Link
                  href={`/article/${nextArticle.id}`}
                  prefetch={false}
                  className="group p-4 bg-neutral-50 hover:bg-black hover:text-white border border-black transition-colors flex flex-col justify-between text-right"
                >
                  <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-[#00FF66] uppercase flex items-center justify-end gap-1 mb-1">
                    <span>ДАРААГИЙН НИЙТЛЭЛ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-black text-sm line-clamp-2 leading-snug">
                    {nextArticle.title}
                  </span>
                </Link>
              )}
            </div>
          </article>

          {/* RIGHT SIDEBAR COLUMN: RECOMMENDED, TRENDING, LINKS & WIRE (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            {/* 1. Recommended / Related Stories */}
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#00FF66] border border-black inline-block" />
                  <h2 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
                    /// САНАЛ БОЛГОХ МЭДЭЭ
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-neutral-200">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/article/${rel.id}`}
                    prefetch={false}
                    className="group py-3.5 first:pt-0 last:pb-0 flex gap-3 items-start"
                  >
                    <div className="w-24 aspect-[16/10] shrink-0 overflow-hidden bg-neutral-100 border border-neutral-300">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase block mb-0.5">
                        // {rel.categoryName}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h3>
                      <span className="font-mono text-[10px] text-neutral-500 mt-1 block">
                        {rel.publishedAt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Most Read / Trending Stories */}
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <h2 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
                    /// ХАМГИЙН ИХ УНШСАН ТОП 5
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-neutral-200">
                {trendingArticles.map((tr, idx) => (
                  <Link
                    key={tr.id}
                    href={`/article/${tr.id}`}
                    prefetch={false}
                    className="group py-3 first:pt-0 last:pb-0 flex items-start gap-3"
                  >
                    <span className="bg-black text-[#00FF66] font-mono text-xs font-black px-2 py-0.5 shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1">
                        {tr.title}
                      </h3>
                      <div className="font-mono text-[10px] text-neutral-500 flex items-center gap-2">
                        <span>{tr.categoryName}</span>
                        <span>•</span>
                        <span>{(tr.readCount || 1200).toLocaleString()} уншсан</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Live 24H Wire in Sidebar */}
            <div className="bg-neutral-900 text-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-700">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-[#00FF66] uppercase">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>ШУУД МЭДЭЭНИЙ УРСГАЛ</span>
                </div>
                <span className="font-mono text-[10px] bg-[#00FF66] text-black font-bold px-1.5 py-0.5">
                  24H LIVE
                </span>
              </div>

              <div className="space-y-3 divide-y divide-neutral-800 font-mono text-xs">
                {liveWire.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                      <span className="text-[#00FF66] font-bold">{item.time}</span>
                      <span>[{item.source}]</span>
                    </div>
                    <p className="text-neutral-200 font-sans text-xs leading-snug">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Quick Category Links */}
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b-2 border-black">
                <Layers className="w-4 h-4 text-black" />
                <h2 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
                  /// БУСАД БУЛАНГУУД
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {NAV_SECTIONS.map((sec) => (
                  <Link
                    key={sec.id}
                    href={`/?section=${sec.id}`}
                    className={`px-3 py-1.5 border border-black font-bold uppercase transition-colors ${
                      article.category === sec.id
                        ? 'bg-black text-[#00FF66]'
                        : 'bg-neutral-50 text-black hover:bg-black hover:text-[#00FF66]'
                    }`}
                  >
                    {sec.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Section: More Stories to Explore */}
        {moreStories.length > 0 && (
          <section className="mt-12 pt-8 border-t-2 border-black">
            <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00FF66] inline-block border border-black"></span>
                <h2 className="font-mono text-sm sm:text-base font-black text-black tracking-wider uppercase">
                  /// ЦААШ УНШИХ ОНЦЛОХ НИЙТЛЭЛҮҮД
                </h2>
              </div>
              <Link
                href="/"
                className="font-mono text-xs font-bold text-black hover:text-[#00FF66] hover:bg-black px-3 py-1 border border-black transition-colors uppercase"
              >
                БҮХ МЭДЭЭ →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreStories.map((art, idx) => (
                <Link
                  key={art.id}
                  href={`/article/${art.id}`}
                  prefetch={false}
                  className="group bg-white border border-neutral-200 hover:border-black p-4 flex flex-col justify-between transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.04)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div>
                    <div className="w-full overflow-hidden bg-neutral-100 mb-3 border border-neutral-300 relative aspect-[16/10]">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-1.5 py-0.5">
                        0{idx + 1}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                      // {art.categoryName}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500 pt-3 mt-4 border-t border-neutral-200">
                    <span>{art.publishedAt}</span>
                    <span className="text-black group-hover:text-emerald-700 font-bold">
                      УНШИХ →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <NewspaperFooter />
    </div>
  );
}
