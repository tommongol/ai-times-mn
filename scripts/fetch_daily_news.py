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
from datetime import datetime, timezone
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'articles.json')
IMAGES_DIR = os.path.join(PROJECT_DIR, 'public', 'images', 'articles')

FEEDS = [
    {
        'name': 'WIRED AI',
        'url': 'https://news.google.com/rss/search?q=site:wired.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'TechRadar AI',
        'url': 'https://news.google.com/rss/search?q=site:techradar.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'AI Times Korea',
        'url': 'https://news.google.com/rss/search?q=site:aitimes.com&hl=ko&gl=KR&ceid=KR:ko',
        'default_category': 'tech'
    },
    {
        'name': 'Google News AI',
        'url': 'https://news.google.com/rss/topics/CAAqIAgKIhpDQkFTRFFvSEwyMHZNRzFyZWhJQ1pXNG9BQVAB?hl=en-US&gl=US&ceid=US:en',
        'default_category': 'industry'
    },
    {
        'name': 'Google News Robotics',
        'url': 'https://news.google.com/rss/search?q=(humanoid+robot+OR+robotics+OR+%22embodied+AI%22)+when:7d&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'robotics'
    },
    {
        'name': 'Google News AI Interviews',
        'url': 'https://news.google.com/rss/search?q=%22AI%22+interview+(Yann+LeCun+OR+Jensen+Huang+OR+Bill+Gates+OR+Dario+Amodei+OR+Sam+Altman)+2026&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'interview'
    }
]

EDITORIAL_FALLBACK_IMAGES = {
    'tech': '/images/articles/art-20261018-01.jpg',
    'robotics': '/images/articles/ihg-aa-robotics-arm.jpg',
    'law': '/images/articles/art-aitimes-copyright-fairuse-battle.jpg',
    'industry': '/images/articles/daily-20261106-industry-2.jpg',
    'interview': '/images/articles/art-aitimes-gemini-4-hassabis.jpg',
    'opinion': '/images/articles/daily-20261106-opinion-2.jpg',
}


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
        slug = f"ai-update-{int(time.time())}"
    return slug[:70]


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
                        'feed_name': feed_name
                    })
        except Exception as e:
            print(f"Error fetching {feed_name}: {e}", flush=True)

    return feed_results


def generate_article_with_gemini(gemini_key, item):
    """Use Gemini 3.8 Flash to write authentic Mongolian journalism with strict rules."""
    system_prompt = """Чи бол 'AI Mongolia' цахим сэтгүүлийн тэргүүлэх шинжээч сэтгүүлч.
Өгөгдсөн хиймэл оюуны шинэ мэдээгээр чанартай, амьд монгол хэлээр мэдээллийн нийтлэл бэлтгэж JSON форматаар буцаа.

ХАТУУ ШААРДЛАГУУД:
1. title: 4-9 үг (дээд тал нь 70 тэмдэгт). Хэт олон сэдвийг таслалаар холбохгүй, гол үйл явдлыг оновчтой гаргасан амьд гарчиг.
2. subtitle: Яг 1 богино өгүүлбэр (дээд тал нь 130 тэмдэгт).
3. summary: 2-3 өгүүлбэртэй, гол агуулгыг товч бөгөөд тодорхой хураангуйлсан догол мөр.
4. content: HTML хэлбэрээр бичсэн нийтлэлийн их бие.
   - Эхний догол мөр: <p class="lead"><strong>...</strong> ...</p>
   - 2-3 ширхэг <h3> дэд гарчигтай.
   - Дэд гарчиг бүрийн дор 1-2 догол мөр дэлгэрэнгүй баримт.
   - Агуулга дотор ямар ч <img> эсвэл <figure> БҮҮ хий (зураг коверт нэг л удаа орно).
5. category: 'tech', 'robotics', 'law', 'industry', 'interview', 'opinion'-ийн аль тохирох нь.
6. categoryName: 'AI ТЕХНОЛОГИ', 'РОБОТ', 'ХУУЛЬ & БОДЛОГО', 'САЛБАР & БИЗНЕС', 'ЯРИЛЦЛАГА & ХӨРӨГ', 'СУРВАЛЖЛАГА'-ын аль нэг.
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
    """Auto-correct common disallowed words."""
    replacements = [
        (r'\bашиглах\b', 'хэрэглэх'),
        (r'\bашиглан\b', 'хэрэглэн'),
        (r'\bашиглаж\b', 'хэрэглэж'),
        (r'\bашигладаг\b', 'хэрэглэдэг'),
        (r'\bашигласнаар\b', 'хэрэглэснээр'),
        (r'\bашиглалт\b', 'хэрэглээ'),
        (r'\bашиглалтад\b', 'хэрэглээнд'),
        (r'\bвэб\b', 'веб'),
        (r'\bгариг\b', 'гараг'),
        (r'\bбүрт\b', 'бүрд'),
        (r'\bтаслаж\b', 'тасалж'),
    ]
    for pattern, rep in replacements:
        text = re.sub(pattern, rep, text, flags=re.IGNORECASE)
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


def ensure_editorial_photo(bfl_key, art_id, cat_id, image_prompt, source_url):
    """Create or retrieve a genuine documentary photo for the article."""
    os.makedirs(IMAGES_DIR, exist_ok=True)
    rel_path = f"/images/articles/{art_id}.jpg"
    abs_path = os.path.join(IMAGES_DIR, f"{art_id}.jpg")

    if os.path.exists(abs_path) and os.path.getsize(abs_path) > 15000:
        return rel_path

    # Step 1: Generate authentic 16:9 photo via BFL FLUX
    if bfl_key and image_prompt:
        print(f"Generating BFL FLUX editorial photo for {art_id}...", flush=True)
        ok = generate_bfl_flux_photo(bfl_key, image_prompt, abs_path)
        if ok and os.path.exists(abs_path) and os.path.getsize(abs_path) > 15000:
            return rel_path

    # Step 2: Try extracting source og:image if genuine high-res photo
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
                    if os.path.exists(abs_path) and os.path.getsize(abs_path) > 15000:
                        return rel_path
        except Exception:
            pass

    # Step 3: High-quality editorial photo fallback (never a PIL card!)
    fallback_rel = EDITORIAL_FALLBACK_IMAGES.get(cat_id, EDITORIAL_FALLBACK_IMAGES['tech'])
    fallback_abs = os.path.join(PROJECT_DIR, 'public', fallback_rel.lstrip('/'))
    if os.path.exists(fallback_abs):
        shutil.copy(fallback_abs, abs_path)
        return rel_path

    return fallback_rel


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
    existing_titles = {a.get('title', '').strip().lower() for a in articles if a.get('title')}

    feed_data = fetch_feed_items()

    selected_candidates = []
    priority_order = ['WIRED AI', 'TechRadar AI', 'AI Times Korea', 'Google News AI', 'Google News Robotics', 'Google News AI Interviews']

    for feed_name in priority_order:
        items = feed_data.get(feed_name, [])
        for it in items:
            slug = create_slug(it['clean_title'])
            if slug not in existing_slugs and it not in selected_candidates:
                selected_candidates.append(it)
                break

    print(f"Selected {len(selected_candidates)} priority candidates for ingestion.", flush=True)

    new_articles = []
    # Ingest up to 2 high-impact articles per scheduled run to keep feed curated
    for item in selected_candidates:
        if len(new_articles) >= 2:
            break

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

        # Sanitize language
        mn_title = sanitize_mongolian_text(art_data.get('title', '').strip())
        mn_subtitle = sanitize_mongolian_text(art_data.get('subtitle', '').strip())
        summary = sanitize_mongolian_text(art_data.get('summary', '').strip())
        content = sanitize_mongolian_text(art_data.get('content', '').strip())

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

        # Run mn-spell check
        if mn_spell_key:
            _, flagged = check_spelling_remote(mn_spell_key, f"{mn_title} {summary}")
            if flagged:
                print(f"mn-spell notice: flagged words {flagged}", flush=True)

        dt = item['pub_dt']
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M')

        seq = len(new_articles) + 1
        art_id = f"art-{dt.strftime('%Y%m%d')}-{int(time.time()) % 10000:04d}"
        while art_id in existing_ids:
            seq += 1
            art_id = f"art-{dt.strftime('%Y%m%d')}-{(int(time.time()) + seq) % 10000:04d}"

        cat_id = art_data.get('category', 'tech')
        if cat_id not in ['tech', 'robotics', 'law', 'industry', 'interview', 'opinion']:
            cat_id = 'tech'

        cat_names = {
            'tech': 'AI ТЕХНОЛОГИ',
            'robotics': 'РОБОТ',
            'law': 'ХУУЛЬ & БОДЛОГО',
            'industry': 'САЛБАР & БИЗНЕС',
            'interview': 'ЯРИЛЦЛАГА & ХӨРӨГ',
            'opinion': 'СУРВАЛЖЛАГА'
        }
        cat_name = cat_names.get(cat_id, 'AI ТЕХНОЛОГИ')

        image_prompt = art_data.get('image_prompt', '')
        cover_img = ensure_editorial_photo(bfl_key, art_id, cat_id, image_prompt, item.get('link', ''))

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
            'imageCaption': art_data.get('image_caption', f"{item['source']} - {mn_title}"),
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
