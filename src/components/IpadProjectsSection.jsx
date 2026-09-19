import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Dedicated iPad / Tablet Project Card Component
 * Optimized for 768px - 1024px viewports (iPad Mini, iPad Air, iPad Pro)
 * Delivers touch-smooth 60fps hardware-accelerated stacking animation
 */
export const IpadProjectCard = ({ project, index, total }) => {
  const cardContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div
      ref={cardContainerRef}
      className="sticky w-full"
      style={{
        top: `calc(84px + ${index * 16}px)`,
        zIndex: index + 1,
        marginBottom: index === total - 1 ? '0px' : '48px',
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-6 md:p-8 shadow-[0_22px_65px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
      >
        {/* Decorative Luxury Accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/60" />

        {/* Giant Watermark Number */}
        <span
          className="absolute -bottom-5 -right-3 text-8xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {project.number}
        </span>

        {/* Tablet Dual-Column / Fluid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
          
          {/* Left Column: Info & Description */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2.5 mb-2.5">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                  {project.number} //
                </span>
                <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#A8988B]">
                  {project.category}
                </span>
              </div>

              <h3
                className="text-4xl lg:text-5xl font-normal tracking-tight text-white mb-3 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h3>

              <p
                className="text-[13px] font-light text-[#BDB0A4] leading-relaxed tracking-wide mb-4 max-w-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {project.description}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#8C6D4F]/25">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[9.5px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Architecture Metrics & Actions */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-5 md:pl-5 md:border-l border-[#8C6D4F]/25">
            <div>
              <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2.5">
                // ARCHITECTURE METRICS
              </span>
              <div className="grid grid-cols-1 gap-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                  >
                    <span className="text-[9.5px] font-mono text-[#A8988B]">
                      {m.label}
                    </span>
                    <span className="text-[10.5px] font-mono font-medium text-[#F7E7C4]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 border border-[#D4AF37] bg-[#D4AF37] hover:bg-[#c49f2c] text-black text-[10.5px] font-semibold tracking-[0.18em] uppercase text-center transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>VISIT LIVE</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] text-[#EAD8C7] hover:text-white text-[10.5px] font-medium tracking-[0.18em] uppercase text-center transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>GITHUB</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export const IpadProjectsSection = ({ projects }) => {
  return (
    <div className="relative w-full flex flex-col space-y-4">
      {projects.map((project, index) => (
        <IpadProjectCard
          key={project.title}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}
    </div>
  );
};

export default IpadProjectsSection;
