import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AImedee.mn — Хиймэл Оюун Ухааны Мэргэшсэн Сонин',
  description: 'Хиймэл оюуны салбарын хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, технологийн шинжилгээг нэг дороос.',
  keywords: ['AImedee', 'AI сонин', 'Хиймэл оюун', 'Шинэ AI загварууд', 'Технологийн мэдээ'],
  openGraph: {
    title: 'AImedee.mn — Хиймэл Оюун Ухааны Мэргэшсэн Сонин',
    description: 'Хиймэл оюуны салбарын хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, технологийн шинжилгээг нэг дороос.',
    type: 'website',
    locale: 'mn_MN',
  },
};

import { NewsProvider } from '@/context/NewsContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={`${inter.variable} ${playfair.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-neutral-900 font-sans antialiased">
        <NewsProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}
