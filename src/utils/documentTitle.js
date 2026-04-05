import { projects } from '../data';

const SITE = 'Sarah Beú';

/**
 * WCAG 2.4.2 — descriptive page title per route.
 */
export function getDocumentTitle(pathname) {
  const path = pathname || '/';

  if (path === '/') {
    return `${SITE} — Product designer & accessibility`;
  }
  if (path === '/projects') {
    return `Case studies — ${SITE}`;
  }
  if (path === '/about') {
    return `About — ${SITE}`;
  }

  const match = path.match(/^\/projects\/([^/]+)\/?$/);
  if (match) {
    const slug = match[1];
    const p = projects.find((x) => x.slug === slug);
    if (p) {
      return `${p.title} — ${SITE}`;
    }
    return `Project — ${SITE}`;
  }

  return SITE;
}
