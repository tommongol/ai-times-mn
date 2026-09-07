'use client';

import React from 'react';
import { NewsArticle } from '@/data/news';
import { TrendingUp, ArrowUpRight, Flame, ShieldAlert } from 'lucide-react';

interface Props {
  mainLead: NewsArticle;
  subLeads: NewsArticle[];
  hotArticles: NewsArticle[];
  mostRead: NewsArticle[];
  onSelect: (art: NewsArticle) => void;
}

export const NewspaperLead: React.FC<Props> = ({
  mainLead,
  subLeads,
  hotArticles,
  mostRead,
  onSelect,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-b-2 border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Col 1: WIRED Cover Story (6 cols / 50%) */}
        <div className="lg:col-span-6 lg:border-r border-black lg:pr-8">
          <div
            onClick={() => onSelect(mainLead)}
            className="group cursor-pointer mb-8"
          >
            {/* Kicker badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-black text-[#00FF66] font-mono text-[11px] font-bold px-2 py-0.5 uppercase tracking-widest">
                // COVER STORY
              </span>
              <span className="font-mono text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                [{mainLead.categoryName}]
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.12] text-black group-hover:text-emerald-600 transition-colors mb-3 tracking-tight">
              {mainLead.title}
            </h1>

            {/* Verified Source Monospace Tag */}
            <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider mb-4 flex flex-wrap items-center gap-2 pb-3 border-b border-neutral-200">
              <span className="text-black font-bold">
                SOURCE // {mainLead.primarySource}
              </span>
              <span className="text-neutral-400">•</span>
              <span>{mainLead.publishedAt} {mainLead.publishedTime}</span>
              <span className="text-neutral-400">•</span>
              <span>{mainLead.readCount.toLocaleString()} READS</span>
            </div>

            {/* Sharp Image */}
            <div className="relative overflow-hidden bg-neutral-100 mb-4 border border-black aspect-[16/10]">
              <img
                src={mainLead.coverImage}
                alt={mainLead.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-xs text-white font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                ORIGINAL PHOTO // {mainLead.primarySource.split(' ')[0]}
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
              {mainLead.summary}
            </p>
          </div>

          {/* 2 sub-leads side-by-side below main lead */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-300">
            {subLeads.slice(0, 2).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelect(art)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div className="h-32 w-full overflow-hidden bg-neutral-100 mb-3 border border-neutral-300">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    // {art.categoryName}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <div className="font-mono text-[10px] text-neutral-500 mt-2 flex items-center justify-between border-t border-neutral-100 pt-1.5">
                    <span className="font-medium text-black">
                      {art.primarySource.split(' ')[0]}
                    </span>
                    <span>{art.publishedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: WIRED Hot Topics (3 cols / 25%) */}
        <div className="lg:col-span-3 lg:border-r border-black lg:pr-6">
          <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-black">
            <h2 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>THE WIRE // ШУУРХАЙ</span>
            </h2>
            <span className="font-mono text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2">
              DISPATCH
            </span>
          </div>

          <div className="divide-y divide-neutral-200">
            {hotArticles.slice(0, 4).map((art, idx) => (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className="py-4 first:pt-0 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px] text-neutral-500">
                  <span className="font-bold text-black uppercase">
                    // 0{idx + 1} {art.categoryName}
                  </span>
                  <span>{art.publishedTime}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {art.title}
                </h3>
                <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed mb-2 font-normal">
                  {art.summary}
                </p>
                <div className="font-mono text-[10px] text-neutral-500">
                  <span>ЭХ СУРВАЛЖ: </span>
                  <span className="text-black font-semibold">
                    {art.primarySource}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Col 3: Ranked Most Read & Terminal Briefing (3 cols / 25%) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-black">
            <h2 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-black" />
              <span>MOST READ // ТОП ЭРЭМБЭ</span>
            </h2>
            <span className="font-mono text-[10px] text-neutral-400">01—05</span>
          </div>

          <div className="space-y-4">
            {mostRead.slice(0, 5).map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelect(art)}
                className="group cursor-pointer flex items-start gap-3 pb-3 border-b border-neutral-100 last:border-0"
              >
                <span
                  className={`font-mono text-lg font-black shrink-0 w-7 leading-none ${
                    idx === 0
                      ? 'text-[#00FF66] bg-black px-1 py-0.5 text-center text-sm'
                      : idx < 3
                      ? 'text-black'
                      : 'text-neutral-400'
                  }`}
                >
                  0{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-black group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-1">
                    {art.title}
                  </h4>
                  <div className="font-mono text-[10px] text-neutral-500 flex items-center justify-between">
                    <span className="text-neutral-700">{art.primarySource.split(' ')[0]}</span>
                    <span>{art.readCount.toLocaleString()} reads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WIRED Newsletter Briefing Terminal Box */}
          <div className="mt-8 p-5 bg-neutral-900 text-white border-2 border-black">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#00FF66] font-bold mb-1">
              <span>// WIRED INTELLIGENCE BRIEF</span>
            </div>
            <h4 className="text-sm font-black text-white mb-2">
              Өдөр тутмын AI мэдээг и-мэйлээр шууд хүлээн авах
            </h4>
            <p className="text-[11px] text-neutral-400 mb-3 font-mono">
              Дэлхийн технологийн салбарын гол өөрчлөлтүүд, судалгааны тайлангууд.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Бүртгэл амжилттай! Та өдөр тутмын тоймоо авах болно.');
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="developer@domain.com"
                required
                className="w-full px-3 py-2 text-xs font-mono bg-black border border-neutral-700 text-white focus:outline-none focus:border-[#00FF66]"
              />
              <button
                type="submit"
                className="w-full py-2 text-xs font-mono font-bold bg-[#00FF66] text-black hover:bg-white transition-colors cursor-pointer"
              >
                SUBSCRIBE TO WIRE →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
