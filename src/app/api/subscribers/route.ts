import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import initialSubscribers from '@/data/subscribers.json';

const filePath = path.join(process.cwd(), 'src/data/subscribers.json');

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

export async function GET() {
  const list = readSubscribers();
  return NextResponse.json({ subscribers: list });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, frequency = 'daily' } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Имэйл болон утасны дугаар заавал шаардлагатай.' },
        { status: 400 }
      );
    }

    const list = readSubscribers();
    const newSub = {
      id: `sub-${Date.now()}`,
      name: (name || email.split('@')[0]).trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
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

    return NextResponse.json({ ok: true, subscriber: newSub, subscribers: updated });
  } catch {
    return NextResponse.json({ error: 'Бүртгэл хадгалахад алдаа гарлаа.' }, { status: 500 });
  }
}
