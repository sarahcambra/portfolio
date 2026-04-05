import { useEffect } from 'react';
import s from '../styles/AxlCaseStudyV2.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';

const next = getNextCaseStudy('axl-v2');

/* ─── Figma-hosted assets (valid for ~7 days from generation) ───
   Replace with local /public/assets/projects/axl/ paths for production.
   ─────────────────────────────────────────────────────────────── */
const HERO_IMG         = 'https://www.figma.com/api/mcp/asset/ea1c9927-f074-410c-babb-2ba564c44cdc';
const INTERVIEW_IMG    = 'https://www.figma.com/api/mcp/asset/1f5a2953-68da-47f2-b914-30481b793d62';
const BENCHMARKING_IMG = 'https://www.figma.com/api/mcp/asset/3a8463e1-7ad3-49ce-9cc4-950f89bb0318';
const ARIA_IMG         = 'https://www.figma.com/api/mcp/asset/99a20a7e-41f2-4cc4-ad98-19f2f62dc1fd';
const COMP_DEF_IMG     = 'https://www.figma.com/api/mcp/asset/671aab1c-86e3-4189-a7ea-c199a1282e82';
const TYPOGRAPHY_IMG   = 'https://www.figma.com/api/mcp/asset/b33521bd-b132-4a63-a9d1-4ba924b0b245';
const COLOR_IMG        = 'https://www.figma.com/api/mcp/asset/12e83ee3-0944-4ba7-b045-11b1409b0d15';
const BUTTONS_IMG      = 'https://www.figma.com/api/mcp/asset/f69ffebc-f817-4dfb-96d4-fbe21e07e7e0';
const MOCKUP_1         = 'https://www.figma.com/api/mcp/asset/2b213f11-1d90-42cc-9868-35c3ac44fbc9';
const MOCKUP_2         = 'https://www.figma.com/api/mcp/asset/f5601e14-225b-4fc2-b80b-93c3fdcaf722';

export default function AxlCaseStudyV2() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className={s.page} id="main-content">

      <CaseStudyBreadcrumb />

      {/* ══════════════════════════════════════════════════════
          HERO — full-width image with title overlay
      ══════════════════════════════════════════════════════ */}
      <div className={s.heroWrap}>
        <img
          src={HERO_IMG}
          alt="AXL Design System — overview showing color tokens, typography, buttons, icons, label block and dark/light modes across six Figma frames"
          className={s.heroImg}
        />
        <div className={s.heroOverlay}>
          <h1 className={s.heroTitle}>Designing AXL</h1>
          <p className={s.heroSub}>An Accessibility-Focused Design System</p>
          <span className={s.heroLogo} aria-label="AxessLab">✕ axess lab</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          META CARDS — project at a glance
      ══════════════════════════════════════════════════════ */}
      <div className={s.metaStrip} role="group" aria-label="Project at a glance">
        <div className={s.metaInner}>
          {[
            { label: 'SERVICES',  value: 'Design System Designer' },
            { label: 'PLATFORM',  value: 'Mobile and Desktop' },
            { label: 'DURATION',  value: '6 Months' },
            { label: 'WEBSITE',   value: 'axesslab.com' },
          ].map(({ label, value }) => (
            <div key={label} className={s.metaCard}>
              <span className={s.metaLabel}>{label}</span>
              <span className={s.metaValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CONCEPT AND DESIGN
      ══════════════════════════════════════════════════════ */}
      <section className={s.section} aria-labelledby="concept-heading">
        <div className={s.sectionInner}>
          <div className={s.sideLabel}>
            <h2 id="concept-heading" className={s.sideLabelText}>Concept and Design</h2>
          </div>

          <div className={s.cardStack}>
            {/* Project Overview */}
            <article className={s.card}>
              <h3 className={s.cardHeading}>Project Overview</h3>
              <p className={s.cardBody}>
                AxessLab, an accessibility agency recognised a growing need for businesses to
                integrate accessibility into their design systems proactively. With the European
                Accessibility Act pushing companies toward stricter compliance, we set out to
                create AXL, a comprehensive accessibility design system that promotes inclusive
                design from the ground up.
              </p>
              <p className={s.cardBody}>The system included:</p>
              <ul className={s.cardList}>
                <li>Accessible components built in Figma</li>
                <li>Detailed documentation for designers &amp; developers</li>
                <li>Support for dark/light themes, zoom scaling, and assistive tech</li>
                <li>An accessibility annotation kit to support clear communication</li>
              </ul>
            </article>

            {/* The Challenge */}
            <article className={s.card}>
              <h3 className={s.cardHeading}>The Challenge</h3>
              <p className={s.cardBody}>
                The biggest challenge was changing how accessibility was approached. Many
                companies focused on compliance only after launch, which led to rushed fixes
                and usability problems. Our goal was to design a system that made WCAG 2.2
                compliance a natural part of the workflow, not an afterthought.
              </p>
              <p className={s.cardBody}>
                Another key challenge was making sure that engineers had the right guidance
                to implement designs without losing accessibility.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEAM / ROLE / TOOLS TABLE
      ══════════════════════════════════════════════════════ */}
      <div className={s.tableWrap}>
        <div className={s.tableCard}>
          <dl className={s.table}>
            <div className={s.tableRow}>
              <dt className={s.tableKey}>Team</dt>
              <dd className={s.tableVal}>
                Product Owner, two UX Designers, and an Accessible Design System Designer
              </dd>
            </div>
            <div className={s.tableRow}>
              <dt className={s.tableKey}>My Role</dt>
              <dd className={s.tableVal}>
                <ul className={s.tableList}>
                  <li>Defining and implementing design tokens.</li>
                  <li>Creating Figma components with accessible defaults.</li>
                  <li>Creating accessible annotation designs and documentation.</li>
                  <li>
                    Creating design-facing and developer-facing documentation in Confluence,
                    ensuring all accessibility details are clearly outlined.
                  </li>
                </ul>
              </dd>
            </div>
            <div className={s.tableRow}>
              <dt className={s.tableKey}>Tools</dt>
              <dd className={s.tableVal}>Figma, Confluence and CodePen.</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RESEARCH AND DEFINITION
      ══════════════════════════════════════════════════════ */}
      <section className={s.researchSection} aria-labelledby="research-heading">
        <div className={s.researchHeader}>
          <h2 id="research-heading" className={s.researchTitle}>Research and Definition</h2>
          <p className={s.researchSubtitle}>
            To ensure consistency across all UI components, I built a strong foundation
            with core design elements.
          </p>
        </div>

        {/* Qualitative Research */}
        <div className={s.researchCard}>
          <div className={s.researchCardHeader}>
            <h3 className={s.researchCardTitle}>Qualitative Research</h3>
            <h4 className={s.researchCardSubtitle}>Understanding Accessibility Challenges</h4>
            <p className={s.researchCardBody}>
              To ensure AXL truly met the needs of developers and designers, I conducted an
              interview with an accessibility engineer. The goal was to understand the technical
              requirements, common accessibility pitfalls, and expectations for integrating
              accessibility into development workflows.
            </p>
          </div>
          <div className={s.researchCardContent}>
            <div className={s.insightsBlock}>
              <h4 className={s.insightsHeading}>Key Insights</h4>
              <ul className={s.insightsList}>
                <li>
                  <strong>Handoff Gaps:</strong> Incomplete details on focus order, alternative
                  text, and component behavior (e.g., error handling) lead to inconsistent
                  accessibility implementation.
                </li>
                <li>
                  <strong>Unclear Landmarks &amp; Roles:</strong> Without clear guidance on
                  regions, decorative images, roles, developers rely on assumptions, risking errors.
                </li>
                <li>
                  <strong>Designer Technical Gaps:</strong> Misuse of ARIA roles, keyboard
                  navigation, and error states complicates accessibility, highlighting the need
                  for stronger technical awareness among designers.
                </li>
              </ul>
            </div>
            <div className={s.researchImgWrap}>
              <img
                src={INTERVIEW_IMG}
                alt="Interview notes on accessibility annotations and labelling practices"
                className={s.researchImg}
              />
            </div>
          </div>
        </div>

        {/* Competitive Benchmarking */}
        <div className={s.researchCard}>
          <div className={s.researchCardHeader}>
            <h3 className={s.researchCardTitle}>Competitive Benchmarking</h3>
            <h4 className={s.researchCardSubtitle}>5 industry-leading design systems to identify:</h4>
            <ul className={s.researchCardList}>
              <li>Frequently used components and interaction patterns</li>
              <li>Design token naming conventions</li>
              <li>Accessibility documentation approaches</li>
              <li>ARIA pattern usage (e.g., how modals, toggles, and tabs were structured)</li>
            </ul>
            <p className={s.researchCardBody}>
              Systems analyzed included Material, Carbon, Spectrum, and others.
            </p>
          </div>
          <div className={s.researchImgWrap}>
            <img
              src={BENCHMARKING_IMG}
              alt="Competitive benchmarking table comparing 5 design systems across components, tokens, accessibility documentation and ARIA patterns"
              className={s.researchImg}
            />
          </div>
        </div>

        {/* ARIA Pattern Research */}
        <div className={s.researchCard}>
          <div className={s.researchCardHeader}>
            <h3 className={s.researchCardTitle}>ARIA Pattern Research</h3>
            <p className={s.researchCardBody}>
              To ensure AXL's components followed best practices, I studied the{' '}
              <a
                href="https://www.w3.org/WAI/ARIA/apg/"
                target="_blank"
                rel="noopener noreferrer"
                className={s.link}
              >
                WAI-ARIA Authoring Practices Guide (APG)
              </a>
              . This guide helped me understand how to:
            </p>
            <ul className={s.researchCardList}>
              <li>Apply accessibility semantics to components</li>
              <li>Structure roles, states, and properties</li>
              <li>Define expected keyboard behaviors</li>
            </ul>
          </div>
          <div className={s.researchImgWrap}>
            <img
              src={ARIA_IMG}
              alt="WAI-ARIA Authoring Practices Guide — auto-rotating image carousel example with keyboard navigation pattern"
              className={s.researchImg}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DEFINITION — tokens, typography, color, metrics
      ══════════════════════════════════════════════════════ */}
      <section className={s.definitionSection} aria-labelledby="definition-heading">
        <div className={s.definitionHeader}>
          <h2 id="definition-heading" className={s.researchTitle}>Definition</h2>
          <p className={s.researchSubtitle}>
            This section establishes the structural foundation of the design system, ensuring
            consistency and scalability across components.
          </p>
        </div>

        <div className={s.definitionGrid}>
          <div className={s.definitionItem}>
            <h3 className={s.definitionItemTitle}>Component Definition</h3>
            <img
              src={COMP_DEF_IMG}
              alt="Component definition table listing all AXL design system components with their types, sub-variants, states and modifiers"
              className={s.definitionImg}
            />
          </div>
          <div className={s.definitionItem}>
            <h3 className={s.definitionItemTitle}>Typography &amp; Color System</h3>
            <img
              src={TYPOGRAPHY_IMG}
              alt="Typography scale showing heading and body text styles across desktop and mobile sizes"
              className={s.definitionImg}
            />
          </div>
          <div className={s.definitionItem}>
            <h3 className={s.definitionItemTitle}>Metrics, Layout &amp; Shadow Tokens</h3>
            <img
              src={COLOR_IMG}
              alt="Color system, spacing metrics, layout grid breakpoints, and shadow/elevation tokens including light and dark mode"
              className={s.definitionImg}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BUILT COMPONENTS
      ══════════════════════════════════════════════════════ */}
      <section className={s.componentsSection} aria-labelledby="components-heading">
        <div className={s.researchHeader}>
          <h2 id="components-heading" className={s.researchTitle}>Built Components</h2>
          <p className={s.researchSubtitle}>
            This section documents the finalized UI components, ensuring consistency,
            accessibility, and scalability.
          </p>
        </div>

        {/* Iconography */}
        <div className={s.componentCard}>
          <div className={s.componentCardHeader}>
            <h3 className={s.researchCardTitle}>Iconography</h3>
            <p className={s.researchCardBody}>
              The icon set is drawn from Feather Icons — a consistent, stroke-based library
              covering 200+ icons across navigation, actions, media, and status. Every icon is
              sized at 20 × 20 px to ensure clarity and visual balance across the system.
            </p>
          </div>
          <div className={s.iconGridNote}>
            <p className={s.iconGridLabel}>200+ accessible icons · Feather Icons · 20 × 20 px</p>
          </div>
        </div>

        {/* Buttons */}
        <div className={s.componentCard}>
          <div className={s.componentCardHeader}>
            <h3 className={s.researchCardTitle}>Buttons</h3>
            <p className={s.researchCardBody}>
              The AXL design system features a versatile button collection, including sizes Small,
              Medium, and Large, with options for Primary, Secondary, and Outline styles. Each
              button is designed with intuitive icons to enhance user interaction, ensuring
              clarity and accessibility in every click.
            </p>
          </div>
          <div className={s.componentImgWrap}>
            <img
              src={BUTTONS_IMG}
              alt="Button component states table showing Large button types — Primary, Outline, Underline, Secondary, Error, Info, Warning and Success — across Default, Hover, Focus, Pressed and Disabled states"
              className={s.componentImg}
            />
          </div>
        </div>

        {/* Label Block */}
        <div className={s.componentCard}>
          <div className={s.componentCardHeader}>
            <h3 className={s.researchCardTitle}>Label Block</h3>
            <p className={s.researchCardBody}>
              The Label Block component is a versatile, modular UI element designed to annotate,
              label, or highlight content across various contexts, including form controls
              (e.g., checkboxes, radio buttons, switches), alerts (e.g., success, warning, error),
              headers, and accordions. It features a flexible structure with swappable leading and
              trailing icons, customizable description and helper text, and boolean toggles for
              optional/mandatory indicators. Built with auto-layout for consistent alignment.
            </p>
          </div>
          <div className={s.labelBlockGrid}>
            <div className={s.labelBlockGroup}>
              <p className={s.labelGroupTitle}>Checkboxes</p>
              <div className={s.labelRow}><span className={s.checkboxBox} />Unchecked</div>
              <div className={s.labelRow}><span className={s.checkboxChecked} />Checked</div>
              <div className={s.labelRow}><span className={s.checkboxIndeterminate} />Indeterminate</div>
            </div>
            <div className={s.labelBlockGroup}>
              <p className={s.labelGroupTitle}>Radio Buttons</p>
              <div className={s.labelRow}><span className={s.radioEmpty} />Unselected</div>
              <div className={s.labelRow}><span className={s.radioSelected} />Selected</div>
            </div>
            <div className={s.labelBlockGroup}>
              <p className={s.labelGroupTitle}>Toggles</p>
              <div className={s.labelRow}><span className={s.toggleOff} />Off</div>
              <div className={s.labelRow}><span className={s.toggleOn} />On</div>
            </div>
            <div className={s.labelBlockGroup}>
              <p className={s.labelGroupTitle}>Alert Tags</p>
              <div className={s.labelRow}><span className={`${s.tag} ${s.tagError}`}>✕</span>Error</div>
              <div className={s.labelRow}><span className={`${s.tag} ${s.tagInfo}`}>i</span>Info</div>
              <div className={s.labelRow}><span className={`${s.tag} ${s.tagSuccess}`}>✓</span>Success</div>
              <div className={s.labelRow}><span className={`${s.tag} ${s.tagWarning}`}>!</span>Warning</div>
            </div>
          </div>
        </div>

        {/* Visual Mockups */}
        <div className={s.componentCard}>
          <div className={s.componentCardHeader}>
            <h3 className={s.researchCardTitle}>Visual Mockups</h3>
            <p className={s.researchCardBody}>
              High-fidelity mockups showcasing the AXL system applied to real-world contexts,
              including assistive technology use cases and responsive UI compositions.
            </p>
          </div>
          <div className={s.mockupGrid}>
            <img
              src={MOCKUP_1}
              alt="Group of individuals of different abilities using various assistive devices in a modern workspace"
              className={s.mockupImg}
            />
            <img
              src={MOCKUP_2}
              alt="Visually impaired person using a smartphone with a screen reader in a cosy living room"
              className={s.mockupImg}
            />
          </div>
        </div>
      </section>

      <CaseStudyNextProject slug={next.slug} title={next.title} />

    </main>
  );
}
