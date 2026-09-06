'use client';

import React from 'react';
import { Clock, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';
import { NewsItem } from '@/data/news';

interface HeroSectionProps {
  featuredItem: NewsItem;
  secondaryItems: NewsItem[];
  onSelect: (item: NewsItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredItem,
  secondaryItems,
  onSelect
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Large Hero Card (8 cols) */}
        <div
          onClick={() => onSelect(featuredItem)}
          className="lg:col-span-8 group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          {/* Cover image container */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src={featuredItem.coverImage}
              alt={featuredItem.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-600 text-white shadow-md">
                ⭐ Өдрийн онцлох
              </span>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-sm">
                {featuredItem.categoryLabel}
              </span>
            </div>

            {/* Bottom title overlay on image for mobile & desktop */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
                <span className="font-semibold text-brand-300">{featuredItem.author.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredItem.readTime}
                </span>
                <span>•</span>
                <span>{featuredItem.publishedAt}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white group-hover:text-brand-300 transition-colors line-clamp-3">
                {featuredItem.title}
              </h1>
            </div>
          </div>

          {/* Subtitle and Key points */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4">
              {featuredItem.summary}
            </p>

            {/* Key takeaways pills */}
            {featuredItem.keyTakeaways && (
              <div className="space-y-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                {featuredItem.keyTakeaways.slice(0, 2).map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Secondary Vertical Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500"></span>
              Трэнд болж буй
            </h2>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {secondaryItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className="group cursor-pointer p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-md transition-all flex gap-3 items-center"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-black/70 text-white">
                    {item.categoryLabel}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                    <span>{item.readTime}</span>
                    <span>•</span>
                    <span>{item.publishedAt.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
