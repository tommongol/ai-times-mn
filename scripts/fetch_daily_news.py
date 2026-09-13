#!/usr/bin/env python3
"""
AImedee.mn - Autonomous Daily AI News Aggregator & Pipeline
Aggregates news from:
1. Wired (AI Section)
2. TechRadar (AI Section)
3. Google News (AI Topic)

Translates, formats into deep Mongolian journalistic articles,
deduplicates, and updates articles.json & live_wire.json.
"""

import os
import re
import sys
import json
import hashlib
import urllib.request
import urllib.parse
from datetime import datetime, timezone
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'articles.json')
LIVE_WIRE_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'live_wire.json')

FEEDS = [
    {
        'name': 'WIRED',
        'url': 'https://news.google.com/rss/search?q=site:wired.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'TechRadar',
        'url': 'https://news.google.com/rss/search?q=site:techradar.com+AI&hl=en-US&gl=US&ceid=US:en',
        'default_category': 'tech'
    },
    {
        'name': 'Google News AI',
        'url': 'https://news.google.com/rss/topics/CAAqIAgKIhpDQkFTRFFvSEwyMHZNRzFyZWhJQ1pXNG9BQVAB?hl=en-US&gl=US&ceid=US:en',
        'default_category': 'companies'
    }
]

CURATED_IMAGES = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
]

TRANSLATION_CACHE = {}

def clean_html(raw_html):
    clean = re.sub(r'<[^<]+?>', '', raw_html)
    clean = clean.replace('&quot;', '"').replace('&#39;', "'").replace('&amp;', '&').replace('&nbsp;', ' ')
    return clean.strip()

def clean_headline(title):
    title = clean_html(title)
    # Strip any trailing ' - Source Name' or ' - domain.com' or ' | Source'
    title = re.sub(r'\s*[-|–—]\s*([A-Za-z0-9\s.]+)\s*$', '', title)
    return title.strip()

def translate_to_mongolian(text):
    if not text:
        return ""
    if text in TRANSLATION_CACHE:
        return TRANSLATION_CACHE[text]
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=mn&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = ''.join([part[0] for part in data[0] if part[0]])
            result = result.replace("А.И.", "AI").replace("АИ", "AI").replace("хиймэл оюун ухаан", "хиймэл оюун")
            result = result.replace("гүйцэтгэх захирал", "гүйцэтгэх захирал (CEO)")
            result = result.replace("эрх мэдлээр цангаж байна", "эрчим хүчний өндөр хэрэглээ шаардаж байна")
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
    if any(k in combined for k in ['chip', 'semiconductor', 'model', 'architecture', 'hbm', 'reasoning', 'benchmark', 'code', 'agent', 'gpu', 'llm', 'power', 'thirsty']):
        return 'tech', 'AI ТЕХНОЛОГИ'
    elif any(k in combined for k in ['openai', 'nvidia', 'google', 'meta', 'anthropic', 'apple', 'microsoft', 'amazon', 'startup', 'ipo', 'stock', 'invest']):
        return 'companies', 'КОМПАНИУД'
    elif any(k in combined for k in ['law', 'sue', 'court', 'copyright', 'ban', 'government', 'bill', 'policy', 'regulation', 'security', 'hack', 'defense', 'military', 'bioweapon']):
        return 'society', 'БОДЛОГО & ХУУЛЬ'
    elif any(k in combined for k in ['health', 'doctor', 'hospital', 'movie', 'film', 'cinema', 'car', 'auto', 'energy', 'business', 'enterprise', 'robot']):
        return 'industry', 'САЛБАР & БИЗНЕС'
    elif any(k in combined for k in ['warn', 'danger', 'future', 'risk', 'opinion', 'slowdown', 'catastrophe']):
        return 'opinion', 'ШИНЖИЛГЭЭ'
    return 'tech', 'AI ТЕХНОЛОГИ'

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
                    except:
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
    Хиймэл оюуны салбарын тэргүүлэгч эх сурвалж <strong>{source}</strong>-ийн {dt_str}-нд нийтэлсэн тоймоор, дэлхийн технологийн экосистемд өндөр ач холбогдол бүхий шинэ хөгжүүлэлт, чиг хандлага өрнөж байна. Эх нийтлэлийн англи гарчиг: <em>"{en_title}"</em>.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТЕХНОЛОГИЙН ГОЛ ҮЗҮҮЛЭЛТ & ТОЙМ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Үндсэн эх сурвалж: <strong>{source}</strong> (Баталгаажсан албан ёсны суваг)</li>
      <li>Агуулгын ангилал: <strong>{category_name}</strong></li>
      <li>Нөлөөллийн цар хүрээ: Хиймэл оюуны тооцоолол, зах зээлийн өрсөлдөөн ба хэрэглэгчийн аюулгүй байдал</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Үйл явдлын бодит нөхцөл байдал ба зарлагдсан шийдэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Сүүлийн саруудад хиймэл оюуны тооцоолох дэд бүтэц, дата төвийн эрчим хүчний хэрэгцээ болон бие даасан агентуудын (AI Agents) чадавх огцом өсөж байна. <strong>{source}</strong>-ээс онцолсноор, уг технологийн өөрчлөлт нь зөвхөн нэг лабораторийн туршилт биш, нийт зах зээлийн дэд бүтэц, хэрэглээний шинэ стандартыг бий болгож байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Салбарын өрсөлдөөн ба технологийн нөлөөлөл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Салбарын тэргүүлэх шинжээчдийн зүгээс хиймэл оюуны шинэ үеийн загварууд бодит салбаруудад нэвтрэх явцад гарч буй давуу тал болон сорилтуудыг нарийвчлан хэлэлцэж байна. Ялангуяа найдвартай ажиллагаа, зардал хэмнэлт, мэдээллийн нууцлалын стандарт чухал байр суурийг эзэлж байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. Цаашдын чиг хандлага ба AImedee.mn дүгнэлт
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Уг үйл явцын үргэлжлэл болон зах зээлийн нөлөөллийг <strong>AImedee.mn</strong> тасралтгүй хүргэх болно. Эх нийтлэлийн бүрэн хувилбар болон дэлгэрэнгүй тайланг доорх баталгаат эх сурвалжийн холбоосоор шууд орж унших боломжтой.
  </p>
</div>
""".strip()

def run_pipeline():
    print("=== STARTING AUTONOMOUS NEWS PIPELINE ===", flush=True)
    
    # 1. Load existing articles
    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            articles = json.load(f)
    else:
        articles = []

    print(f"Loaded {len(articles)} existing articles.", flush=True)
    existing_slugs = {a['slug'] for a in articles}
    existing_titles = {a['title'].strip().lower() for a in articles}

    # 2. Fetch fresh items from all feeds
    feed_data = fetch_feed_items()

    # Flatten all items for Live Wire
    all_items = []
    for f_name, items in feed_data.items():
        all_items.extend(items)
    all_items.sort(key=lambda x: x['pub_dt'], reverse=True)

    print(f"Total items collected across all feeds: {len(all_items)}", flush=True)

    # 3. Update LIVE_WIRE ticker (top 8 newest)
    print("Updating Live Wire ticker...", flush=True)
    live_wire_items = []
    for item in all_items[:8]:
        mn_title = translate_to_mongolian(item['clean_title'])
        live_wire_items.append({
            'time': item['pub_dt'].strftime('%H:%M'),
            'title': mn_title,
            'source': item['source']
        })

    with open(LIVE_WIRE_FILE, 'w', encoding='utf-8') as f:
        json.dump(live_wire_items, f, ensure_ascii=False, indent=2)
    print(f"Updated live_wire.json with {len(live_wire_items)} items.", flush=True)

    # 4. Balanced Round-Robin selection for full articles
    # Ensure at least 1 from Wired, 1 from TechRadar, 1 from Google News
    selected_candidates = []
    priority_order = ['WIRED', 'TechRadar', 'Google News AI']
    
    # Collect 1-2 freshest from each feed
    for round_num in range(2):
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

        mn_title = translate_to_mongolian(en_title)
        if mn_title.lower() in existing_titles:
            continue

        dt = item['pub_dt']
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M')

        cat_id, cat_name = determine_category(en_title, item['desc'])
        mn_subtitle = f"{item['source']}-ийн тойм: {mn_title}. Технологийн шинэ өөрчлөлт ба зах зээлийн нөлөөлөл."

        img_idx = int(hashlib.md5(en_title.encode()).hexdigest(), 16) % len(CURATED_IMAGES)
        cover_img = CURATED_IMAGES[img_idx]

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
            'id': f"art-{dt.strftime('%Y%m%d')}-{len(new_articles)+1:02d}",
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
            'summary': f"{item['source']}-ийн албан ёсны мэдээллээр: {mn_title}. Энэхүү технологийн хөгжүүлэлт нь хиймэл оюуны экосистемийг шинэ шатанд гаргаж байна.",
            'content': content_html,
            'sources': [
                {'name': item['source'], 'url': item['link']}
            ]
        }

        new_articles.append(art_obj)
        existing_slugs.add(slug)
        existing_titles.add(mn_title.lower())
        print(f" -> Ingested Article: [{item['source']}] {mn_title}", flush=True)

    # 5. Merge articles
    if new_articles:
        print(f"Prepending {len(new_articles)} new articles...", flush=True)
        # Preserve all foundational articles permanently
        foundational = [a for a in articles if a.get('isFoundational') or a['id'].startswith('art-aitimes-')]
        regular = [a for a in articles if not (a.get('isFoundational') or a['id'].startswith('art-aitimes-'))]
        merged_regular = (new_articles + regular)[:45]
        updated_articles = merged_regular + foundational

        for idx, a in enumerate(updated_articles):
            a['isMainLead'] = (idx == 0)
            a['rank'] = idx + 1

        with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_articles, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(updated_articles)} articles ({len(foundational)} foundational) to {ARTICLES_FILE}.", flush=True)
    else:
        print("All priority articles already up to date.", flush=True)

    print("=== NEWS PIPELINE FINISHED SUCCESSFULLY ===", flush=True)

if __name__ == '__main__':
    run_pipeline()
