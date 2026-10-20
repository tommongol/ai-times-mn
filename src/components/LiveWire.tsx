'use client';

import React from 'react';
import { LiveWireItem } from '@/data/types';
import { Terminal } from 'lucide-react';

interface Props {
  items: LiveWireItem[];
}

export const LiveWire: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-black text-white p-4 mb-6 border-2 border-black">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold">
          <Terminal className="w-4 h-4 text-[#00FF66]" />
          <span className="text-white">24H REALTIME DISPATCH //</span>
          <span className="text-[#00FF66] hidden sm:inline">ШУУРХАЙ МЭДЭЭНИЙ УРСГАЛ</span>
        </div>
        <span className="font-mono text-[10px] text-[#00FF66] font-bold flex items-center gap-1.5 bg-neutral-900 px-2.5 py-0.5 border border-neutral-800">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping"></span>
          LIVE FEED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {items.slice(0, 12).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 text-xs font-mono group py-1.5 px-2 hover:bg-neutral-900 transition-colors border-b border-neutral-900/80"
          >
            <span className="text-[#00FF66] font-black shrink-0">
              [{item.time}]
            </span>
            <span className="text-neutral-200 group-hover:text-[#00FF66] line-clamp-1 transition-colors flex-1 min-w-0">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
