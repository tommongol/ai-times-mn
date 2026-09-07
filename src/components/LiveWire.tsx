'use client';

import React from 'react';
import { LIVE_WIRE } from '@/data/news';
import { Terminal, Radio } from 'lucide-react';

export const LiveWire: React.FC = () => {
  return (
    <div className="bg-black text-white p-4 mb-8 border-2 border-black">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold">
          <Terminal className="w-4 h-4 text-[#00FF66]" />
          <span className="text-white">WIRED 24H REALTIME DISPATCH //</span>
          <span className="text-[#00FF66] hidden sm:inline">ШУУРХАЙ СҮЛЖЭЭ</span>
        </div>
        <span className="font-mono text-[10px] text-[#00FF66] font-bold flex items-center gap-1.5 bg-neutral-900 px-2 py-0.5 border border-neutral-800">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping"></span>
          REAL-TIME FEED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {LIVE_WIRE.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 text-xs font-mono group p-1.5 hover:bg-neutral-900 transition-colors"
          >
            <span className="text-[#00FF66] font-black shrink-0">
              [{item.time}]
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-neutral-400 font-bold mr-1.5 group-hover:text-white">
                //{item.source}:
              </span>
              <span className="text-neutral-200 group-hover:text-[#00FF66] line-clamp-1 transition-colors">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
