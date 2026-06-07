import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Search, Code, Clock, ArrowUpRight } from 'lucide-react';
import reposData from '../../assets/repos.json';

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
  Shell: '#89e051',
};

export default function MobileRepositoriesShowcase() {
  const [searchQuery, setSearchQuery] = useState('');

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
    <section id="repositories" className="w-full px-4 py-6 pb-20 select-none text-left">
      
      {/* Title */}
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <span className="section-label text-[10px]">📂 Repositories</span>
          <h2 className="text-3xl font-display font-semibold text-white mt-2 tracking-tight uppercase">
            Products Built
          </h2>
        </div>

        {/* Stats widget for Mobile */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-md text-xs font-mono">
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] text-zinc-550">REPOS</span>
            <span className="text-sm font-semibold text-white">{repos.length}</span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] text-zinc-550">STARS</span>
            <span className="text-sm font-semibold text-zinc-200 flex items-center gap-1">
              <Star size={10} className="text-yellow-500 fill-yellow-500/10" /> {totalStars}
            </span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] text-zinc-550">FORKS</span>
            <span className="text-sm font-semibold text-zinc-200 flex items-center gap-1">
              <GitFork size={10} className="text-indigo-400" /> {totalForks}
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar for Mobile */}
      <div className="mb-6 relative w-full">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Search repos by name, language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/40 transition-all backdrop-blur-md"
        />
      </div>

      {/* Grid: 1 Column */}
      <div className="flex flex-col gap-4">
        {filteredRepos.map((repo, index) => (
          <RepositoryCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="w-full text-center py-10">
          <p className="text-zinc-500 font-light text-xs">No repositories found.</p>
        </div>
      )}

    </section>
  );
}

function RepositoryCard({ repo, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const langColor = languageColors[repo.language] || '#7c3aed';
  const glowColor = `${langColor}08`;
  const borderHoverColor = `${langColor}18`;

  const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.25) }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-5 relative cursor-pointer flex flex-col justify-between h-full min-h-[170px]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(130px circle at center, ${glowColor}, transparent 80%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: borderHoverColor,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
                <Code size={13} style={{ color: langColor }} />
              </div>
              <h3 className="text-sm font-display font-medium text-white tracking-tight truncate max-w-[170px]">
                {repo.name}
              </h3>
            </div>
            
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90"
            >
              <ArrowUpRight size={11} />
            </a>
          </div>

          <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2.5 line-clamp-3">
            {repo.description || "No description provided."}
          </p>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[9px] font-mono text-zinc-500">
          {repo.language ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColor }} />
              <span className="text-zinc-405 font-medium">{repo.language}</span>
            </div>
          ) : (
            <span>Other</span>
          )}

          <div className="flex items-center gap-2.5">
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-0.5 text-zinc-405">
                <Star size={10} className="text-yellow-500 fill-yellow-500/10" />
                {repo.stargazers_count}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
