import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';
import { NewsletterPageClient } from '@/components/NewsletterPageClient';

export const metadata: Metadata = {
  title: 'Товхимол захиалах — AI Mongolia',
  description: 'Хиймэл оюуны гол мэдээ, долоо хоногийн зурагт тоймыг имэйлээр хүлээн аваарай.',
  alternates: { canonical: '/tovhimol' },
  openGraph: {
    type: 'website',
    url: '/tovhimol',
    title: 'Товхимол захиалах — AI Mongolia',
    description: 'Хиймэл оюуны гол мэдээ, долоо хоногийн зурагт тоймыг имэйлээр хүлээн аваарай.',
    siteName: SITE_NAME,
    locale: 'mn_MN',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
