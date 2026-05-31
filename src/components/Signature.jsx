import { motion } from 'framer-motion';

/**
 * Animated cursive handwriting signature "Infant Ashil"
 * Uses smooth continuous SVG bezier curves and path length animation
 * to create a beautiful, authentic pen-drawn signature feel.
 */
export default function Signature({ className = "", color = "#f5f5f5", delay = 0, strokeWidth = 2.2 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: delay + i * 0.09,
          type: "spring",
          duration: 1.4,
          bounce: 0,
        },
        opacity: { delay: delay + i * 0.09, duration: 0.01 },
      },
    }),
  };


  return (
    <motion.svg
      viewBox="0 0 500 120"
      fill="none"
      className={className}
      initial="hidden"
      animate="visible"
      aria-label="Infant Ashil signature"
      style={{ overflow: 'visible' }}
    >
      {/* Capital "I" */}
      <motion.path
        d="M 35,45 C 35,25 55,20 50,40 C 45,60 25,75 35,85 C 45,95 60,80 65,75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={0}
      />

      {/* Cursive "n-f-a-n-t" */}
      <motion.path
        d="M 65,75 C 75,65 80,50 88,55 C 95,60 92,80 95,80 C 98,80 102,60 108,35 C 112,15 118,15 112,50 C 108,75 102,100 105,100 C 108,100 112,80 120,65 C 125,55 135,50 132,65 C 130,75 132,80 138,80 C 142,80 145,70 148,60 C 152,50 160,50 158,65 C 156,75 158,80 164,80 C 170,80 172,60 175,40 L 173,80 C 173,83 180,80 188,78"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={1}
      />

      {/* "f" crossbar */}
      <motion.path
        d="M 100,52 C 108,52 118,52 122,52"
        stroke={color}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
        variants={draw}
        custom={1.8}
      />

      {/* "t" crossbar */}
      <motion.path
        d="M 166,48 C 174,48 182,48 186,48"
        stroke={color}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
        variants={draw}
        custom={2.2}
      />

      {/* Capital "A" */}
      <motion.path
        d="M 215,80 C 210,70 225,35 232,25 C 240,15 248,15 250,30 C 252,50 238,80 246,80 C 250,80 258,65 265,55"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={2.8}
      />

      {/* Cursive "s-h-i-l" */}
      <motion.path
        d="M 265,55 C 272,50 282,48 278,62 C 274,72 288,75 292,70 C 295,68 300,50 306,35 C 310,20 315,20 312,50 C 309,70 312,80 318,80 C 322,80 326,70 328,60 C 330,50 336,52 334,68 C 332,78 336,80 342,80 C 348,80 358,40 360,25 C 362,10 366,15 362,50 C 358,75 352,85 365,80"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={3.5}
      />

      {/* "i" dot */}
      <motion.circle
        cx="332"
        cy="42"
        r="2"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 4.2 * 0.15, duration: 0.3, type: "spring", bounce: 0.6 }}
      />

      {/* Underline flourish swoosh */}
      <motion.path
        d="M 25,95 Q 200,108 380,95 T 480,85"
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={draw}
        custom={4.5}
      />
    </motion.svg>
  );
}
