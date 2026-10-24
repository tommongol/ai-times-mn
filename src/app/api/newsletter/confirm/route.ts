import { NextResponse } from 'next/server';
import { rpc } from '@/lib/newsletter';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const token = typeof body?.token === 'string' ? body.token : '';
  if (!UUID_RE.test(token)) return NextResponse.json({ ok: false }, { status: 400 });

  const res = await rpc<boolean>('aitimes_confirm', { p_token: token });
  if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: res.data === true });
}
