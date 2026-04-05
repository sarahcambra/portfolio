import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocumentTitle } from '../utils/documentTitle';

/**
 * Sets document.title on route change (WCAG 2.4.2 Page Titled).
 */
export default function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getDocumentTitle(pathname);
  }, [pathname]);

  return null;
}
