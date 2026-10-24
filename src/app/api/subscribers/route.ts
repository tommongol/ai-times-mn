import { NextResponse } from 'next/server';

// Зөвхөн POST: товхимлын бүртгэлийг Supabase-ийн aitimes_subscribers хүснэгтэд нэмнэ.
// Хүснэгт гаднаас зөвхөн INSERT зөвшөөрдөг (RLS) — жагсаалтыг Supabase самбараас л харна.

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const FREQUENCIES = new Set(['every3days', 'weekly']);

function optional(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  return v ? v.slice(0, max) : null;
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
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

  const res = await fetch(`${url}/rest/v1/aitimes_subscribers`, {
    method: 'POST',
    headers: {
      apikey: key,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      email,
      name: optional(body.name, 80),
      workplace: optional(body.workplace, 120),
      social: optional(body.social, 200),
      frequency,
    }),
    cache: 'no-store',
  });

  // 409 = энэ имэйл аль хэдийн бүртгэлтэй. Бусдын бүртгэл байгаа эсэхийг задлахгүйн тулд мөн амжилттай гэж буцаана.
  if (res.ok || res.status === 409) return NextResponse.json({ ok: true });

  console.error('subscribe failed', res.status, await res.text().catch(() => ''));
  return NextResponse.json({ error: 'Бүртгэл хадгалахад алдаа гарлаа. Дахин оролдоно уу.' }, { status: 502 });
}
