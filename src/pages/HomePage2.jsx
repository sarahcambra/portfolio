import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
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

/* ─────────────────────────────────────────────
   1. IMPORTS & DATA
───────────────────────────────────────────── */
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data';
import { useTheme } from '../ThemeContext.jsx';

import ChatView from '../components/ChatView';
import CasesView from '../components/CasesView';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

const testimonials = [
  { quote: "Sarah takes the initiative to identify problems and devise solutions. She has shown strong communication skills and the ability to inspire respect and cooperation in teammates.", name: "Afonso Caetano", role: "IT Director / CIO/CTG", initials: "AC" },
  { quote: "Sarah is an extremely focused and competent professional who consistently delivers efficient, exceptional focus and dedication, successfully achieving all company targets.", name: "Paulo Sidney", role: "Business Agility Manager", initials: "PS" },
  { quote: "I had the opportunity to work with Sarah on projects where she consistently demonstrated exceptional focus and competence.", name: "Dario Piva", role: "Solutions Architect", initials: "DP" },
  { quote: "I worked with Sarah — she is a focused person who knows what she wants, is a team player, and consistently strives to achieve her goals.", name: "Bruno Mondin", role: "VP of Venture Capital", initials: "BM" },
];

/* ─────────────────────────────────────────────
   2. HELPER COMPONENTS (The "Soul" of the UI)
───────────────────────────────────────────── */
function FloatCard({ className, style, label, detail, children }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const fc = {
    label: { fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.25rem' },
    mono: { fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: 0 }
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div className={`float-card ${className || ''}`} style={{ position: 'absolute', zIndex: 3, ...style }}>
      <button
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`${label} — ${open ? 'collapse' : 'expand'}`}
        style={{
          all: 'unset', display: 'block', cursor: 'pointer',
          background: '#fff', borderRadius: '14px',
          border: open ? '1.5px solid var(--color-green)' : '1px solid var(--color-border)',
          boxShadow: open ? '0 8px 32px rgba(61,107,53,0.18)' : '0 4px 24px rgba(0,0,0,0.07)',
          padding: '0.875rem', width: '100%',
          transform: open ? 'scale(1.04)' : 'scale(1)',
          transition: 'border 0.2s, box-shadow 0.2s, transform 0.2s',
        }}
      >
        {children}
        {open && detail && (
          <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid var(--color-border)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-green)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
          </div>
        )}
      </button>
    </div>
  );
}

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
      <a href="https://linkedin.com/in/sarahbeu/" target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', minHeight: '56px' }}>
        <LinkedinLogo size={22} weight="fill" color="rgba(255,255,255,0.75)" />
        <span style={{ color: 'rgba(255,255,255,0.75)', flex: 1 }}>linkedin.com/in/sarahbeu</span>
        <ArrowSquareOut size={16} color="rgba(255,255,255,0.35)" />
      </a>
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.875rem', minHeight: '56px' }}>
        <EnvelopeSimple size={22} color="rgba(255,255,255,0.5)" />
        <span style={{ fontFamily: 'var(--font-mono)', color: '#fff', wordBreak: 'break-all' }}>{EMAIL}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.625rem' }}>
        <button onClick={copy} style={{ flex: 1, background: copied ? 'var(--color-green)' : 'rgba(255,255,255,0.09)', color: '#fff', borderRadius: 'var(--radius-sm)', height: '48px', border: 'none', cursor: 'pointer' }}>
          {copied ? <><Check size={18} weight="bold" /> Copied!</> : <><Copy size={18} /> Copy email</>}
        </button>
        <a href={`mailto:${EMAIL}`} style={{ flex: 1, background: '#fff', borderRadius: 'var(--radius-sm)', color: '#000', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={18} weight="bold" /> Send email
        </a>
      </div>
    </div>
  );
}

function Pill({ active, onClick, icon, children }) {
  return (
    <button onClick={onClick} aria-pressed={active} className="nav-pill"
      style={{
        fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500,
        color: active ? 'var(--color-ink)' : '#fff',
        background: active ? '#fff' : 'rgba(255,255,255,0.09)',
        border: active ? '1.5px solid #fff' : '1px solid rgba(255,255,255,0.12)',
        padding: '0 1.125rem', borderRadius: '100px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'
      }}>
      {icon} {children}
    </button>
  );
}

/* ─────────────────────────────────────────────
   3. MAIN HOME PAGE (The 600-line Master)
───────────────────────────────────────────── */
export default function HomePage() {
  const { dark } = useTheme();
  const [widgetView, setWidgetView] = useState('cases');
  const viewHeadingRef = useRef(null);

  const cream  = dark ? '#111110' : '#f0f0ee';
  const white  = dark ? '#1a1a19' : '#ffffff';
  const ink    = dark ? '#f0f0ee' : '#0f0f0e';
  const muted  = dark ? '#9ca3af' : '#6b7280';
  const border = dark ? 'rgba(255,255,255,0.1)' : '#e2e1dc';

  const fc = {
    label: { fontFamily: 'var(--font-mono)', fontSize: '1rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.25rem' },
    mono: { fontFamily: 'var(--font-mono)', fontSize: '1rem', margin: 0 }
  };

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const VIEWS = [
    { id: 'cases',   label: 'Case Studies', icon: <Briefcase size={16} weight="bold" /> },
    { id: 'chat',    label: 'Chat with me', icon: <ChatCircleDots size={16} weight="bold" /> },
    { id: 'contact', label: 'Contact Me',   icon: <AddressBook size={16} weight="bold" /> },
  ];

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .revealed { opacity: 1; transform: none; }
        @keyframes float-a { 0%,100%{transform:rotate(-5deg) translateY(0)} 50%{transform:rotate(-5deg) translateY(-7px)} }
        @keyframes float-b { 0%,100%{transform:rotate(4deg) translateY(0)} 50%{transform:rotate(4deg) translateY(-9px)} }
        @keyframes float-c { 0%,100%{transform:rotate(7deg) translateY(0)} 50%{transform:rotate(7deg) translateY(-6px)} }
        @keyframes float-d { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-8px)} }
        @keyframes float-e { 0%,100%{transform:rotate(-8deg) translateY(0)} 50%{transform:rotate(-8deg) translateY(-5px)} }
        .fa{animation:float-a 5.2s ease-in-out infinite}
        .fb{animation:float-b 6.1s ease-in-out infinite}
        .fc{animation:float-c 4.8s ease-in-out infinite}
        .fd{animation:float-d 5.7s ease-in-out infinite}
        .fe{animation:float-e 6.4s ease-in-out infinite}
        /* Pill nav buttons */
        .nav-pill:focus-visible { outline: var(--focus-ring-on-dark) !important; outline-offset: var(--focus-ring-offset); }
        /* Float card buttons (on white cards) */
        .float-card button:focus-visible { outline: var(--focus-ring-on-light); outline-offset: var(--focus-ring-offset); border-radius: 14px; }
        /* Everything else inside the dark hero widget */
        .hero-widget :focus-visible { outline: var(--focus-ring-on-dark) !important; outline-offset: var(--focus-ring-offset); }
        /* Light-bg sections (projects, testimonials) */
        :focus-visible { outline: var(--focus-ring-on-light); outline-offset: var(--focus-ring-offset); border-radius: 4px; }
        @media (max-width: 900px) { .float-card { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal * { opacity: 1 !important; transform: none !important; transition: none !important; }
          .fa,.fb,.fc,.fd,.fe { animation: none !important; }
        }
      `}</style>

      <main id="main-content" style={{ background: cream, fontFamily: 'var(--font-body)' }}>
        
        {/* HERO SECTION */}
        <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          {/* FLOATING DECORATIONS */}
          <FloatCard className="fa" style={{ top: '18%', left: '4%', width: '168px' }} label="Design Tokens" detail="Semantic tokens for color and typography.">
            <p style={fc.label}>Design Tokens</p>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '0.5rem' }}>
              {['#0f0f0e','#525252','#9ca3af','#e2e1dc'].map(c => <div key={c} style={{ width: '18px', height: '18px', borderRadius: '4px', background: c }} />)}
            </div>
          </FloatCard>

          <FloatCard className="fb" style={{ top: '10%', right: '4%', width: '192px' }} label="WCAG 2.2" detail="Tested with screen readers and keyboard-only navigation.">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={12} weight="bold" color="#16a34a" />
                <p style={{ ...fc.mono, color: '#16a34a', fontWeight: 600 }}>Level AA Compliant</p>
             </div>
          </FloatCard>

          {/* CENTRAL WIDGET */}
          <div className="hero-widget" style={{ width: '720px', background: '#0f0f0e', borderRadius: '24px', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 80px rgba(0,0,0,0.28)', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <img src={resolvePublicUrl('/assets/sarah-logo.png')} style={{ height: '32px' }} alt="Sarah Logo" />
              <div style={{ flex: 1 }}>
                <h1 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Sarah Beú</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Sr. Product Designer · Accessibility & Design Systems</p>
              </div>
              <Link to="/about" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', border: '1px solid #333', padding: '0.4rem 0.8rem', borderRadius: '100px' }}>About</Link>
            </div>

            <div style={{ height: '280px', position: 'relative' }}>
              {widgetView === 'cases' && <CasesView projects={projects} />}
              {widgetView === 'chat' && <ChatView />}
              {widgetView === 'contact' && <ContactView />}
            </div>

            <nav style={{ marginTop: '1.25rem' }}>
              <ul style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, flexWrap: 'wrap' }}>
                {VIEWS.map(v => (
                  <li key={v.id}>
                    <Pill active={widgetView === v.id} onClick={() => setWidgetView(v.id)} icon={v.icon}>{v.label}</Pill>
                  </li>
                ))}
                <li>
                  <a href={resolvePublicUrl('/assets/sarah-resume.pdf')} download style={{ color: '#fff', background: 'rgba(255,255,255,0.09)', padding: '0 1.125rem', borderRadius: '100px', display: 'flex', alignItems: 'center', height: '44px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <DownloadSimple size={16} weight="bold" /> Resume
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        {/* FULL PROJECTS LISTING */}
        <section style={{ padding: '5rem 2.5rem', maxWidth: '1080px', margin: '0 auto' }}>
          <div className="reveal">
            <h2 style={{ color: ink, fontSize: '2.5rem', marginBottom: '3rem', fontWeight: 700 }}>Case Studies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2.5rem' }}>
              {projects.map(p => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '5rem 2.5rem', background: white }}>
          <div className="reveal" style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <h2 style={{ color: ink, fontSize: '1.75rem', marginBottom: '2.5rem', fontWeight: 600 }}>Kind words from teammates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ padding: '2rem', background: cream, borderRadius: '24px', border: `1px solid ${border}` }}>
                  <p style={{ color: ink, fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6 }}>"{t.quote}"</p>
                  <p style={{ fontWeight: 600, color: ink, margin: 0 }}>{t.name}</p>
                  <p style={{ color: muted, fontSize: '1rem', margin: 0 }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}