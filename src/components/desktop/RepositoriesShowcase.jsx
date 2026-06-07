import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Search, Code, Clock, ArrowUpRight, ExternalLink } from 'lucide-react';
import reposData from '../../assets/repos.json';

// Helper to map languages to colors
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  Vue: '#41b883',
  Ruby: '#701516',
  Shell: '#89e051',
};

export default function RepositoriesShowcase() {
  const [searchQuery, setSearchQuery] = useState('');

  // Clean and filter repos (exclude profile repo or empty names if any)
  const repos = reposData.filter(repo => repo.name !== 'Ashil' && repo.name !== 'ashwiths');

  const filteredRepos = repos.filter(repo => {
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      (repo.language && repo.language.toLowerCase().includes(query))
    );
  });

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  return (
    <section id="repositories" className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-32 md:pt-10 md:pb-40 scroll-mt-24">
      
      {/* === SECTION HEADING === */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 relative flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="section-label">📂 Repositories</span>
          <h2 className="text-5xl md:text-6xl font-display font-medium text-white mt-4 tracking-tight">
            Products I Have Built
          </h2>
          <p className="text-zinc-405 text-base md:text-lg mt-3 max-w-xl font-light">
            An auto-fetched catalog of public repositories, modules, and open-source contributions.
          </p>
        </div>

        {/* Stats widget */}
        <div className="flex items-center gap-6 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
          <div className="text-left">
            <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">REPOSITORIES</span>
            <span className="text-xl font-display font-semibold text-white">{repos.length}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-left">
            <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">STARS</span>
            <span className="text-xl font-display font-semibold text-zinc-200 flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500/10" /> {totalStars}
            </span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-left">
            <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">FORKS</span>
            <span className="text-xl font-display font-semibold text-zinc-200 flex items-center gap-1.5">
              <GitFork size={14} className="text-indigo-400" /> {totalForks}
            </span>
          </div>
        </div>
      </motion.div>

      {/* === SEARCH FILTER BAR === */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-10 relative max-w-md"
      >
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects by name, language, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300 backdrop-blur-md"
          />
        </div>
      </motion.div>

      {/* === REPOSITORIES GRID === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo, index) => (
          <RepositoryCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="w-full text-center py-20">
          <p className="text-zinc-500 font-light text-base">No repositories found matching your query.</p>
        </div>
      )}
    </section>
  );
}

function RepositoryCard({ repo, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const langColor = languageColors[repo.language] || '#7c3aed';
  const glowColor = `${langColor}10`; // opacity in hex
  const borderHoverColor = `${langColor}25`;
  const gradient = `linear-gradient(to bottom, ${langColor}08, transparent)`;

  const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.01 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-6 relative cursor-pointer group flex flex-col justify-between h-full min-h-[220px]"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-600 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at center, ${glowColor}, transparent 75%)`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderHoverColor,
          boxShadow: `inset 0 0 10px ${glowColor}`,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundImage: gradient }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div>
          {/* Header row: Icon & Name */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <Code size={16} style={{ color: langColor }} />
              </div>
              <h3 className="text-lg font-display font-medium text-white tracking-tight group-hover:text-white transition-colors truncate max-w-[180px] md:max-w-[200px]">
                {repo.name}
              </h3>
            </div>
            
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Description */}
          <p className="text-zinc-405 text-xs font-light leading-relaxed line-clamp-3 min-h-[3.25rem]">
            {repo.description || "No description provided for this project. Check out the code and files in the repository."}
          </p>
        </div>

        {/* Footer info */}
        <div>
          {/* Tech/Stats row */}
          <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-4">
            
            {/* Left: Language */}
            {repo.language ? (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
                <span className="text-[10px] font-mono text-zinc-400 font-medium">{repo.language}</span>
              </div>
            ) : (
              <span className="text-[10px] font-mono text-zinc-500">Unspecified</span>
            )}

            {/* Right: Stars / Forks / Date */}
            <div className="flex items-center gap-3">
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <Star size={11} className="text-yellow-500 fill-yellow-500/10" />
                  {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <GitFork size={11} className="text-indigo-400" />
                  {repo.forks_count}
                </span>
              )}
              <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                <Clock size={11} />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
