import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import Signature from './Signature';
import ashilImage from '../assets/ashil.jpeg';

/**
 * Hero Bento Grid - reubence.com exact symmetrical grid layout for Infant Ashil A
 * Columns (12 total, divided into 3 equal columns of 4):
 * 
 * Row 1:
 * - Column 1 & 2 (8 cols): Name Card [infantashil.]
 * - Column 3 (4 cols): Now Playing / Music Card
 * 
 * Row 2:
 * - Column 1 (4 cols): Bio Card with Signature & Socials
 * - Column 2 (4 cols): Portrait Photo Card
 * - Column 3 (4 cols): Products / Experiments Card
 * 
 * Row 3:
 * - Column 1 (4 cols): Skills & Tools
 * - Column 2 (4 cols): Location Card
 * - Column 3 (4 cols): Quick Stats Card
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

export default function HeroBento() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="home" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-28">
      {/* Symmetrical Grid matching reubence.com desktop alignment */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* === ROW 1 === */}
        
        {/* 1. Name Card (Col 1-8 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={0}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-8 p-10 flex flex-col justify-between min-h-[260px] relative"
        >
          <div className="flex items-start gap-4 flex-wrap">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-zinc-900 leading-none select-none">
              infant<span className="text-zinc-400">.</span>ashil<span className="text-orange-500 font-serif">.</span>
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={greetingIndex}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ duration: 0.3 }}
                className="speech-bubble mt-2 whitespace-nowrap"
              >
                {greetings[greetingIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-xs text-zinc-400 mt-6 font-mono uppercase tracking-widest">
            Full Stack Developer & Founder
          </p>
        </motion.div>

        {/* 2. Now Playing / Music Card (Col 9-12 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-8 flex flex-col justify-between min-h-[260px]"
        >
          <div className="section-label flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for Projects
          </div>
          <div className="mt-auto">
            <p className="text-sm text-zinc-600 leading-relaxed">
              ✨ Code · Build · Launch · Repeat ✨
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex-shrink-0 flex items-center justify-center">
                <Music size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">Stargazing</p>
                <p className="text-xs text-zinc-400 truncate">Travis Scott</p>
              </div>
            </div>
            {/* Animated equalizer bars */}
            <div className="flex items-end gap-[3px] mt-3 h-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-green-500 rounded-full"
                  animate={{
                    height: ["40%", "100%", "60%", "80%", "40%"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* === ROW 2 === */}

        {/* 3. Bio Card (Col 1-4 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={2}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-10 flex flex-col justify-between min-h-[420px]"
        >
          <div>
            <p className="text-sm md:text-[14px] text-zinc-600 leading-relaxed">
              I'm a <span className="text-zinc-900 font-semibold">Computer Science student</span> and 
              passionate <span className="text-zinc-900 font-semibold">Full Stack Developer</span> based in India. 
              I love bridging the gap between front-end creativity and back-end logic.
            </p>
            <p className="text-sm md:text-[14px] text-zinc-500 leading-relaxed mt-3">
              My focus is on crafting scalable web applications with clean architecture, great performance, 
              and a user-first mindset.
            </p>
          </div>

          {/* Bottom: Signature + Socials row */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
              <div className="flex flex-col">
                <span className="text-[8px] text-zinc-400 uppercase tracking-wider font-mono">Find me at</span>
                <a href="mailto:infantashil55@gmail.com" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors mt-0.5 font-mono">
                  hello@ashil.space
                </a>
              </div>
              <Signature 
                className="w-24 h-8 opacity-75 hover:opacity-100 transition-opacity" 
                color="#09090b"
                delay={0.8}
                strokeWidth={1.6}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <a href="https://github.com/ashwiths" target="_blank" rel="noopener noreferrer" className="social-icon-btn w-8 h-8"><Github size={14} /></a>
              <a href="https://linkedin.com/in/infant-ashil-a" target="_blank" rel="noopener noreferrer" className="social-icon-btn w-8 h-8"><Linkedin size={14} /></a>
              <a href="mailto:infantashil55@gmail.com" className="social-icon-btn w-8 h-8"><Mail size={14} /></a>
            </div>
          </div>
        </motion.div>

        {/* 4. Portrait Photo Card (Col 5-8 / 12 - Center photo aligned with Bio) */}
        <motion.div
          variants={cardVariants}
          custom={3}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 min-h-[420px] relative overflow-hidden group"
        >
          <img
            src={ashilImage}
            alt="Infant Ashil A"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* Fallback gradient if no photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] items-center justify-center hidden">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-serif opacity-60">
              IA
            </div>
          </div>
          {/* Bottom label like reubence "IMG.jpg" */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-10">
            <span className="text-[10px] text-white/70 font-mono uppercase tracking-wider">
              IMG_ASHIL.JPG ✦
            </span>
          </div>
        </motion.div>

        {/* 5. Experiments / Products Card (Col 9-12 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={4}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-8 flex flex-col justify-between min-h-[420px]"
        >
          <div className="section-label mb-3">🧪 EXPERIMENTS</div>
          <div className="flex flex-col gap-2.5 flex-1 justify-center">
            {[
              { name: "BlueLab Technologies", desc: "Digital Agency & Web Dev", url: "https://bluelabtech.space", gradient: "from-blue-500/10 to-cyan-600/10" },
              { name: "ProjectHub", desc: "Discover Software Projects", url: "https://projecthub.bluelabtech.space", gradient: "from-violet-500/10 to-purple-600/10" },
              { name: "DevKit", desc: "Developer Toolkit Platform", url: "https://dev.bluelabtech.space", gradient: "from-emerald-500/10 to-teal-600/10" },
            ].map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-r ${project.gradient} border border-zinc-100 rounded-xl p-3 flex items-center justify-between relative overflow-hidden group cursor-pointer transition-all hover:border-[#ff6b35] hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="relative z-10 min-w-0">
                  <p className="text-zinc-800 text-xs font-semibold truncate">{project.name}</p>
                  <p className="text-zinc-500 text-[9px] truncate mt-0.5">{project.desc}</p>
                </div>
                <ExternalLink size={12} className="text-zinc-400 relative z-10 group-hover:text-zinc-800 transition-colors flex-shrink-0 ml-1" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* === ROW 3 === */}

        {/* 6. Tech Stack Card (Col 1-4 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={5}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-8 min-h-[180px] flex flex-col justify-between"
        >
          <div className="section-label mb-3">⚡ Skills & Tools</div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {['HTML', 'CSS', 'React', 'JavaScript', 'Node.js', 'Express', 'Tailwind', 'MongoDB', 'Python', 'Web Perf'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200/60 text-xs text-zinc-700 font-medium hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 7. Location Card (Col 5-8 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={6}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-8 relative overflow-hidden min-h-[180px] group flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-100/30" />
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
            style={{
              backgroundImage: 'radial-gradient(circle at 60% 50%, #ff6b35 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="section-label">📍 Based in</div>
            <div className="mt-auto pt-2">
              <p className="text-xl font-serif text-zinc-900">India 🇮🇳</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">UTC +05:30 • Open for remote & freelance</p>
            </div>
          </div>
        </motion.div>

        {/* 8. Quick Stats Card (Col 9-12 / 12) */}
        <motion.div
          variants={cardVariants}
          custom={7}
          initial="hidden"
          animate="visible"
          className="bento-card md:col-span-4 p-8 flex flex-col justify-between min-h-[180px]"
        >
          <div className="section-label mb-2">📊 Quick Stats</div>
          <div className="grid grid-cols-2 gap-2 mt-auto">
            {[
              { value: "12+", label: "Projects" },
              { value: "3+", label: "Live Products" },
              { value: "CS", label: "Education" },
              { value: "CEO", label: "BlueLab" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-zinc-50 py-1.5 rounded-lg border border-zinc-200/50">
                <p className="text-sm font-bold text-zinc-900">{stat.value}</p>
                <p className="text-[8px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
