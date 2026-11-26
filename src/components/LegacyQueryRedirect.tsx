'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LEGACY_SECTION_ALIASES } from '@/data/types';
import { sectionPath, searchPath } from '@/data/sections';

/** Хуучин холбоос (/?section=tech, /?q=Nvidia) шинэ хуудас руугаа шилжинэ. */
export function LegacyQueryRedirect() {
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const sec = params.get('section');
    if (q) router.replace(searchPath(q));
    else if (sec) router.replace(sectionPath(LEGACY_SECTION_ALIASES[sec] || sec));
  }, [router]);
  return null;
}
