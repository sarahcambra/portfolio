/**
 * Prefixes paths to files in /public for Vite's import.meta.env.BASE_URL
 * (e.g. GitHub Pages at /repo-name/). Absolute http(s) URLs are unchanged.
 * Paths already prefixed with BASE_URL are returned as-is.
 */
export function resolvePublicUrl(path) {
  if (!path) return path;
  if (/^(https?:|data:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL ?? '/';
  if (path.startsWith(base)) return path;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
