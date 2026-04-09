import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowRight, ChatCircleDots } from '@phosphor-icons/react';
import ProjectCard from '../components/ProjectCard';
import PortfolioWidget from '../components/PortfolioWidget';
import FloatCard from '../components/FloatCard';
import ScrollFloatDeck, { renderFloatDeckCardBody } from '../components/ScrollFloatDeck';
import Button from '../components/Button';
import s from '../styles/Page.module.css';
import { projects, FLOAT_CARDS_DECK, FLOAT_ANIM_CLASSES } from '../data';

/** Screen positions for the five hero floats (which *deck* row shows is random — see below). */
const HERO_FLOAT_POSITIONS = [
  { style: { top: '18%', left: '4%', width: 'min(92vw, 200px)' } },
  { style: { top: '10%', right: '4%', width: 'min(92vw, 220px)' } },
  { style: { bottom: '22%', left: '3%', width: 'min(92vw, 200px)' } },
  { style: { bottom: '14%', right: '3%', width: 'min(92vw, 280px)' } },
  { style: { top: '46%', right: '2%', width: 'min(92vw, 220px)' } },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Random 5 cards + random motion classes per pageload (module cache = stable in React Strict Mode).
 */
function buildRandomHeroFloatLayout() {
  const deck = shuffle(FLOAT_CARDS_DECK);
  const anims = shuffle([...FLOAT_ANIM_CLASSES]);
  const n = FLOAT_CARDS_DECK.length;
  if (n === 0) return [];
  return HERO_FLOAT_POSITIONS.map((pos, i) => {
    const item = deck[i % deck.length];
    return {
      floatKey: `hero-${item.id}-slot-${i}`,
      className: anims[i % anims.length],
      style: pos.style,
      item,
    };
  });
}

let heroFloatLayoutCache = null;
function getHeroFloatLayoutOnce() {
  if (!heroFloatLayoutCache) heroFloatLayoutCache = buildRandomHeroFloatLayout();
  return heroFloatLayoutCache;
}

/** Featured on the home outline as H3s only (AxessLab, Arcanimal, Intelligyn, Mentatt). */
const HOME_FEATURED_SLUGS = [
  'axesslab-design-system',
  'arcanimal-platform',
  'intelligyn-redesign',
  'mentatt-research',
];

const homeFeaturedProjects = HOME_FEATURED_SLUGS.map((slug) =>
  projects.find((p) => p.slug === slug)
).filter(Boolean);

const testimonials = [
  { quote: "Sarah takes the initiative to identify problems and devise solutions. She has shown strong communication skills and the ability to inspire respect and cooperation in teammates.", name: "Afonso Caetano", role: "IT Director / CIO/CTG", initials: "AC" },
  { quote: "Sarah is an extremely focused and competent professional who consistently delivers efficient, exceptional focus and dedication, successfully achieving all company targets.", name: "Paulo Sidney", role: "Business Agility Manager", initials: "PS" },
  { quote: "I had the opportunity to work with Sarah on projects where she consistently demonstrated exceptional focus and competence.", name: "Dario Piva", role: "Solutions Architect", initials: "DP" },
  { quote: "I worked with Sarah — she is a focused person who knows what she wants, is a team player, and consistently strives to achieve her goals.", name: "Bruno Mondin", role: "VP of Venture Capital", initials: "BM" },
];

export default function HomePage() {
  const heroFloatLayout = getHeroFloatLayoutOnce();
  const heroRef = useRef(null);
  const [openFloatId, setOpenFloatId] = useState(null);
  const [widgetView, setWidgetView] = useState('chat');
  /** Fixed scroll-deck only after hero has cleared the viewport — avoids stacking on hero floats */
  const [scrollDeckActive, setScrollDeckActive] = useState(false);

  const handleWidgetViewChange = useCallback((id) => {
    setOpenFloatId(null);
    setWidgetView(id);
  }, []);

  /** Scroll to hero widget and open Chat tab (for CTA below the fold) */
  const goToChat = useCallback(() => {
    setWidgetView('chat');
    setOpenFloatId(null);
    const el = heroRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
    window.setTimeout(() => {
      document.getElementById('widget-tab-chat')?.focus();
    }, reduceMotion ? 0 : 450);
  }, []);

  const toggleFloat = useCallback((id, force) => {
    if (force === false) {
      setOpenFloatId(null);
      return;
    }
    setOpenFloatId((cur) => (cur === id ? null : id));
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const syncScrollDeck = () => {
      const pastHero = el.getBoundingClientRect().bottom <= 0;
      setScrollDeckActive(pastHero);
      if (!pastHero) {
        setOpenFloatId((cur) => (typeof cur === 'string' && cur.includes('__') ? null : cur));
      }
    };
    syncScrollDeck();
    window.addEventListener('scroll', syncScrollDeck, { passive: true });
    window.addEventListener('resize', syncScrollDeck);
    return () => {
      window.removeEventListener('scroll', syncScrollDeck);
      window.removeEventListener('resize', syncScrollDeck);
    };
  }, []);

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
        :focus-visible                     { outline: var(--focus-ring-on-light); outline-offset: var(--focus-ring-offset); border-radius: 4px; }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal * { opacity: 1 !important; transform: none !important; transition: none !important; }
          .fa,.fb,.fc,.fd,.fe { animation: none !important; }
        }
      `}</style>

      <main id="main-content" className={s.pageMain}>
        <h1 className="sr-only">Portfolio — Sarah Beú</h1>

        {/* ── HERO ────────────────────────────────────────── */}
        <section ref={heroRef} className={s.homeHero} aria-labelledby="dashboard-heading">

          <h2 id="dashboard-heading" className="sr-only">
            Dashboard &amp; Design Resources
          </h2>

          <PortfolioWidget view={widgetView} onViewChange={handleWidgetViewChange} />

          {/* Floats after widget in DOM + z-index so they stay clickable and expand above the hero */}
          {heroFloatLayout.map(({ floatKey, className, style, item }) => (
            <FloatCard
              key={floatKey}
              floatId={floatKey}
              isOpen={openFloatId === floatKey}
              onToggle={toggleFloat}
              label={`${item.badge}: ${item.title}`}
              className={className}
              style={style}
              detail={item.detail}
            >
              {renderFloatDeckCardBody(item)}
            </FloatCard>
          ))}

        </section>

        <ScrollFloatDeck
          active={scrollDeckActive}
          openFloatId={openFloatId}
          onToggle={toggleFloat}
          progressAnchorRef={heroRef}
        />

        {/* ── PROJECTS ──────────────────────────────────── */}
        <section className={s.homeSectionPaper} aria-labelledby="projects-heading" id="projects">
          <div className={s.homeSectionInner}>
            <div className={`${s.homeChatCtaRow} reveal`}>
              <p className={s.homeChatCtaLead}>Have a question? I can chat about my work in my own words.</p>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={goToChat}
                className={s.homeChatCtaBtn}
              >
                <ChatCircleDots size={18} weight="bold" aria-hidden="true" />
                Chat with me
              </Button>
            </div>

            <div className="reveal" style={{ marginBottom: '3rem' }}>
              <div className={s.homeSectionEyebrow}>
                <span aria-hidden="true" className={s.homeEyebrowLine} />
                Selected work
              </div>
              <div className={s.homeSectionTitleRow}>
                <h2 id="projects-heading" className={s.homeSectionTitle}>Selected Case Studies</h2>
                <Button
                  as={Link}
                  to="/projects"
                  variant="secondary"
                  size="md"
                >
                  See all <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className={`${s.homeProjectsGrid} reveal`}>
              {homeFeaturedProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                  className={s.homeCardLift}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section className={s.homeSectionTestimonials} aria-labelledby="testimonials-heading">
          <div className={s.homeSectionInner}>
            <div className="reveal" style={{ marginBottom: '3rem' }}>
              <div className={s.homeSectionEyebrow}>
                <span aria-hidden="true" className={s.homeEyebrowLine} />
                What they say
              </div>
              <h2 id="testimonials-heading" className={s.homeSectionTitle}>
                Colleagues &amp; clients
              </h2>
            </div>
            <div className={`${s.homeTestiGrid} reveal`}>
              {testimonials.map((t) => (
                <blockquote key={t.name} className={s.homeTestimonialCard}>
                  <span aria-hidden="true" className={s.homeTestimonialMark}>&ldquo;</span>
                  <p className={s.homeTestimonialQuote}>{t.quote}</p>
                  <footer className={s.homeTestimonialFooter}>
                    <div aria-hidden="true" className={s.homeTestimonialAvatar}>{t.initials}</div>
                    <div>
                      <div className={s.homeTestimonialName}>{t.name}</div>
                      <div className={s.homeTestimonialRole}>{t.role}</div>
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
