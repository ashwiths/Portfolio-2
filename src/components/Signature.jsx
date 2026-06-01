import { useState, useEffect, useRef, useLayoutEffect } from 'react';

/**
 * Premium Realistic Handwritten Signature — "Infant Ashil"
 *
 * Performance Architecture:
 * ─────────────────────────────────────────────
 * • Web Animations API (Compositor Thread) for smooth 60+ FPS without style recalculation.
 * • Dual-layer paths: clean core ink + subtle glow trail.
 * • Strict path-based erasing: animating stroke-dashoffset from 0 to -L pulls the 
 *   stroke backward (end-to-start) to look exactly like unwriting.
 * • Tight inline-block boundaries restrict hover triggers strictly to the signature bounds.
 *
 * Timing:
 * • Write Sequence: ~2.75s (natural handwriting flow with curves and pauses)
 * • Erase Sequence: ~1.5s (chronologically reversed path unwriting)
 */

const STROKES = [
  {
    id: 's0',
    d: 'M 35,45 C 35,25 55,20 50,40 C 45,60 25,75 35,85 C 45,95 60,80 65,75',
    wd: 0.28, wdel: 0.00,   // write duration / write delay
    ed: 0.15, edel: 1.43,   // erase duration / erase delay
  },
  {
    id: 's1',
    d: 'M 65,75 C 78,58 88,54 92,76 C 94,80 100,56 110,28 C 114,15 120,18 114,52 C 110,74 106,96 110,96 C 114,96 122,68 132,62 C 140,58 148,56 146,72 C 144,80 150,80 158,72 C 162,60 170,54 172,40 L 170,80 C 172,82 182,78 188,76',
    wd: 0.75, wdel: 0.33,
    ed: 0.38, edel: 1.02,
  },
  {
    id: 's2',
    d: 'M 100,52 L 122,52',
    wd: 0.08, wdel: 1.14,
    ed: 0.06, edel: 0.93,
  },
  {
    id: 's3',
    d: 'M 166,48 L 186,48',
    wd: 0.08, wdel: 1.26,
    ed: 0.06, edel: 0.84,
  },
  {
    id: 's4',
    d: 'M 215,80 C 210,70 225,35 232,25 C 240,15 248,15 250,30 C 252,50 238,80 246,80 C 250,80 258,65 265,55',
    wd: 0.28, wdel: 1.42,
    ed: 0.15, edel: 0.66,
  },
  {
    id: 's5',
    d: 'M 265,55 C 272,50 282,48 278,62 C 274,72 288,74 292,70 C 296,66 302,48 308,32 C 312,18 318,20 314,50 C 310,70 314,80 320,80 C 324,80 328,70 330,58 C 332,50 338,52 336,68 C 334,78 338,80 344,80 C 350,80 360,38 362,24 C 364,10 368,16 364,50 C 360,76 354,86 366,80',
    wd: 0.60, wdel: 1.75,
    ed: 0.35, edel: 0.27,
  },
  {
    id: 's6',
    d: 'M 328,40 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0',
    wd: 0.07, wdel: 2.40,
    ed: 0.06, edel: 0.18,
  },
  {
    id: 's7',
    d: 'M 25,95 Q 200,108 380,95 T 480,85',
    wd: 0.20, wdel: 2.55,
    ed: 0.15, edel: 0.00,
  },
];

const EASE_WRITE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
const EASE_ERASE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';

export default function Signature({
  className = '',
  color = '#ffffff',
  strokeWidth = 1.5,
  delay = 0,
}) {
  const [phase, setPhase] = useState('idle');
  const [lengths, setLengths] = useState(null);
  const pathRefs = useRef([]);
  const glowPathRefs = useRef([]);
  const activeAnimationsRef = useRef([]);
  const timersRef = useRef([]);

  // Measure path lengths on mount
  useLayoutEffect(() => {
    const L = pathRefs.current.map((el) =>
      el ? Math.ceil(el.getTotalLength()) + 2 : 400
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

  // Clean up timers and animations on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      cancelAnimations();
    };
  }, []);

  // Trigger compositor-thread Web Animations
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
        // Idle / reset state
        coreEl.style.strokeDashoffset = `${L}px`;
        glowEl.style.strokeDashoffset = `${L}px`;
        return;
      }

      const animCore = coreEl.animate(keyframes, options);
      const animGlow = glowEl.animate(keyframes, options);
      activeAnimationsRef.current.push(animCore, animGlow);
    });
  };

  // Sync animations with phase state transitions
  useEffect(() => {
    if (!lengths) return;
    triggerAnimation(phase);
  }, [phase, lengths]);

  // Initial draw trigger on load
  useEffect(() => {
    if (!lengths) return;
    const t = setTimeout(() => {
      setPhase('writing');
    }, 200 + delay * 1000);
    return () => clearTimeout(t);
  }, [lengths, delay]);

  const handleMouseEnter = () => {
    if (!lengths) return;

    // Reset timers & cancel current animations immediately
    clearTimers();

    // Step 1: Start erasing (undo) immediately
    setPhase('erasing');

    // Step 2: After erase completes (~1.6s), pause and rewrite (re-sign)
    const t1 = setTimeout(() => {
      setPhase('idle');
      
      const t2 = setTimeout(() => {
        setPhase('writing');
      }, 100);

      timersRef.current.push(t2);
    }, 1600);

    timersRef.current.push(t1);
  };

  return (
    <div
      className={`relative select-none inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label="Infant Ashil signature"
      style={{ cursor: 'pointer' }}
    >
      <svg
        viewBox="0 0 500 120"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ overflow: 'visible', width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="sig-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.45 0
            " />
          </filter>
        </defs>

        {/* Glow Trail Layer */}
        {STROKES.map((s, i) => (
          <path
            key={`glow-${s.id}`}
            id={`sg-g-${s.id}`}
            ref={(el) => { glowPathRefs.current[i] = el; }}
            d={s.d}
            stroke={color}
            strokeWidth={strokeWidth * 2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#sig-glow-filter)"
            shapeRendering="geometricPrecision"
            style={{
              pointerEvents: 'none',
              willChange: 'stroke-dashoffset',
              strokeDasharray: lengths ? lengths[i] : 400,
              strokeDashoffset: lengths ? lengths[i] : 400,
            }}
          />
        ))}

        {/* Core Ink Layer */}
        {STROKES.map((s, i) => (
          <path
            key={s.id}
            id={`sg-${s.id}`}
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
              strokeDasharray: lengths ? lengths[i] : 400,
              strokeDashoffset: lengths ? lengths[i] : 400,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
