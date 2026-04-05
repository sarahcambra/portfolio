import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import s from '../styles/SkillsTable.module.css';

const SKILLS = [
  {
    id: 'skill-01',
    category: 'Product Design & Accessibility',
    count: 6,
    items: [
      'Accessible UI/UX Design',
      'Design Systems Architecture',
      'WCAG 2.2 & EAA Compliance',
      'EN 301 549',
      'Screen Reader Testing (NVDA / VoiceOver)',
      'Semantic Tokens & ARIA Patterns',
    ],
  },
  {
    id: 'skill-02',
    category: 'Strategy & Collaboration',
    count: 5,
    items: [
      'Cross-Functional Team Alignment',
      'Complex Problem Solving',
      'Technical Requirements Mapping',
      'Project Scoping & Time Management',
      'Data-Driven UX Audits',
    ],
  },
  {
    id: 'skill-03',
    category: 'Execution & Workflows',
    count: 4,
    items: [
      'Figma Advanced & MCP',
      'Design-to-Code Handoff',
      'Cursor & AI Workflows',
      'Solutions Analysis',
    ],
  },
];

function AccordionItem({ skill, isOpen, onToggle }) {
  const panelId  = `${skill.id}-panel`;
  const buttonId = `${skill.id}-btn`;

  return (
    <div className={`${s.item} ${isOpen ? s.itemOpen : ''}`}>
      {/*
        WCAG 4.1.2 — button controls the panel.
        aria-expanded signals state to screen readers.
        aria-controls links button to its panel.
      */}
      <button
        id={buttonId}
        className={s.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={s.triggerLeft}>
          <span className={s.triggerCat}>{skill.category}</span>
        </span>
        <span className={s.triggerRight}>
          <CaretDown
            size={16}
            weight="bold"
            className={`${s.caret} ${isOpen ? s.caretOpen : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {/*
        WCAG 1.3.1 — panel has role="region" and aria-labelledby.
        hidden attribute removes from DOM entirely when closed
        so screen readers don't traverse hidden content.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={s.panel}
        hidden={!isOpen}
      >
        <ul className={s.list} role="list">
          {skill.items.map((item) => (
            <li key={item} className={s.listItem}>
              <span className={s.listDot} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SkillsTable() {
  // First item open by default
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section
      className={s.section}
      aria-labelledby="skills-heading"
    >
      <div className={s.container}>

        <header className={`${s.header} reveal`}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowLine} aria-hidden="true" />
            What I bring
          </p>
          <h2 id="skills-heading" className={s.title}>
            Skills & Expertise
          </h2>
        </header>

        {/*
          WCAG 4.1.2 — accordion wrapper has no special role needed.
          Each button/panel pair is self-contained with aria-expanded
          and aria-controls.
        */}
        <div className={`${s.accordion} reveal`}>
          {SKILLS.map((skill) => (
            <AccordionItem
              key={skill.id}
              skill={skill}
              isOpen={openId === skill.id}
              onToggle={() => toggle(skill.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
