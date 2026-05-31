import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * EcosystemShowcase — Premium cinematic founder ecosystem wall.
 * 11 products, bespoke SVG logos, editorial asymmetric layout.
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
      {/* Left side book panel */}
      <path d="M12 20C12 14.5 16.5 10 22 10H28V50H22C16.5 50 12 45.5 12 40V20Z" fill="url(#bibleGrad)" fillOpacity="0.85" />
      {/* Right side book panel */}
      <path d="M48 20C48 14.5 43.5 10 38 10H32V50H38C43.5 50 48 45.5 48 40V20Z" fill="url(#bibleGrad)" fillOpacity="0.45" />
      {/* Floating cross intersection bar */}
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
      {/* High-end circular telemetry frame */}
      <circle cx="30" cy="30" r="22" stroke="url(#healGrad)" strokeWidth="1.5" />
      {/* Continuous EKG pulse representing H */}
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
      {/* Top/Left document face in 3D isometric */}
      <path d="M26 12 L12 19 L12 41 L26 34 Z" fill="url(#pdfGradLeft)" />
      {/* Bottom/Right document face shifted down/right */}
      <path d="M48 26 L34 33 L34 55 L48 48 Z" fill="url(#pdfGradRight)" />
      {/* Slicing vector connector */}
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
      {/* Outer concentric drop */}
      <path d="M30 10 C30 10 15 24 15 34 C15 42.5 21.5 49 30 49 C38.5 49 45 42.5 45 34 C45 24 30 10 30 10 Z" fill="url(#dropGrad)" fillOpacity="0.85" />
      {/* Inner layer drop */}
      <path d="M30 18 C30 18 20 28 20 34 C20 39.5 24.5 44 30 44 C35.5 44 40 39.5 40 34 C40 28 30 18 30 18 Z" fill="#09090B" />
      {/* Core data packet circular seed */}
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
      {/* Elegant chiseled editorial monogram */}
      <path d="M15 16 H45 V22 H33 V38 H38 V42 H22 V38 H27 V22 H15 V16 Z" fill="url(#typeGrad)" />
      {/* Inking nib division slit */}
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
      {/* Hexagonal refractive lab prism casing */}
      <path d="M30 8 L44 19 L44 41 L30 52 L16 41 L16 19 Z" stroke="url(#labGrad)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Facet lines */}
      <path d="M30 8 L30 52" stroke="url(#labGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <path d="M16 19 L44 41 M44 19 L16 41" stroke="url(#labGrad)" strokeWidth="1" opacity="0.4" />
      {/* Floating digital nucleus */}
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
      {/* Three locking modules */}
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
      {/* Left compilation bracket block */}
      <path d="M27 14 L15 21 L15 39 L27 46 V38 L19 33 V27 L27 22 Z" fill="url(#devGrad)" />
      {/* Right compilation bracket block */}
      <path d="M33 14 L45 21 L45 39 L33 46 V38 L41 33 V27 L33 22 Z" fill="url(#devGrad)" fillOpacity="0.5" />
      {/* Compile beam cursor */}
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
      {/* Telemetry concentric loops */}
      <circle cx="30" cy="30" r="22" stroke="url(#netGrad)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="30" cy="30" r="14" stroke="url(#netGrad)" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="7" stroke="url(#netGrad)" strokeWidth="2" />
      {/* Sweeping sensor arm */}
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
      {/* Outer shield frame */}
      <path d="M30 8 L46 14 V26 C46 36 39 45 30 49 C21 45 14 36 14 26 V14 Z" stroke="url(#safeGrad)" strokeWidth="2" strokeLinejoin="round" />
      {/* Inner solid vault shield */}
      <path d="M30 14 L40 18 V26 C40 33 36 39 30 42 C24 39 20 33 20 26 V18 Z" fill="url(#safeGrad)" fillOpacity="0.45" />
      {/* Vault lock core keyhole */}
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
      {/* Stylized vector typography curve */}
      <path d="M16 44 C16 44 20 20 32 20 C44 20 44 32 32 32 C20 32 24 44 36 44 C42 44 44 40 44 40" stroke="url(#fontGrad)" strokeWidth="3" strokeLinecap="round" />
      {/* Bezier control handles */}
      <rect x="29.5" y="17.5" width="5" height="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="1" />
      <rect x="29.5" y="29.5" width="5" height="5" fill="#FFFFFF" stroke="#09090B" strokeWidth="1" />
      {/* Vector control arm */}
      <line x1="32" y1="20" x2="38" y2="12" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="38" cy="12" r="2.5" fill="#FFFFFF" />
    </svg>
  ),
};

const constellation = [
  { id: 'bible',       name: 'Bible',         tagline: 'Sacred Reading',      url: 'https://bible.savee.space/',               icon: logos.Bible,         left: '18%', top: '18%', mobileY: 0,  scale: 0.95, opacity: 0.8,  zIndex: 10 },
  { id: 'heal',        name: 'Heal',          tagline: 'Wellness Platform',    url: 'https://www.savee.space/',                 icon: logos.Heal,          left: '40%', top: '12%', mobileY: 8,  scale: 1.05, opacity: 0.95, zIndex: 20 },
  { id: 'splitpdf',    name: 'Split PDF',     tagline: 'Document Tools',       url: 'https://sheethub.bluelabtech.space/',      icon: logos.SplitPDF,      left: '60%', top: '14%', mobileY: -6, scale: 0.9,  opacity: 0.75, zIndex: 5  },
  { id: 'drop',        name: 'Drop',          tagline: 'File Transfer',        url: 'https://drop.savee.space/',                icon: logos.Drop,          left: '82%', top: '20%', mobileY: 4,  scale: 1.0,  opacity: 0.9,  zIndex: 15 },
  { id: 'type',        name: 'Type',          tagline: 'Writing Tool',         url: 'https://type.savee.space/',                icon: logos.Type,          left: '27%', top: '46%', mobileY: -8, scale: 1.0,  opacity: 0.9,  zIndex: 15 },
  { id: 'bluelab',     name: 'BlueLab',       tagline: 'Digital Agency',       url: 'https://www.bluelabtech.space/',           icon: logos.BlueLab,       left: '50%', top: '42%', mobileY: 2,  scale: 1.15, opacity: 1.0,  zIndex: 30 },
  { id: 'projecthub',  name: 'ProjectHub',    tagline: 'Dev Collaboration',    url: 'https://projecthub.bluelabtech.space/',    icon: logos.ProjectHub,    left: '73%', top: '46%', mobileY: -4, scale: 0.95, opacity: 0.85, zIndex: 10 },
  { id: 'devkit',      name: 'DevKit',        tagline: 'Engineer Toolkit',     url: 'https://dev.bluelabtech.space/',           icon: logos.DevKit,        left: '12%', top: '66%', mobileY: 6,  scale: 0.9,  opacity: 0.7,  zIndex: 5  },
  { id: 'netcheck',    name: 'Net Check',     tagline: 'Network Diagnostics',  url: 'https://check.bluelabtech.space/',         icon: logos.NetworkCheck,  left: '37%', top: '74%', mobileY: -6, scale: 1.0,  opacity: 0.9,  zIndex: 15 },
  { id: 'safefile',    name: 'Safe File',     tagline: 'Secure Vault',         url: 'https://safe.savee.space/',                icon: logos.SafeFile,      left: '63%', top: '72%', mobileY: 8,  scale: 1.05, opacity: 0.95, zIndex: 20 },
  { id: 'fontgen',     name: 'Font Gen',      tagline: 'Typography Creator',   url: 'https://font.savee.space/',                icon: logos.FontGenerator, left: '88%', top: '64%', mobileY: 0,  scale: 0.9,  opacity: 0.7,  zIndex: 5  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    setIsDesktop(media.matches);
    const listener = (e) => setIsDesktop(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return isDesktop;
}

const itemVariants = {
  hidden: (custom) => ({
    opacity: 0,
    scale: custom.scale * 0.85,
    y: 15,
    filter: 'blur(6px)',
  }),
  visible: (custom) => ({
    opacity: custom.opacity,
    scale: custom.scale,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.05 + custom.index * 0.05,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hovered: (custom) => ({
    opacity: 1,
    scale: custom.scale * 1.12,
    y: -4,
    transition: { type: 'spring', stiffness: 350, damping: 20 },
  }),
};

export default function EcosystemShowcase() {
  const [hoveredId, setHoveredId] = useState(null);
  const isDesktop = useIsDesktop();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">

      {/* ── Layered ambient glow ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full bg-gradient-to-b from-violet-600/5 via-indigo-500/3 to-transparent blur-[90px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35vw] h-[15vh] rounded-full bg-gradient-to-t from-violet-800/6 to-transparent blur-[60px] pointer-events-none" />

      {/* ── Individual Logo Glow Pockets (under dot grid) ── */}
      <div className="absolute inset-0 pointer-events-none md:block hidden z-0">
        {constellation.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={`glow-${item.id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px] pointer-events-none transition-all duration-700 ease-out"
              style={{
                left: item.left,
                top: item.top,
                width: isHovered ? '160px' : '100px',
                height: isHovered ? '160px' : '100px',
                background: isHovered
                  ? `radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.06) 60%, transparent 100%)`
                  : `radial-gradient(circle, rgba(99,102,241,${item.opacity * 0.08}) 0%, rgba(139,92,246,${item.opacity * 0.02}) 60%, transparent 100%)`,
              }}
            />
          );
        })}
      </div>

      {/* ── Dotted background grid ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(190,170,140,0.14) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 50%, black 25%, transparent 80%)',
        }}
      />

      <div className="relative z-20 max-w-[1000px] mx-auto px-6 md:px-12">

        {/* ── Section heading ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[11px] md:text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase mb-4">
            ✦ Ecosystem
          </p>
          <h2 className="font-display font-bold text-4xl md:text-[3rem] lg:text-[3.8rem] text-white/90 uppercase tracking-[0.07em] leading-[1.08]">
            I'VE BUILT &amp;<br />
            CONTRIBUTED TO
          </h2>
          {/* Thin decorative rule */}
          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-zinc-600/50" />
            <div className="w-1 h-1 rounded-full bg-zinc-600/50" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-zinc-600/50" />
          </div>
        </motion.div>

        {/* ── Constellation Cluster Container ── */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 md:block md:relative md:h-[350px] lg:h-[380px] w-full max-w-[960px] mx-auto">
          {constellation.map((product, idx) => (
            <LogoItem
              key={product.id}
              product={product}
              index={idx}
              isDesktop={isDesktop}
              onHoverStart={setHoveredId}
              onHoverEnd={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* ── Footer micro-label ────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mt-12 md:mt-16 text-[11px] md:text-xs font-mono tracking-[0.18em] text-zinc-600 uppercase"
        >
          {constellation.length} products · 3 platforms · 1 vision
        </motion.p>

      </div>
    </section>
  );
}

// ─── Individual logo tile ─────────────────────────────────────────────────────
function LogoItem({ product, index, isDesktop, onHoverStart, onHoverEnd }) {
  return (
    <div
      className="md:absolute relative hover:z-50 transition-all duration-300"
      style={isDesktop ? {
        left: product.left,
        top: product.top,
        transform: 'translate(-50%, -50%)',
        zIndex: product.zIndex,
      } : {
        transform: product.mobileY ? `translateY(${product.mobileY}px)` : undefined,
        zIndex: product.zIndex,
      }}
    >
      <motion.a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        id={`ecosystem-${product.id}`}
        custom={{ index, scale: product.scale, opacity: product.opacity }}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hovered"
        viewport={{ once: true, margin: '-40px' }}
        onMouseEnter={() => onHoverStart(product.id)}
        onMouseLeave={onHoverEnd}
        className="group flex flex-col items-center gap-2.5 cursor-pointer select-none outline-none"
        aria-label={`${product.name} — ${product.tagline}`}
      >
        {/* ── Icon wrapper ── */}
        <motion.div
          variants={{
            hovered: { scale: 1.1, y: -3, transition: { type: 'spring', stiffness: 340, damping: 22 } },
          }}
          className="relative w-10 h-10 md:w-12 md:h-12 text-zinc-400/65 group-hover:text-zinc-100 transition-colors duration-500"
        >
          {/* Ambient hover halo */}
          <motion.div
            variants={{
              hovered: { opacity: 1, scale: 1.4, transition: { duration: 0.4 } },
            }}
            initial={{ opacity: 0, scale: 1 }}
            className="absolute inset-0 rounded-full bg-violet-500/[0.08] blur-md pointer-events-none"
          />
          {/* Outer ring on hover */}
          <motion.div
            variants={{
              hovered: { opacity: 1, transition: { duration: 0.35 } },
            }}
            initial={{ opacity: 0 }}
            className="absolute -inset-2.5 rounded-full border border-violet-500/[0.12] pointer-events-none"
          />
          {product.icon}
        </motion.div>

        {/* ── Label ── */}
        <div className="text-center">
          <p className="text-[11px] md:text-[13px] font-mono uppercase tracking-[0.16em] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 leading-tight">
            {product.name}
          </p>
          <motion.p
            variants={{ hovered: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            initial={{ opacity: 0, y: 3 }}
            className="text-[9px] md:text-[10px] font-mono tracking-[0.1em] text-zinc-600 uppercase mt-0.5 leading-tight"
          >
            {product.tagline}
          </motion.p>
        </div>
      </motion.a>
    </div>
  );
}
