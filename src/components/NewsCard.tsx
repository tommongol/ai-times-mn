'use client';

import React from 'react';
import { Clock, ExternalLink, Bookmark, Sparkles, Tag } from 'lucide-react';
import { NewsItem } from '@/data/news';

interface NewsCardProps {
  item: NewsItem;
  onSelect: (item: NewsItem) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(item)}
      className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 dark:hover:border-brand-500/40 hover:shadow-xl transition-all duration-300"
    >
      {/* Card Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 backdrop-blur-sm shadow-sm">
            {item.categoryLabel}
          </span>
        </div>

        {/* Read time pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/70 text-white backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          <span>{item.readTime}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-base font-bold leading-snug text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
            {item.title}
          </h2>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {item.summary}
          </p>
        </div>

        {/* Footer info: Author & Sources */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <img
              src={item.author.avatar}
              alt={item.author.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-medium text-slate-600 dark:text-slate-300 truncate max-w-[120px]">
              {item.author.name}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">{item.publishedAt.split(' ')[0]}</span>
        </div>
      </div>
    </article>
  );
};
