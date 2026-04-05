import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Button from './Button';
import s from '../styles/Carousel.module.css';

export default function Carousel({ photos }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % photos.length);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  if (!photos?.length) return null;

  // Plain strings or { src, alt } — always provide non-empty alt (WCAG 1.1.1)
  const item = photos[index];
  const isString = typeof item === 'string';
  const src = isString ? item : item.src;
  const authorAlt = isString ? '' : (item.alt ?? '');
  const altText = authorAlt.trim()
    ? authorAlt
    : `Photo ${index + 1} of ${photos.length} in gallery`;

  return (
    <div className={s.wrapper}>
      <div className={s.stage}>
        <img
          src={src}
          alt={altText}
          className={s.image}
        />
        {authorAlt.trim() ? <p className={s.caption}>{authorAlt}</p> : null}
      </div>

      <div className={s.controls}>
        <Button type="button" onClick={prev} variant="secondary" size="sm" className={s.navBtn}>
          <CaretLeft size={20} weight="bold" aria-hidden="true" />
          <span className={s.srOnly}>Previous photo</span>
        </Button>
        <span className={s.counter}>{index + 1} / {photos.length}</span>
        <Button type="button" onClick={next} variant="secondary" size="sm" className={s.navBtn}>
          <CaretRight size={20} weight="bold" aria-hidden="true" />
          <span className={s.srOnly}>Next photo</span>
        </Button>
      </div>
    </div>
  );
}