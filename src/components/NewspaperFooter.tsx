'use client';

import React from 'react';
import { NAV_SECTIONS } from '@/data/news';
import { ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

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
          <div className="text-neutral-500 text-[11px]">
            THE AI & DEEP TECH JOURNAL // 24/7 EDITION
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

            {/* Editorial Charter Badge */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 text-neutral-300 space-y-2 text-[11px] leading-relaxed">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                <span>РЕДАКЦИЙН СТАНДАРТ</span>
              </div>
              <p>
                AImedee.mn нь хиймэл оюун ухаан, дэвшилтэт технологийн салбарын мэдээлэл, техникийн шинжилгээ, зах зээлийн судалгааг олон нийтэд хүргэдэг мэргэшсэн цахим сэтгүүл юм. Манай редакц зөвхөн баталгаажсан өгөгдөл, албан ёсны судалгааны тайлангуудад тулгуурлан мэдээллийг нийтэлдэг.
              </p>
            </div>

            <div className="text-[11px] text-neutral-400 space-y-1">
              <p>
                <strong>Мэдээллийн сүлжээ:</strong> AImedee Media • <strong>Холбоо барих:</strong> contact@aimedee.mn
              </p>
              <p>
                <strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, Мэдээлэл технологийн үндэсний төв
              </p>
              <p className="text-neutral-500 pt-2">
                © {new Date().getFullYear()} AImedee.mn. Бүх эрх хуулиар хамгаалагдсан. Нийтлэлийг иш татан ашиглахдаа холбоосыг заавал дурдана уу.
              </p>
            </div>
          </div>

          {/* Right: Quick Links & Contact */}
          <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 md:pl-8 pt-6 md:pt-0 text-[11px]">
            <div className="space-y-4">
              <div>
                <div className="text-white font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>РЕДАКЦТАЙ ХОЛБОГДОХ</span>
                </div>
                <ul className="space-y-2 text-neutral-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    • Мэдээ, нийтлэл санал болгох: editorial@aimedee.mn
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    • Хамтран ажиллах & Зар сурталчилгаа: ads@aimedee.mn
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    • Техникийн дэмжлэг: dev@aimedee.mn
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <div className="text-neutral-300 font-bold mb-2 uppercase tracking-wider text-[11px]">
                  ХУУЛЬ ЗҮЙН МЭДЭЭЛЭЛ
                </div>
                <div className="flex flex-wrap gap-4 text-neutral-400 text-[10px]">
                  <span className="hover:text-[#00FF66] cursor-pointer">ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ</span>
                  <span className="hover:text-[#00FF66] cursor-pointer">НУУЦЛАЛЫН БОДЛОГО</span>
                  <span className="hover:text-[#00FF66] cursor-pointer">ЗОХИОГЧИЙН ЭРХ</span>
                </div>
              </div>
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
