#!/usr/bin/env python3
"""Audit and spellcheck articles and live_wire data using mn-spell.

Usage:
    python3 scripts/audit_mn_spell.py [--fix]
"""

import json
import os
import re
import sys
import urllib.request
from pathlib import Path

API_URL = "https://utga.guru/api/spell"


def get_api_key():
    if os.environ.get("MN_SPELL_KEY"):
        return os.environ["MN_SPELL_KEY"]
    env_file = os.path.expanduser("~/Desktop/API KEYS/shared.env")
    if os.path.exists(env_file):
        m = re.search(r"^MN_SPELL_KEY=(\S+)", open(env_file, encoding="utf-8").read(), re.M)
        if m:
            return m.group(1)
    sys.exit("Error: MN_SPELL_KEY not found in environment or ~/Desktop/API KEYS/shared.env")


def check_words_batch(words, api_key, suggest_count=5):
    req = urllib.request.Request(
        API_URL,
        data=json.dumps({"words": list(words), "suggest": suggest_count}).encode("utf-8"),
        headers={"Content-Type": "application/json", "x-spell-key": api_key},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    api_key = get_api_key()
    base_dir = Path(__file__).resolve().parent.parent
    articles_path = base_dir / "src/data/articles.json"
    live_wire_path = base_dir / "src/data/live_wire.json"

    with open(articles_path, encoding="utf-8") as f:
        articles = json.load(f)

    with open(live_wire_path, encoding="utf-8") as f:
        live_wire = json.load(f)

    print(f"Loaded {len(articles)} articles and {len(live_wire)} live wire items.")

    # Collect all words from articles and live wire
    # Cyrillic words regex: [А-ЯЁӨҮа-яёөү]+(?:[-‐][А-ЯЁӨҮа-яёөү]+)*
    word_pattern = re.compile(r"[А-ЯЁӨҮа-яёөү]+(?:[-‐][А-ЯЁӨҮа-яёөү]+)*")

    # Map word -> list of locations (article_id, field)
    word_locations = {}

    def index_text(text, location):
        if not text:
            return
        for m in word_pattern.finditer(text):
            idx = m.start()
            # If word is preceded by hyphen from non-Cyrillic (e.g. GPT-ийн), skip suffix
            if idx > 0 and text[idx - 1] in "-‐–":
                if idx > 1 and not re.match(r"[А-ЯЁӨҮа-яёөү\s]", text[idx - 2]):
                    continue
            w = m.group(0)
            if w not in word_locations:
                word_locations[w] = []
            if location not in word_locations[w]:
                word_locations[w].append(location)

    for a in articles:
        aid = a.get("id")
        index_text(a.get("title", ""), f"article:{aid}:title")
        index_text(a.get("subtitle", ""), f"article:{aid}:subtitle")
        index_text(a.get("summary", ""), f"article:{aid}:summary")
        index_text(a.get("imageCaption", ""), f"article:{aid}:imageCaption")
        index_text(a.get("content", ""), f"article:{aid}:content")

    for i, item in enumerate(live_wire):
        index_text(item.get("title", ""), f"live_wire:{i}:title")

    all_unique_words = sorted(list(word_locations.keys()))
    print(f"Total unique Cyrillic words to check: {len(all_unique_words)}")

    # Batch check in chunks of 250
    chunk_size = 250
    bad_words = {}
    for i in range(0, len(all_unique_words), chunk_size):
        chunk = all_unique_words[i : i + chunk_size]
        res = check_words_batch(chunk, api_key)
        for r in res.get("results", []):
            if not r.get("ok"):
                bad_words[r["word"]] = {
                    "suggestions": r.get("suggestions", []),
                    "fix": r.get("fix"),
                    "locations": word_locations.get(r["word"], []),
                }
        print(f"Checked {min(i + chunk_size, len(all_unique_words))}/{len(all_unique_words)} words... ({len(bad_words)} flagged)")

    print(f"\n================ AUDIT SUMMARY ================")
    print(f"Flagged {len(bad_words)} words out of {len(all_unique_words)} unique words.")

    # Save flagged report
    report_file = base_dir / "scripts/audit_report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(bad_words, f, ensure_ascii=False, indent=2)
    print(f"Detailed report saved to {report_file}")


if __name__ == "__main__":
    main()
