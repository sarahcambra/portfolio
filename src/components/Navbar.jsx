import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import Button from './Button';
import s from '../styles/Navbar.module.css';
import { resolvePublicUrl } from '../utils/resolvePublicUrl';

const links = [
  { label: 'Case Studies', to: '/projects' },
  { label: 'About', to: '/about' },
];

function SunIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Focus trap + Escape for mobile drawer (WCAG 2.1.2, 2.4.3)
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const el = drawerRef.current;
    const focusables = el.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Skip link — first focusable element on the page (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Backdrop — closes drawer on click */}
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={s.backdrop}
        />
      )}

      <nav
        aria-label="Main navigation"
        className={[
          s.nav,
          scrolled ? s.navScrolled : '',
          dark     ? s.navDark     : '',
        ].filter(Boolean).join(' ')}
      >
        {/* Logo — FIX: single file, CSS filter inverts for dark mode.
            Fallback text renders if image fails to load. */}
        <Link to="/" className={s.logoLink}>
          {!logoError ? (
            <img
              src={dark ? resolvePublicUrl('/assets/sarah-logo-white.png') : resolvePublicUrl('/assets/sarah-logo.png')}
              alt="Sarah Beú"
              className={s.logoImg}
              onError={() => setLogoError(true)}
            />
          ) : (
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em',
            }}>
              Sarah Beu
            </span>
          )}
        </Link>

        {/* Desktop links */}
        <ul className={s.list} role="list">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={[s.link, isActive(to) ? s.linkActive : ''].filter(Boolean).join(' ')}
                aria-current={isActive(to) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={s.right}>
          {/* FIX: gap was too large — both .right and .extrasDesktop
              had 1.5rem making toggle+CTA appear glued at smaller widths.
              Now .extrasDesktop has 0.75rem gap (see Navbar.module.css). */}
          <div className={s.extrasDesktop}>
            <Button
              type="button"
              onClick={toggle}
              variant="primary"
              surface="inverse"
              className={s.themeToggleBtn}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
              <span className="sr-only">
                {dark ? 'Switch to light mode' : 'Switch to dark mode'}
              </span>
            </Button>

            <Button as={Link} to="/about#contact" variant="primary">
              Let&apos;s Talk
            </Button>
          </div>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            className={s.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span className="sr-only">
              {menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            </span>
            {menuOpen ? (
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <>
                <span className={s.bar} />
                <span className={s.bar} />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          s.drawer,
          menuOpen ? s.open : '',
          dark     ? s.drawerDark : '',
        ].filter(Boolean).join(' ')}
      >
        <div className={s.drawerContent}>
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={[s.drawerLink, isActive(to) ? s.drawerLinkActive : ''].filter(Boolean).join(' ')}
              aria-current={isActive(to) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}

          <Button as={Link} to="/about#contact" variant="primary" className={s.drawerCta}>
            Let&apos;s Talk
          </Button>

          <Button
            type="button"
            onClick={toggle}
            variant="primary"
            surface="inverse"
            className={s.themeToggleBtn}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="sr-only">
              {dark ? 'Switch to light mode' : 'Switch to dark mode'}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
