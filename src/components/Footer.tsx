'use client';

import React from 'react';
import { Sparkles, Send, ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] mt-16 text-slate-600 dark:text-slate-400">
      {/* Top Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">AI TIMES MN</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-4">
              Дэлхийн хиймэл оюуны шинэ дэвшил, судалгаа, бүтээгдэхүүн, бодит кейсүүдийг монгол хэлээр давхардалгүй, бодит цаг хугацаанд хүргэдэг нэгдсэн портал.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Deduplicated & Verified Sources
              </span>
              <span>•</span>
              <span>aitimes.com • Telegram • Google News • OpenAI</span>
            </div>
          </div>

          {/* Newsletter Input */}
          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Долоо хоног тутмын тойм</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Хамгийн чухал 5 AI мэдээллийг и-мэйлээрээ аваарай.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Бүртгэл амжилттай хийгдлээ!'); }} className="flex gap-2">
              <input
                type="email"
                placeholder="И-мэйл хаягаа оруулна уу"
                required
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Бүртгүүлэх</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AI Times MN. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div className="flex items-center gap-6">
            <a href="https://aitimes.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              aitimes.com
            </a>
            <a href="https://t.me/How2AI" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              @How2AI
            </a>
            <a href="https://t.me/aiaiai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">
              @aiaiai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
