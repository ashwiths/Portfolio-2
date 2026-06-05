import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import HeroBento from './components/HeroBento';
import EcosystemShowcase from './components/EcosystemShowcase';
import PlacesMap from './components/PlacesMap';
import SelectedWorks from './components/SelectedWorks';
import Articles from './components/Articles';
import Footer from './components/Footer';
import CinematicBackground from './components/CinematicBackground';
import Lenis from 'lenis';

/**
 * Main App shell - reubence.com style portfolio
 * Multi-page layout split between Home, Work, and Experience views using lightweight hash routing.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  // Listen to hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isWorkView = currentHash.startsWith('#/work') || currentHash.startsWith('#/live-projects');
  const isExperienceView = currentHash.startsWith('#/experience');
  const isSubpage = isWorkView || isExperienceView;

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

  // Handle smooth scroll when routing hash changes
  useEffect(() => {
    if (isLoading) return;

    if (currentHash === '#contact') {
      const timer = setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // For general page transitions, scroll back to top
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="min-h-screen text-zinc-100 relative selection:bg-violet-500/30 selection:text-white">
          
          {/* Cinematic Background Canvas and overlays */}
          <CinematicBackground />
          
          <main className="relative z-10">
            {/* Header for Subpages */}
            {isSubpage && (
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-4 flex justify-between items-center">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  Infant Ashil A
                </span>
                <button
                  onClick={() => window.location.hash = '#/'}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold tracking-wide text-zinc-300 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                >
                  ← Back to Home
                </button>
              </div>
            )}

            {isWorkView && <SelectedWorks view={currentHash === '#/live-projects' ? 'live' : 'featured'} />}
            {isExperienceView && <Articles />}
            {!isSubpage && (
              <>
                <HeroBento />
                <EcosystemShowcase />
                <PlacesMap />
              </>
            )}
          </main>
          {isSubpage && <Footer />}
        </div>
      )}
    </>
  );
}
