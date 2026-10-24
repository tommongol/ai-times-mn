import { NextResponse } from 'next/server';
import { rpc } from '@/lib/newsletter';

// Цуцлах: сайтын хуудаснаас JSON {token}, эсвэл имэйл програмын нэг товшилтоор (RFC 8058) ?t=<token>.
// GET-ээр цуцлахгүй — имэйлийн холбоос шалгагч бот санамсаргүй цуцлахаас сэргийлнэ.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  let token = new URL(req.url).searchParams.get('t') || '';
  if (!token && req.headers.get('content-type')?.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    token = typeof body?.token === 'string' ? body.token : '';
  }
  if (!UUID_RE.test(token)) return NextResponse.json({ ok: false }, { status: 400 });

  const res = await rpc<boolean>('aitimes_unsubscribe', { p_token: token });
  if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  // Аль хэдийн цуцалсан байсан ч амжилттай гэж тооцно
  return NextResponse.json({ ok: true });
}
