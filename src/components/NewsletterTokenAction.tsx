'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

// Имэйлийн холбоосоор ирсэн хүн товч дарж баталгаажуулна / цуцална.
// Хуудас нээгдэхэд автоматаар хийхгүй — имэйлийн холбоос шалгагч бот санамсаргүй дарахаас сэргийлнэ.

const TEXT = {
  confirm: {
    title: 'Товхимлын захиалга баталгаажуулах',
    button: 'Баталгаажуулах',
    done: 'Захиалга баталгаажлаа. Товхимол удахгүй ирж эхэлнэ.',
    endpoint: '/api/newsletter/confirm',
  },
  unsubscribe: {
    title: 'Товхимлын захиалга цуцлах',
    button: 'Захиалгаа цуцлах',
    done: 'Захиалга цуцлагдлаа. Таны имэйлийг жагсаалтаас устгасан.',
    endpoint: '/api/newsletter/unsubscribe',
  },
};

export function NewsletterTokenAction({ mode }: { mode: 'confirm' | 'unsubscribe' }) {
  const token = useSearchParams().get('t') || '';
  const t = TEXT[mode];
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');

  const run = async () => {
    setState('busy');
    try {
      const res = await fetch(t.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      setState(res.ok && data.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7] text-black px-4">
      <Link href="/" className="font-mono font-black text-2xl mb-6">
        <span className="bg-black text-[#00FF66] px-1 mr-1.5">AI</span>MONGOLIA
      </Link>
      <div className="w-full max-w-md bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,255,102,1)] p-6 sm:p-8 space-y-5">
        <h1 className="font-black text-xl">{t.title}</h1>

        {state === 'done' ? (
          <div className="flex items-start gap-3 bg-emerald-50 border-2 border-black p-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-sm">{t.done}</p>
          </div>
        ) : !token ? (
          <p className="text-sm text-red-700 font-bold">Холбоос дутуу байна. Имэйл дэх холбоосыг бүтнээр нь нээнэ үү.</p>
        ) : (
          <>
            {state === 'error' && (
              <p role="alert" className="text-sm text-red-700 font-bold">
                Холбоос хүчингүй эсвэл хугацаа нь дууссан байна.
              </p>
            )}
            <button
              onClick={run}
              disabled={state === 'busy'}
              className="w-full py-3 bg-black text-[#00FF66] hover:bg-[#00FF66] hover:text-black disabled:opacity-60 border-2 border-black font-mono text-sm font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              {state === 'busy' ? 'Түр хүлээнэ үү…' : t.button}
            </button>
          </>
        )}

        <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs font-bold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}
