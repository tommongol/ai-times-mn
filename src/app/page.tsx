'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Ticker } from '@/components/Ticker';
import { HeroSection } from '@/components/HeroSection';
import { NewsCard } from '@/components/NewsCard';
import { ArticleModal } from '@/components/ArticleModal';
import { Footer } from '@/components/Footer';
import { NEWS_ITEMS, NewsItem, CATEGORIES } from '@/data/news';
import { Sparkles, Layers, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);

  // Toggle dark/light theme on html element
  const toggleDark = () => {
    setIsDark(!isDark);
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  };

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return NEWS_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured and trending items
  const featuredItem = useMemo(() => {
    return NEWS_ITEMS.find((n) => n.featured) || NEWS_ITEMS[0];
  }, []);

  const secondaryItems = useMemo(() => {
    return NEWS_ITEMS.filter((n) => n.id !== featuredItem.id && n.trending);
  }, [featuredItem]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      {/* Breaking news ticker */}
      <Ticker
        items={NEWS_ITEMS.filter((n) => n.category === 'breaking')}
        onSelect={setSelectedArticle}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Only show Hero section on home (all category and no search) */}
        {activeCategory === 'all' && !searchQuery && (
          <HeroSection
            featuredItem={featuredItem}
            secondaryItems={secondaryItems}
            onSelect={setSelectedArticle}
          />
        )}

        {/* Section title & Filters info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeCategory === 'all' && !searchQuery
                  ? 'Сүүлийн үеийн бүх мэдээ'
                  : searchQuery
                  ? `Хайлтын үр дүн: "${searchQuery}"`
                  : CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {filteredItems.length}
              </span>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Хайлтыг цуцлах
              </button>
            )}
          </div>
        </div>

        {/* Grid of news items */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  onSelect={setSelectedArticle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Sparkles className="w-8 h-8 mx-auto text-slate-400 mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                Мэдээлэл олдсонгүй
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Та хайлтын үгээ өөрчлөх эсвэл ангиллаа сольж үзнэ үү.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Full article reader modal */}
      <ArticleModal
        item={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
