import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — хиймэл оюуны мэдээ`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: 'mn',
    start_url: '/',
    display: 'browser',
    background_color: '#FAFAF7',
    theme_color: '#000000',
    icons: [
      { src: '/icon.png', sizes: '48x48', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
