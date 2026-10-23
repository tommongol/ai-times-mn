import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import initialSubscribers from '@/data/subscribers.json';

// Зөвхөн POST: бүртгэл хүлээн авна, бусдын бүртгэлийг хэзээ ч буцаахгүй (GET байхгүй).
// Анхаар: Vercel-ийн файлын систем зөвхөн уншдаг тул энд бичсэн бүртгэл хадгалагдахгүй —
// жинхэнэ товхимолд өгөгдлийн сан (MongoDB / Resend Audiences г.м.) хэрэгтэй.

const filePath = path.join(process.cwd(), 'src/data/subscribers.json');
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const PHONE_RE = /^\+?[0-9\s-]{6,20}$/;
const FREQUENCIES = new Set(['daily', 'weekly']);

function readSubscribers() {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore read error on serverless
  }
  return initialSubscribers;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 80) : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const frequency = FREQUENCIES.has(body?.frequency) ? body.frequency : 'daily';

    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Имэйл болон утасны дугаар заавал шаардлагатай.' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email) || !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: 'Имэйл эсвэл утасны дугаар буруу байна.' }, { status: 400 });
    }

    const list = readSubscribers();
    const newSub = {
      id: `sub-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      phone,
      frequency,
      autoDispatch: true,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    const filtered = list.filter((s: { email: string }) => s.email !== newSub.email);
    const updated = [newSub, ...filtered];

    try {
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
    } catch {
      // On read-only serverless environment, client also syncs to localStorage
    }

    return NextResponse.json({ ok: true, subscriber: newSub });
  } catch {
    return NextResponse.json({ error: 'Бүртгэл хадгалахад алдаа гарлаа.' }, { status: 500 });
  }
}
