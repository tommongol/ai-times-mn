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
        <div className="lg:col-span-6 flex flex-col justify-between lg:border-r border-black lg:pr-6 xl:pr-8">
          <article
            onClick={() => onSelect(mainLead)}
            className="group cursor-pointer flex flex-col h-full justify-between"
          >
            <div>
              {/* Kicker badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-black text-[#00FF66] font-mono text-xs font-bold px-2.5 py-1 uppercase tracking-widest">
                  // ТЭРГҮҮН МЭДЭЭ
                </span>
                <span className="font-mono text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  [{mainLead.categoryName}]
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.18] text-black group-hover:text-emerald-600 transition-colors mb-3 tracking-tight">
                {mainLead.title}
              </h1>

              {/* Source & Date metadata */}
              <div className="font-mono text-xs text-neutral-600 uppercase tracking-wider mb-4 flex flex-wrap items-center gap-2 pb-3 border-b border-neutral-200">
                <span className="text-black font-bold">
                  SOURCE // {mainLead.primarySource}
                </span>
                <span className="text-neutral-400">•</span>
                <span>{mainLead.publishedAt} {mainLead.publishedTime}</span>
              </div>

              {/* Photo */}
              <div className="relative overflow-hidden bg-neutral-100 mb-4 border border-black aspect-[16/10]">
                <img
                  src={mainLead.coverImage}
                  alt={mainLead.title}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-xs text-white font-mono text-xs px-2.5 py-1 uppercase tracking-wider">
                  ORIGINAL PHOTO // {mainLead.primarySource.split(' ')[0]}
                </span>
              </div>

              {/* Summary */}
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
                {mainLead.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-xs text-neutral-500">
              <span className="text-black font-bold uppercase">
                {mainLead.primarySource}
              </span>
              <span className="text-emerald-700 font-bold group-hover:underline">
                ДЭЛГЭРЭНГҮЙ УНШИХ →
              </span>
            </div>
          </article>
        </div>

        {/* Col 2: Two Featured Stories (3 cols / 25%) */}
        <div className="lg:col-span-3 flex flex-col justify-between lg:border-r border-black lg:pr-6 divide-y divide-neutral-200">
          {col2Articles.map((art, idx) => {
            const isPortrait = art.category === 'interview' || (Boolean(art.coverImage) && art.coverImage.includes('/images/people/'));
            return (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className={`group cursor-pointer flex flex-col justify-between ${idx === 0 ? 'pb-6' : 'pt-6'}`}
              >
                <div>
                  <div className={`w-full overflow-hidden bg-neutral-100 mb-3 border border-neutral-300 relative ${isPortrait ? 'h-48' : 'h-36'}`}>
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

                <div className="font-mono text-xs text-neutral-600 flex items-center justify-between border-t border-neutral-100 pt-2">
                  <span className="font-semibold text-black uppercase">
                    {art.primarySource.split(' ')[0]}
                  </span>
                  <span>{art.publishedTime}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Col 3: Three Compact Stories (3 cols / 25%) */}
        <div className="lg:col-span-3 flex flex-col justify-between divide-y divide-neutral-200">
          {col3Articles.map((art, idx) => {
            const isPortrait = art.category === 'interview' || (Boolean(art.coverImage) && art.coverImage.includes('/images/people/'));
            return (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className={`group cursor-pointer flex flex-col justify-between ${idx === 0 ? 'pb-4' : idx === 1 ? 'py-4' : 'pt-4'}`}
              >
                <div>
                  <div className={`w-full overflow-hidden bg-neutral-100 mb-2 border border-neutral-300 relative ${isPortrait ? 'h-32' : 'h-24'}`}>
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 bg-black text-[#00FF66] font-mono text-[10px] font-bold px-1.5 py-0.2">
                      0{idx + 3}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    // {art.categoryName}
                  </span>

                  <h4 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                    {art.title}
                  </h4>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="font-mono text-xs text-neutral-500 flex items-center justify-between border-t border-neutral-100 pt-1.5 mt-2">
                  <span className="font-medium text-black">
                    {art.primarySource.split(' ')[0]}
                  </span>
                  <span>{art.publishedTime}</span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
