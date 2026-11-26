import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';
import { SECTIONS, sectionPath } from '@/data/sections';

/** Олдоогүй хуудас: уншигчийг нүүр, булангууд руу чиглүүлнэ. */
export function NotFoundView({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans">
      <NewspaperHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border-2 border-black p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="font-mono text-2xl font-black mb-3 uppercase">{title}</h1>
          <p className="text-neutral-600 mb-6">{message}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-[#00FF66] font-mono text-xs font-bold px-5 py-3 uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>НҮҮР ХУУДАС РУУ БУЦАХ</span>
          </Link>
          <nav aria-label="Булангууд" className="mt-8 flex flex-wrap justify-center gap-2 font-mono text-xs">
            {SECTIONS.map((sec) => (
              <Link
                key={sec.id}
                href={sectionPath(sec.id)}
                prefetch={false}
                className="px-3 py-1.5 border border-black font-bold uppercase bg-neutral-50 text-black hover:bg-black hover:text-[#00FF66] transition-colors"
              >
                {sec.name}
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <NewspaperFooter />
    </div>
  );
}
