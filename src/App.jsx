import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize single global Lenis smooth scroll with FPS throttling
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId;
    let lastTime = performance.now();
    const targetFps = 60;
    const interval = 1000 / targetFps;

    function raf(time) {
      rafId = requestAnimationFrame(raf);
      const delta = time - lastTime;
      if (delta >= interval) {
        lastTime = time - (delta % interval);
        lenis.raf(time);
      }
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      delete window.__lenis;
    };
  }, [isLoading]);

  return (
    <>
      {/* Signature Preloader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Page */}
      {!isLoading && (
        <div className="w-full min-h-screen bg-black text-[#E8DFD8] relative selection:bg-[#cbb59d] selection:text-black overflow-x-clip">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
          <ResumeModal />
        </div>
      )}
    </>
  );
}
