import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/projects';
import s from '../styles/CaseStudyPage.module.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main className={s.main}>

      <div className={s.breadcrumb}>
        <Link to="/projects" className={s.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Projects
        </Link>
      </div>

      {/* --hero-bg carries the per-project color — the only dynamic style */}
      <header className={s.hero} style={{ '--hero-bg': project.color }}>
        <div className={s.heroInner}>
          <p className={s.company}>{project.company} · {project.year}</p>
          <h1 className={s.title}>{project.title}</h1>
          <p className={s.subtitle}>{project.subtitle}</p>
          <div className={s.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={s.tag}>{tag}</span>
            ))}
          </div>
          <p className={s.role}>{project.role}</p>
        </div>
      </header>

      {project.imageUrl && (
        <div className={s.coverWrap}>
          <img
            src={project.imageUrl}
            alt={`${project.company} project`}
            className={s.cover}
            onError={e => { e.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      {/* Content placeholder — replace with your actual case study content */}
      <article className={s.article}>
        <section className={s.section}>
          <h2 className={s.h2}>Overview</h2>
          <p className={s.body}>{project.description}</p>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Challenge</h2>
          <p className={s.body}>
            Add your challenge description here. What problem were you solving? What were the constraints?
          </p>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Process</h2>
          <p className={s.body}>
            Describe your design process, methods used, research conducted, and key decisions made.
          </p>
        </section>

        <section className={s.section}>
          <h2 className={s.h2}>Outcome</h2>
          <p className={s.body}>
            What was the result? What impact did the work have?
          </p>
        </section>
      </article>

      <nav className={s.nextProject} aria-label="Next project">
        <Link to={`/projects/${next.slug}`} className={s.nextLink}>
          <span className={s.nextLabel}>Next case study</span>
          <span className={s.nextTitle}>{next.title} →</span>
        </Link>
      </nav>

    </main>
  );
}
