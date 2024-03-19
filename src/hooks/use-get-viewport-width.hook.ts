import { useState, useEffect, useCallback } from 'react';

export const useGetViewportWidth = (initialWidth: number) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth <= initialWidth,
  );

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= initialWidth);
  }, [initialWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return isMobile;
};
