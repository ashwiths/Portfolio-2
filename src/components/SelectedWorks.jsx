import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

/**
 * Selected Works - list of all user projects in premium dark mode horizontal card format.
 * Restored with dynamic product-specific hover color glows and border lighting based on theme colors.
 */

const featuredProjects = [
  {
    name: "SheetHub",
    url: "sheethub.bluelabtech.space",
    demoUrl: "https://sheethub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/sheethub",
    description: "A smart spreadsheet collaboration hub that lets users create, manage, and share spreadsheets online. Built with a focus on real-time usability, clean UX, and powerful data handling.",
    features: ["Online spreadsheets", "Real-time collaboration", "Clean workspace UI", "Advanced data management"],
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    color: "#3b82f6",
  },
  {
    name: "ProjectHub",
    url: "projecthub.bluelabtech.space",
    demoUrl: "https://projecthub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/Projecthub",
    description: "A platform that helps students and developers discover and explore software projects. Acts as a project learning hub where users can browse different ideas and resources for building technical projects.",
    features: ["Project discovery", "Category filters", "Developer resources", "Clean responsive layout"],
    tags: ["React", "JavaScript", "Tailwind CSS"],
    color: "#7c3aed",
  },
  {
    name: "DevKit",
    url: "dev.bluelabtech.space",
    demoUrl: "https://dev.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/Devkit",
    description: "A full-featured developer toolkit platform offering a suite of productivity tools — PDF utilities, code tools, and developer-focused converters — wrapped in a sleek, modern dashboard interface.",
    features: ["PDF tools & converters", "Developer helper utilities", "Sleek dashboard design", "Performance optimized"],
    tags: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    color: "#10b981",
  },
];

const liveProjects = [
  {
    name: "Streamdrop",
    url: "drop.savee.space",
    demoUrl: "https://drop.savee.space/",
    githubUrl: "https://github.com/ashwiths/Streamdrop",
    description: "A streamlined peer-to-peer file transfer platform built with JavaScript and WebRTC, enabling direct, secure, and fast sharing of large files in the browser.",
    features: ["Direct P2P file sharing", "WebRTC secure transfers", "Fast browser processing", "Minimal clean interface"],
    tags: ["JavaScript", "React", "WebRTC", "CSS"],
    color: "#a855f7",
  },
  {
    name: "Typekey",
    url: "type.savee.space",
    demoUrl: "https://type.savee.space/",
    githubUrl: "https://github.com/ashwiths/Typekey",
    description: "A premium typographic typing test platform designed to measure speed, accuracy, and keystroke metrics with real-time feedback and aesthetic layouts.",
    features: ["Keystroke metric analysis", "Speed & accuracy tests", "Premium typing feedback", "Modern UI layout"],
    tags: ["JavaScript", "React", "Tailwind CSS"],
    color: "#14b8a6",
  },
  {
    name: "Bible Reader",
    url: "bible.savee.space",
    demoUrl: "https://bible.savee.space/",
    githubUrl: "https://github.com/ashwiths/Bible",
    description: "A sacred text reading and exploration application designed for seamless focus, offering bookmarking, customizable display preferences, and dynamic navigation.",
    features: ["Focus reading layouts", "Bookmarking features", "Custom theme modes", "Fluid chapter navigation"],
    tags: ["JavaScript", "React", "CSS"],
    color: "#f97316",
  },
  {
    name: "CRM System",
    url: "crm-green-phi.vercel.app",
    demoUrl: "https://crm-green-phi.vercel.app",
    githubUrl: "https://github.com/ashwiths/CRM",
    description: "A premium customer relationship management dashboard to organize leads, monitor customer communications, track support tickets, and analyze performance analytics.",
    features: ["Lead pipeline tracking", "Customer communications", "Support ticket flow", "Admin metrics charts"],
    tags: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    color: "#ef4444",
  },
  {
    name: "Upload Malware Scanner",
    url: "safe.savee.space",
    demoUrl: "https://safe.savee.space/",
    githubUrl: "https://github.com/ashwiths/Upload-Malware-Scanner",
    description: "A high-performance file upload security portal that checks uploads against known malware signatures and verifies file integrity using automated cryptographic hash checks.",
    features: ["Malware signature checks", "Cryptographic hash check", "File upload security", "Vercel serverless integration"],
    tags: ["JavaScript", "React", "Security", "Vercel"],
    color: "#06b6d4",
  },
  {
    name: "FontPair",
    url: "font.savee.space",
    demoUrl: "https://font.savee.space/",
    githubUrl: "https://github.com/ashwiths/fontpair",
    description: "An interactive playground for typography lovers that allows developers to preview, test, and match Google Fonts side-by-side to find the perfect pairing.",
    features: ["Google Fonts integration", "Interactive preview workspace", "Typography pairing suggestions", "Responsive controls"],
    tags: ["JavaScript", "React", "Google Fonts API"],
    color: "#22c55e",
  }
];

export default function SelectedWorks({ view }) {
  const isLiveView = view === 'live';
  const projectsList = isLiveView ? liveProjects : featuredProjects;
  const sectionLabel = isLiveView ? "💻 Portfolio" : "🚀 Featured Work";
  const titleText = isLiveView ? "Live projects" : "Products & Platforms I Built";
  const subtitleText = isLiveView
    ? "A curated collection of production applications and developer tools live on the web."
    : "Real-world products live on the web — engineered with performance and precision.";

  return (
    <section id="work" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-32 md:pt-10 md:pb-40 scroll-mt-24">

      {/* === SECTION HEADING === */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 relative"
      >
        <span className="section-label">{sectionLabel}</span>
        <h2 className="text-5xl md:text-6xl font-display font-medium text-white mt-4 tracking-tight">
          {titleText}
        </h2>
        <p className="text-zinc-400 text-base md:text-lg mt-3 max-w-xl font-light">
          {subtitleText}
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="flex flex-col gap-8">
        {projectsList.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

/* Horizontal card with dynamic accent color glow and border lighting */
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = project.color || '#7c3aed';
  const glowColor = `${borderColor}1f`; // ~12% opacity in hex
  const borderHoverColor = `${borderColor}35`; // ~20% opacity in hex
  const gradient = `linear-gradient(to right, ${borderColor}0d, transparent)`; // ~5% opacity in hex

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, delay: Math.min(index * 0.08, 0.6), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.004 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-10 md:p-14 relative cursor-pointer group"
    >
      {/* Static product-specific background glow on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-600 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at center, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Static product-specific border and shadow reaction overlay on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderHoverColor,
          boxShadow: `inset 0 0 16px ${glowColor}`,
        }}
      />

      {/* Subtle overlay gradient */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundImage: gradient }}
      />

      <div className="relative z-10">
        {/* Top row: Live Project badge / Repo badge + URL + arrow */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {project.demoUrl ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                style={{ backgroundColor: borderColor + '15', color: borderColor, borderColor: borderColor + '30' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Live Product
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-zinc-700 bg-zinc-800/40 text-zinc-405">
                Code Repository
              </span>
            )}
            {project.url && <span className="text-xs text-zinc-500 font-mono">🌐 {project.url}</span>}
          </div>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = borderColor + '30';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#a1a1aa';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight group-hover:text-white transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg text-zinc-400 mt-4 leading-relaxed max-w-3xl font-light">
          {project.description}
        </p>

        {/* Feature bullets */}
        {project.features && project.features.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="text-[13px] text-zinc-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: borderColor }} />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Tags + Links */}
        <div className="flex items-center justify-between mt-8 flex-wrap gap-4 pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-350 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-405 hover:text-white transition-colors"
              >
                <Github size={13} /> Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn text-xs font-semibold"
              >
                <ExternalLink size={13} /> Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
