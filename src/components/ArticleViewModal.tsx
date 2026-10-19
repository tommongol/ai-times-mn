'use client';

import React, { useEffect } from 'react';
import { X, Printer, Share2 } from 'lucide-react';
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
      alert('Мэдээний холбоосыг хууллаа.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden my-auto max-h-[94vh] flex flex-col text-black">
        {/* WIRED Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b-2 border-black bg-neutral-900 text-white font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="bg-[#00FF66] text-black font-black px-2 py-0.5 uppercase tracking-wider">
              {article.categoryName}
            </span>
            <span className="text-neutral-400">
              {article.publishedAt} • {article.publishedTime}
            </span>
            {article.readTime && (
              <span className="hidden sm:inline bg-neutral-800 text-[#00FF66] font-bold px-2 py-0.5 border border-neutral-700">
                ⏱ {article.readTime}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Хэвлэх"
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Хуваалцах"
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Хаах"
              className="p-1.5 bg-neutral-800 hover:bg-[#00FF66] hover:text-black text-white transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-tight tracking-tight mb-3">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-4">
                {article.subtitle}
              </p>
            )}

            {/* Tags if available */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2 font-mono text-xs">
                <span className="font-bold text-neutral-500">// СЭДВҮҮД:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 text-black font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo & Caption */}
          <div className="space-y-2">
            <div className="w-full bg-neutral-100 border border-black overflow-hidden flex items-center justify-center p-2 sm:p-4">
              <img
                src={article.coverImage}
                alt={article.title}
                className="max-h-[520px] max-w-full w-auto h-auto object-contain mx-auto shadow-xs"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs font-mono text-neutral-600">
                // {article.imageCaption}
              </p>
            )}
          </div>

          {/* WIRED Lead Quote / Summary Callout */}
          <div className="p-4 sm:p-5 bg-neutral-900 text-white border-l-4 border-[#00FF66] text-sm sm:text-base leading-relaxed font-mono">
            {article.summary}
          </div>

          {/* Full content (Clean HTML) */}
          <div
            className="text-base sm:text-lg text-neutral-900 leading-relaxed font-sans space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Appendix: Primary Sources */}
          {article.sources && article.sources.length > 0 && (
            <div className="mt-8 pt-5 border-t-2 border-black bg-neutral-50 p-4 sm:p-5">
              <div className="font-mono text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#00FF66] border border-black inline-block" />
                <span>ХАВСРАЛТ // ТОЙМЫН ЭХ СУРВАЛЖУУД:</span>
              </div>
              <ul className="space-y-2 font-mono text-xs sm:text-sm">
                {article.sources.map((src, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-500 font-bold">[{idx + 1}]</span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 hover:text-black font-semibold underline break-all"
                    >
                      {src.name} — {src.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-black bg-neutral-100 flex items-center justify-between font-mono text-xs">
          <span className="text-neutral-500">
            AImedee.mn — Хиймэл оюун ухааны бодит сэтгүүл зүй
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold bg-black text-[#00FF66] hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            ХААХ [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
