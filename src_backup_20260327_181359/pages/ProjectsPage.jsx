import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import s from '../styles/ProjectsPage.module.css';

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
    <main className={s.main}>
      <header className={s.header}>
        <p className={s.eyebrow}>Selected Work</p>
        <h1 className={s.title}>Case Studies</h1>
        <p className={s.subtitle}>
          A selection of projects spanning accessible design systems,<br />
          platform design, UX audits, and research.
        </p>
      </header>

      <section className={s.grid} aria-label="All projects">
        {projects.map((project, i) => (
          <div key={project.slug} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </section>
    </main>
  );
}
