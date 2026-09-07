'use client';

import React, { useState } from 'react';
import { Search, Mail, X, TrendingUp } from 'lucide-react';
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
    <header className="w-full bg-white border-b border-slate-300 text-slate-900">
      {/* 1. Top micro bar */}
      <div className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-600 py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-800">
              {new Date().getFullYear()} оны 9-р сарын 7 (Даваа) | Улаанбаатар
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-red-600 font-semibold flex items-center gap-1">
              ● ШУУРХАЙ МЭДЭЭ
            </span>
            <span className="hidden md:inline text-slate-500">
              Хиймэл оюун ухааны бодит цагийн мэдээллийн сүлжээ
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => alert('Товхимол бүртгэл амжилттай!')}
              className="hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>И-мэйл товхимол</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">MN / EN</span>
          </div>
        </div>
      </div>

      {/* 2. Main Newspaper Masthead & Search Box */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="text-center md:text-left">
          <button
            onClick={() => {
              setLocalInput('');
              onSearchChange('');
              onSelectSection('all');
            }}
            className="group flex flex-col items-center md:items-start text-left"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#172956] group-hover:text-red-600 transition-colors">
                AIMEDEE
              </span>
              <span className="text-red-600 font-bold text-lg sm:text-xl font-sans tracking-wide">
                .MN
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-1">
              ХИЙМЭЛ ОЮУН УХААНЫ МЭРГЭШСЭН СОНИН, МЭДЭЭЛЛИЙН ПОРТАЛ
            </p>
          </button>
        </div>

        {/* Real Newspaper Search Form */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-1.5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-md sm:w-96 border-2 border-[#172956] bg-white"
          >
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Хайх үгээ оруулна уу (жишээ нь: Nvidia, OpenAI...)"
              className="flex-1 px-3 py-1.5 text-xs bg-transparent focus:outline-none text-slate-900 placeholder-slate-400"
            />
            {localInput && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Арилгах"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="bg-[#172956] hover:bg-red-600 text-white px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Хайх</span>
            </button>
          </form>

          {/* Popular Search Terms */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 overflow-x-auto max-w-full">
            <span className="text-red-600 font-bold flex items-center gap-0.5 shrink-0">
              <TrendingUp className="w-3 h-3" />
              Трэнд:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleTagClick(term)}
                  className="hover:text-red-600 hover:underline cursor-pointer transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navy Navigation Bar (exact aitimes.com style #172956) */}
      <nav className="bg-[#172956] text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center overflow-x-auto no-scrollbar font-medium text-xs sm:text-sm">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id && !searchQuery;
              return (
                <li key={sec.id}>
                  <button
                    onClick={() => {
                      setLocalInput('');
                      onSearchChange('');
                      onSelectSection(sec.id);
                    }}
                    className={`px-4 py-3 whitespace-nowrap transition-colors border-b-2 flex items-center gap-1 ${
                      isActive
                        ? 'bg-red-600 text-white font-bold border-red-600'
                        : 'border-transparent text-slate-200 hover:text-white hover:bg-[#1f3670]'
                    }`}
                  >
                    <span>{sec.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center text-xs text-slate-300 font-normal pl-4">
            <span>Эх сурвалж: aitimes.com • Telegram • Google News</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
