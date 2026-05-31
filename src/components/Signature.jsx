import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';

/**
 * Premium Realistic Handwritten Signature — "Infant Ashil"
 *
 * Performance Architecture:
 * ─────────────────────────────────────────────
 * • Pure CSS stroke-dashoffset animations (compositor thread) for 60+ FPS.
 * • Dual-layer paths: clean core ink + subtle glow trail.
 * • Strict path-based erasing: animating stroke-dashoffset from 0 to -L pulls the 
 *   stroke backward (end-to-start) to look exactly like unwriting.
 * • Tight inline-block boundaries restrict hover triggers strictly to the signature bounds.
 *
 * Timing:
 * • Write Sequence: ~2.75s (natural handwriting flow with curves and pauses)
 * • Erase Sequence: ~1.5s (chronologically reversed path unwriting)
 * • Pause: ~0.2s
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

// Easings for handwriting (cubic-bezier)
const EASE_WRITE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';  // smooth pen movement
const EASE_ERASE = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';  // natural reverse flow

export default function Signature({
  className = '',
  color = '#ffffff',
  strokeWidth = 1.5,
  delay = 0,
}) {
  const [anim, setAnim] = useState({ phase: 'idle', epoch: 0 });
  const [lengths, setLengths] = useState(null);
  const pathRefs = useRef([]);
  const lockRef = useRef(false);

  // Measure path lengths on mount
  useLayoutEffect(() => {
    const L = pathRefs.current.map((el) =>
      el ? Math.ceil(el.getTotalLength()) + 2 : 400
    );
    setLengths(L);
  }, []);

  // Initial trigger after mount
  useEffect(() => {
    if (!lengths) return;
    const t = setTimeout(
      () => setAnim({ phase: 'writing', epoch: 1 }),
      200 + delay * 1000
    );
    return () => clearTimeout(t);
  }, [lengths, delay]);

  // Hover cycle: Erase in reverse → brief pause → rewrite forward
  const handleHover = async () => {
    if (lockRef.current || !lengths) return;
    lockRef.current = true;

    // Erase sequence (ends at edel 1.43 + ed 0.15 = 1.58s)
    setAnim((a) => ({ phase: 'erasing', epoch: a.epoch + 1 }));
    await sleep(1650);

    // Empty state pause (~0.2s)
    setAnim((a) => ({ phase: 'idle', epoch: a.epoch }));
    await sleep(200);

    // Rewrite sequence (ends at wdel 2.55 + wd 0.20 = 2.75s)
    setAnim((a) => ({ phase: 'writing', epoch: a.epoch + 1 }));
    await sleep(2950);

    lockRef.current = false;
  };

  // Build high-performance pure CSS keyframes
  const css = useMemo(() => {
    if (!lengths) return '';
    const { phase, epoch } = anim;

    return STROKES.map((s, i) => {
      const L = lengths[i];
      const id = `sg-${s.id}`;
      const glowId = `sg-g-${s.id}`;
      const kw = `w-${epoch}-${i}`;
      const kwGlow = `wg-${epoch}-${i}`;
      const ke = `e-${epoch}-${i}`;
      const keGlow = `eg-${epoch}-${i}`;

      if (phase === 'writing') {
        return `
          @keyframes ${kw} {
            from { stroke-dashoffset: ${L}; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes ${kwGlow} {
            from { stroke-dashoffset: ${L}; }
            to   { stroke-dashoffset: 0; }
          }
          #${id} {
            stroke-dasharray: ${L};
            stroke-dashoffset: ${L};
            animation: ${kw} ${s.wd}s ${EASE_WRITE} ${s.wdel}s both;
          }
          #${glowId} {
            stroke-dasharray: ${L};
            stroke-dashoffset: ${L};
            animation: ${kwGlow} ${s.wd}s ${EASE_WRITE} ${s.wdel}s both;
          }
        `;
      }

      if (phase === 'erasing') {
        return `
          @keyframes ${ke} {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -${L}; }
          }
          @keyframes ${keGlow} {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -${L}; }
          }
          #${id} {
            stroke-dasharray: ${L};
            stroke-dashoffset: 0;
            animation: ${ke} ${s.ed}s ${EASE_ERASE} ${s.edel}s both;
          }
          #${glowId} {
            stroke-dasharray: ${L};
            stroke-dashoffset: 0;
            animation: ${keGlow} ${s.ed}s ${EASE_ERASE} ${s.edel}s both;
          }
        `;
      }

      // Idle / initial state (erased / empty canvas)
      return `
        #${id} { stroke-dasharray: ${L}; stroke-dashoffset: ${L}; }
        #${glowId} { stroke-dasharray: ${L}; stroke-dashoffset: ${L}; }
      `;
    }).join('\n');
  }, [lengths, anim.phase, anim.epoch]);

  return (
    <div
      className={`relative select-none inline-block ${className}`}
      onMouseEnter={handleHover}
      aria-label="Infant Ashil signature"
      style={{ cursor: 'pointer' }}
    >
      <style>{css}</style>

      <svg
        viewBox="0 0 500 120"
        fill="none"
        style={{ overflow: 'visible', width: '100%', height: '100%' }}
      >
        {/* Glow Trail Layer */}
        {STROKES.map((s, i) => (
          <path
            key={`glow-${s.id}`}
            id={`sg-g-${s.id}`}
            d={s.d}
            stroke={color}
            strokeWidth={strokeWidth * 1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pointerEvents: 'none',
              willChange: 'stroke-dashoffset',
              filter: 'blur(1.5px)',
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
            style={{
              pointerEvents: 'none',
              willChange: 'stroke-dashoffset',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
