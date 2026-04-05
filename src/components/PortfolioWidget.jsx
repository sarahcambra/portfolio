import { useState, useCallback, useMemo } from 'react';
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
import Button from './Button';
import { projects } from '../data';
import s from '../styles/PortfolioWidget.module.css';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

/* ─────────────────────────────────────────────────────────
   ContactView — lives on the always-dark widget.
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
      <div className={s.panelSectionTitle}>Contact Me</div>
      <a
        href="https://linkedin.com/in/sarahbeu/"
        target="_blank"
        rel="noopener noreferrer"
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
        <Button
          type="button"
          onClick={copy}
          variant={copied ? 'primary' : 'secondary'}
          surface="inverse"
          size="md"
          className={s.contactActionBtn}
        >
          {copied ? (
            <>
              <Check size={16} weight="bold" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} aria-hidden="true" />
              Copy email
            </>
          )}
        </Button>
        <Button
          as="a"
          href={`mailto:${EMAIL}`}
          variant="primary"
          surface="inverse"
          size="md"
          className={s.contactActionBtn}
        >
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
          Send email
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Tab — ARIA tab pattern on design-system Button.
───────────────────────────────────────────────────────── */
function WidgetTab({ id, active, onSelect, onKeyDown, icon, children }) {
  return (
    <Button
      as="button"
      type="button"
      role="tab"
      id={`widget-tab-${id}`}
      aria-selected={active}
      aria-controls={`widget-panel-${id}`}
      tabIndex={active ? 0 : -1}
      variant={active ? 'primary' : 'secondary'}
      surface="inverse"
      size="md"
      className={s.widgetTab}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => onKeyDown(e, id)}
    >
      {icon && (
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
}

const VIEWS = [
  { id: 'cases', label: 'Case Studies', icon: <Briefcase size={16} weight="bold" /> },
  { id: 'chat', label: 'Chat with me', icon: <ChatCircleDots size={16} weight="bold" /> },
  { id: 'contact', label: 'Contact Me', icon: <AddressBook size={16} weight="bold" /> },
];

/* ─────────────────────────────────────────────────────────
   PortfolioWidget — dark hero card.
   view / onViewChange: controlled tab state (parent owns floats in hero).
───────────────────────────────────────────────────────── */
export default function PortfolioWidget({ view, onViewChange }) {
  const widgetProjects = useMemo(
    () => projects.filter((p) => p.widget !== false),
    []
  );
  const viewIds = useMemo(() => VIEWS.map((v) => v.id), []);

  const selectView = useCallback(
    (id) => {
      onViewChange(id);
    },
    [onViewChange]
  );

  const handleTabKey = useCallback(
    (e, currentId) => {
      const idx = viewIds.indexOf(currentId);
      let nextId;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextId = viewIds[(idx + 1) % viewIds.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextId = viewIds[(idx - 1 + viewIds.length) % viewIds.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextId = viewIds[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        nextId = viewIds[viewIds.length - 1];
      } else {
        return;
      }
      selectView(nextId);
      document.getElementById(`widget-tab-${nextId}`)?.focus();
    },
    [viewIds, selectView]
  );

  const panelAriaLabel =
    view === 'cases'
      ? 'Case studies preview'
      : view === 'chat'
        ? "Chat with Sarah's assistant"
        : 'Contact';

  return (
    <div
      className={`${s.widget} hero-widget-region`}
      role="region"
      aria-label="Sarah Beú — portfolio dashboard"
    >
      <div className={s.widgetHeader}>
        <img
          src={resolvePublicUrl('/assets/sarah-logo.png')}
          alt=""
          className={s.widgetLogo}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className={s.widgetNameGroup}>
          <p className={s.widgetName}>Sarah Beú</p>
          <p className={s.widgetSubtitle}>Sr. Product Designer · Design Systems &amp; Accessibility</p>
        </div>
        <Button
          as={Link}
          to="/about"
          variant="secondary"
          surface="inverse"
          size="md"
          className={s.widgetHeaderBtn}
        >
          About me
          <ArrowSquareOut size={15} weight="bold" aria-hidden="true" />
        </Button>
      </div>

      <div
        id={`widget-panel-${view}`}
        role="tabpanel"
        aria-label={panelAriaLabel}
        className={s.viewArea}
      >
        {view === 'cases' && (
          <p className={s.casesPanelHeading}>Accessible Design System</p>
        )}
        <div className={s.viewPanelBody}>
          {view === 'cases' && <CasesView projects={widgetProjects} />}
          {view === 'chat' && <ChatView />}
          {view === 'contact' && <ContactView />}
        </div>
      </div>

      <nav className={s.pillNav} aria-label="Dashboard navigation">
        <div className={s.tabList}>
          <div role="tablist" aria-label="Dashboard views" className={s.tabRow}>
            {VIEWS.map(({ id, label, icon }) => (
              <WidgetTab
                key={id}
                id={id}
                active={view === id}
                onSelect={selectView}
                onKeyDown={handleTabKey}
                icon={icon}
              >
                {label}
              </WidgetTab>
            ))}
          </div>
          <Button
            as="a"
            href={resolvePublicUrl('/assets/sarah-resume-pdf/sarah-resume.pdf')}
            download="sarah-resume.pdf"
            variant="secondary"
            surface="inverse"
            size="md"
            className={s.resumeBtn}
          >
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            Resume
          </Button>
        </div>
      </nav>

      <div className={s.ctaBar}>
        <span aria-hidden="true" className={s.availableDot} />
        <span className={s.srOnly}>Available for work —</span>
        <span className={s.locationText}>Based in Karlskrona, Sweden</span>
      </div>
    </div>
  );
}
