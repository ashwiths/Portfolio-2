import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Sparkles, Heart, ArrowUpRight } from 'lucide-react';
import Signature from '../desktop/Signature';
import ashilImage from '../../assets/ashil.jpeg';

function AndroidIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-5.8-5.69l1.2-1.2a.495.495 0 000-.7.495.495 0 00-.7 0l-1.37 1.37A6.87 6.87 0 0012 3c-1.22 0-2.37.32-3.37.88L7.26 2.51a.495.495 0 00-.7 0 .495.495 0 000 .7l1.2 1.2C6.18 5.66 5 7.69 5 10h14c0-2.31-1.18-4.34-2.77-5.69zM9 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

const greetings = [
  "Hey there! 👋",
  "Vanakkam! 🙏",
  "Welcome! ✨",
  "Hola amigo! 🌮",
  "What's up! 🤙",
  "Bonjour! 🥐",
  "Ciao! 🇮🇹",
];

export default function MobileHero() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="w-full px-4 py-8 flex flex-col gap-6 select-none relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] h-[280px] bg-gradient-to-tr from-violet-600/5 via-blue-500/3 to-transparent rounded-full blur-[80px] pointer-events-none z-0" />

      {/* 1. Header Profile & Centered Branding */}
      <div className="flex flex-col items-center text-center gap-4 py-4 z-10">
        
        {/* Profile Image - Centered and scaled */}
        <div className="relative w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-violet-500/30 via-white/5 to-transparent border border-white/10 shadow-xl overflow-hidden">
          <img
            src={ashilImage}
            alt="Infant Ashil A"
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Greeting & Name */}
        <div className="flex flex-col items-center gap-2 mt-2">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={greetingIndex}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="speech-bubble shrink-0 text-xs px-3 py-1 font-semibold"
            >
              {greetings[greetingIndex]}
            </motion.div>
          </AnimatePresence>

          <h1 className="font-display font-bold text-3xl uppercase tracking-tight text-white mt-1">
            INFANT ASHIL<span className="text-violet-500">.</span>
          </h1>
          
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
            <Sparkles size={10} className="text-violet-400 animate-pulse" />
            <span>Full Stack Developer & CEO</span>
          </div>
        </div>

      </div>

      {/* 2. Location Card (Full width) */}
      <div className="bento-card px-5 py-4 flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/8 flex items-center justify-center text-sm">
            📍
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">Location</span>
            <h3 className="text-white text-sm font-semibold tracking-wide mt-0.5">Coimbatore, India</h3>
          </div>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">SKCET</span>
      </div>

      {/* 3. Bio Card (Full width) */}
      <div className="bento-card p-6 flex flex-col justify-between gap-6 z-10 w-full text-left">
        <div>
          <p className="text-sm text-zinc-350 leading-[1.7] font-sans font-light">
            I'm a <span className="text-white font-medium">Computer Science student</span> and passionate <span className="text-white font-medium">Full Stack Developer</span> based in India, bridging front-end creativity and back-end logic.
          </p>
          <p className="text-sm text-zinc-400 leading-[1.7] mt-3 font-sans font-light">
            My focus is on crafting scalable web applications with clean architecture, great performance, and a user-first mindset.
          </p>
        </div>

        {/* Signature scaled for Mobile */}
        <div className="flex justify-start items-center">
          <Signature
            className="w-48 h-12"
            color="#ffffff"
            strokeWidth={1.5}
          />
        </div>

        {/* Action / Contact footer */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-semibold">Get in touch</span>
          <a
            href="mailto:infantashil55@gmail.com"
            className="text-sm font-mono text-zinc-300 hover:text-white transition-colors"
          >
            infantashil55@gmail.com
          </a>
          
          <div className="flex items-center gap-3.5 mt-1">
            <a
              href="https://github.com/ashwiths"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn w-9 h-9 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.01]"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/infant-ashil-a-b88a39361/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn w-9 h-9 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white bg-white/[0.01]"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Mini ToDo Widget (Full width, centered, no overflow) */}
      <div className="bento-card p-5 z-10 w-full flex flex-col gap-4 text-left">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <span className="todo-widget-title text-base">📝 To|Do</span>
          <span className="todo-widget-badge text-[10px]">v1.0.0</span>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-between py-1 px-1">
          {/* Progress Ring */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15.915" fill="none" 
                  stroke="url(#todoGlowGradMobile)" strokeWidth="3" 
                  strokeDasharray="86 100" 
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2 }}
                />
                <defs>
                  <linearGradient id="todoGlowGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-[11px] font-mono font-bold text-white">86%</span>
            </div>
            <div>
              <span className="todo-widget-efficiency-label text-[9px] tracking-wider block">EFFICIENCY</span>
              <span className="todo-widget-efficiency-value text-xs block">OPTIMAL</span>
            </div>
          </div>

          {/* Tasks Status */}
          <div className="flex flex-col gap-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-550">
              <span className="text-zinc-500 font-bold">✓</span>
              <span className="truncate max-w-[100px]">Sync DB</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-200">
              <span className="text-violet-400 font-bold animate-pulse">✓</span>
              <span className="truncate max-w-[100px]">Optimize AI</span>
            </div>
          </div>
        </div>

        {/* Feature Row */}
        <div className="grid grid-cols-2 gap-2 text-left py-2 border-t border-white/[0.06]">
          {["Smart Tasks", "Focus Mode"].map((f) => (
            <div key={f} className="todo-widget-feature-item text-[10px]">
              <span className="accent-star text-violet-400">✦</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Download apk button */}
        <div className="pt-2">
          <a 
            href="/todo.apk" 
            download="todo.apk"
            className="download-apk-btn-mini w-full py-2.5 text-xs flex justify-center items-center gap-2"
            style={{ maxWidth: 'none' }}
          >
            <AndroidIcon className="w-3.5 h-3.5 fill-white" />
            <span>Download APK</span>
          </a>
        </div>
      </div>

      {/* 5. Philosophy / Subpage Navigation Card (Full width) */}
      <div className="bento-card p-6 flex flex-col justify-between gap-6 z-10 w-full text-left">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-semibold block mb-2">✦ Philosophy</span>
          <h2 className="text-base font-display font-medium text-white leading-snug tracking-tight">
            Programming is Easy, Software Development is Hard &amp; Maintaining Code is the Hardest
          </h2>
          <p className="text-zinc-400 text-xs mt-3 leading-relaxed font-light">
            When you are a programmer, you need to be able to do what you can do, and when you are a software developer, you need to be able to do what you can't do.
          </p>
        </div>

        {/* Quick Nav Actions */}
        <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
          {[
            { label: "Live Projects", target: "#/live-projects" },
            { label: "Products", target: "#/repositories" },
            { label: "Experience", target: "#/experience" },
            { label: "Connect", target: "#/contact" }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => window.location.hash = item.target}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-xs font-semibold tracking-wide text-zinc-350 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              {item.label} <ArrowUpRight size={12} className="text-zinc-500" />
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
