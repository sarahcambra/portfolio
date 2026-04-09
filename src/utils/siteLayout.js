/**
 * Site-wide Tailwind layout utilities (single source of truth).
 *
 * - `csLayout` / `csTw` — long-form case studies + CaseStudy.module.css
 * - `pageLayout` / `pageTw` — marketing shells + Page.module.css
 */
export const csLayout = {
  /** Text content — optimal reading width */
  prose: 'mx-auto w-full max-w-[72.5rem] px-5 sm:px-6 lg:px-8',

  /** Wide containers for images, screenshots, grids */
  wide:
    'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 [&_img]:rounded-xl [&_img]:shadow-lg',

  /** Extra-wide when needed */
  wideXl: 'mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8',

  /** Hero cover image — large visual right after title */
  cover: 'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 pt-10 pb-12',

  /** Hero section padding (pair with csTw.heroBg) */
  heroPad: 'pt-16 pb-8',

  /** Stat bar */
  statBarPad: 'py-10',
  statBarInner:
    'mx-auto w-full max-w-7xl flex flex-wrap justify-center gap-x-12 gap-y-9 px-5 sm:px-6',

  /** Phase dividers (dark bar — background lives here, not on a separate csTw) */
  divider:
    'mt-20 px-5 py-12 sm:px-6 lg:px-8 bg-[var(--color-bg-dark)]',
  dividerInner: 'mx-auto w-full max-w-7xl text-center',
  dividerMarginTop: 'mt-16',

  teamTableMb: 'mb-20',

  imgWrap: 'mt-8 mb-3',

  pt: {
    section: 'pt-14',
    md: 'pt-8',
    sm: 'pt-4',
    block: 'pt-12',
    hero: 'pt-16',
    spacing1: 'pt-4',
    spacing2: 'pt-8',
    spacing3: 'pt-12',
    spacing4: 'pt-16',
  },
  pb: {
    sm: 'pb-4',
    md: 'pb-10',
    lg: 'pb-12',
    xl: 'pb-16',
    b15: 'pb-6',
    b25: 'pb-10',
  },

  /** Grids — consistent gap-6 */
  gridChallenge:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6',
  gridOutcomes:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6',
  gridImg2: 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-8',
  gridImg3:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 min-w-0',
  gridImgAsym: 'grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-8',
  gridResearch:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8',
  gridInsight:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6',
  gridStatRow:
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8',
  teamRow:
    'grid grid-cols-1 md:grid-cols-[140px_1fr] items-start gap-8 border-b border-[var(--color-border)] px-6 py-5 last:border-b-0',

  /** Mentatt: How Might We cards */
  gridHmw: 'grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8',
  /** Before / after comparison */
  gridSolution: 'grid grid-cols-1 md:grid-cols-2 gap-6 my-8',
};

/** Case study Tailwind-only patterns (themes via CSS variables on <main>). */
export const csTw = {
  heroBg: 'bg-[var(--case-canvas-air)]',
  statBar:
    'border-y border-[color-mix(in_srgb,var(--accent)_14%,transparent)] bg-[color-mix(in_srgb,var(--accent)_10%,var(--case-canvas-air))] dark:border-[color-mix(in_srgb,var(--accent)_28%,transparent)] dark:bg-[color-mix(in_srgb,var(--accent)_18%,var(--primitive-gray-900))]',
  statCol: 'flex max-w-[14rem] flex-col gap-1 text-center',
  statVal: 'text-base font-semibold text-[var(--color-ink)] dark:text-white',
  sectionEyebrow: 'flex items-center gap-3 text-[var(--color-ink-muted)] mb-3.5',
  section: 'mb-12 md:mb-20',
  sectionSm: 'mb-8 md:mb-12',
  teamTable: 'mb-20 overflow-hidden rounded-lg border border-[var(--color-border)]',
  teamKey: 'font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]',
  teamVal: 'text-base leading-[1.85] text-[var(--color-ink-soft)]',
  dividerLabel: 'mb-1.5 text-[var(--primitive-gray-400)]',
  dividerTitle: 'text-[length:var(--type-section-h2)] text-white/90',
  cardLeft: 'border-l-[3px] border-l-[var(--accent-light)]',
  insightStat:
    'rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 border-l-[3px] border-l-[var(--accent-light)] transition-shadow hover:border-[var(--accent)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  outcomeStat:
    'flex flex-col gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-5 pt-6 border-t-[3px] border-t-[var(--accent-light)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  outcomeNum:
    'text-2xl font-bold leading-none tracking-tight text-[var(--accent)] sm:text-3xl md:text-4xl',
  tagsRow: 'mb-6 flex flex-wrap gap-1.5',
  tagPill:
    'inline-flex rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-3 py-1 text-sm font-medium text-[var(--accent)]',
  heroSub: 'mb-8 text-lg font-light leading-relaxed text-[var(--color-ink-soft)]',
  heroTitle: 'mb-4 text-[length:var(--type-page-hero)] text-[var(--color-ink)]',
  h2: 'mb-5 text-[length:var(--type-section-h2)] text-[var(--color-ink)]',
  h3: 'mb-3 text-[length:var(--type-subhead-h3)] font-semibold text-[var(--color-ink)]',
  challengeNum:
    'font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]',
  challengeTitle: 'text-[length:var(--type-subhead-h3)] font-semibold text-[var(--color-ink)]',
  insightTitle: 'mb-2 text-[length:var(--type-subhead-h3)] font-semibold text-[var(--color-ink)]',
  list: 'my-3 flex list-disc flex-col gap-2.5 pl-5',
  link: 'text-[var(--accent)] underline underline-offset-2 hover:opacity-75',
  placeholder:
    'flex min-h-[220px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg-alt)] p-10 text-center dark:border-white/10 dark:bg-[var(--color-bg-card)]',
  placeholderTall: 'min-h-[360px]',
  placeholderShort: 'min-h-[160px] py-6',
  placeholderIcon:
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)] text-[var(--accent)]',
  placeholderFile:
    'rounded bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] px-2 py-0.5 font-mono text-xs text-[var(--accent)]',
  placeholderLabel: 'max-w-[260px] text-base text-[var(--color-ink-muted)]',
  img: 'w-full rounded-xl shadow-md',
  calloutBanner: 'rounded-lg bg-[var(--color-bg-dark)] px-8 py-10 text-center',
  calloutBannerText:
    'mx-auto max-w-[540px] text-xl italic leading-relaxed text-white/80',
  findingRow:
    'flex gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 border-l-[3px] border-l-[var(--accent)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  findingNum: 'shrink-0 pt-0.5 font-mono text-xs font-semibold text-[var(--accent)]',
  statCardNum: 'mb-1 block font-mono text-2xl font-bold text-[var(--accent)]',
  statCard:
    'rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 border-l-[3px] border-l-[var(--accent-light)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  insightNum: 'mb-2 block font-mono text-3xl font-bold text-[var(--accent)]',
  insightLabel: 'text-base leading-[1.55] text-[var(--color-ink-soft)]',
  priorityItem:
    'flex flex-col gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-5 border-l-[3px] border-l-[var(--accent)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  priorityBadge:
    'font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]',
  priorityText: 'm-0 text-base leading-relaxed text-[var(--color-ink-soft)]',
  insightCard:
    'rounded-lg border border-[var(--accent-mid)] bg-[var(--accent-light)] p-6 dark:border-[color-mix(in_srgb,var(--accent)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  hmwCard:
    'rounded-lg border border-[var(--accent-mid)] bg-[var(--accent-light)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  hmwLabel:
    'mb-3 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]',
  hmwQuestion: 'm-0 text-base font-medium italic leading-snug text-[var(--color-ink)]',
  solutionBefore:
    'rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 dark:bg-white/[0.03]',
  solutionAfter:
    'rounded-lg border border-[var(--accent-mid)] bg-[var(--accent-light)] p-6 dark:bg-[color-mix(in_srgb,var(--accent)_10%,var(--color-bg-card))]',
  solutionLabel:
    'mb-3 block font-mono text-xs font-semibold uppercase tracking-[0.14em]',
  solutionText: 'm-0 text-base leading-relaxed text-[var(--color-ink-soft)]',
  palette: 'mt-6 flex flex-wrap items-start gap-5',
  paletteItem: 'flex flex-col items-center gap-2',
  paletteSwatch: 'h-[52px] w-[52px] rounded-md shadow-sm',
  paletteLabel: 'text-center font-mono text-xs text-[var(--color-ink-muted)]',
  testingItem: 'flex gap-4 rounded-md p-4',
  testingRemoved:
    'border-l-[3px] border-l-red-400/40 bg-red-500/5 dark:bg-red-500/[0.06]',
  testingKept:
    'border-l-[3px] border-l-[var(--accent)] bg-[var(--accent-light)] dark:bg-[color-mix(in_srgb,var(--accent)_8%,var(--color-bg-card))]',
  testingBadge:
    'shrink-0 whitespace-nowrap pt-0.5 font-mono text-xs font-semibold uppercase tracking-[0.1em]',
  testingText: 'm-0 text-base leading-relaxed text-[var(--color-ink-soft)]',
  findingsList: 'flex flex-col gap-3',
};

/** Marketing / Page.module.css — width bands and shared Tailwind. */
export const pageLayout = {
  container:
    'mx-auto w-full max-w-[var(--max-width)] px-[var(--page-pad-x)]',
  prose: 'mx-auto w-full max-w-[var(--max-width-prose)]',
};

export const pageTw = {
  sectionGap: 'mb-12 md:mb-16',
};
