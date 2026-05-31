import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import HeroBento from './components/HeroBento';
import EcosystemShowcase from './components/EcosystemShowcase';
import SelectedWorks from './components/SelectedWorks';
import Articles from './components/Articles';
import Footer from './components/Footer';
import CinematicBackground from './components/CinematicBackground';
import Lenis from 'lenis';

/**
 * Main App shell - reubence.com style portfolio
 * Single-page layout with bento grid hero, selected works, articles, and footer.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [isLoading]);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen text-zinc-100 relative selection:bg-violet-500/30 selection:text-white">
          
          {/* Cinematic Background Canvas and overlays */}
          <CinematicBackground />
          
          <main className="relative z-10">
            <HeroBento />
            <EcosystemShowcase />
            <SelectedWorks />
            <Articles />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
