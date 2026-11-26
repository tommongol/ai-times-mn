import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ нь хуудас биш; /hailt нь сайтын доторх хайлтын үр дүн тул мөлхөх төсөв үрэхгүй.
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/hailt'] },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/news-sitemap.xml`],
  };
}
