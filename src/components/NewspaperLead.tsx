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
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Cover Story (8 cols / ~67%) */}
        <div className="lg:col-span-7 xl:col-span-8 lg:border-r border-black lg:pr-8">
          <div
            onClick={() => onSelect(mainLead)}
            className="group cursor-pointer mb-6"
          >
            {/* Kicker badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-black text-[#00FF66] font-mono text-xs sm:text-sm font-bold px-2.5 py-1 uppercase tracking-widest">
                // COVER STORY
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-600 uppercase tracking-wider">
                [{mainLead.categoryName}]
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.15] text-black group-hover:text-emerald-600 transition-colors mb-4 tracking-tight">
              {mainLead.title}
            </h1>

            {/* Verified Source Monospace Tag */}
            <div className="font-mono text-xs sm:text-sm text-neutral-600 uppercase tracking-wider mb-4 flex flex-wrap items-center gap-2 pb-3 border-b border-neutral-200">
              <span className="text-black font-bold">
                SOURCE // {mainLead.primarySource}
              </span>
              <span className="text-neutral-400">•</span>
              <span>{mainLead.publishedAt} {mainLead.publishedTime}</span>
            </div>

            {/* Sharp Cover Image */}
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
        </div>

        {/* Featured Sub-leads Column (4-5 cols / ~33%) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-black">
            <h2 className="font-mono text-sm font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#00FF66] inline-block border border-black"></span>
              <span>ОНЦЛОХ НИЙТЛЭЛҮҮД</span>
            </h2>
            <span className="font-mono text-xs text-neutral-400 font-bold">FEATURED</span>
          </div>

          <div className="divide-y divide-neutral-200">
            {subLeads.slice(0, 3).map((art, idx) => {
              const isPortrait = art.category === 'interview' || (Boolean(art.coverImage) && art.coverImage.includes('/images/people/'));
              return (
                <article
                  key={art.id}
                  onClick={() => onSelect(art)}
                  className="py-5 first:pt-0 last:pb-0 cursor-pointer group flex flex-col sm:flex-row lg:flex-col gap-4"
                >
                  <div className={`w-full ${isPortrait ? 'sm:w-44 lg:w-full h-48 sm:h-52 lg:h-48' : 'sm:w-48 lg:w-full h-40 sm:h-36 lg:h-44'} shrink-0 overflow-hidden bg-neutral-100 border border-neutral-300 relative`}>
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-black text-[#00FF66] font-mono text-xs font-bold px-1.5 py-0.5">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                      // {art.categoryName}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                      {art.summary}
                    </p>
                    <div className="font-mono text-xs text-neutral-600 flex items-center justify-between border-t border-neutral-100 pt-2">
                      <span className="font-semibold text-black uppercase">
                        {art.primarySource.split(' ')[0]}
                      </span>
                      <span>{art.publishedTime}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
