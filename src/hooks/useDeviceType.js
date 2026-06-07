import { useState, useEffect } from 'react';

/**
 * Custom hook to detect screen type based on width
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: 768px – 1024px
 * - Desktop: > 1024px
 */
export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Run initial check
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}
