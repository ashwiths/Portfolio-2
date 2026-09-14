import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 sm:px-12 lg:px-20 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-black/85 backdrop-blur-xl border-b border-[#8C6D4F]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 sm:py-8 bg-gradient-to-b from-black/80 via-black/30 to-transparent backdrop-blur-[2px]'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#about"
          className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#EAD8C7] hover:text-[#FFF5EB] transition-colors duration-300 select-none flex items-center"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span>ASHIL A</span>
          <span className="text-[#D4AF37]">.</span>
        </a>

        {/* Desktop Navigation Links — Centered */}
        <nav
          className="hidden md:flex items-center space-x-8 lg:space-x-11 text-[11px] tracking-[0.28em] font-light uppercase text-[#C4B5A5] absolute left-1/2 -translate-x-1/2 select-none"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative group py-1 transition-colors duration-300 hover:text-[#FFF5EB]"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#F2D8A7] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center space-x-4">
          <a
            href="#contact"
            className="group flex items-center space-x-2 text-[10.5px] sm:text-[11px] tracking-[0.24em] font-light uppercase py-2 px-3.5 sm:px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-white transition-all duration-300 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[#D4AF37]">
              ↗
            </span>
          </a>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 text-[#EAD8C7] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`block w-4 h-[1px] bg-[#EAD8C7] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-4 h-[1px] bg-[#EAD8C7] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-[1px] bg-[#EAD8C7] transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-black/95 backdrop-blur-2xl border-b border-[#8C6D4F]/30 px-6 py-8 flex flex-col space-y-6 md:hidden select-none"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.3em] uppercase text-[#C4B5A5] hover:text-[#FFF5EB] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
