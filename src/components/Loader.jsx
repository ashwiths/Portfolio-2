import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AshilSignature from './AshilSignature';

/**
 * Premium Preloader with Signature Animation
 * Plays the "Infant Ashil" animated handwritten signature while the site loads
 */

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(() => onComplete?.(), 700);
          return 100;
        }
        // Smooth ~3.2s load progress to match signature animation sequence
        return prev + Math.random() * 1.5 + 1.4;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ 
            opacity: 0, 
            filter: "blur(10px)",
            scale: 1.02
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center select-none"
        >
          {/* Handwritten Signature animation */}
          <div className="flex items-center justify-center p-4">
            <AshilSignature
              className="w-72 sm:w-96 md:w-[420px] h-auto drop-shadow-[0_0_16px_rgba(212,175,55,0.6)]"
              color="#F2D8A7"
              glowColor="#D4AF37"
              delay={0.1}
              strokeWidth={1.8}
            />
          </div>

          {/* Luxury Progress Bar */}
          <div className="w-52 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8C6D4F] via-[#D4AF37] to-[#F2D8A7] rounded-full shadow-[0_0_8px_#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Loading status text */}
          <p className="text-[10px] text-[#A8988B] font-mono tracking-[0.4em] uppercase mt-5 select-none opacity-80">
            initializing{'.'.repeat(Math.floor(progress / 25) + 1)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
