import { openSync, readSync, closeSync } from 'fs';
import path from 'path';

/** Width and height of a JPEG or PNG under public/, read from its header at
 *  build time so og:image can carry its real size. Null when unknown. */
export function publicImageSize(publicPath: string): { width: number; height: number } | null {
  if (!publicPath.startsWith('/')) return null;
  let fd: number | undefined;
  try {
    fd = openSync(path.join(process.cwd(), 'public', publicPath), 'r');
    const buf = Buffer.alloc(256 * 1024);
    const n = readSync(fd, buf, 0, buf.length, 0);
    // PNG: IHDR right after the signature.
    if (buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    // JPEG: walk the segments to the first SOF marker.
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
    let i = 2;
    while (i + 9 < n) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
    return null;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}
