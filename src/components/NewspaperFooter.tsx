'use client';

import React from 'react';
import { NAV_SECTIONS } from '@/data/news';
import { ShieldCheck, Terminal, ExternalLink } from 'lucide-react';

export const NewspaperFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-black text-xs mt-16 font-mono">
      {/* Category Directory Bar */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider font-bold">
            {NAV_SECTIONS.map((sec, idx) => (
              <span
                key={sec.id}
                className="hover:text-[#00FF66] cursor-pointer transition-colors"
              >
                0{idx + 1} // {sec.name}
              </span>
            ))}
          </div>
          <div className="text-neutral-400 text-[11px] flex items-center gap-2">
            <span className="text-[#00FF66]">●</span>
            <span>SYNDICATED FROM: aitimes.com • Telegram @How2AI • @aiaiai</span>
          </div>
        </div>
      </div>

      {/* Main WIRED Imprint */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Brand & Editorial Charter */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                AIMEDEE
              </span>
              <span className="text-black bg-[#00FF66] px-2 py-0.5 font-black text-sm">
                .MN
              </span>
              <span className="text-neutral-400 text-[11px] ml-3 hidden sm:inline">
                // ARTIFICIAL INTELLIGENCE JOURNAL
              </span>
            </div>

            {/* Verified Policy Badge */}
            <div className="p-3.5 bg-neutral-900 border border-neutral-800 text-neutral-300 space-y-2 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                <span>РЕДАКЦИЙН ЧАНАРЫН СТАНДАРТ: ЗӨВХӨН БОДИТ ЭХ СУРВАЛЖ</span>
              </div>
              <p>
                AImedee.mn нь хиймэл оюуны салбарын хуурамч, зохиомол сэтгүүлчдийн нэрс болон баталгаагүй цуурхлыг бүрэн халж, зөвхөн олон улсын нэр хүндтэй хэвлэл (AI Times Korea, Reuters, Bloomberg), албан ёсны технологийн лабораториуд (OpenAI, Google DeepMind, Nvidia, World Labs) болон Telegram-ийн шалгагдсан сувгуудын бодит өгөгдлийг монгол хэл дээр хүргэдэг мэргэшсэн сонин юм.
              </p>
            </div>

            <div className="text-[11px] text-neutral-400 space-y-1">
              <p>
                <strong>Мэдээллийн сүлжээ:</strong> AImedee Tech Media • <strong>Холбоо барих:</strong> contact@aimedee.mn
              </p>
              <p>
                <strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, Мэдээлэл технологийн үндэсний төв
              </p>
              <p className="text-neutral-500 pt-1">
                © {new Date().getFullYear()} AImedee.mn. Зохиогчийн эрх хуулиар хамгаалагдсан. Эх сурвалжийг тодорхой дурдан хуваалцаж болно.
              </p>
            </div>
          </div>

          {/* Right: Partner Feeds & Verification Channels */}
          <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 md:pl-8 pt-6 md:pt-0 text-[11px]">
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>ЭХ СУРВАЛЖИЙН СҮЛЖЭЭ</span>
              </div>
              <ul className="space-y-2 text-neutral-400">
                <li className="flex items-center justify-between hover:text-white transition-colors">
                  <span>• AI타임스 (aitimes.com) Солонгос</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </li>
                <li className="flex items-center justify-between hover:text-white transition-colors">
                  <span>• Telegram @How2AI суваг</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </li>
                <li className="flex items-center justify-between hover:text-white transition-colors">
                  <span>• Telegram @aiaiai суваг</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </li>
                <li className="flex items-center justify-between hover:text-white transition-colors">
                  <span>• Reuters & Bloomberg Tech</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </li>
                <li className="flex items-center justify-between hover:text-white transition-colors">
                  <span>• OpenAI & Nvidia Research</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </li>
              </ul>
            </div>

            <div className="pt-6 text-[10px] text-neutral-500 font-mono">
              ENGINEERED FOR DEEP TECH INTELLIGENCE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
