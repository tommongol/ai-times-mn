#!/usr/bin/env python3
"""Apply only precise, verified spelling and terminology fixes
based on 2018 toli.gov.mn (Журамласан толь) and bolor-toli standard.
Does NOT alter proper names or natural words.
"""

import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ARTICLES_FILE = BASE_DIR / "src/data/articles.json"

TARGETED_FIXES = [
    # 1. Undisputed spelling fixes verified by toli.gov.mn
    (r"\bАВАЙРГА\b", "АВАРГА"),
    (r"\bСӨРӨГЛДӨӨН\b", "СӨРГӨЛДӨӨН"),
    (r"\bтүвшинг\b", "түвшнийг"),
    (r"\bорчинг\b", "орчныг"),
    (r"\bзурагнуудаас\b", "зургуудаас"),
    (r"\bоношлогооны\b", "оношилгооны"),
    (r"\bонилсоны\b", "онилсны"),
    (r"\bкорпораци\b", "корпорац"),
    (r"\bкорпорацийн\b", "корпорацын"),
    (r"\bкорпорацид\b", "корпорацад"),
    (r"\bкорпорациуд\b", "корпорацууд"),
    (r"\bквантчилалаар\b", "квантчиллаар"),
    (r"\bквантчилалын\b", "квантчиллын"),
    (r"\bКвантчилалын\b", "Квантчиллын"),
    (r"\bкодчилолоор\b", "кодчиллоор"),
    (r"\bкомманд\b", "команд"),
    (r"\bкоммандыг\b", "командыг"),
    (r"\bпрограм\b", "программ"),
    (r"\bПрограм\b", "Программ"),
    (r"\bпрограмын\b", "программын"),
    (r"\bпрограмчдын\b", "программчдын"),
    (r"\bбанкууд\b", "банкнууд"),
    (r"\bэссэ\b", "эссе"),
    (r"\bэссэг\b", "эссег"),
    (r"\bхичнээн\b", "хэчнээн"),
    (r"\bсурвалжлага\b", "сурвалжилга"),
    (r"\bсурвалжлагаар\b", "сурвалжилгаар"),
    (r"\bСУРВАЛЖЛАГА\b", "СУРВАЛЖИЛГА"),
    (r"\bСУРВАЛЖЛАГЫН\b", "СУРВАЛЖИЛГЫН"),
    (r"\bчипийн\b", "чипний"),
    (r"\bчипүүд\b", "чипнүүд"),
    (r"\bчипүүдийг\b", "чипнүүдийг"),
    (r"\bчипүүдийн\b", "чипнүүдийн"),
    (r"\bсуперчипүүдээр\b", "супер чипнүүдээр"),
    (r"\bхэлүүд\b", "хэлнүүд"),
    (r"\bхатингарших\b", "хатангирших"),
    (r"\bнугаларалтын\b", "нугаралтын"),
    (r"\bшоунаас\b", "шоуноос"),
    (r"\bзасч\b", "засаж"),
    (r"\bөсч\b", "өсөж"),
    (r"\bөсчээ\b", "өсжээ"),
    (r"\bгадны\b", "гаднын"),
    (r"\bнарийн зааварчилгааг\b", "нарийвчилсан зааврыг"),
    (r"\bхятад-сингапур\b", "Хятад-Сингапур"),
    (r"\bгрек-кипр\b", "Грек-Кипр"),

    # 2. Standardized AI technical terminology (English)
    (r"\bфронтир загвар\b", "Frontier загвар"),
    (r"\bфронтир загваруудтай\b", "Frontier загваруудтай"),
    (r"\bфронтир загваруудыг\b", "Frontier загваруудыг"),
    (r"\bфронтируудтай\b", "Frontier загваруудтай"),
    (r"\bфронтируудыг\b", "Frontier загваруудыг"),
    (r"\bфронтир\b", "Frontier"),
    (r"\bмультимодал\b", "Multimodal"),
    (r"\bжетонтой\b", "token-той"),
    (r"\bжетоны\b", "token-ы"),
    (r"\bжетон\b", "token"),
    (r"\bтокены\b", "token-ы"),
    (r"\bтокен\b", "token"),
    (r"\bчатботоос\b", "chatbot-оос"),
    (r"\bчатботуудыг\b", "chatbot-уудыг"),
    (r"\bчатботыг\b", "chatbot-ыг"),
    (r"\bчатбот\b", "chatbot"),
    (r"\bэксплойт\b", "exploit"),
    (r"\bсуперкластер\b", "supercluster"),
    (r"\bсуперкомпьютерийн\b", "supercomputer-ийн"),
]


def apply_fixes(text):
    if not text:
        return text
    for pattern, replacement in TARGETED_FIXES:
        text = re.sub(pattern, replacement, text)
    return text


def main():
    print(f"Reading {ARTICLES_FILE}...")
    with open(ARTICLES_FILE, encoding="utf-8") as f:
        articles = json.load(f)

    fields = ["title", "subtitle", "summary", "imageCaption", "content"]
    modified = 0

    for a in articles:
        changed = False
        for field in fields:
            if field in a and a[field]:
                old_val = a[field]
                new_val = apply_fixes(old_val)
                if new_val != old_val:
                    a[field] = new_val
                    changed = True
        if changed:
            modified += 1

    print(f"Applied verified fixes to {modified}/{len(articles)} articles.")

    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print("Saved clean, verified articles.json.")


if __name__ == "__main__":
    main()
