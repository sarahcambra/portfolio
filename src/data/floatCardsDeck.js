/**
 * Scroll-driven floating cards on the homepage.
 * Add or edit entries here (goal: many variants — sample shows 12 rich + 38 minimal = 50).
 *
 * variant:
 *   - tokens | wcag | ui | type | audit | minimal
 */
export const FLOAT_ANIM_CLASSES = ['fa', 'fb', 'fc', 'fd', 'fe'];

const RICH_CARDS = [
  {
    id: 'deck-tokens',
    variant: 'tokens',
    detail:
      'Semantic tokens for color, spacing, and typography — applied consistently across every component.',
    badge: 'Tokens',
    title: 'Design Tokens',
    swatches: ['#0f0f0e', '#525252', '#9ca3af', '#e2e1dc', '#f0f0ee'],
    codeLine: 'color.neutral.*',
  },
  {
    id: 'deck-wcag',
    variant: 'wcag',
    detail:
      'All components meet EN 301 549 and WCAG 2.2 Level AA. Tested with JAWS, NVDA, VoiceOver and keyboard-only navigation.',
    badge: 'A11y',
    title: 'Accessibility Checklist',
    checkLead: 'WCAG 2.2 AA',
    checkItems: ['Contrast 7.2:1', 'Focus visible', 'Alt text', 'Keyboard'],
  },
  {
    id: 'deck-ui',
    variant: 'ui',
    detail: 'All components meet 44×44px minimum touch target. Focus rings meet 3:1 contrast.',
    badge: 'UI',
    title: 'UI Components',
  },
  {
    id: 'deck-type',
    variant: 'type',
    detail: 'Fluid type scale using clamp(). Body and UI labels stay at least 14px for readability.',
    badge: 'Type',
    title: 'Scale',
    typeRows: [
      { l: 'Display', fs: '1.5rem', w: 700 },
      { l: 'Heading', fs: '1.25rem', w: 600 },
      { l: 'Body', fs: '1rem', w: 400 },
      { l: 'Caption', fs: '1rem', w: 500 },
    ],
  },
  {
    id: 'deck-audit',
    variant: 'audit',
    detail: 'Axe DevTools + manual screen reader testing. Zero critical accessibility issues.',
    badge: 'QA',
    title: 'Audit',
    score: 94,
    scoreMeta: '0 critical · 2 minor',
  },
  {
    id: 'deck-figma',
    variant: 'minimal',
    detail: 'Libraries, variables, and dev mode keep design and code aligned.',
    badge: 'Figma',
    title: 'Component library',
  },
  {
    id: 'deck-research',
    variant: 'minimal',
    detail: 'Tree testing and IA validation before high-fidelity work.',
    badge: 'UX',
    title: 'Tree testing',
  },
  {
    id: 'deck-mobile',
    variant: 'minimal',
    detail: 'Touch targets and spacing tested on real devices, not only desktop.',
    badge: 'Mobile',
    title: 'Responsive patterns',
  },
  {
    id: 'deck-doc',
    variant: 'minimal',
    detail: 'Patterns, props, and accessibility notes live next to the components.',
    badge: 'Docs',
    title: 'Storybook-ready',
  },
  {
    id: 'deck-i18n',
    variant: 'minimal',
    detail: 'Copy length and layout flex for Swedish, English, and future locales.',
    badge: 'i18n',
    title: 'Locale-ready UI',
  },
  {
    id: 'deck-perf',
    variant: 'minimal',
    detail: 'Lazy media, tokenized CSS, and lean bundles where it matters.',
    badge: 'Perf',
    title: 'Light footprint',
  },
  {
    id: 'deck-a11y-proc',
    variant: 'wcag',
    detail: 'Checklists and definition-of-done embed accessibility in every sprint.',
    badge: 'Process',
    title: 'A11y in delivery',
    checkLead: 'Shift left',
    checkItems: ['DoD', 'Reviews', 'SR smoke', 'Tickets'],
  },
];

/** Replace copy as you like — scroll deck cycles these after the hero. */
const SCROLL_EXTRA_MINIMAL = Array.from({ length: 30 }, (_, i) => ({
  id: `deck-extra-${i + 1}`,
  variant: 'minimal',
  badge: ['Craft', 'Systems', 'Research', 'UI', 'Content', 'Motion', 'IA', 'Handoff'][
    i % 8
  ],
  title: `Studio note ${i + 1}`,
  detail:
    'Swap this line for a real highlight — outcomes, tools, or how you work with teams.',
}));

export const FLOAT_CARDS_DECK = [...RICH_CARDS, ...SCROLL_EXTRA_MINIMAL];

/**
 * Three fixed corners — top-left, top-right, bottom-right — so cards do not
 * stack on one side while scrolling.
 */
export const FLOAT_SCROLL_SLOTS = [
  { top: 'max(5.25rem, 11vh)', left: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
  { top: 'max(5.25rem, 11vh)', right: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
  { bottom: 'max(1.25rem, 7vh)', right: 'max(10px, 2vw)', width: 'min(90vw, 220px)' },
];
