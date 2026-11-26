import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoPage, InfoHeading, infoLinkClass } from '@/components/InfoPage';
import { SITE_NAME, pageAlternates } from '@/lib/seo';

const TITLE = `Нууцлалын бодлого — ${SITE_NAME}`;
const DESCRIPTION =
  'AI Mongolia сайт ямар мэдээлэл цуглуулдаг, товхимлын имэйл хаягийг хэрхэн хадгалж, хэрхэн устгуулах тухай.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates('/nuutslal'),
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Нууцлалын бодлого">
      <p>
        Сайтын мэдээ, нийтлэлийг уншихад бүртгэл шаардахгүй. Сайтад зар сурталчилгааны болон уншигчийг дагаж хянах код
        байхгүй.
      </p>

      <InfoHeading>Товхимол захиалахад</InfoHeading>
      <p>
        <Link href="/tovhimol" className={infoLinkClass}>
          Товхимол
        </Link>{' '}
        захиалахад таны имэйл хаяг, сонгосон давтамжийг хадгална. Нэр, ажлын газар, сошиал хаягийг та хүсвэл бөглөнө,
        заавал биш. Утасны дугаар, нууц үг хэзээ ч асуухгүй.
      </p>
      <p>
        Энэ мэдээллийг зөвхөн товхимол илгээхэд хэрэглэнэ. Имэйл илгээх, өгөгдөл хадгалах ажлыг гэрээт үйлчилгээ
        үзүүлэгчээр дамжуулан гүйцэтгэдэг.
      </p>

      <InfoHeading>Цуцлах, устгуулах</InfoHeading>
      <p>
        Товхимол бүрийн доор цуцлах холбоос бий, нэг товшилтоор цуцална. Мэдээллээ бүрмөсөн устгуулах бол{' '}
        <a href="mailto:hello@mongol.guru" className={infoLinkClass}>
          hello@mongol.guru
        </a>{' '}
        хаягаар бичээрэй.
      </p>

      <InfoHeading>Техникийн бүртгэл</InfoHeading>
      <p>
        Сайтыг байршуулж буй сервер аюулгүй байдал, алдаа илрүүлэх зорилгоор хүсэлтийн техникийн бүртгэл (IP хаяг,
        хөтчийн төрөл, нээсэн хуудас) хөтөлдөг.
      </p>

      <InfoHeading>Холбоо барих</InfoHeading>
      <p>
        Асуулт байвал{' '}
        <a href="mailto:hello@mongol.guru" className={infoLinkClass}>
          hello@mongol.guru
        </a>{' '}
        хаягаар холбогдоно уу.
      </p>
    </InfoPage>
  );
}
