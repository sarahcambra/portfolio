import { Link } from 'react-router-dom';
import c from './CaseStudyChrome.module.css';

export default function CaseStudyNextProject({ slug, title }) {
  if (!slug || !title) return null;
  return (
    <nav className={c.nextProject} aria-label="Next case study">
      <Link to={`/projects/${slug}`} className={c.nextLink}>
        <span className={c.nextLabel}>Next case study</span>
        <span className={c.nextTitle}>{title} →</span>
      </Link>
    </nav>
  );
}
