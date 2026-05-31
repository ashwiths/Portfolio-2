import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Sparkles } from 'lucide-react';

/**
 * About & Experience section in dark luxury style
 * Restored with stagger blur reveals and pulsing timeline ripples (no mousemove lag).
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
    <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-40">
      
      {/* === ABOUT ME === */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <span className="section-label">✨ About Me</span>
        <h2 className="text-5xl md:text-6xl font-display font-medium text-white mt-4 tracking-tight">
          My Story & Focus
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-36">
        
        {/* About Bio Card */}
        <AboutBioCard />

        {/* Quick Info Cards */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {aboutInfo.map((info, index) => (
            <AboutInfoCard key={info.label} info={info} index={index} />
          ))}
        </div>
      </div>

      {/* === EXPERIENCE TIMELINE === */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <span className="section-label">💼 Experience</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-white mt-4 tracking-tight">
          Where I've Worked
        </h2>
      </motion.div>

      {/* Experience Cards with timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[13px] md:left-[17px] top-8 bottom-8 w-px bg-white/10" />
        
        <div className="flex flex-col gap-8">
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.role} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Subcomponent: About Bio Card (restored animations)
function AboutBioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.005 }}
      className="bento-card md:col-span-7 p-10 md:p-14 min-h-[360px] relative overflow-hidden flex flex-col justify-center"
    >
      <div className="relative z-10">
        <p className="text-2xl md:text-3xl text-zinc-200 leading-[1.7] font-sans font-light">
          Hey there! I'm <span className="text-white font-medium underline decoration-violet-500/50 underline-offset-4 decoration-2">Infant Ashil A</span>, 
          a Computer Science student and passionate Full Stack Developer based in India.
        </p>
        <p className="text-xl md:text-2xl text-zinc-400 leading-[1.75] mt-6 font-sans font-light">
          I love bridging the gap between front-end creativity and back-end logic — building 
          experiences that are both beautiful and technically solid.
        </p>
        <p className="text-xl md:text-2xl text-zinc-450 leading-[1.75] mt-6 font-sans font-light">
          My focus is on crafting scalable web applications with clean architecture, great 
          performance, and a user-first mindset. When I'm not coding, I'm exploring new tech, 
          editing videos, or brewing ideas over coffee ☕
        </p>
      </div>
    </motion.div>
  );
}

// Subcomponent: About Info Item Card (restored animations)
function AboutInfoCard({ info, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 6, scale: 1.008 }}
      className="bento-card p-5 flex items-center gap-4 relative overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-4 w-full">
        <span
          className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest border shrink-0"
          style={{ backgroundColor: info.color + '15', color: info.color, borderColor: info.color + '30' }}
        >
          {info.label}
        </span>
        <span className="text-base font-medium text-zinc-200">
          {info.value}
        </span>
      </div>
    </motion.div>
  );
}

// Subcomponent: Experience Timeline Card with Hover Glow (restored timelines & animations)
function ExperienceCard({ exp, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-6 items-start relative"
    >
      {/* Interactive Timeline dot with restored ripple pulse */}
      <div className="relative mt-7 z-10 flex-shrink-0">
        <motion.div
          animate={isHovered ? { scale: 1.25 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-full ring-4 ring-[#050505] relative z-10"
          style={{ 
            backgroundColor: exp.color,
            boxShadow: isHovered ? `0 0 10px ${exp.color}` : 'none'
          }}
        />
        {/* Ripple glow expansion */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full pointer-events-none z-0"
              style={{ backgroundColor: exp.color }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Card */}
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          y: -4, 
          scale: 1.005,
          transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
        }}
        className="bento-card p-8 md:p-10 flex-1 relative overflow-hidden group cursor-pointer"
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">
                {exp.role}
              </h3>
              <p className="text-base text-zinc-450 italic font-serif mt-0.5">{exp.company}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border"
                style={{ backgroundColor: exp.color + '15', color: exp.color, borderColor: exp.color + '30' }}
              >
                {exp.type}
              </span>
              <div className="text-xs text-zinc-550 font-mono tracking-wide">
                <p>📍 {exp.location}</p>
                <p className="mt-0.5">📅 {exp.period}</p>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg text-zinc-450 leading-[1.8] font-light mt-4">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
