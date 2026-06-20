import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- LOGO PATHS (Exact matching SVGs from Desktop) ---
const LogoBible = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-bible-l-m" x1="16" y1="12" x2="26" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="lg-bible-r-m" x1="40" y1="12" x2="30" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 3" />
    <path d="M25 14 C17 14 14 20 14 28 L14 43 C14 44 15 44 16 43.5 L25 39.5 Z" fill="url(#lg-bible-l-m)" />
    <path d="M31 14 C39 14 42 20 42 28 L42 43 C42 44 41 44 40 43.5 L31 39.5 Z" fill="url(#lg-bible-r-m)" />
    <line x1="28" y1="12" x2="28" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />
    <circle cx="28" cy="8" r="2" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

const LogoHeal = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-heal-grad-m" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.65" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
    <path d="M28 8 C22 8 16 14 16 21 C16 28 28 32 28 48 C28 32 40 28 40 21 C40 14 34 8 28 8 Z" 
          stroke="url(#lg-heal-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 28 C8 22 14 16 21 16 C28 16 32 28 48 28 C32 28 28 40 21 40 C14 40 8 34 8 28 Z" 
          stroke="url(#lg-heal-grad-m)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.8" />
    <circle cx="28" cy="28" r="3.5" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

const LogoSplitPDF = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-split-top-m" x1="24" y1="8" x2="48" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="lg-split-bot-m" x1="8" y1="24" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
      </linearGradient>
    </defs>
    <path d="M19 6 L37 6 L43 12 L43 15 L19 35 Z" fill="url(#lg-split-top-m)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.9" strokeLinejoin="round" />
    <path d="M37 6 L37 12 L43 12 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M13 41 L13 50 L37 50 L37 21 Z" fill="url(#lg-split-bot-m)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.65" strokeLinejoin="round" />
    <circle cx="28" cy="28" r="3" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

const LogoDrop = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-drop-outer-m" x1="28" y1="6" x2="28" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
      </linearGradient>
    </defs>
    <path d="M28 6 C28 6 12 22 12 34 C12 43 19 50 28 50 C37 50 44 43 44 34 C44 22 28 6 28 6 Z"
          stroke="url(#lg-drop-outer-m)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <circle cx="28" cy="18" r="2.5" fill="currentColor" fillOpacity="0.85" />
    <line x1="28" y1="18" x2="28" y2="28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

const LogoType = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-type-stem-m" x1="28" y1="18" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
      </linearGradient>
    </defs>
    <path d="M10 14 C10 14 16 13 28 13 C40 13 46 14 46 14 L44 20 C36 19 28 19 12 20 Z" fill="currentColor" fillOpacity="0.95" />
    <path d="M25 20 L31 20 L31 41 L37 41 L37 44 L19 44 L19 41 L25 41 Z" fill="url(#lg-type-stem-m)" />
  </svg>
);

const LogoBlueLab = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-blue-1-m" x1="28" y1="6" x2="46" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <path d="M28 6 L48 18 L38 24 L28 18 Z" fill="url(#lg-blue-1-m)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M48 18 L28 42 L28 30 L38 24 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeOpacity="0.75" />
    <path d="M28 42 L8 18 L18 24 L28 30 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    <circle cx="28" cy="24" r="3" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

const LogoProjectHub = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-proj-hub-m" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect x="23" y="10" width="10" height="36" rx="5" stroke="url(#lg-proj-hub-m)" strokeWidth="1.8" />
    <circle cx="28" cy="28" r="4.5" fill="currentColor" />
  </svg>
);

const LogoDevKit = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-devkit-m" x1="10" y1="10" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="36" height="36" rx="6" stroke="url(#lg-devkit-m)" strokeWidth="2" fill="none" />
    <path d="M18 20 L26 28 L18 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoNetworkCheck = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M10 32 L24 38 L46 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="38" r="2.5" fill="#09090b" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="46" cy="14" r="2.5" fill="currentColor" />
  </svg>
);

const LogoSafeFile = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-safe-left-m" x1="12" y1="10" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path d="M28 8 L14 13 L14 28 C14 38 21 45 28 48 Z" fill="url(#lg-safe-left-m)" stroke="currentColor" strokeWidth="1" />
    <circle cx="28" cy="24" r="4" fill="currentColor" />
  </svg>
);

const LogoFontGen = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-fontgen-stem-m" x1="16" y1="12" x2="28" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path d="M16 44 L16 41 L20 41 L20 15 L16 15 L16 12 L38 12 L38 18 L25 18 L25 26 L34 26 L34 31 L25 31 L25 41 L30 41 L30 44 Z" 
          fill="url(#lg-fontgen-stem-m)" stroke="currentColor" strokeWidth="1" />
  </svg>
);

// --- COMPACT DISTRIBUTED COORDINATES FOR MOBILE PORTRAIT WIDTHS (PREVENTS OVERLAP) ---
const PRODUCTS = [
  { id: 'bible',      name: 'Bible',          subtitle: 'Scripture Platform',     url: 'https://bible.savee.space/',             Logo: LogoBible,        left: '20%', top: '14%', size: 'large' },
  { id: 'heal',       name: 'Heal',           subtitle: 'Wellness Engine',       url: 'https://www.savee.space/',               Logo: LogoHeal,         left: '50%', top: '8%',  size: 'medium' },
  { id: 'splitpdf',   name: 'Split PDF',      subtitle: 'Document Toolkit',      url: 'https://sheethub.bluelabtech.space/',    Logo: LogoSplitPDF,     left: '80%', top: '14%', size: 'small' },
  { id: 'drop',       name: 'Drop',           subtitle: 'File Transfer',         url: 'https://drop.savee.space/',              Logo: LogoDrop,         left: '82%', top: '40%', size: 'medium' },
  { id: 'type',       name: 'Type',           subtitle: 'Writing Studio',        url: 'https://type.savee.space/',              Logo: LogoType,         left: '18%', top: '40%', size: 'medium' },
  { id: 'bluelab',    name: 'BlueLab',        subtitle: 'Innovation Hub',        url: 'https://www.bluelabtech.space/',         Logo: LogoBlueLab,      left: '50%', top: '45%', size: 'large' },
  { id: 'projecthub', name: 'ProjectHub',     subtitle: 'Project Management',    url: 'https://projecthub.bluelabtech.space/',   Logo: LogoProjectHub,   left: '80%', top: '65%', size: 'medium' },
  { id: 'devkit',     name: 'DevKit',         subtitle: 'Developer Tools',       url: 'https://dev.bluelabtech.space/',         Logo: LogoDevKit,       left: '20%', top: '65%', size: 'small' },
  { id: 'fontgen',    name: 'Font Gen',       subtitle: 'Type Foundry',          url: 'https://font.savee.space/',              Logo: LogoFontGen,      left: '18%', top: '88%', size: 'small' },
  { id: 'netcheck',   name: 'Net Check',      subtitle: 'Network Monitor',       url: 'https://check.bluelabtech.space/',       Logo: LogoNetworkCheck, left: '50%', top: '85%', size: 'medium' },
  { id: 'safefile',   name: 'Safe File',      subtitle: 'Secure Storage',        url: 'https://safe.savee.space/',              Logo: LogoSafeFile,     left: '82%', top: '88%', size: 'large' },
];

function LogoItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const { Logo, name, subtitle, url, left, top, size } = item;

  // Reduced dimensions for mobile screens
  let iconSize;
  if (size === 'large') {
    iconSize = 'clamp(46px, 12vw, 56px)';
  } else if (size === 'medium') {
    iconSize = 'clamp(38px, 10vw, 46px)';
  } else {
    iconSize = 'clamp(30px, 8vw, 36px)';
  }

  // Organic drift (low frequency to be GPU efficient)
  const driftY = [0, -6, 0];
  const driftDuration = 8 + (index % 3) * 2.5;
  const driftDelay = index * 0.35;

  return (
    <div
      style={{
        position: 'absolute',
        left: left,
        top: top,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 50 : (size === 'large' ? 10 : 5),
      }}
    >
      <div
        className="logo-drift"
        style={{
          '--drift-duration': `${driftDuration}s`,
          '--drift-delay': `-${driftDelay}s`,
          '--drift-amount': '-6px',
        }}
      >
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex flex-col items-center cursor-pointer relative"
          whileTap={{ scale: 0.95 }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              width: `calc(${iconSize} + 24px)`,
              height: `calc(${iconSize} + 24px)`,
              background: item.id === 'bluelab'
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              opacity: hovered ? 1 : 0.4,
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: iconSize,
              height: iconSize,
              color: item.id === 'bluelab'
                ? '#3b82f6'
                : (hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'),
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Logo />
          </div>

          {/* Text Label */}
          <div
            style={{
              marginTop: '6px',
              fontFamily: "'Satoshi', 'General Sans', monospace",
              fontSize: '8px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: item.id === 'bluelab'
                ? '#3b82f6'
                : (hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'),
              transition: 'color 0.3s ease',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {name}
          </div>

          {/* Floating Hover Subtitle Card */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '115%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  zIndex: 10,
                  textAlign: 'center',
                  minWidth: '120px',
                }}
              >
                <span
                  className="px-2 py-0.5 rounded bg-black/85 border border-white/10"
                  style={{
                    fontFamily: "'Satoshi', 'General Sans', monospace",
                    fontSize: '7.5px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: item.id === 'bluelab' ? '#60a5fa' : 'rgba(235, 175, 110, 0.95)',
                  }}
                >
                  {subtitle}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.a>
      </div>
    </div>
  );
}

export default function MobileEcosystem() {
  return (
    <section className="relative overflow-hidden w-full py-10 bg-[#050505] content-visibility-auto">
      
      {/* Grid Dots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(235,175,110,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div className="w-full px-4 flex flex-col items-center text-center relative z-10">
        
        {/* Heading */}
        <div className="mb-8">
          <p className="text-[10px] text-orange-400/60 font-mono tracking-widest uppercase font-semibold mb-1">
            ✦ &nbsp; Ecosystem
          </p>
          <h2 className="text-2xl font-display font-semibold text-white tracking-wide uppercase">
            Built &amp; Contributed To
          </h2>
          <div className="w-12 h-[1px] bg-orange-400/20 mx-auto mt-2" />
        </div>

        {/* Constellation Container - Fixed height with responsive width */}
        <div className="relative w-full h-[360px] max-w-[420px] mx-auto border border-white/[0.03] rounded-3xl bg-black/[0.05] overflow-hidden">
          {PRODUCTS.map((item, i) => (
            <LogoItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Footer Statistics */}
        <div className="mt-6 text-[9px] font-mono tracking-widest text-zinc-650 uppercase">
          11 Products &nbsp;·&nbsp; 3 Platforms
        </div>

      </div>
    </section>
  );
}
