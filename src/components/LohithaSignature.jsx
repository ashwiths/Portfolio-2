import { useState, useEffect, useRef, useLayoutEffect } from 'react';

/**
 * Automated Handwritten Gold Signature — "Lohitha"
 * 
 * Features:
 * • Animated automated vector stroke drawing (Web Animations API)
 * • Dual-layer paths: Core gold ink (#F2D8A7) + luminous gold glow trail (#D4AF37)
 * • Elegant cursive typography accent in 'Herr Von Muellerhoff'
 * • Automatic write animation on mount / in-view
 * • Interactive erase & rewrite sequence on hover
 */

const STROKES = [
  {
    id: 's-l', // Capital L
    d: 'M 42,32 C 40,18 52,14 56,22 C 60,32 40,64 34,74 C 30,80 36,83 48,80 C 60,76 74,74 86,74',
    wd: 0.38, wdel: 0.05,
    ed: 0.20, edel: 1.30,
  },
  {
    id: 's-o', // o
    d: 'M 86,74 C 92,62 102,52 110,56 C 118,60 114,75 106,77 C 98,79 92,65 104,56 C 112,50 120,54 126,58',
    wd: 0.32, wdel: 0.40,
    ed: 0.18, edel: 1.08,
  },
  {
    id: 's-h1', // h
    d: 'M 126,58 C 134,44 148,18 152,22 C 156,28 146,58 140,78 M 140,64 C 146,56 156,54 162,62 C 166,70 162,78 168,78',
    wd: 0.42, wdel: 0.70,
    ed: 0.22, edel: 0.82,
  },
  {
    id: 's-i', // i
    d: 'M 168,78 C 174,68 180,58 182,60 C 185,64 180,74 186,78',
    wd: 0.20, wdel: 1.10,
    ed: 0.12, edel: 0.68,
  },
  {
    id: 's-t', // t stem
    d: 'M 186,78 C 192,64 198,34 202,38 C 204,44 198,70 204,77 C 208,80 214,75 220,70',
    wd: 0.30, wdel: 1.28,
    ed: 0.16, edel: 0.50,
  },
  {
    id: 's-h2', // second h
    d: 'M 220,70 C 226,52 236,22 240,26 C 244,32 236,58 232,78 M 232,64 C 238,56 246,54 252,62 C 256,70 252,78 258,78',
    wd: 0.40, wdel: 1.55,
    ed: 0.20, edel: 0.28,
  },
  {
    id: 's-a', // a
    d: 'M 258,78 C 264,66 274,58 280,62 C 285,66 282,78 276,78 C 270,78 266,66 278,60 C 284,56 290,62 288,78 C 290,80 298,76 308,72',
    wd: 0.34, wdel: 1.92,
    ed: 0.18, edel: 0.08,
  },
  {
    id: 's-idot', // i dot
    d: 'M 183,46 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0',
    wd: 0.08, wdel: 2.24,
    ed: 0.06, edel: 0.60,
  },
  {
    id: 's-tbar', // t crossbar
    d: 'M 194,52 L 212,50',
    wd: 0.10, wdel: 2.30,
    ed: 0.06, edel: 0.42,
  },
  {
    id: 's-flourish', // underline flourish
    d: 'M 36,88 Q 170,102 308,84',
    wd: 0.32, wdel: 2.38,
    ed: 0.18, edel: 0.00,
  },
];

const EASE_WRITE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
const EASE_ERASE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

export default function LohithaSignature({
  className = '',
  color = '#F2D8A7',
  glowColor = '#D4AF37',
  strokeWidth = 2,
  delay = 0.3,
}) {
  const [phase, setPhase] = useState('idle');
  const [lengths, setLengths] = useState(null);
  const [showTypography, setShowTypography] = useState(false);
  const pathRefs = useRef([]);
  const glowPathRefs = useRef([]);
  const activeAnimationsRef = useRef([]);
  const timersRef = useRef([]);

  // Calculate path lengths
  useLayoutEffect(() => {
    const L = pathRefs.current.map((el) =>
      el ? Math.ceil(el.getTotalLength()) + 2 : 250
    );
    setLengths(L);
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const cancelAnimations = () => {
    activeAnimationsRef.current.forEach((anim) => {
      try {
        anim.cancel();
      } catch (e) {}
    });
    activeAnimationsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
      cancelAnimations();
    };
  }, []);

  const triggerAnimation = (currentPhase) => {
    if (!lengths) return;
    cancelAnimations();

    STROKES.forEach((s, i) => {
      const L = lengths[i];
      const coreEl = pathRefs.current[i];
      const glowEl = glowPathRefs.current[i];

      if (!coreEl || !glowEl) return;

      let keyframes, options;
      if (currentPhase === 'writing') {
        keyframes = [
          { strokeDashoffset: `${L}px` },
          { strokeDashoffset: '0px' }
        ];
        options = {
          duration: s.wd * 1000,
          delay: s.wdel * 1000,
          easing: EASE_WRITE,
          fill: 'both'
        };
      } else if (currentPhase === 'erasing') {
        keyframes = [
          { strokeDashoffset: '0px' },
          { strokeDashoffset: `-${L}px` }
        ];
        options = {
          duration: s.ed * 1000,
          delay: s.edel * 1000,
          easing: EASE_ERASE,
          fill: 'both'
        };
      } else {
        coreEl.style.strokeDashoffset = `${L}px`;
        glowEl.style.strokeDashoffset = `${L}px`;
        return;
      }

      const animCore = coreEl.animate(keyframes, options);
      const animGlow = glowEl.animate(keyframes, options);
      activeAnimationsRef.current.push(animCore, animGlow);
    });

    if (currentPhase === 'writing') {
      const t = setTimeout(() => {
        setShowTypography(true);
      }, 2600);
      timersRef.current.push(t);
    } else {
      setShowTypography(false);
    }
  };

  useEffect(() => {
    if (!lengths) return;
    triggerAnimation(phase);
  }, [phase, lengths]);

  // Initial auto-draw
  useEffect(() => {
    if (!lengths) return;
    const t = setTimeout(() => {
      setPhase('writing');
    }, 200 + delay * 1000);
    return () => clearTimeout(t);
  }, [lengths, delay]);

  const handleMouseEnter = () => {
    if (!lengths) return;
    clearTimers();
    setShowTypography(false);
    setPhase('erasing');

    const t1 = setTimeout(() => {
      setPhase('idle');
      const t2 = setTimeout(() => {
        setPhase('writing');
      }, 120);
      timersRef.current.push(t2);
    }, 1500);

    timersRef.current.push(t1);
  };

  return (
    <div
      className={`relative select-none inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label="Lohitha automated signature"
      style={{ cursor: 'pointer' }}
    >
      <svg
        viewBox="0 0 340 110"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ overflow: 'visible', width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="lohitha-sig-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0.83
              0 1 0 0 0.69
              0 0 1 0 0.22
              0 0 0 0.6 0
            " />
          </filter>
        </defs>

        {/* Glow Trail Layer */}
        {STROKES.map((s, i) => (
          <path
            key={`glow-${s.id}`}
            ref={(el) => { glowPathRefs.current[i] = el; }}
            d={s.d}
            stroke={glowColor}
            strokeWidth={strokeWidth * 2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lohitha-sig-glow)"
            shapeRendering="geometricPrecision"
            style={{
              pointerEvents: 'none',
              willChange: 'stroke-dashoffset',
              strokeDasharray: lengths ? lengths[i] : 300,
              strokeDashoffset: lengths ? lengths[i] : 300,
            }}
          />
        ))}

        {/* Core Ink Layer */}
        {STROKES.map((s, i) => (
          <path
            key={s.id}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={s.d}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
            style={{
              pointerEvents: 'none',
              willChange: 'stroke-dashoffset',
              strokeDasharray: lengths ? lengths[i] : 300,
              strokeDashoffset: lengths ? lengths[i] : 300,
            }}
          />
        ))}

        {/* Luminous Calligraphy Overlay Layer */}
        <text
          x="170"
          y="76"
          textAnchor="middle"
          fill={color}
          style={{
            fontFamily: "'Herr Von Muellerhoff', cursive",
            fontSize: '64px',
            opacity: showTypography ? 0.95 : 0,
            transition: 'opacity 0.6s ease-in-out',
            filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.7))',
            pointerEvents: 'none',
          }}
        >
          Lohitha
        </text>
      </svg>
    </div>
  );
}
