import { NextResponse } from 'next/server';
import { rpc, dbSecret, sendBatch, pickArticles, digestEmail, DueSubscriber } from '@/lib/newsletter';

// Vercel Cron өдөр бүр дуудна (vercel.json). Ээлж болсон захиалагч бүрд сүүлд хүлээн авснаас хойшхи
// мэдээг илгээнэ: 3 хоногт эсвэл 7 хоногт нэг удаа. Шинэ мэдээгүй бол тэр захиалагчийг алгасна.
// ?dry=1 — юу ч илгээхгүй, хэнд хэдэн мэдээ очихыг л буцаана. Бүх хүсэлтэд CRON_SECRET шаардлагатай.

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const secret = dbSecret();
  if (!secret) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const dry = new URL(req.url).searchParams.get('dry') === '1';
  const due = await rpc<DueSubscriber[]>('aitimes_due', { p_secret: secret });
  if (!due.ok || !due.data) return NextResponse.json({ error: 'db' }, { status: 502 });

  const now = new Date();
  const planned = due.data
    .map((sub) => ({ sub, articles: pickArticles(sub, now) }))
    .filter((p) => p.articles.length > 0);

  if (dry) {
    // ?dry=1&preview=weekly|every3days — ийм товхимол ямар харагдахыг HTML-ээр үзүүлнэ
    const preview = new URL(req.url).searchParams.get('preview');
    if (preview === 'weekly' || preview === 'every3days') {
      const sample: DueSubscriber = { id: 0, email: 'preview@example.com', name: null, frequency: preview, token: '00000000-0000-0000-0000-000000000000', last_sent_at: null };
      const html = digestEmail(sample, pickArticles(sample, now), now).html;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    return NextResponse.json({
      due: due.data.length,
      wouldSend: planned.length,
      plan: planned.map((p) => ({ frequency: p.sub.frequency, articles: p.articles.length })),
    });
  }

  let sent = 0;
  for (let i = 0; i < planned.length; i += 100) {
    const chunk = planned.slice(i, i + 100);
    const ok = await sendBatch(chunk.map((p) => digestEmail(p.sub, p.articles, now)));
    if (!ok) continue;
    await rpc<number>('aitimes_mark_sent', { p_secret: secret, p_ids: chunk.map((p) => p.sub.id) });
    sent += chunk.length;
  }

  return NextResponse.json({ due: due.data.length, sent, skippedNoNews: due.data.length - planned.length });
}
