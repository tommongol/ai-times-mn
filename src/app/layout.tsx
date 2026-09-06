import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AImedee.mn — Хиймэл Оюуны Нэгдсэн Портал',
  description: 'Дэлхийн хиймэл оюуны хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, багаж хэрэгслүүдийг нэг дороос.',
  keywords: ['AI', 'AImedee', 'Хиймэл оюун', 'GPT-6', 'aitimes', 'Монгол технологийн мэдээ'],
  openGraph: {
    title: 'AImedee.mn — Хиймэл Оюуны Нэгдсэн Портал',
    description: 'Дэлхийн хиймэл оюуны хамгийн сүүлийн үеийн мэдээ, нийтлэл, ярилцлага, багаж хэрэгслүүдийг нэг дороос.',
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
    <html lang="mn" className="dark">
      <body className="min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
