import { useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import s from '../styles/FloatCard.module.css';

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

  return (
    <div
      className={s.floatCard}
      style={{
        position,
        zIndex: isOpen ? 45 : 25,   // Higher when open
        ...style,
      }}
    >
      <div className={className}>
        <button
          ref={btnRef}
          type="button"
          onClick={() => onToggle(floatId)}
          aria-expanded={isOpen}
          aria-label={label}
          className={s.floatCardBtn}
        >
          {/* Closed state */}
          {!isOpen && <div className="p-5">{children}</div>}

          {/* Expanded state */}
          {isOpen && (
            <div className="p-5 space-y-4">
              {children}
              {detail && (
                <div className={s.floatCardDetail}>
                  <p className={s.floatCardDetailText}>{detail}</p>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}