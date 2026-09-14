import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const projects = [
  {
    number: '01',
    title: 'Custon',
    category: 'PRODUCTIVITY / SHORTCUT ENGINE',
    demoUrl: 'https://custon.savee.space/',
    githubUrl: 'https://github.com/ashwiths/Custon',
    description:
      'Intelligent keyboard shortcut and workflow automation platform. Enables users to build, manage, and trigger custom command palettes, instant macros, and key bindings to automate complex actions with lightning speed.',
    tech: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'Keyboard API',
      'REST APIs',
      'Vite',
    ],
    metrics: [
      { label: 'FUNCTION', value: 'Macro & Shortcut Engine' },
      { label: 'EXECUTION', value: 'Instant Trigger' },
      { label: 'DOMAIN', value: 'custon.savee.space' },
    ],
  },
  {
    number: '02',
    title: 'Chrome Account Switcher',
    category: 'SYSTEM UTILITY / DESKTOP APP',
    demoUrl: 'https://chromeswitch.savee.space/',
    githubUrl: 'https://github.com/ashwiths',
    description:
      'Lightweight native desktop utility engineered to jump between multiple Google Chrome profiles in seconds via global hotkeys — preserving all open tabs, active sessions, and unsaved work without friction.',
    tech: [
      'Electron.js',
      'React.js',
      'TypeScript',
      'Node.js',
      'Win32 APIs',
      'Tailwind CSS',
      'Vite',
    ],
    metrics: [
      { label: 'PERFORMANCE', value: 'Instant Profile Switch' },
      { label: 'SECURITY', value: '100% Offline & Private' },
      { label: 'DOMAIN', value: 'chromeswitch.savee.space' },
    ],
  },
  {
    number: '03',
    title: 'Heal & Play',
    category: 'SOCIAL IMPACT / FINTECH GAMING',
    demoUrl: 'https://www.savee.space/',
    githubUrl: 'https://github.com/ashwiths/Goodthing',
    description:
      'Gamified social impact and micro-donation platform supporting verified pediatric medical treatments. Integrates interactive browser mini-games with direct-to-hospital micro-funding verification and live transparent settlement tracking.',
    tech: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'Micro-Payments',
      'REST APIs',
      'Vite',
    ],
    metrics: [
      { label: 'MISSION', value: 'Pediatric Care Fund' },
      { label: 'MODEL', value: 'Micro-Donations' },
      { label: 'DOMAIN', value: 'www.savee.space' },
    ],
  },
  {
    number: '04',
    title: '3D Bible Experience',
    category: '3D WEB EXPERIENCE / WEBGL',
    demoUrl: 'https://bible.savee.space/',
    githubUrl: 'https://github.com/ashwiths/Bible',
    description:
      'Immersive 3D Bible reading and sacred scripture exploration web platform. Engineered with interactive 3D spatial typography, WebGL lighting, smooth camera choreography, focus-mode reading layouts, and fluid chapter navigation.',
    tech: [
      'Three.js',
      'WebGL',
      'React.js',
      'GLSL Shaders',
      'Framer Motion',
      'Tailwind CSS',
      'Vite',
    ],
    metrics: [
      { label: 'RENDER ENGINE', value: 'Three.js / WebGL' },
      { label: 'DOMAIN', value: 'bible.savee.space' },
      { label: 'INTERACTION', value: '3D Spatial Reading' },
    ],
  },
];

/* Mobile Card with Real-Time Scrolling Stacking Animation */
const MobileProjectCard = ({ project, index, total }) => {
  const cardContainerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <div
      ref={cardContainerRef}
      className="sticky w-full"
      style={{
        top: `calc(72px + ${index * 14}px)`,
        zIndex: index + 1,
        marginBottom: index === total - 1 ? '0px' : '40px',
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className="relative w-full rounded-xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/60" />

        <span
          className="absolute -bottom-4 -right-2 text-7xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {project.number}
        </span>

        <div className="flex flex-col space-y-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
                {project.number} //
              </span>
              <span className="text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#A8988B]">
                {project.category}
              </span>
            </div>

            <h3
              className="text-3xl font-normal tracking-tight text-white mb-2 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h3>

            <p
              className="text-[12px] font-light text-[#BDB0A4] leading-relaxed tracking-wide mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#8C6D4F]/25">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 text-[9px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
              // ARCHITECTURE METRICS
            </span>
            <div className="grid grid-cols-1 gap-2">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                >
                  <span className="text-[9.5px] font-mono text-[#A8988B]">
                    {m.label}
                  </span>
                  <span className="text-[10.5px] font-mono font-medium text-[#F7E7C4]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-[10px] font-semibold tracking-[0.18em] uppercase text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>VISIT LIVE</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-[#8C6D4F] bg-[#16120E] text-[#EAD8C7] text-[10px] font-medium tracking-[0.18em] uppercase text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>GITHUB</span>
                <span className="text-xs">↗</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 pb-24 sm:pt-20 sm:pb-32 px-4 sm:px-8 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-5"
        >
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            02 / FEATURED WORK
          </span>
          <div className="w-16 sm:w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14"
        >
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.88] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              SELECTED WORKS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              ENGINEERED VALUE.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-3 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scroll down to unfold the system architecture cards. Each platform was built to solve complex operational challenges.
          </p>
        </motion.div>

        {/* 1. Desktop View (Original ReactBits ScrollStack) */}
        <div className="hidden md:block">
          <ScrollStack
            itemDistance={80}
            itemScale={0.03}
            itemStackDistance={32}
            stackPosition="15%"
            scaleEndPosition="8%"
            baseScale={0.88}
            useWindowScroll={true}
          >
            {projects.map((project) => (
              <ScrollStackItem key={project.title}>
                <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                  <span
                    className="absolute -bottom-6 -right-3 text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {project.number}
                  </span>

                  <div className="grid grid-cols-12 gap-8 items-start relative z-10">
                    <div className="col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-xs font-mono font-bold text-[#D4AF37]">
                            {project.number} //
                          </span>
                          <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                            {project.category}
                          </span>
                        </div>

                        <h3
                          className="text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {project.title}
                        </h3>

                        <p
                          className="text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-5 flex flex-col justify-between h-full space-y-6 pl-6 border-l border-[#8C6D4F]/25">
                      <div className="space-y-3">
                        <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                          // ARCHITECTURE METRICS
                        </span>
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                          >
                            <span className="text-[10px] font-mono text-[#A8988B]">
                              {m.label}
                            </span>
                            <span className="text-[11px] font-mono font-medium text-[#F7E7C4]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-row gap-3 pt-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 border border-[#D4AF37] bg-[#D4AF37] hover:bg-[#c49f2c] text-black text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            <span>VISIT LIVE</span>
                            <span className="text-xs">↗</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:text-white text-[#EAD8C7] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            <span>VIEW GITHUB</span>
                            <span className="text-xs">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* 2. Mobile View (Dedicated Real-Time Stacking Deck Animation) */}
        <div className="block md:hidden relative w-full flex flex-col">
          {projects.map((project, index) => (
            <MobileProjectCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
