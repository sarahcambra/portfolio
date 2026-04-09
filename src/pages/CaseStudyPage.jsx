import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data';
import s from '../styles/Page.module.css';
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
      className={s.pageMainNav}
      style={project.accent ? { '--accent': project.accent } : undefined}
    >
      <CaseStudyBreadcrumb />

      <header className={s.cspHero} style={{ '--hero-bg': project.color }}>
        <div className={s.cspHeroInner}>
          <p className={s.cspCompany}>{project.company} · {project.year}</p>
          <h1 className={s.cspTitle}>{project.title}</h1>
          <p className={s.cspSubtitle}>{project.subtitle}</p>
          <div className={s.cspTags}>
            {project.tags.map(tag => (
              <span key={tag} className={s.cspTag}>{tag}</span>
            ))}
          </div>
          <p className={s.cspRole}>{project.role}</p>
        </div>
      </header>

      {project.imageUrl && (
        <div className={s.cspCoverWrap}>
          <img
            src={resolvePublicUrl(project.imageUrl)}
            alt={`${project.company} project`}
            className={s.cspCover}
            onError={e => { e.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      <article className={s.cspArticle}>
        <section className={s.cspSection}>
          <h2 className={s.cspH2}>Overview</h2>
          <p className={s.cspBody}>{project.description}</p>
        </section>

        <section className={s.cspSection} aria-labelledby="scope-heading">
          <h2 id="scope-heading" className={s.cspH2}>Scope &amp; context</h2>
          <dl className={s.cspMetaSummary}>
            <div className={s.cspMetaRow}>
              <dt className={s.cspMetaDt}>Company</dt>
              <dd className={s.cspMetaDd}>{project.company}</dd>
            </div>
            <div className={s.cspMetaRow}>
              <dt className={s.cspMetaDt}>Timeline</dt>
              <dd className={s.cspMetaDd}>{project.year}</dd>
            </div>
            <div className={s.cspMetaRow}>
              <dt className={s.cspMetaDt}>Role</dt>
              <dd className={s.cspMetaDd}>{project.role}</dd>
            </div>
          </dl>
          <p className={s.cspBody}>{project.subtitle}</p>
        </section>
      </article>

      <CaseStudyNextProject slug={next.slug} title={next.title} />
    </main>
  );
}
