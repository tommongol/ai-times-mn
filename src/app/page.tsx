'use client';

import React, { useState, useMemo } from 'react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperLead } from '@/components/NewspaperLead';
import { SectionBlock } from '@/components/SectionBlock';
import { LiveWire } from '@/components/LiveWire';
import { ArticleViewModal } from '@/components/ArticleViewModal';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { ARTICLES, NewsArticle, NAV_SECTIONS } from '@/data/news';
import { Clock, Eye, Search, ArrowUpDown, XCircle, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchSort, setSearchSort] = useState<'latest' | 'views'>('latest');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Multi-field search and category filtering
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const matched = ARTICLES.filter((art) => {
      const matchesCategory =
        activeSection === 'all' || art.category === activeSection;

      if (!query) return matchesCategory;

      const matchesQuery =
        art.title.toLowerCase().includes(query) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(query)) ||
        art.summary.toLowerCase().includes(query) ||
        art.content.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        art.categoryName.toLowerCase().includes(query) ||
        art.sources.some((s) => s.name.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });

    // Sorting
    return matched.sort((a, b) => {
      if (searchSort === 'views') {
        return b.readCount - a.readCount;
      }
      // default: latest by date + time
      return (
        new Date(`${b.publishedAt}T${b.publishedTime}`).getTime() -
        new Date(`${a.publishedAt}T${a.publishedTime}`).getTime()
      );
    });
  }, [activeSection, searchQuery, searchSort]);

  // Lead stories for main newspaper view
  const mainLead = useMemo(() => {
    return ARTICLES.find((a) => a.isMainLead) || ARTICLES[0];
  }, []);

  const subLeads = useMemo(() => {
    return ARTICLES.filter((a) => a.id !== mainLead.id && !a.isHot);
  }, [mainLead]);

  const hotArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.isHot && a.id !== mainLead.id);
  }, [mainLead]);

  const mostRead = useMemo(() => {
    return [...ARTICLES].sort((a, b) => b.readCount - a.readCount);
  }, []);

  // Section specific slices
  const techArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.category === 'tech');
  }, []);

  const industryArticles = useMemo(() => {
    return ARTICLES.filter(
      (a) => a.category === 'industry' || a.category === 'companies'
    );
  }, []);

  const interviewArticles = useMemo(() => {
    return ARTICLES.filter(
      (a) => a.category === 'interview' || a.category === 'opinion'
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Newspaper Header with Search Bar */}
      <NewspaperHeader
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Search Results View OR Specific Category Archive View */}
        {searchQuery || activeSection !== 'all' ? (
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header banner for search/section */}
            <div className="pb-3 mb-6 border-b-2 border-[#172956] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-red-600" />
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {searchQuery ? (
                    <span>
                      &ldquo;<span className="text-red-600">{searchQuery}</span>&rdquo; хайлтын үр дүн
                    </span>
                  ) : (
                    NAV_SECTIONS.find((s) => s.id === activeSection)?.name
                  )}
                </h1>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                  {filteredArticles.length} мэдээ
                </span>
              </div>

              {/* Search Controls: Sort & Clear */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span>Эрэмбэлэх:</span>
                  <select
                    value={searchSort}
                    onChange={(e) => setSearchSort(e.target.value as 'latest' | 'views')}
                    className="border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="latest">Сүүлийн үеийнхээр</option>
                    <option value="views">Хамгийн их уншсанаар</option>
                  </select>
                </div>

                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveSection('all');
                    }}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold border border-red-200 px-2.5 py-1 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Хайлтыг цэвэрлэх</span>
                  </button>
                )}
              </div>
            </div>

            {/* List of search/category results */}
            {filteredArticles.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="py-5 cursor-pointer group flex flex-col sm:flex-row gap-5 items-start hover:bg-slate-50/70 p-2 transition-colors"
                  >
                    <div className="w-full sm:w-56 h-36 shrink-0 overflow-hidden bg-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-red-600 font-bold">
                          [{art.categoryName}]
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {art.publishedAt} {art.publishedTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                        {art.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {art.summary}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="text-slate-600 font-medium">{art.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {art.readCount.toLocaleString()} уншсан
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* No Search Results Fallback */
              <div className="py-16 text-center bg-slate-50 border border-slate-200 p-8 my-6">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  &ldquo;{searchQuery}&rdquo; түлхүүр үгээр илэрц олдсонгүй.
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                  Үгийн зөв бичгийг шалгах эсвэл дараах нийтлэг хайлтын сэдвүүдээс сонгоно уу.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Nvidia', 'OpenAI', 'Deepfake', 'Atlas 3D', 'Vibe-coding', 'Lyria', 'FinTech'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:border-red-600 hover:text-red-600 transition-colors shadow-2xs"
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Default Newspaper Home Front Page */
          <>
            {/* 3-Column Lead Story Area */}
            <NewspaperLead
              mainLead={mainLead}
              subLeads={subLeads}
              hotArticles={hotArticles}
              mostRead={mostRead}
              onSelect={setSelectedArticle}
            />

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-4 pt-6">
              {/* Live 24H News Wire */}
              <LiveWire />

              {/* Section 1: AI Технологи & Моделиуд */}
              <SectionBlock
                title="AI Технологи & Инноваци"
                articles={techArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('tech')}
              />

              {/* Section 2: AI Салбар ба Компаниуд */}
              <SectionBlock
                title="AI Салбар ба Компаниуд"
                articles={industryArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('industry')}
              />

              {/* Section 3: Экспертийн ярилцлага & Нийтлэл */}
              <SectionBlock
                title="Салбарын ярилцлага & Нийтлэл"
                articles={interviewArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('interview')}
              />
            </div>
          </>
        )}
      </main>

      {/* Authentic Newspaper Footer */}
      <NewspaperFooter />

      {/* Modal Article Reader */}
      <ArticleViewModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
