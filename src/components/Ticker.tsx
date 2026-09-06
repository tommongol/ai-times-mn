'use client';

import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { NewsItem } from '@/data/news';

interface TickerProps {
  items: NewsItem[];
  onSelect: (item: NewsItem) => void;
}

export const Ticker: React.FC<TickerProps> = ({ items, onSelect }) => {
  if (!items.length) return null;

  return (
    <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-brand-500/10 border-b border-red-500/20 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-hidden text-xs">
        <div className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400 shrink-0 uppercase tracking-wide">
          <Flame className="w-3.5 h-3.5 fill-red-500 animate-bounce" />
          <span>Шуурхай</span>
        </div>
        <div className="w-px h-3.5 bg-red-300 dark:bg-red-800 shrink-0" />
        <div className="flex-1 truncate">
          <button
            onClick={() => onSelect(items[0])}
            className="text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium truncate flex items-center gap-2 group transition-colors text-left"
          >
            <span>{items[0].title}</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform">
              • {items[0].publishedAt}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
