import MiniProjectCard from './MiniProjectCard';
import s from '../styles/CasesView.module.css';

export default function CasesView({ projects }) {
  return (
    <div className={s.scroll} role="list" aria-label="Case study links">
      {projects.map((project) => (
        <MiniProjectCard
          key={project.slug}
          project={project}
          className={s.cardSlot}
          role="listitem"
        />
      ))}
    </div>
  );
}
