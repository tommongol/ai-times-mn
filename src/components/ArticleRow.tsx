import React from 'react';
import Link from 'next/link';
import { ArticleCardData } from '@/data/types';

/** Булан болон хайлтын жагсаалтын нэг мөр: зураг, булан, огноо, гарчиг, товч. */
export function ArticleRow({ art, eager = false }: { art: ArticleCardData; eager?: boolean }) {
  return (
    <Link
      href={`/article/${art.id}`}
      prefetch={false}
      className="py-6 cursor-pointer group flex flex-col sm:flex-row gap-6 items-start hover:bg-white p-4 transition-colors border-l-2 border-transparent hover:border-black"
    >
      <div className="w-full sm:w-64 aspect-[16/10] shrink-0 overflow-hidden bg-neutral-100 border border-neutral-300 relative">
        <img
          src={art.coverImage}
          alt={art.title}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="bg-black text-[#00FF66] font-bold px-2 py-0.5 uppercase">
              {art.categoryName}
            </span>
            <time dateTime={art.publishedAt} className="text-neutral-600">
              {art.publishedAt} • {art.publishedTime}
            </time>
          </div>
          <h2 className="font-black text-lg sm:text-xl lg:text-2xl text-black group-hover:text-emerald-600 transition-colors leading-snug mb-2">
            {art.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 line-clamp-2 leading-relaxed mb-3">
            {art.summary}
          </p>
        </div>
        <div className="font-mono text-xs text-emerald-700 font-bold group-hover:underline">
          ДЭЛГЭРЭНГҮЙ УНШИХ →
        </div>
      </div>
    </Link>
  );
}
