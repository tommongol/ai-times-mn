// Нэг серверийн жижиг хязгаарлагч: нэг IP-аас богино хугацаанд ирэх хүсэлтийг тоолно.
// Vercel дээр хэд хэдэн сервер зэрэг ажилладаг тул энэ нь эхний хамгаалалт л юм — нийт дээд
// хязгаарыг өгөгдлийн сангийн aitimes_subscribe функц барьдаг.

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

/** true бол зөвшөөрнө; false бол хязгаар хэтэрсэн. */
export function allowRequest(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Санах ой хязгааргүй өсөхөөс сэргийлнэ
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < windowMs)) hits.delete(k);
    }
  }
  return true;
}

const ALLOWED_ORIGIN_HOSTS = new Set(['ai.mongol.guru', 'ai-times-mn.vercel.app', 'localhost', '127.0.0.1']);

/** Хөтчөөс ирсэн хүсэлт өөр сайтаас илгээгдсэн эсэх. Origin толгойгүй (хөтөч биш) хүсэлтийг энд шүүхгүй. */
export function isForeignOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return !(ALLOWED_ORIGIN_HOSTS.has(host) || host.endsWith('-tommongols-projects.vercel.app'));
  } catch {
    return true;
  }
}
