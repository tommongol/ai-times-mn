import { ARTICLES } from '@/data/news';
import { SITE_URL, SITE_NAME, isoDateUB } from '@/lib/seo';
import { xmlEscape } from '@/lib/xml';

// Google News sitemap: зөвхөн сүүлийн 2 хоногийн нийтлэл (Google-ийн шаардлага), дээд тал нь 1000.
// Цаг тутам дахин үүснэ — шинэ байршуулалтгүй өдөр хуучин мэдээ жагсаалтад үлдэхгүй.
export const revalidate = 3600;

const WINDOW_MS = 2 * 24 * 3600 * 1000;

export function GET() {
  const now = Date.now();
  const fresh = ARTICLES.filter((a) => {
    const iso = isoDateUB(a.publishedAt, a.publishedTime);
    const t = iso ? Date.parse(iso) : NaN;
    return Number.isFinite(t) && t <= now && now - t <= WINDOW_MS;
  }).slice(0, 1000);

  const urls = fresh
    .map(
      (a) => `  <url>
    <loc>${xmlEscape(`${SITE_URL}/article/${encodeURIComponent(a.id)}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(SITE_NAME)}</news:name>
        <news:language>mn</news:language>
      </news:publication>
      <news:publication_date>${isoDateUB(a.publishedAt, a.publishedTime)}</news:publication_date>
      <news:title>${xmlEscape(a.title)}</news:title>
    </news:news>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=3600',
    },
  });
}
