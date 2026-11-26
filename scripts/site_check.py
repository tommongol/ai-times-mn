#!/usr/bin/env python3
"""Амьд сайтын эрүүл мэндийн шалгалт: гол хуудсууд нээгдэж, sitemap бүтэн, мэдээ шинэчлэгдэж байгаа эсэх.

GitHub Actions (.github/workflows/site-check.yml) өдөрт хэд ажиллуулна. Алдаа гарвал 1-ээр гарч,
GitHub эзэнд имэйлээр мэдэгдэнэ. Зөвхөн уншина, юу ч өөрчлөхгүй.
"""
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

SITE = "https://ai.mongol.guru"
MAX_NEWS_AGE = timedelta(days=4)  # мэдээний урсгал 4 хоног зогсвол мэдэгдэнэ
problems = []


def fetch(path):
    req = urllib.request.Request(SITE + path, headers={"User-Agent": "ai-mongolia-site-check"})
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return res.status, res.read().decode("utf-8", "replace")
    except Exception as exc:  # 4xx/5xx болон сүлжээний алдаа
        return getattr(exc, "code", 0), str(exc)


def expect(path, needle, label):
    status, body = fetch(path)
    if status != 200:
        problems.append(f"{label}: {path} -> HTTP {status}")
    elif needle not in body:
        problems.append(f"{label}: {path} дотор «{needle}» алга")
    return body if status == 200 else ""


expect("/", "MONGOLIA", "Нүүр хуудас")
expect("/bulan/tech", 'href="/article/', "Булангийн хуудас")
expect("/robots.txt", "Sitemap:", "robots.txt")

sitemap = expect("/sitemap.xml", "<urlset", "Sitemap")
articles = re.findall(r"<loc>([^<]+/article/[^<]+)</loc>", sitemap)
if sitemap and len(articles) < 100:
    problems.append(f"Sitemap: нийтлэлийн хаяг ердөө {len(articles)} байна")
if articles:
    path = articles[0].replace(SITE, "")
    expect(path, "application/ld+json", "Хамгийн шинэ нийтлэл")

rss = expect("/rss.xml", "<rss", "RSS")
dates = re.findall(r"<pubDate>([^<]+)</pubDate>", rss)
if rss and not dates:
    problems.append("RSS: нийтлэл алга")
elif dates:
    newest = max(parsedate_to_datetime(d) for d in dates)
    age = datetime.now(timezone.utc) - newest
    if age > MAX_NEWS_AGE:
        problems.append(f"Мэдээ шинэчлэгдээгүй {age.days} хоног боллоо (сүүлийн нийтлэл {newest:%Y-%m-%d})")

if problems:
    print("САЙТЫН ШАЛГАЛТ УНАЛАА:")
    for p in problems:
        print(" -", p)
    sys.exit(1)
print(f"Сайт хэвийн: {len(articles)} нийтлэл sitemap-д, RSS-д {len(dates)} нийтлэл.")
