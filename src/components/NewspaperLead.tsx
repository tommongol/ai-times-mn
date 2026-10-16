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
  const col2Articles = subLeads.slice(0, 2);
  const col3Articles = subLeads.slice(2, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
        
        {/* Col 1: Main Cover Story (6 cols / 50%) */}
        <div className="lg:col-span-6 flex flex-col lg:border-r border-black lg:pr-6 xl:pr-8">
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

            {/* Photo - flex-1 so it naturally fills vertical space to match Col 2 & Col 3 */}
            <div className="relative overflow-hidden bg-neutral-100 mb-4 border border-black flex-1 min-h-[260px] sm:min-h-[340px]">
              <img
                src={mainLead.coverImage}
                alt={mainLead.title}
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

        {/* Col 2: Two Featured Stories (3 cols / 25%) */}
        <div className="lg:col-span-3 flex flex-col justify-between lg:border-r border-black lg:pr-6 xl:pr-8 divide-y divide-neutral-200">
          {col2Articles.map((art, idx) => (
            <article
              key={art.id}
              onClick={() => onSelect(art)}
              className={`group cursor-pointer flex-1 flex flex-col justify-between ${idx === 0 ? 'pb-5' : 'pt-5'}`}
            >
              <div>
                <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-100 mb-3 border border-neutral-300 relative">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-black text-[#00FF66] font-mono text-xs font-bold px-1.5 py-0.5">
                    0{idx + 1}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  // {art.categoryName}
                </span>

                <h3 className="text-base font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-2">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-3">
                  {art.summary}
                </p>
              </div>

              <div className="font-mono text-xs text-neutral-500 flex items-center justify-between border-t border-neutral-200 pt-2.5 mt-auto">
                <span>{art.publishedAt}</span>
                <span className="text-black group-hover:text-emerald-700 font-bold transition-colors">
                  УНШИХ →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Col 3: Three Compact Stories (3 cols / 25%) */}
        <div className="lg:col-span-3 flex flex-col justify-between divide-y divide-neutral-200">
          {col3Articles.map((art, idx) => (
            <article
              key={art.id}
              onClick={() => onSelect(art)}
              className={`group cursor-pointer flex-1 flex flex-col justify-between ${idx === 0 ? 'pb-4' : idx === 1 ? 'py-4' : 'pt-4'}`}
            >
              <div>
                <div className="w-full h-28 overflow-hidden bg-neutral-100 mb-2.5 border border-neutral-300 relative">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-1.5 right-1.5 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-1.5 py-0.5">
                    0{idx + 3}
                  </span>
                </div>

                <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                  // {art.categoryName}
                </span>

                <h4 className="text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {art.title}
                </h4>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="font-mono text-[11px] text-neutral-500 flex items-center justify-between border-t border-neutral-200 pt-2 mt-2">
                <span>{art.publishedAt}</span>
                <span className="text-black group-hover:text-emerald-700 font-bold transition-colors">
                  УНШИХ →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
