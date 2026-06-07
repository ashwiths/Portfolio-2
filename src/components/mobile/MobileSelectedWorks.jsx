import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Table, FolderGit2, Terminal, Share2, Keyboard, BookOpen, ShieldAlert, Sparkles, Activity } from 'lucide-react';

import sheethubPreview from '../../assets/sheethub_preview.png';
import projecthubPreview from '../../assets/projecthub_preview.png';
import devkitPreview from '../../assets/devkit_preview.png';
import streamdropPreview from '../../assets/streamdrop_preview.png';
import typekeyPreview from '../../assets/typekey_preview.png';
import bibleReaderPreview from '../../assets/bible_reader_preview.png';
import uploadMalwareScannerPreview from '../../assets/upload_malware_scanner_preview.png';
import fontpairPreview from '../../assets/fontpair_preview.png';
import healPreview from '../../assets/heal_preview.png';
import bluelabPreview from '../../assets/bluelab_preview.png';
import networkCheckPreview from '../../assets/network_check_preview.png';

const featuredProjects = [
  {
    name: "SheetHub",
    url: "sheethub.bluelabtech.space",
    demoUrl: "https://sheethub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/sheethub",
    description: "A smart spreadsheet collaboration hub that lets users create, manage, and share spreadsheets online.",
    features: ["Online spreadsheets", "Real-time collaboration"],
    tags: ["React", "TypeScript", "Node.js"],
    color: "#3b82f6",
    previewImage: sheethubPreview,
    icon: Table,
  },
  {
    name: "ProjectHub",
    url: "projecthub.bluelabtech.space",
    demoUrl: "https://projecthub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/Projecthub",
    description: "A platform that helps students and developers discover and explore software projects.",
    features: ["Project discovery", "Category filters"],
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
    description: "A full-featured developer toolkit platform offering a suite of productivity tools.",
    features: ["PDF tools & converters", "Developer helper utilities"],
    tags: ["React", "JavaScript", "Tailwind CSS"],
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
    description: "A sacred text reading and exploration application designed for seamless focus.",
    features: ["Focus reading layouts", "Bookmarking features"],
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
    description: "A positive habit tracker and reflection journal that encourages daily journaling.",
    features: ["Habit streak tracker", "Daily gratitude"],
    tags: ["TypeScript", "React"],
    color: "#ca8a04",
    previewImage: healPreview,
    icon: Activity,
  },
  {
    name: "Split PDF",
    url: "sheethub.bluelabtech.space",
    demoUrl: "https://sheethub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/sheethub",
    description: "A smart spreadsheet collaboration hub that lets users create, manage, and share spreadsheets online.",
    features: ["Online spreadsheets", "Real-time collaboration"],
    tags: ["React", "TypeScript", "Node.js"],
    color: "#3b82f6",
    previewImage: sheethubPreview,
    icon: Table,
  },
  {
    name: "Drop",
    url: "drop.savee.space",
    demoUrl: "https://drop.savee.space/",
    githubUrl: "https://github.com/ashwiths/Streamdrop",
    description: "A streamlined peer-to-peer file transfer platform built with JavaScript and WebRTC.",
    features: ["Direct P2P file sharing", "WebRTC secure transfers"],
    tags: ["JavaScript", "React", "WebRTC"],
    color: "#a855f7",
    previewImage: streamdropPreview,
    icon: Share2,
  },
  {
    name: "Type",
    url: "type.savee.space",
    demoUrl: "https://type.savee.space/",
    githubUrl: "https://github.com/ashwiths/Typekey",
    description: "A premium typographic typing test platform designed to measure speed and accuracy.",
    features: ["Keystroke metric analysis", "Speed & accuracy tests"],
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
    description: "An innovation hub and technology showcase platform highlighting cutting-edge solutions.",
    features: ["Innovation domain showcases", "Live ecosystem stats"],
    tags: ["React", "Tailwind CSS", "Vite"],
    color: "#3b82f6",
    previewImage: bluelabPreview,
    icon: Sparkles,
  },
  {
    name: "ProjectHub",
    url: "projecthub.bluelabtech.space",
    demoUrl: "https://projecthub.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths/Projecthub",
    description: "A platform that helps students discover and explore software projects.",
    features: ["Project discovery", "Category filters"],
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
    description: "A full-featured developer toolkit platform offering a suite of productivity tools.",
    features: ["PDF tools & converters", "Developer helper utilities"],
    tags: ["React", "JavaScript", "Tailwind CSS"],
    color: "#10b981",
    previewImage: devkitPreview,
    icon: Terminal,
  },
  {
    name: "Network Check",
    url: "check.bluelabtech.space",
    demoUrl: "https://check.bluelabtech.space/",
    githubUrl: "https://github.com/ashwiths",
    description: "A real-time network latency, status, and performance monitoring utility.",
    features: ["Global latency mapping", "Real-time ping stats"],
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
    description: "A high-performance file upload security portal with malware signature checks.",
    features: ["Malware signature checks", "Cryptographic hash check"],
    tags: ["JavaScript", "React", "Security"],
    color: "#06b6d4",
    previewImage: uploadMalwareScannerPreview,
    icon: ShieldAlert,
  },
  {
    name: "Font Generator",
    url: "font.savee.space",
    demoUrl: "https://font.savee.space/",
    githubUrl: "https://github.com/ashwiths/fontpair",
    description: "An interactive playground for typography lovers that allows developers to preview fonts.",
    features: ["Google Fonts integration", "Interactive preview workspace"],
    tags: ["JavaScript", "React", "Google Fonts API"],
    color: "#22c55e",
    previewImage: fontpairPreview,
    icon: Sparkles,
  }
];

export default function MobileSelectedWorks({ view }) {
  const isLiveView = view === 'live';
  const projectsList = isLiveView ? liveProjects : featuredProjects;
  const sectionLabel = isLiveView ? "💻 Portfolio" : "🚀 Featured Work";
  const titleText = isLiveView ? "Live projects" : "Products Built";

  return (
    <section id="work" className="w-full px-4 py-6 pb-20 select-none">
      
      {/* Title */}
      <div className="mb-8 text-left">
        <span className="section-label text-[10px]">{sectionLabel}</span>
        <h2 className="text-3xl font-display font-semibold text-white mt-2 tracking-tight uppercase">
          {titleText}
        </h2>
      </div>

      {/* Vertical Grid - 1 card per row */}
      <div className="flex flex-col gap-5">
        {projectsList.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = project.color || '#7c3aed';
  const glowColor = `${borderColor}08`; // hex opacity
  const borderHoverColor = `${borderColor}20`;
  const ProjectIcon = project.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25) }}
      whileTap={{ scale: 0.985 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-5 relative cursor-pointer flex flex-col justify-between h-full w-full text-left"
    >
      {/* Glow Back */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(140px circle at center, ${glowColor}, transparent 75%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderHoverColor,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div>
          {/* Card Preview Image */}
          {project.previewImage ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 bg-zinc-900/40">
              <img 
                src={project.previewImage} 
                alt={project.name} 
                className="w-full h-full object-cover object-top" 
              />
              
              {project.demoUrl ? (
                <span className="absolute top-2 left-2 z-25 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border"
                  style={{ backgroundColor: borderColor + '15', color: borderColor, borderColor: borderColor + '30' }}>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  Live
                </span>
              ) : (
                <span className="absolute top-2 left-2 z-25 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border border-zinc-700 bg-zinc-800/80 text-zinc-405">
                  Repo
                </span>
              )}
            </div>
          ) : (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 flex flex-col items-center justify-center bg-[#09090b]">
              <ProjectIcon size={24} style={{ color: borderColor + 'aa' }} />
              <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mt-2">
                Repository Only
              </span>
            </div>
          )}

          {/* Heading */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center" style={{ color: borderColor }}>
              <ProjectIcon size={16} />
            </div>
            <div>
              <h3 className="text-base font-display font-medium text-white tracking-tight">
                {project.name}
              </h3>
              {project.url && <span className="text-[9px] text-zinc-500 font-mono block">🌐 {project.url}</span>}
            </div>
          </div>

          <p className="text-zinc-400 text-xs font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] text-zinc-405 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-zinc-450 hover:text-white transition-colors"
              >
                <Github size={12} /> Code
              </a>
            ) : (
              <div />
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn text-[10px]"
                style={{ padding: '6px 12px', borderRadius: '8px' }}
              >
                <ExternalLink size={10} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
