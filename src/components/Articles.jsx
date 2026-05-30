import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Sparkles } from 'lucide-react';

/**
 * About & Experience section
 * Data from ashil.space about/experience sections
 * Replaces the generic "Articles" section
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
    color: "#8b5cf6",
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
  { icon: Briefcase, label: "Role", value: "Full Stack Developer", color: "#ff6b35" },
  { icon: Target, label: "Focus", value: "Web Performance & Scalability", color: "#3b82f6" },
  { icon: Sparkles, label: "Experience", value: "CodeAlpha Internship", color: "#8b5cf6" },
  { icon: GraduationCap, label: "Education", value: "Computer Science", color: "#10b981" },
];

export default function Articles() {
  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      
      {/* === ABOUT ME === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <span className="section-label">✨ About Me</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-24">
        
        {/* About Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bento-card md:col-span-7 p-8 min-h-[280px]"
        >
          <p className="text-base md:text-lg text-zinc-700 leading-relaxed">
            Hey there! I'm <span className="text-[#ff6b35] font-semibold">Infant Ashil A</span>, 
            a Computer Science student and passionate Full Stack Developer based in India.
          </p>
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed mt-4">
            I love bridging the gap between front-end creativity and back-end logic — building 
            experiences that are both beautiful and technically solid.
          </p>
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed mt-4">
            My focus is on crafting scalable web applications with clean architecture, great 
            performance, and a user-first mindset. When I'm not coding, I'm exploring new tech, 
            editing videos, or brewing ideas over coffee ☕
          </p>
        </motion.div>

        {/* Quick Info Cards */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {aboutInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bento-card p-4 flex items-center gap-4 group hover:border-zinc-350 transition-colors"
            >
              <span
                className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: info.color + '20', color: info.color }}
              >
                {info.label}
              </span>
              <span className="text-sm text-zinc-650 group-hover:text-zinc-950 transition-colors">
                {info.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === EXPERIENCE TIMELINE === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <span className="section-label">💼 Experience</span>
        <h2 className="text-2xl md:text-3xl font-serif text-zinc-900 mt-3">
          Where I've Worked
        </h2>
      </motion.div>

      {/* Experience Cards with timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[11px] md:left-[13px] top-4 bottom-4 w-px bg-zinc-200" />
        
        <div className="flex flex-col gap-4">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 items-start relative"
            >
              {/* Timeline dot */}
              <div
                className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full mt-6 relative z-10 flex-shrink-0 ring-4 ring-white"
                style={{ backgroundColor: exp.color }}
              />

              {/* Card */}
              <div className="bento-card p-6 md:p-8 flex-1 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-950 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-zinc-500 italic font-serif">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: exp.color + '20', color: exp.color }}
                    >
                      {exp.type}
                    </span>
                    <div className="text-xs text-zinc-400">
                      <p>🌐 {exp.location}</p>
                      <p>📅 {exp.period}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-650 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200/50 text-[10px] text-zinc-600 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
