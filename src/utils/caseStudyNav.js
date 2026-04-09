import { visibleProjects } from '../data';

/**
 * Per-slug "next" overrides. Use when you want a custom order instead of the
 * default ring (`projects` index + 1). Values must match `slug` in `projects.js`.
 */
export const caseStudyNextOverrides = {
  'mentatt-research': 'axesslab-design-system',
};

/**
 * Next project: override map first, otherwise next in `visibleProjects` order.
 */
export function getNextCaseStudy(currentSlug) {
  const overrideSlug = caseStudyNextOverrides[currentSlug];
  if (overrideSlug) {
    const fromOverride = visibleProjects.find((p) => p.slug === overrideSlug);
    if (fromOverride) return fromOverride;
  }
  const list = visibleProjects;
  const i = list.findIndex((p) => p.slug === currentSlug);
  if (i === -1) return list[0];
  return list[(i + 1) % list.length];
}
