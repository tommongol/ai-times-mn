import React from 'react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';

/** «Бидний тухай», «Нууцлалын бодлого» зэрэг энгийн бичвэрийн хуудасны хүрээ. */
export function InfoPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans selection:bg-[#00FF66] selection:text-black">
      <NewspaperHeader />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="font-black text-2xl sm:text-3xl text-black tracking-tight mb-6">{title}</h1>
          <div className="info-body space-y-4 text-base leading-relaxed text-neutral-800">{children}</div>
        </article>
      </main>
      <NewspaperFooter />
    </div>
  );
}

export function InfoHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-black text-lg sm:text-xl text-black pt-4">{children}</h2>;
}

export const infoLinkClass = 'text-emerald-700 underline underline-offset-2 hover:text-black font-semibold';
