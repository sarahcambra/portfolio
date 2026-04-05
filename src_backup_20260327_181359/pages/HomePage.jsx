import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Check, ArrowRight } from '@phosphor-icons/react';
import ProjectCard from '../components/ProjectCard';
import PortfolioWidget from '../components/PortfolioWidget';
import s from '../styles/HomePage.module.css';
import { projects } from '../data/projects';

const testimonials = [
  { quote: "Sarah takes the initiative to identify problems and devise solutions. She has shown strong communication skills and the ability to inspire respect and cooperation in teammates.", name: "Afonso Caetano", role: "IT Director / CIO/CTG", initials: "AC" },
  { quote: "Sarah is an extremely focused and competent professional who consistently delivers efficient, exceptional focus and dedication, successfully achieving all company targets.", name: "Paulo Sidney", role: "Business Agility Manager", initials: "PS" },
  { quote: "I had the opportunity to work with Sarah on projects where she consistently demonstrated exceptional focus and competence.", name: "Dario Piva", role: "Solutions Architect", initials: "DP" },
  { quote: "I worked with Sarah — she is a focused person who knows what she wants, is a team player, and consistently strives to achieve her goals.", name: "Bruno Mondin", role: "VP of Venture Capital", initials: "BM" },
];

/* ─────────────────────────────────────────────────────────
   FloatCard — absolutely positioned decoration on the hero.
   position/size stay inline — they're unique per instance.
───────────────────────────────────────────────────────── */
function FloatCard({ className, style, label, detail, children }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div className={`${s.floatCard} ${className || ''}`} style={{ position: 'absolute', zIndex: 3, ...style }}>
      <button
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`${label} — ${open ? 'collapse' : 'expand'}`}
        className={s.floatCardBtn}
      >
        {children}
        {open && detail && (
          <div className={s.floatCardDetail}>
            <p className={s.floatCardDetailText}>{detail}</p>
          </div>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HomePage
───────────────────────────────────────────────────────── */
export default function HomePage() {
  /* Scroll-reveal observer */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/*
        Global CSS that cannot live in a scoped CSS Module:
        — .reveal / .revealed  → added dynamically by IntersectionObserver
        — .fa–.fe              → animation names passed as className prop strings
        — @keyframes           → must be global
        — focus-visible rules  → override browser defaults inside the dark widget
      */}
      <style>{`
        .reveal   { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .revealed { opacity: 1; transform: none; }

        @keyframes float-a { 0%,100%{transform:rotate(-5deg) translateY(0)} 50%{transform:rotate(-5deg) translateY(-7px)} }
        @keyframes float-b { 0%,100%{transform:rotate(4deg) translateY(0)} 50%{transform:rotate(4deg) translateY(-9px)} }
        @keyframes float-c { 0%,100%{transform:rotate(7deg) translateY(0)} 50%{transform:rotate(7deg) translateY(-6px)} }
        @keyframes float-d { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-8px)} }
        @keyframes float-e { 0%,100%{transform:rotate(-8deg) translateY(0)} 50%{transform:rotate(-8deg) translateY(-5px)} }
        .fa { animation: float-a 5.2s ease-in-out infinite; }
        .fb { animation: float-b 6.1s ease-in-out infinite; }
        .fc { animation: float-c 4.8s ease-in-out infinite; }
        .fd { animation: float-d 5.7s ease-in-out infinite; }
        .fe { animation: float-e 6.4s ease-in-out infinite; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

        /* Focus rings: dark widget needs light outlines, light page needs dark outlines */
        .hero-widget-region :focus-visible { outline: var(--focus-ring-on-dark) !important; outline-offset: var(--focus-ring-offset); }
        .nav-pill:focus-visible            { outline: var(--focus-ring-on-dark) !important; outline-offset: var(--focus-ring-offset); }
        :focus-visible                     { outline: var(--focus-ring-on-light); outline-offset: var(--focus-ring-offset); border-radius: 4px; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal * { opacity: 1 !important; transform: none !important; transition: none !important; }
          .fa,.fb,.fc,.fd,.fe { animation: none !important; }
        }
      `}</style>

      <main id="main-content" className={s.main}>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className={s.hero} aria-labelledby="hero-heading">

          {/* Floating decoration cards */}
          <FloatCard className="fa" style={{ top: '18%', left: '4%', width: '168px' }}
            label="Design Tokens"
            detail="Semantic tokens for color, spacing, and typography — applied consistently across every component.">
            <p className={s.floatLabel}>Design Tokens</p>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '0.5rem' }}>
              {['#0f0f0e','#525252','#9ca3af','#e2e1dc','#f0f0ee'].map(c => (
                <div key={c} style={{ width: '18px', height: '18px', borderRadius: '4px', background: c, border: '1px solid rgba(0,0,0,0.06)', flexShrink: 0 }} />
              ))}
            </div>
            <p className={s.floatMono} style={{ color: '#374151' }}>color.neutral.*</p>
          </FloatCard>

          <FloatCard className="fb" style={{ top: '10%', right: '4%', width: '192px' }}
            label="WCAG 2.2 Level AA"
            detail="All components meet EN 301 549 and WCAG 2.2 Level AA. Tested with JAWS, NVDA, VoiceOver and keyboard-only navigation.">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} weight="bold" color="#16a34a" aria-hidden="true" />
              </div>
              <p className={s.floatMono} style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.58rem' }}>WCAG 2.2 — Level AA</p>
            </div>
            {['Contrast ratio 7.2:1','Focus indicators','Alt text present','Keyboard navigable'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.22rem' }}>
                <Check size={10} weight="bold" color="#16a34a" aria-hidden="true" />
                <p className={s.floatMono}>{item}</p>
              </div>
            ))}
          </FloatCard>

          <FloatCard className="fc" style={{ bottom: '22%', left: '3%', width: '158px' }}
            label="Button / Primary component"
            detail="All components meet 44×44px minimum touch target. Focus rings meet 3:1 contrast.">
            <p className={s.floatLabel}>Button / Primary</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '0.4rem' }}>
              <div style={{ background: '#0f0f0e', color: '#fff', borderRadius: '100px', padding: '0.3rem 0.75rem', fontSize: '0.7rem', fontFamily: 'var(--font-body)', textAlign: 'center' }}>Get started</div>
              <div style={{ color: '#0f0f0e', borderRadius: '100px', padding: '0.3rem 0.75rem', fontSize: '0.7rem', fontFamily: 'var(--font-body)', border: '1px solid #e2e1dc', textAlign: 'center' }}>Learn more</div>
              <div style={{ background: '#f0f0ee', color: '#0f0f0e', borderRadius: '100px', padding: '0.3rem 0.75rem', fontSize: '0.7rem', fontFamily: 'var(--font-body)', textAlign: 'center' }}>Secondary</div>
            </div>
          </FloatCard>

          <FloatCard className="fd" style={{ bottom: '14%', right: '3%', width: '172px' }}
            label="Type Scale"
            detail="Fluid type scale using clamp(). Body text minimum 1rem / 16px everywhere.">
            <p className={s.floatLabel}>Type Scale</p>
            <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                { l: 'Display', fs: '22px', w: 700 },
                { l: 'Heading', fs: '15px', w: 600 },
                { l: 'Body',    fs: '12px', w: 400 },
                { l: 'Caption', fs: '10px', w: 400 },
              ].map(({ l, fs, w }) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className={s.floatMono} style={{ color: '#9ca3af', width: '46px', flexShrink: 0 }}>{l}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: fs, fontWeight: w, color: '#0f0f0e', lineHeight: 1.2 }}>Aa</span>
                </div>
              ))}
            </div>
          </FloatCard>

          <FloatCard className="fe" style={{ top: '46%', right: '2%', width: '140px' }}
            label="Audit Result"
            detail="Axe DevTools + manual screen reader testing. Zero critical accessibility issues.">
            <p className={s.floatLabel}>Audit Result</p>
            <div style={{ margin: '0.5rem 0 0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span className={s.floatMono}>Score</span>
                <span className={s.floatMono} style={{ color: '#16a34a', fontWeight: 600 }}>94 / 100</span>
              </div>
              <div style={{ height: '5px', background: '#f0f0ee', borderRadius: '3px' }}>
                <div style={{ width: '94%', height: '100%', background: '#16a34a', borderRadius: '3px' }} />
              </div>
            </div>
            <p className={s.floatMono}>0 critical · 2 minor</p>
          </FloatCard>

          {/* ── Central widget — extracted to its own component ── */}
          <PortfolioWidget />

        </section>

        {/* ── PROJECTS ──────────────────────────────────── */}
        <section className={s.sectionPaper} aria-labelledby="projects-heading" id="projects">
          <div className={s.sectionInner}>
            <div className="reveal" style={{ marginBottom: '3rem' }}>
              <div className={s.sectionEyebrow}>
                <span aria-hidden="true" className={s.eyebrowLine} />
                Selected work
              </div>
              <div className={s.sectionTitleRow}>
                <h2 id="projects-heading" className={s.sectionTitle}>Case Studies</h2>
                <Link to="/projects" aria-label="See all projects" className={s.seeAll}>
                  See all <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className={`${s.projectsGrid} reveal`}>
              {projects.map((project, i) => (
                <div key={project.slug} className={s.cardLift}>
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section className={s.sectionWhite} aria-labelledby="testimonials-heading">
          <div className={s.sectionInner}>
            <div className="reveal" style={{ marginBottom: '3rem' }}>
              <div className={s.sectionEyebrow}>
                <span aria-hidden="true" className={s.eyebrowLine} />
                Feedback
              </div>
              <h2 id="testimonials-heading" className={s.sectionTitle}>Colleagues &amp; Clients</h2>
            </div>
            <div className={`${s.testiGrid} reveal`}>
              {testimonials.map((t) => (
                <blockquote key={t.name} className={s.testimonialCard}>
                  <p className={s.testimonialQuote}>"{t.quote}"</p>
                  <footer className={s.testimonialFooter}>
                    <div aria-hidden="true" className={s.testimonialAvatar}>{t.initials}</div>
                    <div>
                      <div className={s.testimonialName}>{t.name}</div>
                      <div className={s.testimonialRole}>{t.role}</div>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
