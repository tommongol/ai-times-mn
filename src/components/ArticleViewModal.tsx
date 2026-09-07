'use client';

import React, { useEffect } from 'react';
import { X, Printer, Share2, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
            <span className="text-neutral-400 hidden sm:inline">
              // DISPATCH REF: {article.id}
            </span>
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
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal mb-5">
                {article.subtitle}
              </p>
            )}

            {/* 100% REAL VERIFIED SOURCE BADGE */}
            <div className="p-3.5 bg-neutral-100 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-black uppercase">
                  АНХДАГЧ БОДИТ ЭХ СУРВАЛЖ:
                </span>
                <span className="text-emerald-700 font-bold underline">
                  {article.primarySource}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-neutral-500 text-[11px]">
                {article.readTime && (
                  <span className="bg-black text-[#00FF66] font-bold px-1.5 py-0.5">
                    ⏱ {article.readTime}
                  </span>
                )}
                <span>{article.publishedAt} {article.publishedTime}</span>
                <span>•</span>
                <span>{article.readCount.toLocaleString()} УНШСАН</span>
                <a
                  href={article.primarySourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-black text-[#00FF66] hover:bg-neutral-800 px-2 py-1 font-bold transition-colors"
                >
                  <span>ЭХ СУРВАЛЖ ҮЗЭХ</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Tags if available */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-3 font-mono text-[11px]">
                <span className="font-bold text-neutral-400">// СЭДВҮҮД:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-black font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo & Caption */}
          <div className="space-y-2">
            <div className="w-full bg-neutral-100 border border-black overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
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
            className="text-base sm:text-lg text-neutral-900 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Verified Sources & References Section */}
          <div className="pt-6 border-t-2 border-black font-mono text-xs">
            <div className="flex items-center gap-2 font-bold text-black mb-3 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#00c853]" />
              <span>БАТАЛГААЖСАН ЭХ СУРВАЛЖИЙН ХОЛБООСУУД:</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {article.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 border border-black hover:bg-black hover:text-[#00FF66] transition-colors font-bold text-neutral-900"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
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
