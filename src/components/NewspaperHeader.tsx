'use client';

import React, { useState } from 'react';
import { Search, Mail, X, TrendingUp, ShieldCheck } from 'lucide-react';
import { NAV_SECTIONS } from '@/data/news';

interface Props {
  activeSection: string;
  onSelectSection: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
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

export const NewspaperHeader: React.FC<Props> = ({
  activeSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
}) => {
  const [localInput, setLocalInput] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localInput.trim());
  };

  const handleClear = () => {
    setLocalInput('');
    onSearchChange('');
  };

  const handleTagClick = (tag: string) => {
    setLocalInput(tag);
    onSearchChange(tag);
  };

  return (
    <header className="w-full bg-white border-b-2 border-black text-black">
      {/* 1. WIRED Micro Status Bar */}
      <div className="border-b border-neutral-200 bg-neutral-900 text-[11px] text-neutral-300 py-1.5 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#00FF66] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
              LIVE INTEL
            </span>
            <span className="text-neutral-500">|</span>
            <span>{new Date().toISOString().split('T')[0]} ULAANBAATAR</span>
            <span className="hidden md:inline text-neutral-500">|</span>
            <span className="hidden md:inline text-neutral-400">
              ХИЙМЭЛ ОЮУН УХААНЫ ДЭЛХИЙН БОДИТ ЦАГИЙН СЭТГҮҮЛ ЗҮЙ
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-neutral-800 px-2 py-0.5 rounded-xs border border-neutral-700">
              <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
              100% БОДИТ ЭХ СУРВАЛЖ
            </span>
            <span className="text-neutral-500">|</span>
            <button
              onClick={() => alert('Өдөр тутмын AI товхимолд бүртгэлээ!')}
              className="hover:text-[#00FF66] flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <Mail className="w-3 h-3" />
              <span>ТОБХИМОЛ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main WIRED Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          {/* Logo & Subtitle */}
          <div className="text-center lg:text-left">
            <button
              onClick={() => {
                setLocalInput('');
                onSearchChange('');
                onSelectSection('all');
              }}
              className="group inline-flex flex-col items-center lg:items-start text-left cursor-pointer"
            >
              <div className="flex items-baseline tracking-tighter">
                <span className="font-black text-4xl sm:text-5xl lg:text-6xl text-black uppercase tracking-tight group-hover:text-neutral-800 transition-colors">
                  AIMEDEE
                </span>
                <span className="text-[#00FF66] bg-black px-2 py-0.5 ml-2 font-black text-xl sm:text-2xl font-mono">
                  .MN
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 font-mono text-xs text-neutral-600 uppercase tracking-widest">
                <span className="font-bold text-black">// THE AI FRONTIER</span>
                <span>•</span>
                <span>aitimes.com солонгос & дэлхийн AI шинжилгээ</span>
              </div>
            </button>
          </div>

          {/* Search Box with WIRED Terminal Look */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex items-center w-full max-w-md lg:w-[420px] border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)] transition-all"
            >
              <div className="pl-3 text-neutral-400 font-mono text-xs font-bold">
                $
              </div>
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Хайх үг... (Nvidia, OpenAI, Deepfake...)"
                className="flex-1 px-2.5 py-2 text-xs font-mono bg-transparent focus:outline-none text-black placeholder-neutral-400"
              />
              {localInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                  title="Арилгах"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white hover:bg-[#00FF66] hover:text-black px-4 py-2 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>SEARCH</span>
              </button>
            </form>

            {/* Trending tags in monospace */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 overflow-x-auto max-w-full">
              <span className="font-bold text-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                <TrendingUp className="w-3 h-3 text-red-600" />
                TRENDS:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleTagClick(term)}
                    className="px-1.5 py-0.5 bg-neutral-100 hover:bg-black hover:text-[#00FF66] text-neutral-800 transition-colors cursor-pointer text-[10px] font-bold"
                  >
                    #{term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WIRED High-Contrast Navigation Grid */}
      <nav className="bg-black text-white border-t border-black">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center overflow-x-auto no-scrollbar font-mono text-xs uppercase tracking-wider divide-x divide-neutral-800">
            {NAV_SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id && !searchQuery;
              return (
                <li key={sec.id} className="shrink-0">
                  <button
                    onClick={() => {
                      setLocalInput('');
                      onSearchChange('');
                      onSelectSection(sec.id);
                    }}
                    className={`px-4 py-3 font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#00FF66] text-black font-black'
                        : 'text-neutral-300 hover:text-[#00FF66] hover:bg-neutral-900'
                    }`}
                  >
                    <span className="text-[10px] opacity-60">0{idx + 1}</span>
                    <span>{sec.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono text-neutral-400 pl-4 py-2 shrink-0">
            <span className="text-neutral-500">// SYNDICATION:</span>
            <span className="text-neutral-300">aitimes.com</span>
            <span>•</span>
            <span className="text-neutral-300">Reuters</span>
            <span>•</span>
            <span className="text-neutral-300">OpenAI</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
