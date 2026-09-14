import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import defaultLiveWire from '@/data/live_wire.json';

const LIVE_WIRE_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'live_wire.json');

export async function GET() {
  try {
    if (fs.existsSync(LIVE_WIRE_FILE_PATH)) {
      const fileData = await fs.promises.readFile(LIVE_WIRE_FILE_PATH, 'utf8');
      const items = JSON.parse(fileData);
      return NextResponse.json(items);
    }
  } catch (error) {
    console.warn('Could not read live wire from disk, using fallback:', error);
  }
  return NextResponse.json(defaultLiveWire);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected array of live wire items' }, { status: 400 });
    }

    try {
      await fs.promises.writeFile(LIVE_WIRE_FILE_PATH, JSON.stringify(body, null, 2), 'utf8');
      return NextResponse.json({ success: true, count: body.length, savedToDisk: true });
    } catch (fsError) {
      console.warn('Filesystem write not permitted for live wire:', fsError);
      return NextResponse.json({
        success: true,
        count: body.length,
        savedToDisk: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
