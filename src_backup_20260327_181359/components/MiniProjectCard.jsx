import { Link } from 'react-router-dom';
import s from '../styles/MiniProjectCard.module.css';

export default function MiniProjectCard({ project }) {
  return (
    <Link 
      to={`/projects/${project.slug}`} 
      className={s.card}
      aria-label={`View ${project.title}`}
    >
      <div className={s.imageWrapper}>
        <img 
          src={project.imageUrl} 
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
        <h4 className={s.title}>{project.title}</h4>
      </div>
    </Link>
  );
}