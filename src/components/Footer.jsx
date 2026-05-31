import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowUpRight, Heart, Coffee } from 'lucide-react';
import Signature from './Signature';

/**
 * Contact Footer in premium dark mode
 */

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "infantashil55@gmail.com",
    href: "mailto:infantashil55@gmail.com",
    color: "#3B82F6",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ashwiths",
    href: "https://github.com/ashwiths",
    color: "#ffffff",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "infant-ashil-a",
    href: "https://linkedin.com/in/infant-ashil-a",
    color: "#7C3AED",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[250px] bg-gradient-to-t from-violet-600/10 to-transparent blur-[100px] pointer-events-none z-0" />
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-85px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <span className="section-label">🤝 Get In Touch</span>
        <h2 className="text-5xl md:text-7xl font-display font-medium text-white mt-4 tracking-tight">
          Let's Connect!
        </h2>
        <p className="text-zinc-400 text-base md:text-lg mt-4 max-w-lg mx-auto font-light leading-relaxed">
          Whether it's a freelance project, internship, or just a chat — my inbox is always open!
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="flex flex-col gap-4 max-w-xl mx-auto mb-20 relative z-10">
        {contactLinks.map((link, index) => (
          <ContactCard key={link.label} link={link} index={index} />
        ))}
      </div>

      {/* Email CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-24 relative z-10"
      >
        <a
          href="mailto:infantashil55@gmail.com"
          className="glass-btn inline-flex items-center gap-3 px-8 py-4 text-base font-semibold group"
        >
          <Mail size={18} className="text-violet-400 group-hover:scale-110 transition-transform" />
          Say Hello
          <ArrowUpRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

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
            Made with <Heart size={10} className="text-violet-500 fill-current animate-pulse" /> and <Coffee size={10} className="text-zinc-400" />
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

// Subcomponent: Contact Link Card with Spotlight
function ContactCard({ link, index }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      href={link.href}
      target={link.label !== "Email" ? "_blank" : undefined}
      rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-5 flex items-center justify-between group cursor-pointer relative overflow-hidden"
    >
      {/* Spotlight Border */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-500 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />
      <div className="flex items-center gap-4 relative z-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center border"
          style={{ backgroundColor: link.color + '15', borderColor: link.color + '30' }}
        >
          <link.icon size={18} style={{ color: link.color }} />
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono font-medium">{link.label}</p>
          <p className="text-base font-semibold text-zinc-300 group-hover:text-white transition-colors mt-0.5">
            {link.value}
          </p>
        </div>
      </div>
      <Send size={15} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all relative z-10" />
    </motion.a>
  );
}
