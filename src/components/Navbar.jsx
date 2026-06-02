import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ashilImage from '../assets/ashil.jpeg';

/**
 * Floating pill navigation bar — reubence.com exact style
 * For "Infant Ashil" branding
 */

const navLinks = [
  { label: 'home', href: '#/' },
  { label: 'work', href: '#/work' },
  { label: 'experience', href: '#/experience' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentY);

      // Update active section based on scroll position
      const sections = [
        { id: 'home', link: 'home' },
        { id: 'work', link: 'work' },
        { id: 'experience', link: 'experience' },
        { id: 'contact', link: 'contact' }
      ];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section.link);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    window.location.hash = href;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-2.5 rounded-full bg-black/60 border border-white/8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            
            {/* Avatar / Logo */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] p-[1.5px] mr-1.5 flex-shrink-0 overflow-hidden ring-1 ring-white/10">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img
                  src={ashilImage}
                  alt="IA"
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-white text-[10px] font-bold">IA</span>';
                  }}
                />
              </div>
            </div>

            {/* Nav links */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide capitalize transition-colors duration-300 rounded-full ${
                  activeSection === link.label
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {activeSection === link.label && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-violet-500/20 shadow-[0_0_12px_rgba(124,58,237,0.15)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
