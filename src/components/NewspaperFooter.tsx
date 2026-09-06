'use client';

import React from 'react';
import { NAV_SECTIONS } from '@/data/news';

export const NewspaperFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-[#172956] text-slate-700 text-xs mt-12">
      {/* Category Link Directory */}
      <div className="border-b border-slate-200 bg-slate-50 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
          <div className="flex flex-wrap gap-4">
            {NAV_SECTIONS.map((sec) => (
              <span key={sec.id} className="hover:text-red-600 cursor-pointer">
                {sec.name}
              </span>
            ))}
          </div>
          <div className="text-slate-400 font-normal">
            aitimes.com • Telegram @How2AI • @aiaiai
          </div>
        </div>
      </div>

      {/* Main Newspaper Imprint & Legal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Brand & Editorial info */}
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-serif text-2xl font-black text-[#172956]">AIMEDEE</span>
              <span className="text-red-600 font-bold text-sm">.MN</span>
              <span className="text-[11px] text-slate-400 ml-2">인공지능 전문 미디어 (AI Мэргэшсэн Хэвлэл)</span>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed space-y-1">
              <p>
                <strong>Мэдээллийн хэрэгслийн нэр:</strong> AImedee.mn | <strong>Эрхлэн гаргагч:</strong> AImedee Media Group
              </p>
              <p>
                <strong>Хариуцлагатай эрхлэгч:</strong> М. Бат-Эрдэнэ | <strong>Ерөнхий редактор:</strong> Б. Тэмүүлэн
              </p>
              <p>
                <strong>Хаяг:</strong> Улаанбаатар хот, Сүхбаатар дүүрэг, Мэдээлэл технологийн үндэсний төв
              </p>
              <p>
                <strong>Холбогдох утас:</strong> (976) 7000-0000 | <strong>Редакцийн имэйл:</strong> news@aimedee.mn
              </p>
              <p className="text-slate-400 pt-1">
                AImedee.mn дээрх бүх нийтлэл, мэдээ, зураг нь зохиогчийн эрхийн хуулиар хамгаалагдсан бөгөөд зөвшөөрөлгүй хуулбарлан нийтлэхийг хориглоно.
              </p>
            </div>
          </div>

          {/* Right: Quick shortcuts */}
          <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 pt-4 md:pt-0 text-[11px] text-slate-500">
            <div>
              <div className="font-bold text-slate-800 mb-2">Хамтын ажиллагаа & Эх сурвалжууд</div>
              <ul className="space-y-1">
                <li>• AI타임스 (aitimes.com) хамтын ажиллагаа</li>
                <li>• Telegram @How2AI суваг</li>
                <li>• Telegram @aiaiai суваг</li>
                <li>• Мэдээ, нийтлэл илгээх: contact@aimedee.mn</li>
              </ul>
            </div>
            <div className="pt-4 text-[10px] text-slate-400">
              © {new Date().getFullYear()} AImedee.mn. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
