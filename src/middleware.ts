import { NextRequest, NextResponse } from 'next/server';

// Редакцын хэсэг болон өгөгдөл өөрчлөх API-г сервер талд HTTP Basic Auth-аар хамгаална.
// Нууц үгийг зөвхөн Vercel-ийн ADMIN_PASSWORD env-д хадгална (NEXT_PUBLIC_ биш, кодонд биш).

function needsAuth(req: NextRequest): boolean {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) return true;
  if (pathname.startsWith('/api/')) {
    // Захиалга бүртгүүлэх нь нийтэд нээлттэй, бусад бичих үйлдэл болон захиалагчдын жагсаалт хаалттай
    if (pathname === '/api/subscribers' && req.method === 'POST') return false;
    if (pathname === '/api/subscribers') return true;
    return req.method !== 'GET' && req.method !== 'HEAD';
  }
  return false;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  if (!needsAuth(req)) return NextResponse.next();

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse('Admin is not configured (ADMIN_PASSWORD missing).', { status: 503 });
  }

  const header = req.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const password = decoded.slice(decoded.indexOf(':') + 1);
      if (safeEqual(password, expected)) return NextResponse.next();
    } catch {
      // буруу base64 — доор 401 буцаана
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Editorial", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
