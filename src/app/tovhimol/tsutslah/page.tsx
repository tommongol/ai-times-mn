import { Suspense } from 'react';
import type { Metadata } from 'next';
import { NewsletterTokenAction } from '@/components/NewsletterTokenAction';

export const metadata: Metadata = {
  title: 'Захиалга цуцлах — AI Mongolia',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense>
      <NewsletterTokenAction mode="unsubscribe" />
    </Suspense>
  );
}
