import { Link } from 'react-router-dom';
import s from '../styles/MiniProjectCard.module.css';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

export default function MiniProjectCard({ project, className, ...rest }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={[s.card, className].filter(Boolean).join(' ')}
      style={{ '--mini-accent': project.accent ?? '#34d399' }}
      {...rest}
    >
      <div className={s.imageWrapper}>
        <img 
          src={resolvePublicUrl(project.imageUrl)} 
          alt="" 
          className={s.image}
          onError={(e) => { 
            e.target.style.display = 'none'; 
            e.target.parentElement.style.background = 'rgba(255,255,255,0.05)';
          }} 
        />
      </div>
      <div className={s.content}>
        <div className={s.header}>
          <span className={s.dot}></span>
          <span className={s.company}>{project.company}</span>
        </div>
        <span className={s.title}>{project.title}</span>
      </div>
    </Link>
  );
}