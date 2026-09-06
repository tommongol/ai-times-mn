'use client';

import React, { useEffect } from 'react';
import { X, Printer, Share2, ArrowUpRight, ExternalLink } from 'lucide-react';
import { NewsArticle } from '@/data/news';

interface Props {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleViewModal: React.FC<Props> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Мэдээний холбоосыг санах ойд хууллаа.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-900">
        {/* Newspaper Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
            {article.categoryName}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Хэвлэх"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Хуваалцах"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Хаах"
              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
          {/* Header */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-2">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                {article.subtitle}
              </p>
            )}

            {/* Byline */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 py-2.5 border-y border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">{article.author}</span>
                {article.authorEmail && (
                  <span className="text-slate-400">({article.authorEmail})</span>
                )}
              </div>
              <div>
                <span>Нийтэлсэн: {article.publishedAt} {article.publishedTime}</span>
              </div>
            </div>
          </div>

          {/* Photo & Caption */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
            {article.imageCaption && (
              <p className="text-[11px] text-slate-500 italic">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Lead bold paragraph */}
          <div className="p-3.5 bg-slate-50 border-l-4 border-[#172956] text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
            {article.summary}
          </div>

          {/* Full content */}
          <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-4 font-serif">
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
          </div>

          {/* Sources Section */}
          <div className="pt-6 border-t border-slate-200 text-xs">
            <div className="font-bold text-slate-700 mb-2">Эх сурвалжийн холбоосууд:</div>
            <div className="flex flex-wrap gap-2">
              {article.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 border border-slate-200 hover:border-red-600 hover:text-red-600 transition-colors"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold bg-[#172956] text-white hover:bg-slate-800 transition-colors"
          >
            Хаах
          </button>
        </div>
      </div>
    </div>
  );
};
