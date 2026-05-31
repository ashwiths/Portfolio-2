import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Sparkles } from 'lucide-react';

/**
 * About & Experience section in dark luxury style
 */

const experienceData = [
  {
    role: "Chief Executive Officer (CEO)",
    company: "BlueLab Technologies",
    type: "Founder / CEO",
    location: "Remote",
    period: "Present",
    description: "Founder and CEO of BlueLab Technologies, a digital technology and web development agency focused on building modern web platforms and software solutions. Responsible for leading product development, managing projects, and guiding the technical direction of the company.",
    skills: ["Leadership", "Product Management", "Web Development", "Team Building"],
    color: "#3b82f6",
  },
  {
    role: "Frontend Developer Intern",
    company: "CodeAlpha",
    type: "Internship",
    location: "Remote",
    period: "2024",
    description: "Worked on real-world frontend implementations and modern web design. Gained hands-on experience building responsive UIs, optimizing web performance, and collaborating within development teams.",
    skills: ["React", "Responsive Design", "Performance Optimization", "Collaboration"],
    color: "#7c3aed",
  },
  {
    role: "QA Testing Intern",
    company: "Cognifyz Technologies",
    type: "Internship",
    location: "Remote",
    period: "2024",
    description: "Performed quality assurance testing including unit and integration testing for reliable builds. Documented testing procedures and contributed to QA workflows.",
    skills: ["QA Testing", "Unit Testing", "Integration Testing", "Documentation"],
    color: "#10b981",
  },
];

const aboutInfo = [
  { icon: Briefcase, label: "Role", value: "Full Stack Developer", color: "#3B82F6" },
  { icon: Target, label: "Focus", value: "Web Performance & Scalability", color: "#7C3AED" },
  { icon: Sparkles, label: "Experience", value: "CodeAlpha Internship", color: "#EC4899" },
  { icon: GraduationCap, label: "Education", value: "Computer Science", color: "#10B981" },
];

export default function Articles() {
  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      
      {/* === ABOUT ME === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <span className="section-label">✨ About Me</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-white mt-4 tracking-tight">
          My Story & Focus
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-28">
        
        {/* About Bio Card */}
        <AboutBioCard />

        {/* Quick Info Cards */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {aboutInfo.map((info, index) => (
            <AboutInfoCard key={info.label} info={info} index={index} />
          ))}
        </div>
      </div>

      {/* === EXPERIENCE TIMELINE === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <span className="section-label">💼 Experience</span>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-white mt-4 tracking-tight">
          Where I've Worked
        </h2>
      </motion.div>

      {/* Experience Cards with timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[13px] md:left-[17px] top-6 bottom-6 w-px bg-white/10" />
        
        <div className="flex flex-col gap-6">
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.role} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Subcomponent: About Bio Card with Spotlight Effect
function AboutBioCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card md:col-span-7 p-8 md:p-10 min-h-[300px] relative overflow-hidden flex flex-col justify-center"
    >
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />
      <div className="relative z-10">
        <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-sans font-light">
          Hey there! I'm <span className="text-white font-medium underline decoration-violet-500/50 underline-offset-4 decoration-2">Infant Ashil A</span>, 
          a Computer Science student and passionate Full Stack Developer based in India.
        </p>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-5 font-sans font-light">
          I love bridging the gap between front-end creativity and back-end logic — building 
          experiences that are both beautiful and technically solid.
        </p>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mt-5 font-sans font-light">
          My focus is on crafting scalable web applications with clean architecture, great 
          performance, and a user-first mindset. When I'm not coding, I'm exploring new tech, 
          editing videos, or brewing ideas over coffee ☕
        </p>
      </div>
    </motion.div>
  );
}

// Subcomponent: About Info Item Card with Spotlight
function AboutInfoCard({ info, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-5 flex items-center gap-4 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />
      <div className="relative z-10 flex items-center gap-4 w-full">
        <span
          className="px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border shrink-0"
          style={{ backgroundColor: info.color + '15', color: info.color, borderColor: info.color + '30' }}
        >
          {info.label}
        </span>
        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
          {info.value}
        </span>
      </div>
    </motion.div>
  );
}

// Subcomponent: Experience Timeline Card with Spotlight
function ExperienceCard({ exp, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-6 items-start relative"
    >
      {/* Timeline dot */}
      <div
        className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full mt-7 relative z-10 flex-shrink-0 ring-4 ring-[#050505] transition-all duration-300"
        style={{ 
          backgroundColor: exp.color,
          boxShadow: isHovered ? `0 0 15px ${exp.color}` : 'none'
        }}
      />

      {/* Card */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bento-card p-6 md:p-8 flex-1 relative overflow-hidden group"
      >
        {/* Spotlight Border */}
        <div
          className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {exp.role}
              </h3>
              <p className="text-sm text-zinc-400 italic font-serif mt-0.5">{exp.company}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border"
                style={{ backgroundColor: exp.color + '15', color: exp.color, borderColor: exp.color + '30' }}
              >
                {exp.type}
              </span>
              <div className="text-[11px] text-zinc-500 font-mono tracking-wide">
                <p>📍 {exp.location}</p>
                <p className="mt-0.5">📅 {exp.period}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-zinc-300 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
