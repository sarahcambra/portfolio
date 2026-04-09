import { Link } from 'react-router-dom';
import s from '../styles/ProjectCard.module.css';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

export default function ProjectCard({ project, index, className, style, ...rest }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={[s.link, className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      <article
        className={s.card}
        style={{
          '--card-bg': project.color,
          '--card-accent': project.accent ?? 'var(--color-green)',
        }}
      >
        <div className={s.imageWrap}>
          <img
            key={project.slug}
            src={resolvePublicUrl(project.imageUrl)}
            alt={`${project.company} project screenshot`}
            className={s.image}
            style={{
              ...(project.imageObjectPosition != null && {
                objectPosition: project.imageObjectPosition,
              }),
              ...(project.imageObjectFit != null && {
                objectFit: project.imageObjectFit,
              }),
            }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add(s.placeholder);
            }}
          />
        </div>

        <div className={s.body}>
          <div className={s.company}>
            <span className={s.companyDot} aria-hidden="true" />
            {project.company}
          </div>
          <h3 className={s.title}>{project.title}</h3>
          <p className={s.subtitle}>{project.subtitle}</p>

          <div className={s.tags}>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={s.tag}>{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className={`${s.tag} ${s.tagMore}`}>+{project.tags.length - 3}</span>
            )}
          </div>

          <div className={s.cta}>
            <span>View Case Study</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
