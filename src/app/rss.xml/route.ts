import { ARTICLES } from '@/data/news';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, LOGO_URL, absoluteUrl, isoDateUB } from '@/lib/seo';
import { xmlEscape } from '@/lib/xml';

// RSS 2.0: хамгийн сүүлийн 50 нийтлэл. Статик: байршуулалт бүрд шинэчлэгдэнэ.
export const dynamic = 'force-static';

const FEED_SIZE = 50;

function rfc822(iso?: string): string {
  const d = iso ? new Date(iso) : new Date(0);
  return d.toUTCString();
}

export function GET() {
  const items = ARTICLES.slice(0, FEED_SIZE);
  const updated = isoDateUB(items[0]?.publishedAt, items[0]?.publishedTime);

  const body = items
    .map((a) => {
      const url = `${SITE_URL}/article/${encodeURIComponent(a.id)}`;
      const isRaster = a.coverImage && /\.(jpe?g|png|webp)$/i.test(a.coverImage);
      const mime = /\.png$/i.test(a.coverImage) ? 'image/png' : /\.webp$/i.test(a.coverImage) ? 'image/webp' : 'image/jpeg';
      return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${rfc822(isoDateUB(a.publishedAt, a.publishedTime))}</pubDate>
      <category>${xmlEscape(a.categoryName)}</category>
      <description>${xmlEscape(a.summary || a.subtitle || '')}</description>${
        isRaster ? `\n      <media:content url="${xmlEscape(absoluteUrl(a.coverImage))}" medium="image" type="${mime}" />` : ''
      }
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} — хиймэл оюуны мэдээ`)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>mn</language>
    <lastBuildDate>${rfc822(updated)}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${LOGO_URL}</url>
      <title>${xmlEscape(`${SITE_NAME} — хиймэл оюуны мэдээ`)}</title>
      <link>${SITE_URL}</link>
    </image>
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
