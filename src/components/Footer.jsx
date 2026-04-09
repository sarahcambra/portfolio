import { Link } from 'react-router-dom';
import { EnvelopeSimple, LinkedinLogo, GithubLogo, ArrowUp } from '@phosphor-icons/react';
import Button from './Button';
import s from '../styles/Footer.module.css';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={s.footer} aria-label="Site footer">
      <div className={s.cta}>
        <div className={s.ctaText}>
          <p className={s.brandName}>Sarah Beú</p>
          <p className={s.ctaEyebrow}><span className={s.ctaEyebrowDot} aria-hidden />Available</p>
          <h2 className={s.brandSub}>Let&apos;s build something <em>great</em>.</h2>
          <div className={s.socialRow}>
            <a href="mailto:sarahborgesbeu@gmail.com" className={s.socialIcon} aria-label="Email sarahborgesbeu@gmail.com">
              <EnvelopeSimple size={22} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/sarahbeu/"
              className={s.socialIcon}
              aria-label="Sarah Beú on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinLogo size={22} aria-hidden />
            </a>
            <a
              href="https://github.com/sarahcambra"
              className={s.socialIcon}
              aria-label="Sarah on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogo size={22} aria-hidden />
            </a>
          </div>
        </div>
        <div className={s.ctaActions}>
          <Button as={Link} to="/about" variant="primary" surface="inverse">Get in touch</Button>
          <Button as={Link} to="/projects" variant="secondary" surface="inverse">View work</Button>
        </div>
      </div>

      <div className={s.bottom}>
        <span className={s.copy}>© 2026 Sarah Beú</span>
        <Button onClick={scrollToTop} variant="ghost" size="xs" surface="inverse">
          <ArrowUp size={14} weight="bold" aria-hidden /> Back to top
        </Button>
      </div>
    </footer>
  );
}
