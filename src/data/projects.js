// src/data/projects.js
// Replace imageUrl values with your actual project screenshots
//
// When you add a case study: same `slug` must exist in ./caseStudyRegistry.js
// if you use a custom page component (otherwise /projects/:slug uses CaseStudyPage).

export const projects = [
  {
    slug: 'axesslab-design-system',
    company: 'AxessLab',
    title: 'Accessible Design System',
    subtitle: 'Building WCAG 2.2 compliance into every component',
    description:
      'Built a full accessible design system in Figma aligned with WCAG 2.2, DIGG, and EN 301 549 — including semantic design tokens, ARIA patterns, and component documentation. Ran workshops that enabled teams to apply accessibility standards independently.',
    tags: ['Design Systems', 'WCAG 2.2', 'EN 301 549', 'Figma', 'Accessibility'],
    imageUrl: '/assets/projects/axesslab.png',
    color: '#e8f0e6',
    accent: '#064e3b',
    year: '2025',
    role: 'Accessibility Product Designer',
  },
  {
    slug: 'arcanimal-platform',
    company: 'Arcanimal',
    title: 'Animal Welfare Platform',
    subtitle: 'Multi-sided platform for shelter operations & adoption',
    description:
      'Designed a multi-sided platform supporting shelter operations, adoption workflows, and public sector data insights. Implemented AI-assisted design-to-code workflows using Flowbite, Figma MCP, and Cursor — improving UI consistency and reducing handoff time.',
    tags: ['Product Design', 'AI Workflows', 'Figma MCP', 'Flowbite', 'Co-founder'],
    imageUrl: '/assets/projects/arcanimal.png',
    color: '#fff7ed',
    accent: '#c2410c',
    year: '2024–Present',
    role: 'Product Designer & Co-Founder',
  },
  {
    slug: 'intelligyn-redesign',
    company: 'Intelligyn',
    title: 'UX Audit & Website Redesign',
    subtitle: 'Turning drop-off data into a validated new architecture',
    description:
      'Conducted a UX audit identifying high drop-off points, then validated a new information architecture via tree testing. Delivered a redesigned site with improved usability, visual hierarchy, and a full SEO & performance audit.',
    tags: ['UX Audit', 'Information Architecture', 'Tree Testing', 'SEO', 'HTML/CSS'],
    imageUrl: '/assets/projects/intelligyn.png',
    color: '#eff6ff',
    accent: '#1a4fa8',
    year: '2024',
    role: 'Product Designer (Contract)',
  },
  {
    slug: 'mentatt-research',
    company: 'Mentatt',
    title: 'Mental Health App Research',
    subtitle: 'Research that saved a team from building the wrong product',
    description:
      'Conducted qualitative research that uncovered zero willingness to pay for the proposed mental health app — critical early signal that reshaped product strategy and informed early-stage investor discussions before costly development began.',
    tags: ['UX Research', 'Qualitative Methods', 'Market Validation', 'Strategy'],
    imageUrl: '/assets/projects/mentatt.png',
    color: '#f3f0fa',
    accent: '#5b21b6',
    year: '2023',
    role: 'UX Researcher & Product Designer (Contract)',
  },
  {
    slug: 'axl-v2',
    hidden: true,
    widget: false,
    company: 'AxessLab',
    title: 'AXL Design System',
    subtitle: 'An accessibility-focused design system for mobile and desktop',
    description:
      'Six months defining AXL — component library, color and typography tokens, ARIA-aligned patterns, and documentation so product teams could build consistently and accessibly.',
    tags: ['Design Systems', 'Accessibility', 'Figma', 'WCAG', 'Mobile & Desktop'],
    imageUrl: '/assets/projects/axl.png',
    color: '#f9f7f1',
    accent: '#0f766e',
    year: '2024',
    role: 'Design System Designer',
  },
];

/** Shown in /projects, home picks, and next-case-study order; omit `hidden` projects. */
export const visibleProjects = projects.filter((p) => !p.hidden);
