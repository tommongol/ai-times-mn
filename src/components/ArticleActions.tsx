'use client';

import React, { useState } from 'react';
import { Printer, Share2 } from 'lucide-react';

/** Нийтлэлийн дээд мөрний «Хэвлэх», «Хуваалцах» товч. */
export function ArticleActions() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Мэдээний холбоос:', window.location.href);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 border border-neutral-700 transition-colors cursor-pointer uppercase font-bold"
        title="Хэвлэх"
        aria-label="Хэвлэх"
      >
        <Printer className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">ХЭВЛЭХ</span>
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-[#00FF66] hover:text-black text-neutral-200 border border-neutral-700 transition-colors cursor-pointer uppercase font-bold"
        title="Холбоос хуулах"
        aria-label="Холбоос хуулах"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline" aria-live="polite">{copied ? 'ХУУЛЛАА' : 'ХУВААЛЦАХ'}</span>
      </button>
    </div>
  );
}
