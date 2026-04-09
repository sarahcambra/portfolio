import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { visibleProjects } from '../data';
import s from '../styles/Page.module.css';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    reveals.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main id="main-content" className={s.pageMainNav}>
      <div className={s.projectsTopBand}>
        <header className={s.projectsHeader}>
          <p className={s.projectsEyebrow}>Selected Work</p>
          <h1 className={s.projectsTitle}>Case Studies</h1>
          <p className={s.projectsSubtitle}>
            A selection of projects spanning accessible design systems, platform design, UX audits, and research.
          </p>
        </header>
      </div>

      <div className={s.projectsContentBand}>
        <section className={s.projectsGrid} aria-label="All projects">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              className="reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
