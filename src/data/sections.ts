import { NAV_SECTIONS } from './types';

// Булан бүр өөрийн хаягтай жинхэнэ хуудас: /bulan/<id>. Хайлтын систем эндээс бүх нийтлэлд хүрнэ.
// Шинэ булан нэмбэл NAV_SECTIONS болон энд хоёуланд нь нэм.

export const SECTION_PAGE_SIZE = 24;

export interface SectionInfo {
  id: string;
  /** Цэс дээрх том үсгийн нэр */
  name: string;
  /** Гарчиг, хайлтын үр дүнд гарах нэр */
  label: string;
  description: string;
}

const DETAILS: Record<string, { label: string; description: string }> = {
  review: {
    label: 'Зурагт тойм',
    description:
      'Долоо хоногийн хиймэл оюуны гол үйл явдлыг зураг, тайлбартай нэгтгэсэн тойм: шинэ загвар, бүтээгдэхүүн, судалгаа, зах зээлийн мэдээ.',
  },
  mongolia: {
    label: 'Монголд',
    description:
      'Монгол дахь хиймэл оюуны хэрэглээ, төсөл, бодлого, компани, сургалтын тухай мэдээ, нийтлэл.',
  },
  tech: {
    label: 'AI технологи',
    description:
      'Шинэ AI загвар, чип, AI агент, судалгааны үр дүнгийн мэдээ, шинжилгээ монгол хэлээр: OpenAI, Google, Anthropic, Nvidia болон бусад.',
  },
  robotics: {
    label: 'Робот',
    description:
      'Хүн дүрст робот, дрон, өөрөө явдаг машин зэрэг роботын салбарын шинэ мэдээ, туршилт, үйлдвэрлэл.',
  },
  law: {
    label: 'Хууль & бодлого',
    description:
      'Хиймэл оюуны хууль, шүүхийн маргаан, зохиогчийн эрх, төрийн бодлого, зохицуулалтын мэдээ.',
  },
  industry: {
    label: 'Салбар & бизнес',
    description:
      'AI компани, хөрөнгө оруулалт, зах зээл, дата төв, салбар бүрийн хэрэглээний мэдээ.',
  },
  interview: {
    label: 'Ярилцлага',
    description:
      'Хиймэл оюуны салбарыг тодорхойлж буй хүмүүсийн ярилцлага, намтар, хөрөг.',
  },
  opinion: {
    label: 'Сурвалжлага',
    description:
      'Хиймэл оюуны тухай эрэн сурвалжлага, түүх, гүнзгий шинжилгээ.',
  },
};

export const SECTIONS: SectionInfo[] = NAV_SECTIONS.filter((s) => s.id !== 'all').map((s) => ({
  id: s.id,
  name: s.name,
  label: DETAILS[s.id]?.label || s.name,
  description: DETAILS[s.id]?.description || '',
}));

export function getSection(id: string): SectionInfo | null {
  return SECTIONS.find((s) => s.id === id) || null;
}

/** Булангийн хаяг. «all» болон танигдаагүй утга нүүр хуудас руу. */
export function sectionPath(id: string, page = 1): string {
  if (!id || id === 'all' || !getSection(id)) return '/';
  return page > 1 ? `/bulan/${id}/${page}` : `/bulan/${id}`;
}

export function searchPath(query: string): string {
  const q = query.trim();
  return q ? `/hailt?q=${encodeURIComponent(q)}` : '/hailt';
}
