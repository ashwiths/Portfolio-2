import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // For parallax effect on background elements
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -100]);
  const yParallaxReverse = useTransform(scrollY, [0, 1000], [0, 100]);

  // Track mouse position for spotlight / responsive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // HTML5 Canvas for high-performance ambient floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.1 - 0.05;
        this.speedY = Math.random() * -0.15 - 0.05; // float upward
        this.alpha = Math.random() * 0.4 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.maxAlpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade in and out
        if (this.alpha < this.maxAlpha) {
          this.alpha += this.fadeSpeed;
        }

        // Reset if off-screen or faded out
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height; // restart at bottom
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#A78BFA'; // soft purple tint
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] bg-[#050505] overflow-hidden"
    >
      {/* 1. Interactive Spotlight / Radial glow that follows cursor */}
      <div 
        className="absolute inset-0 opacity-[0.12] transition-opacity duration-1000 hidden md:block"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.45), rgba(59, 130, 246, 0.2) 40%, transparent 70%)`
        }}
      />

      {/* 2. Floating Ambient Glow Blobs (Drifting gradients) */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-transparent blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow"
      />
      <motion.div 
        style={{ y: yParallaxReverse }}
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#3B82F6]/15 to-transparent blur-[120px] mix-blend-screen pointer-events-none animate-pulse-slow-reverse"
      />

      {/* 3. Subtle Animated Moving Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-drift" />

      {/* 4. Canvas Ambient Dust Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-40 mix-blend-screen"
      />

      {/* 5. Subtle Noise Texture Overlay (Premium paper/film grain) */}
      <div className="absolute inset-0 opacity-[0.015] bg-noise pointer-events-none mix-blend-overlay" />
    </div>
  );
}
