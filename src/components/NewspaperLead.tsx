'use client';

import React from 'react';
import { NewsArticle } from '@/data/news';

interface Props {
  mainLead: NewsArticle;
  subLeads: NewsArticle[];
  onSelect: (art: NewsArticle) => void;
}

export const NewspaperLead: React.FC<Props> = ({
  mainLead,
  subLeads,
  onSelect,
}) => {
  const rightFourArticles = subLeads.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
        
        {/* Left Side: Main Cover Story (6 cols / 50%) */}
        <div className="lg:col-span-6 flex flex-col lg:border-r-2 border-black lg:pr-6 xl:pr-8">
          <article
            onClick={() => onSelect(mainLead)}
            className="group cursor-pointer flex flex-col h-full justify-between"
          >
            {/* Kicker badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-black text-[#00FF66] font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-widest">
                  // ТЭРГҮҮН МЭДЭЭ
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
            <h1 className="font-black text-2xl sm:text-3xl lg:text-[34px] leading-[1.18] text-black group-hover:text-emerald-600 transition-colors mb-4 tracking-tight">
              {mainLead.title}
            </h1>

            {/* Photo - flex-1 so it naturally fills vertical space to match the right side */}
            <div className="relative overflow-hidden bg-neutral-100 mb-4 border border-black flex-1 min-h-[280px] sm:min-h-[360px]">
              <img
                src={mainLead.coverImage}
                alt={mainLead.title}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Summary */}
            <p className="text-base sm:text-[17px] text-neutral-800 leading-relaxed font-normal line-clamp-3 mb-4">
              {mainLead.summary}
            </p>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-xs text-neutral-500 mt-auto">
              <span>
                {mainLead.publishedAt} • {mainLead.publishedTime}
              </span>
              <span className="text-emerald-700 font-bold group-hover:underline">
                ДЭЛГЭРЭНГҮЙ УНШИХ →
              </span>
            </div>
          </article>
        </div>

        {/* Right Side: 4 Symmetrical Stories (2x2 Grid) + Bottom Horizontal Ad Banner Space (6 cols / 50%) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          {/* 2x2 Grid of 4 Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rightFourArticles.map((art, idx) => (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className="group cursor-pointer bg-white border border-neutral-200 hover:border-black p-3.5 flex flex-col justify-between transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.04)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 mb-2.5 border border-neutral-300 relative">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-1.5 py-0.5">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    // {art.categoryName}
                  </span>

                  <h3 className="text-sm sm:text-[15px] font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-2.5">
                    {art.summary}
                  </p>
                </div>

                <div className="font-mono text-[11px] text-neutral-500 flex items-center justify-between border-t border-neutral-100 pt-2 mt-auto">
                  <span>{art.publishedAt}</span>
                  <span className="text-black group-hover:text-emerald-700 font-bold transition-colors">
                    УНШИХ →
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Horizontal Banner Ad Slot at the Bottom of the 4 Stories */}
          <div className="w-full bg-neutral-100 border-2 border-dashed border-neutral-400 hover:border-black transition-colors p-4 sm:py-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="bg-black text-[#00FF66] font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-widest shrink-0">
                AD SPACE
              </span>
              <div>
                <div className="font-mono text-xs sm:text-sm font-black text-black uppercase tracking-wide">
                  СУРТАЛЧИЛГААНЫ БАННЕР БАЙРШУУЛАХ ОРОН ЗАЙ
                </div>
                <div className="font-mono text-[11px] text-neutral-500">
                  Нүүр хуудасны A-бүс • Урт хөндлөн баннер (728×90 / Хариу үйлдэлт хэмжээс)
                </div>
              </div>
            </div>
            <a
              href="mailto:ads@aimedee.mn"
              className="font-mono text-xs font-bold bg-white text-black hover:bg-black hover:text-[#00FF66] border border-black px-3 py-1.5 transition-colors shrink-0 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              ХОЛБОГДОХ →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
