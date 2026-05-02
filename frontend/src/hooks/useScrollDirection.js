import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll direction and whether the page has been scrolled.
 * Used by Navbar to hide/show on scroll.
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY < 50);

      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollDirection, scrollY, isAtTop };
}
