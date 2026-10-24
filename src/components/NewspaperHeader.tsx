'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Mail, X, TrendingUp } from 'lucide-react';
import { NAV_SECTIONS } from '@/data/types';

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
      <div className="border-b border-neutral-800 bg-neutral-900 text-xs text-neutral-300 py-2 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <span className="text-neutral-200">{new Date().toISOString().split('T')[0]} ULAANBAATAR</span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-[#00FF66] font-bold tracking-wider uppercase">
              AI Mongolia
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
            <button
              onClick={() => {
                setLocalInput('');
                onSearchChange('');
                onSelectSection('all');
              }}
              className="group inline-flex flex-col items-center lg:items-start text-left cursor-pointer"
            >
              <div className="flex items-baseline tracking-tighter">
                <span className="text-[#00FF66] bg-black px-2 py-0.5 mr-2 font-black text-2xl sm:text-3xl lg:text-[34px] font-mono self-center">
                  AI
                </span>
                <span className="font-black text-4xl sm:text-5xl lg:text-[54px] leading-none text-black uppercase tracking-tight group-hover:text-neutral-800 transition-colors">
                  MONGOLIA
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 font-mono text-xs text-neutral-600 uppercase tracking-widest">
                <span className="font-bold text-black">// ХИЙМЭЛ ОЮУНЫ МЭДЭЭ</span>
              </div>
            </button>
          </div>

          {/* Search Box with WIRED Terminal Look */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex items-center w-full max-w-md lg:w-[440px] border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)] transition-all"
            >
              <div className="pl-3.5 text-neutral-400 font-mono text-sm font-bold">
                $
              </div>
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Хайх үг... (Nvidia, OpenAI, Deepfake...)"
                className="flex-1 px-3 py-2 text-sm font-mono bg-transparent focus:outline-none text-black placeholder-neutral-400"
              />
              {localInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-neutral-400 hover:text-black cursor-pointer"
                  title="Арилгах"
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
                <button
                  key={term}
                  type="button"
                  onClick={() => handleTagClick(term)}
                  className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 hover:border-black hover:bg-black hover:text-[#00FF66] text-neutral-800 transition-colors cursor-pointer text-[11px] font-bold"
                >
                  #{term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. WIRED High-Contrast Navigation Grid */}
      <nav className="bg-black text-white border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center overflow-x-auto no-scrollbar font-mono text-xs sm:text-[13px] uppercase tracking-wider divide-x divide-neutral-800 border-x border-neutral-800">
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
                    className={`px-4 sm:px-5 py-3.5 font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#00FF66] text-black font-black'
                        : 'text-neutral-300 hover:text-[#00FF66] hover:bg-neutral-900'
                    }`}
                  >
                    <span className="text-xs opacity-60">0{idx + 1}</span>
                    <span>{sec.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

    </header>
  );
};
