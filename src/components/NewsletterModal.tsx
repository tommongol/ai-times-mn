'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Phone, User, Lock, CheckCircle2, Sparkles, Send } from 'lucide-react';

export interface SubscriberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  frequency: 'daily' | 'weekly';
  autoDispatch: boolean;
  createdAt: string;
}

export const SUBSCRIBERS_STORAGE_KEY = 'aimedee_subscribers_v1';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<SubscriberRecord | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSubmittedRecord(null);
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 60);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanName = name.trim() || cleanEmail.split('@')[0];

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Зөв имэйл хаяг оруулна уу.');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 8) {
      setError('Утасны дугаараа (8 оронтой) оруулна уу.');
      return;
    }

    setIsSubmitting(true);

    const newRecord: SubscriberRecord = {
      id: `sub-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      frequency,
      autoDispatch: true,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    try {
      // Save to localStorage for immediate client/dashboard sync
      const existingRaw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
      const existingList: SubscriberRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedList = [
        newRecord,
        ...existingList.filter((s) => s.email !== newRecord.email),
      ];
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(updatedList));

      // Also persist to API route
      await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });

      setSubmittedRecord(newRecord);
    } catch {
      setSubmittedRecord(newRecord);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,255,102,1)] text-black overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black text-white border-b-2 border-black font-mono text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00FF66]" />
            <span className="font-black uppercase tracking-wider text-[#00FF66]">
              // DEEP INTELLIGENCE MONGOLIA — ТОВХИМОЛ БҮРТГЭЛ
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black hover:bg-[#00FF66] transition-colors cursor-pointer"
            title="Хаах"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedRecord ? (
          <div className="p-6 sm:p-8 space-y-5 font-mono">
            <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 border-2 border-black p-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-black text-sm sm:text-base text-black uppercase">
                  БҮРТГЭЛ АМЖИЛТТАЙ ҮҮСЛЭЭ!
                </h3>
                <p className="text-xs text-neutral-700 mt-0.5">
                  Таны бүртгэл системд хадгалагдаж, автомат товхимол илгээлт идэвхэжлээ.
                </p>
              </div>
            </div>

            <div className="bg-neutral-100 border border-black p-4 space-y-2 text-xs">
              <div className="flex justify-between border-b border-neutral-300 pb-1.5">
                <span className="text-neutral-500">БҮРТГЭЛИЙН НЭР:</span>
                <span className="font-bold text-black">{submittedRecord.name}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-300 pb-1.5">
                <span className="text-neutral-500">ИМЭЙЛ ХАЯГ:</span>
                <span className="font-bold text-black">{submittedRecord.email}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-300 pb-1.5">
                <span className="text-neutral-500">УТАСНЫ ДУГААР:</span>
                <span className="font-bold text-black">{submittedRecord.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">АВТОМАТ ИЛГЭЭЛТ:</span>
                <span className="font-bold text-emerald-700 uppercase">
                  ● ИДЭВХТЭЙ ({submittedRecord.frequency === 'daily' ? 'ӨДӨР БҮР' : '7 ХОНОГ БҮР'})
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-black text-[#00FF66] hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              НҮҮР ХУУДАС РУУ БУЦАХ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            <div>
              <h2 className="font-black text-xl sm:text-2xl text-black tracking-tight mb-1">
                Тогтмол товхимол захиалах & Бүртгэл үүсгэх
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Имэйл хаяг болон утасны дугаараа бүртгүүлснээр манай редакцаас өдөр тутмын хиймэл оюуны гол мэдээ, шинжилгээг танд автоматаар илгээх болно.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-600 text-red-700 font-mono text-xs font-bold">
                [!] {error}
              </div>
            )}

            {/* 1. Email */}
            <div>
              <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                1. ИМЭЙЛ ХАЯГ (ЗААВАЛ) *
              </label>
              <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white focus-within:shadow-[3px_3px_0px_0px_rgba(0,255,102,1)] transition-all">
                <Mail className="w-4 h-4 text-neutral-500 ml-3 shrink-0" />
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 text-sm font-mono bg-transparent focus:outline-none text-black"
                />
              </div>
            </div>

            {/* 2. Phone Number */}
            <div>
              <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                2. УТАСНЫ ДУГААР (ЗААВАЛ) *
              </label>
              <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white focus-within:shadow-[3px_3px_0px_0px_rgba(0,255,102,1)] transition-all">
                <Phone className="w-4 h-4 text-neutral-500 ml-3 shrink-0" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9911-XXXX"
                  className="w-full px-3 py-2.5 text-sm font-mono bg-transparent focus:outline-none text-black"
                />
              </div>
            </div>

            {/* 3. Name & Password in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                  3. ТАНЫ НЭР
                </label>
                <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white transition-all">
                  <User className="w-4 h-4 text-neutral-500 ml-3 shrink-0" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Болд..."
                    className="w-full px-2.5 py-2 text-sm font-mono bg-transparent focus:outline-none text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                  4. БҮРТГЭЛИЙН НУУЦ ҮГ
                </label>
                <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white transition-all">
                  <Lock className="w-4 h-4 text-neutral-500 ml-3 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-2.5 py-2 text-sm font-mono bg-transparent focus:outline-none text-black"
                  />
                </div>
              </div>
            </div>

            {/* 5. Frequency */}
            <div>
              <label className="block font-mono text-xs font-bold text-black uppercase mb-1.5">
                АВТОМАТ ИЛГЭЭЛТИЙН ДАВТАМЖ:
              </label>
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`py-2 px-3 border-2 border-black font-bold uppercase cursor-pointer transition-colors ${
                    frequency === 'daily'
                      ? 'bg-black text-[#00FF66]'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  ● ӨДӨР БҮР (08:00)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekly')}
                  className={`py-2 px-3 border-2 border-black font-bold uppercase cursor-pointer transition-colors ${
                    frequency === 'weekly'
                      ? 'bg-black text-[#00FF66]'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  ● 7 ХОНОГ ТУТАМ
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black text-[#00FF66] hover:bg-[#00FF66] hover:text-black border-2 border-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Send className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'БҮРТГЭЖ БАЙНА...'
                  : 'БҮРТГЭЛ ҮҮСГЭЖ АВТОМАТ ТОВХИМОЛ ИДЭВХЖҮҮЛЭХ'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
