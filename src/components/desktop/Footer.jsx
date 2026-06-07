import { Github, Linkedin, Mail, Heart, Coffee } from 'lucide-react';
import Signature from './Signature';

/**
 * Minimalist Footer in premium dark mode
 */
export default function Footer() {
  return (
    <footer id="contact" className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[100px] bg-gradient-to-t from-violet-600/5 to-transparent blur-[80px] pointer-events-none z-0" />
      
      {/* --- Bottom Bar --- */}
      <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Signature */}
        <div>
          <Signature
            className="w-32 h-10 opacity-70 hover:opacity-100 transition-opacity"
            color="#ffffff"
            delay={0}
            strokeWidth={1.6}
          />
          <p className="text-[10px] text-zinc-550 mt-2 flex items-center gap-1 font-mono">
            Made with <Heart size={10} className="text-violet-500 fill-current animate-pulse" /> and <Coffee size={10} className="text-zinc-405" />
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <a href="https://github.com/ashwiths" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/infant-ashil-a" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
            <Linkedin size={16} />
          </a>
          <a href="mailto:infantashil55@gmail.com" className="social-icon-btn">
            <Mail size={16} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-zinc-500 font-mono tracking-wider">
          © {new Date().getFullYear()} Infant Ashil A
        </p>
      </div>
    </footer>
  );
}

