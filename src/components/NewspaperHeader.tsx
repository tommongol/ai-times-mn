'use client';

import React, { useState } from 'react';
import { Search, Mail, Globe, Menu, X, Clock, ChevronRight } from 'lucide-react';
import { NAV_SECTIONS } from '@/data/news';

interface Props {
  activeSection: string;
  onSelectSection: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const NewspaperHeader: React.FC<Props> = ({
  activeSection,
  onSelectSection,
  searchQuery,
  onSearchChange,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-300 text-slate-900">
      {/* 1. Top micro bar */}
      <div className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-600 py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-800">
              {new Date().getFullYear()} оны 9-р сарын 6 (Ням) | Улаанбаатар 18:30
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-red-600 font-semibold flex items-center gap-1">
              ● ШУУРХАЙ
            </span>
            <span className="hidden md:inline text-slate-500">
              Хиймэл оюуны бодит цагийн мэдээллийн сүлжээ
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => alert('Товхимол бүртгэл нээгдлээ!')}
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

      {/* 2. Main Newspaper Masthead */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <button
            onClick={() => onSelectSection('all')}
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

        {/* Search & Top banner spot */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Нийтлэл, сэдвийн хайлт..."
              className="w-64 sm:w-80 px-3.5 py-1.5 text-xs bg-slate-100 border border-slate-300 focus:bg-white focus:outline-none focus:border-[#172956] text-slate-900 placeholder-slate-400"
            />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 3. Navy Navigation Bar (exact aitimes.com style #172956) */}
      <nav className="bg-[#172956] text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center overflow-x-auto no-scrollbar font-medium text-xs sm:text-sm">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <li key={sec.id}>
                  <button
                    onClick={() => onSelectSection(sec.id)}
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
