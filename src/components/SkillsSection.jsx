import { useState } from 'react';
import { motion } from 'framer-motion';

const bentoCategories = [
  {
    title: 'REACT ARCHITECTURE',
    badge: 'CORE PILLAR',
    items: [
      { name: 'Bible', url: 'https://bible.savee.space' },
      { name: 'MalwareScan', url: 'https://safe.savee.space' },
      { name: 'AshDrop', url: 'https://drop.savee.space' },
      { name: 'FontPair', url: 'https://font.savee.space' },
      { name: 'TypeMaster', url: 'https://type.savee.space' },
      { name: 'Heal & Play', url: 'https://www.savee.space' },
      { name: 'BlueLab', url: 'https://www.bluelabtech.space' },
      { name: 'NetCheck', url: 'https://check.bluelabtech.space' },
      { name: 'DevKit', url: 'https://dev.bluelabtech.space' },
      { name: 'ProjectHub', url: 'https://projecthub.bluelabtech.space' },
      { name: 'SheetHub', url: 'https://sheethub.bluelabtech.space' },
    ],
    description: 'Specialized in building high-performance client applications, custom component libraries, and immersive desktop/mobile interfaces.',
    stat: '100% RESPONSIVE',
    colSpan: 'lg:col-span-7',
  },
  {
    title: 'REACT NATIVE',
    badge: 'MOBILE APPS',
    items: [
      { name: 'Crickstreet', url: '/crickstreet.apk', download: true },
      { name: 'Todo', url: '/todo.apk', download: true },
    ],
    description: 'Specialized in React Native mobile app development. Built Crickstreet — online cricket score tracking app, and Todo — smart productivity & task manager.',
    stat: 'ANDROID RELEASE',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'WINDOWS APPLICATION',
    badge: 'NATIVE DESKTOP',
    items: [
      { name: 'Custon', url: 'https://custon.savee.space' },
      'Tauri',
      'Rust',
      'Vite',
    ],
    description: 'Engineered high-performance Windows desktop applications. Built Custon desktop app using Tauri, Rust, and Vite.',
    stat: 'WINDOWS X64',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'CHROME EXTENSION',
    badge: 'BROWSER TOOLS',
    items: [
      { name: 'ChromeSwitch', url: 'https://chromeswitch.savee.space' },
      'Manifest V3',
      'Chrome API',
      'JavaScript',
      'Shortcuts',
    ],
    description: 'Built high-productivity browser tools. Created ChromeSwitch — instant keyboard-driven profile switcher with session preservation.',
    stat: 'MANIFEST V3',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'UI/UX DESIGN',
    badge: 'USER EXPERIENCE',
    items: ['Figma', 'Design Systems', 'Wireframing', 'Prototyping', 'User Research'],
    description: 'Crafting intuitive user interfaces, high-fidelity interactive prototypes, design systems, and cohesive user journeys.',
    stat: 'FIGMA & SYSTEMS',
    colSpan: 'lg:col-span-4',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function SkillsSection() {
  const [, setHoveredIdx] = useState(null);

  return (
    <section
      id="skills"
      className="relative z-20 w-full min-h-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-20 lg:pt-20 lg:pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-4"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            03 / TECH MATRIX
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 lg:mb-8"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight uppercase leading-[0.88] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              ARCHITECTURAL MASTERY.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              PRECISION APPLIED.
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid (Single Page Layout: 2 on Top, 3 on Bottom) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
        >
          {bentoCategories.map((block, idx) => (
            <motion.div
              key={block.title}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`${block.colSpan} relative p-6 sm:p-7 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/80 hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)] cursor-pointer group flex flex-col justify-between`}
            >
              {/* Top Subtle Border Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner Minimal Pins */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />

              <div>
                {/* Card Meta Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] group-hover:text-[#F3DBB3] transition-colors">
                    {block.badge}
                  </span>
                  <span className="text-[9.5px] font-mono px-2 py-0.5 border border-[#8C6D4F]/40 text-[#C4B5A5] bg-[#17130F] group-hover:border-[#D4AF37]/50 group-hover:text-white transition-all">
                    {block.stat}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl sm:text-3xl font-normal tracking-wide text-white mb-2 group-hover:text-[#F7E7C4] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {block.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs sm:text-[12.5px] text-[#A8988B] font-light leading-relaxed mb-5 group-hover:text-[#D5CBC0] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {block.description}
                </p>
              </div>

              {/* Interactive Tag Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-[#8C6D4F]/20 mt-auto">
                {block.items.map((tech) => {
                  const isLink = typeof tech === 'object' && tech.url;
                  const label = typeof tech === 'object' ? tech.name : tech;
                  const url = typeof tech === 'object' ? tech.url : null;
                  const isDownload = typeof tech === 'object' && tech.download;

                  if (isLink) {
                    return (
                      <a
                        key={label}
                        href={url}
                        download={isDownload ? (typeof tech.download === 'string' ? tech.download : true) : undefined}
                        target={isDownload ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#D4AF37]/50 bg-[#171310] text-[#F7E7C4] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 hover:text-white transition-all duration-300 group/chip"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>{label}</span>
                        {isDownload ? (
                          <svg className="w-2.5 h-2.5 opacity-70 group-hover/chip:opacity-100 group-hover/chip:translate-y-0.5 transition-all text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        ) : (
                          <svg className="w-2.5 h-2.5 opacity-70 group-hover/chip:opacity-100 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 transition-all text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </a>
                    );
                  }

                  return (
                    <span
                      key={label}
                      className="px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#171310] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 group-hover:bg-[#1F1914] group-hover:text-white transition-all duration-300"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default SkillsSection;
