import { motion } from 'framer-motion';
import AshilSignature from './AshilSignature';
import bgImg from '../assets/background.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px] max-h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black"
    >
      {/* ================= 1. CINEMATIC BACKGROUND IMAGE (WITH SUBJECT & STUDIO) ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black flex items-center justify-center">
        {/* Main Background Image - Balanced positioning */}
        <img
          src={bgImg}
          alt="Infant Ashil - Hero Background"
          className="w-full h-full object-contain object-center sm:object-[58%_center] lg:object-[62%_center] transform translate-x-3 sm:translate-x-6 lg:translate-x-10 xl:translate-x-14 pointer-events-none select-none"
        />

        {/* Left Side Subtle Dark Gradient Fade (Ensures crisp contrast for typography) */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[35%] bg-gradient-to-r from-black/80 via-black/25 to-transparent pointer-events-none z-[2]" />

        {/* Top Dark Gradient Fade (Ensures Navbar Visibility) */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-[2]" />

        {/* Bottom subtle blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-[2]" />
      </div>

      {/* ================= 2. CONTENT & TYPOGRAPHY LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 pb-8 pointer-events-none">

        {/* Main Hero Content Row */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full my-auto pt-2">

          {/* LEFT COLUMN: Massive Typography & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-[36rem] xl:max-w-[40rem] pointer-events-auto z-20"
          >
            {/* Massive Condensed Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3 select-none">
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.6rem] tracking-tight uppercase leading-[0.84]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1: I BUILD */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E4DCD3] to-[#7B6E60] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  I BUILD
                </span>

                {/* Line 2: DIGITAL */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FDF0D5] via-[#CDA261] to-[#5C401E] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                  DIGITAL
                </span>

                {/* Line 3: EXPERIENCES */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#E6C795] via-[#A47E45] to-[#3C2B14] drop-shadow-[0_10px_30px_rgba(155,118,64,0.4)]">
                  EXPERIENCES
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Roles */}
            <motion.div variants={fadeUpVariants} className="mb-3.5">
              <p
                className="text-[9.5px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] uppercase text-[#C4B29E]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                FULL STACK DEVELOPER <span className="text-[#8C6D4F] mx-1.5">•</span> UI/UX DESIGNER
              </p>
            </motion.div>

            {/* Brief Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[13px] font-light text-[#A8988B] leading-[1.8] tracking-wide max-w-md sm:max-w-lg mb-6 sm:mb-7 space-y-0.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                I turn bold ideas into seamless digital experiences.
                <br />
                Where frontend meets powerful backend, and code transforms vision into impact.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-3.5 sm:gap-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore My Work Button */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center space-x-2.5 px-5 sm:px-6 py-3 border border-[#8C6D4F] bg-[#120F0C]/85 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)] backdrop-blur-sm cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>EXPLORE MY WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[#D4AF37]">
                  ↗
                </span>
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center space-x-2 px-5 sm:px-6 py-3 border border-[#8C6D4F]/40 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[10.5px] sm:text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 bg-black/40 backdrop-blur-sm cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs text-[#8C6D4F]">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Floating Note & Calligraphy Signature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-10 xl:pr-20 z-20 select-none"
          >
            {/* Note */}
            <div
              className="text-xs sm:text-[13px] font-normal text-[#C4B29E] mb-2.5 flex items-center gap-1.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>Made with</span>
              <span className="text-pink-500 inline-block transform hover:scale-125 transition-transform duration-200">💖</span>
              <span>and a lot of</span>
              <span className="text-amber-500 inline-block transform hover:scale-125 transition-transform duration-200">☕</span>
            </div>

            {/* Gold Accent Line */}
            <div className="w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-1" />

            {/* Animated Vector Handwritten Signature */}
            <div className="relative -ml-4 select-none">
              <AshilSignature
                className="w-52 xl:w-60 h-auto drop-shadow-[0_0_14px_rgba(216,171,100,0.7)]"
                color="#D8AB64"
                glowColor="#D4AF37"
                strokeWidth={1.6}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;
