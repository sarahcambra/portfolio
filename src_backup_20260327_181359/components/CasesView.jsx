import MiniProjectCard from './MiniProjectCard';
import s from '../styles/CasesView.module.css';

export default function CasesView({ projects }) {
  return (
    <div className={s.scroll} role="list" aria-label="Case studies">
      {projects.map((project) => (
        <div key={project.slug} className={s.cardSlot} role="listitem">
          <MiniProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
