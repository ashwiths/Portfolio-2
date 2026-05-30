import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowUpRight, Heart, Coffee } from 'lucide-react';
import Signature from './Signature';

/**
 * Contact Footer — ashil.space exact data
 * Email: infantashil55@gmail.com
 * GitHub: github.com/ashwiths
 * LinkedIn: infant-ashil-a
 */

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "infantashil55@gmail.com",
    href: "mailto:infantashil55@gmail.com",
    color: "#ff6b35",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ashwiths",
    href: "https://github.com/ashwiths",
    color: "#f5f5f5",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "infant-ashil-a",
    href: "https://linkedin.com/in/infant-ashil-a",
    color: "#3b82f6",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <span className="section-label">🤝 Get In Touch</span>
        <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 mt-3">
          Let's Connect!
        </h2>
        <p className="text-zinc-500 text-base mt-4 max-w-md mx-auto">
          Whether it's a freelance project, internship, or just a chat — my inbox is always open!
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="flex flex-col gap-3 max-w-xl mx-auto mb-24">
        {contactLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bento-card p-5 flex items-center justify-between group cursor-pointer hover:border-zinc-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: link.color + '15' }}
              >
                <link.icon size={18} style={{ color: link.color }} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">{link.label}</p>
                <p className="text-sm text-zinc-650 font-medium group-hover:text-zinc-950 transition-colors">
                  {link.value}
                </p>
              </div>
            </div>
            <Send size={14} className="text-zinc-300 group-hover:text-zinc-950 transition-colors" />
          </motion.a>
        ))}
      </div>

      {/* Email CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-20"
      >
        <a
          href="mailto:infantashil55@gmail.com"
          className="glass-btn inline-flex items-center gap-2 px-8 py-3 text-base"
        >
          <Mail size={16} />
          Say Hello
          <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-zinc-200/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Signature */}
        <div>
          <Signature
            className="w-32 h-10 opacity-50 hover:opacity-90 transition-opacity"
            color="#09090b"
            delay={0}
            strokeWidth={1.5}
          />
          <p className="text-[10px] text-zinc-450 mt-1 flex items-center gap-1">
            Made with <Heart size={10} className="text-red-500" /> and a lot of <Coffee size={10} /> ☕
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
        <p className="text-[11px] text-zinc-450">
          © {new Date().getFullYear()} Infant Ashil A
        </p>
      </div>
    </footer>
  );
}
