import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LinkedinLogo,
  EnvelopeSimple,
  Copy,
  ArrowSquareOut,
  Check,
  ArrowRight,
  DownloadSimple,
  Briefcase,
  ChatCircleDots,
  AddressBook,
} from '@phosphor-icons/react';
import ChatView from './ChatView';
import CasesView from './CasesView';
import { projects } from '../data/projects';
import s from '../styles/PortfolioWidget.module.css';

/* ─────────────────────────────────────────────────────────
   ContactView — lives on the always-dark widget.
   Uses rgba/white values intentionally (not token-flipped).
───────────────────────────────────────────────────────── */
function ContactView() {
  const [copied, setCopied] = useState(false);
  const EMAIL = 'sarahborgesbeu@gmail.com';

  const copy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <div className={s.contactWrap}>
      <a
        href="https://linkedin.com/in/sarahbeu/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sarah's LinkedIn profile (opens in new tab)"
        className={s.linkedinLink}
      >
        <LinkedinLogo size={22} weight="fill" aria-hidden="true" />
        <span className={s.linkedinText}>linkedin.com/in/sarahbeu</span>
        <ArrowSquareOut size={16} aria-hidden="true" />
      </a>

      <div className={s.contactEmailBox}>
        <EnvelopeSimple size={22} aria-hidden="true" />
        <p className={s.contactEmail}>{EMAIL}</p>
      </div>

      <div className={s.contactActions}>
        <button
          onClick={copy}
          aria-live="polite"
          aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
          className={s.btnCopy}
          data-copied={copied}
        >
          {copied
            ? <><Check size={16} weight="bold" aria-hidden="true" /> Copied!</>
            : <><Copy size={16} aria-hidden="true" /> Copy email</>
          }
        </button>
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Send email to Sarah"
          className={s.btnSendEmail}
        >
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
          Send email
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Pill — tab toggle button inside the dark widget.
───────────────────────────────────────────────────────── */
function Pill({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`nav-pill ${active ? s.pillActive : s.pill}`}
    >
      {icon && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}

const VIEWS = [
  { id: 'cases',   label: 'Case Studies', icon: <Briefcase size={16} weight="bold" /> },
  { id: 'chat',    label: 'Chat with me', icon: <ChatCircleDots size={16} weight="bold" /> },
  { id: 'contact', label: 'Contact Me',   icon: <AddressBook size={16} weight="bold" /> },
];

/* ─────────────────────────────────────────────────────────
   PortfolioWidget — self-contained dark card.
   Manages its own view state; no props required.
───────────────────────────────────────────────────────── */
export default function PortfolioWidget() {
  const [widgetView, setWidgetView] = useState('cases');
  const viewHeadingRef = useRef(null);

  /* Move focus to view heading on tab change — screen reader UX */
  useEffect(() => { viewHeadingRef.current?.focus(); }, [widgetView]);

  return (
    <div
      className={`${s.widget} hero-widget-region`}
      role="region"
      aria-label="Portfolio overview — Sarah Beú"
    >
      {/* ── Header ── */}
      <div className={s.widgetHeader}>
        <img
          src="/assets/Logo_sarah.png"
          alt=""
          aria-hidden="true"
          className={s.widgetLogo}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className={s.widgetNameGroup}>
          <h1 id="hero-heading" className={s.widgetName}>Sarah Beú</h1>
          <p className={s.widgetSubtitle}>Sr. Product Designer · Design Systems &amp; Accessibility</p>
        </div>
        <Link to="/about" aria-label="About me — view full page" className={s.widgetMoreLink}>
          About me
          <ArrowSquareOut size={15} weight="bold" aria-hidden="true" />
        </Link>
      </div>

      {/* ── Fixed-height view area ── */}
      <div className={s.viewArea} aria-live="polite" aria-atomic="false">
        <h2 ref={viewHeadingRef} tabIndex={-1} className={s.viewHeading}>
          {VIEWS.find(v => v.id === widgetView)?.label}
        </h2>
        {widgetView === 'cases'   && <CasesView projects={projects} />}
        {widgetView === 'chat'    && <ChatView />}
        {widgetView === 'contact' && <ContactView />}
      </div>

      {/* ── Navigation pills ── */}
      <nav aria-label="Quick navigation">
        <ul className={s.pillNav} role="list">
          {VIEWS.map(({ id, label, icon }) => (
            <li key={id} role="listitem">
              <Pill active={widgetView === id} onClick={() => setWidgetView(id)} icon={icon}>
                {label}
              </Pill>
            </li>
          ))}
          <li role="listitem">
            <a
              href="/assets/sarah-resume.pdf"
              download
              aria-label="Download resume PDF"
              className={`${s.pill} nav-pill`}
            >
              <DownloadSimple size={16} weight="bold" aria-hidden="true" />
              Resume
            </a>
          </li>
        </ul>
      </nav>

      {/* ── Availability strip ── */}
      <div className={s.ctaBar}>
        <span aria-hidden="true" className={s.availableDot} />
        <span className={s.locationText}>Based in Karlskrona, Sweden</span>
      </div>
    </div>
  );
}
