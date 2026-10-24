import { Suspense } from 'react';
import type { Metadata } from 'next';
import { NewsletterTokenAction } from '@/components/NewsletterTokenAction';

export const metadata: Metadata = {
  title: 'Захиалга баталгаажуулах — AI Mongolia',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense>
      <NewsletterTokenAction mode="confirm" />
    </Suspense>
  );
}
