'use client';

import React from 'react';
import { NewsArticle } from '@/data/news';
import { TrendingUp, Clock, ChevronRight } from 'lucide-react';

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
  onSelect
}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6 border-b border-slate-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: Main Lead Story (6 cols / 50%) */}
        <div className="lg:col-span-6 lg:border-r lg:border-slate-200 lg:pr-6">
          <div
            onClick={() => onSelect(mainLead)}
            className="group cursor-pointer mb-5"
          >
            <div className="relative overflow-hidden bg-slate-100 mb-3 aspect-[16/10]">
              <img
                src={mainLead.coverImage}
                alt={mainLead.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                ТЭРГҮҮН МЭДЭЭ
              </span>
            </div>

            <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-2">
              <span className="text-red-600 font-bold">[{mainLead.categoryName}]</span>
              <span>{mainLead.author}</span>
              <span>•</span>
              <span>{mainLead.publishedTime}</span>
            </div>

            <h1 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors mb-2">
              {mainLead.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-2 font-normal">
              {mainLead.summary}
            </p>
          </div>

          {/* 2 sub-leads side-by-side below main lead */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            {subLeads.slice(0, 2).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelect(art)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div className="h-28 w-full overflow-hidden bg-slate-100 mb-2">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-red-600 font-bold block mb-0.5">
                    [{art.categoryName}]
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                    {art.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {art.publishedTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Hot Editorial Topics (3 cols / 25%) */}
        <div className="lg:col-span-3 lg:border-r lg:border-slate-200 lg:pr-6">
          <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-red-600">
            <h2 className="text-sm font-black tracking-tight text-slate-900 uppercase">
              Гол сэдвүүд
            </h2>
            <span className="text-[10px] font-semibold text-red-600">HOT NEWS</span>
          </div>

          <div className="divide-y divide-slate-100">
            {hotArticles.slice(0, 4).map((art) => (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className="py-3 first:pt-0 cursor-pointer group"
              >
                <span className="text-[10px] text-red-600 font-bold block mb-1">
                  [{art.categoryName}]
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                  {art.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-1">
                  {art.summary}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{art.author.split(' ')[0]}</span>
                  <span>•</span>
                  <span>{art.publishedTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Col 3: Ranked Most Read (3 cols / 25%) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#172956]">
            <h2 className="text-sm font-black tracking-tight text-[#172956] uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-red-600" />
              Хамгийн их уншсан
            </h2>
            <span className="text-[10px] text-slate-400">ТОП 5</span>
          </div>

          <div className="space-y-3">
            {mostRead.slice(0, 5).map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelect(art)}
                className="group cursor-pointer flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
              >
                <span
                  className={`text-base font-black italic shrink-0 w-5 text-center ${
                    idx < 3 ? 'text-red-600' : 'text-slate-400'
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight mb-1">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{art.categoryName}</span>
                    <span>Уншсан: {art.readCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Newsletter banner in side column */}
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-[#172956] mb-1">AImedee Шуурхай мэдээлэл</h4>
            <p className="text-[11px] text-slate-500 mb-2">
              Өдөр бүрийн онцлох AI мэдээллийг и-мэйлээрээ аваарай.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Бүртгэл амжилттай!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Таны и-мэйл хаяг"
                required
                className="w-full px-2.5 py-1 text-xs border border-slate-300 bg-white"
              />
              <button
                type="submit"
                className="w-full py-1 text-xs font-bold bg-[#172956] text-white hover:bg-slate-800 transition-colors"
              >
                Захиалах
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
