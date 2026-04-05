/**
 * Custom case study *routes* — single place when you add a new project page.
 *
 * For each flow you add:
 * 1. Put a row here: `slug` (URL segment) + `component` (page).
 * 2. Add matching metadata in `./projects.js` (same `slug`) — title, company, cards, widget.
 *
 * URL is always `/projects/${slug}`. Slugs not listed here use the generic `CaseStudyPage`.
 */
import AxessLabCaseStudy from '../pages/AxessLabCaseStudy';
import AxlCaseStudyV2 from '../pages/AxlCaseStudyV2';
import MentattCaseStudy from '../pages/MentattCaseStudy';
import IntelligynCaseStudy from '../pages/IntelligynCaseStudy';
import ArcanimalCaseStudy from '../pages/ArcanimalCaseStudy';

export const caseStudyRoutes = [
  { slug: 'axesslab-design-system', component: AxessLabCaseStudy },
  { slug: 'mentatt-research', component: MentattCaseStudy },
  { slug: 'intelligyn-redesign', component: IntelligynCaseStudy },
  { slug: 'arcanimal-platform', component: ArcanimalCaseStudy },
  { slug: 'axl-v2', component: AxlCaseStudyV2 },
];

/** Quick lookup for redirects, tests, or future use */
export const caseStudySlugSet = new Set(caseStudyRoutes.map((r) => r.slug));

export function getCaseStudyComponent(slug) {
  const row = caseStudyRoutes.find((r) => r.slug === slug);
  return row?.component ?? null;
}
