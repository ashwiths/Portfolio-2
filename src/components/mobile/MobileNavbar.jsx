import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'home', href: '#/' },
  { label: 'work', href: '#/work' },
  { label: 'experience', href: '#/experience' },
  { label: 'contact', href: '#/contact' },
];

export default function MobileNavbar({ currentHash }) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close menu when hash changes
  useEffect(() => {
    setIsOpen(false);
  }, [currentHash]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    window.location.hash = href;
  };

  const getActiveLabel = () => {
    const hash = currentHash || '#/';
    if (hash.startsWith('#/work') || hash.startsWith('#/live-projects') || hash.startsWith('#/repositories')) {
      return 'work';
    } else if (hash.startsWith('#/experience')) {
      return 'experience';
    } else if (hash.startsWith('#/contact')) {
      return 'contact';
    }
    return 'home';
  };

  const activeLabel = getActiveLabel();

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-black/60 backdrop-blur-lg border-b border-white/5 flex items-center justify-between">
        <span className="font-display font-semibold text-sm tracking-widest text-white uppercase select-none">
          Infant Ashil A <span className="text-violet-500">.</span>
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-350 hover:text-white transition-all active:scale-95 cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Screen blocker offset */}
      <div className="h-[52px]" />

      {/* Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[52px] z-45 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-hidden select-none"
          >
            {/* Drifting background aura */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

            <nav className="flex flex-col gap-6 mt-12 relative z-10 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-semibold">Navigation</span>
              <div className="flex flex-col">
                {navLinks.map((link, idx) => {
                  const isActive = activeLabel === link.label;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center justify-between py-4 border-b border-white/[0.04] group/item"
                      >
                        <span className={`text-2xl font-display font-medium capitalize tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                        }`}>
                          {link.label}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isActive 
                            ? 'bg-white text-black' 
                            : 'bg-white/[0.02] border border-white/10 text-zinc-500'
                        }`}>
                          <ArrowRight size={14} />
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Quick Contact Footer inside Drawer */}
            <div className="relative z-10 border-t border-white/5 pt-6 pb-2 text-left">
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">Get In Touch</span>
              <a
                href="mailto:infantashil55@gmail.com"
                className="text-sm font-mono text-zinc-350 hover:text-white transition-colors"
              >
                infantashil55@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
