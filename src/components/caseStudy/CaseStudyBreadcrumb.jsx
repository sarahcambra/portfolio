import { Link } from 'react-router-dom';
import c from './CaseStudyChrome.module.css';

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 8H3M7 12l-4-4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CaseStudyBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className={c.breadcrumb}>
      <Link to="/projects" className={c.backLink}>
        <BackIcon />
        All Projects
      </Link>
    </nav>
  );
}
