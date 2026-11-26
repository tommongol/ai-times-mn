import { publicImageSize } from '@/lib/imageSize';

// Зөвхөн серверт (build үед) ажиллана — зургийн хэмжээг файлаас уншдаг.

/** Нийтлэлийн бие дэх зураг бүрд хэмжээ, хойшлуулсан ачаалал нэмнэ: хуудас үсрэхгүй, хурдан нээгдэнэ. */
export function enhanceArticleHtml(html: string): string {
  if (!html) return html;
  return html.replace(/<img\b([^>]*)>/gi, (tag, rawAttrs: string) => {
    let attrs = rawAttrs.replace(/\s*\/\s*$/, '');
    const src = /\bsrc=["']([^"']+)["']/i.exec(attrs)?.[1];
    if (!/\bloading=/i.test(attrs)) attrs += ' loading="lazy"';
    if (!/\bdecoding=/i.test(attrs)) attrs += ' decoding="async"';
    if (src && src.startsWith('/') && !/\bwidth=/i.test(attrs) && !/\bheight=/i.test(attrs)) {
      const size = publicImageSize(src);
      if (size) attrs += ` width="${size.width}" height="${size.height}"`;
    }
    return `<img${attrs.startsWith(' ') ? '' : ' '}${attrs}>`;
  });
}
