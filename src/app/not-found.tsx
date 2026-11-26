import type { Metadata } from 'next';
import { NotFoundView } from '@/components/NotFoundView';
import { SITE_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Хуудас олдсонгүй — ${SITE_NAME}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <NotFoundView
      title="[404] ХУУДАС ОЛДСОНГҮЙ"
      message="Таны хайсан хуудас байхгүй эсвэл хаяг нь өөрчлөгдсөн байна."
    />
  );
}
