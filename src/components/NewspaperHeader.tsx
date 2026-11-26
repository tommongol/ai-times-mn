'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Mail, X, TrendingUp } from 'lucide-react';
import { NAV_SECTIONS } from '@/data/types';
import { sectionPath, searchPath } from '@/data/sections';

interface Props {
  /** Идэвхтэй булангийн id; нүүр хуудсанд 'all' */
  activeSection?: string;
  /** Хайлтын хуудсанд одоогийн хайсан үг */
  searchQuery?: string;
  /** Нүүр хуудсанд сайтын нэр нь хуудасны гол гарчиг (h1) болно */
  isHome?: boolean;
}

const POPULAR_SEARCHES = [
  'Nvidia',
  'OpenAI',
  'Deepfake',
  'Atlas 3D',
  'Vibe-coding',
  'Lyria',
  'FinTech',
  'Робот',
];

// Улаанбаатарын цаг (UTC+8) дахь өнөөдрийн огноо
function ulaanbaatarToday(): string {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

export const NewspaperHeader: React.FC<Props> = ({
  activeSection = '',
  searchQuery = '',
  isHome = false,
}) => {
  const router = useRouter();
  const [localInput, setLocalInput] = useState(searchQuery);
  // Огноог хөтөч дээр тавина: статик хуудас build хийсэн өдрөөрөө хоцрохгүй.
  const [today, setToday] = useState('');

  useEffect(() => setToday(ulaanbaatarToday()), []);
  useEffect(() => setLocalInput(searchQuery), [searchQuery]);

  // JavaScript-гүй үед form өөрөө /hailt?q=… руу очно; байвал хуудас дахин ачаалалгүй шилжинэ.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = localInput.trim();
    router.push(q ? searchPath(q) : '/');
  };

  const handleClear = () => {
    setLocalInput('');
    if (searchQuery) router.push('/');
  };

  const masthead = (
    <Link href="/" className="group inline-flex flex-col items-center lg:items-start text-left cursor-pointer">
      <span className="flex items-baseline tracking-tighter">
        <span className="text-[#00FF66] bg-black px-2 py-0.5 mr-2 font-black text-2xl sm:text-3xl lg:text-[34px] font-mono self-center">
          AI
        </span>{' '}
        <span className="font-black text-4xl sm:text-5xl lg:text-[54px] leading-none text-black uppercase tracking-tight group-hover:text-neutral-800 transition-colors">
          MONGOLIA
        </span>
      </span>{' '}
      <span className="flex items-center gap-2 mt-1.5 font-mono text-xs text-neutral-600 uppercase tracking-widest">
        <span className="font-bold text-black">// ХИЙМЭЛ ОЮУНЫ МЭДЭЭ МЭДЭЭЛЭЛ</span>
      </span>
    </Link>
  );

  return (
    <header className="w-full bg-white border-b-2 border-black text-black">
      {/* 1. WIRED Micro Status Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900 text-xs text-neutral-300 py-2 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-neutral-200">
              {today && <time dateTime={today}>{today}</time>} ULAANBAATAR
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#00FF66] font-bold tracking-wider uppercase">
              Latest update of AI
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/tovhimol"
              prefetch={false}
              className="bg-[#00FF66] text-black hover:bg-white px-2.5 py-1 flex items-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer font-black"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>ТОВХИМОЛ ЗАХИАЛАХ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main WIRED Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Logo & Subtitle */}
          <div className="text-center lg:text-left">
            {isHome ? <h1>{masthead}</h1> : masthead}
          </div>

          {/* Search Box with WIRED Terminal Look */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-2">
            <form
              action="/hailt"
              method="get"
              role="search"
              onSubmit={handleSubmit}
              className="flex items-center w-full max-w-md lg:w-[440px] border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)] transition-all"
            >
              <div className="pl-3.5 text-neutral-400 font-mono text-sm font-bold" aria-hidden="true">
                $
              </div>
              <input
                type="text"
                name="q"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Хайх үг... (Nvidia, OpenAI, Deepfake...)"
                aria-label="Мэдээ хайх"
                className="flex-1 min-w-0 px-3 py-2 text-sm font-mono bg-transparent focus:outline-none text-black placeholder-neutral-500"
              />
              {localInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
                  title="Арилгах"
                  aria-label="Хайлтыг арилгах"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white hover:bg-[#00FF66] hover:text-black px-4 py-2 text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH</span>
              </button>
            </form>

            {/* Trending tags in monospace */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 flex-wrap justify-center lg:justify-end">
              <span className="font-bold text-black uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                TRENDS:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <Link
                  key={term}
                  href={searchPath(term)}
                  prefetch={false}
                  rel="nofollow"
                  className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 hover:border-black hover:bg-black hover:text-[#00FF66] text-neutral-800 transition-colors cursor-pointer text-[11px] font-bold"
                >
                  #{term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. WIRED High-Contrast Navigation Grid — булан бүр жинхэнэ холбоос */}
      <nav aria-label="Булангууд" className="bg-black text-white border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center overflow-x-auto no-scrollbar font-mono text-xs sm:text-[13px] uppercase tracking-wider divide-x divide-neutral-800 border-x border-neutral-800">
            {NAV_SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id && !searchQuery;
              return (
                <li key={sec.id} className="shrink-0">
                  <Link
                    href={sectionPath(sec.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 sm:px-5 py-3.5 font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#00FF66] text-black font-black'
                        : 'text-neutral-300 hover:text-[#00FF66] hover:bg-neutral-900'
                    }`}
                  >
                    <span className="text-xs opacity-60" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                    <span>{sec.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

    </header>
  );
};
