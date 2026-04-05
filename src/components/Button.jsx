/**
 * Design-system button: primary (filled), secondary (outline), ghost (text).
 * Polymorphic: pass `as={Link}` and `to` for router links.
 * `surface="inverse"` for dark panels (e.g. portfolio widget).
 */
import { forwardRef } from 'react';
import s from '../styles/Button.module.css';

const Button = forwardRef(function Button(
  {
    as: Comp = 'button',
    variant = 'primary',
    size = 'md',
    surface,
    className = '',
    children,
    ...rest
  },
  ref
) {
  const v =
    variant === 'secondary' ? s.secondary : variant === 'ghost' ? s.ghost : s.primary;
  const sz = size === 'sm' ? s.sm : s.md;

  return (
    <Comp
      ref={ref}
      className={[s.root, v, sz, className].filter(Boolean).join(' ')}
      data-surface={surface === 'inverse' ? 'inverse' : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Button;
