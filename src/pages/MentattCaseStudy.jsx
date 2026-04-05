import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/MentattCaseStudy.module.css';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';

const project = projects.find(p => p.slug === 'mentatt-research');
const next = getNextCaseStudy('mentatt-research');

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

export default function MentattCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const img = (name) => `/assets/projects/mentatt/${name}`;

  return (
    <main className={s.page} id="main-content">

      <CaseStudyBreadcrumb />

      {/* ── Hero ── */}
      <header className={s.hero}>
        <div className={s.heroInner}>
          <p className={s.heroEyebrow}>Mentatt · Mental Health App · 9 Weeks</p>
          <h1 className={s.heroTitle}>Mental Health<br />App Design</h1>
          <p className={s.heroSub}>
            Students weren't completing mental health surveys. The data was hard to
            read. And nobody would pay for a subscription. We redesigned all three.
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
            { label: 'Client',   value: 'Mentatt' },
            { label: 'Timeline', value: '9 Weeks' },
            { label: 'Team',     value: '5 UX Designers · 2 Mentatt members' },
            { label: 'My Role',  value: 'UX Researcher · UX Designer · UI Designer' },
            { label: 'Tools',    value: 'Figma · Figjam · Miro' },
            { label: 'Website',  value: 'mentatt.com' },
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
          filename="mentatt/cover.png"
          alt="Mentatt app final design showing the chatbot survey flow and colour-coded mental health results dashboard"
          tall
          caption="Final design — chatbot survey and colour-coded results dashboard"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════════════ */}
      <div className={s.prose} style={{ paddingTop: '4rem' }}>
        <section className={s.section} aria-labelledby="context-heading">
          <p className={s.sectionEyebrow}>Context</p>
          <h2 id="context-heading" className={s.h2}>A mental health app for students — with three unsolved problems</h2>
          <p className={s.body}>
            Mentatt is a startup focused on early mental health intervention for students.
            The product idea was solid: a mobile app with regular mental health assessments,
            personalised recommendations, and educational content. But before any screen
            could be designed, we needed to understand why students weren't engaging with
            this category at all.
          </p>
          <p className={s.body}>
            My role covered the full arc — research, UX, and UI. Nine weeks with a team
            of five designers and two Mentatt founders.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════
          RESEARCH
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Research</p>
          <p className={s.dividerTitle}>Five competitors and eight conversations</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Competitor Analysis</p>
          <h2 className={s.h2}>What the category was already doing</h2>
          <p className={s.body}>
            Mentatt pointed me at five direct competitors: Nilo Health, Yumuuv,
            Official Vibe, Bamboo HR, and BOB. I looked specifically at engagement
            features — what kept users coming back — and what was being used to
            add value beyond the basic survey.
          </p>
          <ul className={s.list}>
            <li className={s.listItem}>Most competitors used monthly surveys and educational content as their primary engagement loop</li>
            <li className={s.listItem}>Nilo Health and Yumuuv focused on mental health and employee engagement — the closest category matches</li>
            <li className={s.listItem}>Several products added gamification, social features, and rewards to push participation</li>
            <li className={s.listItem}>None of them had solved the core problem: surveys still felt like surveys</li>
          </ul>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <Img
          src={img('benchmarking.png')}
          filename="mentatt/benchmarking.png"
          alt="Competitor analysis comparing Nilo Health, Yumuuv, Official Vibe, Bamboo HR, and BOB across engagement features, survey design, and educational content"
          caption="Competitor analysis — five products compared on engagement and value-added services"
        />
      </div>

      <div className={s.prose} style={{ paddingTop: '3rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>User Interviews</p>
          <h2 className={s.h2}>Eight participants, three countries, one recurring problem</h2>
          <p className={s.body}>
            Semi-structured interviews with 8 participants aged 20–38, from Sweden,
            Brazil, and Canada. I wanted diverse perspectives on mental health tracking
            — not just one cultural context. Three things I specifically explored:
          </p>
          <ul className={s.list}>
            <li className={s.listItem}><strong>Current habits</strong> — How often did they track their mental health? What methods? What got in the way?</li>
            <li className={s.listItem}><strong>Survey perceptions</strong> — What did weekly surveys feel like? How long was too long?</li>
            <li className={s.listItem}><strong>Feature value</strong> — What would they actually use — recommendations, therapy, activities, learning content, support groups?</li>
          </ul>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('interview-notes.png')}
              filename="mentatt/interview-notes.png"
              alt="Interview notes showing synthesised themes around survey fatigue, result comprehension, and feature preferences"
            />
            <p className={s.imgCaption}>Interview synthesis — survey fatigue and feature value</p>
          </div>
          <div>
            <CaseImg
              src={img('affinity-map.png')}
              filename="mentatt/affinity-map.png"
              alt="Affinity map grouping insights by theme: survey length, result clarity, personalisation, and subscription hesitation"
            />
            <p className={s.imgCaption}>Affinity mapping — three insight clusters</p>
          </div>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '2rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Key Insights</p>
          <h2 className={s.h2}>Three things the research made unavoidable</h2>
        </div>
      </div>

      <div className={s.wide} style={{ paddingBottom: '2rem' }}>
        <div className={s.insightGrid} role="list">
          {[
            {
              num: '01',
              label: 'Survey fatigue was real. Users wanted less frequency and fewer questions. The format — not the content — was the reason people stopped engaging.',
            },
            {
              num: '02',
              label: 'Traditional result visualisations were unmotivating. Charts showing a mental health score with no context or direction made users feel worse, not better.',
            },
            {
              num: '03',
              label: 'Zero willingness to pay at the proposed subscription price. Not hesitation — zero. The revenue model had to change.',
            },
          ].map(i => (
            <article key={i.num} className={s.insightCard} role="listitem">
              <span className={s.insightNum}>{i.num}</span>
              <p className={s.insightLabel}>{i.label}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESIGN CHALLENGES
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Design Challenges</p>
          <p className={s.dividerTitle}>Four questions that shaped every design decision</p>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div className={s.hmwGrid} role="list">
          {[
            'How might we balance data collection with user experience to reduce survey fatigue without losing the clinical value of the data?',
            'How might we create educational content that is genuinely accessible — not just readable — to users with different mental health literacy levels?',
            'How might we visualise mental health results in a way that is both accurate and empowering, rather than clinical and distressing?',
            'How might we create a positive experience around receiving a mental health score — one that motivates action rather than avoidance?',
          ].map((q, i) => (
            <div key={i} className={s.hmwCard} role="listitem">
              <span className={s.hmwLabel}>How Might We</span>
              <p className={s.hmwQuestion}>{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESIGN
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>Design</p>
          <p className={s.dividerTitle}>Redesigning the survey and the result</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>The Survey Problem</p>
          <h2 className={s.h2}>From form to conversation</h2>
          <p className={s.body}>
            The traditional monthly survey was the core engagement problem. Users were
            opening it, seeing a form, and leaving. The content was fine — the format
            was the barrier.
          </p>
          <p className={s.body}>
            The fix was structural: turn the survey into a chat. An AI chatbot, maximum
            10 questions, one answer at a time. The same data. A completely different
            experience of giving it.
          </p>
        </div>
      </div>

      <div className={s.wide} style={{ paddingBottom: '2rem' }}>
        <div className={s.solutionGrid}>
          <div className={s.solutionBefore}>
            <span className={s.solutionLabel}>Before</span>
            <p className={s.solutionText}>
              Traditional monthly survey — a list of questions on a single screen.
              Users felt overwhelmed before the first answer. Completion rates were low.
              The data wasn't reaching the product.
            </p>
          </div>
          <div className={s.solutionAfter}>
            <span className={s.solutionLabel}>After</span>
            <p className={s.solutionText}>
              AI chatbot format — one question at a time, conversational pacing, max
              10 questions. Feels like a check-in, not an assessment. Completion rates
              increased significantly after the format change.
            </p>
          </div>
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('survey-wireframe.png')}
              filename="mentatt/survey-wireframe.png"
              alt="Wireframe of the chatbot survey interface showing one question at a time with progress indicator and message bubble design"
            />
            <p className={s.imgCaption}>Chatbot survey — wireframe stage</p>
          </div>
          <div>
            <CaseImg
              src={img('survey-final.png')}
              filename="mentatt/survey-final.png"
              alt="Final design of the Mentatt chatbot survey showing a conversational interface with calming green tones and progress indicator"
            />
            <p className={s.imgCaption}>Chatbot survey — final design</p>
          </div>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>The Results Problem</p>
          <h2 className={s.h2}>Making a mental health score feel human</h2>
          <p className={s.body}>
            Showing someone their mental health score is a design problem with real
            consequences. Get it wrong and users disengage, feel judged, or dismiss
            the data entirely. The research said traditional charts were unmotivating —
            so we had to find something better.
          </p>
          <p className={s.body}>
            The solution was colour-coded stages. Each mental health stage — from
            healthy to elevated anxiety or stress — gets a distinct colour that
            communicates state without clinical language. The combination of a pie
            chart and bar chart tested best for comprehension in user testing.
          </p>
        </div>
      </div>

      <div className={s.prose}>
        <p className={s.body} style={{ marginBottom: '0.5rem' }}>
          Colour system for mental health stages:
        </p>
        <div className={s.palette} role="list" aria-label="Colour palette for mental health stages">
          {[
            { color: '#4ade80', label: 'Healthy' },
            { color: '#facc15', label: 'Mild stress' },
            { color: '#f9a8d4', label: 'Anxiety' },
            { color: '#93c5fd', label: 'Low mood' },
            { color: '#c4b5fd', label: 'High stress' },
          ].map(p => (
            <div key={p.label} className={s.paletteItem} role="listitem">
              <div
                className={s.paletteSwatch}
                style={{ background: p.color }}
                aria-hidden="true"
              />
              <span className={s.paletteLabel}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '2rem' }}>
        <div className={s.imgGrid2}>
          <div>
            <CaseImg
              src={img('results-wireframe.png')}
              filename="mentatt/results-wireframe.png"
              alt="Wireframe of the mental health results dashboard with placeholder charts and colour-coded stage indicator"
            />
            <p className={s.imgCaption}>Results dashboard — wireframe with chart positions</p>
          </div>
          <div>
            <CaseImg
              src={img('results-final.png')}
              filename="mentatt/results-final.png"
              alt="Final design of the Mentatt results screen showing a colour-coded pie and bar chart with the user's mental health stage and personalised recommendations"
            />
            <p className={s.imgCaption}>Results dashboard — final design with colour-coded stages</p>
          </div>
        </div>
      </div>

      <div className={s.wide} style={{ paddingTop: '1rem' }}>
        <Img
          src={img('results-annual.png')}
          filename="mentatt/results-annual.png"
          alt="Annual view of the Mentatt mental health dashboard showing monthly scores over time with colour-coded trend line"
          caption="Annual view — monthly and yearly comparison so users can track progress over time"
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          USER TESTING
      ══════════════════════════════════════════════════════ */}
      <div className={s.divider} aria-hidden="true">
        <div className={s.dividerInner}>
          <p className={s.dividerLabel}>User Testing</p>
          <p className={s.dividerTitle}>What we removed, what we kept</p>
        </div>
      </div>

      <div className={s.prose} style={{ paddingTop: '3.5rem' }}>
        <div className={s.sectionSm}>
          <p className={s.sectionEyebrow}>Testing Findings</p>
          <h2 className={s.h2}>The prototype showed us two things to change</h2>
          <p className={s.body}>
            We put the wireframes in front of users before finalising the design.
            Two findings came back clearly enough to act on immediately.
          </p>
        </div>
      </div>

      <div className={s.wide} style={{ paddingBottom: '2rem' }}>
        <div className={s.testingList}>
          {[
            {
              type: 'removed',
              badge: 'Removed',
              text: 'The calendar feature for tracking emotions daily was cut. Users consistently said it would create pressure rather than support. The app was supposed to reduce anxiety about mental health tracking — a daily calendar did the opposite.',
            },
            {
              type: 'kept',
              badge: 'Validated',
              text: 'The combination of pie chart + bar chart for results was confirmed. Users said it gave them both an overall picture (pie) and a sense of change over time (bar). We also confirmed they wanted to see monthly and annual views — progress matters more than a single score.',
            },
            {
              type: 'kept',
              badge: 'Refined',
              text: 'Personalised recommendations and educational content based on health stage were well-received. Users wanted direction, not just data. The exercises and content tailored to their current stage were seen as the most useful part of the result screen.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${s.testingItem} ${item.type === 'removed' ? s.testingRemoved : s.testingKept}`}
            >
              <span className={s.testingBadge}>{item.badge}</span>
              <p className={s.testingText}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.wide}>
        <div className={s.imgGrid3}>
          <div>
            <CaseImg
              src={img('final-home.png')}
              filename="mentatt/final-home.png"
              alt="Final Mentatt app home screen showing the user's current mental health stage with a colour-coded indicator and quick access to the chatbot survey"
            />
            <p className={s.imgCaption}>Home — current stage + quick survey access</p>
          </div>
          <div>
            <CaseImg
              src={img('final-chat.png')}
              filename="mentatt/final-chat.png"
              alt="Final Mentatt chatbot survey screen showing a conversational message bubble interface with a progress bar"
            />
            <p className={s.imgCaption}>Chatbot survey — conversational format</p>
          </div>
          <div>
            <CaseImg
              src={img('final-results.png')}
              filename="mentatt/final-results.png"
              alt="Final Mentatt results screen showing colour-coded pie and bar charts, health stage label, and personalised exercise recommendations"
            />
            <p className={s.imgCaption}>Results — colour-coded charts + recommendations</p>
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
            The most consequential recommendation wasn't a design decision — it was a
            business one. The research found zero willingness to pay for a subscription.
            Rather than redesign the pricing, we recommended exploring corporate
            partnerships and government grants as alternative revenue models.
            Mentatt adopted this recommendation.
          </p>

          <div className={s.callout}>
            <p className={s.calloutText}>
              Traditional monthly surveys transformed into an AI chatbot with up to
              10 questions — significantly increasing user participation and reducing
              survey fatigue without losing any clinical value.
            </p>
          </div>

          <div className={s.outcomes} role="list">
            {[
              { num: '5',       label: 'Competitors analysed for engagement patterns and feature benchmarking' },
              { num: '8',       label: 'Participants interviewed across Sweden, Brazil, and Canada' },
              { num: '10',      label: 'Maximum questions in the chatbot survey — down from a full-page form' },
              { num: '2',       label: 'Chart types combined (pie + bar) after user testing confirmed the pairing' },
              { num: '1',       label: 'Feature removed after testing — the daily emotion calendar' },
              { num: 'Adopted', label: 'Revenue model recommendation — corporate partnerships and grants over subscriptions' },
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
            The format of an interaction is as consequential as its content. The survey
            data didn't change — we just changed how it was collected. But that format
            shift was the difference between users completing the assessment or closing
            the app. That's not a small UX refinement. That's the product.
          </p>
          <p className={s.body}>
            Showing someone their mental health score is a design problem with stakes.
            The colour-coded stage system worked because it gave context — not just a
            number, but a state, and from that state a direction. "You're in a mild
            stress phase — here's what helps" is a completely different experience
            from "your score is 62."
          </p>
          <p className={s.body}>
            The revenue model recommendation was the hardest thing to deliver. It
            required convincing a startup that the product they'd built was right,
            but the business model around it needed to change. The research made it
            undeniable. Mentatt moved forward — which is the outcome that matters.
          </p>
        </section>
      </div>

      {/* ── Next project ── */}
      <CaseStudyNextProject slug={next.slug} title={next.title} />

    </main>
  );
}
