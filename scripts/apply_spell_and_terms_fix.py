#!/usr/bin/env python3
"""Apply comprehensive spelling, grammar, and terminology corrections
to articles.json and live_wire.json according to mn-spell standard and user guidelines.
"""

import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ARTICLES_FILE = BASE_DIR / "src/data/articles.json"
LIVE_WIRE_FILE = BASE_DIR / "src/data/live_wire.json"

# Word-level or regex replacements
REPLACEMENTS = [
    # 1. Pure Mongolian spelling and grammatical corrections (toli.gov.mn / mn-spell standard)
    (r"\bАВАЙРГА\b", "АВАРГА"),
    (r"\bСӨРӨГЛДӨӨН\b", "СӨРГӨЛДӨӨН"),
    (r"\bСУРВАЛЖЛАГА\b", "СУРВАЛЖИЛГА"),
    (r"\bСУРВАЛЖЛАГЫН\b", "СУРВАЛЖИЛГЫН"),
    (r"\bсурвалжлага\b", "сурвалжилга"),
    (r"\bсурвалжлагаар\b", "сурвалжилгаар"),
    (r"\bбүрт\b", "бүрд"),
    (r"\bөсч\b", "өсөж"),
    (r"\bөсчээ\b", "өсжээ"),
    (r"\bзасч\b", "засаж"),
    (r"\bзурагнуудаас\b", "зургуудаас"),
    (r"\bоношлогооны\b", "оношилгооны"),
    (r"\bонилсоны\b", "онилсны"),
    (r"\bтүвшинг\b", "түвшнийг"),
    (r"\bорчинг\b", "орчныг"),
    (r"\bкамерийн\b", "камерын"),
    (r"\bкорпораци\b", "корпорац"),
    (r"\bкорпорацид\b", "корпорацад"),
    (r"\bкорпорацийн\b", "корпорацын"),
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
    (r"\bгадны\b", "гаднын"),
    (r"\bчипийн\b", "чипний"),
    (r"\bчипүүд\b", "чипнүүд"),
    (r"\bчипүүдийг\b", "чипнүүдийг"),
    (r"\bчипүүдийн\b", "чипнүүдийн"),
    (r"\bсуперчипүүдээр\b", "суперчипнүүдээр"),
    (r"\bхэлүүд\b", "хэлнүүд"),
    (r"\bээлжинд\b", "ээлжид"),
    (r"\bгарагт\b", "гаригт"),
    (r"\bдавалгаа\b", "давлагаа"),
    (r"\bдавалгааг\b", "давлагааг"),
    (r"\bоффисын\b", "офисын"),
    (r"\bхатингарших\b", "хатангирших"),
    (r"\bнугаларалтын\b", "нугаралтын"),
    (r"\bшоунаас\b", "шоуноос"),
    (r"\bсекундын\b", "секундийн"),
    (r"\bмиллисекундын\b", "миллисекундийн"),
    (r"\bдоллараар\b", "доллароор"),
    (r"\bномонд\b", "номд"),
    (r"\bхятад-сингапур\b", "Хятад-Сингапур"),
    (r"\bгрек-кипр\b", "Грек-Кипр"),
    (r"\bнарийн зааварчилгааг\b", "нарийвчилсан зааврыг"),
    (r"\bзааварчилгааг\b", "зааварчилгааг"),  # will be handled if needed
    (r"\bгажигтах\b", "гажилт үүсэх"),
    (r"\bарилжаажиж\b", "арилжаанд шилжиж"),
    (r"\bарилжаажилт\b", "арилжаажуулалт"),
    (r"\bкапиталжуулалтыг\b", "хөрөнгөжүүлэлтийг"),
    (r"\bгигант\b", "аварга"),
    (r"\bбүүм\b", "тэсрэлт (boom)"),
    (r"\bкодлож\b", "кодлон"),
    (r"\bкурстээ\b", "хичээлдээ"),
    (r"\bмета-түвшинд\b", "мета түвшинд"),
    (r"\bмимикээр\b", "нүүрний хувирлаар"),
    (r"\bмодульчлагдсан\b", "модуль бүтэцтэй"),
    (r"\bонилгоо\b", "чиглэл"),
    (r"\bонилгоог\b", "зорилтыг"),
    (r"\bоношийн\b", "оношилгооны"),
    (r"\bпостдок\b", "постдокторант"),
    (r"\bПостдок\b", "Постдокторант"),
    (r"\bпроспект\b", "танилцуулга (prospectus)"),
    (r"\bпроспектын\b", "танилцуулгын"),
    (r"\bсенсаци\b", "шуугиан (сенсац)"),
    (r"\bсимуляциар\b", "симуляцаар"),
    (r"\bтелемедицин\b", "алсын зайн анагаах ухаан (telemedicine)"),
    (r"\bфилантропист\b", "буяны үйлстэн"),
    (r"\bхакердсан\b", "халдлагад өртсөн"),
    (r"\bбатерей\b", "батарей"),
    (r"\bвэб\b", "веб"),
    (r"\bстилийг\b", "хэв маягийг"),
    (r"\bдеградацид\b", "бууралтад"),

    # 2. English technical terms (Preserving terms in English per user instruction)
    (r"\bфронтир\b", "Frontier"),
    (r"\bфронтируудтай\b", "Frontier загваруудтай"),
    (r"\bфронтируудыг\b", "Frontier загваруудыг"),
    (r"\bмультимодал\b", "Multimodal"),
    (r"\bжетонтой\b", "token-той"),
    (r"\bжетоны\b", "token-ы"),
    (r"\bжетон\b", "token"),
    (r"\bчатботоос\b", "chatbot-оос"),
    (r"\bчатботуудыг\b", "chatbot-уудыг"),
    (r"\bчатботыг\b", "chatbot-ыг"),
    (r"\bчатбот\b", "chatbot"),
    (r"\bчатлах\b", "харилцах"),
    (r"\bэксплойт\b", "exploit"),
    (r"\bсуперкластер\b", "supercluster"),
    (r"\bсуперкомпьютерийн\b", "supercomputer-ийн"),
    (r"\bаватаруудаас\b", "avatar-уудаас"),
    (r"\bаватаруудын\b", "avatar-уудын"),
    (r"\bапп-ыг\b", "app-ыг"),
    (r"\bаппликейшн\b", "апликейшн"),
    (r"\bгенератив\b", "Generative"),
    (r"\bгиперпараметрүүд\b", "hyperparameter-ууд"),
    (r"\bклауд\b", "cloud"),
    (r"\bлидарыг\b", "LiDAR-ыг"),
    (r"\bсэндбокс\b", "sandbox"),
    (r"\bтраффикийг\b", "traffic-ийг"),
    (r"\bфлагман\b", "тэргүүлэх (flagship)"),
    (r"\bкриптографаар\b", "криптографиар"),
    (r"\bкриптограф\b", "криптографи"),
    (r"\bсингуляритын\b", "singularity-ийн"),
    (r"\bбио-зэвсэг\b", "био зэвсэг"),
    (r"\bбио-эмийн\b", "био эмийн"),
    (r"\bбиотерроризм\b", "био терроризм"),
    (r"\bавтоном\b", "бие даасан (autonomous)"),
    (r"\bАвтоном\b", "Бие даасан (autonomous)"),
    (r"\bагентийг\b", "агентыг"),
    (r"\bагентийн\b", "агентын"),
    (r"\bАгентийн\b", "Агентын"),
    (r"\bалгоритмийн\b", "алгоритмын"),
    (r"\bмоделд\b", "загварт"),
    (r"\bмодел\b", "загвар"),

    # 3. Proper names (Standard English proper nouns with hyphenated endings)
    (r"\bЁШУА БЕНЖИО\b", "YOSHUA BENGIO"),
    (r"\bЁшуа Бенжио\b", "Yoshua Bengio"),
    (r"\bЁшуа\b", "Yoshua Bengio"),
    (r"\bБенжио\b", "Bengio"),
    (r"\bБЕНЖИО\b", "BENGIO"),

    (r"\bСэм Альтман\b", "Sam Altman"),
    (r"\bАЛЬТМАН\b", "SAM ALTMAN"),
    (r"\bАльтманыг\b", "Sam Altman-ыг"),
    (r"\bАльтманы\b", "Sam Altman-ы"),
    (r"\bАльтман\b", "Sam Altman"),
    (r"\bАлтманы\b", "Sam Altman-ы"),
    (r"\bАлтман\b", "Sam Altman"),

    (r"\bДарио Амодей\b", "Dario Amodei"),
    (r"\bАмодейгийн\b", "Dario Amodei-гийн"),
    (r"\bАмодейг\b", "Dario Amodei-г"),
    (r"\bАмодей\b", "Dario Amodei"),
    (r"\bДарио\b", "Dario"),

    (r"\bДЭМИС ХАССАБИС\b", "DEMIS HASSABIS"),
    (r"\bДэмис Хассабис\b", "Demis Hassabis"),
    (r"\bХассабисын\b", "Demis Hassabis-ын"),
    (r"\bХассабистай\b", "Demis Hassabis-тай"),
    (r"\bХассабис\b", "Demis Hassabis"),
    (r"\bХАССАБИС\b", "DEMIS HASSABIS"),
    (r"\bДэмис\b", "Demis"),

    (r"\bЯнн ЛеКун\b", "Yann LeCun"),
    (r"\bЛеКунтэй\b", "Yann LeCun-тэй"),
    (r"\bЛеКуны\b", "Yann LeCun-ы"),
    (r"\bЛеКун\b", "Yann LeCun"),
    (r"\bЯнн\b", "Yann LeCun"),

    (r"\bИлья Суцкевер\b", "Ilya Sutskever"),
    (r"\bСУЦКЕВЕР\b", "ILYA SUTSKEVER"),
    (r"\bСуцкеверийн\b", "Ilya Sutskever-ийн"),
    (r"\bСуцкеверийг\b", "Ilya Sutskever-ийг"),
    (r"\bСуцкевер\b", "Ilya Sutskever"),

    (r"\bФЭЙ-ФЭЙ ЛИ\b", "FEI-FEI LI"),
    (r"\bФЭЙ-ФЭЙ\b", "FEI-FEI LI"),
    (r"\bФэй-Фэй Ли\b", "Fei-Fei Li"),
    (r"\bФэй-Фэй\b", "Fei-Fei Li"),
    (r"\bЛи-гийн\b", "Fei-Fei Li-гийн"),

    (r"\bТИМНИТ ГЕБРУ\b", "TIMNIT GEBRU"),
    (r"\bТимнит Гебру\b", "Timnit Gebru"),
    (r"\bГебру\b", "Timnit Gebru"),
    (r"\bТимнит\b", "Timnit Gebru"),
    (r"\bГЕБРУ\b", "GEBRU"),

    (r"\bСҮЛЕЙМАН\b", "MUSTAFA SULEYMAN"),
    (r"\bМустафа Сүлейман\b", "Mustafa Suleyman"),
    (r"\bСүлейманы\b", "Mustafa Suleyman-ы"),
    (r"\bСүлейман\b", "Mustafa Suleyman"),

    (r"\bАРТЮР МЕНШ\b", "ARTHUR MENSCH"),
    (r"\bАртюр Менш\b", "Arthur Mensch"),
    (r"\bМенш\b", "Arthur Mensch"),
    (r"\bАртюр\b", "Arthur Mensch"),
    (r"\bМЕНШ\b", "MENSCH"),

    (r"\bАРАТИ ПРАБХАКАР\b", "ARATI PRABHAKAR"),
    (r"\bАрати Прабхакар\b", "Arati Prabhakar"),
    (r"\bПрабхакар\b", "Arati Prabhakar"),
    (r"\bАрати\b", "Arati"),

    (r"\bКАРПАТИ\b", "KARPATHY"),
    (r"\bАндрей Карпати\b", "Andrej Karpathy"),
    (r"\bКарпати\b", "Andrej Karpathy"),

    (r"\bГрег Брокман\b", "Greg Brockman"),
    (r"\bБрокман\b", "Greg Brockman"),
    (r"\bГрег\b", "Greg"),

    (r"\bДаниела Амодей\b", "Daniela Amodei"),
    (r"\bДаниелагийн\b", "Daniela Amodei-гийн"),
    (r"\bДаниела\b", "Daniela Amodei"),

    (r"\bЭндрю Ын\b", "Andrew Ng"),
    (r"\bЫН\b", "ANDREW NG"),
    (r"\bЫн\b", "Andrew Ng"),

    (r"\bМарк Цукерберг\b", "Mark Zuckerberg"),
    (r"\bЦукербергийн\b", "Mark Zuckerberg-ийн"),
    (r"\bЦукерберг\b", "Mark Zuckerberg"),

    (r"\bВЭНЬФЭН\b", "LIANG WENFENG"),
    (r"\bЛян Вэньфэн\b", "Liang Wenfeng"),
    (r"\bВэньфэны\b", "Liang Wenfeng-ий"),
    (r"\bВэньфэн\b", "Liang Wenfeng"),
    (r"\bЛян\b", "Liang Wenfeng"),

    (r"\bСатья Наделла\b", "Satya Nadella"),
    (r"\bНаделлагийн\b", "Satya Nadella-гийн"),
    (r"\bНаделла\b", "Satya Nadella"),
    (r"\bСатья\b", "Satya Nadella"),

    (r"\bЖэнсэн Хуанг\b", "Jensen Huang"),
    (r"\bХуанг\b", "Jensen Huang"),
    (r"\bХуан\b", "Huang"),

    (r"\bБуоламвинигийн\b", "Joy Buolamwini-гийн"),
    (r"\bЖой\b", "Joy"),
    (r"\bКоллерийн\b", "Daphne Koller-ийн"),
    (r"\bДафне\b", "Daphne"),
    (r"\bТегмарк\b", "Max Tegmark"),
    (r"\bКрижевский\b", "Alex Krizhevsky"),
    (r"\bЖампер\b", "John Jumper"),
    (r"\bХопфилд\b", "John Hopfield"),
    (r"\bЛегг\b", "Shane Legg"),
    (r"\bШэйн\b", "Shane"),
    (r"\bЛейке\b", "Jan Leike"),
    (r"\bХоффманы\b", "Reid Hoffman-ы"),
    (r"\bПеронагийн\b", "Pietro Perona-гийн"),
    (r"\bПерона\b", "Pietro Perona"),
    (r"\bПьетро\b", "Pietro"),
    (r"\bПолгар\b", "Judit Polgár"),
    (r"\bЮдит\b", "Judit"),
    (r"\bСэдолыг\b", "Lee Sedol-ыг"),
    (r"\bЖиньпиний\b", "Xi Jinping-ий"),
    (r"\bЖиньпин\b", "Xi Jinping"),
    (r"\bМински\b", "Marvin Minsky"),
    (r"\bБахданаугийн\b", "Bahdanau-гийн"),
    (r"\bБахданаутай\b", "Bahdanau-тай"),
    (r"\bЛампль\b", "Guillaume Lample"),
    (r"\bГийом\b", "Guillaume"),
    (r"\bТимоте\b", "Timothée Lacroix"),
    (r"\bРумельхарт\b", "David Rumelhart"),
    (r"\bМакклелланд\b", "James McClelland"),
    (r"\bБарнет\b", "Hugh Barnett"),
    (r"\bМолиньютай\b", "Peter Molyneux-тай"),
    (r"\bМайк Роу\b", "Mike Rowe"),
    (r"\bТан Энг Чай\b", "Tan Eng Chye"),
    (r"\bЧай\b", "Tan Eng Chye"),
    (r"\bЛи Цян\b", "Li Qiang"),
    (r"\bЦян\b", "Li Qiang"),
    (r"\bЦяны\b", "Li Qiang-ий"),
    (r"\bХанес Шмид\b", "Hannes Schmid"),
    (r"\bХанес\b", "Hannes Schmid"),
    (r"\bЖеонсен\b", "Jensen"),
    (r"\bЖефф\b", "Jeff"),
    (r"\bГрэхэмийн\b", "Paul Graham-ын"),
    (r"\bГрэхэм\b", "Paul Graham"),
    (r"\bГудын\b", "I.J. Good-ын"),
    (r"\bДаниел\b", "Daniel"),
    (r"\bДорин\b", "Dorin"),
    (r"\bКен\b", "Ken"),
    (r"\bЭммануэль\b", "Emmanuel"),

    # Universities and places
    (r"\bПало Алто\b", "Palo Alto"),
    (r"\bАлто\b", "Palo Alto"),
    (r"\bСтанфордын\b", "Stanford-ын"),
    (r"\bСтанфордод\b", "Stanford-д"),
    (r"\bСтанфордыг\b", "Stanford-ыг"),
    (r"\bТоронтогийн\b", "Toronto-гийн"),
    (r"\bЛондонгийн\b", "London-гийн"),
    (r"\bБерклигийн\b", "Berkeley-гийн"),
    (r"\bУолл Стрийтийн\b", "Wall Street-ийн"),
    (r"\bУолл Стритийн\b", "Wall Street-ийн"),
    (r"\bУолл Стрийтэд\b", "Wall Street-эд"),
    (r"\bУолл Стрийт\b", "Wall Street"),
    (r"\bУолл\b", "Wall"),
    (r"\bСтрийтийн\b", "Street-ийн"),
    (r"\bСтритийн\b", "Street-ийн"),
    (r"\bСтритэд\b", "Street-эд"),
    (r"\bСтрийт\b", "Street"),
    (r"\bБлетчли\b", "Bletchley"),
    (r"\bАддис Абебад\b", "Addis Ababa-д"),
    (r"\bАддис Абеба\b", "Addis Ababa"),
    (r"\bАбебад\b", "Addis Ababa-д"),
    (r"\bАбеба\b", "Addis Ababa"),
    (r"\bВиржиниа\b", "Virginia"),
    (r"\bМакГилл\b", "McGill"),
    (r"\bКалтекийн\b", "Caltech-ийн"),
    (r"\bМанхэттэний\b", "Manhattan-ы"),
    (r"\bКвинс\b", "Queen's"),
    (r"\bКингс\b", "King's"),
    (r"\bДартмутаас\b", "Dartmouth-оос"),
    (r"\bУрбана-Шампейн\b", "Urbana-Champaign"),
    (r"\bСаскуэханна\b", "Susquehanna"),
    (r"\bСассексийн\b", "Sussex-ийн"),
    (r"\bСент-Луисын\b", "St. Louis-ийн"),
    (r"\bЭколь Сюперьёр\b", "École Normale Supérieure"),
    (r"\bСюперьёр\b", "Normale Supérieure"),
    (r"\bЭколь\b", "École"),
    (r"\bТаймсийн\b", "Times-ийн"),
    (r"\bТаймс\b", "Times"),
    (r"\bПулицерийн\b", "Pulitzer-ийн"),
    (r"\bМакартурын\b", "MacArthur-ийн"),
    (r"\bГуандун\b", "Guangdong"),
    (r"\bЖэжянгийн\b", "Zhejiang-ийн"),
    (r"\bУчуань\b", "Wuchuan"),
    (r"\bНижний\b", "Нижний Новгород"),
    (r"\bПарсиппани\b", "Parsippany"),
    (r"\bСэвр\b", "Sèvres"),
    (r"\bСюй\b", "Xu"),
    (r"\bШи\b", "Shi"),

    # Concepts & general
    (r"\bДНК\b", "ДНХ"),
    (r"\bГо-д\b", "Go тоглоомд"),
    (r"\bКоннекционизм\b", "Холбоост үзэл (Connectionism)"),
    (r"\bСимболик\b", "Бэлгэдлийн (Symbolic AI)"),
    (r"\bКреатив\b", "Бүтээлч"),
    (r"\bСтелс\b", "Нууцлаг (Stealth)"),
    (r"\bПартнер\b", "Хамтрагч"),
    (r"\bГеек\b", "Geek"),
    (r"\bВенчур\b", "Venture"),
    (r"\bвенчур\b", "venture"),
    (r"\bМарокко-Еврей\b", "Марокко гаралтай еврей"),
    (r"\bЛонгет-Хиггинс\b", "Christopher Longuet-Higgins"),
    (r"\bНижний\b", "Nizhny Novgorod"),
    (r"\bалгоритмч\b", "алгоритм зохиогч"),
    (r"\bхурдацтай арилжаажуулалт\b", "зах зээлд хурдацтай нэвтрүүлэх үйл явц"),
    (r"\bарилжаажуулалт\b", "зах зээлд нэвтрүүлэх үйл явц"),
    (r"\bвето\b", "хориг тавих эрх"),
    (r"\bдерматологич\b", "арьсны эмч"),
    (r"\bсуперчипнүүдээр\b", "супер чипнүүдээр"),
    (r"\bханес\b", "harness"),
    (r"\bЛИАН ВЭНЬФЭН\b", "LIANG WENFENG"),
    (r"\bЛИАН\b", "LIANG WENFENG"),
    (r"\bЛиан Вэньфэн\b", "Liang Wenfeng"),
    (r"\bЛианы\b", "Liang Wenfeng-ийн"),
    (r"\bЛиан\b", "Liang Wenfeng"),
]


def apply_fixes_to_text(text):
    if not text:
        return text
    for pattern, replacement in REPLACEMENTS:
        text = re.sub(pattern, replacement, text)
    return text


def main():
    print("Reading articles.json...")
    with open(ARTICLES_FILE, encoding="utf-8") as f:
        articles = json.load(f)

    fields_to_fix = ["title", "subtitle", "summary", "imageCaption", "content"]
    changed_count = 0

    for a in articles:
        changed = False
        for field in fields_to_fix:
            if field in a and a[field]:
                new_val = apply_fixes_to_text(a[field])
                if new_val != a[field]:
                    a[field] = new_val
                    changed = True
        if changed:
            changed_count += 1

    print(f"Applied fixes to {changed_count}/{len(articles)} articles.")

    with open(ARTICLES_FILE, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print("Saved updated articles.json.")


if __name__ == "__main__":
    main()
