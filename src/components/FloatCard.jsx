import { useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import s from '../styles/FloatCard.module.css';

/**
 * Expandable glass card. Use position: absolute (hero) or fixed (scroll layer) via `position` + `style`.
 */
export default function FloatCard({
  floatId,
  isOpen,
  onToggle,
  detail,
  label,
  children,
  className = '',
  style = {},
  position = 'absolute',
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        onToggle(floatId, false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, floatId, onToggle]);

  /* Motion class (fa–fe) on inner shell only — transform on the positioned root breaks hit-testing in some browsers */
  const motionClass = (className || '').trim();

  return (
    <div
      className={s.floatCard}
      style={{
        position,
        /* Well above hero widget (2) and scroll deck layer (15) */
        zIndex: position === 'fixed' ? 20 : 25,
        ...style,
      }}
    >
      <div className={motionClass}>
        <button
          ref={btnRef}
          type="button"
          onClick={() => onToggle(floatId)}
          aria-expanded={isOpen}
          aria-label={label ? `${label}${isOpen ? ' — collapse' : ' — expand'}` : undefined}
          data-expanded={isOpen ? 'true' : 'false'}
          className={s.floatCardBtn}
        >
          <span className={s.floatCardAccent}>
            <span className={s.floatAccentLeft} aria-hidden="true">
              <span className={s.floatAccentDot} />
              <span className={s.floatAccentTrack} />
            </span>
            <span className={s.floatToggleCue} aria-hidden="true">
              <span className={s.floatToggleLabel}>{isOpen ? 'Less' : 'More'}</span>
              <CaretDown
                className={s.floatChevron}
                size={14}
                weight="bold"
                aria-hidden="true"
              />
            </span>
          </span>
          <span className={s.floatCardBody}>{children}</span>
          {isOpen && detail && (
            <span className={s.floatCardDetail}>
              <span className={s.floatDetailEyebrow}>Portfolio note</span>
              <span className={s.floatCardDetailText}>{detail}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
