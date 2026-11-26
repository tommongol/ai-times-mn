import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, RSS_PATH } from '@/lib/seo';

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

// Google Search Console-ийн баталгаажуулах код: Vercel-ийн GOOGLE_SITE_VERIFICATION хувьсагчид тавина.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'technology',
  publisher: SITE_NAME,
  creator: SITE_NAME,
  keywords: [
    'AI мэдээ',
    'хиймэл оюун',
    'хиймэл оюун ухаан',
    'хиймэл оюуны мэдээ',
    'AI монгол хэлээр',
    'AI Mongolia',
    'AI загвар',
    'AI агент',
    'робот',
    'AI бодлого',
    'AI бизнес',
    'технологийн мэдээ',
    'ярилцлага',
    'зурагт тойм',
  ],
  // Хайлтын үр дүнд том зураг, бүтэн тайлбар харуулахыг зөвшөөрнө (Google Discover-т хэрэгтэй).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: RSS_PATH, title: `${SITE_NAME} — хиймэл оюуны мэдээ` }] },
  },
  verification: googleVerification ? { google: googleVerification } : undefined,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'mn_MN',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={`${inter.variable} ${playfair.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-neutral-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
