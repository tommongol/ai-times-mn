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
];
for (const p of FORBIDDEN_PATHS) {
  if (existsSync(p)) errors.push(`${p} хасагдсан хэсэг буцаж орсон байна`);
}

const FORBIDDEN_TEXT = ['aimedee2026', 'admin2026', 'NEXT_PUBLIC_ADMIN_PASSWORD'];
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
