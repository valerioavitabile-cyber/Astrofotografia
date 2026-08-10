// Astro's `base` config isn't applied automatically to hardcoded <a href="/...">
// strings (only to bundled asset imports), so every internal link needs to go
// through this helper or it 404s whenever `base` isn't '/' (e.g. the
// valerioavitabile-cyber.github.io/Astrofotografia/ deployment).
export function withBase(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}
