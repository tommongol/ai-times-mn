import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchClient } from '@/components/SearchClient';
import { SITE_NAME } from '@/lib/seo';

// Сайтын доторх хайлт: /hailt?q=Nvidia. Үр дүнгийн хуудсыг хайлтын системд оруулахгүй (noindex),
// харин холбоосуудыг нь дагаж болно.
export const metadata: Metadata = {
  title: `Хайлт — ${SITE_NAME}`,
  description: 'AI Mongolia сайтын мэдээ, нийтлэлээс түлхүүр үгээр хайх.',
  alternates: { canonical: '/hailt' },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
