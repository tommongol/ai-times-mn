/** XML-д аюулгүй болгоно: тусгай тэмдэгт болон XML 1.0-д хориотой удирдах тэмдэгтийг цэвэрлэнэ. */
export function xmlEscape(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
