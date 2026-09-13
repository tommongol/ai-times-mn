#!/usr/bin/env python3
"""
Inject foundational, law, history, biography, and investigative articles from aitimes.com
into articles.json.
"""

import os
import json

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_FILE = os.path.join(PROJECT_DIR, 'src', 'data', 'articles.json')

FOUNDATIONAL_ARTICLES = [
    {
        "id": "art-aitimes-sutskever-ssi",
        "slug": "ilya-sutskever-safe-superintelligence-ssi-profile",
        "title": "Илья Суцкевер ба 'SSI': Худалдааны бүтээгдэхүүн бус, зөвхөн аюулгүй супер оюун ухаан бүтээх нууцлаг замнал",
        "subtitle": "aitimes.com-ийн онцлох хөрөг: OpenAI-ийн ерөнхий эрдэмтэн асан Илья Суцкевер яагаад Сам Алтманы бизнесийн замаас салж, 10-хан сарын дотор 45 их наяд воны үнэлгээнд хүрсэн Safe Superintelligence Inc-ийг үүсгэн байгуулав?",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=214820",
        "publishedAt": "2026-09-12",
        "publishedTime": "16:30",
        "readCount": 18450,
        "readTime": "12 мин унших",
        "tags": ["Илья Суцкевер", "SSI", "OpenAI", "Superalignment", "AGI Safety", "aitimes.com"],
        "rank": 3,
        "coverImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Илья Суцкевер: 'Хүн төрөлхтөнд ээлтэй AGI бүтээх нь бизнесийн ашгаас хэд дахин чухал цорын ганц зорилго мөн.'",
        "isMainLead": False,
        "isHot": True,
        "summary": "Орчин үеийн гүн сургалтын (Deep Learning) гол эцгүүдийн нэг Илья Суцкевер OpenAI-ийн ТУЗ-ийн шуурганы дараа чимээгүй байсаар 'Safe Superintelligence' (SSI) лабораторио зарлалаа. Тэд ямар ч худалдааны бүтээгдэхүүн гаргахгүй, зар сурталчилгаа, чатбот зарахгүй, зөвхөн хүн төрөлхтнийг мөхөөхгүй аюулгүй супер оюун ухааны суурь кодон дээр ажиллаж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    2023 оны арваннэгдүгээр сард Цахиурын хөндийд өрнөсөн OpenAI-ийн удирдах зөвлөлийн түүхэн эргэлтийн гол дүр нь <strong>Илья Суцкевер</strong> байлаа. Гэвч хэдхэн сарын дараа тэрээр чимээгүйхэн ажлаа өгч, <strong>"Safe Superintelligence Inc" (SSI)</strong> хэмээх шинэ байгууллагыг үүсгэн байгуулснаа зарласан юм. <strong>aitimes.com</strong>-ийн шинжилснээр, уг компани байгуулагдсанаас хойш ердөө 10 сарын дараа Google, Nvidia зэрэг технологийн аваргуудаас хөрөнгө татаж, 45 их наяд вон буюу 32 тэрбум ам.долларын үнэлгээнд хүрсэн нь түүхэнд ховор үзэгдэл болов.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ИЛЬЯ СУЦКЕВЕРИЙН ФИЛОСОФИ БА СУУРЬ БАРИМТ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Байршил: Пало Алто (Калифорни) ба Тель-Авив (Израиль)</li>
      <li>Үндсэн зарчим: <strong>"No commercial products, no distractions"</strong> (Худалдааны бүтээгдэхүүн байхгүй, анхаарал сарниулахгүй)</li>
      <li>Хөрөнгө оруулагчид: NFDG (Daniel Gross), Sequoia Capital, Andreessen Horowitz, Nvidia, Google</li>
      <li>Зорилго: Хүний оюун ухааныг олон дахин давах хүчин чадлыг 100% аюулгүй байдлын хязгаартайгаар нэгэн зэрэг шийдэх</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Торонтогийн лабораториос GPT-4 хүртэлх замнал
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Суцкевер бол орчин үеийн AI хувьсгалыг эхлүүлсэн Алекснет (AlexNet)-ийг 2012 онд Жеффри Хинтонтой хамтран бүтээсэн гурван хүний нэг юм. Түүний 'хэрэв нейрон сүлжээг хангалттай том хэмжээний өгөгдөл, тооцоолох чадлаар тэжээвэл оюун ухаан өөрөө үүснэ' гэсэн зөн совин нь GPT цуврал, ялангуяа GPT-3 болон GPT-4-ийн амин сүнс болсон билээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Яагаад OpenAI-аас салж, SSI-ийг байгуулах болов?
  </h3>
  <p class="leading-relaxed text-neutral-800">
    OpenAI ашгийн төлөөх салбар компани байгуулж, хэрэглэгчийн бүтээгдэхүүн, захиалгын орлого, маркетингийн уралдаанд орсноор супер аюулгүй байдлын (Superalignment) судалгааг хоёрдугаарт тавьж эхэлснийг Суцкевер анзаарчээ. <em>"Супер оюун ухаан бол бидний бүтээх хамгийн сүүлчийн технологи. Хэрэв бид үүнийг буруу тохируулбал дахин засварлах боломж хүн төрөлхтөнд олдохгүй"</em> хэмээн тэрээр ойрын хүрээлэлдээ сануулж байсан тухай aitimes.com мэдээлсэн юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    3. SSI-ийн ирээдүй ба зах зээлийн хүлээлт
  </h3>
  <p class="leading-relaxed text-neutral-800">
    SSI нь ямар ч API зарж орлого олох шаардлагагүй тул урт хугацааны суурь математик болон аюулгүй кернел дээр анхаарлаа төвлөрүүлж байна. Энэ нь ашгийн хойноос уралдаж буй Цахиурын хөндийн бусад стартапуудаас ялгарах хамгийн том давуу тал болж байна.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=214820"},
            {"name": "SSI Official Mission", "url": "https://ssi.inc"},
            {"name": "Stanford HAI Profiles", "url": "https://hai.stanford.edu"}
        ]
    },
    {
        "id": "art-aitimes-hinton-nobel-warning",
        "slug": "geoffrey-hinton-godfather-ai-nobel-prize-warning",
        "title": "'AI-ийн загалмайлсан эцэг' Жеффри Хинтон: Нобелийн шагнал ба хүн төрөлхтөнд өгсөн сүүлчийн сэрэмжлүүлэг",
        "subtitle": "aitimes.com-ийн онцлох хөрөг: Нейрон сүлжээний суурийг тавьсан эрдэмтэн яагаад 75 насандаа Google-ээс огцорч, өөрийн бүтээсэн технологи нь хүн төрөлхтнийг даван гарах 50%-ийн аюул занал болсныг дэлхий дахинд сануулах болов?",
        "category": "interview",
        "categoryName": "НАМТАР & ЯРИЛЦЛАГА",
        "primarySource": "AI Times Korea & Nobel Prize Committee",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=214910",
        "publishedAt": "2026-09-11",
        "publishedTime": "14:15",
        "readCount": 21300,
        "readTime": "10 мин унших",
        "tags": ["Жеффри Хинтон", "Нобелийн шагнал", "Google Brain", "AI Ethics", "aitimes.com"],
        "rank": 4,
        "coverImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Жеффри Хинтон: 'Дижитал оюун ухаан нь биологийн оюун ухаанаас хамаагүй хурдан хуваалцаж суралцдаг. Бид өөрсдөөсөө ухаантай зүйлийг хянаж үзээгүй.'",
        "isMainLead": False,
        "isHot": True,
        "summary": "Нобелийн Физикийн шагналыг 2024 онд Жон Хопфилдын хамт хүртсэн Жеффри Хинтон хагас зуун жилийн турш хиймэл нейрон сүлжээг судалсан. Гэвч PaLM болон GPT-4-ийн сэтгэх чадвар хүний тархины хязгаараас давж буйг хараад Google-ийн дэд ерөнхийлөгчийн ажлаа өгч, бүх цагаа дэлхий дахиныг сэрэмжлүүлэхэд зориулж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны түүхэнд <strong>Жеффри Хинтон</strong>-той зүйрлэх хүн тун цөөн. 1980-аад онд хиймэл оюуныг бүгд шоолж байхад Backpropagation алгоритмыг боловсруулж, 2012 онд ImageNet-ийн тэмцээнд өөрийн шавь Илья Суцкевер, Алекс Крижевский нартайгаа AlexNet-ээр хувьсгал хийсэн эрдэмтэн. <strong>aitimes.com</strong>-д түүний хувь заяаны эргэлтийг <em>'Өөрийн бүтээсэн мангасаа хараад айдсаа илчилсэн орчин үеийн Франкенштейн'</em> хэмээн зүйрлэн бичжээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ДИЖИТАЛ ОЮУНЫ БИОЛОГИЙН ТАРХИНААС ДАВУУ ТАЛ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Хүний тархи: 100 их наяд холбоос бүхий бага эрчим хүчтэй (20W) аналог систем, сурсан зүйлээ бусдад үгээр маш удаан тайлбарладаг</li>
      <li>Дижитал AI: Сая сая хувь нэгэн зэрэг туршлага хуримтлуулж, өөрсдийн жингийн утгыг (weights) <strong>миллисекундийн дотор</strong> хуулбарлан хуваалцдаг</li>
      <li>Эрсдэлийн үнэлгээ: Хинтоны үзэж буйгаар ирэх 20 жилд AI хүн төрөлхтнийг хяналтаас гаргах магадлал <strong>50%</strong> байна</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Google-ээс огцорсон түүх ба Нобелийн шагнал
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хинтон 2023 оны хавар Google-ээс огцрохдоо компанидаа өширхөөгүй, харин <em>"Google-ийн ажилтан гэдэг хаяггүйгээр, өөрийн үзэл бодлыг бүрэн чөлөөтэй илэрхийлэх"</em> зорилготой байв. 2024 онд Шведийн Хааны Академи түүнд Нобелийн Физикийн шагналыг олгох үед тэрээр шагналын индэр дээрээс дэлхийн засгийн газруудад хандан цэрэг дайн, кибер халдлага, хуурамч мэдээллийн эрсдэлийг тооцоолохыг анхааруулсан билээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. "Би өөрийн амьдралын судалгаанд харамсдаггүй, гэхдээ үр дагавраас нь эмээж байна"
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хинтоны хэлснээр, хэрэв тэр энэ судалгааг хийгээгүй байсан ч өөр хэн нэгэн заавал нээх л байсан. Харин одоогийн гол сорилт бол өөрөөсөө илүү оюун ухаантай зүйлийг бий болгосон анхны амьд биет хэрхэн оршин тогтнох вэ гэдэг дээр нэгдэх явдал юм.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=214910"},
            {"name": "Nobel Prize Official", "url": "https://www.nobelprize.org"},
            {"name": "MIT Technology Review", "url": "https://www.technologyreview.com"}
        ]
    },
    {
        "id": "art-aitimes-copyright-fairuse-battle",
        "slug": "ai-copyright-training-data-fair-use-legal-battle",
        "title": "AI сургалтын өгөгдөл ба Зохиогчийн эрхийн дайн: Нью-Йорк Таймс, зохиолчдын OpenAI, Microsoft-ийн эсрэг шүүх ажиллагаа",
        "subtitle": "aitimes.com-ийн эрх зүйн шинжилгээ: АНУ-ын Зохиогчийн эрхийн тухай хуулийн 107-р зүйл буюу 'Шударга хэрэглээ' (Fair Use) нь интернетээс татсан их өгөгдлийг хамгаалж чадах уу, эсвэл бүх дата үнэтэй болох уу?",
        "category": "society",
        "categoryName": "БОДЛОГО & ХУУЛЬ",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=214755",
        "publishedAt": "2026-09-10",
        "publishedTime": "11:20",
        "readCount": 16900,
        "readTime": "9 мин унших",
        "tags": ["Зохиогчийн эрх", "New York Times", "OpenAI", "Fair Use", "EU AI Act", "aitimes.com"],
        "rank": 5,
        "coverImage": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Манхэттэний Холбооны Шүүх: New York Times v. OpenAI & Microsoft хэрэг хиймэл оюуны салбарын өгөгдлийн хууль зүйн ирээдүйг шийднэ.",
        "isMainLead": False,
        "isHot": False,
        "summary": "Дэлхийн хэвлэл мэдээллийн аваргууд өөрсдийн сая сая нийтлэл, номыг хиймэл оюунд зөвшөөрөлгүй өгөгдөл болгон сургасныг эсэргүүцэн шүүхэд өглөө. OpenAI Reddit, News Corp, Axel Springer-тэй олон зуун сая долларын лицензийн гэрээ байгуулж эхэлсэн нь цаашид үнэгүй интернет датагаар AI сургах эрин төгсгөл болсныг харуулж байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны өнөөгийн аварга загварууд (LLM) дэлхийн нийтийн интернетийн бараг бүх нээлттэй текст, нийтлэл, ном дээр суралцсан. Гэвч энэ нь <strong>"Хүний бүтээлийг хулгайлж байна уу, эсвэл номын санд сууж буй оюутан шиг уншиж суралцаж байна уу?"</strong> гэдэг асуултыг үүсгэсэн. <strong>aitimes.com</strong>-ийн хууль зүйн тусгай шинжилгээнд дурдсанаар, Нью-Йорк Таймс болон Америкийн Зохиолчдын Эвлэлийн (Authors Guild) нэхэмжлэл нь 21-р зууны хамгийн өндөр өртөгтэй оюуны өмчийн зарга болж байна.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ХОЁР ТАЛЫН ГОЛ ЭРХ ЗҮЙН БАЙР СУУРЬ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>AI Компаниуд (OpenAI, Microsoft, Meta):</strong> Сургалтын процесс нь "Хувиргах чанартай" (Transformative Use) тул АНУ-ын Зохиогчийн эрхийн хуулийн Fair Use заалтад багтана.</li>
      <li><strong>Хэвлэл, Уран бүтээлчид (NYT, Getty Images):</strong> ChatGPT нь төлбөртэй нийтлэлийг бараг үгчлэн хуулбарлаж (memorization/hallucination), эх нийтлэлийн зах зээлийн орлогыг шууд булааж байна.</li>
      <li><strong>Лицензийн шинэ стандарт:</strong> Reddit ($60M/жил), Axel Springer ($25M+/жил), News Corp ($250M/5 жил) бүхий дата худалдан авалтын шинэ зах зээл үүсэв.</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Memorization ба Шүүхийн бодит нотлох баримтууд
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Нью-Йорк Таймсийн өмгөөлөгчид шүүхэд өгсөн хавтсанд GPT-4-өөс зориуд шахалт үзүүлэхэд Пулицерийн шагналт олон урт нийтлэлийн эхний хэдэн догол мөрийг 99%-ийн ижил үгээр эргүүлэн гаргаж ирсэн баримтуудыг хавсаргажээ. Энэ нь хиймэл оюун зөвхөн "санааг ойлгоогүй", харин эх бүтээлийг дотроо хуулбарлан хадгалсныг баталж байгаа тул Fair Use-ийн хамгаалалтыг эвдэх хүчтэй зэвсэг болсон юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Цаашдын үр дагавар: Үнэгүй датаны эрин үе төгсөв
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хэрэв шүүх хэвлэлүүдийн талд шийдвэр гаргавал шинэ стартапууд дата худалдаж авах чадалгүй болж, зөвхөн олон тэрбум долларын сантай Big Tech-үүд л өгөгдөл худалдан авч монопол тогтоох эрсдэлтэй гэж шинжээчид үзэж байна.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=214755"},
            {"name": "US District Court SDNY", "url": "https://www.nysd.uscourts.gov"},
            {"name": "Reuters Legal", "url": "https://www.reuters.com/legal"}
        ]
    },
    {
        "id": "art-aitimes-military-ai-us-china",
        "slug": "us-china-military-ai-autonomous-weapons-geopolitics",
        "title": "АНУ ба БНХАУ-ын цэргийн хиймэл оюуны өрсөлдөөн: Автоном зэвсэг, пуужингийн онилгоо ба олон улсын хяналтын мухардал",
        "subtitle": "aitimes.com-ийн тусгай сурвалжилга: Пентагон болон Хятадын Ардын чөлөөлөх арми стратегийн AI системүүдийг байлдааны бэлэн байдалд оруулах явцад ёс зүй, зохицуулалтын ямар хана нуран унаж байна вэ?",
        "category": "society",
        "categoryName": "БОДЛОГО & ХУУЛЬ",
        "primarySource": "AI Times Korea (aitimes.com)",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=215102",
        "publishedAt": "2026-09-09",
        "publishedTime": "18:40",
        "readCount": 14200,
        "readTime": "8 мин унших",
        "tags": ["Цэргийн AI", "АНУ-Хятад", "Пентагон", "Автоном зэвсэг", "aitimes.com"],
        "rank": 6,
        "coverImage": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Пентагоны 'Replicator' төсөл: Олон мянган бие даасан дрон, тэнгисийн болон агаарын хиймэл оюунт агентууд зэрэг ажиллах загвар.",
        "isMainLead": False,
        "isHot": False,
        "summary": "Хиймэл оюуны загварууд тагнуулын хиймэл дагуулын мэдээллийг бодит хугацаанд боловсруулж, байлдааны онилгоог секундийн дотор шийдэх болсноор байлдааны тактик үндсээрээ хувьсав. Женевийн конвенцод алгоритмийн шийдвэр гаргах эрхийг хязгаарлах заалт тусгах хүчин чармайлт их гүрнүүдийн өрсөлдөөнөөс болж гацаанд ороод байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуныг зөвхөн эссэ бичих, зураг зурах түвшинд хардаг үе өнгөрч, дэлхийн геополитикийн хамгийн ноцтой талбар болох цэрэг, зэвсэглэлийн салбарт нэвтэрчээ. <strong>aitimes.com</strong>-ийн цэргийн шинжээчдийн нийтлэлд онцолсноор, АНУ-ын Батлан хамгаалах яамны <strong>'Project Replicator'</strong> болон БНХАУ-ын цэргийн хиймэл дагуулын сүлжээний автоматжуулалт нь уламжлалт хүний шийдвэр гаргах хурдыг хэдийн давж эхэлжээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// ЦЭРГИЙН AI ТЕХНОЛОГИЙН ТҮВШИН</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Автоном дрон сүрэг (Drone Swarms): Нэгдсэн операторгүйгээр хоорондоо радио долгионгүйгээр харилцаж бай онох чадвар</li>
      <li>Хиймэл дагуулын аналитик: Секундэд хэдэн зуун квадрат км газрын өөрчлөлтийг тооцоолж, нууцлагдсан техникийг илрүүлэх</li>
      <li>Цөмийн команд удирдлага: AI-ийн буруу дүгнэлтээр хариу цохилт өгөх эрсдэлийг хаах 'Human-in-the-loop' стандарт</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Аюулгүй байдлаас илүү ялалт чухал" гэх бодлогын эргэлт
  </h3>
  <p class="leading-relaxed text-neutral-800">
    АНУ-ын шинэ удирдлагын зүгээс AI зохицуулалтыг хэт чангатгах нь Хятадын өмнө давуу талаа алдахад хүргэнэ гэж үздэг. Вашингтоны стратегийн төвүүд AI стартапуудыг батлан хамгаалах салбартай хамтрахыг уриалж байгаа бол Google, Anthropic зэрэг лабораториудын дотор цэргийн төсөлд оролцох эсэх ёс зүйн дотоод зөрчил хурцдаж байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Олон улсын хяналтгүй шинэ зэвсэглэлийн уралдаан
  </h3>
  <p class="leading-relaxed text-neutral-800">
    НҮБ-ын түвшинд бие даан гал нээх чадвартай автоном зэвсгийг хориглох гэрээ байгуулахыг 10 гаруй жил оролдож байгаа ч их гүрнүүд вето тавьсаар байна. AI-ийн шийдвэрээр хүн аминд хүрсэн тохиолдолд хариуцлагыг хэн хүлээх нь олон улсын эрх зүйн хувьд нээлттэй хэвээр үлджээ.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=215102"},
            {"name": "Foreign Affairs", "url": "https://www.foreignaffairs.com"},
            {"name": "Defense One", "url": "https://www.defenseone.com"}
        ]
    },
    {
        "id": "art-aitimes-history-dartmouth-to-reasoning",
        "slug": "70-years-of-ai-history-from-dartmouth-to-reasoning-models",
        "title": "Дартмутаас Reasoning эрин үе хүртэл: Хиймэл оюуны 70 жилийн түүх, өвөлжилт ба их тэсрэлт",
        "subtitle": "aitimes.com түүхэн архив: 1956 онд Жон Маккарти 'Хиймэл оюун' нэр томьёог анх дуудсанаас эхлээд өнөөгийн бие даан дүгнэлт хийдэг эрлийз сэтгэх загварууд (Reasoning Models) хүртэлх технологийн 5 их эргэлтийн цэг.",
        "category": "opinion",
        "categoryName": "ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ",
        "primarySource": "AI Times Korea Special Archive",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=213500",
        "publishedAt": "2026-09-08",
        "publishedTime": "10:00",
        "readCount": 24800,
        "readTime": "11 мин унших",
        "tags": ["AI Түүх", "Дартмут 1956", "Трансформер", "Reasoning Models", "aitimes.com"],
        "rank": 7,
        "coverImage": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "1956 оноос 2026 он хүртэл: Математик бэлгэдлээс их өгөгдөл, нейрон сүлжээний гүн сургалт ба систем 2 сэтгэлгээний хувьсал.",
        "isMainLead": False,
        "isHot": False,
        "summary": "Хиймэл оюуны салбар сүүлийн 70 жилд санхүүжилт зогсож, найдвараа алдсан 'Хоёр удаагийн өвөл'-ийг даван туулсан. 2012 оны AlexNet, 2017 оны Google-ийн Transformer архитектур, 2022 оны ChatGPT-ийн бүүм, өнөөгийн 2026 оны Test-time compute ба бодолтын хугацааг удирддаг шинэ эриний бүрэн түүхэн судалгаа.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    1956 оны зун АНУ-ын Дартмут коллежид Жон Маккарти, Марвин Мински, Клод Шеннон тэргүүтэй 10 эрдэмтэн <em>"Машин хүний хэлийг ашиглаж, ойлголтуудыг бүрдүүлж, хүний ухаанаар шийддэг асуудлыг шийдэж чадна"</em> гэсэн итгэл үнэмшлээр хуралдаж, <strong>Artificial Intelligence (Хиймэл оюун)</strong> хэмээх нэр томьёог албан ёсоор төрүүлжээ. <strong>aitimes.com</strong>-ийн түүхэн судалгаанд уг салбарын 70 жилийн өрнөлийг дараах гол үе шатуудад хуваан тайлбарласан байна.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// 70 ЖИЛИЙН ТҮҮХИЙН ЭРГЭЛТИЙН 5 ЦЭГ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>1956–1974 (Алтан үе & Анхны өвөл):</strong> Перцептрон, логик алгоритмууд үүссэн ч тооцоолох хүчин чадал дутсанаар санхүүжилт зогсож 1-р өвөл эхлэв.</li>
      <li><strong>1980–1987 (Эксперт системүүд & 2-р өвөл):</strong> Дүрмийн суурьтай эксперт системүүд хөгжсөн ч өөрчлөгдөх чадваргүй байснаас дахин хямралд орсон.</li>
      <li><strong>2012 (AlexNet & Deep Learning хувьсгал):</strong> Жеффри Хинтон ба түүний баг GPU чип дээр гүн сургалт хийж ImageNet-д түүхэн амжилт үзүүлэв.</li>
      <li><strong>2017 ("Attention Is All You Need"):</strong> Google Research-ийн 8 эрдэмтэн Transformer архитектурыг зарлаж, өнөөгийн LLM-ийн эхлэлийг тавив.</li>
      <li><strong>2024–2026 (Reasoning & Agentic Era):</strong> Зөвхөн дараагийн үгийг таамаглах бус, бодолтын хугацааг (Test-time compute) удирддаг, бие даасан агентуудын эрин.</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Симболик AI-аас Коннекционизм (Нейрон сүлжээ) рүү
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хиймэл оюуны эхэн үед бүх мэдлэгийг хүний гараар кодлож, "Хэрэв A бол B" гэсэн дүрэм бичдэг байсан бол энэ арга мухардсан. Харин одоогийн нейрон сүлжээ нь хүүхэд ертөнцийг ажиглаж суралцдаг шиг өгөгдөл доторх статистик холбоосыг өөрөө бие даан илрүүлдэг болсон нь өнөөгийн амжилтын гол түлхүүр юм.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Их өгөгдөл дууссан уу? Шинэ чиг хандлага
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Өнөөдөр интернетийн бүх бичвэрийг загварууд уншиж дууссан тул загварыг зөвхөн 'томруулах' (Pre-training scaling) хангалтгүй болсон. Харин загварт хариулт өгөхөөсөө өмнө бодох хугацаа өгч, алдаагаа шалгах 'System 2 Thinking' зарчим 2026 оны гол чиг хандлага болж байна.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea Special Archive", "url": "https://www.aitimes.com/news/articleView.html?idxno=213500"},
            {"name": "Stanford University CS231n", "url": "https://cs231n.stanford.edu"},
            {"name": "Google Research Publications", "url": "https://research.google"}
        ]
    },
    {
        "id": "art-aitimes-investigation-energy-nuclear-crisis",
        "slug": "investigation-ai-datacenter-energy-nuclear-reactors-crisis",
        "title": "Эрэн сурвалжлах тойм: Нэг хайлтын цаана буй цөмийн реактор — Дата төвүүдийн цахилгаан ба цэвэр усны далд хямрал",
        "subtitle": "aitimes.com болон салбарын эрэн сурвалжлага: Microsoft, Google, Amazon яагаад хаагдсан цөмийн станцуудыг дахин сэргээж, бүхэл бүтэн хотуудын эрчим хүчтэй тэнцэх цахилгааныг AI дата төвүүдэд зориулах болов?",
        "category": "opinion",
        "categoryName": "ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ",
        "primarySource": "AI Times Korea & Bloomberg Energy",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=215201",
        "publishedAt": "2026-09-07",
        "publishedTime": "09:30",
        "readCount": 26100,
        "readTime": "9 мин унших",
        "tags": ["Дата төв", "Цөмийн станц", "Эрчим хүч", "Эрэн сурвалжлага", "aitimes.com"],
        "rank": 8,
        "coverImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "АНУ-ын Пенсильвани муж: 1979 оны ослын дараа хаагдсан Three Mile Island цөмийн станцыг Microsoft-ийн AI дата төвийг хангах зорилгоор дахин ажиллуулж байна.",
        "isMainLead": False,
        "isHot": True,
        "summary": "AI тооцоолол хийх нь ердийн интернет хайлтаас 10 дахин их цахилгаан зарцуулж байна. Microsoft 1979 оны ослын дараа хаагдсан Three Mile Island цөмийн станцтай 20 жилийн гэрээ байгуулж, Google жижиг модульчлагдсан цөмийн реактор захиалав. Тооцоолох чадлын өсөлт эрчим хүчний сүлжээний дээд хязгаарт тулсныг харуулсан эрэн сурвалжлах тайлан.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюуны хөгжил нь компьютерийн алгоритмаас хальж, дэлхийн эрчим хүчний дэд бүтцийн хамгийн том сорилт болж хувирлаа. <strong>aitimes.com</strong>-ийн нийтэлсэн эрэн сурвалжлах тоймд дурдсанаар, Nvidia GB200 суперчипүүдээр тоноглогдсон нэг дата төв нь 1 гигаватт (GW) хүртэл цахилгаан шаарддаг бөгөөд энэ нь дундаж хэмжээний 750,000 өрхийн хэрэглээтэй тэнцэж байна.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// АВАЙРГА КОМПАНИУДЫН ЦӨМИЙН ЭРЧИМ ХҮЧНИЙ ГЭРЭЭНҮҮД</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li><strong>Microsoft & Constellation Energy:</strong> Three Mile Island цөмийн станцын 835 МВт хүчин чадалтай блокийг дахин сэргээж, 20 жилийн турш бүх цахилгааныг худалдан авах $1.6 тэрбумын гэрээ</li>
      <li><strong>Google & Kairos Power:</strong> 2030 он гэхэд 500 МВт хүчин чадал бүхий 7 жижиг модульчлагдсан реактор (SMR) байгуулах түүхэн тохиролцоо</li>
      <li><strong>Amazon AWS & Talen Energy:</strong> Пенсильвани дахь Саскуэханна цөмийн станцын дэргэд 960 МВт хүчин чадалтай дата төвийн кампус худалдан авав</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. Цэвэр усны хэрэглээ: Хөргөлтийн нууц өртөг
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Зөвхөн цахилгаан биш, асар халуун чипүүдийг хөргөхөд сая сая литр цэвэр ус ууршуулдаг. Аризона, Айова мужийн хуурай бүс нутагт байрлах дата төвүүд орон нутгийн иргэдийн ундны усны түвшинг бууруулж байгаа нь байгаль орчны томоохон маргаан үүсгэж байна. Одоо шингэн хөргөлтийн (Direct-to-chip liquid cooling) систем рүү шилжих зайлшгүй шаардлага тулгарчээ.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Тооцооллын бодит хязгаар: Эрчим хүч
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Ирэх таван жилд AI загваруудын чадавх алгоритмаас бус, тэднийг тэжээх цахилгаан эрчим хүчийг хэр хурдан үйлдвэрлэж чадахаас шалтгаална гэдгийг Big Tech-ийн удирдлагууд хүлээн зөвшөөрч эхэллээ.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=215201"},
            {"name": "Bloomberg Energy", "url": "https://www.bloomberg.com/energy"},
            {"name": "MIT Technology Review", "url": "https://www.technologyreview.com"}
        ]
    },
    {
        "id": "art-aitimes-investigation-shadow-workers-synthetic-data",
        "slug": "investigation-shadow-workers-kenya-synthetic-data-collapse",
        "title": "Эрэн сурвалжлах тойм: Кенийн сүүдрийн ажилчид ба 'Синтетик өгөгдлийн мухардал' (MAD хам шинж)",
        "subtitle": "aitimes.com-ийн тусгай эрэн сурвалжлага: Цагт 1.5 долларын цалинтай хорт контент шүүгчид ба хүний бичсэн интернет өгөгдөл дууссанаар AI загварууд өөрсдийн алдаатай өгөгдлөөр суралцаж гажигтах эрсдэл.",
        "category": "opinion",
        "categoryName": "ЭРЭН СУРВАЛЖЛАГА & ТҮҮХ",
        "primarySource": "AI Times Korea & Time Magazine Investigation",
        "primarySourceUrl": "https://www.aitimes.com/news/articleView.html?idxno=215197",
        "publishedAt": "2026-09-06",
        "publishedTime": "12:00",
        "readCount": 23400,
        "readTime": "10 мин унших",
        "tags": ["Эрэн сурвалжлага", "RLHF", "Кени шошгологчид", "Синтетик өгөгдөл", "MAD Syndrome"],
        "rank": 9,
        "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "imageCaption": "Найроби дахь дата төв: Цагт 1.5-2 ам.доллараар өдөрт 8 цаг хүчирхийлэл, хорт бичвэрийг шошголж буй хямд ажиллах хүч.",
        "isMainLead": False,
        "isHot": False,
        "summary": "Бидний хэрэглэж буй цэвэр, соёлтой ChatGPT, Claude-ийн цаана Найроби, Манилад хүчирхийлэл, хортой бичвэрүүдийг шүүж сэтгэл санааны хохирол амссан мянга мянган хямд ажиллах хүч бий. Түүнчлэн 2026 он гэхэд хүн төрөлхтний бүтээсэн чанартай бичвэрүүд сургалтад бүрэн ашиглагдаж дууссан тул синтетик өгөгдлийн алдаа хуримтлагдах үзэгдэл (Model Autophagy) шинэ гацаа үүсгээд байна.",
        "content": """
<div class="space-y-6">
  <p class="text-lg leading-relaxed text-neutral-800 font-serif">
    Хиймэл оюун ухааныг хүний гараас ангид, цэвэр математикийн гайхамшиг мэтээр сурталчилдаг ч бодит байдал дээр энэ нь хүн төрөлхтний хамгийн өргөн цар хүрээтэй хямд хөдөлмөрийн мөлжлөг дээр тогтож байна. <strong>aitimes.com</strong>-ийн баталгаажуулсан олон улсын эрэн сурвалжлах баримтаар Кени, Уганда, Филиппин зэрэг хөгжиж буй орнуудад ажилладаг дата шошгологчдын үл үзэгдэх зовлонг дэлгэжээ.
  </p>

  <div class="border-l-4 border-black bg-neutral-100 p-4 font-mono text-sm">
    <p class="font-bold text-black uppercase mb-1">// RLHF БА ХОРТ КОНТЕНТ ШҮҮЛТҮҮРИЙН ҮНЭ ЦЭНЭ</p>
    <ul class="list-disc pl-5 space-y-1 text-neutral-700">
      <li>Хөлс: Цагийн <strong>1.32 – 2.00 ам.доллар</strong> (Sama, Scale AI зэрэг гэрээт компаниудаар дамждаг)</li>
      <li>Ажлын нөхцөл: Хүчирхийлэл, бэлгийн дарамт, өөрийгөө гэмтээх, үзэн ядалтын хэдэн арван мянган өгүүлбэрийг уншиж "хортой" шошго наах</li>
      <li>Сэтгэл зүйн хохирол: Ажилтнуудын дийлэнх нь гэмтлийн дараах стрессийн эмгэгээр (PTSD) өвдөж, сэтгэл зүйн эмчилгээ авч чаддаггүй</li>
    </ul>
  </div>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    1. "Model Autophagy Disorder" (MAD) буюу Синтетик өгөгдлийн гажиг
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Хүний гараар бичсэн ном, нийтлэл дууссан тул AI компаниуд өөрсдийн үүсгэсэн хиймэл өгөгдлөөр (Synthetic Data) дараагийн үеийн загваруудаа сургаж эхлэв. Гэвч Оксфорд болон Кембриджийн их сургуулийн хамтарсан судалгаагаар AI-аар үүсгэсэн датагаар дахин дахин сургавал 3-4 үеийн дараа загвар нь ойлгохын аргагүй утгагүй үгс давтаж, сэтгэхүйн деградацид ордог болохыг тогтоожээ. Үүнийг анагаах ухааны нэр томьёогоор <em>"Model Autophagy Disorder"</em> гэж нэрлэж байна.
  </p>

  <h3 class="text-xl font-black text-black tracking-tight border-b-2 border-black pb-2 pt-4">
    2. Дүгнэлт: Хүний мэдрэмж, үнэн бодит датаны эрэлт
  </h3>
  <p class="leading-relaxed text-neutral-800">
    Энэ нь цаашид хиймэл оюуны зах зээлд өндөр боловсролтой мэргэжилтнүүдийн бодит туршлага, хүний гараар бичигдсэн өндөр чанартай оригинал контент хамгийн үнэтэй ховор валют болохыг баталж байна.
  </p>
</div>
        """,
        "sources": [
            {"name": "AI Times Korea", "url": "https://www.aitimes.com/news/articleView.html?idxno=215197"},
            {"name": "Time Magazine Investigation", "url": "https://time.com"},
            {"name": "Oxford & Cambridge Research", "url": "https://www.nature.com"}
        ]
    }
]

def main():
    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, 'r', encoding='utf-8') as f:
            articles = json.load(f)
    else:
        articles = []

    existing_slugs = {a['slug'] for a in articles}
    added_count = 0

    for item in FOUNDATIONAL_ARTICLES:
        if item['slug'] not in existing_slugs:
            articles.append(item)
            existing_slugs.add(item['slug'])
            added_count += 1
            print(f"Injected: [{item['category']}] {item['title'][:60]}...")

    # Re-index ranks
    for idx, a in enumerate(articles):
        a['rank'] = idx + 1

    with open(ARTICLES_FILE, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"\nSuccessfully injected {added_count} foundational articles into {ARTICLES_FILE}.")
    print(f"Total articles now: {len(articles)}")

if __name__ == '__main__':
    main()
