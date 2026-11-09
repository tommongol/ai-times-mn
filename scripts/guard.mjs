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

const VALID_CATEGORIES = new Set(['review', 'tech', 'robotics', 'law', 'industry', 'interview', 'opinion', 'models', 'policy', 'companies']);

// Гарчгийн уртын хашлага, давхардсан ID, болон coverImage шалгалт
try {
  const articles = JSON.parse(readFileSync('src/data/articles.json', 'utf8'));
  const seenIds = new Set();
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
    if (!a.coverImage) {
      errors.push(`articles.json [${a.id}]: coverImage талбар дутуу байна (imageUrl биш coverImage гэж бичнэ)`);
    } else if (a.coverImage.includes('images.unsplash.com')) {
      errors.push(`articles.json [${a.id}]: Гаднын Unsplash зураг хориотой (${a.coverImage})`);
    } else if (a.coverImage.startsWith('/images/') && !existsSync(path.join('public', a.coverImage))) {
      errors.push(`articles.json [${a.id}]: coverImage зураг олдсонгүй: public${a.coverImage}`);
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
