import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SECTIONS, getSection } from '@/data/sections';
import { SectionListing, sectionMetadata, sectionPageCount } from '@/components/SectionListing';

// Булангийн 2 дахь хуудаснаас цааш: /bulan/tech/2. Эхний хуудас нь /bulan/tech.
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.flatMap((s) =>
    Array.from({ length: Math.max(0, sectionPageCount(s.id) - 1) }, (_, i) => ({
      section: s.id,
      page: String(i + 2),
    }))
  );
}

function resolve(params: { section: string; page: string }) {
  const section = getSection(params.section);
  const page = Number(params.page);
  if (!section || !Number.isInteger(page) || page < 2 || page > sectionPageCount(section.id)) return null;
  return { section, page };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}): Promise<Metadata> {
  const found = resolve(await params);
  return found ? sectionMetadata(found.section, found.page) : {};
}

export default async function SectionPagedPage({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const found = resolve(await params);
  if (!found) notFound();
  return <SectionListing section={found.section} page={found.page} />;
}
