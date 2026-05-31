import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Github, Linkedin, Mail, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import Signature from './Signature';
import ashilImage from '../assets/ashil.jpeg';

/**
 * Symmetrical 12-column Bento Grid for Infant Ashil A
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

// Helper to animate count counters
function AnimatedCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value, 10);
  const isString = isNaN(numericValue);

  useEffect(() => {
    if (isString) {
      setCount(value);
      return;
    }
    let start = 0;
    const end = numericValue;
    const startTime = performance.now();

    function updateCount(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress); // Ease out quad
      
      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }

    requestAnimationFrame(updateCount);
  }, [value, duration, numericValue, isString]);

  if (isString) return <span>{count}</span>;
  return <span>{count}{value.includes('+') ? '+' : ''}</span>;
}

// Custom reusable premium Bento Card wrapper with Spotlight cursor glow
function BentoCard({ children, className = "", delay = 0, style = {} }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
        "--x": `${mousePos.x}px`,
        "--y": `${mousePos.y}px`,
      }}
      className={`bento-card group select-none relative ${className}`}
    >
      {/* Cursor spotlight border */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      />
      {/* Background radial spotlight */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.07), transparent 75%)`,
        }}
      />
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

  return (
    <section id="home" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-12">
      {/* 12-Column Symmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* === ROW 1 === */}
        
        {/* 1. Name Card (Col 1-8 / 12) */}
        <BentoCard
          delay={0}
          className="md:col-span-8 p-8 md:p-12 min-h-[280px]"
        >
          {/* Subtle glow accent behind title */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-violet-600/10 to-blue-500/10 rounded-full blur-[80px] opacity-70 pointer-events-none z-0" />
          
          <div className="flex items-start gap-4 flex-wrap relative z-10">
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-white leading-[0.9] select-none">
              infant<span className="text-zinc-600">.</span>ashil<span className="text-violet-500 font-serif font-normal">.</span>
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={greetingIndex}
                initial={{ opacity: 0, scale: 0.8, x: -10, y: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="speech-bubble mt-2 sm:mt-4 whitespace-nowrap"
              >
                {greetings[greetingIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-2 mt-8 md:mt-12 text-zinc-400 text-xs font-mono uppercase tracking-[0.2em]">
            <Sparkles size={12} className="text-violet-400 animate-pulse" />
            <span>Full Stack Developer & Founder</span>
          </div>
        </BentoCard>

        {/* 2. Available for Projects / Now Playing Card (Col 9-12 / 12) */}
        <BentoCard
          delay={1}
          className="md:col-span-4 p-8 flex flex-col justify-between min-h-[280px]"
        >
          <div className="flex items-center justify-between">
            <div className="section-label flex items-center gap-2 text-zinc-300">
              Available for Projects
            </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic font-serif">
              "Building digital products with code, pixel-perfection, and high interactivity."
            </p>
            
            <div className="flex items-center gap-4 mt-6 p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative overflow-hidden group/music">
              {/* Rotating music glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 opacity-0 group-hover/music:opacity-100 transition-opacity duration-500" />
              
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex-shrink-0 flex items-center justify-center relative shadow-lg shadow-violet-500/20">
                <Music size={16} className="text-white animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div className="min-w-0 flex-1 z-10">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-white tracking-wide uppercase font-mono">recent favorite</p>
                  {/* Equalizer bars */}
                  <div className="flex items-end gap-[2px] h-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] bg-violet-400 rounded-full"
                        animate={{
                          height: ["30%", "100%", "50%", "80%", "30%"],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: i * 0.12,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm font-semibold text-white truncate mt-0.5">Stargazing</p>
                <p className="text-xs text-zinc-400 truncate">Travis Scott</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* === ROW 2 === */}

        {/* 3. Bio Card (Col 1-4 / 12) */}
        <BentoCard
          delay={2}
          className="md:col-span-4 p-8 md:p-10 min-h-[420px]"
        >
          <div className="flex-1">
            <p className="text-[15px] text-zinc-300 leading-relaxed font-sans font-light">
              I'm a <span className="text-white font-medium">Computer Science student</span> and 
              passionate <span className="text-white font-medium">Full Stack Developer</span> based in India. 
              I love bridging the gap between front-end creativity and back-end logic.
            </p>
            <p className="text-[14px] text-zinc-400 leading-relaxed mt-4 font-sans font-light">
              My focus is on crafting scalable web applications with clean architecture, great performance, 
              and a user-first mindset.
            </p>
          </div>

          {/* Bottom: Signature + Socials row */}
          <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Find me at</span>
                <a href="mailto:infantashil55@gmail.com" className="text-xs text-zinc-300 hover:text-white transition-colors mt-1 font-mono">
                  hello@ashil.space
                </a>
              </div>
              <Signature 
                className="w-24 h-8 opacity-80 hover:opacity-100 transition-opacity" 
                color="#ffffff"
                delay={0.8}
                strokeWidth={1.8}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <a href="https://github.com/ashwiths" target="_blank" rel="noopener noreferrer" className="social-icon-btn w-9 h-9"><Github size={15} /></a>
              <a href="https://linkedin.com/in/infant-ashil-a" target="_blank" rel="noopener noreferrer" className="social-icon-btn w-9 h-9"><Linkedin size={15} /></a>
              <a href="mailto:infantashil55@gmail.com" className="social-icon-btn w-9 h-9"><Mail size={15} /></a>
            </div>
          </div>
        </BentoCard>

        {/* 4. Portrait Photo Card (Col 5-8 / 12 - Center photo) */}
        <BentoCard
          delay={3}
          className="md:col-span-4 min-h-[420px] p-0 overflow-hidden relative"
        >
          {/* Subtle glow border */}
          <div className="absolute inset-0 border border-white/10 rounded-[28px] pointer-events-none z-20" />
          
          {/* Film Grain overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay z-15 pointer-events-none" />
          
          <motion.img
            src={ashilImage}
            alt="Infant Ashil A"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-95 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.2s] ease-[0.25,1,0.5,1] scale-[1.01] group-hover:scale-[1.04]"
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
          {/* Bottom label like reubence "IMG.jpg" */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 z-10">
            <span className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              IMG_ASHIL.JPG ✦
            </span>
          </div>
        </BentoCard>

        {/* 5. Experiments / Products Card (Col 9-12 / 12) */}
        <BentoCard
          delay={4}
          className="md:col-span-4 p-8 flex flex-col justify-between min-h-[420px]"
        >
          <div>
            <div className="section-label mb-6">🧪 EXPERIMENTS</div>
            <div className="flex flex-col gap-3">
              {[
                { name: "BlueLab Technologies", desc: "Digital Agency & Web Dev", url: "https://bluelabtech.space", color: "#3B82F6", glow: "hover:shadow-blue-500/5 hover:border-blue-500/30" },
                { name: "ProjectHub", desc: "Discover Software Projects", url: "https://projecthub.bluelabtech.space", color: "#7C3AED", glow: "hover:shadow-violet-500/5 hover:border-violet-500/30" },
                { name: "DevKit", desc: "Developer Toolkit Platform", url: "https://dev.bluelabtech.space", color: "#10B981", glow: "hover:shadow-emerald-500/5 hover:border-emerald-500/30" },
              ].map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/item border border-white/5 bg-white/[0.01] rounded-2xl p-4 flex items-center justify-between relative overflow-hidden transition-all duration-300 ${project.glow} hover:bg-white/[0.03] hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="min-w-0">
                    <p className="text-white text-[13px] font-semibold tracking-wide transition-colors group-hover/item:text-white">{project.name}</p>
                    <p className="text-zinc-400 text-[10px] mt-0.5">{project.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover/item:bg-white/10 group-hover/item:text-white transition-all">
                    <ExternalLink size={12} />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-wider text-right">
            01 / 03 LIVE PROJECTS
          </div>
        </BentoCard>

        {/* === ROW 3 === */}

        {/* 6. Tech Stack Card (Col 1-4 / 12) */}
        <BentoCard
          delay={5}
          className="md:col-span-4 p-8 min-h-[220px] flex flex-col justify-between"
        >
          <div className="section-label mb-5">⚡ Skills & Tools</div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {['HTML', 'CSS', 'React', 'JavaScript', 'Node.js', 'Express', 'Tailwind', 'MongoDB', 'Python', 'Web Perf'].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300 hover:border-violet-500/30 hover:text-white hover:bg-violet-500/[0.04] transition-all cursor-default shadow-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </BentoCard>

        {/* 7. Location Card (Col 5-8 / 12) */}
        <BentoCard
          delay={6}
          className="md:col-span-4 p-8 relative overflow-hidden min-h-[220px] flex flex-col justify-between"
        >
          {/* Sonar Radar sweep background */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 75% 60%, var(--color-accent) 0%, transparent 60%)',
            }}
          />
          
          {/* Sonar sweep line effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-violet-500/10 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-violet-500/10 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '6s', animationDelay: '1s' }} />

          <div className="section-label">📍 Based in</div>
          
          <div className="mt-auto relative z-10 flex items-end justify-between">
            <div>
              <p className="text-2xl font-serif font-normal text-white">India 🇮🇳</p>
              <p className="text-[10px] text-zinc-400 mt-1 font-mono tracking-wider">
                UTC +05:30 • Open for Remote
              </p>
            </div>
            
            {/* Live radar locator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/5 font-mono text-[9px] text-zinc-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
              </span>
              SYS.ACTIVE
            </div>
          </div>
        </BentoCard>

        {/* 8. Quick Stats Card (Col 9-12 / 12) */}
        <BentoCard
          delay={7}
          className="md:col-span-4 p-8 flex flex-col justify-between min-h-[220px]"
        >
          <div className="section-label mb-5">📊 Quick Stats</div>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {[
              { value: "12+", label: "Projects" },
              { value: "3+", label: "Live Products" },
              { value: "CS", label: "Education" },
              { value: "CEO", label: "BlueLab" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/[0.02] py-2.5 px-1 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all">
                <p className="text-base font-bold text-white font-display">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-[9px] text-zinc-400 mt-0.5 uppercase tracking-widest font-mono font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
