import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SECTIONS, getSection } from '@/data/sections';
import { SectionListing, sectionMetadata } from '@/components/SectionListing';

// Булангийн эхний хуудас: /bulan/tech. Зөвхөн мэдэгдэж буй булан; бусад хаяг 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const section = getSection((await params).section);
  return section ? sectionMetadata(section, 1) : {};
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const section = getSection((await params).section);
  if (!section) notFound();
  return <SectionListing section={section} page={1} />;
}
