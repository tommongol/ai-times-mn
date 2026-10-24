import { ARTICLES, NewsArticle } from '@/data/news';

// Зөвхөн серверт (API route-оос) импортлоно — түлхүүр уншдаг.
// Товхимлын серверийн туслахууд: Supabase-ийн aitimes_* функц, Resend илгээлт, имэйлийн загвар.

export const SITE_URL = (process.env.SITE_URL || 'https://ai-times-mn.vercel.app').replace(/\/$/, '');
const FROM = process.env.NEWSLETTER_FROM || 'Deep Intelligence Mongolia <tovhimol@mongol.guru>';
const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || 'hello@mongol.guru';

export type Frequency = 'every3days' | 'weekly';

export interface DueSubscriber {
  id: number;
  email: string;
  name: string | null;
  frequency: Frequency;
  token: string;
  last_sent_at: string | null;
}

export interface OutgoingEmail {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to: string;
  headers?: Record<string, string>;
}

export async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<{ ok: boolean; status: number; data: T | null }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return { ok: false, status: 503, data: null };
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
    cache: 'no-store',
  });
  const data = res.ok ? ((await res.json().catch(() => null)) as T | null) : null;
  if (!res.ok) console.error(`rpc ${fn} failed`, res.status, await res.text().catch(() => ''));
  return { ok: res.ok, status: res.status, data };
}

export function dbSecret(): string | null {
  return process.env.AITIMES_DB_SECRET || null;
}

// Resend: нэг дуудлагад 100 хүртэл имэйл. Бүгд хүлээн авагдсан бол true.
export async function sendBatch(emails: OutgoingEmail[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emails.length) return false;
  const res = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(emails),
    cache: 'no-store',
  });
  if (!res.ok) console.error('resend batch failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ubDate(d: Date): string {
  // Улаанбаатарын цаг (UTC+8) дахь огноо, YYYY-MM-DD
  return new Date(d.getTime() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

function shell(title: string, body: string, footer: string): string {
  return `<!doctype html><html lang="mn"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:Arial,Helvetica,sans-serif;color:#111">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:2px solid #111">
<tr><td style="background:#111;padding:16px 24px"><span style="font-family:'Courier New',monospace;font-weight:bold;font-size:20px;color:#ffffff">AIMEDEE</span><span style="font-family:'Courier New',monospace;font-weight:bold;font-size:20px;color:#00ff66">.MN</span><div style="font-family:'Courier New',monospace;font-size:11px;color:#9ca3af;margin-top:2px">DEEP INTELLIGENCE MONGOLIA</div></td></tr>
<tr><td style="padding:24px">${body}</td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #e5e5e5;font-size:12px;color:#6b7280;line-height:1.5">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

export function confirmEmail(email: string, token: string): OutgoingEmail {
  const link = `${SITE_URL}/tovhimol/batalgaajuulah?t=${token}`;
  const body = `<h1 style="font-size:22px;margin:0 0 12px">Захиалгаа баталгаажуулна уу</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 20px">Та Deep Intelligence Mongolia-гийн товхимолд бүртгүүлсэн байна. Доорх товчийг дарж баталгаажуулснаар товхимол ирж эхэлнэ.</p>
<p style="margin:0 0 20px"><a href="${link}" style="display:inline-block;background:#111;color:#00ff66;text-decoration:none;font-weight:bold;padding:12px 22px;font-family:'Courier New',monospace">БАТАЛГААЖУУЛАХ</a></p>
<p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0">Хэрэв та бүртгүүлээгүй бол энэ имэйлийг үл тоомсорлоорой, танд дахин юу ч ирэхгүй.</p>`;
  return {
    from: FROM,
    to: [email],
    reply_to: REPLY_TO,
    subject: 'Товхимлын захиалгаа баталгаажуулна уу',
    html: shell('Захиалга баталгаажуулах', body, 'Deep Intelligence Mongolia'),
    text: `Товхимлын захиалгаа баталгаажуулах холбоос: ${link}\n\nХэрэв та бүртгүүлээгүй бол энэ имэйлийг үл тоомсорлоорой.`,
  };
}

// Захиалагчийн сүүлд хүлээн авснаас хойшхи (эсвэл 3/7 хоногийн) нийтлэлүүд
export function pickArticles(sub: Pick<DueSubscriber, 'frequency' | 'last_sent_at'>, now = new Date()): NewsArticle[] {
  const days = sub.frequency === 'weekly' ? 7 : 3;
  const since = sub.last_sent_at ? new Date(sub.last_sent_at) : new Date(now.getTime() - days * 86400 * 1000);
  const sinceDate = ubDate(since);
  const fresh = ARTICLES.filter((a) => a.publishedAt >= sinceDate).sort((a, b) =>
    `${b.publishedAt}T${b.publishedTime}`.localeCompare(`${a.publishedAt}T${a.publishedTime}`)
  );
  const reviews = sub.frequency === 'weekly' ? fresh.filter((a) => a.category === 'review') : [];
  const rest = fresh.filter((a) => !reviews.includes(a));
  return [...reviews, ...rest].slice(0, sub.frequency === 'weekly' ? 10 : 8);
}

export function digestEmail(sub: DueSubscriber, articles: NewsArticle[], now = new Date()): OutgoingEmail {
  const date = ubDate(now);
  const unsub = `${SITE_URL}/tovhimol/tsutslah?t=${sub.token}`;
  const oneClick = `${SITE_URL}/api/newsletter/unsubscribe?t=${sub.token}`;
  const heading = sub.frequency === 'weekly' ? '7 хоногийн AI тойм' : 'AI мэдээний тойм';
  const greeting = sub.name ? `Сайн байна уу, ${esc(sub.name)}.` : 'Сайн байна уу.';

  const items = articles
    .map((a) => {
      const link = `${SITE_URL}/article/${encodeURIComponent(a.id)}`;
      const img = a.coverImage?.startsWith('/') ? `${SITE_URL}${a.coverImage}` : a.coverImage;
      return `<tr><td style="padding:0 0 22px">
${img ? `<a href="${link}"><img src="${esc(img)}" alt="" width="552" style="width:100%;max-width:552px;height:auto;display:block;border:1px solid #e5e5e5;margin:0 0 10px"></a>` : ''}
<div style="font-family:'Courier New',monospace;font-size:11px;font-weight:bold;color:#047857;margin:0 0 4px">${esc(a.categoryName)} · ${esc(a.publishedAt)}</div>
<a href="${link}" style="font-size:18px;font-weight:bold;color:#111;text-decoration:none;line-height:1.35">${esc(a.title)}</a>
<p style="font-size:14px;line-height:1.6;color:#374151;margin:6px 0 0">${esc(a.summary)}</p>
</td></tr>`;
    })
    .join('');

  const body = `<h1 style="font-size:22px;margin:0 0 6px">${heading}</h1>
<p style="font-size:13px;color:#6b7280;margin:0 0 18px">${date}</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 22px">${greeting} Сүүлийн өдрүүдийн хиймэл оюуны гол мэдээг танд хүргэж байна.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
<p style="margin:8px 0 0"><a href="${SITE_URL}" style="font-family:'Courier New',monospace;font-weight:bold;color:#111">БҮХ МЭДЭЭГ УНШИХ →</a></p>`;

  const footer = `Та ${sub.frequency === 'weekly' ? '7 хоногт' : '3 хоногт'} нэг удаа товхимол авахаар бүртгүүлсэн.<br><a href="${unsub}" style="color:#6b7280">Захиалгаа цуцлах</a>`;

  const text = [
    `${heading} — ${date}`,
    '',
    ...articles.map((a) => `${a.title}\n${SITE_URL}/article/${encodeURIComponent(a.id)}\n`),
    `Захиалгаа цуцлах: ${unsub}`,
  ].join('\n');

  return {
    from: FROM,
    to: [sub.email],
    reply_to: REPLY_TO,
    subject: `${heading} — ${date}`,
    html: shell(heading, body, footer),
    text,
    headers: {
      'List-Unsubscribe': `<${oneClick}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  };
}
