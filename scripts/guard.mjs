// Build-ийн өмнө ажиллана (npm run build → prebuild). Хуучин хуулбараас байршуулж,
// хассан admin/нууц үгийг буцааж оруулахаас сэргийлнэ. Алдаа олдвол build зогсоно.
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const errors = [];

const FORBIDDEN_PATHS = [
  'src/app/admin',
  'src/app/dashboard',
  'src/components/admin',
  'src/app/api/articles',
  'src/app/api/live-wire',
  'src/components/NewsletterModal.tsx',
  'src/data/subscribers.json',
  'src/components/LiveWire.tsx',
  'src/data/live_wire.json',
];
for (const p of FORBIDDEN_PATHS) {
  if (existsSync(p)) errors.push(`${p} хасагдсан хэсэг буцаж орсон байна`);
}

const FORBIDDEN_TEXT = [
  'aimedee2026',
  'admin2026',
  'NEXT_PUBLIC_ADMIN_PASSWORD',
  'Deep Intelligence Mongolia',
  'deepintelligence.mn',
  'AIMEDEE',
  '24H REALTIME DISPATCH',
  'ШУУРХАЙ МЭДЭЭНИЙ УРСГАЛ',
];
function scan(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) scan(full);
    else if (/\.(ts|tsx|js|mjs|json)$/.test(name)) {
      const text = readFileSync(full, 'utf8');
      for (const t of FORBIDDEN_TEXT) if (text.includes(t)) errors.push(`${full}: «${t}» кодонд байна`);
    }
  }
}
scan('src');

const VALID_CATEGORIES = new Set(['review', 'mongolia', 'tech', 'robotics', 'law', 'industry', 'interview', 'opinion', 'models', 'policy', 'companies']);

const { createHash } = await import('node:crypto');
const { spawnSync } = await import('node:child_process');

const HAS_FFMPEG = !process.env.VERCEL &&
  spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0 &&
  spawnSync('ffprobe', ['-version'], { stdio: 'ignore' }).status === 0;

function checkWhiteBorderAndDims(absPath, isMainLead) {
  const res = { err: null };
  if (isMainLead) {
    const pr = spawnSync('ffprobe', [
      '-v', 'error', '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height', '-of', 'csv=p=0', absPath
    ], { encoding: 'utf8' });
    const wh = (pr.stdout || '').trim().split(',');
    if (wh.length === 2) {
      const w = Number(wh[0]), h = Number(wh[1]);
      if (w < 800 || h > w) {
        res.err = `Main Lead зураг нь хэвтээ (landscape) өндөр чанартай (>=800px өргөн) байх ёстой (${w}x${h})`;
        return res;
      }
    }
  }
  const ff = spawnSync('ffmpeg', [
    '-v', 'error', '-i', absPath, '-vf', 'scale=32:18',
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'
  ], { maxBuffer: 65536 });
  const raw = ff.stdout;
  if (raw && raw.length === 32 * 18 * 3) {
    let white = 0, total = 0;
    for (let y = 0; y < 18; y++) {
      for (let x = 0; x < 32; x++) {
        if (y <= 1 || y >= 16 || x <= 1 || x >= 30) {
          const idx = (y * 32 + x) * 3;
          if (raw[idx] > 235 && raw[idx + 1] > 235 && raw[idx + 2] > 235) white++;
          total++;
        }
      }
    }
    const ratio = white / total;
    const limit = isMainLead ? 0.40 : 0.52;
    if (ratio > limit) {
      res.err = `Цагаан фонтой бүтээгдэхүүн/эд анги/диаграмм зураг хориотой (хүрээний цагаан=${Math.round(ratio * 100)}% > ${Math.round(limit * 100)}%)`;
    }
  }
  return res;
}

// Гарчгийн уртын хашлага, давхардсан ID, зураг, хэлний болон сэдвийн хатуу шалгалт
try {
  const articles = JSON.parse(readFileSync('src/data/articles.json', 'utf8'));
  const seenIds = new Set();
  const seenCovers = new Map();
  const seenHashes = new Map();
  const bannedStemRe = new RegExp('\\b\\u0430\\u0448\\u0438\\u0433\\u043b\\u0430\\w*', 'i');
  const mongoliaOfftopicRe = /(?:^|\s)(?:аи-?9[25]|шатахуун|түлш|бензин|дизель)/i;

  for (const a of articles) {
    if (!a.id) {
      errors.push('articles.json: id талбар дутуу нийтлэл байна');
    } else if (seenIds.has(a.id)) {
      errors.push(`articles.json [${a.id}]: Давхардсан ID байна`);
    } else {
      seenIds.add(a.id);
    }

    const words = (a.title || '').trim().split(/\s+/).filter(Boolean).length;
    const chars = (a.title || '').length;
    if (words > 10 || chars > 75) {
      errors.push(`articles.json [${a.id}]: Гарчиг хэт урт (${words} үг, ${chars} тэмдэгт; дээд хязгаар 10 үг / 75 тэмдэгт): «${a.title}»`);
    }
    if (!a.category || !VALID_CATEGORIES.has(a.category)) {
      errors.push(`articles.json [${a.id}]: Буруу category: «${a.category}»`);
    }
    if (!a.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(a.publishedAt)) {
      errors.push(`articles.json [${a.id}]: publishedAt заавал YYYY-MM-DD форматаар байх ёстой («${a.publishedAt}»)`);
    }
    if (!a.publishedTime || !/^\d{2}:\d{2}$/.test(a.publishedTime)) {
      errors.push(`articles.json [${a.id}]: publishedTime заавал HH:MM форматаар байх ёстой («${a.publishedTime}»)`);
    }
    if (a.author && typeof a.author !== 'string') {
      errors.push(`articles.json [${a.id}]: author заавал текст (string) байх ёстой, обьект биш`);
    }

    if (a.category === 'mongolia') {
      const mText = `${a.title || ''} ${a.subtitle || ''}`;
      if (mongoliaOfftopicRe.test(mText)) {
        errors.push(`articles.json [${a.id}]: «mongolia» буланд хамааралгүй шатахуун/түлшний мэдээ орсон байна`);
      }
    }

    for (const field of ['title', 'subtitle', 'summary', 'excerpt', 'content', 'imageCaption']) {
      const val = a[field];
      if (typeof val === 'string' && bannedStemRe.test(val)) {
        errors.push(`articles.json [${a.id}] (${field}): Хориотой үгийн язгуур илэрлээ («хэрэглэ-» гэж засна уу)`);
      }
    }

    if (a.publishedAt >= '2026-11-01' && typeof a.content === 'string' && a.coverImage && a.content.includes(a.coverImage)) {
      errors.push(`articles.json [${a.id}]: content дотор coverImage зураг (${a.coverImage}) давхар орсон байна`);
    }

    if (!a.coverImage) {
      errors.push(`articles.json [${a.id}]: coverImage талбар дутуу байна (imageUrl биш coverImage гэж бичнэ)`);
    } else if (a.coverImage.includes('images.unsplash.com')) {
      errors.push(`articles.json [${a.id}]: Гаднын Unsplash зураг хориотой (${a.coverImage})`);
    } else if (seenCovers.has(a.coverImage)) {
      errors.push(`articles.json [${a.id}]: Давхардсан coverImage (${a.coverImage}) — [${seenCovers.get(a.coverImage)}]-тай ижил байна`);
    } else {
      seenCovers.set(a.coverImage, a.id);
      if (a.coverImage.startsWith('/images/')) {
        const absImg = path.join('public', a.coverImage);
        if (!existsSync(absImg)) {
          errors.push(`articles.json [${a.id}]: coverImage зураг олдсонгүй: public${a.coverImage}`);
        } else {
          const isSvg = a.coverImage.toLowerCase().endsWith('.svg');
          if ((a.isMainLead || a.coverImage.startsWith('/images/articles/') || a.publishedAt >= '2026-10-15') && isSvg) {
            errors.push(`articles.json [${a.id}]: Хавтгай SVG нүүр зураг хориотой (${a.coverImage})`);
          }
          const bytes = readFileSync(absImg);
          const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
          if (seenHashes.has(hash)) {
            errors.push(`articles.json [${a.id}]: Ижил агуулгатай давхардсан зураг (${a.coverImage} === ${seenHashes.get(hash)})`);
          } else {
            seenHashes.set(hash, `${a.id}:${a.coverImage}`);
          }
          if (!isSvg && statSync(absImg).size < 12000) {
            errors.push(`articles.json [${a.id}]: Зургийн хэмжээ хэт бага (<12KB): ${a.coverImage}`);
          }
          if (HAS_FFMPEG && !isSvg && (a.isMainLead || a.coverImage.startsWith('/images/articles/'))) {
            const chk = checkWhiteBorderAndDims(absImg, Boolean(a.isMainLead));
            if (chk.err) {
              errors.push(`articles.json [${a.id}] (${a.coverImage}): ${chk.err}`);
            }
          }
        }
      }
    }
  }
} catch (e) {
  errors.push(`articles.json уншихад алдаа гарлаа: ${e.message}`);
}

// Локал компьютер дээр: GitHub-ын main-аас хоцорсон хуулбараас байршуулахыг хориглоно.
// Vercel-ийн сервер дээр .git байхгүй тул энэ шалгалт алгасагдана.
if (!process.env.VERCEL && existsSync('.git')) {
  try {
    execSync('git fetch -q origin main', { stdio: 'ignore', timeout: 20000 });
    const behind = Number(execSync('git rev-list --count HEAD..origin/main').toString().trim());
    if (behind > 0) {
      errors.push(`Энэ хуулбар GitHub-аас ${behind} commit хоцорсон. Эхлээд: git pull --rebase`);
    }
  } catch {
    console.warn('guard: GitHub-тай харьцуулж чадсангүй (сүлжээ?), алгаслаа');
  }
}

if (errors.length) {
  console.error('\nBUILD ЗОГСОВ:\n- ' + errors.join('\n- ') + '\n');
  process.exit(1);
}
console.log('guard: OK');
