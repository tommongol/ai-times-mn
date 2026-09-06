import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AImedee.mn — Хиймэл Оюун Ухааны Мэргэшсэн Сонин',
  description: 'Хиймэл оюуны салбарын хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, технологийн шинжилгээг нэг дороос.',
  keywords: ['AImedee', 'AI сонин', 'Хиймэл оюун', 'aitimes', 'GPT-6', 'Технологийн мэдээ'],
  openGraph: {
    title: 'AImedee.mn — Хиймэл Оюун Ухааны Мэргэшсэн Сонин',
    description: 'Хиймэл оюуны салбарын хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, технологийн шинжилгээг нэг дороос.',
    type: 'website',
    locale: 'mn_MN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
