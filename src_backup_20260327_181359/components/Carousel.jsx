import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import s from '../styles/Carousel.module.css';

export default function Carousel({ photos }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % photos.length);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  if (!photos?.length) return null;

  // Accept either plain strings or { src, alt } objects
  const current = typeof photos[index] === 'string'
    ? { src: photos[index], alt: '' }
    : photos[index];

  return (
    <div className={s.wrapper}>
      <div className={s.stage}>
        <img
          src={current.src}
          alt={current.alt}
          className={s.image}
        />
        {current.alt && <p className={s.caption}>{current.alt}</p>}
      </div>

      <div className={s.controls}>
        <button onClick={prev} className={s.navBtn} aria-label="Previous">
          <CaretLeft size={20} weight="bold" />
        </button>
        <span className={s.counter}>{index + 1} / {photos.length}</span>
        <button onClick={next} className={s.navBtn} aria-label="Next">
          <CaretRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}