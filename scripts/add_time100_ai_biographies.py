#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add TIME100 AI honorees with in-depth biographical profiles and explicit analysis
of why they are critical to AI into src/data/articles.json (НАМТАР & ХӨРӨГ / interview).
"""

import json
import os
import sys

ARTICLES_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'articles.json')

TIME100_ARTICLES = [
  {
    "id": "art-time100-ai-overview-master",
    "slug": "time100-ai-most-influential-people-in-artificial-intelligence",
    "title": "TIME сэтгүүл: Дэлхийн хиймэл оюуны хамгийн нөлөө бүхий 100 хүн (TIME100 AI) — Дөрвөн том ангилал ба дэлхийг өөрчилж буй хүчнүүд",
    "subtitle": "TIME сэтгүүлээс шалгаруулсан Удирдагчид (Leaders), Шинэчлэгчид (Innovators), Сэтгэгчид (Thinkers), Чиглүүлэгчид (Shapers) ангиллын шилдэг 100 эрхэм ба AI-ийн шинэ эрин үеийн зураглал.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "08:00",
    "readCount": 6800,
    "readTime": "8 мин унших",
    "tags": ["TIME100 AI", "Намтар", "Хөрөг", "AI Leaders", "Дэлхийн нөлөө"],
    "rank": 3,
    "coverImage": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME Magazine - TIME100 AI: Дэлхийн хиймэл оюуныг тодорхойлогч 100 эрхэм",
    "isMainLead": False,
    "isHot": True,
    "summary": "TIME сэтгүүл дэлхийн хиймэл оюуны хувьсгалыг чиглүүлж буй хамгийн нөлөө бүхий 100 эрхмийг тодрууллаа. Удирдагчид, Шинэчлэгчид, Сэтгэгчид, Чиглүүлэгчид гэсэн 4 бүлэгт хуваагдсан энэхүү жагсаалт нь зөвхөн Цахиурын хөндий биш, дэлхийн геополитик, шинжлэх ухаан, ёс зүйн тэнцвэрийг хэн атгаж буйг илтгэнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Дэлхийн нэр хүндтэй <strong>TIME сэтгүүл</strong> хиймэл оюун ухааны хувьсгалыг бодитоор удирдаж буй 100 эрхмийг нэрлэсэн <strong>TIME100 AI</strong> жагсаалтаа танилцууллаа. Энэхүү жагсаалт нь хиймэл оюун зөвхөн код, алгоритмын хүрээнээс хальж, хүн төрөлхтний соёл иргэншил, эдийн засаг, олон улсын хүчний харьцааг тодорхойлогч суурь хүчин зүйл болсныг нотолж байна.
  </p>

  <div class="border-l-4 border-[#00FF66] bg-black text-white p-4 font-mono text-xs">
    <p class="font-bold text-[#00FF66] uppercase mb-2">// TIME100 AI: ДӨРВӨН ТУЛГУУР АНГИЛАЛ</p>
    <ul class="space-y-1.5 text-neutral-300">
      <li><strong>1. Удирдагчид (Leaders):</strong> Салбарын аварга компаниуд болон их капиталыг удирдаж, зах зээлийн дүрмийг зохиогчид (Сэм Альтман, Дэмис Хассабис, Женсен Хуан, Дарио Амодей).</li>
      <li><strong>2. Шинэчлэгчид (Innovators):</strong> Цоо шинэ архитектур, өгөгдлийн дэд бүтэц, бүтээлч загваруудыг зохион бүтээгчид (Фэй-Фэй Ли, Лян Вэньфэн, Александр Ванг, Артюр Менш).</li>
      <li><strong>3. Сэтгэгчид (Thinkers):</strong> Хиймэл оюуны математик онол, аюулгүй байдал, философийн суурийг тавигчид (Жеффри Хинтон, Ёшуа Бенжио, Янн ЛеКун, Стюарт Рассел).</li>
      <li><strong>4. Чиглүүлэгчид (Shapers):</strong> Төрийн зохицуулалт, ёс зүйн хэм хэмжээ, хүний эрх, бодлогын стандартыг бий болгогчид (Арати Прабхакар, Тимнит Гебру, Дорин Богдан-Мартин).</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Эрдэм шинжилгээнээс Үйлдвэрлэлийн эрин үе рүү шилжсэн эргэлт
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүлийн онцолсноор, энэ удаагийн жагсаалтын хамгийн гол онцлог нь <em>"Хиймэл оюуны онолын судалгаа нь аж үйлдвэрийн хэрэглээ болон геополитикийн зэвсэг болон хувирсан"</em> явдал юм. Хэдхэн жилийн өмнө академик лабораторид сууж байсан эрдэмтэд өнөөдөр хэдэн зуун тэрбум долларын зах зээлийн үнэлгээтэй корпорацуудыг удирдаж байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Аюулгүй байдал ба Арилжааны хурдны зөрчил
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Жагсаалтад багтсан хүмүүсийн дунд хоёр туйлт хүчтэй мэтгэлцээн өрнөж байна. Нэг талд Сэм Альтман тэргүүтэй зах зээлийн далайц, хурдтай капиталжуулалтыг эрхэмлэгчид; нөгөө талд Жеффри Хинтон, Ёшуа Бенжио, Дарио Амодей нарын хатуу хяналт, аюулгүй байдлыг урьтал болгохыг шаардагчид байр сууриа эзэлжээ. Түүнчлэн Европын Mistral AI (Артюр Менш), Хятадын DeepSeek (Лян Вэньфэн) зэрэг нээлттэй жинтэй загварууд Америкийн монополыг задалж буй нь TIME сэтгүүлийн гол сэдэв болов.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. Дүгнэлт: Хүн төрөлхтний дараагийн 50 жилийг шийдэх 100 оюун
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME100 AI нь зүгээр нэг алдар цуутнуудын жагсаалт биш, харин хүн төрөлхтөн ухаант сэтгэгч машинтай зэрэгцэн орших уу, үгүй юү гэдгийг шийдвэрлэх хариуцлагыг үүрч яваа хүмүүсийн нэрс юм. <strong>AImedee.mn</strong> нь энэхүү жагсаалтын хамгийн шийдвэрлэх манлайлагчдын хөрөг намтар, яагаад салбарт чухал болох шалтгааныг доорх цуврал нийтлэлүүдээр нарийвчлан хүргэж байна.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-demis-hassabis",
    "slug": "demis-hassabis-deepmind-alphafold-nobel-prize-biography",
    "title": "Дэмис Хассабис: Шатрын гоц авьяастнаас Нобелийн шагналтан болсон замнал ба AlphaFold-ийн хувьсгал",
    "subtitle": "Google DeepMind-ийн үүсгэн байгуулагч, AGI-ийн туйлын зорилгыг шинжлэх ухааны нээлтэд холбосон эрхэм яагаад орчин үеийн хиймэл оюунд хамгийн чухал хүн бэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "08:15",
    "readCount": 5400,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Дэмис Хассабис", "DeepMind", "AlphaFold", "Нобелийн шагнал"],
    "rank": 4,
    "coverImage": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Дэмис Хассабис (Google DeepMind гүйцэтгэх захирал, Нобелийн шагналт)",
    "isMainLead": False,
    "isHot": True,
    "summary": "4 настайдаа шатар сурч, 13 насандаа мастер болсон Дэмис Хассабис Google DeepMind-ийг байгуулж AlphaGo-оос эхлээд биологийн 50 жилийн оньсыг тайлсан AlphaFold 2-ийг бүтээсэн нь 2024 онд Химийн Нобелийн шагналыг авчирсан юм. Түүний 'AI for Science' философи яагаад хиймэл оюуны жинхэнэ утга учир болохыг өгүүлнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2024 оны Химийн салбарын <strong>Нобелийн шагналыг</strong> Google DeepMind-ийн үүсгэн байгуулагч <strong>Дэмис Хассабис</strong> хүртсэн нь хиймэл оюуны түүхэнд цоо шинэ хуудас нээсэн явдал байв. <strong>TIME100 AI</strong> жагсаалтын тэргүүн эгнээнд түүнийг тодруулсан шалтгаан нь ердөө л нэг технологийн бизнес эрхлэгч биш, харин хүн төрөлхтний суурь шинжлэх ухааны хамгийн хүнд бодлогуудыг шийдэж буй сэтгэгч учраас тэр юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ДЭМИС ХАССАБИС: ТОВЧ АНКЕТ & ҮЗҮҮЛЭЛТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Google DeepMind-ийн гүйцэтгэх захирал (CEO) ба хамтран үүсгэн байгуулагч</li>
      <li><strong>Боловсрол:</strong> Кембрижийн их сургууль (Компьютерийн ухаан), UCL (Танин мэдэхүйн нейробиологийн доктор)</li>
      <li><strong>Гол ололт:</strong> AlphaGo, AlphaZero, AlphaFold 2 & 3, Gemini архитектур</li>
      <li><strong>Шагнал:</strong> 2024 оны Химийн Нобелийн шагнал, Breakthrough Prize</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Шатрын мастер, видео тоглоомын зохион бүтээгчээс нейробиологич болсон нь
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Лондонд грек-кипр болон хятад-сингапур гаралтай гэр бүлд төрсөн Хассабис 4 настайдаа шатар сурч, 13 насандаа дэлхийн өсвөрийн чансааны 2-т бичигдэж байв. 17 насандаа сая сая хувь борлогдсон <em>Theme Park</em> видео тоглоомын хиймэл оюуныг кодолж, улмаар Кембрижийг дүүргээд хүний тархи хэрхэн төсөөлөл болон дурсамжийг бий болгодгийг судалж танин мэдэхүйн нейробиологиор докторын зэрэг хамгаалсан нь түүнийг AGI-ийн туйлын зорилгод хөтөлсөн юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт хамгийн чухал хүн бэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Ихэнх компаниуд зөвхөн чатбот бүтээж, зар сурталчилгааны орлого олохыг зорьж байхад Хассабис хиймэл оюуныг <strong>"Шинжлэх ухааны нээлтийн дээд хурдасгуур" (AI for Science)</strong> болгон ашиглаж байна:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>AlphaFold-ийн гайхамшиг:</strong> Байгаль дээр мэдэгдэж буй 200 сая гаруй бүх уургийн 3 хэмжээст бүтцийг урьдчилан таамаглаж дэлхийн 2 сая гаруй биологичдод үнэ төлбөргүй нээж өгсөн. Энэ нь шинэ эм, хорт хавдрын эмчилгээ, хуванцар задалдаг фермент бүтээхэд 50 жилээр урагшлуулсан ололт юм.</li>
    <li><strong>AlphaGo-ийн соёлын цохилт:</strong> 2016 онд дэлхийн аварга Ли Сэдолыг ялж, гүн бататгалтай сургалт (Deep Reinforcement Learning) хүний мэдрэмж гэж үздэг зөн совинг давж чадахыг анх нотолсон.</li>
    <li><strong>Gemini экосистем:</strong> Google-ийн бүх хиймэл оюуны нөөцийг нэгтгэн мультимодал (текст, аудио, видео, код) ойлголттой цогц ухааныг удирдан хөгжүүлж байна.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн үнэлгээ: "Нэгдүгээр шат: Тоглоом ялах, Хоёрдугаар шат: Шинжлэх ухааныг шийдэх"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хассабис TIME сэтгүүлд өгсөн ярилцлагадаа: <em>"Бидний туйлын эрмэлзэл бол өөрөө өөрийгөө сурдаг, аливаа шинжлэх ухааны нууцыг нээдэг AGI бүтээж, цаг уурын дулаарал, эдгэршгүй өвчнүүдийг хүн төрөлхтний өмнөөс шийдвэрлэх явдал юм"</em> гэж онцолжээ. Түүний энэхүү алсын хараа нь хиймэл оюуныг цэвэр арилжааны хөөсрөл биш, шинжлэх ухааны дээд дэвшил болохыг нотолж байна.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-fei-fei-li",
    "slug": "fei-fei-li-godmother-of-ai-imagenet-world-labs-biography",
    "title": "Фэй-Фэй Ли: 'AI-ийн загалмайлсан эх' ба 3D орон зайн оюун ухааны (Spatial Intelligence) шинэ хил хязгаар",
    "subtitle": "ImageNet-ээр орчин цагийн гүн сургалтыг эхлүүлсэн Станфордын профессор World Labs стартапаар бодит ертөнцийг ойлгох дараагийн хувьсгалыг удирдаж байна.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "08:30",
    "readCount": 5100,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Фэй-Фэй Ли", "ImageNet", "World Labs", "Spatial Intelligence"],
    "rank": 5,
    "coverImage": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Профессор Фэй-Фэй Ли (Станфордын их сургууль, World Labs үүсгэн байгуулагч)",
    "isMainLead": False,
    "isHot": True,
    "summary": "16 насандаа Америкт ирж угаалгын газар ажиллангаа физик, компьютерийн ухаанд суралцсан Фэй-Фэй Ли 2009 онд ImageNet өгөгдлийн санг байгуулснаар өнөөдрийн хиймэл оюуны гүн сургалтын (Deep Learning) их тэсрэлтийг асаасан юм. Түүний шинэ стартап World Labs яагаад хиймэл оюунд 3D ертөнцийг харах нүд бэлэглэж буйг задлан шинжилнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хэрэв орчин үеийн хиймэл оюуны хувьсгалыг асаасан ганц төслийг нэрлэ гэвэл энэ нь эргэлзээгүй <strong>ImageNet</strong> юм. Энэхүү төслийг санаачлан, эрдэм шинжилгээний ертөнц тоохоо больсон байсан их өгөгдөл дээр ганцаар зүтгэж бүтээсэн хүн бол Станфордын их сургуулийн профессор <strong>Фэй-Фэй Ли (Fei-Fei Li)</strong> бөгөөд дэлхий дахин түүнийг <em>"AI-ийн загалмайлсан эх" (Godmother of AI)</em> гэж хүндэтгэн нэрлэдэг.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ФЭЙ-ФЭЙ ЛИ: ТОВЧ АНКЕТ & СТАТУС</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Станфордын Их Сургуулийн Профессор, Stanford HAI-ийн захирал, World Labs үүсгэн байгуулагч</li>
      <li><strong>Боловсрол:</strong> Принстоны их сургууль (Физикийн бакалавр), Caltech (Цахилгаан техникийн доктор)</li>
      <li><strong>Үүсгэн байгуулсан:</strong> ImageNet (2009), AI4ALL (2017), World Labs (2024)</li>
      <li><strong>TIME100 AI ангилал:</strong> Innovators & Thinkers</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Цагаач охиноос Принстоны физикч, Станфордын профессор хүртэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хятадын Чэнду хотод төрсөн тэрбээр 16 насандаа гэр бүлээрээ АНУ-д цагаачлан иржээ. Англи хэл мэдэхгүй эцэг эхийнхээ хамт хими цэвэрлэгээний газар ажиллан, шөнөдөө математик, физикт шамдсаар Принстоны их сургуульд тэтгэлэгтэй элссэн түүх нь түүний тууштай чанарыг илтгэнэ. Калтект биологийн болон компьютерийн харааг хослуулан судалснаар машин хэрхэн харж, ертөнцийг ойлгох суурийг тавьжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI-д онцгой чухал хүн бэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Ли-гийн оруулсан хувь нэмэр хиймэл оюуны үндсэн гурван чиглэлийг өөрчилсөн:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>ImageNet хувьсгал (2009–2012):</strong> Тэр үед бүх судлаачид алгоритмаа сайжруулахыг оролдож байхад Ли <em>"Алгоритмд суралцах өгөгдөл дутагдаж байна"</em> гэж оношилсон. Тэрбээр 14 сая зургийг гар аргаар шошголж ImageNet-ийг бий болгосон бөгөөд 2012 онд Алекс Крижевский үүн дээр AlexNet-ийг сургаснаар гүн сургалтын эрин үе эхэлсэн билээ.</li>
    <li><strong>Хүн төвт хиймэл оюун (Stanford HAI):</strong> Технологийг зөвхөн цэрэг, бизнест биш, эрүүл мэнд, хүн төрөлхтний сайн сайхны төлөө хөгжүүлэх ёс зүйн ухааныг түүчээлсэн.</li>
    <li><strong>World Labs ба Spatial Intelligence (2024-2026):</strong> Түүний үүсгэн байгуулсан World Labs нь 1 тэрбум долларын үнэлгээтэй болж, хиймэл оюунд 2D текстийн цаана буй 3 хэмжээст физик ертөнцийн геометр, физик хуулиудыг сургаж байна. Энэ нь робот техник, автономит ертөнцийн дараагийн том хөдөлгүүр юм.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хэлний загвар хангалтгүй, ертөнц орон зайгаас бүрддэг"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл Ли-г онцлохдоо: <em>"Текст дээр суурилсан LLM-үүд өөрсдийн таазанд хүрч эхэлж буй энэ үед Фэй-Фэй Ли орон зайн оюун ухааныг (Spatial Intelligence) бодит болгож, хиймэл оюуныг бодит ертөнцөд биетээр ажиллах роботын тархи болгон хувиргаж байна"</em> хэмээн тодорхойлжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-sam-altman",
    "slug": "sam-altman-openai-chatgpt-stargate-biography",
    "title": "Сэм Альтман: Цахиурын хөндийн хөрөнгө оруулагчаас ChatGPT, Stargate-ийн 500 тэрбум долларын эзэнт гүрнийг бүтээгч",
    "subtitle": "OpenAI-ийг удирдаж хиймэл оюуныг лабораторийн хананаас гарган дэлхийн нийтийн соёл, геополитикийн төв болгосон стратегич яагаад салбарын гол туйл вэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "08:45",
    "readCount": 5900,
    "readTime": "8 мин унших",
    "tags": ["TIME100 AI", "Сэм Альтман", "OpenAI", "ChatGPT", "AGI"],
    "rank": 6,
    "coverImage": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Сэм Альтман (OpenAI гүйцэтгэх захирал)",
    "isMainLead": False,
    "isHot": True,
    "summary": "Y Combinator-ийн ерөнхийлөгч байсан Сэм Альтман 2015 онд OpenAI-ийг үүсгэн байгуулж, 2022 оны 11 дүгээр сард ChatGPT-ийг нийтийн хүртээл болгосноор орчин цагийн генератив хиймэл оюуны хувьсгалыг эхлүүлсэн. Түүний хөрөнгө босгох ер бусын авьяас, олон улсын хагас дамжуулагчийн эвсэл, AGI-ийн уралдааны манлайллыг шинжилнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2023 оны 11-р сард OpenAI-ийн ТУЗ Сэм Альтманыг огцруулсан боловч дөнгөж 5 хоногийн дотор 700 гаруй ажилтнууд нь түүний талд бат зогсож, ТУЗ-ийг огцруулан эргэн ирсэн түүх нь түүний хиймэл оюуны ертөнцөд ямар их эрх мэдэл, итгэлийг олж авсныг гэрчилдэг. <strong>TIME сэтгүүл</strong> түүнийг дэлхийн хиймэл оюуны хамгийн нөлөөтэй манлайлагчаар тодруулсан нь тохиолдлын хэрэг биш юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// СЭМ АЛЬТМАН: ТОВЧ АНКЕТ & НӨЛӨӨЛӨЛ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> OpenAI-ийн гүйцэтгэх захирал (CEO)</li>
      <li><strong>Өмнөх замнал:</strong> Loopt үүсгэн байгуулагч, Y Combinator-ийн Ерөнхийлөгч</li>
      <li><strong>Бүтээсэн түүх:</strong> GPT-3, ChatGPT, GPT-4, Sora, o1, o3 цуврал</li>
      <li><strong>Зорилтот төсөл:</strong> Stargate (500 тэрбум долларын суперкомпьютер дэд бүтэц)</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Хөрөнгө оруулагчаас технологийн хувьсгалч болсон нь
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Стенфордын их сургуулийг 19 насандаа орхиж гарааны бизнесээ эхлүүлсэн тэрбээр Цахиурын хөндийн хамгийн шилдэг стартап хурдасгуур Y Combinator-ийг 5 жил тэргүүлэхдээ Airbnb, Stripe, Reddit зэрэг компаниудыг тэтгэж байв. 2015 онд Илон Маск, Илья Суцкевер, Грег Брокман нарын хамт OpenAI-ийг анх ашгийн бус судалгааны лаборатори болгон байгуулсан боловч их тооцоололд асар их хөрөнгө хэрэгтэйг ойлгож Microsoft-той 13 тэрбум долларын түншлэл байгуулснаар тоглоомын дүрмийг өөрчилсөн юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт хамгийн шийдвэрлэх нөлөөтэй вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Альтман бол ердөө нэг технологич бус, харин <strong>инженерчлэл, капитал, геополитикийг нэгтгэгч</strong> ховор лидер юм:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>ChatGPT-ийн соёлын цохилт:</strong> 2022 оны 11 сард хэрэглэгчдэд нээснээр хиймэл оюуныг 2 сарын дотор 100 сая идэвхтэй хэрэглэгчтэй болгож, технологийн салбарын бүх аварга корпорацыг (Google, Apple, Meta) чиглэлээ өөрчлөхөд хүргэсэн.</li>
    <li><strong>Масштабжуулах хууль (Scaling Laws):</strong> "Илүү олон чип + их өгөгдөл = илүү ухаалаг систем" гэсэн томьёог бүрэн хэрэгжүүлж, o1, o3 цувралаар reasoning (логик сэтгэлгээ)-ийн шинэ эринийг эхлүүлсэн.</li>
    <li><strong>Stargate дэд бүтэц ба Чипийн сүлжээ:</strong> Дэлхийн эрчим хүч, дата төвүүдийг хамарсан 500 тэрбум долларын төслийг санаачлан, АНУ-ын Засгийн газар болон Арабын сангуудтай хэлэлцээ хийж буй цорын ганц хувь хүн.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуныг бий болгосон Прометей"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл түүнийг дүгнэхдээ: <em>"Сэм Альтман хиймэл оюуны галыг лабораториос хулгайлан хүн бүрийн гарт атгуулсан. Одоо тэр гал ертөнцийг гэрэлтүүлэх үү, эсвэл шатаах уу гэдэг нь түүний алхмаас шууд хамаарна"</em> хэмээн онцолжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-amodei-siblings",
    "slug": "dario-daniela-amodei-anthropic-claude-constitutional-ai-biography",
    "title": "Дарио ба Даниела Амодей: OpenAI-аас гарч Anthropic-ийг үүсгэн байгуулсан ах дүүсийн 'Аюулгүй AGI' ба Claude-ийн бооцоо",
    "subtitle": "Constitutional AI зарчмыг анх нэвтрүүлж, хүний хяналтаас гарахгүй найдвартай оюун бүтээхийг зорьж буй Anthropic-ийн лидерүүд яагаад AI-ийн ирээдүйд шийдвэрлэх нөлөөтэй вэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "09:00",
    "readCount": 4900,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Дарио Амодей", "Даниела Амодей", "Anthropic", "Claude", "Constitutional AI"],
    "rank": 7,
    "coverImage": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Дарио ба Даниела Амодей (Anthropic-ийн үүсгэн байгуулагчид)",
    "isMainLead": False,
    "isHot": True,
    "summary": "OpenAI-ийн судалгааны дэд ерөнхийлөгч байсан биофизикч Дарио Амодей дүү Даниелагийн хамт 'Хиймэл оюуны хөгжил хэт хурдасч, аюулгүй байдлын хяналт орхигдож байна' хэмээн 2021 онд гарч Anthropic-ийг үүсгэсэн. Тэдний бүтээсэн Claude 3.5 Sonnet ба 'Үндсэн хуульт AI' (Constitutional AI) яагаад өнөөдөр салбарын дээд жишиг болсныг дэлгэнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны хамгийн хүчирхэг хоёр компанийн нэг болох <strong>Anthropic</strong>-ийн ард ах дүү <strong>Дарио ба Даниела Амодей</strong> нар зогсож байна. TIME сэтгүүл тэднийг TIME100 AI-д шалгаруулахдаа <em>"Аюулгүй байдлыг зөвхөн лоозон биш, бодит технологийн давуу тал болгон хувиргасан цорын ганц хамтрагчид"</em> хэмээн тодорхойлсон юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ANTHROPIC ҮҮСГЭН БАЙГУУЛАГЧИД: ТОВЧ АНКЕТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Дарио Амодей (CEO):</strong> Принстоны биофизикийн доктор, OpenAI-ийн GPT-2, GPT-3 судалгааны удирдагч</li>
      <li><strong>Даниела Амодей (President):</strong> OpenAI-ийн Бодлого ба Аюулгүй байдлын дэд ерөнхийлөгч асан</li>
      <li><strong>Хөрөнгө оруулагчид:</strong> Amazon ($4B), Google ($2B)</li>
      <li><strong>Гол бүтээл:</strong> Claude загварууд (Opus, Sonnet, Haiku), Constitutional AI, Mechanistic Interpretability</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. OpenAI-аас татгалзаж, шинэ философийг сонгосон нь
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Дарио Амодей бол GPT-2 болон GPT-3-ийн ард зогссон гол онолчдын нэг. Гэвч 2020 онд OpenAI-ийн чиглэл хэт арилжаажиж, Microsoft-той байгуулсан гэрээ нь аюулгүй байдлын судалгааг хоёрдугаарт тавьж эхэлснийг анзаармагц тэрбээр өөрийн гол багийн хамт гарч, 2021 онд <strong>Anthropic</strong>-ийг "Нийтийн ашиг тусын корпораци" (PBC) хэлбэрээр үүсгэн байгуулжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Амодейгийн удирдлага дор Anthropic нь дараах хоёр хувьсгалыг хийсэн:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Constitutional AI (Үндсэн хуульт хиймэл оюун):</strong> Загварыг зөвхөн хямд ажиллах хүчээр шүүх (RLHF) бус, харин НҮБ-ын Хүний эрхийн түгээмэл тунхаглал зэрэг баримт бичгүүдийг өөрт нь суулгаж, өөрөө өөрийнхөө хариултыг хянадаг өөрийн шүүлтүүрийн зарчмыг анх нэвтрүүлсэн.</li>
    <li><strong>Mechanistic Interpretability (Нейрон сүлжээний рентген зураг):</strong> LLM-ийг тайлагдашгүй "хар хайрцаг" байлгахгүйн тулд загварын дотор аль нейрон ямар ойлголтыг (худал хэлэх, кодлох, зальдах) хариуцаж буйг нүдээр харах шинжилгээний аргыг нээсэн.</li>
    <li><strong>Claude 3.5 Sonnet:</strong> Програмчлал, логик сэтгэлгээ, бичвэрийн найруулгаар дэлхийн бүх моделиудыг тэргүүлж, хөгжүүлэгчдийн хамгийн дуртай загвар болж чадсан.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны хөгжилд тоормос хэрэгтэйг сануулагч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Дарио Амодей саяхан <em>"Machines of Loving Grace"</em> хэмээх 15,000 үгтэй тунхаглалаа нийтэлж, аюулгүй AGI нь 10 жилийн дотор биологи, анагаах ухааны зуун жилийн ахицыг авчрах боломжтойг зарласан. Тэрбээр дэлхийн засгийн газруудад <em>"Бид хамгийн аюултай супер загваруудын хөгжүүлэлтийн хурдыг түр сааруулах ёстой"</em> хэмээн сануулж буй хамгийн нөлөөтэй дуу хоолой юм.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-mustafa-suleyman",
    "slug": "mustafa-suleyman-deepmind-inflection-microsoft-ai-biography",
    "title": "Мустафа Сүлейман: DeepMind-ийн хамтран үүсгэн байгуулагчаас Microsoft AI-ийн эзэнт гүрний тэргүүн болсон замнал",
    "subtitle": "'The Coming Wave' номын зохиогч яагаад хүн төрөлхтөн хиймэл оюуны давалгааг хязгаарлан барих (Containment) ёстойг дэлхийн бодлого тодорхойлогчдод анхааруулж байна вэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "09:15",
    "readCount": 4700,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Мустафа Сүлейман", "Microsoft AI", "Inflection", "DeepMind"],
    "rank": 8,
    "coverImage": "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Мустафа Сүлейман (Microsoft AI гүйцэтгэх захирал)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Сири гаралтай таксины жолоочийн хүүгээс эхлээд Оксфордыг орхиж DeepMind, Inflection AI-ийг үүсгэн байгуулж, улмаар Сатья Наделлагийн шууд урилгаар Microsoft AI-ийн гүйцэтгэх захирал болсон Мустафа Сүлейманы замнал. Түүний 'Interactive AI' ба технологийн аюулыг хязгаарлах 'Containment' номлолыг тоймлоно.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2024 оны 3-р сард Microsoft корпорацын гүйцэтгэх захирал Сатья Наделла бүх хэрэглэгчийн хиймэл оюуны бүтээгдэхүүнээ (Copilot, Bing, Edge, Windows AI) нэгтгэн удирдуулахаар <strong>Мустафа Сүлейманыг</strong> Microsoft AI-ийн тэргүүнээр томилсон нь технологийн зах зээлийг донсолгосон юм. TIME100 AI жагсаалтад түүнийг дэлхийн хамгийн нөлөө бүхий удирдагчдын нэгээр онцолсон билээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// МУСТАФА СҮЛЕЙМАН: ТОВЧ АНКЕТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Microsoft AI гүйцэтгэх захирал (CEO)</li>
      <li><strong>Үүсгэн байгуулсан:</strong> DeepMind (2010), Inflection AI (Pi чатбот, 2022)</li>
      <li><strong>Бэстселлер ном:</strong> 'The Coming Wave: Technology, Power, and the Twenty-first Century's Greatest Dilemma' (2023)</li>
      <li><strong>Концепци:</strong> Interactive AI (Даалгавар бие даан биелүүлдэг агентууд)</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Лондонгийн ядуусын хорооллоос дэлхийн технологийн оргил руу
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Сүлейман Сириэс цагаачилсан таксины жолооч болон англи сувилагчийн гэр бүлд өсчээ. Оксфордын их сургуулийг 19 насандаа хаяж, Мусульман залуусын сэтгэл зүйн тусламжийн утас ажиллуулан, Лондон хотын захиргаанд нийгмийн бодлого боловсруулж байсан нь түүнийг технологийн хүнд үзүүлэх нийгмийн нөлөөллийг гүн ойлгоход тусалсан байна. 2010 онд Дэмис Хассабистай хамтран DeepMind-ийг үүсгэж, улмаар Google-д 650 сая доллароор худалджээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал хүн бэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Сүлейманы нөлөө хоёр том үндэст суурилдаг:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Interactive AI (Интерактив оюун):</strong> Сүлейманы хэлснээр: <em>"Эхний шат бол Generative AI (бичвэр, зураг үүсгэх), хоёр дахь шат бол Interactive AI (хүний өмнөөс вэб хөтөч нээж, зочид буудал захиалах, гэрээ байгуулах, код ажиллуулах автономит агентууд)"</em> юм. Тэрбээр өнөөдөр Microsoft-ийн тэрбум гаруй Windows хэрэглэгчдийн өдөр тутмын амьдралд энэхүү агентуудыг суулгаж байна.</li>
    <li><strong>'The Coming Wave' ба Хязгаарлалтын бодлого (Containment):</strong> Түүний бичсэн ном нь хиймэл оюун болон синтетик биологийн давалгааг хүн төрөлхтөн хэрхэн хяналтандаа барих ёстойг сануулсан дэлхийн улстөрчдийн ширээний ном болсон. Тэрбээр хагас дамжуулагчийн нийлүүлэлтийн сүлжээгээр дамжуулан аюултай супер загваруудыг хянах тогтолцоог санал болгосон юм.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуныг нийгэмшүүлэгч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Мустафа Сүлейман шинжлэх ухааны лаборатори болон олон нийтийн бодит амьдралын хооронд гүүр болж буй ховор удирдагч юм. Тэрбээр хиймэл оюуны асар их хүчийг энгийн хэрэглэгчийн өдөр тутмын хэрэгсэл болгохын зэрэгцээ түүний аюулыг илэн далангүй шүүмжилдэг"</em> хэмээн бичжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-yoshua-bengio",
    "slug": "yoshua-bengio-turing-award-mila-ai-safety-treaty-biography",
    "title": "Ёшуа Бенжио: Тьюрингийн шагналт эрдэмтэн яагаад арилжааны компаниудын эсрэг зогсож, хиймэл оюуны гэрээг шаардах болов?",
    "subtitle": "Deep Learning-ийн үндэслэгчдийн нэг тэрбээр биологийн зэвсэг болон автономит супер оюуны эрсдэлээс сэргийлэх Олон улсын гэрээг НҮБ-ын түвшинд санаачлан лоббидож байна.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "09:30",
    "readCount": 4600,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Ёшуа Бенжио", "Тьюрингийн шагнал", "Mila", "AI Safety"],
    "rank": 9,
    "coverImage": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Профессор Ёшуа Бенжио (Монреалийн их сургууль, Mila тэргүүн)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Гүн сургалтын (Deep Learning) эцэг гэгддэг 3 эрдэмтний нэг (Хинтон, ЛеКун, Бенжио) Ёшуа Бенжио өндөр цалинтай том корпорацуудад очихоос татгалзаж, Монреальд дэлхийн хамгийн том академик төв Mila-г байгуулсан. Өнөөдөр тэрбээр хиймэл оюуны аюулаас хүн төрөлхтнийг хамгаалах Олон улсын гэрээг батлуулахын төлөө тэмцэж буй намтар.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2018 онд <strong>Тьюрингийн шагналыг</strong> хамтдаа хүртсэн <em>"Гүн сургалтын загалмайлсан гурван эцэг"</em>-ээс Жеффри Хинтон Google-д, Янн ЛеКун Meta-д очсон бол зөвхөн <strong>Ёшуа Бенжио</strong> л академик эрх чөлөөгөө хадгалж их сургуульдаа үлдсэн юм. <strong>TIME100 AI</strong>-д түүнийг "Thinkers" (Сэтгэгчид) ангиллын хамгийн чухал хүнээр нэрлэсэн учир нь тэрбээр өөрийн бүтээсэн технологийнхоо эрсдэлийг хамгийн түрүүнд ухаарч, дэлхийн засгийн газруудад дуут дохио өгч байгаа явдал билээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЁШУА БЕНЖИО: ТОВЧ АНКЕТ & ЭРХЭМ ЧАНАР</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Монреалийн Их Сургуулийн Профессор, Mila хүрээлэнгийн шинжлэх ухааны захирал</li>
      <li><strong>Шагнал:</strong> Компьютерийн шинжлэх ухааны Нобель гэгдэх 2018 оны Тьюрингийн шагнал</li>
      <li><strong>Судалгаа:</strong> Нейрон сүлжээний хэлний загвар (Word Embeddings-ийн анхдагч, 2003), Attention механизм</li>
      <li><strong>Тэмцэл:</strong> Цэргийн автономит зэвсэг болон хяналтгүй супер оюуны эсрэг олон улсын хориг</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Орчин үеийн хэлний загварын үндэс суурийг тавьсан нь
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Парист төрж, Канадад суурьшсан Бенжио 1980-аад оноос эхлэн хиймэл оюуны өвөлжилтийн хүнд жилүүдэд нейрон сүлжээний онолыг ганцаар шаргуу судалжээ. 2003 онд түүний нийтэлсэн <em>"A Neural Probabilistic Language Model"</em> өгүүлэл нь үгсийг вектор орон зайд буулгах (embedding) зарчмыг анх гаргаж ирсэн бөгөөд энэ нь өнөөдрийн бүх LLM (GPT, Claude, Gemini)-ийн суурь тулгуур болсон юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Бенжио бол арилжааны сонирхолгүй, бие даасан хамгийн өндөр нэр хүндтэй академик шүүмжлэгч юм:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Mila институтийн эзэнт гүрэн:</strong> Монреаль хотыг дэлхийн хиймэл оюуны судалгааны нийслэл болгож, 1000 гаруй шилдэг судлаачдыг нэгтгэсэн бие даасан судалгааны лабораторийг байгуулсан.</li>
    <li><strong>Супер оюуны эрсдэлийн сэрэмжлүүлэг:</strong> Хэрэв хиймэл оюун хүнээс илүү ухаалаг болж, өөрийгөө хамгаалах зорилго тавибал хүн төрөлхтний оршин тогтнолд заналхийлнэ гэдгийг математик загварчлалаар нотолж, Их Британийн Блетчли Паркийн дэлхийн AI аюулгүй байдлын анхны дээд хэмжээний уулзалтын шинжлэх ухааны ерөнхий тайланг ахалсан.</li>
    <li><strong>Олон улсын хориг гэрээ:</strong> Цөмийн зэвсгийн үл дэлгэрүүлэх гэрээ шиг, биологийн болон кибер дайралт хийх чадвартай хиймэл оюуны загваруудыг тусгай зөвшөөрөлтэй болгох дэлхийн хуулийг НҮБ-ын түвшинд санаачлагч.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны ухамсрын дуу хоолой"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Бенжио бол өөрийн бүтээсэн гайхамшигт бүтээлийг хүн төрөлхтний сайн сайхны төлөө үйлчлүүлэхийн тулд корпорацуудын хязгааргүй шуналын өөдөөс эрдэмтний ёс зүйгээр сөргөн зогсож буй эрхэм юм"</em> хэмээн хүндэтгэн дүгнэжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-arthur-mensch",
    "slug": "arthur-mensch-mistral-ai-sovereign-ai-biography",
    "title": "Артюр Менш: Google DeepMind-аас гарч 1 жилийн дотор 6 тэрбум долларын үнэлгээнд хүрсэн Mistral AI-ийн нууц",
    "subtitle": "Цахиурын хөндийн монополын эсрэг Европын бие даасан нээлттэй жинтэй загваруудыг тунхагласан 32 настай франц эрдэмтэн яагаад дэлхийн AI-д онцгой чухал вэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "09:45",
    "readCount": 4800,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Артюр Менш", "Mistral AI", "Нээлттэй жин", "Европын AI"],
    "rank": 10,
    "coverImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Артюр Менш (Mistral AI гүйцэтгэх захирал ба үүсгэн байгуулагч)",
    "isMainLead": False,
    "isHot": True,
    "summary": "Парисын Политехникийн сургууль, DeepMind-д ажиллаж байсан 31 настай Артюр Менш 2023 онд найзуудын хамт ердөө 7 хуудас төлөвлөгөөгөөр 113 сая доллар босгож Mistral AI-ийг эхлүүлсэн. Нээлттэй жинтэй Mixtral загваруудаар Америкийн монополыг нурааж Европын 'Бүрэн эрхт хиймэл оюун'-ы бэлгэ тэмдэг болсон түүх.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Цахиурын хөндийн аварга компаниуд хиймэл оюуныг хэдэн зуун тэрбум долларын зардалтай хаалттай хашаа (Closed Wall) болгон монополчлохыг эрмэлзэж байх үед Парисаас нэгэн залуу эрдэмтэн дэлхийн тавцанд гарч ирсэн нь <strong>Mistral AI</strong>-ийн үүсгэн байгуулагч <strong>Артюр Менш (Arthur Mensch)</strong> байлаа. <strong>TIME100 AI</strong>-д түүнийг "Innovators" ангиллын тэргүүн эгнээнд багтаасан нь санамсаргүй хэрэг биш юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// АРТЮР МЕНШ: ТОВЧ АНКЕТ & БИЗНЕС ТҮҮХ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Mistral AI-ийн гүйцэтгэх захирал (CEO)</li>
      <li><strong>Боловсрол:</strong> École Polytechnique, Télécom Paris (Математик, машины сургалтын доктор)</li>
      <li><strong>Туршлага:</strong> Google DeepMind-ийн Парисын салбарт тэргүүлэх судлаач (Chinchilla, Retro загварууд)</li>
      <li><strong>Компанийн үнэлгээ:</strong> Үүсгэн байгуулагдсанаас хойш 12 сарын дотор 6 тэрбум доллар давсан</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Chinchilla Scaling Law-аас Mistral-ийн төрсөн түүх
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Менш DeepMind-д байхдаа алдарт <em>Chinchilla</em> өгүүллийн хамтран зохиогчоор ажилласан. Энэхүү судалгаа нь загварын хэмжээг хэт томруулснаас илүү чанартай өгөгдлөөр жижиг загварыг сургах нь хамаагүй илүү үр дүнтэйг нотолсон юм. Тэрбээр уг зарчмаа бодит бүтээгдэхүүн болгохоор Meta-д ажиллаж байсан найзууд болох Гийом Лампль, Тимоте Лакруа нарын хамт 2023 оны 5 сард Mistral AI-ийг үүсгэжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Меншийн удирдсан Mistral AI нь дэлхийн AI экосистемд 3 том эргэлтийг авчирсан:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Нээлттэй жин (Open Weights) ба Эрх чөлөө:</strong> Apache 2.0 лицензээр Mixtral 8x7B зэрэг шилдэг загваруудынхаа жинг бүрэн нээлттэй татаж авах боломжтой болгож, компаниуд өөрсдийн серверийг нууцлалтай ажиллуулах эрхийг буцаан олгосон.</li>
    <li><strong>Mixture-of-Experts (MoE) үр ашиг:</strong> Бүх нейроныг нэгэн зэрэг ажиллуулахгүйгээр зөвхөн тухайн асуултад тохирох тусгай мэргэшсэн 2 эксперт дэд сүлжээг идэвхжүүлснээр тооцооллын зардлыг 70% хэмнэсэн.</li>
    <li><strong>Европын Бүрэн эрхт хиймэл оюун (Sovereign AI):</strong> Францын Ерөнхийлөгч Эммануэль Макрон болон Европын Холбооны удирдагчид Меншийг дэмжиж, Европын Холбоо Америкийн клаудаас хараат бус байх технологийн хамгийн том найдвар болгон харж байна.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны Давид Голиафыг сөрсөн нь"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Артюр Менш ердөө 40 хүнтэй жижиг багтайгаар Microsoft, Google зэрэг олон мянган инженертэй аваргуудын түвшний гүйцэтгэлийг гаргаж чадсан нь ухаалаг инженерчлэл их хөрөнгөөс хүчтэй байдгийг дэлхийд харуулсан"</em> гэж дүгнэжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-alexandr-wang",
    "slug": "alexandr-wang-scale-ai-rlhf-data-infrastructure-biography",
    "title": "Александр Ванг: 19 насандаа их сургуулиа хаяж, Scale AI-ээр бүх LLM загваруудын 'түлш'-ийг нийлүүлсэн тэрбумтан",
    "subtitle": "OpenAI, Meta, Microsoft-оос эхлээд АНУ-ын Батлан хамгаалах яамны (DoD) бүх хиймэл оюунд шаардлагатай өгөгдлийг бэлтгэдэг 27 настай залуу яагаад чимээгүй эзэн бэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "10:00",
    "readCount": 4500,
    "readTime": "6 мин унших",
    "tags": ["TIME100 AI", "Александр Ванг", "Scale AI", "RLHF", "Өгөгдлийн дэд бүтэц"],
    "rank": 11,
    "coverImage": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Александр Ванг (Scale AI үүсгэн байгуулагч & CEO)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Лос Аламосын цөмийн лабораторийн физикчдийн гэр бүлд өссөн Александр Ванг 19 насандаа MIT-г орхиж 'Хиймэл оюунд өгөгдлийн шошгололт хамгийн чухал' гэдгийг түрүүлж харсан. Түүний байгуулсан 14 тэрбум долларын Scale AI яагаад бүх том LLM болон Пентагоны цэргийн хиймэл оюуны ард чимээгүй ноёрхож буйг өгүүлнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Алтны халуурал өрнөх үед алт ухагчдаас илүү <em>"жоотуу, хүрз зарсан хүмүүс хамгийн их баяжсан"</em> гэдэг үг бий. Хиймэл оюуны эрин үед Nvidia GPU чип зарж баяжсан бол 27 настай <strong>Александр Ванг (Alexandr Wang)</strong> бүх том хиймэл оюуны загваруудын суралцах 'өгөгдлийг' нийлүүлж дэлхийн хамгийн залуу тэрбумтан болсон билээ. <strong>TIME100 AI</strong>-д түүнийг хамгийн залуу, гэхдээ хамгийн суурь нөлөөтэй эрхмээр тодруулсан юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// АЛЕКСАНДР ВАНГ: ТОВЧ АНКЕТ & СТАТУС</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Scale AI-ийн үүсгэн байгуулагч ба гүйцэтгэх захирал (CEO)</li>
      <li><strong>Нас:</strong> 27 нас (Дэлхийн өөрийн хүчээр тэрбумтан болсон хамгийн залуу хүн)</li>
      <li><strong>Үнэлгээ:</strong> 14 тэрбум доллар (Хамгийн сүүлийн санхүүжилтийн шат)</li>
      <li><strong>Үйлчлүүлэгчид:</strong> OpenAI, Meta, Microsoft, Google, АНУ-ын Зэвсэгт хүчин (Пентагон)</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Цөмийн зэвсгийн лабораториос эхэлсэн суурь ухаан
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Ванг Нью-Мексико мужийн Лос Аламос хотод цөмийн физикчдийн гэр бүлд өсчээ. Багаасаа математикийн олимпиадад түрүүлж, 17 насандаа Quora-д ахлах инженерээр ажиллаж, MIT-д элссэн ч нэгдүгээр курсээ дүүргээд сургуулиа орхин 2016 онд <strong>Scale AI</strong>-ийг үүсгэн байгуулжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Загвар хичнээн сайн байлаа ч чанаргүй өгөгдөл сургавал <em>"Хог оруулбал хог гарна" (Garbage in, garbage out)</em> хууль үйлчилдэг:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>RLHF-ийн дэлхийн дэд бүтэц:</strong> ChatGPT болон бусад тэргүүлэх LLM загваруудыг хүний шаардлагад нийцүүлэн зааж сургах (RLHF - Reinforcement Learning from Human Feedback) олон зуун мянган доктор, програмист, шинжээчдийн сүлжээг Scale AI дангаар удирддаг.</li>
    <li><strong>Үндэсний аюулгүй байдал & Цэргийн AI:</strong> Пентагонтой байгуулсан гэрээгээр АНУ-ын армийн сансрын хиймэл дагуул, дроны дүрс бичлэг, тагнуулын мэдээллийг боловсруулах гол платформыг бүтээж буй нь түүнийг геополитикийн гол тоглогч болгосон.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны түлшийг атгагч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Александр Ванг бүх өрсөлдөгч талуудад (OpenAI, Google, Meta, АНУ-ын Засгийн газар) нэгэн зэрэг үйлчилдэг тул хиймэл оюуны уралдаанд хэн ч ялсан Scale AI үргэлж ялагч байх болно"</em> хэмээн тодорхойлжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-liang-wenfeng-deepseek",
    "slug": "liang-wenfeng-deepseek-quant-fund-no-sft-reasoning-biography",
    "title": "Лян Вэньфэн: Уолл Стритийн квант санхүүчээс АНУ-ын чипийн хоригийг нураасан DeepSeek-ийн нууцлаг эзэн",
    "subtitle": "DeepSeek-V3 ба R1 reasoning загваруудыг дөнгөж 6 сая доллароор сургаж, Америкийн 100 сая долларын загваруудыг ардаа орхисон түүний математик философи.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "10:15",
    "readCount": 5700,
    "readTime": "8 мин унших",
    "tags": ["TIME100 AI", "Лян Вэньфэн", "DeepSeek", "DeepSeek-R1", "Хятадын AI"],
    "rank": 12,
    "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Лян Вэньфэн (DeepSeek ба High-Flyer үүсгэн байгуулагч)",
    "isMainLead": False,
    "isHot": True,
    "summary": "Ханжоу хотод 8 тэрбум долларын квант сан High-Flyer-ийг удирдаж байсан математикч Лян Вэньфэн АНУ-ын хагас дамжуулагчийн хатуу хориг дундуур дөнгөж 2048 ширхэг хуучин H800 чип дээр DeepSeek-V3 ба R1 reasoning загваруудыг ердөө 6 сая доллароор сургаж чадсан нь дэлхийн хиймэл оюуны түүхэн дэх хамгийн том шуугиан болсон юм.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2025 оны эхээр Цахиурын хөндийн аварга компаниуд хиймэл оюуны нэг загварыг сургахад 100-500 сая доллар зарцуулж байх үед Хятадын Ханжоу хотоос нэгэн үл мэдэгдэх стартап <strong>DeepSeek-V3</strong> болон <strong>DeepSeek-R1</strong> загвараа дэлхийд танилцуулсан нь Америкийн технологийн хувьцааг 1 их наяд доллароор унагасан юм. Энэхүү эргэлтийн ард зогссон нууцлаг квант санхүүч, математикч <strong>Лян Вэньфэн (Liang Wenfeng)</strong>-ийг <strong>TIME сэтгүүл</strong> энэ зууны хамгийн онцлох шинэчлэгчээр зарлалаа.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЛЯН ВЭНЬФЭН: ТОВЧ АНКЕТ & ОНЦЛОГ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Үүсгэн байгуулсан:</strong> High-Flyer Quant Fund (2015), DeepSeek AI (2023)</li>
      <li><strong>Боловсрол:</strong> Жэжянгийн их сургууль (Компьютерийн ухаан, автоматжуулалт)</li>
      <li><strong>Гол инноваци:</strong> Multi-Head Latent Attention (MLA), DualPipe тооцоолол, Pure RL (Хүний шошгогүй сэтгэх алгоритм)</li>
      <li><strong>Зардал:</strong> OpenAI-ийн загваруудаас 20 дахин хямд өртөгтэй</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Квант арилжаанаас цэвэр хиймэл оюуны судалгаа руу
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Лян Вэньфэн Жэжянгийн их сургуулийг төгссөний дараа санхүүгийн зах зээл дээр хиймэл оюуны алгоритмаар автомат арилжаа хийдэг High-Flyer санг үүсгэсэн. Түүний сан Хятадын хамгийн том квант сангуудын нэг болж хэдэн тэрбум долларын ашиг олсон тул тэрбээр венчур хөрөнгө оруулагчдаас мөнгө гуйлгүйгээр, өөрийн хөрөнгөөрөө бүрэн санхүүжсэн <strong>DeepSeek</strong> лабораторийг байгуулжээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт хамгийн чухал хүн бэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Лян Вэньфэн АНУ-ын Цахиурын хөндийн ноёрхлын хоёр том суурийг нураасан:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Чипийн хоригийг алгоритмаар давсан нь:</strong> АНУ Хятад руу Nvidia H100, B200 чип экспортлохыг хатуу хориглосон ч Лян хуучин H800 чипүүдийн санах ойн сувгийг (bandwidth) 90% хэмнэдэг MLA архитектур болон DualPipe паралель тооцооллыг зохион бүтээж, хоригийг үнэ цэнгүй болгосон.</li>
    <li><strong>DeepSeek-R1 ба Pure Reinforcement Learning:</strong> Хүний гараар бэлтгэсэн олон сая зааварчилгаагүйгээр (No-SFT), загвар зөвхөн цэвэр математик, кодын зөв бурууг шалгах дүрмээр өөрөө өөртэйгөө тоглож сэтгэж сурдаг (Reasoning) хувьсгалыг анх нээлттэй жинтэйгээр нийтэлсэн.</li>
    <li><strong>AI Монополыг унагасан нь:</strong> API-ийн үнийг 95% бууруулж, дэлхийн сая сая хөгжүүлэгч, стартапуудад маш бага зардлаар GPT-4o болон o1 түвшний ухааныг ашиглах боломж олгосон.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны зардлын ханыг нураагч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Лян Вэньфэн дэлхий дахинд хиймэл оюун бол зөвхөн хэдэн зуун тэрбум доллартай Америкийн 3-4 монополын тоглоом биш, харин математик сэтгэлгээтэй цөөн тооны суут эрдэмтдийн бүтээлч ялалт байж болдгийг батлан харууллаа"</em> хэмээн дүгнэсэн байна.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-andrej-karpathy",
    "slug": "andrej-karpathy-tesla-fsd-openai-eureka-labs-biography",
    "title": "Андрей Карпати: Tesla-ийн Автопилотоос Eureka Labs хүртэл — Дэлхийн хамгийн нөлөө бүхий AI багш ба инженер",
    "subtitle": "Цэвэр C хэл дээр LLM-ийг тэгээс нь бичих (llm.c) болон 'Software 2.0' философиор сая сая хөгжүүлэгчдэд хиймэл оюуны үнэнийг зааж буй алсын хараач.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "10:30",
    "readCount": 4950,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Андрей Карпати", "Tesla FSD", "Eureka Labs", "Software 2.0"],
    "rank": 13,
    "coverImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Андрей Карпати (OpenAI үүсгэн байгуулагч гишүүн, Eureka Labs үүсгэн байгуулагч)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Словакт төрж Канад, Америкт боловсорсон Андрей Карпати Станфордын анхны гүн сургалтын курсийг (CS231n) санаачилж, OpenAI-ийг үүсгэн байгуулж, улмаар Илон Маскийн урилгаар Tesla-ийн Бүрэн Өөрийгөө Жолоодох (FSD) системийн ахлах захирлаар 5 жил ажилласан. Өнөөдөр тэрбээр хиймэл оюунаар боловсролыг өөрчлөх Eureka Labs-ийг удирдаж байна.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны ертөнцөд код бичдэг инженерүүдээс эхлээд их сургуулийн профессорууд хүртэл бүгдээрээ нэгэн дуугаар хүндэтгэдэг нэгэн эрхэм бол <strong>Андрей Карпати (Andrej Karpathy)</strong> юм. <strong>TIME100 AI</strong>-д түүнийг "Innovators & Thinkers" ангилалд тодруулсан нь түүний инженерийн суу билгээс гадна, хиймэл оюуныг дэлхий дахинд ойлгомжтойгоор түгээж буй сурган хүмүүжүүлэх гавьяатай нь салшгүй холбоотой.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// АНДРЕЙ КАРПАТИ: ТОВЧ АНКЕТ & ТҮҮХЭН ОЛОЛТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Eureka Labs үүсгэн байгуулагч</li>
      <li><strong>Өмнөх туршлага:</strong> Tesla-ийн Хиймэл оюун ба Компьютер харааны ахлах захирал, OpenAI үүсгэн байгуулагч гишүүн</li>
      <li><strong>Боловсрол:</strong> Торонтогийн их сургууль (Жеффри Хинтоны шавь), Станфорд (Фэй-Фэй Лигийн удирдлага дор доктор)</li>
      <li><strong>Нээлттэй төслүүд:</strong> nanoGPT, llm.c, CS231n Станфордын лекцүүд</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. 'Software 2.0' философийн анхдагч
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Карпати 2017 онд алдарт <em>"Software 2.0"</em> хэмээх эсээгээ нийтэлж, хүн төрөлхтний програмчлалын арга барил өөрчлөгдсөнийг зарласан. "Software 1.0" нь хүн өөрөө бүх дүрмийг кодоор (C++, Python) бичдэг байсан бол "Software 2.0" нь нейрон сүлжээ өгөгдлийг харж байж өөрөө өөртөө код зохиодог болсон явдал юм. Тэрбээр уг философио Tesla-ийн автопилотод бодитоор хэрэгжүүлж, олон сая автомашины камерын өгөгдлийг боловсруулах дэлхийн хамгийн том дэд бүтцийг босгожээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал хүн бэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Карпати бол хиймэл оюуны хөгжилд практик болон сургалтын аль алинд үнэлж баршгүй хувь нэмэр оруулсан:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Сая сая инженерүүдийн багш:</strong> Түүний бэлтгэсэн YouTube-ийн хичээлүүд болон Станфордын CS231n курсээр өнөөдрийн Цахиурын хөндийн тэргүүлэх инженерүүд суралцаж төгссөн. Тэрбээр нарийн математикийг энгийн үгээр тайлбарлахдаа дэлхийд хосгүй.</li>
    <li><strong>nanoGPT ба llm.c төслүүд:</strong> Орчин үеийн LLM-үүдийг асар том PyTorch сангуудаас хамааралгүйгээр, энгийн 1000 мөр цэвэр C хэл дээр хурдан ажиллах хэлбэрт шилжүүлснээр хиймэл оюуны инженерийн хөнгөн бүтцийг бий болгосон.</li>
    <li><strong>Eureka Labs ба Боловсролын шинэчлэл:</strong> 2024 онд тэрбээр хүний хувийн онцлогт тохируулан заадаг хиймэл оюуны багшийг (AI-native Education) хөгжүүлэх Eureka Labs-ийг эхлүүлсэн.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны нууцыг хүн бүрд нээгч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл түүнийг: <em>"Хиймэл оюуны кодыг нууцалж, зөвхөн ашгийн төлөө зардаг компаниуд олширсон энэ цаг үед Андрей Карпати мэдлэгийг нээлттэй байлгаж, хүн төрөлхтний оюуны нөөцийг бэлтгэхэд насаа зориулж буй хамгийн үнэ цэнтэй инженер багш юм"</em> хэмээн сайшаажээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-timnit-gebru",
    "slug": "timnit-gebru-dair-algorithmic-bias-stochastic-parrots-biography",
    "title": "Тимнит Гебру: Google-ийг донсолгосон 'Stochastic Parrots' өгүүлэл ба Алгоритмын тэгш бус байдлын эсрэг тэмцэгч",
    "subtitle": "Хиймэл оюуны ёс зүй, нүүр царай таних алгоритмын арьс өнгөөр ялгаварлах алдааг илчилж DAIR бие даасан судалгааны хүрээлэнг байгуулсан эрдэмтний намтар.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "10:45",
    "readCount": 4200,
    "readTime": "6 мин унших",
    "tags": ["TIME100 AI", "Тимнит Гебру", "DAIR", "AI Ethics", "Алгоритмын шударга ёс"],
    "rank": 14,
    "coverImage": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Доктор Тимнит Гебру (DAIR хүрээлэнгийн үүсгэн байгуулагч)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Эритрейгээс цагаачилж Станфордын их сургуульд доктор хамгаалсан Тимнит Гебру Google-ийн Ёс зүйт AI багийн хамтрагч байхдаа их хэлний загваруудын хүрээлэн буй орчны хор уршиг, арьс өнгөөр ялгаварлах аюулыг сануулсан 'On the Dangers of Stochastic Parrots' өгүүллээс болж шуугиантайгаар халагдсан. Түүний эхлүүлсэн хараат бус DAIR хүрээлэн ба алгоритмын шударга ёсны тэмцлийг өгүүлнэ.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны хөгжил зөвхөн хурд, ашиг орлогоор хэмжигдэх ёсгүй, харин нийгмийн эмзэг бүлэг, өнгөт арьстан, нийт хүн төрөлхтөнд тэгш үйлчлэх ёстойг дэлхийн тавцанд зоригтой дуугарч буй хүн бол <strong>Тимнит Гебру (Timnit Gebru)</strong> юм. <strong>TIME100 AI</strong>-д түүнийг "Shapers & Thinkers" ангилалд нэрлэсэн явдал нь технологийн аварга компаниудын далд алдааг илчилсэн түүний гавьяаг үнэлсэн хэрэг юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ТИМНИТ ГЕБРУ: ТОВЧ АНКЕТ & СУДАЛГАА</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Distributed AI Research Institute (DAIR) үүсгэн байгуулагч</li>
      <li><strong>Өмнөх туршлага:</strong> Google-ийн Ёс зүйт AI (Ethical AI) багийн хамтран удирдагч, Apple-ийн инженер</li>
      <li><strong>Боловсрол:</strong> Станфордын их сургууль (Цахилгаан техник, AI-ийн доктор)</li>
      <li><strong>Түүхэн судалгаа:</strong> Gender Shades (2018), Stochastic Parrots (2020)</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Gender Shades: Хиймэл оюуны арьс өнгөний алагчлалыг илчилсэн нь
  </h3>
  <p class="leading-relaxed text-neutral-800">
    2018 онд Тимнит Гебру болон MIT-ийн судлаач Жой Буоламвини нарын нийтэлсэн <em>"Gender Shades"</em> судалгаа дэлхий даяар цочрол үүсгэсэн. IBM, Microsoft, Face++ зэрэг тэргүүлэгч компаниудын нүүр царай таних алгоритмууд цагаан арьст эрэгтэй хүнийг 99%-ийн нарийвчлалтай таньдаг мөртлөө хар арьст эмэгтэйчүүдийг 35%-ийн алдаатай таньж байсныг нотолсон юм. Энэ нь хиймэл оюун сургах өгөгдөл нь цагаан арьстнуудын зургаар давамгайлснаас үүдэлтэй байлаа.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. 'Stochastic Parrots' ба Google-ийн их хямрал
  </h3>
  <p class="leading-relaxed text-neutral-800">
    2020 онд Гебру бусад судлаачдын хамт <em>"On the Dangers of Stochastic Parrots"</em> (Санамсаргүй тотьнуудын аюул) хэмээх судалгааны өгүүлэл бичжээ. Тэд их хэлний загварууд нь үнэндээ текстийн утгыг ойлгодоггүй, ердөө л өгөгдсөн текстийг тоть шиг санамсаргүй давтан эвлүүлдэг (Stochastic Parrot) болохыг, мөн эдгээр загваруудыг сургахад ялгарч буй нүүрстөрөгчийн хий нь цаг уурын хямралыг өдөөж байгааг анхааруулсан юм. Google удирдлага уг өгүүллээс нэрээ татахыг шаардахад тэрбээр татгалзаж, улмаар Google-ээс халагдсан нь дэлхийн олон мянган судлаачдын эсэргүүцлийн хөдөлгөөнийг эхлүүлсэн билээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны сүүдэрт талыг гэрэлтүүлэгч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл Гебруг тодорхойлохдоо: <em>"Тимнит Гебру бол технологийн эзэнт гүрнүүдийн хүч хэрэглэгчийн эрхийг зөрчихөөс сэргийлж, хиймэл оюуны ёс зүйн судалгааг бие даасан хараат бус салбар болгон хөгжүүлсэн хамгийн зоригтой тэмцэгч юм"</em> хэмээн өндрөөр үнэлсэн байна.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-andrew-ng",
    "slug": "andrew-ng-google-brain-coursera-deeplearning-data-centric-biography",
    "title": "Эндрю Ын: Сая сая инженерийг сургасан 'Deep Learning'-ийн элч ба Data-Centric AI хувьсгал",
    "subtitle": "Google Brain-ийг үүсгэн байгуулж, Coursera-аар дамжуулан орчин үеийн хиймэл оюуны мэргэжилтнүүдийн үеийг бэлтгэсэн сурган хүмүүжүүлэгч яагаад салбарын тулгуур багана вэ?",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "11:00",
    "readCount": 5200,
    "readTime": "7 мин унших",
    "tags": ["TIME100 AI", "Эндрю Ын", "Google Brain", "Coursera", "Data-Centric AI"],
    "rank": 15,
    "coverImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Доктор Эндрю Ын (DeepLearning.AI үүсгэн байгуулагч, Станфордын туслах профессор)",
    "isMainLead": False,
    "isHot": False,
    "summary": "2011 онд Google Brain-ийг үүсгэн байгуулж 16,000 процессор дээр 10 сая YouTube бичлэгээс муур таньсан анхны гүн сургалтын тархийг ажиллуулж байсан Эндрю Ын Coursera болон DeepLearning.AI-аар дамжуулан дэлхийн 8 сая хүнд код заасан. 'Хиймэл оюун бол орчин үеийн цахилгаан эрчим хүч юм' гэх алдарт томьёоллыг гаргасан түүний намтар.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хэрэв өнөөдөр дэлхийн аль нэг технологийн компанид ажиллаж буй хиймэл оюуны инженерээс <em>"Та гүн сургалтыг хэний хичээлээр анх сурсан бэ?"</em> гэж асуувал 80 гаруй хувь нь <strong>Эндрю Ын (Andrew Ng)</strong> гэж хариулах болно. <strong>TIME100 AI</strong>-д түүнийг хамгийн хүндтэй багш, шинийг санаачлагчаар өргөмжилсөн нь түүний хиймэл оюуны боловсролыг ардчилсан түүхэн үйлстэй нь холбоотой юм.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЭНДРЮ ЫН: ТОВЧ АНКЕТ & ҮҮСГЭН БАЙГУУЛСАН ТӨСЛҮҮД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> DeepLearning.AI, Landing AI-ийн үүсгэн байгуулагч, Amazon ТУЗ-ийн гишүүн</li>
      <li><strong>Үүсгэн байгуулсан:</strong> Coursera (2012), Google Brain төсөл (2011)</li>
      <li><strong>Өмнөх туршлага:</strong> Baidu-ийн Ерөнхий эрдэмтэн (Chief Scientist), Станфордын их сургуулийн AI лабораторийн захирал</li>
      <li><strong>Философи:</strong> "AI is the new electricity" (Хиймэл оюун бол шинэ цахилгаан эрчим хүч)</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Муур таньсан Google Brain-ээс Coursera хүртэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Их Британид төрж, Хонконг, Сингапурт өссөн Ын Станфордын их сургуульд багшилж байхдаа 2011 онд Жефф Диний хамт <strong>Google Brain</strong> төслийг санаачилсан. Тэд 16,000 компьютерийн процессорыг нэгтгэн, хүнд ямар ч зааварчилгаа өгөлгүйгээр зөвхөн YouTube-ийн бичлэгүүд үзүүлснээр систем өөрөө "муур" болон "хүний нүүр"-ийг бие даан таньж сурсныг зарласан нь орчин үеийн нейрон сүлжээний хамгийн дуулиант эхлэл байлаа.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Эндрю Ын-ийн ололт зөвхөн өнгөрсөн үед биш, өнөөдрийн практик үйлдвэрлэлд шууд үйлчилдэг:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>Data-Centric AI (Өгөгдөл төвт хандлага):</strong> Код болон загварын архитектурыг өөрчлөхөөс илүүтэйгээр сургаж буй өгөгдлийнхөө алдааг цэвэрлэх нь бодит үйлдвэрлэлд 10 дахин их үр дүн өгдөг гэсэн "Data-Centric" шинэ чиглэлийг дэлхий даяар түгээсэн.</li>
    <li><strong>Coursera ба Боловсролын хувьсгал:</strong> Дээд сургуулийн хаалттай лекцүүдийг дэлхийн аль ч өнцөгт байгаа оюутанд үнэгүй хүргэх Coursera платформыг 2012 онд эхлүүлсэн нь олон сая хүний амьдралыг өөрчилсөн.</li>
    <li><strong>Landing AI:</strong> Хиймэл оюуныг зөвхөн вэб дээр биш, үйлдвэрийн дамжлагын чанарын хяналт, хөдөө аж ахуй, уул уурхайн бодит салбаруудад амжилттай нэвтрүүлж байна.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны их соён гэгээрүүлэгч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Эндрю Ын хиймэл оюуныг цөөн хэдэн математикчдын хүрээнээс гарган, дэлхийн бүх салбарын хүмүүс сурч ашиглах боломжтой нийтийн бичиг үсэг болгон хувиргасан түүхэн гавьяатай"</em> хэмээн тэмдэглэжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  },
  {
    "id": "art-time100-arati-prabhakar",
    "slug": "arati-prabhakar-white-house-ostp-darpa-ai-executive-order-biography",
    "title": "Арати Прабхакар: DARPA-ийн анхны эмэгтэй захирлаас Цагаан ордны AI бодлогын ерөнхий архитектор болсон замнал",
    "subtitle": "АНУ-ын Ерөнхийлөгчийн түүхэн 'AI Executive Order'-ийг боловсруулж, хамгийн хүчирхэг загваруудыг засгийн газрын аюулгүй байдлын шалгалтад оруулах суурийг тавьсан эрдэмтэн.",
    "category": "interview",
    "categoryName": "НАМТАР & ХӨРӨГ",
    "primarySource": "TIME Magazine & AI Times Korea",
    "primarySourceUrl": "https://time.com/collection/time100-ai/",
    "publishedAt": "2026-09-15",
    "publishedTime": "11:15",
    "readCount": 4100,
    "readTime": "6 мин унших",
    "tags": ["TIME100 AI", "Арати Прабхакар", "Цагаан ордон", "AI Бодлого", "DARPA"],
    "rank": 16,
    "coverImage": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    "imageCaption": "TIME100 AI: Доктор Арати Прабхакар (Цагаан ордны Шинжлэх ухаан технологийн бодлогын газрын захирал)",
    "isMainLead": False,
    "isHot": False,
    "summary": "Энэтхэгийн Делид төрж Техаст өссөн хагас дамжуулагчийн инженер Арати Прабхакар DARPA болон NIST-ийг удирдан Пентагоны хамгийн нууц төслүүдийг хариуцаж байсан туршлагаараа Цагаан ордны Шинжлэх ухаан, технологийн бодлогын газрын (OSTP) захирлаар томилогдон АНУ-ын түүхэн Хиймэл оюуны захирамжийг (AI Executive Order) боловсруулсан.",
    "content": """<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны ирээдүйг зөвхөн инженерүүд шийддэггүй, харин төрийн бодлого тодорхойлогчид тоглоомын хуулийг зохиодог. АНУ-ын Цагаан ордны Шинжлэх ухаан, технологийн бодлогын газрын захирал (OSTP) <strong>Доктор Арати Прабхакар (Arati Prabhakar)</strong> бол дэлхийн хамгийн хүчирхэг гүрний хиймэл оюуны бодлогын луужинг чиглүүлж буй гол хүн юм. <strong>TIME100 AI</strong>-д түүнийг "Shapers" (Чиглүүлэгчид) ангиллын тэргүүн эгнээнд зарласан билээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// АРАТИ ПРАБХАКАР: ТОВЧ АНКЕТ & ҮҮРЭГ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Албан тушаал:</strong> Цагаан ордны Шинжлэх ухаан, технологийн бодлогын газрын захирал (OSTP Director) ба Ерөнхийлөгчийн шинжлэх ухааны ахлах зөвлөх</li>
      <li><strong>Өмнөх туршлага:</strong> DARPA-ийн анхны эмэгтэй захирал (2012–2017), NIST-ийн захирал (1993)</li>
      <li><strong>Боловсрол:</strong> Caltech (Хэрэглээний физикийн доктор - анхны эмэгтэй доктор)</li>
      <li><strong>Түүхэн баримт бичиг:</strong> Executive Order 14110 on Safe, Secure, and Trustworthy Artificial Intelligence</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Хагас дамжуулагчийн инженерээс Пентагоны удирдагч хүртэл
  </h3>
  <p class="leading-relaxed text-neutral-800">
    34 насандаа Стандарт ба технологийн үндэсний хүрээлэнг (NIST) тэргүүлж, улмаар АНУ-ын Батлан хамгаалах судалгааны агентлаг DARPA-ийн анхны эмэгтэй захирал болсон Прабхакар хиймэл дагуул, дэвшилтэт хагас дамжуулагч, автономит системийн инженерчлэлийг хамгийн өндөр түвшинд удирдаж байсан арвин туршлагатай эрдэмтэн юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад AI салбарт онцгой чухал вэ?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Прабхакар бол төрийн зохицуулалт ба технологийн өрсөлдөөний заагийг тэнцвэржүүлэгч:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-800">
    <li><strong>AI Executive Order-ийн зохиогч:</strong> 2023 оны 10 сард батлагдсан Цагаан ордны зарлигаар 10^26 FLOP-оос дээш тооцооллоор сургагдсан бүх том моделиудыг засгийн газрын аюулгүй байдлын шалгалтад заавал оруулах журмыг хуульчилсан.</li>
    <li><strong>АНУ-ын AI Safety Institute (AISI):</strong> Хиймэл оюуны эрсдэлийг хэмжих дэлхийн анхны төрийн хүрээлэнг байгуулж, OpenAI, Anthropic-ийн шинэ загваруудыг зах зээлд гарахаас өмнө шалгадаг механизмыг бүтээсэн.</li>
    <li><strong>Үндэсний өрсөлдөх чадвар:</strong> Хятад улстай хийж буй технологийн хүйтэн дайнд АНУ-ын хагас дамжуулагчийн манлайллыг (CHIPS Act) хиймэл оюуны эрдэм шинжилгээтэй уялдуулж буй ерөнхий стратегич.</li>
  </ul>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. TIME-ийн дүгнэлт: "Хиймэл оюуны төрийн жолоог атгагч"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    TIME сэтгүүл: <em>"Арати Прабхакар шинжлэх ухааны нарийн гүнийг төрийн засаглалын хүчтэй хослуулж чадсан тул хиймэл оюуны дэлхийн стандартыг Вашингтоноос чиглүүлж буй хамгийн шийдвэрлэх эрхэм юм"</em> гэж тодорхойлжээ.
  </p>
</div>""",
    "sources": [
      {"name": "TIME Magazine", "url": "https://time.com/collection/time100-ai/"},
      {"name": "AI Times Korea", "url": "https://www.aitimes.com"}
    ]
  }
]

def main():
    if not os.path.exists(ARTICLES_PATH):
        print(f"Error: {ARTICLES_PATH} not found!")
        sys.exit(1)

    with open(ARTICLES_PATH, 'r', encoding='utf-8') as f:
        existing_articles = json.load(f)

    existing_ids = {a['id'] for a in existing_articles}
    added_count = 0

    # Insert at the beginning or merge
    new_list = []
    for art in TIME100_ARTICLES:
        if art['id'] not in existing_ids:
            new_list.append(art)
            added_count += 1
        else:
            # Replace existing if needed
            new_list.append(art)

    # Append remaining existing articles
    for a in existing_articles:
        if a['id'] not in {art['id'] for art in TIME100_ARTICLES}:
            new_list.append(a)

    with open(ARTICLES_PATH, 'w', encoding='utf-8') as f:
        json.dump(new_list, f, ensure_ascii=False, indent=2)

    print(f"Successfully processed TIME100 AI articles. Added/Updated: {len(TIME100_ARTICLES)}. Total articles now: {len(new_list)}")

if __name__ == '__main__':
    main()
