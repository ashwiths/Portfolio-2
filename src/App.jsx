import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import CinematicBackground from './components/CinematicBackground';
import useDeviceType from './hooks/useDeviceType';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';
import Lenis from 'lenis';
import ResumeModal from './components/ResumeModal';

/**
 * Main App shell - reubence.com style portfolio
 * Automatic screen size detection:
 * - Mobile (< 768px): Dedicated touch-optimized layout & components
 * - Tablet & Desktop (>= 768px): Existing responsive grid layout
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const lenisRef = useRef(null);
  const deviceType = useDeviceType();

  // Listen to hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    // Optional: Only enable Lenis smooth-scroll on non-mobile screens for better native scroll on touch devices
    const isMobile = deviceType === 'mobile';
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      smoothWheel: !isMobile,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      cancelAnimationFrame(rafId);
    };
  }, [isLoading, deviceType]);

  // Handle smooth scroll when routing hash changes
  useEffect(() => {
    if (isLoading) return;

    if (currentHash === '#/contact' || currentHash === '#contact') {
      const timer = setTimeout(() => {
        const el = document.getElementById('contact') || document.getElementById('contact-page');
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // For general page transitions, scroll back to top
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 0.8, immediate: false });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentHash, isLoading]);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen text-zinc-100 relative selection:bg-violet-500/30 selection:text-white overflow-x-hidden">
          
          {/* Cinematic Background Canvas and overlays */}
          <CinematicBackground />
          
          {deviceType === 'mobile' ? (
            <MobileLayout currentHash={currentHash} />
          ) : (
            <DesktopLayout currentHash={currentHash} />
          )}

          <ResumeModal />

        </div>
      )}
    </>
  );
}
