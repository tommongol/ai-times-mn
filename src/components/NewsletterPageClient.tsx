'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { NewspaperHeader } from '@/components/NewspaperHeader';
import { NewspaperFooter } from '@/components/NewspaperFooter';

type Frequency = 'every3days' | 'weekly';

const FREQUENCY_OPTIONS: { id: Frequency; title: string; note: string }[] = [
  { id: 'every3days', title: '3 хоногт нэг удаа', note: 'Сүүлийн өдрүүдийн гол мэдээний тойм' },
  { id: 'weekly', title: '7 хоногт нэг удаа', note: 'Долоо хоногийн зурагт тойм' },
];

const inputClass =
  'w-full px-3 py-2.5 text-sm bg-neutral-50 border-2 border-black focus:bg-white focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,255,102,1)] text-black';
const labelClass = 'block font-mono text-xs font-bold text-black uppercase mb-1';

export function NewsletterPageClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [social, setSocial] = useState('');
  const [website, setWebsite] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, workplace, social, frequency, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setDone(true);
      else setError(data.error || 'Бүртгэл хадгалахад алдаа гарлаа. Дахин оролдоно уу.');
    } catch {
      setError('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-black font-sans">
      <NewspaperHeader
        activeSection=""
        onSelectSection={(sec) => router.push(`/?section=${sec}`)}
        searchQuery=""
        onSearchChange={(q) => {
          if (q) router.push(`/?q=${encodeURIComponent(q)}`);
        }}
      />

      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-10">
        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,255,102,1)]">
          {done ? (
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-3 bg-emerald-50 border-2 border-black p-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <h1 className="font-black text-base sm:text-lg text-black">Имэйлээ шалгана уу</h1>
                  <p className="text-sm text-neutral-700 mt-1">
                    {email} хаяг руу баталгаажуулах холбоос илгээлээ. Түүнийг дарснаар{' '}
                    {frequency === 'weekly' ? '7 хоногт' : '3 хоногт'} нэг удаа товхимол ирж эхэлнэ.
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-black text-[#00FF66] hover:bg-neutral-800 font-mono font-bold text-xs uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Нүүр хуудас руу буцах</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
              <div>
                <h1 className="font-black text-2xl text-black tracking-tight mb-1 flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  Товхимол захиалах
                </h1>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Хиймэл оюуны гол мэдээ, тоймыг имэйлээр хүлээн авна. Зөвхөн имэйл хаяг заавал хэрэгтэй.
                </p>
              </div>

              {error && (
                <div role="alert" className="p-3 bg-red-50 border border-red-600 text-red-700 text-sm font-bold">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="nl-email" className={labelClass}>
                  Имэйл хаяг *
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="nl-name" className={labelClass}>
                  Нэр <span className="text-neutral-500 normal-case font-normal">(заавал биш)</span>
                </label>
                <input
                  id="nl-name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="nl-workplace" className={labelClass}>
                  Ажлын газар <span className="text-neutral-500 normal-case font-normal">(заавал биш)</span>
                </label>
                <input
                  id="nl-workplace"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  value={workplace}
                  onChange={(e) => setWorkplace(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="nl-social" className={labelClass}>
                  Сошиал хаяг <span className="text-neutral-500 normal-case font-normal">(заавал биш)</span>
                </label>
                <input
                  id="nl-social"
                  type="text"
                  maxLength={200}
                  value={social}
                  onChange={(e) => setSocial(e.target.value)}
                  placeholder="facebook.com/… эсвэл @нэр"
                  className={inputClass}
                />
              </div>

              {/* Ботын хавх: хүнд харагдахгүй */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="nl-website">Website</label>
                <input
                  id="nl-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <fieldset>
                <legend className={labelClass}>Хүлээн авах давтамж *</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 border-2 border-black cursor-pointer transition-colors ${
                        frequency === opt.id ? 'bg-black text-[#00FF66]' : 'bg-neutral-50 text-black hover:bg-neutral-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={opt.id}
                        checked={frequency === opt.id}
                        onChange={() => setFrequency(opt.id)}
                        className="sr-only"
                      />
                      <span className="block font-bold text-sm">{opt.title}</span>
                      <span className={`block text-xs mt-0.5 ${frequency === opt.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {opt.note}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-[#00FF66] hover:bg-[#00FF66] hover:text-black disabled:opacity-60 border-2 border-black font-mono text-sm font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Бүртгэж байна…' : 'Захиалах'}</span>
              </button>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Таны мэдээллийг зөвхөн товхимол илгээхэд ашиглана, гуравдагч этгээдэд дамжуулахгүй.
              </p>
            </form>
          )}
        </div>
      </main>

      <NewspaperFooter />
    </div>
  );
}
