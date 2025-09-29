'use client';

import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop; 