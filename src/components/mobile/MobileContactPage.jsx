import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react';

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
    value: "infant-ashil-a-b88a39361",
    href: "https://linkedin.com/in/infant-ashil-a-b88a39361/",
    color: "#7C3AED",
  },
];

export default function MobileContactPage() {
  return (
    <section id="contact-page" className="w-full px-4 py-8 pb-20 select-none text-left flex flex-col items-center">
      
      {/* Title */}
      <div className="w-full mb-10 text-center">
        <span className="section-label text-[10px]">🤝 Get In Touch</span>
        <h2 className="text-3xl font-display font-semibold text-white mt-2 tracking-tight uppercase">
          Let's Connect!
        </h2>
        <p className="text-zinc-400 text-xs mt-3 max-w-xs mx-auto font-light leading-relaxed">
          Whether it's a project, internship, or just to say hello — my inbox is always open!
        </p>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-4 w-full max-w-sm mb-10">
        {contactLinks.map((link, index) => (
          <ContactCard key={link.label} link={link} index={index} />
        ))}
      </div>

      {/* Say Hello Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="mailto:infantashil55@gmail.com"
          className="glass-btn inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold group"
          style={{ borderRadius: '14px' }}
        >
          <Mail size={14} className="text-violet-400" />
          Say Hello
          <ArrowUpRight size={13} className="text-zinc-500" />
        </a>
      </motion.div>

    </section>
  );
}

function ContactCard({ link, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      target={link.label !== "Email" ? "_blank" : undefined}
      rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bento-card p-4.5 flex items-center justify-between group cursor-pointer relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(100px circle at center, ${link.color}08, transparent 80%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-20 border"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: link.color + '18',
        }}
      />

      <div className="flex items-center gap-3.5 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{ backgroundColor: link.color + '12', borderColor: link.color + '25' }}
        >
          <link.icon size={15} style={{ color: link.color }} />
        </div>
        <div>
          <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono font-medium">{link.label}</p>
          <p className="text-sm font-semibold text-zinc-350 mt-0.5 truncate max-w-[190px]">
            {link.value}
          </p>
        </div>
      </div>
      <Send size={12} className="text-zinc-550 group-hover:text-white transition-colors relative z-10" />
    </motion.a>
  );
}
