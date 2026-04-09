import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/CaseStudy.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';
import { csLayout, csTw } from '../utils/siteLayout';

const project = projects.find(p => p.slug === 'intelligyn-redesign');
const next = getNextCaseStudy('intelligyn-redesign');

/* ── Image helpers ── */
function CaseImg({ src, filename, alt, tall, short, className }) {
  const placeholderClass = [
    csTw.placeholder,
    tall ? csTw.placeholderTall : '',
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

function Img({ src, filename, alt, tall, caption }) {
  return (
    <div className={csLayout.imgWrap}>
      <CaseImg src={src} filename={filename} alt={alt} tall={tall} />
      {caption && <p className={s.imgCaption}>{caption}</p>}
    </div>
  );
}

export default function IntelligynCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const img = (name) => resolvePublicUrl(`/assets/projects/intelligyn/${name}`);

  return (
    <main
      className={`${s.page} ${s.pageThemeIntelligyn}`}
      id="main-content"
      style={project ? { '--case-canvas': project.color } : undefined}
    >

      <CaseStudyBreadcrumb />

      <header className={`${csTw.heroBg} ${csLayout.heroPad} px-4 sm:px-6 lg:px-8 xl:px-10`}>
        <div className={csLayout.prose}>
          <p className={s.heroEyebrow}>Intelligyn · Health-Tech · 2024</p>
          <h1 className={`${s.heroTitle} ${csTw.heroTitle}`}>UX Audit &<br />Website Redesign</h1>
          <p className={`${csTw.heroSub} max-w-full md:max-w-2xl xl:max-w-3xl`}>
            A high bounce rate and zero investor traction on a medical AI product.
            The problem wasn&apos;t the technology — it was how the website talked about it.
          </p>
          <div className={csTw.tagsRow} role="group" aria-label="Project tags">
            {project.tags.map(tag => <span key={tag} className={csTw.tagPill}>{tag}</span>)}
          </div>
          <p className={s.heroRole}>{project.role}</p>
        </div>
      </header>

      <div className={csLayout.cover}>
        <Img
          src={img('cover.png')}
          filename="intelligyn/cover.png"
          alt="Intelligyn website redesign showing before and after states with improved information architecture and visual hierarchy"
          tall
          caption="Before and after — information architecture and visual redesign"
        />
      </div>

      <div className={`${csTw.statBar} ${csLayout.statBarPad}`} role="group" aria-label="Project at a glance">
        <div className={csLayout.statBarInner}>
          {[
            { label: 'Client',   value: 'Intelligyn (IntelligyAI)' },
            { label: 'Year',     value: '2024' },
            { label: 'My Role',  value: 'Product Designer (Contract)' },
            { label: 'Tools',    value: 'Figma · Miro · Optimal Workshop · Squarespace' },
            { label: 'Website',  value: 'intelligyn.com' },
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
          <h2 id="context-heading" className={`${s.h2} ${csTw.h2}`}>A medical AI product nobody could understand</h2>
          <p className={s.body}>
            Intelligyn (then IntelligyAI) built an AI-powered clinical decision support
            tool to help gynaecologists classify ovarian tumours from ultrasound imaging.
            The technology was real and it was solving a genuine clinical problem — but
            their website was losing people in seconds.
          </p>
          <p className={s.body}>
            High bounce rate. No investor enquiries. Clinicians landing on the site and
            leaving without understanding what the product did. They needed someone to
            figure out why — and fix it before the next funding round.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          CHALLENGE
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="challenge-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Challenge</p>
          <h2 id="challenge-heading" className={`${s.h2} ${csTw.h2}`}>Three problems underneath one brief</h2>
          <p className={s.body}>
            The brief was simple: fix the website. But three distinct problems were
            causing the failure, and they needed different solutions.
          </p>
        </section>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pb.lg}`}>
        <div className={`${csLayout.gridChallenge}`} role="list">
          {[
            {
              num: '01',
              title: 'The palette was working against trust',
              body: 'Medical AI needs to establish credibility immediately. The dark, high-contrast colour scheme read as aggressive tech — the opposite of what clinicians and investors needed to feel.',
            },
            {
              num: '02',
              title: 'Nobody knew who was doing the work',
              body: "The phrase 'AI-powered decision support' was ambiguous about the AI's role. In a clinical context, that ambiguity matters. Clinicians needed to see themselves as the primary actor, not the software.",
            },
            {
              num: '03',
              title: 'Investors had no path to follow',
              body: 'There was no investor-facing section, no credibility signals, and no clear route to get in touch. The site was built for general audiences but the most valuable visitor had nothing to read.',
            },
          ].map(c => (
            <article key={c.num} className={`${s.challengeCard} ${csTw.cardLeft}`} role="listitem">
              <span className={csTw.challengeNum}>{c.num}</span>
              <h3 className={csTw.challengeTitle}>{c.title}</h3>
              <p className={s.challengeBody}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 01 — DISCOVERY
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 01</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Competitor Analysis and User Research</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Discovery</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Mapping 12 competitors to understand the baseline</h2>
          <p className={s.body}>
            Before talking to users, I audited 12 health-tech competitor websites.
            Not to replicate the better ones — to understand what the category was
            doing wrong and where Intelligyn could position itself differently.
          </p>
          <ul className={csTw.list}>
            <li className={s.listItem}><strong>Navigation and UX</strong> — How quickly could a first-time visitor understand the product?</li>
            <li className={s.listItem}><strong>Colour and visual tone</strong> — Did the palette align with medical trust expectations?</li>
            <li className={s.listItem}><strong>Value proposition clarity</strong> — Could a non-clinical investor understand the problem being solved?</li>
            <li className={s.listItem}><strong>Investor signals</strong> — Was there evidence, credibility, or a clear path to engage?</li>
            <li className={s.listItem}><strong>Accessibility</strong> — Were any WCAG standards being met?</li>
          </ul>
        </div>
      </div>

      <div className={csLayout.wide}>
        <Img
          src={img('benchmarking.png')}
          filename="intelligyn/benchmarking.png"
          alt="Competitive analysis table comparing 12 health-tech websites across navigation, colour palette, value proposition, investor signals, and accessibility"
          tall
          caption="Competitor analysis — 12 health-tech products across UX, trust, and investor clarity"
        />
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Key Findings</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>What the market was getting wrong</h2>
          <p className={s.body}>
            The patterns were consistent across almost every competitor.
          </p>
          <ul className={csTw.list}>
            <li className={s.listItem}>Navigation was unintuitive and layouts were dense — losing users before they reached anything meaningful</li>
            <li className={s.listItem}>Dark, high-contrast palettes dominated the category, creating clinical distance rather than clinical trust</li>
            <li className={s.listItem}>Text-heavy content with no visual hierarchy made key information invisible</li>
            <li className={s.listItem}>No calls-to-action for investors — a critical miss for early-stage products seeking funding</li>
            <li className={s.listItem}>Insufficient evidence of product efficacy — no clinical citations, no pilot results</li>
            <li className={s.listItem}>Accessibility was almost entirely absent across the field</li>
          </ul>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>User Interviews</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Eight people, three completely different mental models</h2>
          <p className={s.body}>
            I ran interviews with 8 participants across the people who actually matter
            to this product: 2 investors, 2 healthcare professionals, 3 health-tech
            experts, and 1 UX writer specialising in healthcare.
          </p>
          <p className={s.body}>
            Each group had different vocabulary, different trust signals, and different
            reasons for leaving a page. I designed the interview guide to surface all
            three simultaneously.
          </p>
        </div>
      </div>

      <div className={csLayout.wide}>
        <Img
          src={img('interview-notes.png')}
          filename="intelligyn/interview-notes.png"
          alt="User interview notes showing synthesised themes around trust, product comprehension, and investor credibility signals"
          caption="Interview synthesis — trust signals, comprehension, and investor expectations"
        />
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Insights</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>What they actually said</h2>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pb.lg}`}>
        <div className={`${csLayout.gridInsight}`} role="list">
          {[
            {
              num: '01',
              label: "The dark palette read as a tech startup, not a medical tool. Every healthcare professional expected lighter, calmer tones — the kind that communicate safety, not disruption.",
            },
            {
              num: '02',
              label: "Nobody could explain what the product actually did. 'AI-powered decision support' implied the AI was making the call. In a gynaecological context, that's a red flag for clinicians.",
            },
            {
              num: '03',
              label: "Investors cared about two things: whether the founders understood the clinical domain, and whether there was early evidence the product worked. The site showed neither.",
            },
          ].map(i => (
            <article key={i.num} className={csTw.insightStat} role="listitem">
              <span className={csTw.insightNum}>{i.num}</span>
              <p className={csTw.insightLabel}>{i.label}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 02 — INFORMATION ARCHITECTURE
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 02</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Tree Testing and Information Architecture</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Tree Testing</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>95 participants to validate the new structure</h2>
          <p className={s.body}>
            I drafted a new site map based on the competitor analysis and interview
            findings, then validated it with tree testing through Optimal Workshop
            before a single wireframe was drawn. 95 participants. 45 completed tasks.
            67% success rate — a meaningful improvement over the original, where
            key pages were essentially unfindable.
          </p>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pb.sm}`}>
        <div className={`${csLayout.gridStatRow}`} role="list">
          {[
            { num: '95',  label: 'Participants in tree testing via Optimal Workshop' },
            { num: '67%', label: 'Task success rate on the new information architecture' },
            { num: '149s',label: "Maximum time taken to find 'Invest in Us' — confirmed it needed a dedicated route" },
          ].map(s2 => (
            <div key={s2.num} className={csTw.statCard} role="listitem">
              <span className={csTw.statCardNum}>{s2.num}</span>
              <span className={s.body}>{s2.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <p className={s.body}>
          Three findings shaped the final IA directly:
        </p>
        <ul className={csTw.list}>
          <li className={s.listItem}>31% of participants looked for training content inside the product page — so a training section was added there, not separately</li>
          <li className={s.listItem}>23% looked for research in the About Us section — so research citations were promoted to that level</li>
          <li className={s.listItem}>Finding "Invest in Us" took up to 149 seconds — a dedicated investor section was added to the primary navigation</li>
        </ul>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pt.spacing1}`}>
        <div className={`${csLayout.gridImg2}`}>
          <div>
            <CaseImg
              src={img('sitemap-old.png')}
              filename="intelligyn/sitemap-old.png"
              alt="Original Intelligyn site map showing flat, undifferentiated structure with no investor path"
            />
            <p className={s.imgCaption}>Original structure — no investor path, research buried</p>
          </div>
          <div>
            <CaseImg
              src={img('sitemap-new.png')}
              filename="intelligyn/sitemap-new.png"
              alt="New site map with dedicated investor section, promoted research, and training integrated into product page"
            />
            <p className={s.imgCaption}>New structure — validated by tree testing</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 03 — DESIGN AND DELIVERY
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.divider}`} aria-hidden="true">
        <div className={`${csLayout.dividerInner}`}>
          <p className={`${s.dividerLabel} ${csTw.dividerLabel}`}>Phase 03</p>
          <p className={`${s.dividerTitle} ${csTw.dividerTitle}`}>Copy, Design, and Delivery</p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Copy Testing</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>The AI-as-doctor problem</h2>
          <p className={s.body}>
            I used the highlighter method with 11 users to test three versions of
            homepage copy — green for positive, red for confusing or off-putting.
            Two findings were critical.
          </p>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pb.sm}`}>
        <div className={csTw.calloutBanner}>
          <p className={csTw.calloutBannerText}>
            "AI-powered decision support" was being read as AI making the clinical
            decision. In a tool used by gynaecologists to classify tumours, that framing
            actively undermined trust. The AI had to be positioned as the assistant,
            not the clinician.
          </p>
        </div>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <p className={s.body}>
          The second finding: the word "ovarian" confused non-clinical users but
          couldn't be removed for clinical accuracy. The fix was supporting imagery
          — showing an ultrasound context immediately made the word land correctly.
        </p>
        <p className={s.body}>
          These findings changed the copy direction entirely. The revised messaging
          centred the physician: the AI was a tool in their hands, not a replacement
          for their judgment.
        </p>
      </div>

      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <div className={csTw.sectionSm}>
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Design Decisions</p>
          <h2 className={`${s.h2} ${csTw.h2}`}>Six things the research told me to change</h2>
        </div>
      </div>

      <div className={`${csLayout.wide} ${csLayout.pb.lg}`}>
        <div className={csTw.findingsList}>
          {[
            { num: 'D1', text: 'Shift from dark to light backgrounds. Reduce contrast aggression. Lighter backgrounds test 40% higher for trust in healthcare contexts.' },
            { num: 'D2', text: "Rewrite all copy so the physician is the subject, not the AI. 'Supports your clinical judgment' rather than 'AI-powered diagnosis'." },
            { num: 'D3', text: 'Add a dedicated Invest in Us section to primary navigation, with founder credentials and early clinical evidence above the fold.' },
            { num: 'D4', text: 'Promote research citations to the About Us level — where 23% of participants instinctively looked for them.' },
            { num: 'D5', text: 'Add supporting imagery of clinical context (ultrasound, consultation) wherever medical terminology is used.' },
            { num: 'D6', text: 'Implement proper heading hierarchy (H1 → H3), meta descriptions, and keyword targeting for "ovarian cancer diagnosis" and "clinical decision support".' },
          ].map(f => (
            <div key={f.num} className={csTw.findingRow}>
              <span className={csTw.findingNum}>{f.num}</span>
              <p className={`${s.body} m-0`}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={csLayout.wide}>
        <div className={`${csLayout.gridImg2}`}>
          <div>
            <CaseImg
              src={img('wireframes.png')}
              filename="intelligyn/wireframes.png"
              alt="Low-fidelity wireframes for the Intelligyn homepage, product page, and investor section with new information architecture applied"
            />
            <p className={s.imgCaption}>Low-fidelity wireframes — home, product, investor sections</p>
          </div>
          <div>
            <CaseImg
              src={img('final-design.png')}
              filename="intelligyn/final-design.png"
              alt="High-fidelity design for the Intelligyn homepage showing lighter palette, physician-centred copy, and investor section"
            />
            <p className={s.imgCaption}>Final design — lighter palette, physician-centred copy</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OUTCOMES
      ══════════════════════════════════════════════════════ */}
      <div className={`${csLayout.prose} ${csLayout.pt.section}`}>
        <section className={csTw.section} aria-labelledby="outcomes-heading">
          <p className={`${s.sectionEyebrow} ${csTw.sectionEyebrow}`}>Outcomes</p>
          <h2 id="outcomes-heading" className={`${s.h2} ${csTw.h2}`}>What the project delivered</h2>
          <p className={s.body}>
            The redesign gave Intelligyn a website that could actually do its job —
            communicate credibility to clinicians and give investors a reason to stay.
          </p>

          <div className={`${csLayout.gridOutcomes}`} role="list">
            {[
              { num: '12',   label: 'Competitors benchmarked before any design decisions' },
              { num: '8',    label: 'Participants interviewed across investor, clinical, and expert segments' },
              { num: '95',   label: 'Tree testing participants validating the new information architecture' },
              { num: '67%',  label: 'Task success rate on the redesigned IA, up from near zero on critical investor paths' },
              { num: '11',   label: 'Users in copy testing — highlighter method, three text variations' },
              { num: '6',    label: 'Keyword clusters optimised for clinical search discovery' },
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
            Medical copy has consequences that most UX writing doesn't. A word choice
            that implies the AI is diagnosing — rather than the clinician — isn't just
            a trust problem. In a regulated medical context, it's a liability problem.
            The highlighter test made that visible in a way no stakeholder conversation could.
          </p>
          <p className={s.body}>
            Tree testing before wireframing was the right call. Every IA decision in
            this project had data behind it — not opinion. When the investor section
            ended up in primary navigation, that was a 149-second task time, not a
            hunch. That specificity made the design defensible.
          </p>
          <p className={s.body}>
            What I'd do differently: get a healthcare professional into the room for
            the copy review, not just for the interviews. The clinical vocabulary issues
            ran deeper than UX testing alone could fully surface.
          </p>
        </section>
      </div>

      {/* ── Next project ── */}
      <CaseStudyNextProject slug={next.slug} title={next.title} />

    </main>
  );
}
