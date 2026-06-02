import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import Signature from './Signature';
import ashilImage from '../assets/ashil.jpeg';

// Premium Android SVG Icon component
function AndroidIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-5.8-5.69l1.2-1.2a.495.495 0 000-.7.495.495 0 00-.7 0l-1.37 1.37A6.87 6.87 0 0012 3c-1.22 0-2.37.32-3.37.88L7.26 2.51a.495.495 0 00-.7 0 .495.495 0 000 .7l1.2 1.2C6.18 5.66 5 7.69 5 10h14c0-2.31-1.18-4.34-2.77-5.69zM9 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

/**
 * Symmetrical 12-column Bento Grid for Infant Ashil A
 * Restored with premium cinematic animations and performance-optimized hover structures.
 */

const greetings = [
  "Hey there! 👋",
  "Vanakkam! 🙏",
  "Welcome! ✨",
  "Hola amigo! 🌮",
  "What's up! 🤙",
  "Bonjour! 🥐",
  "Ciao! 🇮🇹",
];



// Custom reusable premium Bento Card wrapper with restored blur stagger (optimized - no mouse tracking)
function BentoCard({ children, className = "", delay = 0, style = {} }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        scale: 1.005,
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
      }}
      style={style}
      className={`bento-card group select-none relative ${className}`}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function HeroBento() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Title entrance stagger animation config
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const titleWord = {
    hidden: { y: 40, opacity: 0, filter: "blur(12px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-0 pb-24">
      {/* 12-Column Symmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">

        {/* === ROW 1 === */}

        {/* 1. Name Card (Col 1-9 / 12) - Boxless Layout */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 0,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="md:col-span-9 p-6 md:p-8 lg:p-10 min-h-[200px] flex flex-col justify-center relative select-none"
        >
          {/* Massive blurred purple/blue gradient behind name */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-tr from-violet-650/5 via-blue-500/3 to-transparent rounded-full blur-[180px] opacity-70 pointer-events-none z-0 select-none" />

          <div className="flex flex-col justify-center h-full flex-1 relative z-10">
            <div className="flex items-start gap-3.5 flex-wrap">
              <motion.h1
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                className="font-display font-semibold tracking-tight text-white leading-[1.05] select-none flex items-center" style={{ fontSize: 'clamp(2rem, 4.2vw, 4.2rem)' }}
              >
                <motion.span variants={titleWord} className="inline-block uppercase tracking-tight">INFANT ASHIL</motion.span>
                <motion.span variants={titleWord} className="text-violet-500/30 inline-block -ml-1.5 drop-shadow-[0_0_12px_rgba(124,58,237,0.35)]">.</motion.span>
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.div
                  key={greetingIndex}
                  initial={{ opacity: 0, scale: 0.8, x: -10, y: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="speech-bubble mt-1 sm:mt-2 whitespace-nowrap"
                >
                  {/* Floating breathing movement on greeting text */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {greetings[greetingIndex]}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 mt-5 md:mt-6 text-zinc-400 text-sm font-mono uppercase tracking-[0.22em]">
              <Sparkles size={12} className="text-violet-400 animate-pulse" />
              <span>Full Stack Developer & Chief Executive Officer</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Location Card (Col 10-12 / 12) - Dark compact card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: 0.12,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -4,
            scale: 1.005,
            transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
          }}
          whileTap={{ scale: 0.985, transition: { duration: 0.15 } }}
          className="bento-card group md:col-span-3 px-5 py-4 flex flex-col gap-3 relative overflow-hidden select-none z-10 self-start mt-8"
        >
          {/* Top category label */}
          <div className="w-full text-left">
            <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-semibold">Location</span>
          </div>

          {/* Thin divider line */}
          <div className="h-px w-full bg-white/[0.07]" />

          {/* Location Info — left aligned */}
          <div className="flex items-center gap-2.5 w-full text-left">
            {/* Pin icon */}
            <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-base">
              📍
            </div>
            <div className="min-w-0">
              <h3 className="text-white text-sm md:text-base font-semibold tracking-wide truncate">Coimbatore</h3>
              <p className="text-zinc-500 text-[10px] md:text-xs mt-0.5 font-sans tracking-tight truncate">SKCET</p>
            </div>
          </div>
        </motion.div>

        {/* 3. Bio Card (Col 1-8 / 12) */}
        <BentoCard
          delay={2}
          className="md:col-span-8 p-10 md:p-12 min-h-[380px] flex flex-col justify-between"
        >
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-lg md:text-[1.15rem] text-zinc-300 leading-[1.8] font-sans font-light">
                I'm a <span className="text-white font-medium">Computer Science student</span> and
                passionate <span className="text-white font-medium">Full Stack Developer</span> based in India.
                I love bridging the gap between front-end creativity and back-end logic.
              </p>
              <p className="text-base md:text-[1.05rem] text-zinc-405 leading-[1.8] mt-6 font-sans font-light">
                My focus is on crafting scalable web applications with clean architecture, great performance,
                and a user-first mindset.
              </p>
            </div>

            {/* Signature — premium realistic handwriting animation (enlarged for wide layout) */}
            <div className="mt-8 opacity-85 hover:opacity-100 transition-opacity duration-300 flex justify-start items-center cursor-pointer">
              <Signature
                className="w-60 h-16 md:w-72 md:h-20"
                color="#ffffff"
                strokeWidth={1.7}
              />
            </div>
          </div>

          {/* Bottom Contact Section - Aligned to the left, side-by-side with large text */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-semibold">Get in touch</span>
              <a
                href="mailto:infantashil55@gmail.com"
                className="text-base sm:text-lg md:text-xl font-mono text-zinc-200 hover:text-white transition-colors duration-300 tracking-tight"
              >
                infantashil55@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 self-start md:self-end md:mb-1">
              <a
                href="https://github.com/ashwiths"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.15)] hover:scale-105 transition-all duration-300 bg-white/[0.01] hover:bg-white/[0.03]"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/infant-ashil-a-b88a39361/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn w-10 h-10 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.15)] hover:scale-105 transition-all duration-300 bg-white/[0.01] hover:bg-white/[0.03]"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </BentoCard>

        {/* 4. Portrait Photo Card (Col 9-12 / 12 - Right Corner photo) */}
        <BentoCard
          delay={3}
          className="md:col-span-4 min-h-[380px] p-0 overflow-hidden relative group/photo"
        >
          {/* Soft ambient hover border glow */}
          <div className="absolute inset-0 border border-white/10 rounded-[32px] pointer-events-none z-20 transition-all duration-700 group-hover/photo:border-white/20 group-hover/photo:shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />

          {/* Film Grain overlay - dynamic response on hover */}
          <div className="absolute inset-0 bg-noise opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-700 mix-blend-overlay z-15 pointer-events-none" />

          <motion.img
            src={ashilImage}
            alt="Infant Ashil A"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-transform duration-[1.2s] ease-[0.25,1,0.5,1] scale-100 group-hover:scale-103"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* Fallback gradient if no photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#050505] items-center justify-center hidden">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white text-3xl font-display font-medium shadow-2xl">
              IA
            </div>
          </div>
          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 z-10">
            <span className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              IMG_ASHIL.JPG ✦
            </span>
          </div>
        </BentoCard>

        {/* === ROW 3 === */}

        {/* 6. Premium Navigation Dashboard Card (Col 1-8 / 12) */}
        <BentoCard
          delay={4}
          className="md:col-span-8 p-0 min-h-[380px] flex flex-col justify-between"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 h-full p-8 md:p-10 items-stretch">
            {/* Left section: Quote and Quick Navigation */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6 text-left">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-semibold block mb-3">
                  ✦ Philosophy
                </span>
                <h2 className="text-xl md:text-2xl font-display font-medium text-white leading-snug tracking-tight">
                  Programming is Easy, Software Development is Hard &amp; Maintaining Code is the Hardest
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mt-4 font-light">
                  When you are a programmer, you need to be able to do what you can do, and when you are a software developer, you need to be able to do what you can't do.
                </p>
              </div>

              {/* Bottom buttons */}
              <div className="flex flex-wrap gap-3 mt-auto">
                <button
                  onClick={() => window.location.hash = '#/experience'}
                  className="group flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold tracking-wide text-zinc-300 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                >
                  Read <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => window.location.hash = '#/more-projects'}
                  className="group flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/10 hover:border-white/20 text-xs font-semibold tracking-wide text-zinc-300 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                >
                  All articles <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right section: Links */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <div className="flex flex-col justify-between h-full py-1">
                {[
                  { label: "Products & Platforms I Built", target: "#/work" },
                  { label: "More Things I've Built", target: "#/more-projects" },
                  { label: "Where I've Worked", target: "#/experience" },
                  { label: "Let's Connect!", target: "#contact" }
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => window.location.hash = item.target}
                    className="flex items-center justify-between py-4 group/item cursor-pointer border-b border-white/[0.06] last:border-b-0"
                  >
                    <span className="text-zinc-405 group-hover/item:text-white transition-colors duration-300 font-medium text-lg md:text-[21px] tracking-tight">
                      {item.label}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover/item:bg-white group-hover/item:text-zinc-950 group-hover/item:scale-105 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <ArrowUpRight size={16} className="group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 7. Mini React Native App Showcase Widget (Col 9-12 / 12) - Side Showcase */}
        <BentoCard
          delay={5}
          className="md:col-span-4 p-6 min-h-[380px] flex flex-col justify-center items-center premium-border-card"
        >
          <div className="max-w-[420px] w-full flex flex-col justify-between h-full gap-4">
            {/* Top layout */}
            <div className="w-full text-left">
              <span className="todo-widget-title">
                📝 To|Do
              </span>
            </div>

            {/* Center layout: Mini Productivity Dashboard */}
            <div className="flex-grow flex items-center justify-between my-2 relative h-[90px] w-full px-0.5">
              <div className="dashboard-glowback-mini" />
              
              {/* Left side: Progress Ring */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background track */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="3" />
                    {/* Progress arc */}
                    <motion.circle 
                      cx="18" cy="18" r="15.915" fill="none" 
                      stroke="url(#todoGlowGrad)" strokeWidth="3.2" 
                      strokeDasharray="86 100" 
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="todoGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute todo-widget-circle-text">86%</span>
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="todo-widget-efficiency-label block leading-none">EFFICIENCY</span>
                  <span className="todo-widget-efficiency-value mt-[1px] block leading-none">OPTIMAL</span>
                </div>
              </div>

              {/* Right side: Compact Tasks */}
              <div className="flex flex-col gap-2 min-w-0 pr-1.5 justify-center h-full">
                <div className="todo-widget-task-item completed">
                  <span className="text-indigo-400 font-bold leading-none">✓</span>
                  <span className="truncate max-w-[140px]">Sync database</span>
                </div>
                <div className="todo-widget-task-item active">
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="text-violet-400 font-bold leading-none"
                  >
                    ✓
                  </motion.span>
                  <span className="truncate max-w-[140px]">Optimize model</span>
                </div>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-left py-2.5 border-t border-b border-white/[0.06]">
              {[
                "Smart Tasks",
                "Daily Planner",
                "Focus Mode",
                "AI Productivity"
              ].map((feat) => (
                <div key={feat} className="todo-widget-feature-item">
                  <span className="accent-star">✦</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Bottom layout: Compact APK Download */}
            <div className="w-full flex flex-col items-center gap-1 pt-3.5 border-t border-white/[0.06] mt-auto">
              <a 
                href="/todo.apk"
                download="todo.apk"
                className="download-apk-btn-mini"
              >
                <AndroidIcon className="w-3.5 h-3.5 fill-white stroke-none" />
                <span>⬇ Download APK</span>
              </a>
              <span className="todo-widget-version mt-1">
                v1.0.0 Android
              </span>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
