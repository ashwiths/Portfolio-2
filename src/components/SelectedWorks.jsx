import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Star, Sparkles } from 'lucide-react';

/**
 * Selected Works & All Projects section in premium dark mode
 */

// Featured live products (top section)
const featuredProducts = [
  {
    id: 1,
    name: "BlueLab Technologies",
    url: "bluelabtech.space",
    siteUrl: "https://bluelabtech.space",
    description: "A modern technology agency website presenting digital services such as web development, UI/UX design, and SEO solutions. Highlights the company's mission, services, and internship opportunities with a clean professional interface.",
    features: ["Modern landing page design", "Service showcase", "Internship information", "Clean responsive layout"],
    tags: ["React", "Tailwind CSS", "Responsive UI"],
    gradient: "from-blue-500/10 via-transparent to-transparent",
    glowColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "#3b82f6",
  },
  {
    id: 2,
    name: "ProjectHub",
    url: "projecthub.bluelabtech.space",
    siteUrl: "https://projecthub.bluelabtech.space",
    description: "A platform that helps students and developers discover and explore software projects. Acts as a project learning hub where users can browse different ideas and resources for building technical projects.",
    features: ["Project listing system", "Organized categories", "Developer-friendly interface", "Learning-oriented platform"],
    tags: ["React", "Tailwind CSS"],
    gradient: "from-violet-500/10 via-transparent to-transparent",
    glowColor: "rgba(124, 58, 237, 0.12)",
    borderColor: "#7c3aed",
  },
  {
    id: 3,
    name: "DevKit",
    url: "dev.bluelabtech.space",
    siteUrl: "https://dev.bluelabtech.space",
    description: "A full-featured developer toolkit platform offering a suite of productivity tools — PDF utilities, code tools, and developer-focused converters — wrapped in a sleek, modern dashboard interface.",
    features: ["PDF suite tools", "Developer utilities", "Modern dashboard UI", "Full-stack architecture"],
    tags: ["React", "Node.js", "Express", "Tailwind CSS"],
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    glowColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "#10b981",
  },
];

// All projects grid (bottom section)
const allProjects = [
  {
    name: "DevKit",
    description: "A comprehensive developer toolkit platform featuring a suite of productivity tools — including a PDF suite, code utilities, and developer-focused utilities — all wrapped in a sleek, modern dashboard interface.",
    tags: ["React", "Node.js", "Express", "JavaScript", "Tailwind CSS"],
    featured: false,
    color: "#10b981",
  },
  {
    name: "SheetHub",
    description: "A smart spreadsheet collaboration hub that lets users create, manage, and share spreadsheets online. Built with a focus on real-time usability, clean UX, and powerful data handling.",
    tags: ["React", "JavaScript", "Node.js", "CSS"],
    featured: true,
    color: "#8b5cf6",
  },
  {
    name: "Portfolio",
    description: "A modern personal portfolio website built with React and JavaScript, showcasing projects, skills, and professional experience with smooth animations.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    featured: false,
    color: "#f59e0b",
  },
  {
    name: "Projecthub",
    description: "A platform for students and developers to discover and explore software project ideas, organized by category with a developer-friendly interface.",
    tags: ["JavaScript", "React", "Node.js"],
    featured: false,
    color: "#3b82f6",
  },
  {
    name: "Terminalhub",
    description: "An interactive terminal-style hub built with JavaScript, featuring Git and terminal commands organized into categories with copy-to-clipboard functionality.",
    tags: ["JavaScript", "React", "CSS"],
    featured: false,
    color: "#ec4899",
  },
  {
    name: "Student Portal",
    description: "A web-based student portal system designed to streamline academic workflows, manage student data, and provide a centralized dashboard for educational resources.",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: false,
    color: "#14b8a6",
  },
  {
    name: "Student Feedback Automation",
    description: "An automation tool that streamlines the collection, management, and analysis of student feedback for academic institutions, reducing manual processing effort.",
    tags: ["Automation", "JavaScript", "Node.js"],
    featured: false,
    color: "#f97316",
  },
  {
    name: "GenAI Malware Detection",
    description: "A cutting-edge malware detection system leveraging Generative AI and machine learning to identify and classify malicious software patterns in real time.",
    tags: ["Python", "GenAI", "Machine Learning", "Security"],
    featured: false,
    color: "#ef4444",
  },
  {
    name: "Trip Planning App",
    description: "A smart trip planning web application that helps users organize travel itineraries, discover destinations, and manage trip details with an intuitive interface.",
    tags: ["JavaScript", "React", "API Integration"],
    featured: false,
    color: "#06b6d4",
  },
  {
    name: "Admit Dashboard",
    description: "An admin dashboard for managing admissions, built with JavaScript. Provides an overview of applicants, status tracking, and data visualization for administrators.",
    tags: ["JavaScript", "React", "Dashboard", "MongoDB"],
    featured: false,
    color: "#a855f7",
  },
  {
    name: "Passion Student AI Tutor",
    description: "An AI-powered tutoring platform built with JavaScript that provides personalized academic assistance, adaptive learning paths, and interactive Q&A features.",
    tags: ["JavaScript", "AI", "React", "Node.js"],
    featured: false,
    color: "#22c55e",
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      
      {/* === FEATURED WORK (Live Products) === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 relative"
      >
        <span className="section-label">🚀 Featured Work</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-white mt-4 tracking-tight">
          Products & Platforms I Built
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-lg font-light">
          Real-world products live on the web — engineered with performance and precision.
        </p>
      </motion.div>

      {/* Featured Product Cards */}
      <div className="flex flex-col gap-6 mb-28">
        {featuredProducts.map((product, index) => (
          <FeaturedCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* === ALL PROJECTS GRID === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <span className="section-label">💻 All Projects</span>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-white mt-4 tracking-tight">
          More Things I've Built
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allProjects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

/* Featured Product Card - large horizontal card with spotlight */
function FeaturedCard({ product, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-8 md:p-12 relative cursor-pointer group"
    >
      {/* Mouse spotlight border glow */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      />

      {/* Mouse spotlight background glow */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${product.glowColor}, transparent 70%)`,
        }}
      />

      {/* Subtle overlay gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-[28px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10">
        {/* Top row: Live Project badge + URL + arrow */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border"
              style={{ backgroundColor: product.borderColor + '15', color: product.borderColor, borderColor: product.borderColor + '30' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Live Product
            </span>
            <span className="text-xs text-zinc-500 font-mono">🌐 {product.url}</span>
          </div>
          <a
            href={product.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ '--hover-color': product.borderColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = product.borderColor;
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = product.borderColor + '30';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#a1a1aa';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            }}
          >
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight group-hover:text-white transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-zinc-400 mt-3.5 leading-relaxed max-w-3xl font-light">
          {product.description}
        </p>

        {/* Feature bullets */}
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: product.borderColor }} />
              {feature}
            </li>
          ))}
        </ul>

        {/* Tags + Visit Website */}
        <div className="flex items-center justify-between mt-8 flex-wrap gap-4 pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-zinc-350 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={product.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn text-xs font-semibold"
          >
            <ExternalLink size={13} /> Visit Website
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Small Project Card for the grid */
function ProjectCard({ project, index }) {
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
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-6 md:p-8 group relative overflow-hidden flex flex-col justify-between"
    >
      {/* Top colored accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: project.color }} />
      
      {/* Mouse spotlight border glow */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />
      
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider">
          <Star size={9} className="fill-current" /> Featured
        </div>
      )}

      <div>
        {/* Project name */}
        <h4 className="text-lg font-semibold text-white tracking-wide mt-2 group-hover:text-white transition-colors">
          {project.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed line-clamp-4 font-light">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-lg text-[10px] text-zinc-300 border border-white/5 bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
          <a href="https://github.com/ashwiths" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors">
            <Github size={13} /> Code
          </a>
          <a href="#" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors">
            <ExternalLink size={13} /> Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}
