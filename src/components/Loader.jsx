import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Signature from './Signature';

/**
 * Premium preloader with signature animation
 * Plays the "Infant Ashil" signature while the site loads
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
        return prev + Math.random() * 5 + 3; // slightly faster and organic feel
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
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* Signature animation */}
          <Signature
            className="w-64 md:w-80 h-auto"
            color="#ffffff"
            delay={0.1}
            strokeWidth={1.8}
          />

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/5 rounded-full mt-10 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Loading text */}
          <p className="text-[10px] text-zinc-500 font-sans tracking-[0.4em] uppercase mt-5 select-none opacity-80">
            initializing{'.'.repeat(Math.floor(progress / 25) + 1)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
