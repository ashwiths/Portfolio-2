import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume', handleOpen);
    return () => window.removeEventListener('open-resume', handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10"
        >
          {/* Backdrop with strong blur */}
          <motion.div 
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(16px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[90vh] bg-[#0c0a09]/95 border border-[#8C6D4F]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#8C6D4F]/25 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <h3 className="text-[#EAD8C7] font-medium text-sm sm:text-base tracking-[0.18em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  INFANT ASHIL A — RESUME
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-[#8C6D4F]/40 hover:border-[#D4AF37] text-[#C4B5A5] hover:text-[#FFF5EB] text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Open New Tab</span>
                </a>
                <a 
                  href="/resume.pdf"
                  download="INFANT ASHIL A UPDATED RESUME.pdf"
                  className="flex items-center gap-2 px-4 py-1.5 rounded bg-[#8C6D4F]/30 hover:bg-[#8C6D4F]/50 border border-[#8C6D4F]/70 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-white text-xs font-medium tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="flex-1 w-full h-full bg-[#141210] relative">
              <iframe 
                src="/resume.pdf#toolbar=1" 
                title="Infant Ashil Resume PDF" 
                className="w-full h-full rounded-b-2xl border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

