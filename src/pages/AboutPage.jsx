import { useEffect } from 'react';
import {
  LinkedinLogo,
  DownloadSimple,
} from '@phosphor-icons/react';
import SkillsTable from '../components/SkillsTable';
import s from '../styles/AboutPage.module.css';
import Carousel from '../components/carousel';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

/* ── Timeline milestones — text paired with each milestone ── */
const MILESTONES = [
  {
    title: 'IT Transitions & Tax Compliance',
    text: 'My path to design wasn\'t typical. I spent many years in the middle of IT transitions and tax compliance, helping companies move from paper to digital. It was about changing how people work within strict legal and technical limits.',
  },
  {
    title: 'Business, Systems & Stakeholders',
    text: 'Because of this, I don\'t just think about the user. I instinctively see the business side and the stakeholder\'s view. I understand engineering constraints because I\'ve lived close to that world. Whether architecting a design system or auditing for accessibility, I\'m looking at the "why" behind the business.',
  },
  {
    title: 'Hyper Island & Vibe Coding',
    text: 'Recently, I studied UX Design at Hyper Island here in Sweden. Even more recently, I started vibe coding. I always thought manual coding was boring and repetitive, so I never wanted to be a developer. But now, AI removes that layer. It allows me to stay a designer while being able to think in code. This ensures my designs are technically sound before they even reach the engineering team.',
  },
];

/* ── Masonry grid ── */
function MasonryGrid({ photos }) {
  return (
    <div className={s.masonry}>
      {photos.map((photo, i) => (
        <div key={i} className={s.masonryItem}>
          <img
            src={photo.src}
            alt={photo.alt}
            className={s.masonryImg}
            onError={e => {
              const wrap = e.target.parentElement;
              e.target.style.display = 'none';
              wrap.style.cssText += 'display:flex;align-items:center;justify-content:center;min-height:160px;';
              const ph = document.createElement('span');
              ph.textContent = 'Photo coming soon';
              ph.style.cssText = 'font-family:var(--font-mono);font-size:var(--text-base);color:var(--color-ink-faint);letter-spacing:0.08em;text-align:center;padding:1rem;';
              wrap.appendChild(ph);
            }}
          />
        </div>
      ))}
    </div>
  );
}

const PATH_PHOTOS = [
  { src: resolvePublicUrl('/assets/about/path-1.png'), alt: 'Post-it notes workshop at Hyper Island' },
  { src: resolvePublicUrl('/assets/about/path-2.png'), alt: 'Presenting research insights' },
];

const MORE_PHOTOS = [
  { src: resolvePublicUrl('/assets/about/more-1.png'), alt: 'Arcanimal — system to support abandoned animals' },
  { src: resolvePublicUrl('/assets/about/more-2.png'), alt: 'Volunteering with ice skating club in Karlskrona' },
];

/* ── Page ── */
export default function AboutPage() {
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
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main id="main-content" className={s.main}>

      {/* ════════════════════════════════════════
          HERO — dark, photo rising from bottom
      ════════════════════════════════════════ */}
      <section className={s.hero} aria-labelledby="about-heading">
        <div className={s.heroGrid} aria-hidden="true" />

        <div className={s.heroInner}>
          <div className={s.heroText}>
            <p className={s.heroEyebrow}>Who I Am</p>

            <h1 id="about-heading" className={s.heroTitle}>
              Sarah<br />
              <span className={s.heroTitleAccent}>Beú</span>
            </h1>

            <p className={s.heroRole}>
              Product Designer
              <span className={s.heroRoleDot} aria-hidden="true" />
              Accessibility Specialist
            </p>

            <div className={s.heroBio}>
              <p className={s.heroBioText}>
                I am a designer who loves complexity. While many designers
                prefer a blank canvas, I am at my best when faced with a
                messy puzzle of technical constraints, legal requirements,
                and user needs.
              </p>
            </div>

            <div className={s.heroLinks}>
              <a
                href={resolvePublicUrl('/assets/sarah-resume-pdf/sarah-resume.pdf')}
                download
                aria-label="Download Sarah's résumé"
                className={s.heroLinkPrimary}
              >
                <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                Résumé
              </a>
              <a
                href="https://linkedin.com/in/sarahbeu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sarah's LinkedIn profile — opens in a new tab"
                className={s.heroLinkGhost}
              >
                <LinkedinLogo size={16} weight="fill" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className={s.heroImgWrap} aria-hidden="true">
            <img
              src={resolvePublicUrl('/assets/about/sarah-photo.png')}
              alt=""
              className={s.heroImg}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className={s.heroImgOverlay} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SKILLS — light section on white
      ════════════════════════════════════════ */}
      <SkillsTable />

      {/* ════════════════════════════════════════
          MY PATH — timeline + single photo
      ════════════════════════════════════════ */}
      <section className={s.pathSection} aria-labelledby="path-heading">
        <div className={s.sectionInner}>
          <header className={`${s.pathHeader} reveal`}>
            <p className={s.sectionEyebrow}>
              <span className={s.eyebrowLine} aria-hidden="true" />
              Background
            </p>
            <div className={s.pathHeaderRow}>
              <h2 id="path-heading" className={s.pathTitle}>
                My path to product design
              </h2>
              <p className={s.pathLead}>
                Three chapters from compliance and systems work to design craft — each step
                shaped how I partner with teams today.
              </p>
            </div>
          </header>

          <div className={`${s.pathGrid} reveal`}>
            <div className={s.pathStack} role="list" aria-label="Career milestones">
              {MILESTONES.map((m, i) => (
                <article key={m.title} className={s.pathCard} role="listitem">
                  <div className={s.pathCardTop}>
                    <span className={s.pathStep} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={s.pathCardTitle}>{m.title}</h3>
                  </div>
                  <p className={s.pathCardText}>{m.text}</p>
                </article>
              ))}
            </div>

            <aside className={s.pathVisual} aria-label="Photos from the journey">
              {PATH_PHOTOS.map((photo, i) => (
                <figure key={photo.src} className={s.pathFigure}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={s.pathPhoto}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </figure>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          A LITTLE MORE
      ════════════════════════════════════════ */}
      <section className={s.moreSection} aria-labelledby="more-heading">

        <div className={s.moreHeader}>
          <p className={s.sectionEyebrow}>
            <span className={s.eyebrowLine} aria-hidden="true" />
            Beyond the screen
          </p>
          <h2 id="more-heading" className={s.sectionTitle}>
            A little more
          </h2>
        </div>

        <div className={s.moreGrid}>
          <div className={s.morePhotoCol}>
            <Carousel photos={MORE_PHOTOS} />
          </div>

          <div className={s.moreTextCol}>
            <blockquote className={s.morePullQuote}>
              "I believe in being useful where I live."
            </blockquote>

            <div className={s.moreBody}>
              <p>
                My work isn't limited to a screen; I apply the same "get it done"
                mindset to my community as I do to my products. Currently, I
                volunteer with my daughter's ice skating club here in Karlskrona,
                handling everything from their website to helping in the club store.
              </p>
              <p>
                This same drive led me to co-found Arcanimal, where I helped build
                a system to support abandoned animals. For me, it is about building
                the functional systems that help organizations scale their impact
                when it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
