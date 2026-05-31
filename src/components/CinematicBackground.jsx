import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CinematicBackground Component
 * Renders a high-performance, immersive ambient background.
 * Uses massive, soft radial gradients, subtle noise, and minimal parallax for luxury depth.
 */
export default function CinematicBackground() {
  const containerRef = useRef(null);

  // Scroll tracking for luxury parallax effect (ultra slow)
  const { scrollY } = useScroll();
  const yParallax1 = useTransform(scrollY, [0, 2000], [0, -100]);
  const yParallax2 = useTransform(scrollY, [0, 2000], [0, 120]);
  const yParallax3 = useTransform(scrollY, [0, 2000], [0, -80]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-[#050505] overflow-hidden select-none"
    >
      {/* 1. Ambient Glow 1 - Deep Purple (Behind Hero & Top Left) */}
      <motion.div
        style={{ y: yParallax1 }}
        className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] rounded-full blur-[180px] pointer-events-none animate-pulse-slow mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(124, 58, 237, 0.02) 50%, transparent 80%)'
        }}
      />
      
      {/* 2. Ambient Glow 2 - Dark Blue (Middle Right, Behind Portrait) */}
      <motion.div
        style={{ y: yParallax2 }}
        className="absolute top-[30%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[160px] pointer-events-none animate-pulse-slow-reverse mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.01) 50%, transparent 80%)'
        }}
      />
      
      {/* 3. Ambient Glow 3 - Soft Indigo (Bottom Left, Behind Experience) */}
      <motion.div
        style={{ y: yParallax3 }}
        className="absolute bottom-[-15%] left-[10%] w-[75vw] h-[75vw] rounded-full blur-[180px] pointer-events-none animate-pulse-slow mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(99, 102, 241, 0.01) 50%, transparent 80%)',
          animationDelay: '-4s'
        }}
      />

      {/* 4. Subtle Animated Moving Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_50%,transparent_100%)] animate-grid-drift" />

      {/* 5. Luxury Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise bg-noise-overlay" />
    </div>
  );
}
