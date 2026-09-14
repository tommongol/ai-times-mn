import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import defaultArticles from '@/data/articles.json';

const ARTICLES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');

export async function GET() {
  try {
    if (fs.existsSync(ARTICLES_FILE_PATH)) {
      const fileData = await fs.promises.readFile(ARTICLES_FILE_PATH, 'utf8');
      const articles = JSON.parse(fileData);
      return NextResponse.json(articles);
    }
  } catch (error) {
    console.warn('Could not read articles from disk, using bundled fallback:', error);
  }
  return NextResponse.json(defaultArticles);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected array of articles' }, { status: 400 });
    }

    // Attempt to write to disk
    try {
      await fs.promises.writeFile(ARTICLES_FILE_PATH, JSON.stringify(body, null, 2), 'utf8');
      return NextResponse.json({ success: true, count: body.length, savedToDisk: true });
    } catch (fsError) {
      console.warn('Filesystem write not permitted (serverless read-only mode):', fsError);
      return NextResponse.json({
        success: true,
        count: body.length,
        savedToDisk: false,
        message: 'Serverless environment is read-only; browser client storage active',
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
