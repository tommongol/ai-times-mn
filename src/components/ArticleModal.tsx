'use client';

import React, { useEffect } from 'react';
import { X, Clock, Calendar, ExternalLink, Share2, CheckCircle2, Bookmark, ArrowUpRight } from 'lucide-react';
import { NewsItem } from '@/data/news';

interface ArticleModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Холбоосыг хууллаа!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0e1424] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#0e1424]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
              {item.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Хуваалцах"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Хаах"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header titles */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2.5 py-0.5 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
              {item.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.subtitle}
            </p>
          </div>

          {/* Author metadata bar */}
          <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{item.author.name}</div>
                <div className="text-xs text-slate-500">{item.author.role}</div>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div className="flex items-center gap-1 justify-end">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.publishedAt}</span>
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg max-h-[420px] bg-slate-950">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/40">
              <h4 className="text-sm font-bold text-brand-900 dark:text-brand-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                Гол өгөгдөл & Товчлол
              </h4>
              <ul className="space-y-2">
                {item.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body Article Content */}
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-4 text-sm sm:text-base">
            <div dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br/>') }} />
          </div>

          {/* Sources and citations */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Баталгаат эх сурвалжууд:
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{src.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
