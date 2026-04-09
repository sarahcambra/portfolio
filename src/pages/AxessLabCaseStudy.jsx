import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/CaseStudy.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';
import { csLayout, csTw } from '../utils/siteLayout';

const project = projects.find(p => p.slug === 'axesslab-design-system');
const next = getNextCaseStudy('axesslab-design-system');

function CaseImg({ src, filename, alt, tall, short, className }) {
  const placeholderClass = [
    csTw.placeholder,
    tall  ? csTw.placeholderTall  : '',
    short ? csTw.placeholderShort : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${csTw.img} ${s.img} ${className || ''}`}
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'flex';
        }}
      />
      <div className={placeholderClass} style={{ display: 'none' }} role="img" aria-label={alt}>
        <div className={csTw.placeholderIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <code className={csTw.placeholderFile}>{filename}</code>
        <p className={csTw.placeholderLabel}>{alt}</p>
      </div>
    </>
  );
}

function Img({ src, filename, alt, tall, short, caption, className }) {
  return (
    <div className={[csLayout.imgWrap, className].filter(Boolean).join(' ')}>
      <CaseImg src={src} filename={filename} alt={alt} tall={tall} short={short} />
      {caption && <p className={s.imgCaption}>{caption}</p>}
    </div>
  );
}

export default function AxessLabCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const img = (name) => resolvePublicUrl(`/assets/projects/axesslab/${name}`);

  return (
    <main
      className={`${s.page} ${s.pageThemeAxess}`}
      id="main-content"
      style={project ? { '--case-canvas': project.color } : undefined}
    >

      <CaseStudyBreadcrumb />
      {/* ── Hero + cover + stat bar (max-widths via Tailwind) ── */}
      <header
        className={`${csTw.heroBg} ${csLayout.heroPad} px-4 sm:px-6 lg:px-8 xl:px-10`}
      >
        <div className={csLayout.prose}>
          <p className={s.heroEyebrow}>AxessLab · Sweden · Jan to Jul 2025</p>
          <h1 className={`${s.heroTitle} ${csTw.heroTitle}`}>Accessible<br />Design System</h1>
          <p className={`${csTw.heroSub} max-w-full md:max-w-2xl xl:max-w-3xl`}>
            Building WCAG 2.2 and EN 301 549 compliance directly into every
            component, so accessibility is a default and not an afterthought.
          </p>

          <div className={csTw.tagsRow} role="group" aria-label="Project tags">
            {project.tags.map(tag => (
              <span key={tag} className={csTw.tagPill}>{tag}</span>
            ))}
          </div>

          <p className={s.heroRole}>{project.role}</p>
        </div>
      </header>

      <div className={csLayout.cover}>
        <Img
          src={img('cover.png')}
          filename="axesslab/cover.png"
          alt="AxessLab design system full overview in Figma showing components, tokens, and documentation"
          tall
          caption="Full design system overview in Figma"
        />
      </div>

      <div className={`${csTw.statBar} ${csLayout.statBarPad}`} role="group" aria-label="Project at a glance">
        <div className={csLayout.statBarInner}>
          {[
            { label: 'Timeline', value: 'Jan to Jul 2025' },
            { label: 'Duration', value: '7 months' },
            { label: 'Standard', value: 'WCAG 2.2 AA' },
            { label: 'Regulation', value: 'EN 301 549 · DIGG' },
            { label: 'Tools', value: 'Figma · Axe · Polypane · ARC' },
            { label: 'Docs', value: 'Confluence' },
          ].map(({ label, value }) => (
            <div key={label} className={csTw.statCol}>
              <span className={s.statLabel}>{label}</span>
              <span className={csTw.statVal}>{value}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="context-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Context</p>
          <h2 id="context-heading" className={`${s.h2} ${csTw.h2}`}>Who is AxessLab and why this project?</h2>
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
      <div className={`${csLayout.prose}`}>
        <div className={`${csTw.teamTable} ${csLayout.teamTableMb}`}>
          <div className={`${csLayout.teamRow}`}>
            <span className={csTw.teamKey}>Team</span>
            <span className={csTw.teamVal}>Product Owner, two UX Designers, and me as Accessible Design System Designer</span>
          </div>
          <div className={`${csLayout.teamRow}`}>
            <span className={csTw.teamKey}>My role</span>
            <span className={csTw.teamVal}>Defining and implementing design tokens. Building Figma components with accessible defaults. Designing the annotation kit. Writing design and developer documentation in Confluence.</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RESEARCH PHASE
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 00</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Research and Definition</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Qualitative Research</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Understanding the problem before designing anything</h2>
          <p className={s.body}>
            Before touching Figma, I interviewed an accessibility engineer to understand what
            actually goes wrong when designers hand off screens to developers without accessibility
            context. Three patterns came up every time.
          </p>
        </div>

        <div className={`${csLayout.gridResearch}`} role="list">
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
            <div key={i.title} className={`${s.researchInsightCard} ${csTw.cardLeft}`} role="listitem">
              <h3 className={csTw.insightTitle}>{i.title}</h3>
              <p className={s.insightBody}>{i.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Competitive Benchmarking</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Industry Design Systems</h2>
          <p className={s.body}>
            To build a truly accessible design system for AXL, I benchmarked five established industry design systems: A11y by Adham Dannaway, Flowbite, GitHub’s Primer, Atlassian Design System, and Shopify’s Polaris.
          </p>
          <p className={s.body}>
            The goal was to understand current best practices and, more importantly, identify where accessibility still falls short in tokens, documentation, and component implementation.
          </p>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm} ${csLayout.pb.md}`}>
        <Img
          src={img('benchmarking.png')}
          filename="axesslab/benchmarking.png"
          alt="Competitive benchmarking table comparing five design systems across components, tokens, accessibility documentation and ARIA patterns"
          caption="Benchmark comparison of five leading design systems"
        />
      </div>

      <div className={`${csLayout.prose}`}>
        <h3 className={`${s.h3} ${csTw.h3}`}>Key Takeaways</h3>
        <ul className={csTw.list}>
          <li>Design token naming varies significantly — from simple and human-readable to deeply nested. No single standard exists yet.</li>
          <li>Accessibility documentation exists across all systems, but it is often shallow. Practical ARIA implementation guidance is frequently missing.</li>
          <li>Handling of transparent colours and overlay contrast remains a common gap that affects WCAG compliance.</li>
        </ul>
      </div>



      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>ARIA Pattern Research</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Grounding every component in the WAI-ARIA spec</h2>
          <p className={s.body}>
            I used the{' '}
            <a
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noopener noreferrer"
              className={csTw.link}
            >
              WAI-ARIA Authoring Practices Guide
            </a>
            {' '}as the reference for every interactive component. This determined how roles,
            states, and properties were applied, and what keyboard behaviour each component had
            to support. Not as a checklist but as a starting point for each component conversation.
          </p>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm} ${csLayout.pb.sm}`}>
        <Img
          src={img('aria-patterns.png')}
          filename="axesslab/aria-patterns.png"
          alt="WAI-ARIA Authoring Practices Guide showing keyboard navigation patterns for interactive components"
          caption="WAI-ARIA APG — keyboard and role patterns used as the foundation for each component"
        />
      </div>
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="challenge-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Challenge</p>
          <h2 id="challenge-heading" className={`${s.h2} ${csTw.h2}`}>Three problems sitting underneath one brief</h2>
          <p className={s.body}>
            The brief was focused, but three real problems were sitting underneath it.
            Compliance, usability, and knowledge transfer all had to be solved together.
          </p>

          <div className={`${csLayout.gridChallenge}`} role="list">
            {[
              {
                num: '01',
                title: 'Standards that do not fully align',
                body: 'The system was built on WCAG 2.2 and DIGG. DIGG interprets EN 301 549 clause 11.7, which is part of the European Accessibility Act and the Swedish DOS-law, as requiring components to respect user system settings including dark mode.',
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
              <article key={c.num} className={`${s.challengeCard} ${csTw.cardLeft}`} role="listitem">
                <span className={csTw.challengeNum}>{c.num}</span>
                <h3 className={csTw.challengeTitle}>{c.title}</h3>
                <p className={s.challengeBody}>{c.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          DEFINITION
      ══════════════════════════════════════════════════════ */}
{/* We use csLayout.prose to keep the whole section centered at 1160px */}
<div className={`${csLayout.prose} ${csLayout.pt.section} ${csLayout.pb.xl}`}>
  
  {/* This wrapper creates the 2-column layout on desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* LEFT COLUMN: Text */}
    <section className={csTw.section} aria-labelledby="definition-heading">
      <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Definition</p>
      <h2 id="definition-heading" className={`${s.h2} ${csTw.h2}`}>What the system had to cover</h2>
      <p className={s.body}>
        Before building anything, I mapped out every component the system needed.
        This gave the team a clear scope and stopped the list from growing in random
        directions mid-project. Token decisions came after the component inventory —
        the components drove what tokens were needed, not the other way around.
      </p>
    </section>

    {/* RIGHT COLUMN: Image */}
    <div>
      <CaseImg
        src={img('component-definition.png')}
        filename="axesslab/component-definition.png"
        alt="Component definition table listing all AXL design system components"
        className="rounded-xl shadow-lg"
      />
      <p className={`${s.imgCaption} mt-4`}>
        Component inventory — types, variants, states, modifiers
      </p>
    </div>

  </div>
</div>

      {/* ══════════════════════════════════════════════════════
          DISCOVERY
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 01</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Discovery and Accessibility Audit</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Discovery</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Finding what the tools could not see</h2>
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

      <div className={csLayout.wide}>
        <Img
          src={img('audit-findings.png')}
          filename="axesslab/audit-findings.png"
          alt="Accessibility audit findings spreadsheet showing critical, major, and minor issues categorised by WCAG criterion"
          tall
          caption="Audit findings mapped to WCAG 2.2 criteria — automated and manual combined"
        />
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm}`}>
        <div className={`${csLayout.gridImg2}`}>
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
      <div className={`${csLayout.divider} ${csLayout.dividerMarginTop}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 02</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Token Architecture</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Design Tokens</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Compliance built into the token layer</h2>
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

      <div className={csLayout.wide}>
    

        <div className={csLayout.wide}>
        <Img
          src={img('tokens-overview.png')}
          filename="axesslab/tokens-overview.png"
          alt="Design tokens overview showing colour, typography, spacing, and border radius tokens"
          tall
          caption="Design tokens overview"
        />
      </div>

        <div className={csLayout.gridImg3}>
          <div className="min-w-0">
            <Img
              src={img('tokens-a11y-testing.png')}
              filename="axesslab/tokens-a11y-testing.png"
              alt="Token settings for accessibility testing including zoom and user preferences"
              short
              caption="Tokens for testing user preference settings to 200% zoom"
            />
          </div>
          <div className="min-w-0">
            <Img
              src={img('tokens-typography.png')}
              filename="axesslab/tokens-typography.png"
              alt="Typography tokens for text and headings"
              short
              caption="Styling tokens for text and headings using tokens"
            />
          </div>
          <div className="min-w-0">
            <Img
              src={img('responsive.png')}
              filename="axesslab/responsive.png"
              alt="Responsive breakpoints and spacing tokens"
              short
              caption="Responsive tokens for different screen sizes"
            />
          </div>
        </div>
      </div>



      {/* ══════════════════════════════════════════════════════
          COMPONENT LIBRARY
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 03</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Component Library</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Components</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Every state. Every variant. Every pattern.</h2>
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


      

      <div className={`${csLayout.wide} ${csLayout.pt.sm}`}>
        <div className={`${csLayout.gridImg2}`}>
          <div>
            <CaseImg src={img('components-buttons.png')} filename="axesslab/components-buttons.png" alt="Button component showing all variants: primary, secondary, ghost, danger with default, hover, focus, active, and disabled states" />
            <p className={s.imgCaption}>Button variants — all states documented</p>
          </div>
          <div>
            <CaseImg src={img('components-forms.png')} filename="axesslab/components-forms.png" alt="Form components including text input, textarea, select, checkbox, and radio with error and disabled states" />
            <p className={s.imgCaption}>Tags component - 2 sizes and variants</p>
          </div>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm}`}>
        <div className={`${csLayout.gridImg3}`}>
          <div>
            <CaseImg src={img('components-navigation.png')} filename="axesslab/components-navigation.png" alt="Navigation patterns including header, tabs, breadcrumbs, and skip links" short />
            <p className={s.imgCaption}>Compoenents to cover many other compoenet constructions comabining with tag components</p>
          </div>
          <div>
            <CaseImg src={img('components-modals.png')} filename="axesslab/components-modals.png" alt="Modal and dialog components with focus trap indicators and ARIA annotations" short />
            <p className={s.imgCaption}>Button anatomy - target size compliance</p>
          </div>
          <div>
            <CaseImg src={img('components-icons.png')} filename="axesslab/components-icons.png" alt="Icon library showing decorative vs informational usage with aria-hidden and label guidance" short />
            <p className={s.imgCaption}>Tooltips component - Important for accessibility feedback</p>
          </div>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm} ${csLayout.pb.sm}`}>
        <Img
          src={img('focus-styles.png')}
          filename="axesslab/focus-styles.png"
          alt="Focus style documentation showing 3px outline with 3 to 1 contrast ratio applied consistently across button, link, input, and card components"
          caption="Alert component - Important for accessibility feedback and dark mode can  be simply handled with tokens"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          ANNOTATION FRAMEWORK
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 04</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Annotation Framework and Handoff</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Handoff</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Making accessibility visible before development starts</h2>
          <p className={s.body}>
            The annotation framework turned out to be the most useful thing I delivered.
            Designers could apply it to any screen before sending it to development, making
            every accessibility decision visible and reviewable before a line of code was written.
          </p>
          <p className={s.body}>The framework covered four things:</p>
          <ul className={csTw.list}>
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

      <div className={csLayout.wide}>
        <Img
          src={img('annotation-screen.png')}
          filename="axesslab/annotation-screen.png"
          alt="Figma screen annotated with heading hierarchy, focus order numbers, ARIA role labels, and image alt text applied to a real product page"
          tall
          caption="Annotation framework applied to a real product screen before developer handoff"
        />
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.sm}`}>
        <div className={`${csLayout.gridImg2}`}>
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

      <div className={`${csLayout.wide} ${csLayout.pt.sm} ${csLayout.pb.sm}`}>
        <div className={`${csLayout.gridImg2}`}>
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

      <div className={`${csLayout.prose}`}>
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
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="workshops-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Team Enablement</p>
          <h2 id="workshops-heading" className={`${s.h2} ${csTw.h2}`}>WCAG 2.2 workshops with the design team</h2>
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

      <div className={csLayout.wide}>
        <div className={`${csLayout.gridImg2}`}>
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
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Responsive</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Accessible on every screen size</h2>
          <p className={s.body}>
            All components were mobile-first, not adapted after the fact. Touch targets hit
            the 44×44px minimum. Tap spacing, gesture alternatives, and reflow at 400% zoom
            were all tested — not assumed.
          </p>
        </div>
      </div>

      <div className={csLayout.wide}>
        <div className={`${csLayout.gridImg3}`}>
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
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Documentation</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Confluence as the single source of truth</h2>
          <p className={s.body}>
            Every component was documented in Confluence: intended use, keyboard interaction
            spec, ARIA pattern, known assistive technology quirks, and notes for developers.
            Any developer should be able to pick it up and implement a component correctly
            without having to ask anyone.
          </p>
        </div>
      </div>

      <div className={csLayout.wide}>
        <div className={`${csLayout.gridImg2}`}>
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
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="outcomes-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Outcomes</p>
          <h2 id="outcomes-heading" className={`${s.h2} ${csTw.h2}`}>What the system made possible</h2>
          <p className={s.body}>
            By the end of the project, the design system was being used on client work and the
            annotation framework had become a standard step in every design review. Teams were
            catching accessibility issues on their own, without needing a specialist in the room.
          </p>

          <div className={`${csLayout.gridOutcomes}`} role="list">
            {[
              { num: 'WCAG 2.2',    label: 'AA compliance built into every component from day one' },
              { num: 'EN 301 549',  label: 'European standard met across all deliverables' },
              { num: '3 standards', label: 'WCAG, DIGG and EN 301 549 unified in one token layer' },
              { num: '4+ sessions', label: 'WCAG 2.2 workshops so designers could work independently' },
              { num: 'Zero',        label: 'Critical contrast failures in the delivered library' },
              { num: '100%',        label: 'Components with keyboard spec and ARIA documentation' },
            ].map(o => (
              <div key={o.num} className={csTw.outcomeStat} role="listitem">
                <span className={csTw.outcomeNum}>{o.num}</span>
                <span className={s.outcomeLabel}>{o.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={csTw.section} aria-labelledby="reflection-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Reflection</p>
          <h2 id="reflection-heading" className={`${s.h2} ${csTw.h2}`}>What I took away</h2>
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
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Final</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>The System in Context</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Mockups</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Tested across the scenarios that matter</h2>
          <p className={s.body}>
            Accessibility doesn't stop at contrast ratios and focus rings. The system had to
            hold up in the situations real users actually face: switching between light and dark
            mode, rotating a device, zooming to 200% because the default text is too small.
            Those are the three scenarios I used to validate the final output.
          </p>
        </div>
      </div>

      {/* Light and dark mode */}
      <div className={csLayout.wide}>
        <Img
          src={img('mockup-light-dark.png')}
          filename="axesslab/mockup-light-dark.png"
          alt="AXL design system components shown side by side in light mode and dark mode — all contrast ratios maintained in both themes"
          tall
          caption="Light and dark mode — contrast ratios verified in both themes"
        />
      </div>

      {/* Landscape mode */}
      <div className={`${csLayout.wide} ${csLayout.pt.sm}`}>
        <Img
          src={img('mockup-landscape.png')}
          filename="axesslab/mockup-landscape.png"
          alt="AXL components in landscape orientation showing layout reflow and touch target spacing at wider viewport"
          caption="Landscape mode — layout reflow and touch target spacing"
        />
      </div>

      {/* 200% zoom */}
      <div className={`${csLayout.wide} ${csLayout.pt.sm} ${csLayout.pb.xl}`}>
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
