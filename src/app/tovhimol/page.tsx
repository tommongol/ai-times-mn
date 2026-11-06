import type { Metadata } from 'next';
import { NewsletterPageClient } from '@/components/NewsletterPageClient';

export const metadata: Metadata = {
  title: 'Товхимол захиалах — AI Mongolia',
  description: 'Хиймэл оюуны гол мэдээ, долоо хоногийн зурагт тоймыг имэйлээр хүлээн аваарай.',
  alternates: { canonical: '/tovhimol' },
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
