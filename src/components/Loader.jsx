import React, { useState, useEffect } from 'react';
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
          setTimeout(() => onComplete?.(), 600);
          return 100;
        }
        return prev + Math.random() * 3 + 2;
      });
    }, 80);


    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#ffffff] flex flex-col items-center justify-center"
        >
          {/* Signature animation */}
          <Signature
            className="w-64 md:w-80 h-auto"
            color="#09090b"
            delay={0}
            strokeWidth={2}
          />

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-[#f0f0f0] rounded-full mt-10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ff4500] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Loading text */}
          <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.3em] mt-4">
            Loading{'.'.repeat(Math.floor(progress / 25) + 1)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
