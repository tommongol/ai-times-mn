'use client';

import React, { useState, useMemo } from 'react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperLead } from '@/components/NewspaperLead';
import { SectionBlock } from '@/components/SectionBlock';
import { LiveWire } from '@/components/LiveWire';
import { ArticleViewModal } from '@/components/ArticleViewModal';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { ARTICLES, NewsArticle, NAV_SECTIONS } from '@/data/news';
import { Clock, Eye } from 'lucide-react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filter articles based on activeSection and searchQuery
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchesCategory =
        activeSection === 'all' || art.category === activeSection;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeSection, searchQuery]);

  // Lead stories
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
    return ARTICLES.filter((a) => a.category === 'industry' || a.category === 'companies');
  }, []);

  const interviewArticles = useMemo(() => {
    return ARTICLES.filter((a) => a.category === 'interview' || a.category === 'opinion');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Authentic Newspaper Header */}
      <NewspaperHeader
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* If user is searching or viewing a specific sub-category */}
        {activeSection !== 'all' || searchQuery ? (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="pb-3 mb-6 border-b-2 border-[#172956] flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-900">
                {searchQuery
                  ? `Хайлтын үр дүн: "${searchQuery}" (${filteredArticles.length})`
                  : NAV_SECTIONS.find((s) => s.id === activeSection)?.name}
              </h1>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Хайлтыг цэвэрлэх
                </button>
              )}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="py-5 cursor-pointer group flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-56 h-36 shrink-0 overflow-hidden bg-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-red-600 font-bold block mb-1">
                        [{art.categoryName}]
                      </span>
                      <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug mb-2">
                        {art.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {art.summary}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{art.author}</span>
                        <span>•</span>
                        <span>{art.publishedAt} {art.publishedTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {art.readCount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 text-sm">
                Мэдээлэл олдсонгүй. Хайлтын үгээ өөрчилж үзнэ үү.
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
