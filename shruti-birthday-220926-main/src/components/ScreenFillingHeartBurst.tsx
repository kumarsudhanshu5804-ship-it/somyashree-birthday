import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

interface ScreenFillingHeartBurstProps {
  durationMs?: number;
  triggerKey?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  type: 'vectorHeart' | 'emoji' | 'sparkle';
  emoji?: string;
  wobble: number;
  wobbleSpeed: number;
}

const HEART_COLORS = [
  '#FF1493', // Deep Pink
  '#FF4081', // Pink Accent
  '#E11D48', // Rose 600
  '#BE123C', // Rose 700
  '#F43F5E', // Rose 500
  '#FDA4AF', // Rose 300
  '#EC4899', // Pink 500
  '#D946EF', // Fuchsia 500
  '#FBBF24', // Amber Sparkle
  '#38BDF8', // Nazar Battu Blue
];

const EMOJI_LIST = ['💖', '💕', '💓', '💗', '💘', '🫶🏻', '✨', '🧿', '🌸', '🎂'];

export const ScreenFillingHeartBurst: React.FC<ScreenFillingHeartBurstProps> = ({
  durationMs = 5000,
  triggerKey = 0,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = Date.now();
    const endTime = startTime + durationMs;
    let particles: Particle[] = [];

    // Helper: resize canvas to fill screen crisply
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Canvas Confetti synchronized waves across the 5 seconds
    const fireConfettiWave = (x: number, y: number, angle: number, spread: number, count: number) => {
      try {
        confetti({
          particleCount: count,
          spread,
          angle,
          origin: { x, y },
          ticks: 90,
          gravity: 0.85,
          decay: 0.93,
          startVelocity: 38,
          colors: ['#FF1493', '#F43F5E', '#EC4899', '#FDA4AF', '#FBBF24', '#38BDF8'],
          shapes: ['circle' as const, 'square' as const],
        });
      } catch (e) {}
    };

    // Scheduled confetti bursts over the 5 seconds
    const confettiTimers = [
      setTimeout(() => {
        // Initial Dual Cannons + Center
        fireConfettiWave(0.1, 0.9, 60, 80, 50);
        fireConfettiWave(0.9, 0.9, 120, 80, 50);
        fireConfettiWave(0.5, 0.5, 90, 360, 60);
      }, 50),
      setTimeout(() => {
        // Top Shower
        fireConfettiWave(0.5, 0.15, 90, 140, 45);
      }, 1000),
      setTimeout(() => {
        // Criss-cross cannons
        fireConfettiWave(0.15, 0.85, 55, 75, 55);
        fireConfettiWave(0.85, 0.85, 125, 75, 55);
      }, 2000),
      setTimeout(() => {
        // 360 Center Burst
        fireConfettiWave(0.5, 0.45, 90, 360, 70);
      }, 3000),
      setTimeout(() => {
        // Grand 4th Second Finale Burst
        fireConfettiWave(0.2, 0.75, 65, 80, 50);
        fireConfettiWave(0.8, 0.75, 115, 80, 50);
        fireConfettiWave(0.5, 0.3, 90, 160, 60);
      }, 4000),
    ];

    // Spawn high-density particles
    const spawnParticles = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Left Cannon Burst (shoots up-right)
      for (let i = 0; i < 2; i++) {
        const angle = (Math.random() * 30 + 45) * (Math.PI / 180); // 45° to 75°
        const speed = Math.random() * 16 + 10;
        particles.push(createParticle(
          Math.random() * 80,
          h - Math.random() * 40,
          Math.cos(angle) * speed,
          -Math.sin(angle) * speed
        ));
      }

      // 2. Right Cannon Burst (shoots up-left)
      for (let i = 0; i < 2; i++) {
        const angle = (Math.random() * 30 + 105) * (Math.PI / 180); // 105° to 135°
        const speed = Math.random() * 16 + 10;
        particles.push(createParticle(
          w - Math.random() * 80,
          h - Math.random() * 40,
          Math.cos(angle) * speed,
          -Math.sin(angle) * speed
        ));
      }

      // 3. Center Fountain Explosion (shoots in all directions)
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push(createParticle(
          w * 0.5 + (Math.random() - 0.5) * 120,
          h * 0.5 + (Math.random() - 0.5) * 80,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 4
        ));
      }

      // 4. Sky Shower (gently cascades across the full width from top)
      for (let i = 0; i < 2; i++) {
        particles.push(createParticle(
          Math.random() * w,
          -20,
          (Math.random() - 0.5) * 3,
          Math.random() * 4 + 2,
          true
        ));
      }
    };

    const createParticle = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      isRain = false
    ): Particle => {
      const rand = Math.random();
      const type: Particle['type'] = rand < 0.55 ? 'vectorHeart' : rand < 0.88 ? 'emoji' : 'sparkle';
      const size = isRain
        ? Math.random() * 16 + 14
        : Math.random() * 20 + 16;

      return {
        x,
        y,
        vx,
        vy,
        size,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        alpha: 1,
        decay: Math.random() * 0.008 + 0.006,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        type,
        emoji: EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.08 + 0.04,
      };
    };

    // Draw Vector Bezier Heart on Canvas
    const drawVectorHeart = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rot);
      pCtx.globalAlpha = Math.max(0, Math.min(1, alpha));
      pCtx.fillStyle = color;

      pCtx.beginPath();
      const topCurveHeight = size * 0.32;
      pCtx.moveTo(0, topCurveHeight);
      pCtx.bezierCurveTo(
        -size * 0.55,
        -topCurveHeight * 1.1,
        -size * 0.95,
        size * 0.35,
        0,
        size
      );
      pCtx.bezierCurveTo(
        size * 0.95,
        size * 0.35,
        size * 0.55,
        -topCurveHeight * 1.1,
        0,
        topCurveHeight
      );
      pCtx.closePath();
      pCtx.fill();
      pCtx.restore();
    };

    // Draw 4-point Sparkle Star
    const drawSparkle = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number,
      rot: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rot);
      pCtx.globalAlpha = Math.max(0, Math.min(1, alpha));
      pCtx.fillStyle = color;

      pCtx.beginPath();
      for (let i = 0; i < 4; i++) {
        pCtx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        pCtx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.25),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.25)
        );
      }
      pCtx.closePath();
      pCtx.fill();
      pCtx.restore();
    };

    // Animation Loop
    const render = () => {
      const now = Date.now();
      const isSpawning = now < endTime;

      // Spawn fresh particles if still within duration
      if (isSpawning) {
        spawnParticles();
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw existing particles
      const gravity = 0.22;
      const airDrag = 0.982;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= airDrag;
        p.vy += gravity;
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 1.2;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > window.innerHeight + 80) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'vectorHeart') {
          drawVectorHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'emoji' && p.emoji) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.font = `${Math.floor(p.size * 1.3)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
          ctx.restore();
        }
      }

      // If finished spawning and all particles have dissipated, stop loop
      if (!isSpawning && particles.length === 0) {
        setIsActive(false);
        if (onComplete) onComplete();
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      confettiTimers.forEach(clearTimeout);
    };
  }, [durationMs, triggerKey, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full select-none"
    />
  );
};
