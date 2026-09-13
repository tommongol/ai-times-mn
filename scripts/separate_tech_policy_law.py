import json

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

for a in articles:
    cat = a.get('category', '')
    title_lower = (a.get('title', '') + ' ' + a.get('summary', '')).lower()
    
    # Check if this belongs to LAW
    if any(k in title_lower for k in ['шүүх', 'зарга', 'нэхэмжлэл', 'хууль зөрчсөн', 'хуйвалдааны хууль', 'fair use', 'зохиогчийн эрх', 'хэрэглэгчийн эрх', 'торгууль', 'хориглов', 'хориглох']):
        if cat in ['society', 'opinion', 'tech']:
            a['category'] = 'law'
            a['categoryName'] = 'ХУУЛЬ & ШҮҮХ'
    # Check if this belongs to POLICY
    elif any(k in title_lower for k in ['бодлого', 'ai act', 'трамп', 'бүрэн эрхт', 'соверен', 'пэнтагон', 'цэрэг', 'геополитик', 'стратеги']):
        if cat in ['society', 'opinion', 'tech']:
            a['category'] = 'policy'
            a['categoryName'] = 'БОДЛОГО'
    elif a['id'] == 'art-society-eu-ai-act-gpai-deadlines':
        a['category'] = 'policy'
        a['categoryName'] = 'БОДЛОГО'
    elif a['id'] == 'art-society-sovereign-ai-geopolitics':
        a['category'] = 'policy'
        a['categoryName'] = 'БОДЛОГО'
    elif a['id'] == 'art-aitimes-military-ai-us-china':
        a['category'] = 'policy'
        a['categoryName'] = 'БОДЛОГО'
    elif a['id'] == 'art-20260913-01':
        a['category'] = 'policy'
        a['categoryName'] = 'БОДЛОГО'

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print("Updated articles.json with distinct 'tech', 'policy', and 'law' categories.")
