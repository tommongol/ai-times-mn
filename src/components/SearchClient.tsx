'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowUpDown, XCircle } from 'lucide-react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { ArticleRow } from '@/components/ArticleRow';
import { ArticleCardData } from '@/data/types';
import { searchPath } from '@/data/sections';

const SUGGESTIONS = ['Nvidia', 'OpenAI', 'Deepfake', 'Atlas 3D', 'Vibe-coding', 'Lyria', 'FinTech'];

type IndexItem = Pick<
  ArticleCardData,
  'id' | 'title' | 'subtitle' | 'summary' | 'category' | 'categoryName' | 'tags' | 'publishedAt' | 'publishedTime' | 'coverImage'
>;

export function SearchClient() {
  const searchQuery = (useSearchParams().get('q') || '').trim();
  const [items, setItems] = useState<IndexItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [searchSort, setSearchSort] = useState<'latest' | 'oldest'>('latest');

  useEffect(() => {
    let alive = true;
    fetch('/api/search-index')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (alive) setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const results = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!items || !query) return [];
    const matched = items.filter(
      (art) =>
        art.title.toLowerCase().includes(query) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(query)) ||
        art.summary.toLowerCase().includes(query) ||
        art.categoryName.toLowerCase().includes(query) ||
        (art.tags && art.tags.some((t) => t.toLowerCase().includes(query)))
    );
    return matched.sort((a, b) => {
      const newestFirst = `${b.publishedAt}T${b.publishedTime}`.localeCompare(`${a.publishedAt}T${a.publishedTime}`);
      return searchSort === 'oldest' ? -newestFirst : newestFirst;
    });
  }, [items, searchQuery, searchSort]);

  const loading = !items && !failed;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
      <NewspaperHeader searchQuery={searchQuery} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="pb-4 mb-6 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-3 h-3 bg-[#00FF66] inline-block border border-black"></span>
              <h1 className="font-mono text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                {searchQuery ? (
                  <span>
                    // SEARCH RESULTS FOR: &ldquo;{searchQuery}&rdquo;
                  </span>
                ) : (
                  <span>// ХАЙЛТ</span>
                )}
              </h1>
              {searchQuery && !loading && !failed && (
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-[#00FF66]" aria-live="polite">
                  {results.length} НИЙТЛЭЛ
                </span>
              )}
            </div>

            {searchQuery && (
              <div className="flex items-center gap-3 font-mono text-xs">
                <label className="flex items-center gap-2 text-neutral-600">
                  <ArrowUpDown className="w-3.5 h-3.5 text-black" />
                  <span className="font-bold text-black uppercase">ЭРЭМБЭ:</span>
                  <select
                    value={searchSort}
                    onChange={(e) => setSearchSort(e.target.value as 'latest' | 'oldest')}
                    className="border border-black bg-white px-2 py-1 text-xs text-black font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <option value="latest">Сүүлийн үеийнхээр (LATEST)</option>
                    <option value="oldest">Хуучнаас нь (OLDEST)</option>
                  </select>
                </label>

                <Link
                  href="/"
                  className="flex items-center gap-1 bg-black text-white hover:bg-[#00FF66] hover:text-black font-bold px-3 py-1 transition-colors cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </Link>
              </div>
            )}
          </div>

          {failed ? (
            <div className="py-16 text-center bg-neutral-50 border-2 border-black p-8 my-6" role="alert">
              <h2 className="font-mono text-base font-black text-black mb-2 uppercase">
                [!] ХАЙЛТЫГ АЧААЛЖ ЧАДСАНГҮЙ
              </h2>
              <p className="text-xs text-neutral-600 max-w-md mx-auto font-mono">
                Сүлжээгээ шалгаад хуудсаа дахин ачаална уу.
              </p>
            </div>
          ) : loading ? (
            <p className="py-16 text-center font-mono text-sm text-neutral-600" role="status">
              Хайж байна…
            </p>
          ) : !searchQuery ? (
            <div className="py-16 text-center bg-neutral-50 border-2 border-black p-8 my-6">
              <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h2 className="font-mono text-base font-black text-black mb-2 uppercase">
                ХАЙХ ҮГЭЭ ДЭЭД ТАЛЫН ТАЛБАРТ БИЧНЭ ҮҮ
              </h2>
              <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6 font-mono">
                Эсвэл дараах нийтлэг сэдвүүдээс сонгоно уу.
              </p>
              <SuggestionLinks />
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {results.map((art, idx) => (
                <ArticleRow key={art.id} art={art as ArticleCardData} eager={idx < 2} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-neutral-50 border-2 border-black p-8 my-6">
              <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h2 className="font-mono text-base font-black text-black mb-2 uppercase">
                [!] &ldquo;{searchQuery}&rdquo; ТҮЛХҮҮР ҮГЭЭР ИЛЭРЦ ОЛДСОНГҮЙ
              </h2>
              <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6 font-mono">
                Үгийн зөв бичгийг шалгах эсвэл дараах нийтлэг сэдвүүдээс сонгож хайна уу.
              </p>
              <SuggestionLinks />
            </div>
          )}
        </div>
      </main>

      <NewspaperFooter />
    </div>
  );
}

function SuggestionLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
      {SUGGESTIONS.map((kw) => (
        <Link
          key={kw}
          href={searchPath(kw)}
          rel="nofollow"
          className="px-3 py-1.5 font-bold bg-white border border-black hover:bg-black hover:text-[#00FF66] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          #{kw}
        </Link>
      ))}
    </div>
  );
}
