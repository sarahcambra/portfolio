import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/ArcanimalCaseStudy.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';

const project = projects.find(p => p.slug === 'arcanimal-platform');
const next = getNextCaseStudy('arcanimal-platform');

/* ── Image helpers ── */
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

export default function ArcanimalCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const img = (name) => `/assets/projects/arcanimal/${name}`;

  return (
    <main className={s.page} id="main-content">

      <CaseStudyBreadcrumb />

      {/* ── Hero ── */}
      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>Arcanimal · Animal Welfare · 6 Weeks</p>
          <h1 className={s.heroTitle}>Animal Welfare<br />Platform</h1>
          <p className={s.heroSub}>
            Shelters running animal operations from spreadsheets and group chats.
            Six weeks to design a platform that actually worked the way they did.
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
            { label: 'Client',   value: 'Arcanimal' },
            { label: 'Timeline', value: '6 Weeks' },
            { label: 'My Role',  value: 'Product Design & Project Manager' },
            { label: 'Tools',    value: 'Figma · Figjam · Notion · Asana · Octopus' },
            { label: 'Website',  value: 'arcanimal.com.br' },
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
          filename="arcanimal/cover.png"
          alt="Arcanimal platform showing shelter registration flow, animal profiles, and adoption matching screens"
          tall
          caption="Platform overview — shelter operations, animal profiles, adoption flow"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="context-heading">
          <p className={s.sectionEyebrow}>Context</p>
          <h2 id="context-heading" className={s.h2}>A shelter problem disguised as a technology gap</h2>
          <p className={s.body}>
            Arcanimal is a platform connecting animal shelters with adopters in Brazil.
            The mission was clear: improve adoption rates by giving shelters better tools.
            But before any screen was designed, I needed to understand what "better" actually
            meant to the people running shelters every day.
          </p>
          <p className={s.body}>
            I led design and project management solo over six weeks. Asana for tracking.
            Figjam for workshops. Figma for everything else.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          CHALLENGE
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose}>
        <section className={s.section} aria-labelledby="challenge-heading">
          <p className={s.sectionEyebrow}>Challenge</p>
          <h2 id="challenge-heading" className={s.h2}>Four operational problems, one platform to solve them</h2>
          <p className={s.body}>
            The research surfaced four distinct problems. Each one was causing real
            harm — animals staying in shelters longer, adoption matches failing, and
            staff burning out on manual processes that technology should have replaced years ago.
          </p>
        </section>
      </div>

      <div className={s.wide} style={{ paddingBottom: '2rem' }}>
        <div className={s.challengeGrid} role="list">
          {[
            {
              num: '01',
              title: 'Animal records were manual',
              body: 'Health information, vaccination history, and care notes lived in spreadsheets — or nowhere at all. A centralised system was the difference between good care and guesswork.',
            },
            {
              num: '02',
              title: 'The adoption process had no structure',
              body: 'Matching was informal, inconsistent, and slow. Adopters had to call the shelter, wait for a callback, visit in person. No digital profiles. No screening flow. No visibility for either side.',
            },
            {
              num: '03',
              title: 'Volunteer coordination was invisible',
              body: "Who was doing what, when, and which animals needed attention — none of that was visible to anyone. Volunteers were turning up to find duplicated tasks or nothing to do.",
            },
          ].map(c => (
            <article key={c.num} className={s.challengeCard} role="listitem">
              <span className={s.challengeNum}>{c.num}</span>
              <h3 className={s.challengeTitle}>{c.title}</h3>
              <p className={s.challengeBody}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 01 — RESEARCH
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 01</p>
          <p className={s.dividerTitle}>Shelter Interviews and User Personas</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Research</p>
          <h2 className={s.h2}>Three shelter managers who changed the brief</h2>
          <p className={s.body}>
            I started with the people doing the hardest part of the work: shelter
            managers. Not adopters. Not volunteers. The people responsible for keeping
            animals alive, matched, and cared for — with almost no tools to help them.
          </p>
          <p className={s.body}>
            Three in-depth interviews. Open-ended. I wanted to hear what their day
            looked like before I suggested what it should look like.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('interview-notes.png')}
          filename="arcanimal/interview-notes.png"
          alt="Interview notes from three shelter managers showing operational pain points around record-keeping, adoption process, and volunteer management"
          caption="Shelter manager interviews — operational pain points and workarounds"
        />
      </div>

      <div className={s.prose} style={{ paddingTop: '2rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Key Insights</p>
          <h2 className={s.h2}>What three shelter managers told me</h2>
        </div>
      </div>

      <div className={s.wide} style={{ paddingBottom: '2rem' }}>
        <div className={s.insightGrid} role="list">
          {[
            {
              num: '01',
              label: 'Manual record-keeping was the biggest time sink and the biggest source of errors. One shelter manager was spending 3 hours a day updating spreadsheets.',
            },
            {
              num: '02',
              label: 'Adoption mismatches were common. Without digital profiles or screening, shelters spent time on matches that failed — and animals stayed longer.',
            },
            {
              num: '03',
              label: 'Volunteers needed structure, not just enthusiasm. Without clear task assignment and visibility, duplicated effort and gaps were the norm.',
            },
          ].map(i => (
            <article key={i.num} className={s.insightCard} role="listitem">
              <span className={s.insightNum}>{i.num}</span>
              <p className={s.insightLabel}>{i.label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={s.prose}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>User Personas</p>
          <h2 className={s.h2}>Who the platform had to serve</h2>
          <p className={s.body}>
            The interviews gave me three distinct users — all using the same platform,
            all needing different things from it.
          </p>
          <ul className={s.list}>
            <li className={s.listItem}><strong>Shelter Manager</strong> — Operational control. Needs to register animals, approve volunteers, manage health records, and track adoption status from one place.</li>
            <li className={s.listItem}><strong>Volunteer</strong> — Task clarity. Needs to see what animals need attention today, log completed care, and communicate with the shelter team without a phone call.</li>
            <li className={s.listItem}><strong>Potential Adopter</strong> — Trust and discovery. Needs to browse animals, understand care needs, and complete a screening process that doesn't require showing up in person first.</li>
          </ul>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Img
          src={img('personas.png')}
          filename="arcanimal/personas.png"
          alt="Three user personas for the Arcanimal platform: Shelter Manager, Volunteer, and Potential Adopter, each with goals, pain points, and key tasks"
          caption="User personas — Shelter Manager, Volunteer, and Potential Adopter"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 02 — INFORMATION ARCHITECTURE
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 02</p>
          <p className={s.dividerTitle}>Features, Roadmap, and Information Architecture</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Feature Definition</p>
          <h2 className={s.h2}>Scoping six weeks of design without scope creep</h2>
          <p className={s.body}>
            Six weeks is short. I couldn't design everything at once — and trying to
            would have produced nothing useful. Based on the interviews, I built a
            feature list and a roadmap that sequenced deliverables by dependency:
            shelters had to exist and be verified before animals could be registered,
            animals had to exist before adoption matching could work.
          </p>
          <p className={s.body}>
            Shelter registration first. Everything else after.
          </p>
        </div>
      </div>

      <div className={s.wide} style={{ paddingBottom: '1.5rem' }}>
        <div className={s.priorityList}>
          {[
            { badge: 'P1 · Sprint 1–2', text: 'Shelter registration and verification — the foundation. No shelter, no platform.' },
            { badge: 'P1 · Sprint 2–3', text: 'Animal profiles — health records, photos, care notes, vaccination history. The core data layer.' },
            { badge: 'P2 · Sprint 3–4', text: 'Adoption flow — digital screening, matching logic, status tracking for adopter and shelter.' },
            { badge: 'P2 · Sprint 4–5', text: 'Volunteer management — task assignment, schedule visibility, care logging.' },
            { badge: 'P3 · Sprint 5–6', text: 'Education content — onboarding resources for new adopters and volunteers.' },
          ].map(p => (
            <div key={p.badge} className={s.priorityItem}>
              <span className={s.priorityBadge}>{p.badge}</span>
              <p className={s.priorityText}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '1rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Site Map</p>
          <h2 className={s.h2}>Building the architecture with everyone who'd use it</h2>
          <p className={s.body}>
            The site map wasn't a solo exercise — I developed it alongside stakeholders
            including volunteers, developers, data entry staff, and the NGO board.
            Getting alignment on structure before screens saved weeks of back-and-forth
            later in the project.
          </p>
          <p className={s.body}>
            I built two maps: one for the shelter-facing system (internal operations)
            and one for the full public-facing platform. They had to work independently
            but share a data layer.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('sitemap-shelter.png')}
              filename="arcanimal/sitemap-shelter.png"
              alt="Site map for the shelter management system showing animal registration, health records, volunteer management, and reporting sections"
            />
            <p className={s.imgCaption}>Shelter system — internal operations map</p>
          </div>
          <div>
            <CaseImg
              src={img('sitemap-full.png')}
              filename="arcanimal/sitemap-full.png"
              alt="Full platform site map showing public-facing adoption portal, shelter portal, and shared data layer"
            />
            <p className={s.imgCaption}>Full platform — public and shelter portals</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PHASE 03 — DESIGN
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Phase 03</p>
          <p className={s.dividerTitle}>User Flows and Final Designs</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>User Flows</p>
          <h2 className={s.h2}>Mapping shelter registration before designing a screen</h2>
          <p className={s.body}>
            Shelter registration was the highest-priority flow — and the most complex.
            A shelter registering on the platform needs to: submit their organisation
            data, upload verification documents, receive approval, and gain access
            to the animal management system. Each step had different data requirements
            and different failure states.
          </p>
          <p className={s.body}>
            I defined all data fields before wireframing — this was the handoff the
            development team needed to start database design. Getting this right early
            prevented the most common cause of rework on platform projects: misaligned
            data models.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <Img
          src={img('user-flow.png')}
          filename="arcanimal/user-flow.png"
          alt="User flow for shelter registration showing steps from signup to document verification, admin approval, and system access"
          caption="Shelter registration flow — from signup to verified access"
        />
      </div>

      <div className={s.callout} style={{ margin: '2.5rem auto', maxWidth: '720px', padding: '0 2.5rem' }}>
        <div className={s.callout}>
          <p className={s.calloutText}>
            The data field specification was the most important deliverable.
            Designs could iterate — but if the database was built wrong, everything
            downstream would break.
          </p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '1rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Final Designs</p>
          <h2 className={s.h2}>Shelter registration — designed to reduce friction and errors</h2>
          <p className={s.body}>
            The registration screens had three design goals: make the required data
            obvious, reduce the chance of input errors, and give the shelter manager
            a clear sense of progress at every step. Multi-step form with persistent
            progress indicator, inline validation, and a confirmation state before
            document upload.
          </p>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('design-step1.png')}
              filename="arcanimal/design-step1.png"
              alt="Shelter registration step 1 — organisation details form with name, address, and contact information"
            />
            <p className={s.imgCaption}>Step 1 — organisation details</p>
          </div>
          <div>
            <CaseImg
              src={img('design-step2.png')}
              filename="arcanimal/design-step2.png"
              alt="Shelter registration step 2 — document upload with supported formats and file size guidance"
            />
            <p className={s.imgCaption}>Step 2 — document verification</p>
          </div>
          <div>
            <CaseImg
              src={img('design-step3.png')}
              filename="arcanimal/design-step3.png"
              alt="Shelter registration confirmation screen showing submitted status and expected approval timeline"
            />
            <p className={s.imgCaption}>Step 3 — submission confirmation</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('animal-profile.png')}
              filename="arcanimal/animal-profile.png"
              alt="Animal profile screen showing photo, health records, vaccination history, care notes, and adoption status"
            />
            <p className={s.imgCaption}>Animal profile — health, history, adoption status</p>
          </div>
          <div>
            <CaseImg
              src={img('adoption-flow.png')}
              filename="arcanimal/adoption-flow.png"
              alt="Adoption matching flow showing animal browsing, screening form, and match status screen for the adopter"
            />
            <p className={s.imgCaption}>Adoption flow — browse, screen, match</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OUTCOMES
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="outcomes-heading">
          <p className={s.sectionEyebrow}>Outcomes</p>
          <h2 id="outcomes-heading" className={s.h2}>What the project delivered</h2>
          <p className={s.body}>
            Six weeks from kickoff to final handoff. Every deliverable was tied
            directly to something a shelter manager said they needed.
          </p>

          <div className={s.outcomes} role="list">
            {[
              { num: '3',       label: 'Shelter manager interviews — the research that shaped every design decision' },
              { num: '3',       label: 'User personas defined across shelter manager, volunteer, and adopter roles' },
              { num: '2',       label: 'Site maps built — shelter operations system and full public platform' },
              { num: '5',       label: 'Priority features scoped and sequenced by dependency, not wishlist order' },
              { num: '100%',    label: 'Data fields defined for shelter registration before a wireframe was drawn' },
              { num: '6 wks',   label: 'End-to-end: research, IA, flows, and final designs' },
            ].map(o => (
              <div key={o.num + o.label} className={s.outcomeStat} role="listitem">
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
            Running design and project management simultaneously is a different kind
            of discipline. The constant temptation is to design everything interesting
            and track the easy things. The constraint of six weeks forced the opposite:
            track everything precisely, design only what matters most.
          </p>
          <p className={s.body}>
            The decision to sequence shelter registration first came directly from the
            interviews — shelters had to exist and be verified before animals could be
            registered, and animals had to be registered before adoption could work.
            That dependency chain was the project plan.
          </p>
          <p className={s.body}>
            The data field specification was the deliverable that felt least like
            design work and turned out to be the most valuable. It was the one
            document that made the development team's job possible. If I'd handed
            off wireframes without it, the database would have been built wrong and
            every screen would have needed rebuilding.
          </p>
          <p className={s.body}>
            What I'd do differently: get the volunteer persona into the interviews
            earlier. I built that persona from inference — from what the shelter
            managers said about volunteers, not from volunteers themselves. That's
            the assumption I'd want to validate first in a follow-up.
          </p>
        </section>
      </div>

      {/* ── Next project ── */}
      <CaseStudyNextProject slug={next.slug} title={next.title} />

    </main>
  );
}
