
import { useState, useEffect, useCallback } from 'react';


const useBlockScrolling = (startPosition: 'top' | 'bottom' | 'none') => {
  const [isScrollingBlocked, setIsScrollingBlocked] = useState(false);

  const blockScrolling = useCallback(() => {
    setIsScrollingBlocked(true);
  }, []);

  const unblockScrolling = useCallback(() => {
    setIsScrollingBlocked(false);
  }, []);

  useEffect(() => {
    if (startPosition === 'top') {
      window.scrollTo(0, 0);
    } else if (startPosition === 'bottom') {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [startPosition]);

  useEffect(() => {
    if (isScrollingBlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isScrollingBlocked]);

  return { blockScrolling, unblockScrolling };
};

export default useBlockScrolling;
