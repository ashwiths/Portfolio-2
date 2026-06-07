import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experienceData = [
  {
    role: "Chief Executive Officer (CEO)",
    company: "BlueLab Technologies",
    type: "Founder / CEO",
    location: "Remote",
    period: "Present",
    description: "Founder and CEO of BlueLab Technologies, a digital technology agency focused on building modern web platforms and software solutions. Leading product development and projects.",
    skills: ["Leadership", "Product", "Web Dev", "Team"],
    color: "#3b82f6",
  },
  {
    role: "Frontend Developer Intern",
    company: "CodeAlpha",
    type: "Internship",
    location: "Remote",
    period: "2024",
    description: "Worked on real-world frontend implementations. Gained hands-on experience building responsive UIs and collaborating within development teams.",
    skills: ["React", "Responsive UIs", "Optimization"],
    color: "#7c3aed",
  },
  {
    role: "QA Testing Intern",
    company: "Cognifyz Technologies",
    type: "Internship",
    location: "Remote",
    period: "2024",
    description: "Performed quality assurance testing including unit and integration testing for reliable builds. Documented testing procedures.",
    skills: ["QA Testing", "Unit Testing", "Documentation"],
    color: "#10b981",
  },
];

export default function MobileArticles() {
  return (
    <section id="experience" className="w-full px-4 py-6 pb-20 select-none">
      
      {/* Heading */}
      <div className="mb-10 text-left">
        <span className="section-label text-[10px]">💼 Experience</span>
        <h2 className="text-3xl font-display font-semibold text-white mt-2 tracking-tight uppercase">
          Where I've Worked
        </h2>
      </div>

      {/* Timeline Layout */}
      <div className="relative text-left">
        {/* Timeline line - aligned closely to the left for space */}
        <div className="absolute left-[8px] top-6 bottom-6 w-px bg-white/10" />

        <div className="flex flex-col gap-6">
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.role} exp={exp} index={index} />
          ))}
        </div>
      </div>

    </section>
  );
}

function ExperienceCard({ exp, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex gap-4 items-start relative">
      
      {/* Node indicator */}
      <div className="relative mt-5 z-10 flex-shrink-0">
        <div
          className="w-2.5 h-2.5 rounded-full ring-2 ring-[#050505]"
          style={{ 
            backgroundColor: exp.color,
            boxShadow: `0 0 6px ${exp.color}`
          }}
        />
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileTap={{ scale: 0.99 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bento-card p-5 flex-1 relative overflow-hidden cursor-pointer"
      >
        <div className="relative z-10 flex flex-col gap-2">
          
          {/* Header Row */}
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {exp.role}
            </h3>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-xs text-zinc-405 italic font-serif">{exp.company}</span>
              <span
                className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border"
                style={{ backgroundColor: exp.color + '15', color: exp.color, borderColor: exp.color + '35' }}
              >
                {exp.type}
              </span>
            </div>
          </div>

          {/* Period details */}
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono mt-1">
            <span>📍 {exp.location}</span>
            <span>📅 {exp.period}</span>
          </div>

          {/* Body */}
          <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2">
            {exp.description}
          </p>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-zinc-405 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </motion.div>

    </div>
  );
}
