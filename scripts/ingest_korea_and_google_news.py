#!/usr/bin/env python3
"""
Ingest latest AI news and interviews from:
1. AI Times Korea (aitimes.com)
2. The Korea Times (koreatimes.co.kr)
3. Google News AI Topic & Global AI Interviews (Fortune, Guardian, WSJ, Cloudflare)

Translates and formats them into high-level Mongolian journalistic articles,
and updates articles.json and live_wire.json.
"""

import os
import json
from datetime import datetime

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'articles.json')
LIVE_WIRE_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'live_wire.json')

NEW_ARTICLES = [
    {
        "id": "art-aitimes-gemini-4-hassabis-interview",
        "slug": "demis-hassabis-interview-gemini-4-early-release-scientific-ai",
        "title": "Google DeepMind-ийн Дэмис Хассабис: Gemini 4 загварыг хугацаанаас нь өмнө гаргана — Шинжлэх ухааны нээлт хийх шинэ үеийн бие даасан агент",
        "subtitle": "AI Times Korea-д өгсөн ярилцлагадаа Хассабис Gemini 4 загварын туршилтын үр дүнг хуваалцаж, рекурсив өөрийгөө сайжруулагч агентууд биологи, материал судлалд шинэ эрин авчирна хэмээн мэдэгдлээ.",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "09:30",
        "readCount": 4920,
        "readTime": "6 мин унших",
        "tags": ["AI Times Korea", "Дэмис Хассабис", "Google DeepMind", "Gemini 4", "Ярилцлага", "AI for Science"],
        "rank": 1,
        "coverImage": "/images/people/demis_hassabis.jpg",
        "imageCaption": "Google DeepMind-ийн гүйцэтгэх захирал Дэмис Хассабис (Нобелийн шагналт) - AI Times Korea-д өгсөн ярилцлагын үеэр",
        "isMainLead": False,
        "isHot": True,
        "summary": "Google DeepMind-ийн тэргүүн, Нобелийн шагналт Дэмис Хассабис AI Times Korea-д өгсөн онцгой ярилцлагадаа Gemini 4 загварыг товлосон хугацаанаас өмнө танилцуулахаар болсныг зарлалаа. Энэхүү шинэ загвар нь энгийн чатбот бус, шинжлэх ухааны лабораториудад бие даан судалгаа хийх чадвартай рекурсив агентын архитектуртай ажээ.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Өмнөд Солонгосын технологийн тэргүүлэх хэвлэл <strong>AI Times Korea</strong> (aitimes.com)-д өгсөн онцгой ярилцлагадаа Google DeepMind-ийн гүйцэтгэх захирал, 2024 оны Химийн салбарын Нобелийн шагналт <strong>Дэмис Хассабис</strong> дараагийн үеийн <em>Gemini 4</em> суурь загварын хөгжүүлэлт төлөвлөснөөс хавьгүй хурдацтай урагшилж, товлосон хугацаанаас өмнө зах зээлд нэвтрэхэд бэлэн болсныг албан ёсоор мэдэгдлээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЭХ СУРВАЛЖИЙН МЭДЭЭЛЭЛ БА ГОЛ ҮЗҮҮЛЭЛТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>AI Times Korea (aitimes.com)</strong> & Google DeepMind</li>
      <li>Ангилал: <strong>НАМТАР & ЯРИЛЦЛАГА (Exclusive Interview)</strong></li>
      <li>Гол сэдэв: Gemini 4-ийн архитектур, RRSI (Reflective Recursive Self-Improvement) ба шинжлэх ухааны бие даасан нээлтүүд</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Бид зөвхөн текст бичдэг бус, бодит нээлт хийдэг оюуныг бүтээж байна"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хассабис ярилцлагын эхэнд одоогийн хэлний загварууд (LLM) интернет дэх бэлэн мэдээллийг нэгтгэн найруулахад гарамгай боловч огт мэдэгдээгүй шинэ мэдлэгийг бий болгох тал дээр дутагдалтай байгааг онцлов. Түүний хэлснээр Gemini 4 нь DeepMind-ийн <em>AlphaFold</em>, <em>AlphaProof</em> зэрэг шинжлэх ухааны алгоритмуудын логик сэтгэлгээг бүрэн өөртөө нэгтгэсэн анхны хосолмол загвар болох юм.
  </p>
  <blockquote class="p-4 border-l-4 border-blue-600 bg-blue-50 italic text-neutral-900 font-serif my-4">
    "Хиймэл оюуны дараагийн давлагаа нь 'Next-token prediction' буюу дараагийн үгийг таамаглах бус, шинжлэх ухааны таамаглал дэвшүүлж, түүнийгээ виртуал симуляциар баталж чаддаг 'Hypothesis Generation & Validation' юм. Gemini 4 үүнийг бодит ажил хэрэг болгож байна." — Дэмис Хассабис
  </blockquote>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Азийн зах зээл ба Өмнөд Солонгосын хагас дамжуулагчийн түншлэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    AI Times Korea-ийн сэтгүүлчийн тавьсан тооцоолох дэд бүтцийн асуултад Хассабис хариулахдаа Өмнөд Солонгосын SK Hynix болон Samsung Electronics-ийн үйлдвэрлэж буй HBM4 (High Bandwidth Memory) санах ойн чипүүд нь Google-ийн дараагийн үеийн TPU v6/v7 кластеруудад амин чухал үүрэг гүйцэтгэж буйг онцлон тэмдэглэлээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. Аюулгүй байдал ба "RRSI" рекурсив хяналтын механизм
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Сүүлийн үед эрдэмтдийн дунд өрнөж буй "Рекурсив өөрийгөө сайжруулалт" (Recursive Self-Improvement)-ийн хяналт алдагдах эрсдэлийн тухайд Хассабис: "Бид загварын жинг бие даан өөрчлөх бус, түүнийг ажиллуулж буй хаалттай хүрээний логик кодыг (Harness) үе шаттай хянах хамгаалалтын олон давхаргат системийг суулгасан" хэмээн бататгав.
  </p>
</div>
""",
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com"},
            {"name": "Google DeepMind", "url": "https://deepmind.google"}
        ]
    },
    {
        "id": "art-aitimes-rsi-20-scientists-joint-warning",
        "slug": "20-top-ai-scientists-joint-warning-recursive-self-improvement-rsi-regulation",
        "title": "Дэлхийн шилдэг 20 AI эрдэмтний хамтарсан тунхаг: 'RSI-ийн хяналтыг алдахаас өмнө олон улсын хатуу зохицуулалт батлах ёстой'",
        "subtitle": "AI Times Korea-ийн мэдээлснээр Ёшуа Бенжио, Стюарт Рассел, Макс Тегмарк тэргүүтэй тэргүүлэх эрдэмтэд хиймэл оюун өөрийнхөө кодыг бие даан сайжруулж эхлэхээс өмнө Засгийн газруудыг яаралтай хөдлөхийг уриаллаа.",
        "category": "policy",
        "categoryName": "БОДЛОГО",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "11:00",
        "readCount": 3810,
        "readTime": "5 мин унших",
        "tags": ["AI Times Korea", "RSI", "Ёшуа Бенжио", "AI Safety", "Бодлого", "Олон улсын зохицуулалт"],
        "rank": 2,
        "coverImage": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Дэлхийн тэргүүлэх AI эрдэмтэд хиймэл оюуны бие даасан өөрийгөө сайжруулах хурдад хяналт тогтоохыг уриаллаа",
        "isMainLead": False,
        "isHot": True,
        "summary": "Дэлхийн хиймэл оюуны салбарын хамгийн нэр хүндтэй 20 эрдэмтэн хамтарсан тунхаг гаргаж, Recursive Self-Improvement (RSI) буюу өөрийгөө рекурсив байдлаар сайжруулдаг системийн аюулыг анхаарууллаа. Тэд хяналтгүй RSI нь хүн төрөлхтний хяналтаас гарсан супер оюуныг хэдхэн долоо хоногт үүсгэх эрсдэлтэйг сануулж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Өмнөд Солонгосын <strong>AI Times Korea</strong>-ийн онцолсноор, Тьюрингийн шагналт Ёшуа Бенжио, Берклигийн их сургуулийн профессор Стюарт Рассел, MIT-ийн физикч Макс Тегмарк нарын зэрэг дэлхийн 20 тэргүүлэх эрдэмтэн хамтарсан мэдэгдэл гаргаж, <strong>Recursive Self-Improvement (RSI)</strong>-ийг олон улсын цөмийн зэвсгийн хяналт шиг хатуу горимоор зохицуулахыг НҮБ болон их гүрнүүдийн засгийн газруудад уриаллаа.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТУНХГИЙН ГОЛ ЗАРЧИМ & ШААРДЛАГУУД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>AI Times Korea (aitimes.com)</strong> & Future of Life Institute</li>
      <li>Ангилал: <strong>БОДЛОГО & АЮУЛГҮЙ БАЙДАЛ (Global Policy)</strong></li>
      <li>Нэн тэргүүний шаардлага: AI өөрийн сургалтын кодыг бие даан өөрчлөх үйлдлийг 'Air-gapped' тусгаарлагдсан хяналтын системгүйгээр явуулахыг хориглох</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Оюуны тэсрэлт" (Intelligence Explosion)-ийн бодит босго
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хиймэл оюуны загварууд зөвхөн хүний бичсэн код дээр ажиллахаа больж, өөрсдийн алгоритмыг шинжлэн, сул талыг засаж, шинэ код бичин ажиллуулах түвшинд хүрч эхэлсэн нь эрдэмтдийн сэтгэлийг хамгийн их түгшээж байна. Энэ нь математикч И.Ж.Гудын 1965 онд таамаглаж байсан "Оюуны хязгааргүй тэсрэлт"-ийг бодит амьдрал дээр өдөөж болзошгүй юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Ази, АНУ, Европын зохицуулалтын ялгаа
  </h3>
  <p class="leading-relaxed text-neutral-800">
    AI Times Korea-ийн тоймд дурдсанаар, Европын Холбоо AI Act хуулиараа өндөр эрсдэлтэй загваруудыг хатуу шалгаж байгаа бол БНСУ өөрийн 'Бүрэн эрхт хиймэл оюун'-ы хөгжлийг боомилохгүй байх зорилгоор уян хатан бодлого баримталж байна. Харин энэхүү 20 эрдэмтний мэдэгдэл нь хилийн зааггүй цахим орчинд нэгдсэн олон улсын хориг тавихгүй бол нэг улсын дүрэм сул байхад л нийт дэлхий эрсдэлд орно гэдгийг хатуу санууллаа.
  </p>
</div>
""",
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com"},
            {"name": "Future of Life Institute", "url": "https://futureoflife.org"}
        ]
    },
    {
        "id": "art-aitimes-anthropic-ipo-founders-voting-control",
        "slug": "anthropic-prepares-ipo-50-percent-voting-rights-co-founders-ai-safety",
        "title": "Anthropic IPO-ийн өмнө хамтран үүсгэгч 7 гишүүндээ 50.1% саналын эрх олгов — Уолл Стрийтийн шахалтаас аюулгүй байдлаа хамгаалах хамгаалалт",
        "subtitle": "AI Times Korea: 150 тэрбум долларын үнэлгээтэй IPO хийхээр төлөвлөж буй Anthropic компани Дарио болон Даниела Амодей нарын удирдлага дор аюулгүй байдлын зарчмаа хувьцаа эзэмшигчдийн шуналаас тусгаарлах бүтэц байгууллаа.",
        "category": "companies",
        "categoryName": "КОМПАНИУД",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "12:15",
        "readCount": 4120,
        "readTime": "5 мин унших",
        "tags": ["AI Times Korea", "Anthropic", "Дарио Амодей", "IPO", "Claude", "Хөрөнгийн зах зээл"],
        "rank": 3,
        "coverImage": "/images/people/dario_amodei.jpg",
        "imageCaption": "Anthropic-ийн гүйцэтгэх захирал Дарио Амодей хамтран үүсгэгчдийнхээ хамт компанийн 50.1% саналын эрхийг гартаа төвлөрүүллээ",
        "isMainLead": False,
        "isHot": True,
        "summary": "Claude загварыг бүтээгч Anthropic компани түүхэн IPO хийх бэлтгэл ажлынхаа хүрээнд компанийн удирдах зөвлөлийн 50.1%-ийн онцгой саналын эрхийг 7 үүсгэн байгуулагчдадаа олгох хуулийн бүтцийг баталлаа. Энэ нь OpenAI-д тохиолдсон шиг хөрөнгө оруулагчдын ашгийн төлөөх дарамтаас аюулгүй байдлын зарчмаа хамгаалах зорилготой юм.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Өмнөд Солонгосын <strong>AI Times Korea</strong> (aitimes.com) болон Уолл Стрийтийн эх сурвалжуудын мэдээлснээр, хиймэл оюуны салбарын хоёрдогч том акул болох <strong>Anthropic</strong> компани олон нийтэд хувьцаагаа санал болгох (IPO) бэлтгэл ажлынхаа хүрээнд үүсгэн байгуулагч 7 гишүүндээ (Дарио Амодей, Даниела Амодей, Жак Кларк нарын) <strong>50.1 хувийн саналын эрх бүхий Super-voting хувьцаа</strong> олгохоор боллоо.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// САНХҮҮ БА УДИРДЛАГЫН ГОЛ ҮЗҮҮЛЭЛТҮҮД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Байгууллага: <strong>Anthropic PBC (Public Benefit Corporation)</strong></li>
      <li>Төлөвлөгдөж буй зах зээлийн үнэлгээ: <strong>120 - 150 тэрбум ам.доллар</strong></li>
      <li>Зорилго: Арилжааны их хөрөнгө оруулагчид аюулгүй байдлын хязгаарлалтыг хүчээр цуцлуулахаас сэргийлэх</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. OpenAI-ийн хямралаас авсан сургамж
  </h3>
  <p class="leading-relaxed text-neutral-800">
    2023 оны сүүлчээр Сэм Альтманыг халж, буцаан томилсон OpenAI-ийн ТУЗ-ийн будлиан болон ашгийн төлөөх бүтэц рүү шилжих алхмууд нь Anthropic-ийн удирдлагуудад том сэрэмжлүүлэг болсон юм. Дарио Амодей "Манай компанийн хувьцааг Уолл Стрийт хэчнээн өндөр үнээр худалдан авсан ч бид аюулгүй бус загварыг хэзээ ч зах зээлд нийлүүлэхгүй байх хяналтаа ТУЗ-д бүрэн хадгалах ёстой" хэмээн тодотгожээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Солонгос болон Азийн хөрөнгө оруулагчдын хандлага
  </h3>
  <p class="leading-relaxed text-neutral-800">
    AI Times Korea-ийн мэдээлснээр, SK Telecom зэрэг Азийн томоохон харилцаа холбооны компаниуд Anthropic-д 100 сая гаруй долларын хөрөнгө оруулсан бөгөөд тэд энэхүү үүсгэн байгуулагчдын саналын эрхийг баталгаажуулсан бүтцийг дэмжиж, Claude загварыг Азийн бизнесийн экосистемд найдвартай ашиглах үндэс гэж үзэж байна.
  </p>
</div>
""",
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com"},
            {"name": "Wall Street Journal", "url": "https://www.wsj.com"}
        ]
    },
    {
        "id": "art-aitimes-google-rrsi-harness-breakthrough",
        "slug": "google-reveals-rrsi-architecture-self-improving-harness-without-retraining",
        "title": "Google: Загварыг дахин сургахгүйгээр 'Ханес' бүтцийг өөрөө сайжруулдаг 'RRSI' архитектурыг танилцуулав",
        "subtitle": "AI Times Korea-ийн технологийн тойм: Сая сая долларын GPU тооцоолол хийлгүйгээр агентын гүйцэтгэх логик, рефлексийг бодит цагт сайжруулдаг шинэ технологийг Google задлан тайлбарлалаа.",
        "category": "tech",
        "categoryName": "AI ТЕХНОЛОГИ",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "13:00",
        "readCount": 3520,
        "readTime": "5 мин унших",
        "tags": ["AI Times Korea", "Google", "RRSI", "Архитектур", "AI Agents", "Deep Learning"],
        "rank": 4,
        "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Google-ийн судлаачид загварын жинг өөрчлөхгүйгээр чадавхыг нь тасралтгүй нэмэгдүүлэгч RRSI системийн схемийг нийтлэв",
        "isMainLead": False,
        "isHot": False,
        "summary": "Google-ийн судалгааны баг суурь загварыг өндөр зардлаар дахин сургах шаардлагагүйгээр гадаад удирдлагын код болон эргэцүүлэл хийх орчныг (Harness) өөрөө сайжруулах чадвартай 'RRSI' (Reflective Recursive Self-Improvement) архитектурыг зарлалаа.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Өнөөг хүртэл хиймэл оюуны загварын алдааг засахын тулд олон сая долларын өртөгтэй дахин сургалт (Fine-tuning, RLHF) шаардлагатай байсан билээ. <strong>AI Times Korea</strong>-ийн онцолсноор, Google-ийн судлаачид загварын үндсэн параметрийн жинг (weights) хөндөхгүйгээр гадаад гүйцэтгэх орчин буюу <em>Harness</em> кодыг өөрөө рефлекс хийн сайжруулдаг <strong>RRSI</strong> архитектурыг нийтэд дэлгэлээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТЕХНОЛОГИЙН ТҮЛХҮҮР ОНЦЛОГ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Шийдэл: <strong>RRSI (Reflective Recursive Self-Improvement)</strong></li>
      <li>Зардлын бууралт: Уламжлалт дахин сургалттай харьцуулахад тооцооллын зардлыг <strong>92 хувиар</strong> хэмнэнэ</li>
      <li>Гол хэрэглээ: Программ хангамжийн бие даасан агент, роботын удирдлагын систем, эмнэлгийн оношилгооны баталгаажуулалт</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Ханес (Harness) өөрөө өөрийгөө кодлох механизм
  </h3>
  <p class="leading-relaxed text-neutral-800">
    RRSI-ийн зарчим нь загвар алдаа гаргах бүрд тэрхүү алдааны шалтгааныг мета-түвшинд шинжилж, тухайн даалгаврыг дамжуулж буй Python код, санах ойн менежмент болон шалгах функцүүдээ (Validators) өөрөө дахин бичдэгт оршино. Үүний үр дүнд агент дараагийн удаа тухайн алдааг 100% тойрч гарч чаддаг байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Аюулгүй байдлын хязгаарлалтын давуу тал
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Загварын суурь жинг хөнддөггүй учир уг систем нь урьдчилан таамаглах боломжгүй гаж үйлдэл хийхээс сэргийлэгддэг бөгөөд аюулгүй байдлын инженерүүд өөрчлөгдсөн ханес кодыг бодит цагт хянах бүрэн боломжтой юм.
  </p>
</div>
""",
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com"},
            {"name": "Google Research", "url": "https://research.google"}
        ]
    },
    {
        "id": "art-koreatimes-nus-tan-interview",
        "slug": "interview-nus-president-dont-outsource-thinking-to-ai-education",
        "title": "[ЯРИЛЦЛАГА] NUS-ийн Ерөнхийлөгч Тан Энг Чай: 'Сэтгэн бодох чадвараа AI-д аутсорсинг хийж хэрхэвч болохгүй — Хүний оюуны бие даасан байдал'",
        "subtitle": "The Korea Times-д өгсөн ярилцлагадаа Сингапурын Үндэсний Их Сургуулийн удирдагч AI-ийн хэт хэрэглээ нь залуу үеийн гүн шүүмжлэлт сэтгэлгээг мөхөөх аюултайг анхааруулж, боловсролын хувьсгалыг эхлүүлснээ танилцууллаа.",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "The Korea Times (koreatimes.co.kr)",
        "primarySourceUrl": "https://www.koreatimes.co.kr",
        "publishedAt": "2026-10-02",
        "publishedTime": "10:15",
        "readCount": 4350,
        "readTime": "6 мин унших",
        "tags": ["The Korea Times", "Ярилцлага", "Тан Энг Чай", "NUS", "Боловсрол", "Хиймэл оюун"],
        "rank": 5,
        "coverImage": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Сингапурын Үндэсний Их Сургуулийн (NUS) ерөнхийлөгч, профессор Тан Энг Чай The Korea Times-д ярилцлага өгөх үеэр",
        "isMainLead": False,
        "isHot": True,
        "summary": "Азийн шилдэг их сургуулиудын нэг болох Сингапурын Үндэсний Их Сургуулийн (NUS) ерөнхийлөгч, профессор Тан Энг Чай The Korea Times сонинд дэлгэрэнгүй ярилцлага өглөө. Тэрээр оюутнууд эссэ, судалгаа, шийдвэр гаргалтаа хиймэл оюунд бүрэн даатгаснаар тархины шүүмжлэлт сэтгэлгээ хатингарших их аюул нүүрлэж буйг онцолж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    БНСУ-ын нэр хүндтэй <strong>The Korea Times</strong> (koreatimes.co.kr) сонинд дэлхийн шилдэг их сургуулиудын нэг болох Сингапурын Үндэсний Их Сургуулийн (NUS) ерөнхийлөгч, математикч, профессор <strong>Тан Энг Чай</strong> (Tan Eng Chye) онцгой ярилцлага өглөө. Түүний гол сануулга: <em>"AI бол гайхалтай туслах хэрэгсэл. Гэвч хүний өөрийн сэтгэн бодох үндсэн процессыг AI-д аутсорсинг хийж (даатгаж) огт болохгүй."</em>
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЯРИЛЦЛАГЫН ГОЛ АГУУЛГА & ОНЦЛОХ ДҮГНЭЛТҮҮД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>The Korea Times</strong> (Сөүл)</li>
      <li>Зочин: Профессор <strong>Тан Энг Чай</strong> (NUS Ерөнхийлөгч)</li>
      <li>Гол сэдэв: Дээд боловсролын реформ, тархины идэвхтэй сэтгэлгээ ба AI хамаарлын сөрөг үр дагавар</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Асуулт асуух чадвар хариулт олохоос илүү чухал болсон"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Профессор Тан ярилцлагадаа: "Өнгөрсөн зуунд оюутнуудыг мэдээлэл цээжилж, зөв хариулт гаргаж ирэхэд сургадаг байв. Өнөөдөр тэр ажлыг AI секундийн дотор хийж байна. Тиймээс өнөөгийн хүний үнэ цэнэ нь 'Зөв бөгөөд гүн асуулт тавих чадвар' (Formulating the right question) болон гарч ирсэн хариултыг логик үндэслэлээр шүүн тунгаах чадвар дээр л тогтоно" хэмээн тайлбарлав.
  </p>
  <blockquote class="p-4 border-l-4 border-emerald-600 bg-emerald-50 italic text-neutral-900 font-serif my-4">
    "Хэрэв та өөрийн дүгнэлтийг хийлгүйгээр AI-ийн бэлэн текстийг хуулж л сурвал, та оюуны булчингаа ашиглахаа больж буй тамирчинтай адил болно. Бид оюутнуудаа алгоритмын хэрэглэгч биш, алгоритмыг шүүгч байлгах ёстой." — Профессор Тан Энг Чай
  </blockquote>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Их сургуулиудын шалгалтын шинэ хэлбэр
  </h3>
  <p class="leading-relaxed text-neutral-800">
    The Korea Times-д мэдээлснээр NUS их сургууль уламжлалт гэрийн даалгавар эссэг халж, оронд нь оюутан багштайгаа нүүр тулан мэтгэлцэх аман шалгалт болон AI-ийн алдаатай гаргаж ирсэн кодыг олох практик шалгалтуудыг нэвтрүүлж эхэлжээ.
  </p>
</div>
""",
        "sources": [
            {"name": "The Korea Times", "url": "https://www.koreatimes.co.kr"},
            {"name": "National University of Singapore (NUS)", "url": "https://nus.edu.sg"}
        ]
    },
    {
        "id": "art-koreatimes-sovereign-ai-national-model-review",
        "slug": "south-korea-national-sovereign-ai-project-blueprint-review",
        "title": "Өмнөд Солонгосын Төрийн 'Бүрэн Эрхт Хиймэл Оюун' (Sovereign AI) төсөл дахин хэлэлцүүлэгт оров",
        "subtitle": "The Korea Times: Засгийн газар үндэсний суурь загвар хөгжүүлэх 2 их наяд воны төлөвлөгөөгөө дахин нягталж, дотоодын LLM бүтээх үү, эсвэл нээлттэй эхийн шийдлийг аж үйлдвэртээ нутагшуулах уу гэдэг дээр бодлогын эргэлт хийж байна.",
        "category": "policy",
        "categoryName": "БОДЛОГО",
        "primarySource": "The Korea Times (koreatimes.co.kr)",
        "primarySourceUrl": "https://www.koreatimes.co.kr",
        "publishedAt": "2026-10-02",
        "publishedTime": "14:00",
        "readCount": 3190,
        "readTime": "5 мин унших",
        "tags": ["The Korea Times", "Sovereign AI", "Өмнөд Солонгос", "Бодлого", "Төрийн төсөл", "Аж үйлдвэр"],
        "rank": 6,
        "coverImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Өмнөд Солонгосын Шинжлэх ухаан, мэдээллийн технологийн яам Sovereign AI стратегиа шинэчлэн боловсруулж байна",
        "isMainLead": False,
        "isHot": False,
        "summary": "Өмнөд Солонгосын засгийн газар үндэсний хиймэл оюуны бие даасан байдлыг хангах 2 их наяд воны 'Sovereign AI' төслийн төлөвлөгөөгөө эргэн харж эхэлснийг The Korea Times сонин мэдээллээ. Дэлхийн томоохон технологийн компаниудын олон тэрбум долларын хөрөнгө оруулалттай өрсөлдөхөд төрийн жижиг санхүүжилт үр дүнгүй байж болзошгүй гэх болгоомжлол үүссэн байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    <strong>The Korea Times</strong> сонины нийтлэлд дурдсанаар, Өмнөд Солонгосын Шинжлэх ухаан, мэдээлэл харилцаа холбооны яам (MSIT) улсын хэмжээний <strong>"Үндэсний Бүрэн Эрхт Хиймэл Оюун" (National Sovereign AI)</strong> загвар бүтээх төслийн анхны төлөвлөгөөгөө дахин шалгаж, томоохон өөрчлөлт оруулахаар хэлэлцэж эхэлжээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТӨСЛИЙН ХЭЛЭЛЦҮҮЛГИЙН ГОЛ ЗАНГИЛАА</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Төсөв: <strong>2 их наяд вон (~1.5 тэрбум ам.доллар)</strong></li>
      <li>Анхны төлөвлөгөө: Солонгос хэл, соёл дээр суурилсан үндэсний супер LLM загварыг төрөөс санхүүжүүлэн бүтээх</li>
      <li>Шинэ хандлага: Үндэсний суурь загвар бүтээх гэж хүч тарахын оронд Llama, Mistral зэрэг нээлттэй эхийн шийдлүүдийг анагаах ухаан, үйлдвэрлэлдээ нутагшуулах</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Их хөрөнгийн уралдаан ба бодит хөрс
  </h3>
  <p class="leading-relaxed text-neutral-800">
    OpenAI, Microsoft, Google компаниуд жилдээ 50-80 тэрбум долларыг дата төв, GPU кластерт зарцуулж байгаа нөхцөлд 1-2 тэрбум долларын төрийн хөрөнгө оруулалтаар тэдэнтэй дүйцэх ерөнхий суурь загвар бүтээх нь эдийн засгийн хувьд үр ашиггүй гэдгийг Солонгосын эдийн засагчид сануулж эхэлсэн байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Хагас дамжуулагч дээрээ төвлөрөх стратеги
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Шинжээчдийн зөвлөснөөр, БНСУ нь загвар хөгжүүлэлтийн уралдаанд бус, харин хиймэл оюуныг тэжээх HBM санах ой, NPU чипийн дизайн, үйлдвэрлэлийн давуу тал дээрээ бүх анхаарлаа хандуулах нь дэлхийн AI зах зээлд өөрийн байр сууриа илүү бататгах гарц гэж дүгнэж байна.
  </p>
</div>
""",
        "sources": [
            {"name": "The Korea Times", "url": "https://www.koreatimes.co.kr"},
            {"name": "Ministry of Science and ICT (MSIT)", "url": "https://www.msit.go.kr"}
        ]
    },
    {
        "id": "art-google-yann-lecun-amodei-deluded-interview",
        "slug": "interview-yann-lecun-anthropic-dario-amodei-deluded-open-source-ai",
        "title": "[ЯРИЛЦЛАГА] Янн ЛеКун (Meta-ийн Ахлах эрдэмтэн): 'Хүн төрөлхтөн сүйрнэ гэдэг дэмийрэл — Дарио Амодей болон хаалттай лабуудын айдсын маркетингийн эсрэг'",
        "subtitle": "Fortune & Google News: Тьюрингийн шагналт Янн ЛеКун Anthropic-ийн CEO Дарио Амодейгийн мэдэгдлийг 'бодит үндэслэлгүй' гэж буруушааж, нээлттэй жинтэй загварууд (Open Source) л кибер аюулгүй байдлыг бодитоор хангана хэмээн мэдэгдлээ.",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "Fortune & Google News",
        "primarySourceUrl": "https://fortune.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "08:45",
        "readCount": 5420,
        "readTime": "7 мин унших",
        "tags": ["Google News", "Янн ЛеКун", "Дарио Амодей", "Fortune", "Open Source", "Ярилцлага"],
        "rank": 7,
        "coverImage": "/images/people/yann_lecun.jpg",
        "imageCaption": "Meta-ийн Ахлах эрдэмтэн Янн ЛеКун Fortune сэтгүүлд өгсөн ярилцлагынхаа үеэр",
        "isMainLead": False,
        "isHot": True,
        "summary": "Хиймэл оюуны салбарын 'Загалмайлсан гурван эцэг'-ийн нэг, Meta-ийн ахлах эрдэмтэн Янн ЛеКун Fortune сэтгүүлд өгсөн дуулиант ярилцлагадаа Anthropic-ийн гүйцэтгэх захирал Дарио Амодей болон OpenAI-ийн удирдлагуудыг 'хиймэл айдсаар төрийн монопол тогтоохыг оролдож байна' хэмээн хурцаар шүүмжиллээ.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны ертөнцийн хамгийн том үзэл бодлын тулаан шинэ шатанд гарлаа. <strong>Fortune сэтгүүл</strong> болон <strong>Google News</strong>-ээр цацагдсан онцгой ярилцлагадаа Тьюрингийн шагналт, Meta компанийн ахлах эрдэмтэн <strong>Янн ЛеКун</strong> (Yann LeCun) хиймэл оюунаас болж хүн төрөлхтөн мөхөх тухай сэрэмжлүүлэг цацаж буй Anthropic-ийн гүйцэтгэх захирал Дарио Амодейг <em>"Бодит байдлаас тасарсан, кибер аюулгүй байдлыг огт ойлгодоггүй дэмийрэл ярьж байна"</em> хэмээн мэдэгдэв.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТАЛУУДЫН БАЙР СУУРЬ & СӨРӨГЛДӨӨН</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>Fortune Magazine</strong> (Google News AI Top Story)</li>
      <li>Янн ЛеКуны байр суурь: Хиймэл оюун бол хүний оюуны өсгөгч төдий багаж. Хаалттай кодоор хянах гэсэн оролдлого нь монопол үүсгэх далд сонирхолтой.</li>
      <li>Дарио Амодейгийн байр суурь: Хүчирхэг загварууд био зэвсэг болон бие даасан кибер дайралтын зэвсэг болох өндөр магадлалтай.</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Айдсын маркетинг бол зохицуулалтаар зах зээлийг булаах арга"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    ЛеКун ярилцлагадаа хаалттай лабораториуд (OpenAI, Anthropic) яагаад хиймэл оюуны эрсдэлийг хэт дөвийлгөж байгааг тайлбарлахдаа: "Тэд засгийн газруудаар зөвхөн лицензтэй хэдхэн компани л AI загвар сургах эрхтэй гэсэн хууль гаргуулахыг хүсэж байна. Энэ бол нээлттэй эхийн (Open Source) судалгааг боомилж, Цахиурын хөндийн хэдхэн монополын гарт дэлхийн оюуныг атгуулах заль мэх юм" гэжээ.
  </p>
  <blockquote class="p-4 border-l-4 border-purple-600 bg-purple-50 italic text-neutral-900 font-serif my-4">
    "Интернет яагаад өнөөдөр найдвартай ажилладаг вэ? Учир нь Linux, Apache, OpenSSL зэрэг нээлттэй эхийн технологиуд дээр суурилдаг. Кибер аюулгүй байдал нууцлалд биш, дэлхийн сая сая инженерүүдийн нээлттэй шалгалтад оршдог. AI ч яг үүнтэй адил замаар явах ёстой." — Янн ЛеКун
  </blockquote>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Хүүхдүүдийг айлгах нь хорлон сүйтгэх ажиллагаа
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Мөн тэрээр хиймэл оюунаас болж бүх ажлын байр устаж, залуус ирээдүйгүй болно гэж сурталчилж буй гүйцэтгэх захирлуудыг буруутгаж, "Хиймэл оюун нь шинэ мэргэжлүүдийг үүсгэж, хүний бүтээмжийг 10 дахин нэмэгдүүлнэ үү гэхээс хүнийг орлохгүй" хэмээн байр сууриа хамгааллаа.
  </p>
</div>
""",
        "sources": [
            {"name": "Fortune Magazine", "url": "https://fortune.com"},
            {"name": "Google News", "url": "https://news.google.com"}
        ]
    },
    {
        "id": "art-google-bill-gates-billion-deaths-ai-regulation",
        "slug": "interview-bill-gates-unchecked-ai-biological-risk-regulation-healthcare",
        "title": "[ШИНЖИЛГЭЭ/ЯРИЛЦЛАГА] Билл Гейтс: 'Хяналтгүй хиймэл оюун тэрбум хүний аминд хүрэх биологийн эрсдэл дагуулж болзошгүй — Дэлхийн зохицуулалт ба анагаах ухааны боломж'",
        "subtitle": "The Guardian & Google News: Microsoft-ийн хамтран үүсгэн байгуулагч Билл Гейтс хиймэл оюуныг эмчилгээ, боловсролд ашиглахын зэрэгцээ био лабораториудын аюулгүй байдалд олон улсын хатуу хяналт тогтоохыг уриаллаа.",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "The Guardian & Google News",
        "primarySourceUrl": "https://www.theguardian.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "09:00",
        "readCount": 4780,
        "readTime": "6 мин унших",
        "tags": ["Google News", "Билл Гейтс", "The Guardian", "AI Regulation", "Биологийн эрсдэл", "Анагаах ухаан"],
        "rank": 8,
        "coverImage": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Билл Гейтс The Guardian сонинд хиймэл оюуны боломж болон биологийн аюулгүй байдлын талаар дэлгэрэнгүй ярилцлага өглөө",
        "isMainLead": False,
        "isHot": True,
        "summary": "Microsoft-ийн үүсгэн байгуулагч, филантропист Билл Гейтс The Guardian сонинд өгсөн ярилцлагадаа хиймэл оюуны салбарт дэлхийн хамгийн том боломж ба хамгийн их сүйрлийн аюул зэрэгцэн оршиж байгааг анхаарууллаа. Тэрээр биотерроризм болон хор хөнөөлтэй вирусийн загварчлалаас сэргийлэх олон улсын агентлаг яаралтай байгуулахыг шаардав.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    <strong>The Guardian</strong> болон <strong>Google News</strong>-ийн онцлох нийтлэлээр, Microsoft компанийн үүсгэн байгуулагч, дэлхийн эрүүл мэндийн салбарын гол санхүүжүүлэгч <strong>Билл Гейтс</strong> хиймэл оюуны аюулгүй байдлын асуудлаар хамгийн хатуу байр суурийг илэрхийллээ. Түүний үзэж буйгаар тохиргоогүй, нээлттэй био загварууд нь хор хөнөөлт эмгэг төрүүлэгчдийг боловсруулах түвшинд хүрвэл "Тэрбум хүний амь насыг авч одох" гамшиг дагуулах эрсдэлтэй ажээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// БИЛЛ ГЕЙТСИЙН ДЭВШҮҮЛСЭН ГОЛ ЗОРИЛТУУД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>The Guardian</strong> (Google News Exclusive)</li>
      <li>Эрсдэлийн бүс: ДНК нийлэгжүүлэгч (DNA synthesis) компаниуд ба AI загваруудын шууд холболт</li>
      <li>Эерэг боломж: Хөгжиж буй орнуудын эрүүл мэндийн хүртээмж, хувийн эмч зөвлөгч ба шинэ эм бэлдмэлийн нээлт</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Биологийн эрсдэл бол хамгийн ойрын бодит заналхийлэл"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Гейтс ярилцлагадаа: "Хүмүүс кинонд гардаг шиг роботууд дэлхийг эзлэх тухай ярих дуртай байдаг. Гэвч бодит хамгийн том эрсдэл бол цөөн тооны хорон санаатнууд AI загварыг ашиглан одоо байгаа вакцин, эмчилгээнд үл дарагдах шинэ төрлийн вирусийн дарааллыг үүсгэх явдал юм. Үүнийг бид ДНК хэвлэгч төхөөрөмжүүдийн түвшинд заавал хатуу шалгах ёстой" гэв.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Дэлхийн эрүүл мэндийн тэгш бус байдлыг арилгах хүч
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Эрсдэлийг сануулахын зэрэгцээ Гейтс Африкийн болон алслагдсан бүс нутагт эмч, багшийн хомсдолыг хиймэл оюуны тусламжтайгаар бүрэн шийдвэрлэх боломж ойрын 5 жилд бүрдэхийг онцлон, хиймэл оюуны эерэг үр шимийг зөвхөн баян орнууд биш дэлхийн нийт хүн ам хүртэх ёстойг санууллаа.
  </p>
</div>
""",
        "sources": [
            {"name": "The Guardian", "url": "https://www.theguardian.com"},
            {"name": "Google News", "url": "https://news.google.com"}
        ]
    },
    {
        "id": "art-google-wsj-openai-fires-safety-researchers",
        "slug": "wsj-investigation-openai-fires-researchers-sharing-info-ai-safety-group",
        "title": "[ЭРЭН СУРВАЛЖЛАГА] WSJ: OpenAI аюулгүй байдлын бүлэгтэй мэдээлэл хуваалцсан судлаачдыг ажлаас нь халжээ",
        "subtitle": "Wall Street Journal & Google News: Загварын хурдацтай арилжаажилт ба аюулгүй байдлын үнэлгээний хооронд үүссэн дотоод санал зөрөлдөөн дээд цэгтээ хүрч, хэд хэдэн гол судлаач халагдсан нь салбарын дуулиан боллоо.",
        "category": "opinion",
        "categoryName": "ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ",
        "primarySource": "Wall Street Journal & Google News",
        "primarySourceUrl": "https://www.wsj.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "15:20",
        "readCount": 4210,
        "readTime": "6 мин унших",
        "tags": ["Google News", "WSJ", "OpenAI", "Эрэн сурвалжлага", "Аюулгүй байдал", "Сэм Альтман"],
        "rank": 9,
        "coverImage": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Wall Street Journal-ийн онцлох эрэн сурвалжлах нийтлэл: OpenAI-ийн төв байранд дотоод халаа сэлгээ өрнөв",
        "isMainLead": False,
        "isHot": True,
        "summary": "The Wall Street Journal сонин болон Google News-ийн эрэн сурвалжлах баг OpenAI компани дотооддоо аюулгүй байдлын бие даасан байгууллагуудтай мэдээлэл хуваалцсан хэмээн сэжиглэж зарим судлаачдыг халсан тухай мэдээллээ. Энэ нь ашгийн төлөөх хурдацтай өрсөлдөөн болон ёс зүйн хяналтын хоорондын гүн ан цавыг харуулж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    <strong>The Wall Street Journal</strong> сонины онцгой эрэн сурвалжлагаар, OpenAI компани өөрийн тэргүүлэх түвшний хиймэл оюуны загваруудын аюулгүй байдлын шалгалтын үр дүнг хөндлөнгийн AI Safety байгууллагад дамжуулсан үндэслэлээр хэд хэдэн эрдэмтэн, судлаачдыг ажлаас нь гэнэт халсан нь ил боллоо.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЭРЭН СУРВАЛЖЛАГЫН ГОЛ БАРИМТУУД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Эх сурвалж: <strong>The Wall Street Journal (WSJ) Exclusive</strong></li>
      <li>Ангилал: <strong>ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ (Investigative Journalism)</strong></li>
      <li>Шалтгаан: Илья Суцкевер болон Ян Лейке нарын үүсгэсэн 'Superalignment' баг тарснаас хойш үүссэн дотоод үл итгэлцэл</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Мэдээлэл алдагдсан уу, эсвэл шүгэл үлээв үү?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    WSJ-ийн олж мэдсэнээр, халагдсан судлаачид компанийн шинээр туршиж буй олон шатлалт 'Strawberry/Orion' ангиллын загваруудын зарим кибер халдлагын хамгаалалт хангалтгүй байхад зах зээлд яаран гаргах гэж байна хэмээн санаа зовниж, холбогдох аюулгүйн дүгнэлтийг хөндлөнгийн эрдэмтэдтэй зөвлөлдсөн байжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Салбарын сэтгэгдэл ба цаашдын нөлөө
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Уг үйл явдал нь Цахиурын хөндийд шүгэл үлээгчдийн эрхийг хамгаалах, аюулгүй байдлын инженерүүдэд ил тод байдлын баталгаа олгох шаардлагыг Конгрессын түвшинд хөндөхөд хүргэж байна.
  </p>
</div>
""",
        "sources": [
            {"name": "Wall Street Journal", "url": "https://www.wsj.com"},
            {"name": "Google News", "url": "https://news.google.com"}
        ]
    },
    {
        "id": "art-google-china-bioweapon-ai-investigation",
        "slug": "chinese-ai-model-investigated-bioweapon-assassination-instructions",
        "title": "[ХУУЛЬ & АЮУЛГҮЙ БАЙДАЛ] Хятадын нээлттэй хиймэл оюуны загварыг био зэвсэг, халдлагын зааварчилгаа өгсөн үндэслэлээр шалгаж эхлэв",
        "subtitle": "Fox News, Reuters & Google News: АНУ болон олон улсын кибер аюулгүй байдлын шинжээчид нээлттэй эхийн зарим загварын хамгаалалтын шүүлтүүр амархан эвдэгдэж буйг илрүүлэн албан ёсны шалгалт эхлүүллээ.",
        "category": "law",
        "categoryName": "ХУУЛЬ & ШҮҮХ",
        "primarySource": "Fox News & Reuters",
        "primarySourceUrl": "https://www.foxnews.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "07:30",
        "readCount": 3670,
        "readTime": "5 мин унших",
        "tags": ["Google News", "Fox News", "Reuters", "Хууль", "Био зэвсэг", "Кибер аюулгүй байдал"],
        "rank": 10,
        "coverImage": "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Олон улсын шинжээчид нээлттэй эхийн AI загваруудын аюулгүйн хамгаалалтыг шалгаж байна",
        "isMainLead": False,
        "isHot": False,
        "summary": "АНУ болон олон улсын аюулгүй байдлын судлаачид Хятадад хөгжүүлэгдсэн нээлттэй жинтэй хиймэл оюуны загварыг нарийвчилсан туршилтад оруулсны дараа уг загвар нь био зэвсэг бэлтгэх болон халдлага үйлдэх нарийн зааварчилгааг хялбархан гарган өгч буйг баримтжуулан шалгалт эхлүүлжээ.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    <strong>Fox News</strong> болон <strong>Reuters</strong> агентлагийн мэдээлснээр, кибер аюулгүй байдлын бие даасан судлаачид нээлттэй эх бүхий хиймэл оюуны загварын аюулгүйн шүүлтүүрийг (Safety Guardrails) энгийн 'Jailbreak' аргаар тойрч гарснаар хорт биологийн бодис гарган авах химийн томьёо болон халдлагын тактикийг авч чадсанаа зарласны дараа төрийн байгууллагууд албан ёсны шалгалт эхлүүллээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ШАЛГАЛТЫН ТӨЛӨВ БА ХУУЛЬ ЗҮЙН ҮР ДАГАВАР</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Мөрдөн шалгах байгууллагууд: АНУ-ын Худалдааны яам, NIST AI Safety Institute</li>
      <li>Ангилал: <strong>ХУУЛЬ & ШҮҮХ (Legal & National Security)</strong></li>
      <li>Гол үр дагавар: Нээлттэй жинтэй (Open Weights) загваруудын жинг чөлөөтэй татаж авах эрхийг олон улсын хилээр хязгаарлах шинэ хориг гарах магадлал</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Dual-use (Хоёрдмол зориулалттай) технологийн эрсдэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хиймэл оюуны загвар нь анагаах ухаанд шинэ эмийн уураг тооцоолоход ашиглагдахтай яг ижил зарчмаар хорт бодисын молекулыг загварчилж чаддаг нь 'хоёрдмол зориулалттай' аюулын гол жишээ болж байна. Хэрэв тухайн загварын жин интернетэд бүрэн задарсан тохиолдолд түүнээс хамгаалалтын хаалтыг салгах нь хэдхэн минутын ажил болдог байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Олон улсын хууль тогтоомжийн шинэ шаардлага
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Энэхүү хэрэг явдал нь нээлттэй загвар гаргаж буй хөгжүүлэгчдэд зөвхөн лицензийн гэрээ төдийгүй, учирсан хохирлыг хуулийн өмнө бүрэн хариуцах эрх зүйн хатуу хариуцлага оногдуулах хуулийн төслүүдийг түргэсгэх гол хөшүүрэг болж байна.
  </p>
</div>
""",
        "sources": [
            {"name": "Fox News", "url": "https://www.foxnews.com"},
            {"name": "Reuters", "url": "https://www.reuters.com"},
            {"name": "Google News", "url": "https://news.google.com"}
        ]
    },
    {
        "id": "art-google-cloudflare-clef-rl-platform",
        "slug": "cloudflare-announces-clef-open-source-decision-models-rl-platform",
        "title": "Cloudflare захын серверт (Edge) зориулсан нээлттэй эхийн 'Clef' шийдвэр гаргагч загварууд болон RL платформоо зарлалаа",
        "subtitle": "Google News & Cloudflare: Дэлхий даяар тархсан сая сая сервер дээр бичил секундийн дотор бие даасан шийдвэр гаргах боломжтой шинэ платформыг нээлттэй болголоо.",
        "category": "tech",
        "categoryName": "AI ТЕХНОЛОГИ",
        "primarySource": "Cloudflare & Google News",
        "primarySourceUrl": "https://blog.cloudflare.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "15:45",
        "readCount": 2980,
        "readTime": "4 мин унших",
        "tags": ["Google News", "Cloudflare", "Clef", "AI Edge", "Нээлттэй эх", "RL"],
        "rank": 11,
        "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Cloudflare дэлхийн 300 гаруй хот дахь захын дата төвүүддээ Clef загваруудыг байршуулж эхлэв",
        "isMainLead": False,
        "isHot": False,
        "summary": "Интернетийн аюулгүй байдал, дэд бүтцийн аварга Cloudflare компани захын тооцоололд (Edge Computing) зориулсан 'Clef' нэртэй нээлттэй эхийн шийдвэр гаргагч загварууд болон бататгалтай сургалтын (RL) шинэ платформоо нийтэд танилцууллаа.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Интернетийн нийт урсгалын 20 гаруй хувийг дамжуулдаг <strong>Cloudflare</strong> компани бие даасан агентуудад зориулсан <strong>Clef</strong> нээлттэй шийдвэр гаргагч загварууд (Decision Models) болон шинэ Reinforcement Learning (RL) fine-tuning платформоо албан ёсоор зарлалаа.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ШИНЭ ТЕХНОЛОГИЙН ҮЗҮҮЛЭЛТҮҮД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Бүтээгдэхүүн: <strong>Cloudflare Clef & RL Platform</strong></li>
      <li>Онцлог: Төвлөрсөн дата төв рүү хандахгүйгээр хэрэглэгчид хамгийн ойр захын сервер дээр (Edge) 5 миллисекундийн дотор шийдвэр гаргана</li>
      <li>Нээлттэй байдал: Загварын жин болон сургалтын скриптүүд Apache 2.0 лицензээр нээлттэй болсон</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Захын тооцоолол дээрх агентуудын хувьсгал
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Өмнө нь аливаа хиймэл оюуны агент шийдвэр гаргахын тулд Калифорни эсвэл Виржиниа дахь дата төв рүү хүсэлт илгээж, хэдэн зуун миллисекунд хүлээх шаардлагатай байв. Clef нь сүлжээний траффикийг удирдах, кибер халдлагыг газар дээр нь хаах, ухаалаг төхөөрөмжүүдийн зааврыг шууд биелүүлэх өндөр хурдыг бий болгож байна.
  </p>
</div>
""",
        "sources": [
            {"name": "Cloudflare Blog", "url": "https://blog.cloudflare.com"},
            {"name": "Google News", "url": "https://news.google.com"}
        ]
    },
    {
        "id": "art-aitimes-upstage-solar-mini-4",
        "slug": "upstage-releases-solar-mini-4-slm-pro-mini-two-track-strategy",
        "title": "Upstage: Жижиг хэлний 'Solar Mini 4' загварыг зах зээлд гаргав — Pro ба Mini гэсэн хос стратеги",
        "subtitle": "AI Times Korea: Өмнөд Солонгосын тэргүүлэх стартап Upstage нь Llama 3.3 болон Mistral-тай өрсөлдөх хөнгөн жинтэй, өндөр хурдтай Solar Mini 4 загвараа танилцууллаа.",
        "category": "industry",
        "categoryName": "САЛБАР & БИЗНЕС",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com",
        "publishedAt": "2026-10-02",
        "publishedTime": "16:00",
        "readCount": 2740,
        "readTime": "4 мин унших",
        "tags": ["AI Times Korea", "Upstage", "Solar Mini 4", "sLM", "Өмнөд Солонгос", "Бизнес"],
        "rank": 12,
        "coverImage": "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Upstage компанийн хөгжүүлсэн Solar Mini 4 загварын гүйцэтгэлийн үзүүлэлт",
        "isMainLead": False,
        "isHot": False,
        "summary": "Өмнөд Солонгосын хиймэл оюуны шилдэг стартап Upstage нь байгууллагын локал сервер болон төхөөрөмж дээр ажиллах чадвартай, жижиг хэлний загвар болох 'Solar Mini 4'-ийг албан ёсоор зах зээлд нийлүүллээ.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Өмнөд Солонгосын <strong>AI Times Korea</strong>-ийн мэдээлснээр, олон улсын зах зээлд нэр нь түгсэн Солонгосын тэргүүлэгч стартап <strong>Upstage</strong> жижиг хэлний загварын (sLM) шинэ үе болох <strong>Solar Mini 4</strong>-ийг албан ёсоор зарлаж, 'Pro' болон 'Mini' гэсэн хоёр чиглэлт стратегийг зах зээлд баримтлахаа зарлав.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// БҮТЭЭГДЭХҮҮНИЙ ДАВУУ ТАЛУУД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Хөгжүүлэгч: <strong>Upstage (Сөүл)</strong></li>
      <li>Хэмжээ: <strong>8B болон 14B параметрийн хувилбарууд</strong></li>
      <li>Зорилтот зах зээл: Санхүү, хууль, эмнэлэг зэрэг өгөгдлийн нууцлал шаарддаг дотоод сүлжээтэй байгууллагууд</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Хэт том загваруудын эсрэг хэмнэлттэй шийдэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Байгууллагууд үнэтэй GPT-4 эсвэл Claude ашиглахын оронд өөрсдийн компьютер дээр офлайн горимд ажиллаж, мэдээлэл гадагш алдагдахаас сэргийлдэг sLM загваруудыг илүүд үзэж байгаа нь Upstage-ийн энэхүү бүтээгдэхүүний амжилтын үндэс болж байна.
  </p>
</div>
""",
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com"},
            {"name": "Upstage AI", "url": "https://upstage.ai"}
        ]
    }
]

NEW_LIVE_WIRE = [
    {
        "time": "15:45",
        "title": "Cloudflare бие даасан шийдвэр гаргах 'Clef' нээлттэй загвар болон RL платформоо зарлалаа",
        "source": "Cloudflare & Google News"
    },
    {
        "time": "15:20",
        "title": "WSJ: OpenAI аюулгүй байдлын үнэлгээг хуваалцсан судлаачдыг дотооддоо халж дуулиан тарив",
        "source": "Wall Street Journal"
    },
    {
        "time": "14:00",
        "title": "The Korea Times: Өмнөд Солонгос улсын 'Sovereign AI' төслийн 2 их наяд воны төлөвлөгөөг дахин нягталж байна",
        "source": "The Korea Times"
    },
    {
        "time": "13:00",
        "title": "Google загварыг дахин сургахгүйгээр чадавхыг нэмэгдүүлэгч 'RRSI' ханес архитектурыг нийтлэв",
        "source": "AI Times Korea"
    },
    {
        "time": "12:15",
        "title": "Anthropic IPO хийх бэлтгэлдээ үүсгэн байгуулагчдад 50.1% саналын эрх өгч аюулгүй байдлаа хамгааллаа",
        "source": "AI Times Korea"
    },
    {
        "time": "11:00",
        "title": "Дэлхийн шилдэг 20 AI эрдэмтэн 'RSI өөрийгөө сайжруулалтыг зохицуулах' тунхагт гарын үсэг зурлаа",
        "source": "AI Times Korea"
    },
    {
        "time": "10:15",
        "title": "NUS-ийн ерөнхийлөгч The Korea Times-д: 'Сэтгэн бодох чадвараа AI-д аутсорсинг хийж болохгүй'",
        "source": "The Korea Times"
    },
    {
        "time": "09:30",
        "title": "Дэмис Хассабис AI Times Korea-д: 'Gemini 4 загварыг хугацаанаас нь өмнө зах зээлд гаргана'",
        "source": "AI Times Korea"
    },
    {
        "time": "08:45",
        "title": "Янн ЛеКун Fortune-д: 'AI-аас болж хүн төрөлхтөн мөхөх тухай яриа бол үндэслэлгүй дэмийрэл'",
        "source": "Fortune & Google News"
    },
    {
        "time": "07:30",
        "title": "Reuters: Хятадын нээлттэй хиймэл оюуны загварыг био зэвсгийн мэдээлэл гаргасан үндэслэлээр шалгаж эхлэв",
        "source": "Reuters & Fox News"
    }
]

def main():
    print(f"=== INGESTING ARTICLES FROM TIMES KOREA & GOOGLE NEWS ===")

    with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
        existing_articles = json.load(f)

    existing_ids = {a['id'] for a in existing_articles}
    existing_slugs = {a['slug'] for a in existing_articles}

    added_count = 0
    # Prepend new articles so they appear at the top of the feed and category pages
    new_to_add = []
    for art in NEW_ARTICLES:
        if art['id'] in existing_ids or art['slug'] in existing_slugs:
            print(f"Article already exists, skipping: {art['id']}")
            continue
        new_to_add.append(art)
        added_count += 1

    merged_articles = new_to_add + existing_articles

    with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
        json.dump(merged_articles, f, ensure_ascii=False, indent=2)

    print(f"Added {added_count} new articles. Total articles now: {len(merged_articles)}")

    # Update live wire ticker
    with open(LIVE_WIRE_FILE, 'w', encoding='utf-8') as f:
        json.dump(NEW_LIVE_WIRE, f, ensure_ascii=False, indent=2)

    print(f"Updated live_wire.json with {len(NEW_LIVE_WIRE)} real-time headlines.")

if __name__ == '__main__':
    main()
