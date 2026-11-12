#!/usr/bin/env python3
"""
AI Times Mongolia - Autonomous AI News Aggregator & Pipeline (2026)
------------------------------------------------------------------
1. Aggregates breaking AI & Robotics stories from top global feeds.
2. Uses Gemini (gemini-3.8-flash) for professional Mongolian journalism.
3. Enforces strict rules:
   - AI-г «хэрэглэх» гэж бичнэ (буруу хувилбар хориотой).
   - Үйлчлүүлэгчтэй харилцдаг AI-г «агент» гэнэ.
   - Гарчиг (title): 4-9 үг (<= 70 тэмдэгт).
   - Дэд гарчиг (subtitle): 1 богино өгүүлбэр (<= 130 тэмдэгт).
   - Зөв бичгийн дүрмийг mn-spell-ээр шалгана.
4. Generates authentic 16:9 documentary editorial photojournalism via BFL FLUX.
   (NO PIL text/bar charts or infographic cards ever!).
5. Validates with node scripts/guard.mjs.
"""

import os
import re
import sys
import json
import time
import shutil
import hashlib
import subprocess
import urllib.request
import urllib.parse
from datetime import datetime, timezone, timedelta
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'articles.json')
IMAGES_DIR = os.path.join(PROJECT_DIR, 'public', 'images', 'articles')

FEEDS = [
    {
        'name': 'Mongolia AI News',
        'url': 'https://news.google.com/rss/search?q=%22Mongolia%22+-%22Inner+Mongolia%22+-%22AI-92%22+-%22AI-95%22+-fuel+-gasoline+-petrol+(%22artificial+intelligence%22+OR+%22generative+AI%22+OR+%22data+center%22+OR+%22Chimege%22+OR+%22Egune%22)+when:14d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'mongolia'
    },
    {
        'name': 'Монгол AI Сайтууд',
        'url': 'https://news.google.com/rss/search?q=(%22%D0%9C%D0%BE%D0%BD%D0%B3%D0%BE%D0%BB%22+OR+%22%D0%A3%D0%BB%D0%B0%D0%B0%D0%BD%D0%B1%D0%B0%D0%B0%D1%82%D0%B0%D1%80%22+OR+%22%D0%A6%D0%A5%D0%A5%D0%A5%D0%AF%22+OR+%22%D0%A7%D0%B8%D0%BC%D1%8D%D0%B3%D1%8D%22+OR+%22%D0%AD%D0%B3%D2%AF%D0%BD%D1%8D%22)+(%22%D1%85%D0%B8%D0%B9%D0%BC%D1%8D%D0%BB+%D0%BE%D1%8E%D1%83%D0%BD%22+OR+%22%D0%B4%D0%B0%D1%82%D0%B0+%D1%82%D3%A9%D0%B2%22+OR+%22%D0%B8%D1%85+%D1%85%D1%8D%D0%BB%D0%BD%D0%B8%D0%B9+%D0%B7%D0%B0%D0%B3%D0%B2%D0%B0%D1%80%22)+-%22%D0%90%D0%98-92%22+-%22%D0%90%D0%98-95%22+-%D1%88%D0%B0%D1%82%D0%B0%D1%85%D1%83%D1%83%D0%BD+-%D1%82%D2%AF%D0%BB%D1%88+-%D0%B1%D0%B5%D0%BD%D0%B7%D0%B8%D0%BD+(site:ikon.mn+OR+site:gogo.mn+OR+site:lemonpress.mn+OR+site:unread.today+OR+site:montsame.mn+OR+site:itoim.mn+OR+site:mddic.gov.mn)+when:14d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'mongolia'
    },
    {
        'name': 'WIRED AI',
        'url': 'https://news.google.com/rss/search?q=site:wired.com+AI+when:3d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'AI Times Korea',
        'url': 'https://news.google.com/rss/search?q=site:aitimes.com+when:2d&hl=ko&gl=KR&ceid=KR:ko',
        'default_category': 'tech'
    },
    {
        'name': 'Google News Robotics',
        'url': 'https://news.google.com/rss/search?q=(humanoid+robot+OR+robotics+OR+%22embodied+AI%22)+when:3d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'robotics'
    },
    {
        'name': 'Google News AI Law & Policy',
        'url': 'https://news.google.com/rss/search?q=(%22AI+regulation%22+OR+%22AI+copyright%22+OR+%22AI+safety+law%22+OR+%22AI+policy%22)+when:3d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'law'
    },
    {
        'name': 'Google News AI Business',
        'url': 'https://news.google.com/rss/topics/CAAqIAgKIhpDQkFTRFFvSEwyMHZNRzFyZWhJQ1pXNG9BQVAB?hl=en-US&gl=US&ceid=US:en',
        'default_category': 'industry'
    },
    {
        'name': 'Google News AI Interviews',
        'url': 'https://news.google.com/rss/search?q=%22AI%22+interview+(Yann+LeCun+OR+Jensen+Huang+OR+Demis+Hassabis+OR+Dario+Amodei+OR+Sam+Altman)+when:7d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'interview'
    },
    {
        'name': 'TechRadar AI Analysis',
        'url': 'https://news.google.com/rss/search?q=site:techradar.com+AI+when:3d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'opinion'
    }
]

# Clean unique-photo policy: no shared fallback image copies (guard.mjs blocks duplicate hashes).


def load_api_keys():
    """Load keys from environment or ~/Desktop/API KEYS/shared.env."""
    keys = {
        'GEMINI_API_KEY': os.environ.get('GEMINI_API_KEY', ''),
        'BFL_API_KEY': os.environ.get('BFL_API_KEY', ''),
        'MN_SPELL_KEY': os.environ.get('MN_SPELL_KEY', '')
    }

    env_path = os.path.expanduser('~/Desktop/API KEYS/shared.env')
    if os.path.exists(env_path):
        try:
            with open(env_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#') or '=' not in line:
                        continue
                    k, v = line.split('=', 1)
                    k = k.strip()
                    v = v.strip().strip('"').strip("'")
                    if k in keys and not keys[k]:
                        keys[k] = v
        except Exception as e:
            print(f"Notice loading shared.env: {e}", flush=True)

    return keys


def clean_html(raw_html):
    clean = re.sub(r'<[^<]+?>', '', raw_html)
    clean = clean.replace('&quot;', '"').replace('&#39;', "'").replace('&amp;', '&').replace('&nbsp;', ' ')
    return clean.strip()


def clean_headline(title):
    title = clean_html(title)
    title = re.sub(r'\s*[-|–—]\s*([A-Za-z0-9\s.]+)\s*$', '', title)
    return title.strip()


def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug).strip('-')
    if not slug:
        digest = hashlib.sha1(title.strip().lower().encode('utf-8')).hexdigest()[:10]
        slug = f"mn-ai-{digest}"
    return slug[:70]


OFFTOPIC_PATTERNS = [
    r'\bai-?92\b', r'\bai-?95\b', r'аи-?92', r'аи-?95',
    r'\bgasoline\b', r'\bpetrol\b', r'\bdiesel\b', r'\bfuel orders?\b', r'\btonnes of fuel\b',
    r'шатахуун', r'бензин', r'дизель\s+түлш', r'түлш\s+импорт',
    r'\bhunted in mongolia\b', r'\bfluorspar\b', r'\bmining rights\b', r'\binner mongolia\b'
]

MONGOLIA_SIGNAL_TERMS = [
    'mongolia', 'ulaanbaatar', 'монгол', 'улаанбаатар', 'цхххя', 'mddic',
    'chimege', 'чимэгэ', 'egune', 'эгүнэ', 'bolorsoft', 'болорсофт', 'and global'
]

AI_SIGNAL_TERMS = [
    'artificial intelligence', 'generative ai', 'machine learning', 'deep learning',
    'llm', 'large language model', 'data center', 'datacenter', 'cloud', 'robot',
    'chimege', 'egune', 'bolorsoft', 'neural', 'openai', 'anthropic', 'gemini',
    'хиймэл оюун', 'их хэлний загвар', 'дата төв', 'үүлэн', 'робот', 'нейрон'
]


def is_candidate_pre_filtered(item):
    """Reject off-topic noise (e.g. AI-92 fuel, non-Mongolia stories in Mongolia feeds) early."""
    text = f"{item.get('clean_title', '')} {item.get('desc', '')}".lower()
    for pat in OFFTOPIC_PATTERNS:
        if re.search(pat, text):
            return True, f"matched offtopic pattern {pat}"

    if item.get('default_category') == 'mongolia':
        now_utc = datetime.now(timezone.utc)
        pub_dt = item.get('pub_dt')
        if pub_dt is not None:
            if pub_dt.tzinfo is None:
                pub_dt = pub_dt.replace(tzinfo=timezone.utc)
            if (now_utc - pub_dt).days > 14:
                return True, f"mongolia feed story too old ({pub_dt.date()})"
        if not any(term in text for term in MONGOLIA_SIGNAL_TERMS):
            return True, "mongolia feed story lacks explicit Mongolia/domestic signal"
        if not (any(term in text for term in AI_SIGNAL_TERMS) or re.search(r'\bai\b', text)):
            return True, "mongolia feed story lacks explicit AI/tech signal in title/summary"

    return False, ""


def fetch_feed_items():
    feed_results = {}
    seen_links = set()

    for feed in FEEDS:
        feed_name = feed['name']
        feed_results[feed_name] = []
        req = urllib.request.Request(feed['url'], headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                content = resp.read()
                root = ET.fromstring(content)
                items = root.findall('.//item')

                for item in items[:10]:
                    title_elem = item.find('title')
                    link_elem = item.find('link')
                    pub_elem = item.find('pubDate')
                    source_elem = item.find('source')
                    desc_elem = item.find('description')

                    if title_elem is None or not title_elem.text:
                        continue

                    raw_title = title_elem.text
                    clean_title = clean_headline(raw_title)
                    link = link_elem.text if link_elem is not None else ""
                    if not link or link in seen_links:
                        continue
                    seen_links.add(link)

                    source_name = source_elem.text if source_elem is not None and source_elem.text else feed_name

                    try:
                        dt = parsedate_to_datetime(pub_elem.text)
                    except Exception:
                        dt = datetime.now(timezone.utc)

                    desc_text = clean_html(desc_elem.text) if desc_elem is not None and desc_elem.text else ""

                    feed_results[feed_name].append({
                        'raw_title': raw_title,
                        'clean_title': clean_title,
                        'link': link,
                        'source': source_name,
                        'pub_dt': dt,
                        'desc': desc_text,
                        'feed_name': feed_name,
                        'default_category': feed.get('default_category', 'tech')
                    })
                feed_results[feed_name].sort(key=lambda x: x['pub_dt'], reverse=True)
        except Exception as e:
            print(f"Error fetching {feed_name}: {e}", flush=True)

    return feed_results


def generate_article_with_gemini(gemini_key, item):
    """Use Gemini 3.8 Flash to verify relevance and write authentic Mongolian journalism."""
    default_cat = item.get('default_category', 'tech')
    mongolia_rule = ""
    if default_cat == 'mongolia':
        mongolia_rule = (
            "\nАНХААР («МОНГОЛД» булангийн хатуу шүүлт): Энэ мэдээ ЗӨВХӨН Монгол Улс дотор болж буй "
            "хиймэл оюун, их хэлний загвар, дата төв, үүлэн технологи эсвэл монгол хөгжүүлэгч, компанийн "
            "хиймэл оюуны бүтээлийн тухай байвал л is_relevant=true болгоно. Хэрэв Солонгос (Сөүл), Европ, "
            "АНУ зэрэг гадаад улсад болж байгаа үйл явдал, эсвэл АИ-92 шатахуун, түлшний импорт, уул уурхай, "
            "ерөнхий улс төрийн мэдээ байвал ЗААВАЛ is_relevant=false гэж буцаа!"
        )

    system_prompt = f"""Чи бол 'AI Mongolia' цахим сэтгүүлийн тэргүүлэх шинжээч сэтгүүлч.
Өгөгдсөн мэдээг эхлээд сэдвийн шалгуураар нягтлаад, тохирох бол чанартай монгол нийтлэл болгож JSON форматаар буцаа.

СЭДВИЙН ШҮҮЛТ (is_relevant):
- is_relevant: boolean. Мэдээ нь хиймэл оюун (AI), их хэлний загвар, робот, дата төв, AI бодлого эсвэл технологийн бүтээлтэй ЖИНХЭНЭЭРЭЭ холбоотой бол true. Хэрэв АИ-92/АИ-95 автобензин, түлшний импорт, уул уурхай, ан агнуур, ерөнхий улс төр зэрэг AI-тай хамаагүй мэдээ бол false болго.
- reject_reason: string (хэрэв is_relevant=false бол товч шалтгаан, true бол хоосон "").{mongolia_rule}

ХАТУУ ШААРДЛАГУУД (is_relevant=true үед):
1. title: 4-9 үг (дээд тал нь 70 тэмдэгт). Хэт олон сэдвийг таслалаар холбохгүй, гол үйл явдлыг оновчтой гаргасан амьд гарчиг.
2. subtitle: Яг 1 богино өгүүлбэр (дээд тал нь 130 тэмдэгт).
3. summary: 2-3 өгүүлбэртэй, гол агуулгыг товч бөгөөд тодорхой хураангуйлсан догол мөр.
4. content: HTML хэлбэрээр бичсэн нийтлэлийн их бие.
   - Эхний догол мөр: <p class="lead"><strong>...</strong> ...</p>
   - 2-3 ширхэг <h3> дэд гарчигтай.
   - Дэд гарчиг бүрийн дор 1-2 догол мөр дэлгэрэнгүй баримт.
   - Агуулга дотор ямар ч <img> эсвэл <figure> БҮҮ хий (зураг коверт нэг л удаа орно).
5. category: 'mongolia', 'tech', 'robotics', 'law', 'industry', 'interview', 'opinion'-ийн аль тохирох нь.
6. categoryName: 'МОНГОЛД', 'AI ТЕХНОЛОГИ', 'РОБОТ', 'ХУУЛЬ & БОДЛОГО', 'САЛБАР & БИЗНЕС', 'ЯРИЛЦЛАГА & ХӨРӨГ', 'СУРВАЛЖЛАГА'-ын аль нэг.
7. tags: 3-5 ширхэг түлхүүр үг (жишээ нь: ["OpenAI", "ChatGPT", "AI агент"]).
8. image_prompt: Бодит гэрэл зургийн англи промпт (35mm documentary editorial photography, realistic cinematic lighting, highly detailed, photojournalism, no text, no infographics, no UI).
9. image_caption: Зургийн тайлбар монголоор (1 богино өгүүлбэр).

ХЭЛНИЙ ХАТУУ ШҮҮЛТ:
- Хиймэл оюунтай холбоотой үйлдлийг зөвхөн «хэрэглэх» гэж бичнэ (буруу хувилбар хориотой).
- Үйлчлүүлэгчтэй харилцдаг AI-г «агент» гэнэ.
- «веб», «гараг», «их хэлний загвар», «нейрон сүлжээ», «бүрд», «тасалж».
- Модон үг хэллэг, орчуулгын дарангуйллыг халж, монгол хүн уншихад шууд ойлгогдох эелдэг, эрч хүчтэй найруулгаар бич."""

    user_msg = f"Эх сурвалж: {item['source']}\nГарчиг: {item['clean_title']}\nАгуулгын тойм: {item['desc']}"

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key={gemini_key}"
    payload = {
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"parts": [{"text": user_msg}]}],
        "generationConfig": {"response_mime_type": "application/json"}
    }

    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        ans_text = res_data["candidates"][0]["content"]["parts"][0]["text"]
        art_data = json.loads(ans_text)
        return art_data


def check_spelling_remote(mn_spell_key, text):
    """Check text spelling via mn-spell API."""
    if not mn_spell_key or not text:
        return True, []
    url = "https://mn-spell.vercel.app/api/spell"
    req = urllib.request.Request(
        url,
        data=json.dumps({"text": text}).encode("utf-8"),
        headers={"Content-Type": "application/json", "x-spell-key": mn_spell_key}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            flagged = [w['word'] for w in data.get('results', []) if not w.get('ok')]
            return True, flagged
    except Exception as e:
        print(f"Notice mn-spell: {e}", flush=True)
        return False, []


def sanitize_mongolian_text(text):
    """Auto-correct common disallowed words with vowel-harmony inflections."""
    if not isinstance(text, str):
        return text
    replacements = [
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0433\u0434\u0430\u0445\u0442\u0430\u0439\b', 'хэрэглэгдэхтэй'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043b\u0433\u04af\u0439\u0433\u044d\u044d\u0440\b', 'хэрэглэлгүйгээр'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0441\u043d\u0430\u0430\u0440\b', 'хэрэглэснээр'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0433\u0434\u0430\u0436\b', 'хэрэглэгдэж'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0433\u0434\u0430\u0445\b', 'хэрэглэгдэх'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043b\u0442\u0430\u0434\b', 'хэрэглээнд'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043b\u0442\u044b\u0433\b', 'хэрэглээг'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043b\u0442\u044b\u043d\b', 'хэрэглээний'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\u0434\u0430\u0430\b', 'хэрэглэхдээ'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0436\u044d\u044d\b', 'хэрэглэжээ'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0434\u0430\u0433\b', 'хэрэглэдэг'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0441\u0430\u043d\b', 'хэрэглэсэн'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\u0430\u0430\b', 'хэрэглэхээ'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\u0430\u0434\b', 'хэрэглэхэд'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\u044b\u0433\b', 'хэрэглэхийг'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\u044b\u043d\b', 'хэрэглэхийн'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043b\u0442\b', 'хэрэглээ'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0436\b', 'хэрэглэж'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u043d\b', 'хэрэглэн'),
        (r'\b\u0430\u0448\u0438\u0433\u043b\u0430\u0445\b', 'хэрэглэх'),
        (r'\bвэб\b', 'веб'),
        (r'\bгариг\b', 'гараг'),
        (r'\bбүрт\b', 'бүрд'),
        (r'\bтаслаж\b', 'тасалж'),
    ]
    for pattern, rep in replacements:
        def _keep_case(m, r=rep):
            w = m.group(0)
            return r.capitalize() if w and w[0].isupper() else r
        text = re.sub(pattern, _keep_case, text, flags=re.IGNORECASE)
    return text


def resize_and_optimize_image(in_path, out_path):
    """Resize image to 1200x675 and compress to JPEG < 140KB."""
    # 1. Try Pillow (for GitHub Actions)
    try:
        from PIL import Image
        with Image.open(in_path) as im:
            im = im.convert("RGB")
            target_w, target_h = 1200, 675
            src_w, src_h = im.size
            src_aspect = src_w / src_h
            target_aspect = target_w / target_h

            if src_aspect > target_aspect:
                new_w = int(src_h * target_aspect)
                left = (src_w - new_w) // 2
                im = im.crop((left, 0, left + new_w, src_h))
            else:
                new_h = int(src_w / target_aspect)
                top = (src_h - new_h) // 2
                im = im.crop((0, top, src_w, top + new_h))

            im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
            for q in [85, 80, 75, 70, 65]:
                im.save(out_path, "JPEG", quality=q, optimize=True)
                if os.path.getsize(out_path) <= 140000:
                    break
        return True
    except ImportError:
        pass

    # 2. Try ffmpeg (for local macOS)
    if shutil.which("ffmpeg"):
        try:
            subprocess.run([
                "ffmpeg", "-y", "-i", in_path,
                "-vf", "scale=1200:675:force_original_aspect_ratio=increase,crop=1200:675",
                "-q:v", "4", out_path
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return True
        except Exception:
            pass

    # 3. Fallback copy
    shutil.copy(in_path, out_path)
    return True


def generate_bfl_flux_photo(bfl_key, prompt, abs_target_path):
    """Generate authentic 16:9 editorial documentary photo via BFL FLUX."""
    if not bfl_key:
        return False

    req_body = {
        "prompt": prompt,
        "aspect_ratio": "16:9"
    }
    req = urllib.request.Request(
        "https://api.bfl.ai/v1/flux-pro-1.1",
        data=json.dumps(req_body).encode("utf-8"),
        headers={"Content-Type": "application/json", "x-key": bfl_key}
    )

    try:
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read().decode("utf-8"))
        poll_url = data.get("polling_url")
        if not poll_url:
            return False

        for _ in range(25):
            time.sleep(3)
            p_req = urllib.request.Request(poll_url, headers={"x-key": bfl_key})
            p_res = json.loads(urllib.request.urlopen(p_req, timeout=10).read().decode("utf-8"))
            status = p_res.get("status")
            if status == "Ready":
                img_url = p_res["result"]["sample"]
                raw_tmp = abs_target_path + ".tmp.jpg"
                urllib.request.urlretrieve(img_url, raw_tmp)
                resize_and_optimize_image(raw_tmp, abs_target_path)
                if os.path.exists(raw_tmp):
                    os.remove(raw_tmp)
                return True
            elif status in ["Failed", "Error"]:
                print(f"BFL generation failed: {p_res}", flush=True)
                return False
    except Exception as e:
        print(f"Error calling BFL FLUX: {e}", flush=True)
        return False

    return False


def is_clean_editorial_photo(img_path, max_white_border=0.45):
    """Reject white-background product cutouts, flat logos, tiny or portrait images."""
    if not os.path.exists(img_path) or os.path.getsize(img_path) <= 15000:
        return False, "file missing or <15KB"
    raw = None
    try:
        from PIL import Image
        with Image.open(img_path) as im:
            w, h = im.size
            if w < 600 or h > w:
                return False, f"invalid dimensions {w}x{h}"
            sm = im.convert("RGB").resize((32, 18), Image.Resampling.BILINEAR)
            raw = sm.tobytes()
    except ImportError:
        if shutil.which("ffprobe") and shutil.which("ffmpeg"):
            p = subprocess.run(
                ["ffprobe", "-v", "error", "-select_streams", "v:0",
                 "-show_entries", "stream=width,height", "-of", "csv=p=0", img_path],
                capture_output=True, text=True
            )
            wh = p.stdout.strip()
            if wh and "," in wh:
                w, h = map(int, wh.split(",")[:2])
                if w < 600 or h > w:
                    return False, f"invalid dimensions {w}x{h}"
            r = subprocess.run(
                ["ffmpeg", "-v", "error", "-i", img_path, "-vf", "scale=32:18",
                 "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"],
                capture_output=True
            )
            if len(r.stdout) == 32 * 18 * 3:
                raw = r.stdout
    except Exception as e:
        return False, f"unreadable image: {e}"

    if raw and len(raw) == 32 * 18 * 3:
        border_pts = [
            (x, y) for y in range(18) for x in range(32)
            if y in (0, 1, 16, 17) or x in (0, 1, 30, 31)
        ]
        white_cnt = 0
        for x, y in border_pts:
            idx = (y * 32 + x) * 3
            if raw[idx] > 235 and raw[idx + 1] > 235 and raw[idx + 2] > 235:
                white_cnt += 1
        ratio = white_cnt / len(border_pts)
        if ratio > max_white_border:
            return False, f"white-background border ratio={ratio:.0%} > {max_white_border:.0%}"
    return True, "ok"


def ensure_editorial_photo(bfl_key, art_id, cat_id, image_prompt, source_url):
    """Create or retrieve a genuine, non-white-background documentary photo."""
    os.makedirs(IMAGES_DIR, exist_ok=True)
    rel_path = f"/images/articles/{art_id}.jpg"
    abs_path = os.path.join(IMAGES_DIR, f"{art_id}.jpg")

    if os.path.exists(abs_path):
        ok, _ = is_clean_editorial_photo(abs_path)
        if ok:
            return rel_path
        os.remove(abs_path)

    # Step 1: Generate authentic 16:9 photo via BFL FLUX (retry once with dark moody scene if white border)
    if bfl_key and image_prompt:
        print(f"Generating BFL FLUX editorial photo for {art_id}...", flush=True)
        for attempt in range(2):
            prompt = image_prompt if attempt == 0 else (
                f"{image_prompt}, dark moody cinematic studio lighting, full-bleed realistic background, no white background"
            )
            ok = generate_bfl_flux_photo(bfl_key, prompt, abs_path)
            clean, reason = is_clean_editorial_photo(abs_path) if ok else (False, "bfl failed")
            if clean:
                return rel_path
            print(f"Rejected BFL photo attempt {attempt + 1} for {art_id}: {reason}", flush=True)
            if os.path.exists(abs_path):
                os.remove(abs_path)

    # Step 2: Try extracting source og:image ONLY if it passes white-border & landscape validation
    if source_url and source_url.startswith("http") and "news.google.com" not in source_url:
        try:
            req = urllib.request.Request(source_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=6) as resp:
                html = resp.read(200000).decode("utf-8", errors="ignore")
            m = re.search(r"<meta[^>]+(?:property|name)=[\x27\"](?:og:image|twitter:image)[\x27\"][^>]+content=[\x27\"](https?://[^\x27\"]+)[\x27\"]", html, re.I)
            if m:
                img_url = m.group(1)
                if "unsplash.com" not in img_url:
                    raw_tmp = abs_path + ".tmp.jpg"
                    urllib.request.urlretrieve(img_url, raw_tmp)
                    resize_and_optimize_image(raw_tmp, abs_path)
                    if os.path.exists(raw_tmp):
                        os.remove(raw_tmp)
                    clean, reason = is_clean_editorial_photo(abs_path)
                    if clean:
                        return rel_path
                    print(f"Rejected source og:image for {art_id}: {reason}", flush=True)
                    if os.path.exists(abs_path):
                        os.remove(abs_path)
        except Exception:
            pass

    # Never duplicate an existing fallback image onto a new article
    return None


def run_pipeline():
    print("=== STARTING AUTONOMOUS AI NEWS PIPELINE ===", flush=True)

    keys = load_api_keys()
    gemini_key = keys['GEMINI_API_KEY']
    bfl_key = keys['BFL_API_KEY']
    mn_spell_key = keys['MN_SPELL_KEY']

    if not gemini_key:
        print("ERROR: GEMINI_API_KEY is not configured! Cannot synthesize articles.", flush=True)
        sys.exit(1)

    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            articles = json.load(f)
    else:
        articles = []

    print(f"Loaded {len(articles)} existing articles.", flush=True)
    existing_ids = {a.get('id', '') for a in articles if a.get('id')}
    existing_slugs = {a.get('slug', '') for a in articles if a.get('slug')}
    existing_urls = {a.get('primarySourceUrl', '').strip() for a in articles if a.get('primarySourceUrl')}
    existing_titles = {a.get('title', '').strip().lower() for a in articles if a.get('title')}

    feed_data = fetch_feed_items()

    selected_candidates = []
    seen_candidate_slugs = set()
    priority_order = [f['name'] for f in FEEDS]

    for feed_name in priority_order:
        items = feed_data.get(feed_name, [])
        added_for_feed = 0
        for it in items:
            slug = create_slug(it['clean_title'])
            link = it.get('link', '').strip()
            if slug in existing_slugs or slug in seen_candidate_slugs or link in existing_urls:
                continue
            skip, reason = is_candidate_pre_filtered(it)
            if skip:
                print(f"Pre-filtered [{feed_name}] {it['clean_title']}: {reason}", flush=True)
                continue
            seen_candidate_slugs.add(slug)
            selected_candidates.append(it)
            added_for_feed += 1
            if added_for_feed >= 2:
                break

    print(f"Selected {len(selected_candidates)} filtered candidates for ingestion.", flush=True)

    new_articles = []
    mongolia_added = 0
    # Ingest up to 4 high-impact articles per scheduled run across categories
    for item in selected_candidates:
        if len(new_articles) >= 4:
            break

        if item.get('default_category') == 'mongolia' and mongolia_added >= 1:
            continue

        en_title = item['clean_title']
        slug = create_slug(en_title)
        if slug in existing_slugs:
            continue

        print(f"\nProcessing story: [{item['source']}] {en_title}...", flush=True)

        try:
            art_data = generate_article_with_gemini(gemini_key, item)
        except Exception as e:
            print(f"Failed to generate article with Gemini: {e}", flush=True)
            continue

        if not art_data.get('is_relevant', True):
            print(f"Rejected off-topic story: {en_title} | reason={art_data.get('reject_reason', '')}", flush=True)
            continue

        # Sanitize language
        mn_title = sanitize_mongolian_text(art_data.get('title', '').strip())
        mn_subtitle = sanitize_mongolian_text(art_data.get('subtitle', '').strip())
        summary = sanitize_mongolian_text(art_data.get('summary', '').strip())
        content = sanitize_mongolian_text(art_data.get('content', '').strip())
        if not mn_title or not summary or not content:
            continue

        # Check guard constraints
        title_words = len(mn_title.split())
        title_chars = len(mn_title)
        if title_words > 10 or title_chars > 75:
            words = mn_title.split()[:9]
            mn_title = ' '.join(words)
            if len(mn_title) > 74:
                mn_title = mn_title[:74].rstrip()

        if len(mn_subtitle) > 140:
            sentences = re.split(r'[.!?]', mn_subtitle)
            mn_subtitle = sentences[0].strip() + '.'
            if len(mn_subtitle) > 140:
                mn_subtitle = mn_subtitle[:136].rstrip() + '...'

        if mn_title.lower() in existing_titles:
            continue

        if item.get('default_category') == 'mongolia':
            mongolia_added += 1

        # Run mn-spell check
        if mn_spell_key:
            _, flagged = check_spelling_remote(mn_spell_key, f"{mn_title} {summary}")
            if flagged:
                print(f"mn-spell notice: flagged words {flagged}", flush=True)

        now_ub = datetime.now(timezone(timedelta(hours=8)))
        date_str = now_ub.strftime('%Y-%m-%d')
        time_str = now_ub.strftime('%H:%M')

        seq = len(new_articles) + 1
        art_id = f"art-{now_ub.strftime('%Y%m%d')}-{int(time.time()) % 10000:04d}"
        while art_id in existing_ids:
            seq += 1
            art_id = f"art-{now_ub.strftime('%Y%m%d')}-{(int(time.time()) + seq) % 10000:04d}"

        cat_id = item.get('default_category') or art_data.get('category', 'tech')
        if cat_id not in ['mongolia', 'tech', 'robotics', 'law', 'industry', 'interview', 'people', 'opinion']:
            cat_id = 'tech'

        cat_names = {
            'mongolia': 'МОНГОЛД',
            'tech': 'AI ТЕХНОЛОГИ',
            'robotics': 'РОБОТ',
            'law': 'ХУУЛЬ & БОДЛОГО',
            'industry': 'САЛБАР & БИЗНЕС',
            'interview': 'ЯРИЛЦЛАГА',
            'people': 'НАМТАР БА ХҮМҮҮС',
            'opinion': 'СУРВАЛЖЛАГА'
        }
        cat_name = cat_names.get(cat_id, 'AI ТЕХНОЛОГИ')

        image_prompt = art_data.get('image_prompt', '')
        cover_img = ensure_editorial_photo(bfl_key, art_id, cat_id, image_prompt, item.get('link', ''))
        if not cover_img:
            print(f"Skipping [{item['source']}] {mn_title}: no clean unique editorial photo available", flush=True)
            continue

        mn_caption = sanitize_mongolian_text(art_data.get('image_caption', f"{item['source']} - {mn_title}").strip())
        if cat_id == 'mongolia':
            check_mn = f"{mn_title} {mn_subtitle}".lower()
            if any(k in check_mn for k in ('шатахуун', 'түлш', 'бензин', 'дизель', 'аи-92', 'аи-95')):
                print(f"Skipping off-topic mongolia story: {mn_title}", flush=True)
                continue
            if not any(k in check_mn for k in ('монгол', 'улаанбаатар', 'цхххя', 'чимэгэ', 'эгүнэ')):
                print(f"Skipping non-domestic mongolia story: {mn_title}", flush=True)
                continue

        art_obj = {
            'id': art_id,
            'slug': slug,
            'title': mn_title,
            'subtitle': mn_subtitle,
            'category': cat_id,
            'categoryName': cat_name,
            'primarySource': item['source'],
            'primarySourceUrl': item['link'],
            'publishedAt': date_str,
            'publishedTime': time_str,
            'readCount': 1200 + (len(new_articles) * 320),
            'readTime': '5 мин унших',
            'tags': art_data.get('tags', [item['source'], cat_name, 'AI 2026']),
            'rank': len(new_articles) + 1,
            'coverImage': cover_img,
            'imageUrl': cover_img,
            'imageCaption': mn_caption,
            'isMainLead': False,
            'isFeatured': False,
            'isHot': (len(new_articles) == 0),
            'summary': summary,
            'content': content,
            'sources': [
                {'name': item['source'], 'url': item['link']}
            ]
        }

        new_articles.append(art_obj)
        existing_ids.add(art_id)
        existing_slugs.add(slug)
        existing_titles.add(mn_title.lower())
        print(f" -> Successfully ingested: [{item['source']}] {mn_title}", flush=True)

    if new_articles:
        print(f"\nAdding {len(new_articles)} new articles to articles.json...", flush=True)
        # Keep weekly review or lead at top, insert new daily news right after lead
        insert_idx = 1 if len(articles) > 0 and (articles[0].get('category') == 'review' or articles[0].get('isMainLead')) else 0
        updated_articles = articles[:insert_idx] + new_articles + articles[insert_idx:]

        for idx, a in enumerate(updated_articles):
            a['rank'] = idx + 1

        with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_articles, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(updated_articles)} articles to {ARTICLES_FILE}.", flush=True)
    else:
        print("All priority stories are up to date.", flush=True)

    print("\nRunning scripts/guard.mjs validation...", flush=True)
    res = subprocess.run(['node', 'scripts/guard.mjs'], cwd=PROJECT_DIR)
    if res.returncode != 0:
        sys.exit(res.returncode)

    print("=== AUTONOMOUS NEWS PIPELINE COMPLETED SUCCESSFULLY ===", flush=True)


if __name__ == '__main__':
    run_pipeline()
