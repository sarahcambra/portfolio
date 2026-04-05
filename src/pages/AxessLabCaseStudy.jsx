import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/AxessLabCaseStudy.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

const project = projects.find(p => p.slug === 'axesslab-design-system');
const next = getNextCaseStudy('axesslab-design-system');

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

  const img = (name) => resolvePublicUrl(`/assets/projects/axesslab/${name}`);

  return (
    <main className={s.page} id="main-content">

      <CaseStudyBreadcrumb />

      {/* ── Hero ── */}
      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>AxessLab · Sweden · Jan to Jul 2025</p>
          <h1 className={s.heroTitle}>Accessible<br />Design System</h1>
          <p className={s.heroSub}>
            Building WCAG 2.2 and EN 301 549 compliance directly into every
            component, so accessibility is a default and not an afterthought.
          </p>
          <div className={s.tags} role="group" aria-label="Project tags">
            {project.tags.map(tag => <span key={tag} className={s.tag}>{tag}</span>)}
          </div>
          <p className={s.heroRole}>{project.role}</p>
        </div>
      </header>

      {/* ── Stat bar ── */}
      <div className={s.statBar} role="group" aria-label="Project at a glance">
        <div className={s.statBarInner}>
          {[
            { label: 'Timeline',   value: 'Jan to Jul 2025' },
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

      {/* ── Cover ── */}
      <div className={s.wide} style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <Img
          src={img('cover.png')}
          filename="axesslab/cover.png"
          alt="AxessLab design system full overview in Figma showing components, tokens, and documentation"
          tall
          caption="Full design system overview in Figma"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="context-heading">
          <p className={s.sectionEyebrow}>Context</p>
          <h2 id="context-heading" className={s.h2}>Who is AxessLab and why this project?</h2>
          <p className={s.body}>
            AxessLab is one of Sweden's leading accessibility consulting firms. I joined in early
            2025 as an Accessibility Product Designer with one clear job: build a Figma system
            where WCAG 2.2 compliance was built into every component from the start, not something
            bolted on at the end.
          </p>
          <p className={s.body}>
            The system had to meet three standards at once: <strong>WCAG 2.2</strong>, Sweden's{' '}
            <strong>DIGG</strong> requirements, and the European standard <strong>EN 301 549</strong>.
            And it had to be practical enough for designers at different levels to use on their own,
            every single day.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          TEAM AND ROLE
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose}>
        <div className={s.teamTable}>
          <div className={s.teamRow}>
            <span className={s.teamKey}>Team</span>
            <span className={s.teamVal}>Product Owner, two UX Designers, and me as Accessible Design System Designer</span>
          </div>
          <div className={s.teamRow}>
            <span className={s.teamKey}>My role</span>
            <span className={s.teamVal}>Defining and implementing design tokens. Building Figma components with accessible defaults. Designing the annotation kit. Writing design and developer documentation in Confluence.</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RESEARCH PHASE
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 00</p>
          <p className={s.dividerTitle}>Research and Definition</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Qualitative Research</p>
          <h2 className={s.h2}>Understanding the problem before designing anything</h2>
          <p className={s.body}>
            Before touching Figma, I interviewed an accessibility engineer to understand what
            actually goes wrong when designers hand off screens to developers without accessibility
            context. Three patterns came up every time.
          </p>
        </div>

        <div className={s.researchInsights} role="list">
          {[
            {
              title: 'Handoff gaps',
              body: 'Missing details on focus order, alt text, and component behaviour meant developers had to guess. Guessing is where accessibility breaks.',
            },
            {
              title: 'Unclear landmarks and roles',
              body: 'Without guidance on regions, decorative images, and ARIA roles, developers relied on assumptions that often introduced errors.',
            },
            {
              title: 'Designer technical gaps',
              body: 'Misuse of ARIA, keyboard navigation patterns, and error states was common. Designers needed stronger technical grounding, not just design rules.',
            },
          ].map(i => (
            <div key={i.title} className={s.insightCard} role="listitem">
              <h3 className={s.insightTitle}>{i.title}</h3>
              <p className={s.insightBody}>{i.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <Img
          src={img('interview-notes.png')}
          filename="axesslab/interview-notes.png"
          alt="Interview notes covering accessibility annotation gaps and labelling practices"
          caption="Developer interview — key findings on handoff gaps and ARIA misuse"
        />
      </div>

      <div className={s.prose} style={{ paddingTop: '3rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Competitive Benchmarking</p>
          <h2 className={s.h2}>Learning from five industry design systems</h2>
          <p className={s.body}>
            I studied Material, Carbon, Spectrum, and two others to understand how leading
            systems handled accessibility documentation, token naming, and ARIA patterns.
            The goal was not to copy them but to know what the baseline looked like before
            deciding what AXL needed to do differently.
          </p>
          <ul className={s.list}>
            <li className={s.listItem}>Which components appeared most often across systems</li>
            <li className={s.listItem}>How tokens were named and structured</li>
            <li className={s.listItem}>How accessibility was documented — or not documented</li>
            <li className={s.listItem}>How ARIA patterns were applied to modals, toggles, and tabs</li>
          </ul>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <Img
          src={img('benchmarking.png')}
          filename="axesslab/benchmarking.png"
          alt="Competitive benchmarking table comparing five design systems across components, tokens, accessibility documentation and ARIA patterns"
          caption="Benchmarking — five systems compared across components, tokens, and accessibility docs"
        />
      </div>

      <div className={s.prose} style={{ paddingTop: '3rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>ARIA Pattern Research</p>
          <h2 className={s.h2}>Grounding every component in the WAI-ARIA spec</h2>
          <p className={s.body}>
            I used the{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              WAI-ARIA Authoring Practices Guide
            </a>
            {' '}as the reference for every interactive component. This determined how roles,
            states, and properties were applied, and what keyboard behaviour each component had
            to support. Not as a checklist but as a starting point for each component conversation.
          </p>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Img
          src={img('aria-patterns.png')}
          filename="axesslab/aria-patterns.png"
          alt="WAI-ARIA Authoring Practices Guide showing keyboard navigation patterns for interactive components"
          caption="WAI-ARIA APG — keyboard and role patterns used as the foundation for each component"
        />
      </div>
      <div className={s.prose}>
        <section className={s.section} aria-labelledby="challenge-heading">
          <p className={s.sectionEyebrow}>Challenge</p>
          <h2 id="challenge-heading" className={s.h2}>Three problems sitting underneath one brief</h2>
          <p className={s.body}>
            The brief was focused, but three real problems were sitting underneath it.
            Compliance, usability, and knowledge transfer all had to be solved together.
          </p>

          <div className={s.challengeGrid} role="list">
            {[
              {
                num: '01',
                title: 'Standards that do not fully align',
                body: 'The system was built on WCAG 2.2 and DIGG. DIGG interprets EN 301 549 clause 11.7, which is part of the European Accessibility Act and the Swedish DOS-law, as requiring components to respect user system settings including dark mode. That made dark mode a compliance requirement, not a visual preference. It had to be treated as a first-class part of the system from the start.',
              },
              {
                num: '02',
                title: 'A broken design to dev handoff',
                body: 'Designers were sending screens to developers with no accessibility context. No ARIA roles, no focus order, no image labels. Problems showed up late and cost a lot to fix.',
              },
              {
                num: '03',
                title: 'Knowledge stuck with a few people',
                body: 'Accessibility expertise lived with a handful of specialists. The system needed to spread that knowledge so designers could work independently without always needing to ask someone.',
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
          DEFINITION
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '2rem' }}>
        <section className={s.section} aria-labelledby="definition-heading">
          <p className={s.sectionEyebrow}>Definition</p>
          <h2 id="definition-heading" className={s.h2}>What the system had to cover</h2>
          <p className={s.body}>
            Before building anything, I mapped out every component the system needed.
            This gave the team a clear scope and stopped the list from growing in random
            directions mid-project. Token decisions came after the component inventory —
            the components drove what tokens were needed, not the other way around.
          </p>
        </section>
      </div>

      <div className={s.wide} style={{ paddingBottom: '1rem' }}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('component-definition.png')}
              filename="axesslab/component-definition.png"
              alt="Component definition table listing all AXL design system components with their types, variants, states and modifiers"
              short
            />
            <p className={s.imgCaption}>Component inventory — types, variants, states, modifiers</p>
          </div>
          <div>
            <CaseImg
              src={img('tokens-typography.png')}
              filename="axesslab/tokens-typography.png"
              alt="Typography scale showing heading and body text styles across desktop and mobile sizes"
              short
            />
            <p className={s.imgCaption}>Typography scale — desktop and mobile</p>
          </div>
          <div>
            <CaseImg
              src={img('tokens-spacing.png')}
              filename="axesslab/tokens-spacing.png"
              alt="Spacing, layout grid, shadow and elevation tokens including light and dark mode values"
              short
            />
            <p className={s.imgCaption}>Spacing, grid, shadow tokens</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DISCOVERY
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 01</p>
          <p className={s.dividerTitle}>Discovery and Accessibility Audit</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Discovery</p>
          <h2 className={s.h2}>Finding what the tools could not see</h2>
          <p className={s.body}>
            Before designing anything, I audited existing design files and live products using
            both automated and manual methods. Axe DevTools and ARC Toolkit caught around 30 to
            40 percent of the issues. The rest I had to find manually through screen readers,
            keyboard navigation, and real judgement calls.
          </p>
          <p className={s.body}>
            The most critical findings were the ones automation missed completely. Ambiguous icon
            labels, broken focus order inside modals, missing ARIA roles on custom interactive
            elements, and colour combinations that passed contrast checks on paper but failed in
            real use for people with low vision.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('audit-findings.png')}
          filename="axesslab/audit-findings.png"
          alt="Accessibility audit findings spreadsheet showing critical, major, and minor issues categorised by WCAG criterion"
          tall
          caption="Audit findings mapped to WCAG 2.2 criteria — automated and manual combined"
        />
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('axe-report.png')} filename="axesslab/axe-report.png" alt="Axe DevTools accessibility report showing automated issue list" />
            <p className={s.imgCaption}>Axe DevTools automated report</p>
          </div>
          <div>
            <CaseImg src={img('polypane-contrast.png')} filename="axesslab/polypane-contrast.png" alt="Polypane showing colour contrast ratios for multiple viewport sizes" />
            <p className={s.imgCaption}>Polypane contrast check across viewports</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TOKEN ARCHITECTURE
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
          <h2 className={s.h2}>Compliance built into the token layer</h2>
          <p className={s.body}>
            Tokens were the foundation. Instead of building accessible components and hoping
            designers would pick the right values, I put the constraints into the tokens
            themselves. Every colour, size, and spacing decision was already compliant before
            it reached a component.
          </p>
          <p className={s.body}>
            Colours were named by what they do, not what they look like:{' '}
            <code>color/interactive/primary</code>, <code>color/status/error</code>,{' '}
            <code>color/text/muted</code>. Each token had a light and dark mode value pair,
            so the system could meet EN 301 549 clause 11.7 without any manual overrides.
            Colour contrast was tested not just on default backgrounds but on every surface
            a token could land on — cards, modals, alerts, disabled states. Non-text elements
            like icons, borders, and focus rings were tested separately because the threshold
            is different and automation rarely catches those combinations. Touch target size
            was also validated at the token level, so the minimum 44 by 44px requirement
            was built in rather than checked after.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('tokens-overview.png')}
          filename="axesslab/tokens-overview.png"
          alt="Full design token system in Figma showing colour, typography, spacing, and border radius tokens"
          tall
          caption="Token library — semantic naming across colour, typography, spacing, and states"
        />
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg src={img('tokens-color.png')} filename="axesslab/tokens-color.png" alt="Colour token documentation showing semantic naming and WCAG contrast ratio annotations" short />
            <p className={s.imgCaption}>Colour tokens and contrast ratios</p>
          </div>
          <div>
            <CaseImg src={img('tokens-typography.png')} filename="axesslab/tokens-typography.png" alt="Typography token scale showing font size, weight, and line-height values" short />
            <p className={s.imgCaption}>Typography scale</p>
          </div>
          <div>
            <CaseImg src={img('tokens-spacing.png')} filename="axesslab/tokens-spacing.png" alt="Spacing token scale based on 4px grid with named values" short />
            <p className={s.imgCaption}>Spacing scale (4px base grid)</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className={s.imgGridAsym}>
          <div>
            <CaseImg src={img('color-palette.png')} filename="axesslab/color-palette.png" alt="Full colour palette showing primary, neutral, status, and brand colours with WCAG compliance labels" />
            <p className={s.imgCaption}>Full colour palette — all colours WCAG AA verified</p>
          </div>
          <div>
            <CaseImg src={img('interactive-states.png')} filename="axesslab/interactive-states.png" alt="Interactive state tokens showing default, hover, focus, active, and disabled colour values" />
            <p className={s.imgCaption}>Interactive state tokens</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          COMPONENT LIBRARY
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
            Every component was built with full state coverage: default, hover, focus-visible,
            active, disabled, and error. Focus styles used a 3px outline at minimum 3:1
            contrast against the background — visible enough to pass WCAG and visible enough
            to actually help users.
          </p>
          <p className={s.body}>
            Every interactive element hit the 44×44px minimum touch target. Every component
            shipped with ARIA patterns and keyboard interaction specs in Confluence, so
            developers had what they needed without asking.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('components-overview.png')}
          filename="axesslab/components-overview.png"
          alt="Component library overview showing all component families arranged in Figma"
          tall
          caption="Component library — full overview, all families"
        />
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('components-buttons.png')} filename="axesslab/components-buttons.png" alt="Button component showing all variants: primary, secondary, ghost, danger with default, hover, focus, active, and disabled states" />
            <p className={s.imgCaption}>Button variants — all states documented</p>
          </div>
          <div>
            <CaseImg src={img('components-forms.png')} filename="axesslab/components-forms.png" alt="Form components including text input, textarea, select, checkbox, and radio with error and disabled states" />
            <p className={s.imgCaption}>Form inputs — including error and disabled states</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg src={img('components-navigation.png')} filename="axesslab/components-navigation.png" alt="Navigation patterns including header, tabs, breadcrumbs, and skip links" short />
            <p className={s.imgCaption}>Navigation patterns and skip links</p>
          </div>
          <div>
            <CaseImg src={img('components-modals.png')} filename="axesslab/components-modals.png" alt="Modal and dialog components with focus trap indicators and ARIA annotations" short />
            <p className={s.imgCaption}>Modals — focus trap and aria-modal</p>
          </div>
          <div>
            <CaseImg src={img('components-icons.png')} filename="axesslab/components-icons.png" alt="Icon library showing decorative vs informational usage with aria-hidden and label guidance" short />
            <p className={s.imgCaption}>Icons — decorative vs informational rules</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Img
          src={img('focus-styles.png')}
          filename="axesslab/focus-styles.png"
          alt="Focus style documentation showing 3px outline with 3 to 1 contrast ratio applied consistently across button, link, input, and card components"
          caption="Focus styles — 3px outline, 3 to 1 contrast, consistent across all interactive elements"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          ANNOTATION FRAMEWORK
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 04</p>
          <p className={s.dividerTitle}>Annotation Framework and Handoff</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Handoff</p>
          <h2 className={s.h2}>Making accessibility visible before development starts</h2>
          <p className={s.body}>
            The annotation framework turned out to be the most useful thing I delivered.
            Designers could apply it to any screen before sending it to development, making
            every accessibility decision visible and reviewable before a line of code was written.
          </p>
          <p className={s.body}>The framework covered four things:</p>
          <ul className={s.list}>
            <li className={s.listItem}>
              <strong>Heading hierarchy</strong> — H1 through H6 marked clearly, with notes on
              when to use <code>role="heading"</code> and when plain HTML was enough.
            </li>
            <li className={s.listItem}>
              <strong>Focus order</strong> — numbered overlays showing the keyboard tab sequence,
              flagging anything that did not flow in a logical order.
            </li>
            <li className={s.listItem}>
              <strong>ARIA roles vs native HTML</strong> — annotations showing when a{' '}
              <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> was enough and when ARIA
              was actually needed.
            </li>
            <li className={s.listItem}>
              <strong>Image labelling</strong> — every image marked as decorative with{' '}
              <code>alt=""</code> or informational with the exact label text written out.
            </li>
          </ul>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('annotation-screen.png')}
          filename="axesslab/annotation-screen.png"
          alt="Figma screen annotated with heading hierarchy, focus order numbers, ARIA role labels, and image alt text applied to a real product page"
          tall
          caption="Annotation framework applied to a real product screen before developer handoff"
        />
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('annotation-headings.png')} filename="axesslab/annotation-headings.png" alt="Heading hierarchy annotation showing H1 through H4 levels marked on a dashboard layout" />
            <p className={s.imgCaption}>Heading hierarchy — H1 through H4 on a dashboard</p>
          </div>
          <div>
            <CaseImg src={img('annotation-focus-order.png')} filename="axesslab/annotation-focus-order.png" alt="Focus order annotation showing numbered keyboard navigation sequence through an interactive form" />
            <p className={s.imgCaption}>Focus order — numbered keyboard sequence through a form</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('handoff-before.png')} filename="axesslab/handoff-before.png" alt="A design screen passed to developers with no accessibility annotations — no ARIA roles, no alt text, no focus order" />
            <p className={s.imgCaption}>Before — no accessibility context in the handoff</p>
          </div>
          <div>
            <CaseImg src={img('handoff-after.png')} filename="axesslab/handoff-after.png" alt="The same screen fully annotated with ARIA roles, alt text, heading levels, and focus order" />
            <p className={s.imgCaption}>After — full accessibility context for developers</p>
          </div>
        </div>
      </div>

      <div className={s.prose}>
        <div className={s.callout}>
          <p className={s.calloutText}>
            "The annotation framework turned accessibility from a checklist at the end into a
            design conversation at the start. Developers actually thanked us for it."
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          WORKSHOPS
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '2rem' }}>
        <section className={s.section} aria-labelledby="workshops-heading">
          <p className={s.sectionEyebrow}>Team Enablement</p>
          <h2 id="workshops-heading" className={s.h2}>WCAG 2.2 workshops with the design team</h2>
          <p className={s.body}>
            Shipping a system is only half the job. I ran a series of WCAG 2.2 workshops built
            around real, everyday decisions rather than abstract compliance theory. We covered
            contrast ratios, semantic HTML, focus states, writing good labels, and how to read
            an audit report.
          </p>
          <p className={s.body}>
            The goal was simple: every designer should be able to catch the most common issues
            on their own, and know when something needs a deeper look from a specialist.
          </p>
        </section>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('workshop-slides.png')} filename="axesslab/workshop-slides.png" alt="Workshop slides showing WCAG 2.2 colour contrast rules explained with visual examples and pass/fail comparisons" />
            <p className={s.imgCaption}>Workshop slides — contrast, focus, labels, ARIA</p>
          </div>
          <div>
            <CaseImg src={img('workshop-session.png')} filename="axesslab/workshop-session.png" alt="Workshop session showing the team reviewing accessibility patterns together" />
            <p className={s.imgCaption}>Workshop session with the AxessLab design team</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RESPONSIVE
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Responsive</p>
          <h2 className={s.h2}>Accessible on every screen size</h2>
          <p className={s.body}>
            All components were mobile-first, not adapted after the fact. Touch targets hit
            the 44×44px minimum. Tap spacing, gesture alternatives, and reflow at 400% zoom
            were all tested — not assumed.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg src={img('mobile-1.png')} filename="axesslab/mobile-1.png" alt="Mobile screen showing navigation and form components at 375px viewport width" />
            <p className={s.imgCaption}>Navigation and form at 375px</p>
          </div>
          <div>
            <CaseImg src={img('mobile-2.png')} filename="axesslab/mobile-2.png" alt="Mobile screen showing card components with 44px touch targets highlighted" />
            <p className={s.imgCaption}>Cards — 44px touch targets</p>
          </div>
          <div>
            <CaseImg src={img('mobile-3.png')} filename="axesslab/mobile-3.png" alt="Mobile screen showing 400 percent zoom reflow — content remains linear with no horizontal scroll" />
            <p className={s.imgCaption}>400 percent zoom reflow — no loss of content</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DOCUMENTATION
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Documentation</p>
          <h2 className={s.h2}>Confluence as the single source of truth</h2>
          <p className={s.body}>
            Every component was documented in Confluence: intended use, keyboard interaction
            spec, ARIA pattern, known assistive technology quirks, and notes for developers.
            Any developer should be able to pick it up and implement a component correctly
            without having to ask anyone.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg src={img('docs-component-page.png')} filename="axesslab/docs-component-page.png" alt="Confluence component documentation page for the button component showing usage guidelines, ARIA roles, and keyboard interactions" />
            <p className={s.imgCaption}>Confluence — component page (Button)</p>
          </div>
          <div>
            <CaseImg src={img('docs-keyboard-table.png')} filename="axesslab/docs-keyboard-table.png" alt="Keyboard interaction specification table showing key, action, and WCAG criterion for a dropdown component" />
            <p className={s.imgCaption}>Keyboard interaction table — dropdown component</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OUTCOMES
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="outcomes-heading">
          <p className={s.sectionEyebrow}>Outcomes</p>
          <h2 id="outcomes-heading" className={s.h2}>What the system made possible</h2>
          <p className={s.body}>
            By the end of the project, the design system was being used on client work and the
            annotation framework had become a standard step in every design review. Teams were
            catching accessibility issues on their own, without needing a specialist in the room.
          </p>

          <div className={s.outcomes} role="list">
            {[
              { num: 'WCAG 2.2',    label: 'AA compliance built into every component from day one' },
              { num: 'EN 301 549',  label: 'European standard met across all deliverables' },
              { num: '3 standards', label: 'WCAG, DIGG and EN 301 549 unified in one token layer' },
              { num: '4+ sessions', label: 'WCAG 2.2 workshops so designers could work independently' },
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

        <section className={s.section} aria-labelledby="reflection-heading">
          <p className={s.sectionEyebrow}>Reflection</p>
          <h2 id="reflection-heading" className={s.h2}>What I took away</h2>
          <p className={s.body}>
            The biggest thing I learned: accessibility is an architecture problem, not a QA
            problem. When compliance is built into the tokens and the component decisions, it
            stops being something you check for and starts being something that just comes
            with the work.
          </p>
          <p className={s.body}>
            Automated tools catch around 30 to 40 percent of WCAG failures. The rest takes
            human judgement: writing labels that actually mean something, getting the reading
            order right, understanding what a real user is experiencing. I used AI tools to
            help with documentation and reporting, but everything was validated manually.
          </p>
          <p className={s.body}>
            What I would do differently: bring developers into the token and annotation decisions
            earlier. The handoff got much better, but building those frameworks together with
            the people implementing them from the start would have saved a lot of back and forth.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOCKUPS — light and dark, landscape, 200% zoom
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Final</p>
          <p className={s.dividerTitle}>The System in Context</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Mockups</p>
          <h2 className={s.h2}>Tested across the scenarios that matter</h2>
          <p className={s.body}>
            Accessibility doesn't stop at contrast ratios and focus rings. The system had to
            hold up in the situations real users actually face: switching between light and dark
            mode, rotating a device, zooming to 200% because the default text is too small.
            Those are the three scenarios I used to validate the final output.
          </p>
        </div>
      </div>

      {/* Light and dark mode */}
      <div className={s.wide}>
        <Img
          src={img('mockup-light-dark.png')}
          filename="axesslab/mockup-light-dark.png"
          alt="AXL design system components shown side by side in light mode and dark mode — all contrast ratios maintained in both themes"
          tall
          caption="Light and dark mode — contrast ratios verified in both themes"
        />
      </div>

      {/* Landscape mode */}
      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <Img
          src={img('mockup-landscape.png')}
          filename="axesslab/mockup-landscape.png"
          alt="AXL components in landscape orientation showing layout reflow and touch target spacing at wider viewport"
          caption="Landscape mode — layout reflow and touch target spacing"
        />
      </div>

      {/* 200% zoom */}
      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <Img
          src={img('mockup-200zoom.png')}
          filename="axesslab/mockup-200zoom.png"
          alt="AXL components at 200 percent browser zoom — text remains readable, layout stays linear, no horizontal scroll"
          caption="200 percent zoom — readable text, linear layout, no horizontal scroll"
        />
      </div>

      {/* ── Next project ── */}
      <CaseStudyNextProject slug={next.slug} title={next.title} />

    </main>
  );
}
