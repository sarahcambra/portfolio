import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/projects';
import s from '../styles/AxessLabCaseStudy.module.css';

const project  = projects.find(p => p.slug === 'axesslab-design-system');
const nextProj = projects.find(p => p.slug === 'arcanimal-platform');

/* ─────────────────────────────────────────────────────────────
   CaseImg — shows the real image if the file exists,
   falls back to a labeled placeholder automatically.
   Place images in /public/assets/projects/axesslab/
───────────────────────────────────────────────────────────── */
function CaseImg({ src, filename, alt, tall, short, className }) {
  const placeholderClass = [
    s.placeholder,
    tall  ? s.placeholderTall  : '',
    short ? s.placeholderShort : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${s.img} ${className || ''}`}
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'flex';
        }}
      />
      {/* Placeholder revealed by onError above */}
      <div className={placeholderClass} style={{ display: 'none' }} role="img" aria-label={alt}>
        <div className={s.placeholderIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <code className={s.placeholderFile}>{filename}</code>
        <p className={s.placeholderLabel}>{alt}</p>
      </div>
    </>
  );
}

/* Single image block with optional caption */
function Img({ src, filename, alt, tall, caption }) {
  return (
    <div className={s.imgWrap}>
      <CaseImg src={src} filename={filename} alt={alt} tall={tall} />
      {caption && <p className={s.imgCaption}>{caption}</p>}
    </div>
  );
}

export default function AxessLabCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Base path for all axesslab images */
  const img = (name) => `/assets/projects/axesslab/${name}`;

  return (
    <main className={s.page} id="main-content">

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className={s.breadcrumb}>
        <Link to="/projects" className={s.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Projects
        </Link>
      </nav>

      {/* ── Hero ── */}
      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>AxessLab · Sweden · Jan – Jul 2025</p>
          <h1 className={s.heroTitle}>Accessible<br />Design System</h1>
          <p className={s.heroSub}>
            Building WCAG 2.2 and EN 301 549 compliance directly into every
            component — so accessibility is a default, not an afterthought.
          </p>
          <div className={s.tags} aria-label="Project tags">
            {project.tags.map(tag => <span key={tag} className={s.tag}>{tag}</span>)}
          </div>
          <p className={s.heroRole}>{project.role}</p>
        </div>
      </header>

      {/* ── Stat bar ── */}
      <div className={s.statBar} aria-label="Project at a glance">
        <div className={s.statBarInner}>
          {[
            { label: 'Timeline',   value: 'Jan – Jul 2025' },
            { label: 'Duration',   value: '7 months' },
            { label: 'Standard',   value: 'WCAG 2.2 AA' },
            { label: 'Regulation', value: 'EN 301 549 · DIGG' },
            { label: 'Tools',      value: 'Figma · Axe · Polypane · ARC' },
            { label: 'Docs',       value: 'Confluence' },
          ].map(({ label, value }) => (
            <div key={label} className={s.stat}>
              <span className={s.statLabel}>{label}</span>
              <span className={s.statValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          COVER
      ══════════════════════════════════════════════════════ */}
      <div className={s.wide} style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <Img
          src={img('cover.png')}
          filename="axesslab/cover.png"
          alt="AxessLab design system — full overview in Figma showing components, tokens, and documentation"
          tall
          caption="Full design system overview — Figma master file"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 1 — CONTEXT
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="context-heading">
          <p className={s.sectionEyebrow}>Context</p>
          <h2 id="context-heading" className={s.h2}>Who is AxessLab and why this project?</h2>
          <p className={s.body}>
            AxessLab is one of Sweden's leading accessibility consulting firms. I joined in early 2025
            as an Accessibility Product Designer with a clear mandate: design a Figma-based system
            where WCAG 2.2 compliance was inherent to every component — not something teams had to
            retrofit after the fact.
          </p>
          <p className={s.body}>
            The system had to align with three standards simultaneously: <strong>WCAG 2.2</strong>,
            Sweden's <strong>DIGG</strong> requirements, and the European standard <strong>EN 301 549</strong>.
            It also had to be practical enough for designers with varying accessibility knowledge to
            use independently, every single day.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 2 — CHALLENGE
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose}>
        <section className={s.section} aria-labelledby="challenge-heading">
          <p className={s.sectionEyebrow}>Challenge</p>
          <h2 id="challenge-heading" className={s.h2}>Three problems to solve at once</h2>
          <p className={s.body}>
            The brief looked focused, but the complexity came from the layering — compliance,
            usability, and knowledge transfer all had to be solved together.
          </p>

          <div className={s.challengeGrid} role="list">
            {[
              {
                num: '01',
                title: 'Multi-standard compliance',
                body: 'Components had to satisfy WCAG 2.2, EN 301 549, and DIGG simultaneously — three overlapping but not identical standards, each with its own edge cases.',
              },
              {
                num: '02',
                title: 'Broken design–dev handoff',
                body: 'Designers were shipping screens without accessibility context — no ARIA roles, no focus order, no image labels. Issues surfaced late and were expensive to fix.',
              },
              {
                num: '03',
                title: 'Concentrated expertise',
                body: 'Accessibility knowledge lived with a few specialists. The system needed to encode that knowledge so any designer could work without always needing an expert.',
              },
            ].map(c => (
              <article key={c.num} className={s.challengeCard} role="listitem">
                <span className={s.challengeNum}>{c.num}</span>
                <h3 className={s.challengeTitle}>{c.title}</h3>
                <p className={s.challengeBody}>{c.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 3 — DISCOVERY
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 01</p>
          <p className={s.dividerTitle}>Discovery & Accessibility Audit</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Discovery</p>
          <h2 className={s.h2}>Finding what the tools couldn't see</h2>
          <p className={s.body}>
            Before designing anything, I audited existing design assets and live products using
            a combination of automated and manual methods. Axe DevTools and ARC Toolkit caught
            roughly 30–40% of issues. The rest required screen readers, keyboard navigation,
            and human judgement.
          </p>
          <p className={s.body}>
            The most critical findings were things automation missed: ambiguous icon labels, broken
            focus order in modals, missing ARIA roles on custom interactive elements, and colour
            combinations that passed contrast ratios but failed in real context for users with
            low vision.
          </p>
        </div>
      </div>

      {/* Audit screenshot — full width */}
      <div className={s.wide}>
        <Img
          src={img('audit-findings.png')}
          filename="axesslab/audit-findings.png"
          alt="Accessibility audit findings spreadsheet showing critical, major, and minor issues categorised by WCAG criterion"
          tall
          caption="Audit findings mapped to WCAG 2.2 criteria — automated + manual combined"
        />
      </div>

      {/* 2-col: tool screenshots */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('axe-report.png')}
              filename="axesslab/axe-report.png"
              alt="Axe DevTools accessibility report showing automated issue list"
            />
            <p className={s.imgCaption}>Axe DevTools automated report</p>
          </div>
          <div>
            <CaseImg
              src={img('polypane-contrast.png')}
              filename="axesslab/polypane-contrast.png"
              alt="Polypane showing colour contrast ratios for multiple viewport sizes"
            />
            <p className={s.imgCaption}>Polypane contrast check across viewports</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 4 — TOKEN ARCHITECTURE
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} style={{ marginTop: '4rem' }} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 02</p>
          <p className={s.dividerTitle}>Token Architecture</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Design Tokens</p>
          <h2 className={s.h2}>Compliance encoded in the token layer</h2>
          <p className={s.body}>
            Tokens were the foundation. Rather than building accessible components and hoping
            designers chose the right values, I baked the constraints into the tokens themselves —
            so every colour, size, and spacing decision was already compliant before it reached
            a component.
          </p>
          <p className={s.body}>
            Colours were named semantically: <code>color/interactive/primary</code>,
            <code> color/status/error</code>, <code>color/text/muted</code>. Every colour token was
            validated against WCAG 1.4.3 (4.5:1 minimum for text, 3:1 for UI elements) before
            being added to the library.
          </p>
        </div>
      </div>

      {/* Full-width token overview */}
      <div className={s.wide}>
        <Img
          src={img('tokens-overview.png')}
          filename="axesslab/tokens-overview.png"
          alt="Full design token system in Figma showing colour, typography, spacing, and border radius tokens"
          tall
          caption="Token library — semantic naming across colour, typography, spacing, and states"
        />
      </div>

      {/* 3-col: individual token groups */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('tokens-color.png')}
              filename="axesslab/tokens-color.png"
              alt="Colour token documentation showing semantic naming and WCAG contrast ratio annotations"
              short
            />
            <p className={s.imgCaption}>Colour tokens + contrast ratios</p>
          </div>
          <div>
            <CaseImg
              src={img('tokens-typography.png')}
              filename="axesslab/tokens-typography.png"
              alt="Typography token scale showing font size, weight, and line-height values"
              short
            />
            <p className={s.imgCaption}>Typography scale</p>
          </div>
          <div>
            <CaseImg
              src={img('tokens-spacing.png')}
              filename="axesslab/tokens-spacing.png"
              alt="Spacing token scale based on 4px grid with named values"
              short
            />
            <p className={s.imgCaption}>Spacing scale (4px base grid)</p>
          </div>
        </div>
      </div>

      {/* Asymmetric: colour palette + states */}
      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className={s.imgGridAsym}>
          <div>
            <CaseImg
              src={img('color-palette.png')}
              filename="axesslab/color-palette.png"
              alt="Full colour palette showing primary, neutral, status, and brand colours with WCAG compliance labels"
            />
            <p className={s.imgCaption}>Full colour palette — all colours WCAG AA verified</p>
          </div>
          <div>
            <CaseImg
              src={img('interactive-states.png')}
              filename="axesslab/interactive-states.png"
              alt="Interactive state tokens — default, hover, focus, active, disabled colour values"
            />
            <p className={s.imgCaption}>Interactive state tokens</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 5 — COMPONENT LIBRARY
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 03</p>
          <p className={s.dividerTitle}>Component Library</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Components</p>
          <h2 className={s.h2}>Every state. Every variant. Every pattern.</h2>
          <p className={s.body}>
            Each component was built with full state coverage: default, hover, focus-visible, active,
            disabled, and error. Focus styles used a 3px outline at minimum 3:1 contrast against
            adjacent colours — satisfying WCAG 2.4.11 (Focus Appearance).
          </p>
          <p className={s.body}>
            All interactive elements met the 44×44px minimum touch target (WCAG 2.5.8). Components
            were paired with ARIA patterns and keyboard interaction specs, documented in Confluence
            for developer reference.
          </p>
        </div>
      </div>

      {/* Component library — full width overview */}
      <div className={s.wide}>
        <Img
          src={img('components-overview.png')}
          filename="axesslab/components-overview.png"
          alt="Component library overview showing all component families arranged in Figma"
          tall
          caption="Component library — full overview, all families"
        />
      </div>

      {/* 2-col: buttons + forms */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('components-buttons.png')}
              filename="axesslab/components-buttons.png"
              alt="Button component showing all variants: primary, secondary, ghost, danger — each with default, hover, focus, active, and disabled states"
            />
            <p className={s.imgCaption}>Button variants — all states documented</p>
          </div>
          <div>
            <CaseImg
              src={img('components-forms.png')}
              filename="axesslab/components-forms.png"
              alt="Form components — text input, textarea, select, checkbox, radio — with error and disabled states"
            />
            <p className={s.imgCaption}>Form inputs — including error and disabled states</p>
          </div>
        </div>
      </div>

      {/* 3-col: navigation, cards, icons */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('components-navigation.png')}
              filename="axesslab/components-navigation.png"
              alt="Navigation patterns — header, tabs, breadcrumbs, and skip links"
              short
            />
            <p className={s.imgCaption}>Navigation patterns + skip links</p>
          </div>
          <div>
            <CaseImg
              src={img('components-modals.png')}
              filename="axesslab/components-modals.png"
              alt="Modal and dialog components with focus trap indicators and ARIA annotations"
              short
            />
            <p className={s.imgCaption}>Modals — focus trap + aria-modal</p>
          </div>
          <div>
            <CaseImg
              src={img('components-icons.png')}
              filename="axesslab/components-icons.png"
              alt="Icon library showing decorative vs informational usage with aria-hidden and label guidance"
              short
            />
            <p className={s.imgCaption}>Icons — decorative vs informational rules</p>
          </div>
        </div>
      </div>

      {/* Focus styles close-up */}
      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Img
          src={img('focus-styles.png')}
          filename="axesslab/focus-styles.png"
          alt="Focus style documentation showing 3px outline with 3:1 contrast ratio — applied consistently across button, link, input, and card components"
          caption="Focus styles — 3px outline, 3:1 contrast, consistent across all interactive elements"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 6 — ANNOTATION FRAMEWORK
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 04</p>
          <p className={s.dividerTitle}>Annotation Framework & Handoff</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Handoff</p>
          <h2 className={s.h2}>Making accessibility intent visible before development</h2>
          <p className={s.body}>
            The annotation framework was the most impactful deliverable. Designers could apply it
            to any screen before handoff — making accessibility decisions explicit and reviewable
            without needing a separate audit step downstream.
          </p>
          <p className={s.body}>The framework covered four areas:</p>
          <ul className={s.list}>
            <li className={s.listItem}><strong>Heading hierarchy</strong> — H1–H6 marked explicitly, with notes on when to use <code>role="heading"</code> vs semantic HTML.</li>
            <li className={s.listItem}><strong>Focus order</strong> — Numbered overlays showing the keyboard tab sequence, flagging any non-linear flows.</li>
            <li className={s.listItem}><strong>ARIA roles vs native HTML</strong> — Annotations clarifying when <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> was sufficient vs when ARIA was needed.</li>
            <li className={s.listItem}><strong>Image labelling</strong> — Every image marked as decorative (<code>alt=""</code>) or informational with the exact label text provided.</li>
          </ul>
        </div>
      </div>

      {/* Annotation on a real screen — full width */}
      <div className={s.wide}>
        <Img
          src={img('annotation-screen.png')}
          filename="axesslab/annotation-screen.png"
          alt="Figma screen annotated with heading hierarchy (H1-H3), focus order numbers, ARIA role labels, and image alt text — applied to a real product page"
          tall
          caption="Annotation framework applied to a real product screen before developer handoff"
        />
      </div>

      {/* 2-col: annotation detail examples */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('annotation-headings.png')}
              filename="axesslab/annotation-headings.png"
              alt="Heading hierarchy annotation showing H1 through H4 levels marked on a dashboard layout"
            />
            <p className={s.imgCaption}>Heading hierarchy — H1 through H4 on a dashboard</p>
          </div>
          <div>
            <CaseImg
              src={img('annotation-focus-order.png')}
              filename="axesslab/annotation-focus-order.png"
              alt="Focus order annotation showing numbered keyboard navigation sequence through an interactive form"
            />
            <p className={s.imgCaption}>Focus order — numbered keyboard sequence through a form</p>
          </div>
        </div>
      </div>

      {/* Before / after handoff */}
      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('handoff-before.png')}
              filename="axesslab/handoff-before.png"
              alt="Before: a design screen passed to developers with no accessibility annotations — no ARIA roles, no alt text, no focus order"
            />
            <p className={s.imgCaption}>Before — no accessibility context in the handoff</p>
          </div>
          <div>
            <CaseImg
              src={img('handoff-after.png')}
              filename="axesslab/handoff-after.png"
              alt="After: the same screen fully annotated with ARIA roles, alt text, heading levels, and focus order"
            />
            <p className={s.imgCaption}>After — full accessibility context for developers</p>
          </div>
        </div>
      </div>

      <div className={s.prose}>
        <div className={s.callout}>
          <p className={s.calloutText}>
            "The annotation framework turned accessibility from a checklist at the end into a
            design conversation at the start — and developers actually thanked us for it."
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 7 — WORKSHOPS
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '2rem' }}>
        <section className={s.section} aria-labelledby="workshops-heading">
          <p className={s.sectionEyebrow}>Team Enablement</p>
          <h2 id="workshops-heading" className={s.h2}>WCAG 2.2 workshops for the design team</h2>
          <p className={s.body}>
            Shipping a design system is only half the job. I ran a series of WCAG 2.2 workshops
            focused on practical, everyday decisions rather than abstract compliance theory.
            Sessions covered contrast ratios, semantic HTML, focus states, descriptive labels,
            and how to read audit findings.
          </p>
          <p className={s.body}>
            The goal: every designer leaves able to catch the most common issues independently,
            and knows when to escalate to someone with deeper expertise.
          </p>
        </section>
      </div>

      {/* 2-col: workshop materials + session */}
      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('workshop-slides.png')}
              filename="axesslab/workshop-slides.png"
              alt="Workshop slides showing WCAG 2.2 colour contrast rules explained with visual examples and pass/fail comparisons"
            />
            <p className={s.imgCaption}>Workshop slides — contrast, focus, labels, ARIA</p>
          </div>
          <div>
            <CaseImg
              src={img('workshop-session.png')}
              filename="axesslab/workshop-session.png"
              alt="Workshop session photo or screenshot showing the team reviewing accessibility patterns together"
            />
            <p className={s.imgCaption}>Workshop session with the AxessLab design team</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 8 — MOBILE
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Responsive</p>
          <h2 className={s.h2}>Accessible across every screen size</h2>
          <p className={s.body}>
            All components were designed and documented for mobile from the start — not adapted
            after the fact. Touch targets met the 44×44px WCAG 2.5.8 minimum on every interactive
            element. Tap target spacing, gesture alternatives, and reflow at 400% zoom were
            all validated.
          </p>
        </div>
      </div>

      {/* Mobile screens — 3 col */}
      <div className={s.wide}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('mobile-1.png')}
              filename="axesslab/mobile-1.png"
              alt="Mobile screen showing navigation and form components at 375px viewport width"
            />
            <p className={s.imgCaption}>Navigation + form — 375px</p>
          </div>
          <div>
            <CaseImg
              src={img('mobile-2.png')}
              filename="axesslab/mobile-2.png"
              alt="Mobile screen showing card components with 44px touch targets highlighted"
            />
            <p className={s.imgCaption}>Cards — 44px touch targets</p>
          </div>
          <div>
            <CaseImg
              src={img('mobile-3.png')}
              filename="axesslab/mobile-3.png"
              alt="Mobile screen showing 400% zoom reflow — content remains linear with no horizontal scroll"
            />
            <p className={s.imgCaption}>400% zoom reflow — no loss of content</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 9 — DOCUMENTATION
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Documentation</p>
          <h2 className={s.h2}>Confluence as the source of truth</h2>
          <p className={s.body}>
            Every component was documented in Confluence with: intended usage, keyboard interaction
            spec, ARIA pattern, known assistive technology quirks, and code notes for developers.
            The goal was that a developer with no design system training could implement a component
            correctly without needing to ask anyone.
          </p>
        </div>
      </div>

      {/* 2-col: Confluence docs */}
      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('docs-component-page.png')}
              filename="axesslab/docs-component-page.png"
              alt="Confluence component documentation page for the button component showing usage guidelines, ARIA roles, and keyboard interactions"
            />
            <p className={s.imgCaption}>Confluence — component page (Button)</p>
          </div>
          <div>
            <CaseImg
              src={img('docs-keyboard-table.png')}
              filename="axesslab/docs-keyboard-table.png"
              alt="Keyboard interaction specification table showing key, action, and WCAG criterion for a dropdown component"
            />
            <p className={s.imgCaption}>Keyboard interaction table — dropdown component</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          ACT 10 — OUTCOMES
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="outcomes-heading">
          <p className={s.sectionEyebrow}>Outcomes</p>
          <h2 id="outcomes-heading" className={s.h2}>What the system made possible</h2>
          <p className={s.body}>
            By the end of the engagement, the design system was being actively used for client
            projects and the annotation framework was adopted as a standard step in every design
            review. Teams were catching accessibility issues independently — without needing an
            expert in the room.
          </p>

          <div className={s.outcomes} role="list">
            {[
              { num: 'WCAG 2.2',    label: 'AA compliance built into every component from day one' },
              { num: 'EN 301 549',  label: 'European standard met across all system deliverables' },
              { num: '3 standards', label: 'WCAG · DIGG · EN 301 549 unified in one token layer' },
              { num: '4+ sessions', label: 'WCAG 2.2 workshops enabling independent designer work' },
              { num: 'Zero',        label: 'Critical contrast failures in the delivered library' },
              { num: '100%',        label: 'Components with keyboard spec and ARIA documentation' },
            ].map(o => (
              <div key={o.num} className={s.outcomeStat} role="listitem">
                <span className={s.outcomeNum}>{o.num}</span>
                <span className={s.outcomeLabel}>{o.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className={s.section} aria-labelledby="reflection-heading">
          <p className={s.sectionEyebrow}>Reflection</p>
          <h2 id="reflection-heading" className={s.h2}>What I took away</h2>
          <p className={s.body}>
            The biggest shift: accessibility is an architecture problem, not a QA problem.
            When compliance is encoded into tokens and component decisions, it stops being
            something you check for and starts being something you get for free.
          </p>
          <p className={s.body}>
            Automated tools catch 30–40% of WCAG failures. The rest requires human judgement —
            meaningful label text, logical reading order, understanding user context. I used
            AI tools to support documentation and reporting, but always with full manual
            validation behind every finding.
          </p>
          <p className={s.body}>
            What I'd do differently: involve developers earlier in the token and annotation
            decisions. The handoff improved significantly, but co-designing those frameworks
            with the people implementing them would have made them even more practical from day one.
          </p>
        </section>
      </div>

      {/* ── Next project ── */}
      <nav className={s.nextProject} aria-label="Next case study">
        <Link to={`/projects/${nextProj.slug}`} className={s.nextLink}>
          <span className={s.nextLabel}>Next case study</span>
          <span className={s.nextTitle}>{nextProj.title} →</span>
        </Link>
      </nav>

    </main>
  );
}
