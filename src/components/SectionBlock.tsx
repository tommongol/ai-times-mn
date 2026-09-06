'use client';

import React from 'react';
import { NewsArticle } from '@/data/news';
import { Plus } from 'lucide-react';

interface Props {
  title: string;
  articles: NewsArticle[];
  onSelect: (art: NewsArticle) => void;
  onViewAll?: () => void;
}

export const SectionBlock: React.FC<Props> = ({
  title,
  articles,
  onSelect,
  onViewAll,
}) => {
  if (!articles.length) return null;

  return (
    <section className="py-6 border-b border-slate-200">
      {/* Section Header with aitimes bar style */}
      <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-[#172956]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-600 inline-block"></span>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-0.5 font-medium transition-colors"
          >
            <span>Цааш үзэх</span>
            <Plus className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 4-Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.slice(0, 4).map((art) => (
          <article
            key={art.id}
            onClick={() => onSelect(art)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-36 w-full overflow-hidden bg-slate-100 mb-2.5">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] text-red-600 font-bold block mb-1">
                [{art.categoryName}]
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                {art.title}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2.5 mt-2.5 border-t border-slate-100">
              <span>{art.author.split(' ')[0]}</span>
              <span>{art.publishedTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
