import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Table, 
  FolderGit2, 
  Terminal, 
  Share2, 
  Keyboard, 
  BookOpen, 
  LayoutDashboard, 
  ShieldAlert, 
  Sparkles,
  Activity
} from 'lucide-react';

import sheethubPreview from '../../assets/sheethub_preview.png';
import projecthubPreview from '../../assets/projecthub_preview.png';
import devkitPreview from '../../assets/devkit_preview.png';
import streamdropPreview from '../../assets/streamdrop_preview.png';
import typekeyPreview from '../../assets/typekey_preview.png';
import bibleReaderPreview from '../../assets/bible_reader_preview.png';
import crmSystemPreview from '../../assets/crm_system_preview.png';
import uploadMalwareScannerPreview from '../../assets/upload_malware_scanner_preview.png';
import fontpairPreview from '../../assets/fontpair_preview.png';
import healPreview from '../../assets/heal_preview.png';
import bluelabPreview from '../../assets/bluelab_preview.png';
import networkCheckPreview from '../../assets/network_check_preview.png';

/**
 * Selected Works - list of all user projects in premium dark mode grid card format.
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
    previewImage: sheethubPreview,
    icon: Table,
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
    previewImage: projecthubPreview,
    icon: FolderGit2,
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
    previewImage: devkitPreview,
    icon: Terminal,
  },
];

const liveProjects = [
  {
    name: "Bible",
    url: "bible.savee.space",
    demoUrl: "https://bible.savee.space/",
    githubUrl: "https://github.com/ashwiths/Bible",
    description: "A sacred text reading and exploration application designed for seamless focus, offering bookmarking, customizable display preferences, and dynamic navigation.",
    features: ["Focus reading layouts", "Bookmarking features", "Custom theme modes", "Fluid chapter navigation"],
    tags: ["JavaScript", "React", "CSS"],
    color: "#f97316",
    previewImage: bibleReaderPreview,
    icon: BookOpen,
  },
  {
    name: "Heal",
    url: "www.savee.space",
    demoUrl: "https://www.savee.space/",
    githubUrl: "https://github.com/ashwiths/Goodthing",
    description: "A positive habit tracker and reflection journal that encourages daily journaling, gratitude logs, and micro-achievement tracking in a clean, minimal interface.",
    features: ["Habit streak tracker", "Daily gratitude reflection", "Local storage data sync"],
    tags: ["TypeScript", "React", "Local Storage"],
    color: "#ca8a04",
    previewImage: healPreview,
    icon: Activity,
  },
  {
    name: "Split PDF",
    url: "sheethub.bluelabtech.space",
    demoUrl: "https://sheethub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/sheethub",
    description: "A smart spreadsheet collaboration hub that lets users create, manage, and share spreadsheets online. Built with a focus on real-time usability, clean UX, and powerful data handling.",
    features: ["Online spreadsheets", "Real-time collaboration", "Clean workspace UI", "Advanced data management"],
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    color: "#3b82f6",
    previewImage: sheethubPreview,
    icon: Table,
  },
  {
    name: "Drop",
    url: "drop.savee.space",
    demoUrl: "https://drop.savee.space/",
    githubUrl: "https://github.com/ashwiths/Streamdrop",
    description: "A streamlined peer-to-peer file transfer platform built with JavaScript and WebRTC, enabling direct, secure, and fast sharing of large files in the browser.",
    features: ["Direct P2P file sharing", "WebRTC secure transfers", "Fast browser processing", "Minimal clean interface"],
    tags: ["JavaScript", "React", "WebRTC", "CSS"],
    color: "#a855f7",
    previewImage: streamdropPreview,
    icon: Share2,
  },
  {
    name: "Type",
    url: "type.savee.space",
    demoUrl: "https://type.savee.space/",
    githubUrl: "https://github.com/ashwiths/Typekey",
    description: "A premium typographic typing test platform designed to measure speed, accuracy, and keystroke metrics with real-time feedback and aesthetic layouts.",
    features: ["Keystroke metric analysis", "Speed & accuracy tests", "Premium typing feedback", "Modern UI layout"],
    tags: ["JavaScript", "React", "Tailwind CSS"],
    color: "#14b8a6",
    previewImage: typekeyPreview,
    icon: Keyboard,
  },
  {
    name: "BlueLab",
    url: "www.bluelabtech.space",
    demoUrl: "https://www.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths",
    description: "An innovation hub and technology showcase platform highlighting cutting-edge software solutions and web utilities.",
    features: ["Innovation domain showcases", "Live ecosystem stats", "Modern dark UI design", "Interactive navigation links"],
    tags: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    color: "#3b82f6",
    previewImage: bluelabPreview,
    icon: Sparkles,
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
    previewImage: projecthubPreview,
    icon: FolderGit2,
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
    previewImage: devkitPreview,
    icon: Terminal,
  },
  {
    name: "Network Check",
    url: "check.bluelabtech.space",
    demoUrl: "https://check.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths",
    description: "A real-time network latency, status, and performance monitoring utility with custom dashboard controls.",
    features: ["Global latency mapping", "Real-time ping stats", "Incident logging", "Server node status monitor"],
    tags: ["JavaScript", "HTML", "CSS"],
    color: "#a855f7",
    previewImage: networkCheckPreview,
    icon: Activity,
  },
  {
    name: "Safe File",
    url: "safe.savee.space",
    demoUrl: "https://safe.savee.space/",
    githubUrl: "https://github.com/ashwiths/Upload-Malware-Scanner",
    description: "A high-performance file upload security portal that checks uploads against known malware signatures and verifies file integrity using automated cryptographic hash checks.",
    features: ["Malware signature checks", "Cryptographic hash check", "File upload security", "Vercel serverless integration"],
    tags: ["JavaScript", "React", "Security", "Vercel"],
    color: "#06b6d4",
    previewImage: uploadMalwareScannerPreview,
    icon: ShieldAlert,
  },
  {
    name: "Font Generator",
    url: "font.savee.space",
    demoUrl: "https://font.savee.space/",
    githubUrl: "https://github.com/ashwiths/fontpair",
    description: "An interactive playground for typography lovers that allows developers to preview, test, and match Google Fonts side-by-side to find the perfect pairing.",
    features: ["Google Fonts integration", "Interactive preview workspace", "Typography pairing suggestions", "Responsive controls"],
    tags: ["JavaScript", "React", "Google Fonts API"],
    color: "#22c55e",
    previewImage: fontpairPreview,
    icon: Sparkles,
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
        <p className="text-zinc-405 text-base md:text-lg mt-3 max-w-xl font-light">
          {subtitleText}
        </p>
      </motion.div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projectsList.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

/* Bento-style project card with dynamic accent color glow and border lighting */
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = project.color || '#7c3aed';
  const glowColor = `${borderColor}12`; // ~7% opacity in hex
  const borderHoverColor = `${borderColor}25`; // ~15% opacity in hex
  const gradient = `linear-gradient(to bottom, ${borderColor}08, transparent)`; // ~3% opacity in hex

  const ProjectIcon = project.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-6 relative cursor-pointer group flex flex-col justify-between h-full"
    >
      {/* Dynamic product-specific background glow on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-600 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at center, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Dynamic product-specific border and shadow reaction overlay on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderHoverColor,
          boxShadow: `inset 0 0 12px ${glowColor}`,
        }}
      />

      {/* Subtle overlay gradient */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundImage: gradient }}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        
        {/* Card Header Content */}
        <div>
          {/* Project Preview Image / Repository Placeholder */}
          {project.previewImage ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-white/5 bg-zinc-900/40">
              <img 
                src={project.previewImage} 
                alt={project.name} 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" 
              />
              
              {/* Badge overlay on top of image */}
              {project.demoUrl ? (
                <span className="absolute top-3 left-3 z-25 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                  style={{ backgroundColor: borderColor + '15', color: borderColor, borderColor: borderColor + '30' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Live Product
                </span>
              ) : (
                <span className="absolute top-3 left-3 z-25 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-zinc-700 bg-zinc-800/80 text-zinc-400">
                  Repository
                </span>
              )}
            </div>
          ) : (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-white/5 flex flex-col items-center justify-center bg-[#09090b]"
                 style={{
                   background: `radial-gradient(circle at center, ${borderColor}12, transparent 80%), linear-gradient(135deg, #09090b, #030303)`
                 }}>
              <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay pointer-events-none" />
              <div className="flex flex-col items-center gap-2 text-center p-4">
                <ProjectIcon size={28} className="text-zinc-500 transition-colors duration-350 group-hover:text-white" style={{ color: borderColor + 'bb' }} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  Code Repository Only
                </span>
              </div>
              
              {/* Badge overlay on top of placeholder */}
              <span className="absolute top-3 left-3 z-25 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-zinc-700 bg-zinc-800/80 text-zinc-400">
                Repository
              </span>
            </div>
          )}

          {/* Logo Icon & Title Row */}
          <div className="flex items-center gap-3.5 mb-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-300 transition-colors" style={{ color: borderColor }}>
              <ProjectIcon size={20} />
            </div>
            <div>
              <h3 className="text-xl font-display font-medium text-white tracking-tight group-hover:text-white transition-colors">
                {project.name}
              </h3>
              {project.url && <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">🌐 {project.url}</span>}
            </div>
          </div>

          {/* Description (2-3 lines max) */}
          <p className="text-zinc-400 text-sm font-light leading-relaxed mb-4 line-clamp-3 min-h-[4.5rem]">
            {project.description}
          </p>
        </div>

        {/* Card Footer Content */}
        <div>
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] text-zinc-400 font-medium font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links/Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-white/5">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs text-zinc-405 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5"
              >
                <Github size={13} /> Code
              </a>
            ) : (
              <div />
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn text-xs font-semibold"
                style={{ padding: '8px 16px', borderRadius: '12px' }}
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


