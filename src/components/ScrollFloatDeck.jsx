import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check } from '@phosphor-icons/react';
import FloatCard from './FloatCard';
import s from '../styles/FloatCard.module.css';
import {
  FLOAT_ANIM_CLASSES,
  FLOAT_CARDS_DECK,
  FLOAT_SCROLL_SLOTS,
} from '../data';

/**
 * Three well-separated deck indices so the three fixed slots rarely show
 * the same card when the deck is large.
 */
function pickDeckIndices(deckLength, scrollProgress) {
  if (deckLength <= 0) return [];
  const n = deckLength;
  const i = Math.min(Math.floor(scrollProgress * n), n - 1);
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const stride = Math.max(1, Math.floor(n / 3));
  return [i, (i + stride) % n, (i + stride * 2) % n];
}

function scrollProgressBelowAnchor(anchorEl) {
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  if (maxY <= 0) return 0;
  if (!anchorEl) {
    return Math.min(1, Math.max(0, window.scrollY / maxY));
  }
  const mainStart = anchorEl.offsetTop + anchorEl.offsetHeight;
  const denom = maxY - mainStart;
  if (denom <= 0) return 1;
  const y = window.scrollY - mainStart;
  return Math.min(1, Math.max(0, y / denom));
}

/** Shared by hero floats and scroll layer — renders deck item inner content. */
export function renderFloatDeckCardBody(item) {
  switch (item.variant) {
    case 'contrast':
      return (
        <>
          <div className={s.floatBadge}>{item.badge}</div>
          <h3 className={s.floatCardHeading}>{item.title}</h3>
          <div className={s.floatSwatchRow} aria-hidden="true">
            {['#f8f8f8', '#525252', '#9ca3af', '#e2e1dc', '#f0f0ee'].map(c => (
              <span key={c} className={s.floatSwatch} style={{ background: c }} />
            ))}
          </div>
        </>
      );

    case 'focus':
      return (
        <>
          <div className={s.floatBadge}>{item.badge}</div>
          <h3 className={s.floatCardHeading}>{item.title}</h3>
          <div className="p-3 border-2 border-dashed border-[var(--accent)] rounded-2xl text-center text-sm">← Focus ring example</div>
        </>
      );

    case 'touch':
      return (
        <>
          <div className={s.floatBadge}>{item.badge}</div>
          <h3 className={s.floatCardHeading}>{item.title}</h3>
          <div className={s.floatBtnStack}>
            <span className={s.floatBtnPrimary}>Tap me</span>
          </div>
        </>
      );

    case 'ai':
      return (
        <>
          <div className={s.floatBadge}>{item.badge}</div>
          <h3 className={s.floatCardHeading}>{item.title}</h3>
          <div className="flex items-center gap-2 text-red-600 text-xs font-medium">⚠️ Common AI mistake</div>
        </>
      );

    // Default clean layout for all other cards
    default:
      return (
        <>
          <div className={s.floatBadge}>{item.badge}</div>
          <h3 className={s.floatCardHeading}>{item.title}</h3>
        </>
      );
  }
}

/**
 * Fixed viewport layer: three FloatCards in non-overlapping corners; content
 * advances through FLOAT_CARDS_DECK as the user scrolls (below `progressAnchorRef`).
 */
export default function ScrollFloatDeck({ active, openFloatId, onToggle, progressAnchorRef }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  const updateProgress = useCallback(() => {
    const el = progressAnchorRef?.current;
    const p = scrollProgressBelowAnchor(el);
    setScrollProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p));
  }, [progressAnchorRef]);

  useEffect(() => {
    if (!active || reducedMotion) {
      updateProgress();
      return undefined;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateProgress();
        raf = 0;
      });
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, reducedMotion, updateProgress]);

  const indices = useMemo(() => {
    const n = FLOAT_CARDS_DECK.length;
    if (n === 0) return [];
    if (reducedMotion) return pickDeckIndices(n, 0);
    return pickDeckIndices(n, scrollProgress);
  }, [scrollProgress, reducedMotion]);

  const visible = useMemo(
    () => indices.map((idx) => FLOAT_CARDS_DECK[idx]).filter(Boolean),
    [indices]
  );

  /* Only enforce scroll-deck ids when the fixed layer is active — otherwise hero floats
     (ids like hero-*-slot-n) would always look “not visible” and get cleared every render. */
  useEffect(() => {
    if (!active || !openFloatId) return;
    const stillVisible = visible.some(
      (c, i) => `${c.id}__${i}` === openFloatId
    );
    if (!stillVisible) onToggle(openFloatId, false);
  }, [active, visible, openFloatId, onToggle]);

  if (!active || FLOAT_CARDS_DECK.length === 0) return null;

  return (
    <div className={s.scrollFloatLayer} aria-label="Design highlights" role="complementary">
      {visible.map((item, slotIndex) => {
        if (!FLOAT_SCROLL_SLOTS[slotIndex]) return null;
        const anim = FLOAT_ANIM_CLASSES[slotIndex % FLOAT_ANIM_CLASSES.length];
        return (
          <FloatCard
            key={`${item.id}-${slotIndex}`}
            floatId={`${item.id}__${slotIndex}`}
            isOpen={openFloatId === `${item.id}__${slotIndex}`}
            onToggle={onToggle}
            detail={item.detail}
            label={`${item.badge}: ${item.title}`}
            className={anim}
            position="fixed"
            style={FLOAT_SCROLL_SLOTS[slotIndex]}
          >
            {renderFloatDeckCardBody(item)}
          </FloatCard>
        );
      })}
    </div>
  );
}
