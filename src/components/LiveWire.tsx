'use client';

import React from 'react';
import { LIVE_WIRE } from '@/data/news';
import { Clock } from 'lucide-react';

export const LiveWire: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 p-4 mb-6">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-300">
        <h3 className="text-xs font-black uppercase text-[#172956] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-red-600" />
          <span>Шуурхай мэдээний цагийн урсгал (24H Wire)</span>
        </h3>
        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Шууд
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {LIVE_WIRE.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs">
            <span className="font-mono text-[11px] font-bold text-red-600 shrink-0">
              {item.time}
            </span>
            <span className="text-slate-700 hover:text-red-600 cursor-pointer line-clamp-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
