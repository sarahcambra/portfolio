import { Link } from 'react-router-dom';
import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  ArrowUp,
} from '@phosphor-icons/react';
import Button from './Button';
import s from '../styles/Footer.module.css';

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Case Studies', to: '/projects' },
  { label: 'About',    to: '/about' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={s.footer} aria-label="Site footer">
      <div className={s.inner}>

        {/* ── Column 1: Brand ── */}
        <div className={s.brandCol}>
          <p className={s.brandName}>Sarah Beú</p>
          <p className={s.brandSub}>Accessible Product Designer</p>
          <p className={s.brandDesc}>
            Designing inclusive digital products with 14 years of experience
            across UX, accessibility, and design systems.
          </p>
        </div>

        {/* ── Column 2: Navigation ── */}
        <nav className={s.navCol} aria-label="Footer navigation">
          <p className={s.colTitle}>Navigation</p>
          <div className={s.linkStack}>
            {navLinks.map(({ label, to }) => (
              <Link key={to} to={to} className={s.linkItem}>
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Column 3: Connect ── */}
        <div className={s.contactCol}>
          <p className={s.colTitle}>Connect</p>
          <div className={s.linkStack}>
            <a href="mailto:sarahborgesbeu@gmail.com" className={s.linkItem}>
              <EnvelopeSimple size={20} /> 
              <span>Email</span>
            </a>
            <a href="https://linkedin.com/in/sarahbeu/" target="_blank" rel="noreferrer" className={s.linkItem}>
              <LinkedinLogo size={20} /> 
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/sarahbeu" target="_blank" rel="noreferrer" className={s.linkItem}>
              <GithubLogo size={20} /> 
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={s.bottom}>
        <div className={s.bottomLeft}>
          <span className={s.copy}>© 2026 Sarah Beú. All rights reserved.</span>
          <span className={s.available} role="status">
            <span className={s.availableDot} />
            Available for new projects
          </span>
        </div>
        
        <Button
          type="button"
          onClick={scrollToTop}
          variant="secondary"
          surface="inverse"
          size="sm"
          className={s.backToTop}
        >
          <ArrowUp size={14} weight="bold" aria-hidden="true" />
          <span>Back to top</span>
        </Button>
      </div>
    </footer>
  );
}