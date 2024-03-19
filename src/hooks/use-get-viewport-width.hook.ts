import { useState, useEffect, useCallback } from 'react';
import { ViewportWidth } from 'utils/constants';

export const useGetViewportWidth = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= ViewportWidth.MOBILE,
  );

  const handleResize = useCallback(() => {
    const isMobileWidth = window.innerWidth <= ViewportWidth.MOBILE;
    setIsMobile(isMobileWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};
