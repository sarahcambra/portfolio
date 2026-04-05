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
 * Three well-separated deck indices so slots rarely feel like duplicates
 * when the deck has many minimal cards (30+).
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
    case 'tokens':
      return (
        <>
          <span className={s.floatCardHeader}>
            <span className={s.floatBadge}>{item.badge}</span>
            <span className={s.floatCardHeading}>{item.title}</span>
          </span>
          <span className={s.floatSwatchRow} aria-hidden="true">
            {item.swatches.map((c) => (
              <span key={c} className={s.floatSwatch} style={{ background: c }} title={c} />
            ))}
          </span>
          <span className={s.floatCode}>{item.codeLine}</span>
        </>
      );
    case 'wcag':
      return (
        <>
          <span className={s.floatCardHeader}>
            <span className={s.floatBadge}>{item.badge}</span>
            <span className={s.floatCardHeading}>{item.title}</span>
          </span>
          <span className={s.floatLeadRow} aria-hidden="true">
            <span className={s.floatLeadIcon}>
              <Check size={13} weight="bold" color="var(--primitive-brand-800)" aria-hidden="true" />
            </span>
            <span className={s.floatTitle}>{item.checkLead}</span>
          </span>
          <span className={s.floatCheckList}>
            {item.checkItems.map((line) => (
              <span key={line} className={s.floatCheckItem}>
                <Check size={11} weight="bold" color="var(--primitive-brand-700)" aria-hidden="true" />
                <span>{line}</span>
              </span>
            ))}
          </span>
        </>
      );
    case 'ui':
      return (
        <>
          <span className={s.floatCardHeader}>
            <span className={s.floatBadge}>{item.badge}</span>
            <span className={s.floatCardHeading}>{item.title}</span>
          </span>
          <span className={s.floatBtnStack}>
            <span className={s.floatBtnPrimary}>Get started</span>
            <span className={s.floatBtnOutline}>Learn more</span>
            <span className={s.floatBtnMuted}>Secondary</span>
          </span>
        </>
      );
    case 'type':
      return (
        <>
          <span className={s.floatCardHeader}>
            <span className={s.floatBadge}>{item.badge}</span>
            <span className={s.floatTitle}>{item.title}</span>
          </span>
          <span className={s.floatTypeList}>
            {item.typeRows.map((row) => (
              <span key={row.l} className={s.floatTypeRow}>
                <span className={s.floatTypeLabel}>{row.l}</span>
                <span className={s.floatTypeSample} style={{ fontSize: row.fs, fontWeight: row.w }}>
                  Aa
                </span>
              </span>
            ))}
          </span>
        </>
      );
    case 'audit':
      return (
        <>
          <span className={s.floatCardHeader}>
            <span className={s.floatBadge}>{item.badge}</span>
            <span className={s.floatTitle}>{item.title}</span>
          </span>
          <span className={s.floatScoreBlock}>
            <span className={s.floatScoreRow}>
              <span className={s.floatScoreLabel}>Score</span>
              <span className={s.floatScoreValue}>{item.score}</span>
            </span>
            <span className={s.floatMeter}>
              <span className={s.floatMeterFill} style={{ width: `${item.score}%` }} />
            </span>
            <span className={s.floatScoreMeta}>{item.scoreMeta}</span>
          </span>
        </>
      );
    default:
      return (
        <span className={s.floatCardHeader}>
          <span className={s.floatBadge}>{item.badge}</span>
          <span className={s.floatCardHeading}>{item.title}</span>
        </span>
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
