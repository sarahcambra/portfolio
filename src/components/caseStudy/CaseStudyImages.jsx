import s from '../../styles/CaseStudy.module.css';
import { csLayout, csTw } from '../../utils/siteLayout';

/**
 * Case study figure — `watermark` shows a small badge in the top-left (e.g. migration notes).
 */
export function CaseImg({
  src,
  filename,
  alt,
  tall,
  short,
  className,
  watermark,
}) {
  const placeholderClass = [
    csTw.placeholder,
    tall ? csTw.placeholderTall : '',
    short ? csTw.placeholderShort : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleImgError = (e) => {
    e.currentTarget.style.display = 'none';
    const wrap = e.currentTarget.closest('[data-case-img-wrap]');
    const ph = wrap?.querySelector('[data-case-img-placeholder]');
    if (ph) ph.style.display = 'flex';
    const wm = wrap?.querySelector('[data-case-img-watermark]');
    if (wm) wm.style.display = 'none';
  };

  return (
    <div className={s.caseImgWrap} data-case-img-wrap>
      <img
        src={src}
        alt={alt}
        className={`${csTw.img} ${s.img} ${className || ''}`}
        onError={handleImgError}
      />
      {watermark ? (
        <span className={s.watermarkBadge} data-case-img-watermark aria-hidden="true">
          {watermark}
        </span>
      ) : null}
      <div
        data-case-img-placeholder
        className={placeholderClass}
        style={{ display: 'none' }}
        role="img"
        aria-label={alt}
      >
        <div className={csTw.placeholderIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M21 15l-5-5L5 21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <code className={csTw.placeholderFile}>{filename}</code>
        <p className={csTw.placeholderLabel}>{alt}</p>
      </div>
    </div>
  );
}

/**
 * Wrapped figure with optional caption + watermark (passed through to CaseImg).
 */
export function Img({
  src,
  filename,
  alt,
  tall,
  short,
  caption,
  className,
  watermark,
}) {
  return (
    <div className={[csLayout.imgWrap, className].filter(Boolean).join(' ')}>
      <CaseImg
        src={src}
        filename={filename}
        alt={alt}
        tall={tall}
        short={short}
        watermark={watermark}
      />
      {caption && <p className={s.imgCaption}>{caption}</p>}
    </div>
  );
}
