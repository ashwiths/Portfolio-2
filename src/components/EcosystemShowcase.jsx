import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * EcosystemShowcase — Rebuilt into a premium futuristic SaaS-style ecosystem showcase.
 * 11 products, bespoke SVG logos, floating glassmorphic cards in a responsive grid.
 */

// ─── Premium SVG Logo System ───────────────────────────────────────────────
const logos = {
  Bible: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bibleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#52525B" />
        </linearGradient>
      </defs>
      <path d="M12 20C12 14.5 16.5 10 22 10H28V50H22C16.5 50 12 45.5 12 40V20Z" fill="url(#bibleGrad)" fillOpacity="0.85" />
      <path d="M48 20C48 14.5 43.5 10 38 10H32V50H38C43.5 50 48 45.5 48 40V20Z" fill="url(#bibleGrad)" fillOpacity="0.45" />
      <rect x="28.5" y="16" width="3" height="28" rx="1.5" fill="#FFFFFF" />
      <rect x="22" y="26" width="16" height="3" rx="1.5" fill="#FFFFFF" />
    </svg>
  ),

  Heal: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="healGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#71717A" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="22" stroke="url(#healGrad)" strokeWidth="1.5" />
      <path d="M18 30 H24 L27 18 L33 42 L36 30 H42" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="10" stroke="url(#healGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  ),

  SplitPDF: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pdfGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#3F3F46" />
        </linearGradient>
        <linearGradient id="pdfGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A1A1AA" />
          <stop offset="100%" stopColor="#18181B" />
        </linearGradient>
      </defs>
      <path d="M26 12 L12 19 L12 41 L26 34 Z" fill="url(#pdfGradLeft)" />
      <path d="M48 26 L34 33 L34 55 L48 48 Z" fill="url(#pdfGradRight)" />
      <path d="M20 17 L40 45" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" opacity="0.8" />
      <circle cx="30" cy="31" r="3.5" fill="#FFFFFF" />
    </svg>
  ),

  Drop: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
      </defs>
      <path d="M30 10 C30 10 15 24 15 34 C15 42.5 21.5 49 30 49 C38.5 49 45 42.5 45 34 C45 24 30 10 30 10 Z" fill="url(#dropGrad)" fillOpacity="0.85" />
      <path d="M30 18 C30 18 20 28 20 34 C20 39.5 24.5 44 30 44 C35.5 44 40 39.5 40 34 C40 28 30 18 30 18 Z" fill="#09090B" />
      <circle cx="30" cy="34" r="5" fill="#FFFFFF" />
    </svg>
  ),

  Type: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="typeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#52525B" />
        </linearGradient>
      </defs>
      <path d="M15 16 H45 V22 H33 V38 H38 V42 H22 V38 H27 V22 H15 V16 Z" fill="url(#typeGrad)" />
      <path d="M30 16 V28" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="2" fill="#FFFFFF" />
    </svg>
  ),

  BlueLab: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="labGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <path d="M30 8 L44 19 L44 41 L30 52 L16 41 L16 19 Z" stroke="url(#labGrad)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 8 L30 52" stroke="url(#labGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <path d="M16 19 L44 41 M44 19 L16 41" stroke="url(#labGrad)" strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="7" fill="#FFFFFF" style={{ filter: 'drop-shadow(0px 0px 8px rgba(96,165,250,0.8))' }} />
    </svg>
  ),

  ProjectHub: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#3F3F46" />
        </linearGradient>
      </defs>
      <path d="M30 6 L38 11 L38 21 L30 26 L22 21 L22 11 Z" fill="url(#hubGrad)" fillOpacity="0.9" />
      <path d="M21 22 L29 27 L29 37 L21 42 L13 37 L13 27 Z" fill="url(#hubGrad)" fillOpacity="0.6" />
      <path d="M39 22 L47 27 L47 37 L39 42 L31 37 L31 27 Z" fill="url(#hubGrad)" fillOpacity="0.3" />
      <circle cx="30" cy="24" r="3.5" fill="#FFFFFF" />
    </svg>
  ),

  DevKit: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="devGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
      </defs>
      <path d="M27 14 L15 21 L15 39 L27 46 V38 L19 33 V27 L27 22 Z" fill="url(#devGrad)" />
      <path d="M33 14 L45 21 L45 39 L33 46 V38 L41 33 V27 L33 22 Z" fill="url(#devGrad)" fillOpacity="0.5" />
      <rect x="29" y="18" width="2" height="24" rx="1" fill="#FFFFFF" style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.7))' }} />
    </svg>
  ),

  NetworkCheck: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#3F3F46" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="22" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="30" cy="30" r="14" stroke="url(#netGrad)" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="7" stroke="url(#netGrad)" strokeWidth="2" />
      <path d="M30 30 L46 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,0.85))' }} />
      <circle cx="46" cy="14" r="3.5" fill="#FFFFFF" />
      <circle cx="21" cy="39" r="2.5" fill="#FFFFFF" opacity="0.4" />
    </svg>
  ),

  SafeFile: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="safeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#52525B" />
        </linearGradient>
      </defs>
      <path d="M30 8 L46 14 V26 C46 36 39 45 30 49 C21 45 14 36 14 26 V14 Z" stroke="url(#safeGrad)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 14 L40 18 V26 C40 33 36 39 30 42 C24 39 20 33 20 26 V18 Z" fill="url(#safeGrad)" fillOpacity="0.45" />
      <circle cx="30" cy="26" r="3" fill="#FFFFFF" />
      <path d="M30 29 L30 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  FontGenerator: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="fontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
      </defs>
      <path d="M16 44 C16 44 20 20 32 20 C44 20 44 32 32 32 C20 32 24 44 36 44 C42 44 44 40 44 40" stroke="url(#fontGrad)" strokeWidth="3" strokeLinecap="round" />
      <rect x="29.5" y="17.5" width="5" height="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="1" />
      <rect x="29.5" y="29.5" width="5" height="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="1" />
      <line x1="32" y1="20" x2="38" y2="12" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="38" cy="12" r="2.5" fill="#FFFFFF" />
    </svg>
  ),
};

const products = [
  {
    id: 'bible',
    name: 'Bible',
    description: 'A clean, distraction-free reading experience for sacred texts, featuring customized display themes and fluid chapter navigation.',
    url: 'https://bible.savee.space/',
    icon: logos.Bible,
    color: '#ffffff',
  },
  {
    id: 'heal',
    name: 'Heal',
    description: 'A wellness telemetry tracker that monitors personal health stats and optimizes habits with custom analytics.',
    url: 'https://www.savee.space/',
    icon: logos.Heal,
    color: '#ef4444',
  },
  {
    id: 'drop',
    name: 'Drop',
    description: 'A fast WebRTC peer-to-peer file transfer engine, allowing direct, secure, in-browser transfers without cloud storage.',
    url: 'https://drop.savee.space/',
    icon: logos.Drop,
    color: '#a855f7',
  },
  {
    id: 'type',
    name: 'Type',
    description: 'A typing dashboard measuring keystroke velocity, speed, and accuracy stats with minimalist aesthetic feedback.',
    url: 'https://type.savee.space/',
    icon: logos.Type,
    color: '#14b8a6',
  },
  {
    id: 'sheethub',
    name: 'SheetHub',
    description: 'A smart spreadsheet collaboration platform that lets users edit, compute, and share spreadsheets online with clean UX.',
    url: 'https://sheethub.bluelabtech.space/',
    icon: logos.SplitPDF,
    color: '#3b82f6',
  },
  {
    id: 'bluelab',
    name: 'BlueLab',
    description: 'A digital product engineering agency helping builders design, build, and optimize technical software solutions.',
    url: 'https://www.bluelabtech.space/',
    icon: logos.BlueLab,
    color: '#2563eb',
  },
  {
    id: 'projecthub',
    name: 'ProjectHub',
    description: 'A collaborative search portal for students and developers to explore software blueprints and technical guides.',
    url: 'https://projecthub.bluelabtech.space/',
    icon: logos.ProjectHub,
    color: '#8b5cf6',
  },
  {
    id: 'devkit',
    name: 'DevKit',
    description: 'A productivity dashboard offering utility helpers, file converters, code linters, and developer encoders.',
    url: 'https://dev.bluelabtech.space/',
    icon: logos.DevKit,
    color: '#10b981',
  },
  {
    id: 'netcheck',
    name: 'NetCheck',
    description: 'An interactive network diagnostics dashboard carrying out real-time latency speed checks and bandwidth routing tests.',
    url: 'https://check.bluelabtech.space/',
    icon: logos.NetworkCheck,
    color: '#06b6d4',
  },
  {
    id: 'safefile',
    name: 'SafeFile',
    description: 'A secure upload verification engine testing files against signature indexes with quick cryptographic hash check.',
    url: 'https://safe.savee.space/',
    icon: logos.SafeFile,
    color: '#f59e0b',
  },
  {
    id: 'fontgen',
    name: 'FontGen',
    description: 'An interactive typography matching and matching sandbox previewing Google Fonts side-by-side dynamically.',
    url: 'https://font.savee.space/',
    icon: logos.FontGenerator,
    color: '#db2777',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function EcosystemShowcase() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-black/40">
      {/* Dynamic ambient lights */}
      <div aria-hidden="true" className="absolute top-10 left-1/4 w-[50vw] h-[30vh] rounded-full bg-gradient-to-r from-violet-600/5 to-blue-500/5 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-10 right-1/4 w-[40vw] h-[25vh] rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Grid background overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 font-semibold block mb-4">
            ✦ Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight uppercase">
            I've Built &amp; Contributed To
          </h2>
          <div className="mt-6 mx-auto flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-zinc-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-650" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-zinc-700" />
          </div>
        </motion.div>

        {/* Constellation Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center"
        >
          {products.map((product, idx) => (
            <EcosystemCard key={product.id} product={product} index={idx} />
          ))}
        </motion.div>

        {/* Footer Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-white/[0.06] flex justify-center items-center"
        >
          <div className="px-6 py-2 rounded-full border border-white/[0.05] bg-white/[0.01] backdrop-blur-md shadow-2xl">
            <p className="text-xs md:text-sm font-mono tracking-[0.2em] text-zinc-500 uppercase text-center">
              11 Products <span className="text-zinc-700 mx-2">•</span> 3 Platforms <span className="text-zinc-700 mx-2">•</span> 1 Vision
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);

  // Hex colors with alpha channels for customized glass/glow effects
  const brandColor = product.color;
  const glowColor = `${brandColor}15`; // 8% opacity for backing glow
  const glowOutline = `${brandColor}25`; // 14% opacity for border spotlight
  const textGlow = `${brandColor}10`; // very subtle text reflection

  // Out-of-phase floating translations for life-like ecosystem drift
  const driftY = [0, -6, 0];
  const driftDuration = 5 + (index % 3) * 0.75;
  const driftDelay = index * 0.15;

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      animate={{
        y: driftY,
        transition: {
          duration: driftDuration,
          delay: driftDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
        transition: { type: 'spring', stiffness: 350, damping: 20 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col justify-between p-8 min-h-[250px] rounded-[24px] bg-white/[0.01] hover:bg-white/[0.025] border border-white/[0.06] backdrop-blur-xl transition-colors duration-500 cursor-pointer overflow-hidden group select-none"
    >
      {/* Brand-specific neon backplate radial glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(150px circle at 50% 30%, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Brand-specific border spotlight border on hover */}
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-500 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: glowOutline,
          boxShadow: `inset 0 0 12px ${glowColor}`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Top bar: Icon & Brand Name */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 bg-white/[0.02] border border-white/[0.06] transition-all duration-500 group-hover:scale-105"
            style={{
              borderColor: isHovered ? glowOutline : 'rgba(255,255,255,0.06)',
              backgroundColor: isHovered ? `${brandColor}0a` : 'rgba(255,255,255,0.02)',
              boxShadow: isHovered ? `0 0 15px ${glowColor}` : 'none',
            }}
          >
            {product.icon}
          </div>
          <div className="text-left">
            <h3 
              className="text-lg font-semibold text-white tracking-wide transition-all duration-300"
              style={{
                textShadow: isHovered ? `0 0 8px ${textGlow}` : 'none',
              }}
            >
              {product.name}
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase">
              Application
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400 font-light text-left">
          {product.description}
        </p>
      </div>

      {/* Bottom bar: Clickable dynamic link */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-zinc-550 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5"
        >
          {product.url.replace('https://', '').replace('/', '')}
        </a>
        <motion.div
          animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="text-zinc-500 group-hover:text-white transition-colors"
        >
          <ArrowUpRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}
