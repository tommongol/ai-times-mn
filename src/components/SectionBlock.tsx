'use client';

import React from 'react';
import { NewsArticle } from '@/data/news';
import { ArrowUpRight } from 'lucide-react';

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
    <section className="py-8 border-b-2 border-black">
      {/* WIRED Section Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#00FF66] inline-block border border-black"></span>
          <h2 className="font-mono text-sm sm:text-base font-black text-black tracking-wider uppercase">
            /// {title}
          </h2>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="font-mono text-xs font-bold text-black hover:text-[#00FF66] hover:bg-black px-2.5 py-1 border border-black flex items-center gap-1 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 4-Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((art, idx) => (
          <article
            key={art.id}
            onClick={() => onSelect(art)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-40 w-full overflow-hidden bg-neutral-100 mb-3 border border-neutral-300 relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-black text-[#00FF66] font-mono text-[9px] font-bold px-1.5 py-0.5">
                  0{idx + 1}
                </span>
              </div>

              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                // {art.categoryName}
              </span>

              <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-2">
                {art.title}
              </h3>

              <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                {art.summary}
              </p>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500 pt-3 mt-3 border-t border-neutral-200">
              <span className="text-black font-semibold uppercase">
                {art.primarySource.split(' ')[0]}
              </span>
              <span>{art.publishedTime}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
