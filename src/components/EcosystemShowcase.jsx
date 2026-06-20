import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * EcosystemShowcase — Cinematic startup constellation.
 * 11 premium monochrome identities scattered organically in a
 * compressed dotted-grid atmosphere. Founder portfolio aesthetic.
 */

// ─── PREMIUM SVG LOGO SYSTEM ───────────────────────────────────────────────

const LogoBible = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-bible-l" x1="16" y1="12" x2="26" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="lg-bible-r" x1="40" y1="12" x2="30" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 3" />
    <path d="M25 14 C17 14 14 20 14 28 L14 43 C14 44 15 44 16 43.5 L25 39.5 Z" fill="url(#lg-bible-l)" />
    <path d="M31 14 C39 14 42 20 42 28 L42 43 C42 44 41 44 40 43.5 L31 39.5 Z" fill="url(#lg-bible-r)" />
    <line x1="28" y1="12" x2="28" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />
    <circle cx="28" cy="8" r="2" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

const LogoHeal = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-heal-grad" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.65" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
    <path d="M28 8 C22 8 16 14 16 21 C16 28 28 32 28 48 C28 32 40 28 40 21 C40 14 34 8 28 8 Z" 
          stroke="url(#lg-heal-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M8 28 C8 22 14 16 21 16 C28 16 32 28 48 28 C32 28 28 40 21 40 C14 40 8 34 8 28 Z" 
          stroke="url(#lg-heal-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.8" />
    <circle cx="28" cy="28" r="3.5" fill="currentColor" fillOpacity="0.8" />
    <circle cx="28" cy="28" r="7" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" />
  </svg>
);

const LogoSplitPDF = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-split-top" x1="24" y1="8" x2="48" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="lg-split-bot" x1="8" y1="24" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
      </linearGradient>
    </defs>
    <line x1="10" y1="46" x2="46" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.15" />
    <path d="M19 6 L37 6 L43 12 L43 15 L19 35 Z" fill="url(#lg-split-top)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.9" strokeLinejoin="round" />
    <path d="M37 6 L37 12 L43 12 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M13 41 L13 50 L37 50 L37 21 Z" fill="url(#lg-split-bot)" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.65" strokeLinejoin="round" />
    <line x1="23" y1="15" x2="33" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="23" y1="21" x2="37" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="23" y1="27" x2="31" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="17" y1="35" x2="27" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
    <line x1="17" y1="41" x2="33" y2="41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
    <line x1="17" y1="47" x2="23" y2="47" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
    <circle cx="28" cy="28" r="3" fill="currentColor" fillOpacity="0.9" />
  </svg>
);

const LogoDrop = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-drop-outer" x1="28" y1="6" x2="28" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
      </linearGradient>
      <linearGradient id="lg-drop-inner" x1="28" y1="20" x2="36" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="28" cy="40" rx="16" ry="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
    <ellipse cx="28" cy="40" rx="22" ry="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" strokeDasharray="4 4" />
    <path d="M28 6 C28 6 12 22 12 34 C12 43 19 50 28 50 C37 50 44 43 44 34 C44 22 28 6 28 6 Z"
          stroke="url(#lg-drop-outer)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M14 32 C20 38 24 30 32 36 C38 42 42 34 43 32 C43 32 44 34 44 34 C44 43 37 50 28 50 C19 50 12 43 12 34 C12 33 13 32 14 32 Z"
          fill="url(#lg-drop-inner)" opacity="0.6" />
    <circle cx="28" cy="18" r="2.5" fill="currentColor" fillOpacity="0.85" />
    <line x1="28" y1="18" x2="28" y2="28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
  </svg>
);

const LogoType = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-type-stem" x1="28" y1="18" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
      </linearGradient>
    </defs>
    <line x1="8" y1="14" x2="48" y2="14" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.12" />
    <line x1="8" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.12" />
    <line x1="12" y1="8" x2="12" y2="48" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" strokeDasharray="2 2" />
    <line x1="44" y1="8" x2="44" y2="48" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" strokeDasharray="2 2" />
    <path d="M10 14 C10 14 16 13 28 13 C40 13 46 14 46 14 L44 20 C36 19 28 19 12 20 Z" 
          fill="currentColor" fillOpacity="0.95" />
    <path d="M25 20 L31 20 L31 41 L37 41 L37 44 L19 44 L19 41 L25 41 Z" 
          fill="url(#lg-type-stem)" />
    <circle cx="28" cy="8" r="2" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

const LogoBlueLab = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-blue-1" x1="28" y1="6" x2="46" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
      </linearGradient>
      <linearGradient id="lg-blue-2" x1="46" y1="38" x2="10" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="lg-blue-3" x1="10" y1="38" x2="28" y2="6" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
    <circle cx="28" cy="28" r="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.05" />
    <path d="M28 6 L48 18 L38 24 L28 18 Z" fill="url(#lg-blue-1)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M48 18 L28 42 L28 30 L38 24 Z" fill="url(#lg-blue-2)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.75" />
    <path d="M28 42 L8 18 L18 24 L28 30 Z" fill="url(#lg-blue-3)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    <path d="M28 6 L48 18 L28 42 L8 18 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" strokeLinejoin="round" />
    <circle cx="28" cy="24" r="3" fill="currentColor" fillOpacity="0.9" />
    <line x1="28" y1="24" x2="28" y2="42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
  </svg>
);

const LogoProjectHub = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-proj-hub" x1="12" y1="12" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" />
    <rect x="23" y="10" width="10" height="36" rx="5" stroke="url(#lg-proj-hub)" strokeWidth="1.8" strokeLinejoin="round" />
    <rect x="23" y="10" width="10" height="36" rx="5" stroke="url(#lg-proj-hub)" strokeWidth="1.8" strokeLinejoin="round" transform="rotate(60 28 28)" strokeOpacity="0.7" />
    <rect x="23" y="10" width="10" height="36" rx="5" stroke="url(#lg-proj-hub)" strokeWidth="1.8" strokeLinejoin="round" transform="rotate(120 28 28)" strokeOpacity="0.4" />
    <circle cx="28" cy="28" r="4.5" fill="currentColor" />
    <circle cx="28" cy="28" r="8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

const LogoDevKit = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-devkit" x1="10" y1="10" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path d="M6 16 L50 16 M6 40 L50 40" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.1" />
    <path d="M16 6 L16 50 M40 6 L40 50" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.1" />
    <rect x="10" y="10" width="36" height="36" rx="6" stroke="url(#lg-devkit)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M18 20 L26 28 L18 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.95" />
    <rect x="30" y="32" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.9" />
    <rect x="30" y="20" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.35" />
    <circle cx="34" cy="28" r="2.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

const LogoNetworkCheck = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-net-pillars" x1="28" y1="12" x2="28" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.08" />
    <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.05" strokeDasharray="3 3" />
    <g fill="url(#lg-net-pillars)">
      <rect x="12" y="24" width="4" height="20" rx="1.5" />
      <rect x="19" y="16" width="4" height="28" rx="1.5" />
      <rect x="26" y="10" width="4" height="34" rx="1.5" />
      <rect x="33" y="18" width="4" height="26" rx="1.5" />
      <rect x="40" y="22" width="4" height="22" rx="1.5" />
    </g>
    <path d="M10 32 L24 38 L46 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="38" r="2.5" fill="#09090b" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
    <circle cx="46" cy="14" r="2.5" fill="currentColor" />
  </svg>
);

const LogoSafeFile = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-safe-left" x1="12" y1="10" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="lg-safe-right" x1="44" y1="10" x2="28" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.75" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
    <path d="M28 8 L14 13 L14 28 C14 38 21 45 28 48 Z" fill="url(#lg-safe-left)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M28 8 L42 13 L42 28 C42 38 35 45 28 48 Z" fill="url(#lg-safe-right)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
    <circle cx="28" cy="24" r="4" fill="currentColor" fillOpacity="0.9" />
    <path d="M26 27.5 L30 27.5 L32 36 L24 36 Z" fill="currentColor" fillOpacity="0.9" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const LogoFontGen = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="lg-fontgen-stem" x1="16" y1="12" x2="28" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <line x1="6" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" />
    <line x1="6" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" />
    <path d="M16 44 L16 41 L20 41 L20 15 L16 15 L16 12 L38 12 L38 18 L25 18 L25 26 L34 26 L34 31 L25 31 L25 41 L30 41 L30 44 Z" 
          fill="url(#lg-fontgen-stem)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M42 22 C42 22 45 22 45 19 C45 22 48 22 48 22 C48 22 45 22 45 25 C45 22 42 22 42 22 Z" 
          fill="currentColor" />
    <path d="M36 12 C36 12 38 12 38 10 C38 12 40 12 40 12 C40 12 38 12 38 14 C38 12 36 12 36 12 Z" 
          fill="currentColor" fillOpacity="0.6" />
    <circle cx="20" cy="15" r="2" fill="currentColor" />
    <circle cx="38" cy="12" r="2" fill="currentColor" />
    <circle cx="25" cy="26" r="2" fill="currentColor" />
    <circle cx="34" cy="26" r="2" fill="currentColor" />
  </svg>
);

// ─── PRODUCT DATA ──────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 'bible',      name: 'Bible',          subtitle: 'Scripture Platform',     url: 'https://bible.savee.space/',             Logo: LogoBible,       left: '26%', top: '14%', size: 'large' },
  { id: 'heal',       name: 'Heal',           subtitle: 'Wellness Engine',       url: 'https://www.savee.space/',               Logo: LogoHeal,        left: '38%', top: '8%',  size: 'medium' },
  { id: 'splitpdf',   name: 'Split PDF',      subtitle: 'Document Toolkit',      url: 'https://sheethub.bluelabtech.space/',    Logo: LogoSplitPDF,    left: '62%', top: '10%', size: 'small' },
  { id: 'drop',       name: 'Drop',           subtitle: 'File Transfer',         url: 'https://drop.savee.space/',              Logo: LogoDrop,        left: '74%', top: '12%', size: 'medium' },
  { id: 'type',       name: 'Type',           subtitle: 'Writing Studio',        url: 'https://type.savee.space/',              Logo: LogoType,        left: '30%', top: '52%', size: 'medium' },
  { id: 'bluelab',    name: 'BlueLab',        subtitle: 'Innovation Hub',        url: 'https://www.bluelabtech.space/',         Logo: LogoBlueLab,     left: '50%', top: '50%', size: 'large' },
  { id: 'projecthub', name: 'ProjectHub',     subtitle: 'Project Management',    url: 'https://projecthub.bluelabtech.space/', Logo: LogoProjectHub,  left: '70%', top: '52%', size: 'medium' },
  { id: 'fontgen',    name: 'Font Gen',       subtitle: 'Type Foundry',          url: 'https://font.savee.space/',             Logo: LogoFontGen,     left: '76%', top: '85%', size: 'small' },
  { id: 'devkit',     name: 'DevKit',         subtitle: 'Developer Tools',       url: 'https://dev.bluelabtech.space/',         Logo: LogoDevKit,      left: '24%', top: '85%', size: 'small' },
  { id: 'netcheck',   name: 'Net Check',      subtitle: 'Network Monitor',       url: 'https://check.bluelabtech.space/',      Logo: LogoNetworkCheck, left: '38%', top: '92%', size: 'medium' },
  { id: 'safefile',   name: 'Safe File',      subtitle: 'Secure Storage',        url: 'https://safe.savee.space/',             Logo: LogoSafeFile,    left: '62%', top: '90%', size: 'large' },
];

// ─── SINGLE BRAND LOGO ITEM ───────────────────────────────────────────────
function LogoItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const { Logo, name, subtitle, url, left, top, size } = item;

  // Set sizing based on size category (Enlarged by 20-30%)
  let iconSize;
  if (size === 'large') {
    iconSize = 'clamp(64px, 7vw, 84px)';
  } else if (size === 'medium') {
    iconSize = 'clamp(52px, 5.5vw, 64px)';
  } else {
    iconSize = 'clamp(40px, 4.5vw, 50px)';
  }

  // Floating animation durations and delays for organic drift
  const driftY = [0, -12, 0];
  const driftDuration = 7 + (index % 3) * 2; // 7s, 9s, 11s
  const driftDelay = index * 0.4;

  return (
    <div
      style={{
        position: 'absolute',
        left: left,
        top: top,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 100 : (size === 'large' ? 10 : 5),
      }}
    >
      <div
        className="logo-drift"
        style={{
          '--drift-duration': `${driftDuration}s`,
          '--drift-delay': `-${driftDelay}s`,
        }}
      >
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
          whileHover={{
            scale: 1.08,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Ambient hover glow ring around the logo */}
          <div
            style={{
              position: 'absolute',
              width: `calc(${iconSize} + 40px)`,
              height: `calc(${iconSize} + 40px)`,
              background: item.id === 'bluelab'
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              opacity: hovered ? 1 : 0,
              transform: 'translate(-50%, -50%)',
              top: '50%',
              left: '50%',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Logo Icon */}
          <div
            style={{
              width: iconSize,
              height: iconSize,
              color: item.id === 'bluelab'
                ? '#3b82f6'
                : (hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'),
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Logo />
          </div>

          {/* Always Visible Text Label under the icon */}
          <div
            style={{
              marginTop: '12px',
              fontFamily: "'Satoshi', 'General Sans', monospace",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: item.id === 'bluelab'
                ? '#3b82f6'
                : (hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'),
              transition: 'color 0.3s ease',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {name}
          </div>

          {/* Floating Hover Card (Subtitle revealed on hover) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: '115%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  pointerEvents: 'none',
                  zIndex: 2,
                  textAlign: 'center',
                  minWidth: '200px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Satoshi', 'General Sans', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: item.id === 'bluelab' ? '#60a5fa' : 'rgba(235, 175, 110, 0.75)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────
export default function EcosystemShowcase() {
  return (
    <section
      className="relative overflow-hidden content-visibility-auto"
      style={{
        background: '#050505',
        paddingTop: 'clamp(40px, 6vw, 80px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
      }}
    >
      {/* ── Dotted Grid Background ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(235,175,110,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Atmospheric depth layers ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(circle, rgba(235,175,110,0.03) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* ── Content wrapper ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}
        >
          <p style={{
            color: 'rgba(235,175,110,0.5)',
            fontSize: '11px',
            fontFamily: "'Satoshi', 'General Sans', monospace",
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '12px',
          }}>
            ✦ &nbsp; Ecosystem
          </p>

          <h2 style={{
            color: '#f3f4f6',
            fontFamily: "'Clash Display', 'General Sans', 'Satoshi', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
          }}>
            I've Built &amp;
            <br />
            Contributed To
          </h2>

          <div
            style={{
              width: '40px', height: '1.5px',
              margin: '16px auto 0',
              background: 'linear-gradient(90deg, transparent, rgba(235,175,110,0.4), transparent)',
            }}
          />
        </motion.div>

        {/* ── Floating Constellation Composition Container (Generous height and bounds) ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 40vw, 460px)',
            margin: '0 auto',
            maxWidth: '1000px',
          }}
        >
          {PRODUCTS.map((item, i) => (
            <LogoItem key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── Bottom Statistics ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 }}
          style={{
            marginTop: 'clamp(32px, 4vw, 48px)',
            color: 'rgba(235, 175, 110, 0.35)',
            fontSize: '11px',
            fontFamily: "'Satoshi', 'General Sans', monospace",
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          11 Products &nbsp;·&nbsp; 3 Platforms &nbsp;·&nbsp; 1 Vision
        </motion.div>

      </div>
    </section>
  );
}

