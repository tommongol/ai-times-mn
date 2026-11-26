import type { Metadata } from 'next';
import { NotFoundView } from '@/components/NotFoundView';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Мэдээ олдсонгүй — ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function ArticleNotFound() {
  return (
    <NotFoundView
      title="[404] МЭДЭЭ ОЛДСОНГҮЙ"
      message="Таны хайсан нийтлэл устгагдсан эсвэл хаяг нь өөрчлөгдсөн байна."
    />
  );
}
