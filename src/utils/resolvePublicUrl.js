/**
 * Prefixes paths to files in /public for Vite's import.meta.env.BASE_URL
 * (e.g. GitHub Pages at /repo-name/). Absolute http(s) URLs are unchanged.
 */
export function resolvePublicUrl(path) {
  if (!path) return path;
  if (/^(https?:|data:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL ?? '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
