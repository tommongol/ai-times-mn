'use client';

import React, { useState, useMemo } from 'react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperLead } from '@/components/NewspaperLead';
import { SectionBlock } from '@/components/SectionBlock';
import { LiveWire } from '@/components/LiveWire';
import { ArticleViewModal } from '@/components/ArticleViewModal';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { useNews } from '@/context/NewsContext';
import { NewsArticle, NAV_SECTIONS } from '@/data/news';
import { Search, ArrowUpDown, XCircle } from 'lucide-react';

export default function HomePage() {
  const { articles } = useNews();
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchSort, setSearchSort] = useState<'latest' | 'views'>('latest');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Multi-field search and category filtering
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const matched = articles.filter((art) => {
      const matchesCategory =
        activeSection === 'all' || art.category === activeSection;

      if (!query) return matchesCategory;

      const matchesQuery =
        art.title.toLowerCase().includes(query) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(query)) ||
        art.summary.toLowerCase().includes(query) ||
        art.content.toLowerCase().includes(query) ||
        art.categoryName.toLowerCase().includes(query);

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
  }, [articles, activeSection, searchQuery, searchSort]);

  // Lead stories for main newspaper view
  const mainLead = useMemo(() => {
    return articles.find((a) => a.isMainLead) || articles[0];
  }, [articles]);

  const subLeads = useMemo(() => {
    return articles.filter((a) => a.id !== mainLead?.id).slice(0, 4);
  }, [articles, mainLead]);

  const remainingArticles = useMemo(() => {
    const leadIds = new Set([mainLead?.id, ...subLeads.map((a) => a.id)]);
    return articles.filter((a) => !leadIds.has(a.id));
  }, [articles, mainLead, subLeads]);

  // Section specific slices (deduplicated from top lead stories)
  const modelArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'models');
  }, [remainingArticles]);

  const techArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'tech');
  }, [remainingArticles]);

  const policyArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'policy');
  }, [remainingArticles]);

  const lawArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'law');
  }, [remainingArticles]);

  const industryArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'industry');
  }, [remainingArticles]);

  const companiesArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'companies');
  }, [remainingArticles]);

  const interviewArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'interview');
  }, [remainingArticles]);

  const opinionArticles = useMemo(() => {
    return remainingArticles.filter((a) => a.category === 'opinion');
  }, [remainingArticles]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
      {/* 1. WIRED Newspaper Header with Search Bar */}
      <NewspaperHeader
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Search Results View OR Specific Category Archive View */}
        {searchQuery || activeSection !== 'all' ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header banner for search/section */}
            <div className="pb-4 mb-6 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#00FF66] inline-block border border-black"></span>
                <h1 className="font-mono text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                  {searchQuery ? (
                    <span>
                      // SEARCH RESULTS FOR: &ldquo;{searchQuery}&rdquo;
                    </span>
                  ) : (
                    <span>
                      /// {NAV_SECTIONS.find((s) => s.id === activeSection)?.name}
                    </span>
                  )}
                </h1>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-[#00FF66]">
                  {filteredArticles.length} НИЙТЛЭЛ
                </span>
              </div>

              {/* Search Controls: Sort & Clear */}
              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-neutral-600">
                  <ArrowUpDown className="w-3.5 h-3.5 text-black" />
                  <span className="font-bold text-black uppercase">ЭРЭМБЭ:</span>
                  <select
                    value={searchSort}
                    onChange={(e) => setSearchSort(e.target.value as 'latest' | 'views')}
                    className="border border-black bg-white px-2 py-1 text-xs text-black font-mono focus:outline-none"
                  >
                    <option value="latest">Сүүлийн үеийнхээр (LATEST)</option>
                    <option value="views">Хамгийн их уншсанаар (MOST READ)</option>
                  </select>
                </div>

                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveSection('all');
                    }}
                    className="flex items-center gap-1 bg-black text-white hover:bg-[#00FF66] hover:text-black font-bold px-3 py-1 transition-colors cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                )}
              </div>
            </div>

            {/* List of search/category results */}
            {filteredArticles.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="py-6 cursor-pointer group flex flex-col sm:flex-row gap-6 items-start hover:bg-white p-4 transition-colors border-l-2 border-transparent hover:border-black"
                  >
                    <div className="w-full sm:w-64 aspect-[16/10] shrink-0 overflow-hidden bg-neutral-100 border border-neutral-300 relative">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                          <span className="bg-black text-[#00FF66] font-bold px-2 py-0.5 uppercase">
                            {art.categoryName}
                          </span>
                          <span className="text-neutral-500">
                            {art.publishedAt} • {art.publishedTime}
                          </span>
                        </div>
                        <h2 className="font-black text-lg sm:text-xl lg:text-2xl text-black group-hover:text-emerald-600 transition-colors leading-snug mb-2">
                          {art.title}
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-700 line-clamp-2 leading-relaxed mb-3">
                          {art.summary}
                        </p>
                      </div>
                      <div className="font-mono text-xs text-emerald-700 font-bold group-hover:underline">
                        ДЭЛГЭРЭНГҮЙ УНШИХ →
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* No Search Results Fallback */
              <div className="py-16 text-center bg-neutral-50 border-2 border-black p-8 my-6">
                <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                <h3 className="font-mono text-base font-black text-black mb-2 uppercase">
                  [!] &ldquo;{searchQuery}&rdquo; ТҮЛХҮҮР ҮГЭЭР ИЛЭРЦ ОЛДСОНГҮЙ
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6 font-mono">
                  Үгийн зөв бичгийг шалгах эсвэл дараах нийтлэг сэдвүүдээс сонгож хайна уу.
                </p>
                <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
                  {['Nvidia', 'OpenAI', 'Deepfake', 'Atlas 3D', 'Vibe-coding', 'Lyria', 'FinTech'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className="px-3 py-1.5 font-bold bg-white border border-black hover:bg-black hover:text-[#00FF66] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Default WIRED Magazine Home Front Page */
          <>
            {/* Magazine Lead Story & Featured Articles Area */}
            <NewspaperLead
              mainLead={mainLead}
              subLeads={subLeads}
              onSelect={setSelectedArticle}
            />

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
              {/* Live 24H Realtime News Wire */}
              <LiveWire />

              {/* Section 0: ШИНЭ AI ЗАГВАРУУД (FRONTIER MODELS & BENCHMARKS) */}
              <SectionBlock
                title="Шинэ AI Загварууд (Frontier Models & Benchmarks)"
                articles={modelArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('models')}
              />

              {/* Section 1: AI Технологи & Инноваци */}
              <SectionBlock
                title="AI Технологи & Инноваци"
                articles={techArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('tech')}
              />

              {/* Section 2: Бодлого & Стратеги */}
              <SectionBlock
                title="Бодлого & Стратеги"
                articles={policyArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('policy')}
              />

              {/* Section 3: Хууль, Шүүх & Зохиогчийн эрх */}
              <SectionBlock
                title="Хууль, Шүүх & Зохиогчийн эрх"
                articles={lawArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('law')}
              />

              {/* Section 4: Салбар ба Компаниуд */}
              <SectionBlock
                title="Салбар ба Компаниуд"
                articles={[...companiesArticles, ...industryArticles]}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('industry')}
              />

              {/* Section 5: Намтар, Хөрөг & Ярилцлага */}
              <SectionBlock
                title="Намтар, Хөрөг & Ярилцлага"
                articles={interviewArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('interview')}
              />

              {/* Section 6: Эрэн сурвалжлах тойм & Түүхэн шинжилгээ */}
              <SectionBlock
                title="Эрэн сурвалжлах тойм & Түүхэн шинжилгээ"
                articles={opinionArticles}
                onSelect={setSelectedArticle}
                onViewAll={() => setActiveSection('opinion')}
              />
            </div>
          </>
        )}
      </main>

      {/* WIRED Footer with 100% Real Attribution */}
      <NewspaperFooter />

      {/* Modal Article Reader */}
      <ArticleViewModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
