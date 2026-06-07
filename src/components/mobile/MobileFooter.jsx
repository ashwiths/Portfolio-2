import { Github, Linkedin, Mail, Heart, Coffee } from 'lucide-react';
import Signature from '../desktop/Signature';

export default function MobileFooter() {
  return (
    <footer className="w-full px-4 py-10 border-t border-white/5 bg-black/[0.08] select-none text-center flex flex-col items-center gap-6 relative z-10">
      
      {/* Signature */}
      <div className="opacity-80">
        <Signature
          className="w-40 h-10"
          color="#ffffff"
          strokeWidth={1.4}
        />
      </div>

      {/* Social Links Row */}
      <div className="flex items-center gap-4">
        <a
          href="mailto:infantashil55@gmail.com"
          className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="Email"
        >
          <Mail size={15} />
        </a>
        <a
          href="https://github.com/ashwiths"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/infant-ashil-a-b88a39361/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={15} />
        </a>
      </div>

      {/* Credits */}
      <div className="flex flex-col gap-1.5 text-[10px] font-mono tracking-widest text-zinc-550 uppercase">
        <p>© 2026 INFANT ASHIL A</p>
        <p className="flex items-center justify-center gap-1">
          Crafted with <Heart size={10} className="text-red-500 animate-pulse fill-red-500/10" /> &amp; <Coffee size={10} className="text-amber-600" />
        </p>
      </div>

    </footer>
  );
}
