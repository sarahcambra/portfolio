import s from '../styles/SkillsTable.module.css';

const PILLARS = [
  {
    id: 'skill-01',
    index: '01',
    category: 'Product design & accessibility',
    blurb:
      'End-to-end product craft with accessibility baked in — not bolted on — so teams ship experiences that work for real people and real compliance bars.',
    items: [
      'Accessible UI & UX',
      'Design systems architecture',
      'WCAG 2.2 & EAA',
      'EN 301 549',
      'Screen reader testing (NVDA, VoiceOver)',
      'Semantic tokens & ARIA patterns',
    ],
  },
  {
    id: 'skill-02',
    index: '02',
    category: 'Strategy & collaboration',
    blurb:
      'I connect user needs with business and engineering reality: scoping hard problems, aligning stakeholders, and turning research into decisions.',
    items: [
      'Cross-functional alignment',
      'Complex problem solving',
      'Technical requirements mapping',
      'Scoping & time management',
      'Data-informed UX audits',
    ],
  },
  {
    id: 'skill-03',
    index: '03',
    category: 'Execution & workflows',
    blurb:
      'Modern tooling and tight handoff — from Figma and systems to AI-assisted workflows — so design intent survives into production.',
    items: [
      'Figma (advanced) & MCP',
      'Design-to-code handoff',
      'Cursor & AI workflows',
      'Solutions analysis',
    ],
  },
];

export default function SkillsTable() {
  return (
    <section className={s.section} aria-labelledby="skills-heading">
      <div className={s.container}>
        <header className={`${s.header} reveal`}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowLine} aria-hidden="true" />
            What I bring
          </p>
          <div className={s.headerRow}>
            <h2 id="skills-heading" className={s.title}>
              Skills &amp; expertise
            </h2>
            <p className={s.lead}>
              Three areas where I spend most of my time — each one feeds the others when
              I&apos;m embedded with a team.
            </p>
          </div>
        </header>

        <div className={`${s.grid} reveal`}>
          {PILLARS.map((pillar) => (
            <article key={pillar.id} className={s.pillar} aria-labelledby={`${pillar.id}-title`}>
              <div className={s.pillarTop}>
                <span className={s.pillarIndex} aria-hidden="true">
                  {pillar.index}
                </span>
                <h3 id={`${pillar.id}-title`} className={s.pillarTitle}>
                  {pillar.category}
                </h3>
              </div>
              <p className={s.pillarBlurb}>{pillar.blurb}</p>
              <div className={s.chipCluster} role="list" aria-label={`Capabilities: ${pillar.category}`}>
                {pillar.items.map((item) => (
                  <span key={item} className={s.chip} role="listitem">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
