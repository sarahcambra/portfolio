import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/CaseStudyPage.module.css';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';
import CaseStudyBreadcrumb from '../components/caseStudy/CaseStudyBreadcrumb';
import CaseStudyNextProject from '../components/caseStudy/CaseStudyNextProject';
import { getNextCaseStudy } from '../utils/caseStudyNav';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const next = getNextCaseStudy(slug);

  return (
    <main
      id="main-content"
      className={s.main}
      style={project.accent ? { '--accent': project.accent } : undefined}
    >
      <CaseStudyBreadcrumb />

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
            src={resolvePublicUrl(project.imageUrl)}
            alt={`${project.company} project`}
            className={s.cover}
            onError={e => { e.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      <article className={s.article}>
        <section className={s.section}>
          <h2 className={s.h2}>Overview</h2>
          <p className={s.body}>{project.description}</p>
        </section>

        <section className={s.section} aria-labelledby="scope-heading">
          <h2 id="scope-heading" className={s.h2}>Scope &amp; context</h2>
          <dl className={s.metaSummary}>
            <div className={s.metaRow}>
              <dt className={s.metaDt}>Company</dt>
              <dd className={s.metaDd}>{project.company}</dd>
            </div>
            <div className={s.metaRow}>
              <dt className={s.metaDt}>Timeline</dt>
              <dd className={s.metaDd}>{project.year}</dd>
            </div>
            <div className={s.metaRow}>
              <dt className={s.metaDt}>Role</dt>
              <dd className={s.metaDd}>{project.role}</dd>
            </div>
          </dl>
          <p className={s.body}>{project.subtitle}</p>
        </section>
      </article>

      <CaseStudyNextProject slug={next.slug} title={next.title} />
    </main>
  );
}
