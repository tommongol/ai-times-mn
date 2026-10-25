'use client';

import React from 'react';
import Link from 'next/link';
import { ArticleCardData } from '@/data/types';

interface Props {
  mainLead: ArticleCardData;
  reviewLead?: ArticleCardData | null;
  onSelect?: (art: ArticleCardData) => void;
}

export const NewspaperLead: React.FC<Props> = ({
  mainLead,
  reviewLead,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Main Lead Story / Хадаас материал (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col lg:border-r-2 border-black lg:pr-8">
          <Link
            href={`/article/${mainLead.id}`}
            prefetch={false}
            className="group cursor-pointer flex flex-col h-full justify-between"
          >
            <div>
              {/* Kicker badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-black text-[#00FF66] font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-widest">
                    // ХАДААС НИЙТЛЭЛ
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    [{mainLead.categoryName}]
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-500">
                  {mainLead.publishedAt}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-black text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] text-black group-hover:text-emerald-700 transition-colors mb-4 tracking-tight">
                {mainLead.title}
              </h1>

              {/* Photo */}
              <div className="relative overflow-hidden bg-neutral-100 mb-4 border border-black aspect-[16/10] sm:aspect-[16/9] w-full">
                <img
                  src={mainLead.coverImage}
                  alt={mainLead.title}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-neutral-700">
                  ТЭРГҮҮН СУДАЛГАА
                </span>
              </div>

              {/* Summary */}
              <p className="text-base sm:text-[17px] text-neutral-800 leading-relaxed font-normal line-clamp-3 mb-4">
                {mainLead.summary}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-xs text-neutral-500 mt-auto">
              <span>
                {mainLead.publishedAt} • {mainLead.readTime || '9 мин унших'}
              </span>
              <span className="text-emerald-700 font-bold group-hover:underline flex items-center gap-1">
                ДЭЛГЭРЭНГҮЙ УНШИХ →
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side: Долоо хоногийн зурагт тойм (6 cols on lg) */}
        {reviewLead ? (
          <div className="lg:col-span-6 flex flex-col">
            <Link
              href={`/article/${reviewLead.id}`}
              prefetch={false}
              className="group cursor-pointer flex flex-col h-full justify-between"
            >
              <div>
                {/* Kicker badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00FF66] text-black font-mono text-xs font-black px-2.5 py-1 border border-black uppercase tracking-widest">
                      // ЗУРАГТ ТОЙМ
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-600 uppercase tracking-wider">
                      [WEEKLY AI REVIEW]
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-500">
                    {reviewLead.publishedAt}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-black text-xl sm:text-2xl lg:text-[26px] leading-[1.25] text-black group-hover:text-emerald-700 transition-colors mb-4 tracking-tight">
                  {reviewLead.title}
                </h2>

                {/* Photo */}
                <div className="relative overflow-hidden bg-neutral-100 mb-3 border border-black aspect-[16/10] sm:aspect-[16/9] w-full">
                  <img
                    src={reviewLead.coverImage}
                    alt={reviewLead.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-neutral-700">
                    БАРИМТЖУУЛСАН ЗУРАГТ ТОЙМ
                  </span>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal line-clamp-2 mb-3">
                  {reviewLead.summary}
                </p>

                {/* 6 Preview Thumbnails Strip */}
                <div className="grid grid-cols-6 gap-2 mb-4 pt-1">
                  {[
                    '/images/articles/rev-openai-biological-research.jpg',
                    '/images/articles/rev-tencent-wevisone-vl.jpg',
                    '/images/articles/rev-pure-video-dynamics.jpg',
                    '/images/articles/rev-hi3d-mesh-generation.jpg',
                    '/images/articles/inv-kling-official.jpg',
                    '/images/articles/rev-block-dessa-voice.jpg',
                  ].map((thumb, idx) => (
                    <div
                      key={idx}
                      className="aspect-[16/10] overflow-hidden border border-neutral-300 bg-neutral-100 relative group-hover:border-black transition-colors"
                    >
                      <img
                        src={thumb}
                        alt={`Тоймын зураг ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-xs text-neutral-500 mt-auto">
                <span>
                  {reviewLead.publishedAt} • {reviewLead.readTime || '15 мин унших'}
                </span>
                <span className="text-emerald-700 font-bold group-hover:underline flex items-center gap-1">
                  БҮТЭН ЗУРАГТ ТОЙМ УНШИХ →
                </span>
              </div>
            </Link>
          </div>
        ) : null}

      </div>
    </section>
  );
};
