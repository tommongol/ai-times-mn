#!/usr/bin/env python3
"""
AI Times Mongolia - Autonomous Daily AI News Aggregator & Pipeline
Aggregates news from:
1. Wired (AI Section)
2. TechRadar (AI Section)
3. Google News (AI & Robotics Topics)

Translates, formats into Mongolian journalistic articles, enforces short
headlines (<= 10 words, <= 75 chars), generates local cover images in
public/images/articles/, updates src/data/articles.json, and validates with
node scripts/guard.mjs.
"""

import os
import re
import sys
import json
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
        'name': 'AI Times Korea',
        'url': 'https://news.google.com/rss/search?q=site:aitimes.com&hl=ko&gl=KR&ceid=KR:ko',
        'default_category': 'tech'
    },
    {
        'name': 'The Korea Times',
        'url': 'https://news.google.com/rss/search?q=site:koreatimes.co.kr+(%22AI%22+OR+%22artificial+intelligence%22)&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'law'
    },
    {
        'name': 'Google News AI Interviews',
        'url': 'https://news.google.com/rss/search?q=%22AI%22+interview+(Yann+LeCun+OR+Jensen+Huang+OR+Bill+Gates+OR+Dario+Amodei+OR+Sam+Altman)+2026&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'interview'
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
        'name': 'WIRED',
        'url': 'https://news.google.com/rss/search?q=site:wired.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'TechRadar',
        'url': 'https://news.google.com/rss/search?q=site:techradar.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    }
]

LOCAL_FALLBACK_IMAGES = {
    'tech': [
        '/images/articles/art-20261018-01.jpg',
        '/images/articles/art-20261018-02.jpg',
        '/images/articles/art-20261018-03.jpg',
    ],
    'robotics': [
        '/images/articles/ihg-aa-robotics-arm.jpg',
        '/images/articles/art-ind-samsung-sds-robot-orchestration.jpg',
        '/images/articles/art-ind-tesla-optimus-gen2-figure02-factories.jpg',
    ],
    'law': [
        '/images/articles/art-aitimes-copyright-fairuse-battle.jpg',
        '/images/articles/art-20261001-01.jpg',
    ],
    'industry': [
        '/images/articles/art-aitimes-anthropic-ipo-founders.jpg',
        '/images/articles/art-20261002-01.jpg',
        '/images/articles/art-20261002-02.jpg',
    ],
    'interview': [
        '/images/articles/art-aitimes-gemini-4-hassabis.jpg',
        '/images/articles/art-20260930-01.jpg',
    ],
    'opinion': [
        '/images/articles/art-aitimes-history-dartmouth-to-reasoning.jpg',
        '/images/articles/art-20260929-01.jpg',
    ],
}

TRANSLATION_CACHE = {}


def clean_html(raw_html):
    clean = re.sub(r'<[^<]+?>', '', raw_html)
    clean = clean.replace('&quot;', '"').replace('&#39;', "'").replace('&amp;', '&').replace('&nbsp;', ' ')
    return clean.strip()


def clean_headline(title):
    title = clean_html(title)
    title = re.sub(r'\s*[-|–—]\s*([A-Za-z0-9\s.]+)\s*$', '', title)
    return title.strip()


def shorten_headline(title, max_words=9, max_chars=70):
    """Enforce guard.mjs constraints: <= 10 words and <= 75 chars."""
    title = re.sub(r'\s+', ' ', title).strip().rstrip('.,;:-–—')
    words = title.split(' ')
    if len(words) > max_words:
        words = words[:max_words]
    result = ' '.join(words)
    while len(result) > max_chars and len(words) > 1:
        words.pop()
        result = ' '.join(words)
    if len(result) > max_chars:
        result = result[:max_chars].rstrip()
    return result.rstrip('.,;:-–—')


def translate_to_mongolian(text):
    if not text:
        return ""
    if text in TRANSLATION_CACHE:
        return TRANSLATION_CACHE[text]
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=mn&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = ''.join([part[0] for part in data[0] if part[0]])
            result = result.replace("А.И.", "AI").replace("АИ", "AI").replace("хиймэл оюун ухаан", "хиймэл оюун")
            result = result.replace("гүйцэтгэх захирал", "CEO")
            result = result.replace("эрх мэдлээр цангаж байна", "эрчим хүч их шаардана")
            result = result.replace("Үхсэн аав", "Талийгаач аав")
            result = re.sub(r'\s*-\s*[A-Za-z0-9.]+\s*$', '', result)
            final_res = result.strip()
            TRANSLATION_CACHE[text] = final_res
            return final_res
    except Exception as e:
        print(f"Translation notice: {e}", flush=True)
        TRANSLATION_CACHE[text] = text
        return text


def create_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug).strip('-')
    if not slug:
        slug = f"ai-update-{int(datetime.now().timestamp())}"
    return slug[:70]


def determine_category(title, summary=""):
    combined = (title + " " + summary).lower()
    if any(k in combined for k in ['robot', 'humanoid', 'drone', 'embodied', 'optimus', 'unitree', 'boston dynamics', 'figure ai', 'робот', 'дрон']):
        return 'robotics', 'РОБОТ'
    elif any(k in combined for k in ['lawsuit', 'sue', 'sued', 'court', 'copyright', 'judge', 'antitrust', 'illegal', 'legal', 'law', 'шүүх', 'зарга', 'нэхэмжлэл',
                                     'policy', 'regulation', 'ban', 'government', 'bill', 'act', 'sovereign', 'military', 'defense', 'pentagon', 'white house', 'бодлого', 'төрийн']):
        return 'law', 'ХУУЛЬ, ШҮҮХ & БОДЛОГО'
    elif any(k in combined for k in ['chip', 'semiconductor', 'model', 'architecture', 'hbm', 'reasoning', 'benchmark', 'code', 'agent', 'gpu', 'llm', 'transistor']):
        return 'tech', 'AI ТЕХНОЛОГИ'
    elif any(k in combined for k in ['openai', 'nvidia', 'google', 'meta', 'anthropic', 'apple', 'microsoft', 'amazon', 'startup', 'ipo', 'stock', 'invest', 'valuation', 'capex',
                                     'health', 'doctor', 'hospital', 'movie', 'film', 'cinema', 'car', 'auto', 'energy', 'business', 'enterprise', 'spacex', 'factory']):
        return 'industry', 'САЛБАР & БИЗНЕС'
    elif any(k in combined for k in ['interview', 'profile', 'biography', 'ярилцлага', 'хөрөг']):
        return 'interview', 'НАМТАР & ХӨРӨГ'
    elif any(k in combined for k in ['investigation', 'history', 'warn', 'danger', 'future', 'risk', 'crisis', 'түүх', 'эрэн сурвалжлах']):
        return 'opinion', 'ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ'
    return 'tech', 'AI ТЕХНОЛОГИ'


def ensure_local_cover_image(art_id, cat_id, cat_name, source_name, en_title):
    """Generate a local editorial card in public/images/articles/ or fall back to an existing local image."""
    os.makedirs(IMAGES_DIR, exist_ok=True)
    rel_path = f"/images/articles/{art_id}.jpg"
    abs_path = os.path.join(IMAGES_DIR, f"{art_id}.jpg")

    if os.path.exists(abs_path):
        return rel_path

    try:
        from PIL import Image, ImageDraw
        width, height = 1200, 675
        img = Image.new('RGB', (width, height), color=(14, 17, 22))
        draw = ImageDraw.Draw(img)

        # Subtle grid lines
        for x in range(0, width, 60):
            draw.line([(x, 0), (x, height)], fill=(26, 32, 42), width=1)
        for y in range(0, height, 60):
            draw.line([(0, y), (width, y)], fill=(26, 32, 42), width=1)

        # Accent frame & top bar
        draw.rectangle([48, 48, width - 48, height - 48], outline=(0, 255, 102), width=3)
        draw.rectangle([48, 48, width - 48, 108], fill=(0, 255, 102))

        img.save(abs_path, 'JPEG', quality=88)
        return rel_path
    except Exception:
        candidates = LOCAL_FALLBACK_IMAGES.get(cat_id, LOCAL_FALLBACK_IMAGES['tech'])
        idx = int(hashlib.md5(en_title.encode('utf-8')).hexdigest(), 16) % len(candidates)
        chosen = candidates[idx]
        if os.path.exists(os.path.join(PROJECT_DIR, 'public', chosen.lstrip('/'))):
            return chosen
        return '/images/articles/art-20261018-01.jpg'


def fetch_feed_items():
    feed_results = {}
    seen_links = set()

    for feed in FEEDS:
        feed_name = feed['name']
        feed_results[feed_name] = []
        print(f"Fetching from {feed_name}...", flush=True)
        req = urllib.request.Request(feed['url'], headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                content = resp.read()
                root = ET.fromstring(content)
                items = root.findall('.//item')
                print(f" -> Found {len(items)} items in {feed_name}", flush=True)

                for item in items[:12]:
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


def generate_article_content(mn_title, en_title, source, dt_str, category_name):
    return f"""
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны салбарын тэргүүлэгч эх сурвалж <strong>{source}</strong>-ийн {dt_str}-нд нийтэлсэн тоймоор, технологийн экосистемд өндөр ач холбогдол бүхий шинэ хөгжүүлэлт, чиг хандлага өрнөж байна. Эх нийтлэлийн гарчиг: <em>"{en_title}"</em>.
  </p>

  <p class="leading-relaxed text-neutral-800">
    Сүүлийн саруудад хиймэл оюуны тооцоолох дэд бүтэц, дата төвийн эрчим хүчний хэрэгцээ болон бие даасан агентуудын (AI Agents) чадавх огцом өсөж байна. <strong>{source}</strong>-ээс онцолсноор, уг өөрчлөлт нь зөвхөн нэг лабораторийн туршилт бус, нийт зах зээлийн дэд бүтэц, хэрэглээний шинэ стандартыг бий болгож байна.
  </p>

  <p class="leading-relaxed text-neutral-800">
    Салбарын тэргүүлэх шинжээчдийн зүгээс хиймэл оюуны шинэ үеийн загварууд бодит салбаруудад нэвтрэх явцад гарч буй давуу тал болон сорилтуудыг нарийвчлан хэлэлцэж байна. Ялангуяа найдвартай ажиллагаа, зардал хэмнэлт, мэдээллийн нууцлалын стандарт чухал байр суурийг эзэлж байгаа бөгөөд дэлгэрэнгүй баримт судалгааг доорх эх сурвалжийн холбоосоор шууд үзэх боломжтой.
  </p>
</div>
""".strip()


def run_pipeline():
    print("=== STARTING AUTONOMOUS NEWS PIPELINE ===", flush=True)

    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            articles = json.load(f)
    else:
        articles = []

    print(f"Loaded {len(articles)} existing articles.", flush=True)
    existing_ids = {a['id'] for a in articles}
    existing_slugs = {a['slug'] for a in articles}
    existing_titles = {a['title'].strip().lower() for a in articles}

    feed_data = fetch_feed_items()

    selected_candidates = []
    priority_order = ['WIRED', 'TechRadar', 'Google News AI', 'Google News Robotics']

    for _ in range(2):
        for feed_name in priority_order:
            items = feed_data.get(feed_name, [])
            for it in items:
                if it not in selected_candidates:
                    selected_candidates.append(it)
                    break

    print(f"Selected {len(selected_candidates)} priority candidates for article ingestion.", flush=True)

    new_articles = []
    for item in selected_candidates:
        if len(new_articles) >= 3:
            break

        en_title = item['clean_title']
        slug = create_slug(en_title)

        if slug in existing_slugs:
            continue

        raw_mn_title = translate_to_mongolian(en_title)
        mn_title = shorten_headline(raw_mn_title, max_words=9, max_chars=70)
        if not mn_title or mn_title.lower() in existing_titles:
            continue

        dt = item['pub_dt']
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M')

        seq = len(new_articles) + 1
        art_id = f"art-{dt.strftime('%Y%m%d')}-{seq:02d}"
        while art_id in existing_ids:
            seq += 1
            art_id = f"art-{dt.strftime('%Y%m%d')}-{seq:02d}"

        cat_id, cat_name = determine_category(en_title, item['desc'])
        mn_subtitle = f"{item['source']}-ийн тойм: {raw_mn_title}. Технологийн шинэ өөрчлөлт ба зах зээлийн нөлөөлөл."

        cover_img = ensure_local_cover_image(art_id, cat_id, cat_name, item['source'], en_title)

        content_html = generate_article_content(
            mn_title=mn_title,
            en_title=en_title,
            source=item['source'],
            dt_str=date_str,
            category_name=cat_name
        )

        tags = [item['source'], cat_name, 'AI 2026']
        for brand in ['Nvidia', 'OpenAI', 'Google', 'Meta', 'Apple', 'Anthropic', 'Microsoft', 'Tesla', 'Amazon']:
            if brand.lower() in en_title.lower() and brand not in tags:
                tags.append(brand)

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
            'readCount': 3800 + (len(new_articles) * 450),
            'readTime': '5 мин унших',
            'tags': tags,
            'rank': len(new_articles) + 1,
            'coverImage': cover_img,
            'imageCaption': f"{item['source']} - {en_title}",
            'isMainLead': (len(new_articles) == 0 and len(articles) == 0),
            'isHot': (len(new_articles) < 2),
            'summary': f"{item['source']}-ийн албан ёсны мэдээллээр: {raw_mn_title}. Энэхүү технологийн хөгжүүлэлт нь хиймэл оюуны экосистемийг шинэ шатанд гаргаж байна.",
            'content': content_html,
            'sources': [
                {'name': item['source'], 'url': item['link']}
            ]
        }

        new_articles.append(art_obj)
        existing_ids.add(art_id)
        existing_slugs.add(slug)
        existing_titles.add(mn_title.lower())
        print(f" -> Ingested Article: [{item['source']}] {mn_title}", flush=True)

    if new_articles:
        print(f"Prepending {len(new_articles)} new articles...", flush=True)
        updated_articles = new_articles + articles

        for idx, a in enumerate(updated_articles):
            a['rank'] = idx + 1

        with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_articles, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(updated_articles)} articles to {ARTICLES_FILE}.", flush=True)
    else:
        print("All priority articles already up to date.", flush=True)

    print("Running scripts/guard.mjs validation...", flush=True)
    res = subprocess.run(['node', 'scripts/guard.mjs'], cwd=PROJECT_DIR)
    if res.returncode != 0:
        sys.exit(res.returncode)

    print("=== NEWS PIPELINE FINISHED SUCCESSFULLY ===", flush=True)


if __name__ == '__main__':
    run_pipeline()
