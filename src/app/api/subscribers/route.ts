import { NextResponse } from 'next/server';
import { rpc, dbSecret, sendBatch, confirmEmail } from '@/lib/newsletter';

// Зөвхөн POST: бүртгэлийг Supabase-ийн aitimes_subscribe функцээр нэмж, баталгаажуулах имэйл явуулна.
// Хүснэгтэд гаднаас шууд эрх байхгүй. Хариу нь үргэлж ижил — хэн бүртгэлтэй болохыг задлахгүй.

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const FREQUENCIES = new Set(['every3days', 'weekly']);

function optional(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  return v ? v.slice(0, max) : null;
}

export async function POST(req: Request) {
  const secret = dbSecret();
  if (!secret) {
    return NextResponse.json({ error: 'Бүртгэл түр ажиллахгүй байна.' }, { status: 503 });
  }

  if (Number(req.headers.get('content-length') || 0) > 4096) {
    return NextResponse.json({ error: 'Хүсэлт хэт том байна.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Буруу хүсэлт.' }, { status: 400 });
  }

  // Ботын хавх: хүнд харагддаггүй талбар бөглөгдсөн бол амжилттай мэт буцааж, юу ч хадгалахгүй
  if (optional(body.website, 200)) return NextResponse.json({ ok: true });

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Зөв имэйл хаяг оруулна уу.' }, { status: 400 });
  }
  const frequency = typeof body.frequency === 'string' && FREQUENCIES.has(body.frequency) ? body.frequency : null;
  if (!frequency) {
    return NextResponse.json({ error: 'Хүлээн авах давтамжаа сонгоно уу.' }, { status: 400 });
  }

  const res = await rpc<string | null>('aitimes_subscribe', {
    p_secret: secret,
    p_email: email,
    p_name: optional(body.name, 80),
    p_workplace: optional(body.workplace, 120),
    p_social: optional(body.social, 200),
    p_frequency: frequency,
  });
  if (!res.ok) {
    return NextResponse.json({ error: 'Бүртгэл хадгалахад алдаа гарлаа. Дахин оролдоно уу.' }, { status: 502 });
  }

  // Токен ирсэн = шинэ эсвэл баталгаажаагүй бүртгэл → баталгаажуулах имэйл
  if (res.data) await sendBatch([confirmEmail(email, res.data)]);

  return NextResponse.json({ ok: true });
}
