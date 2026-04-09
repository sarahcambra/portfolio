/**
 * Site data — import from `../data` (this folder) only.
 */
export { projects, visibleProjects } from './projects';
/* caseStudyRegistry is imported only from App.jsx — not re-exported here to avoid
   circular imports (case study pages import ../data, which would load the registry). */
export {
  FLOAT_ANIM_CLASSES,
  FLOAT_CARDS_DECK,
  FLOAT_SCROLL_SLOTS,
} from './floatCardsDeck';
