import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Star } from 'lucide-react';

/**
 * Selected Works & All Projects section
 * Copied from ashil.space — exact project data
 * 
 * Featured Work (live products): BlueLab Technologies, ProjectHub, DevKit
 * All Projects grid: all 12 projects from ashil.space
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
    gradient: "from-blue-500/20 via-transparent to-transparent",
    glowColor: "rgba(59, 130, 246, 0.15)",
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
    gradient: "from-violet-500/20 via-transparent to-transparent",
    glowColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "#8b5cf6",
  },
  {
    id: 3,
    name: "DevKit",
    url: "dev.bluelabtech.space",
    siteUrl: "https://dev.bluelabtech.space",
    description: "A full-featured developer toolkit platform offering a suite of productivity tools — PDF utilities, code tools, and developer-focused converters — wrapped in a sleek, modern dashboard interface.",
    features: ["PDF suite tools", "Developer utilities", "Modern dashboard UI", "Full-stack architecture"],
    tags: ["React", "Node.js", "Express", "Tailwind CSS"],
    gradient: "from-emerald-500/20 via-transparent to-transparent",
    glowColor: "rgba(16, 185, 129, 0.15)",
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
    color: "#6366f1",
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
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <span className="section-label">🚀 Featured Work</span>
        <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mt-3">
          Products & Platforms I Built
        </h2>
        <p className="text-zinc-500 text-base mt-2 max-w-lg">
          Real-world products live on the web — built from the ground up.
        </p>
      </motion.div>

      {/* Featured Product Cards */}
      <div className="flex flex-col gap-4 mb-24">
        {featuredProducts.map((product, index) => (
          <FeaturedCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* === ALL PROJECTS GRID === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <span className="section-label">💻 All Projects</span>
        <h2 className="text-2xl md:text-3xl font-serif text-zinc-900 mt-3">
          More Things I've Built
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-8 md:p-10 relative cursor-pointer group"
    >
      {/* Mouse spotlight glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${product.glowColor}, transparent 60%)`,
        }}
      />

      {/* Gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10">
        {/* Top row: Live Project badge + URL + arrow */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: product.borderColor + '20', color: product.borderColor }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.borderColor }} />
              Live Project
            </span>
            <span className="text-[11px] text-zinc-400">🌐 {product.url}</span>
          </div>
          <a
            href={product.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-950 transition-all duration-300"
            style={{ '--hover-bg': product.borderColor }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = product.borderColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f4f4f5'}
          >
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-serif text-zinc-900 leading-snug group-hover:text-zinc-950 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-2xl">
          {product.description}
        </p>

        {/* Feature bullets */}
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          {product.features.map((feature) => (
            <li key={feature} className="text-xs text-zinc-500 flex items-center gap-1.5">
              <span style={{ color: product.borderColor }}>◆</span> {feature}
            </li>
          ))}
        </ul>

        {/* Tags + Visit Website */}
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200/50 text-[11px] text-zinc-650 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={product.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn text-xs"
          >
            <ExternalLink size={12} /> Visit Website
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Small Project Card for the grid */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="bento-card p-6 group relative overflow-hidden"
    >
      {/* Top colored accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: project.color }} />
      
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/50 text-[10px] font-semibold uppercase tracking-wider">
          <Star size={10} /> Featured
        </div>
      )}

      {/* Project name */}
      <h4 className="text-base font-semibold text-zinc-900 mt-2 group-hover:text-zinc-950 transition-colors">
        {project.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] text-zinc-500 border border-zinc-200/50 bg-zinc-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-100">
        <a href="#" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
          <Github size={12} /> Code
        </a>
        <a href="#" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
          <ExternalLink size={12} /> Demo
        </a>
      </div>
    </motion.div>
  );
}
