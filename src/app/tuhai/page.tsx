import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, InfoHeading, infoLinkClass } from '@/components/InfoPage';
import { SECTIONS, sectionPath } from '@/data/sections';
import { JsonLd, pageAlternates, PUBLISHER, SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, breadcrumbJsonLd } from '@/lib/seo';

const TITLE = `Бидний тухай — ${SITE_NAME}`;
const DESCRIPTION =
  'AI Mongolia бол хиймэл оюуны мэдээ, шинжилгээг монгол хэлээр хүргэдэг цахим сэтгүүл. Булангууд, редакцын стандарт, холбоо барих хаяг.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates('/tuhai'),
  openGraph: {
    type: 'website',
    url: '/tuhai',
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'mn_MN',
    images: [DEFAULT_OG_IMAGE],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/tuhai#page`,
      url: `${SITE_URL}/tuhai`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'mn',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { ...PUBLISHER, description: SITE_DESCRIPTION },
    },
    breadcrumbJsonLd([{ name: 'Нүүр', path: '/' }, { name: 'Бидний тухай', path: '/tuhai' }]),
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <InfoPage title="Бидний тухай">
        <p>
          AI Mongolia нь хиймэл оюун ухаан, дэвшилтэт технологийн салбарын мэдээлэл, техникийн шинжилгээ, зах зээлийн
          судалгааг олон нийтэд хүргэдэг мэргэшсэн цахим сэтгүүл юм. Манай редакц зөвхөн баталгаажсан өгөгдөл, албан
          ёсны судалгааны тайлангуудад тулгуурлан мэдээллийг нийтэлдэг.
        </p>
        <p>
          Дэлхийн хиймэл оюуны салбарын өдөр тутмын мэдээг монгол хэлээр, ойлгомжтой хүргэхийг зорьдог. Нийтлэл бүрийн
          төгсгөлд эх сурвалжийг холбоосоор нь заадаг тул уншигч анхдагч мэдээллийг өөрөө шалгах боломжтой.
        </p>

        <InfoHeading>Булангууд</InfoHeading>
        <ul className="space-y-3">
          {SECTIONS.map((sec) => (
            <li key={sec.id}>
              <Link href={sectionPath(sec.id)} className={infoLinkClass}>
                {sec.label}
              </Link>
              <span className="text-neutral-700">. {sec.description}</span>
            </li>
          ))}
        </ul>

        <InfoHeading>Товхимол ба RSS</InfoHeading>
        <p>
          Гол мэдээг 3 хоногт эсвэл 7 хоногт нэг удаа имэйлээр авах бол{' '}
          <Link href="/tovhimol" className={infoLinkClass}>
            товхимол захиалаарай
          </Link>
          . Мэдээ уншигч программд нэмэх бол{' '}
          <a href="/rss.xml" className={infoLinkClass}>
            RSS урсгал
          </a>{' '}
          бий.
        </p>

        <InfoHeading>Холбоо барих</InfoHeading>
        <p>
          Мэдээ санал болгох, алдаа залруулах, хамтран ажиллах:{' '}
          <a href="mailto:hello@mongol.guru" className={infoLinkClass}>
            hello@mongol.guru
          </a>
        </p>
        <p>Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг, Мэдээлэл технологийн үндэсний төв 213 тоот</p>
        <p>
          Хувийн мэдээллийн тухай:{' '}
          <Link href="/nuutslal" className={infoLinkClass}>
            Нууцлалын бодлого
          </Link>
        </p>
      </InfoPage>
    </>
  );
}
