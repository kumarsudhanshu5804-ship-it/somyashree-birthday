import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RotateCcw, Download, Sparkles, Volume2, Heart, Eye } from 'lucide-react';
import { RADHA_KRISHNA_TURTLE_SCRIPT, TurtleInstructionSet } from '../utils/turtleScript';
import { playPasscodeSuccessSound, playKeySound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RadhaKrishnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

interface StepPoint {
  x: number;
  y: number;
  isDown: boolean;
  pensize: number;
  color: string;
  isFillStart?: boolean;
  isFillEnd?: boolean;
}

export const RadhaKrishnaModal: React.FC<RadhaKrishnaModalProps> = ({
  isOpen,
  onClose,
  recipientName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glowEffect, setGlowEffect] = useState(true);
  const [colorTheme, setColorTheme] = useState<'gold' | 'romantic' | 'divine'>('gold');
  const animationRef = useRef<number | null>(null);

  // Precompute all continuous drawing path commands
  const compiledPathsRef = useRef<{
    fills: { points: { x: number; y: number }[]; color: string }[];
    strokes: { points: { x: number; y: number }[]; pensize: number; color: string }[];
    totalSteps: number;
  }>({ fills: [], strokes: [], totalSteps: 0 });

  const compileTurtleScript = useCallback(() => {
    let currentX = 0;
    let currentY = 0;
    let currentHeading = 0; // degrees
    let isDown = false;
    let currentPensize = 1;

    const fills: { points: { x: number; y: number }[]; color: string }[] = [];
    const strokes: { points: { x: number; y: number }[]; pensize: number; color: string }[] = [];

    let currentFillPoints: { x: number; y: number }[] | null = null;
    let currentStrokePoints: { x: number; y: number }[] = [];
    let currentStrokePensize = 1;
    let currentStrokeColor = '#FFD700';

    const flushStroke = () => {
      if (currentStrokePoints.length > 1) {
        strokes.push({
          points: [...currentStrokePoints],
          pensize: currentStrokePensize,
          color: currentStrokeColor,
        });
      }
      currentStrokePoints = currentStrokePoints.slice(-1);
    };

    RADHA_KRISHNA_TURTLE_SCRIPT.forEach((set: TurtleInstructionSet) => {
      // Reset position for each turtle
      currentX = 0;
      currentY = 0;
      currentHeading = 0;
      isDown = false;
      currentPensize = 1;
      currentStrokeColor = set.color;

      currentStrokePoints = [{ x: currentX, y: currentY }];

      set.commands.forEach((cmd) => {
        if (cmd.type === 'up') {
          flushStroke();
          isDown = false;
        } else if (cmd.type === 'down') {
          isDown = true;
          currentStrokePensize = currentPensize;
          currentStrokePoints = [{ x: currentX, y: currentY }];
        } else if (cmd.type === 'pensize') {
          const newSize = cmd.args?.[0] || 1;
          if (newSize !== currentPensize && isDown) {
            flushStroke();
          }
          currentPensize = newSize;
          currentStrokePensize = newSize;
        } else if (cmd.type === 'seth') {
          currentHeading = cmd.args?.[0] || 0;
        } else if (cmd.type === 'fd') {
          const dist = cmd.args?.[0] || 0;
          const rad = (currentHeading * Math.PI) / 180;
          const nextX = currentX + dist * Math.cos(rad);
          const nextY = currentY + dist * Math.sin(rad);

          currentX = nextX;
          currentY = nextY;

          if (isDown) {
            currentStrokePoints.push({ x: currentX, y: currentY });
          }
          if (currentFillPoints) {
            currentFillPoints.push({ x: currentX, y: currentY });
          }
        } else if (cmd.type === 'circle') {
          const radius = cmd.args?.[0] || 0;
          const extent = cmd.args?.[1] !== undefined ? cmd.args[1] : 360;
          const hRad = (currentHeading * Math.PI) / 180;

          if (radius > 0) {
            const cx = currentX - radius * Math.sin(hRad);
            const cy = currentY + radius * Math.cos(hRad);
            const startAngle = hRad - Math.PI / 2;
            const extRad = (extent * Math.PI) / 180;
            const steps = Math.max(4, Math.ceil(Math.abs(extent) / 3));

            for (let i = 1; i <= steps; i++) {
              const theta = startAngle + (extRad * i) / steps;
              const px = cx + radius * Math.cos(theta);
              const py = cy + radius * Math.sin(theta);
              if (isDown) currentStrokePoints.push({ x: px, y: py });
              if (currentFillPoints) currentFillPoints.push({ x: px, y: py });
            }

            currentX = cx + radius * Math.cos(startAngle + extRad);
            currentY = cy + radius * Math.sin(startAngle + extRad);
            currentHeading = (currentHeading + extent) % 360;
          } else {
            const R = Math.abs(radius);
            const cx = currentX + R * Math.sin(hRad);
            const cy = currentY - R * Math.cos(hRad);
            const startAngle = hRad + Math.PI / 2;
            const extRad = (extent * Math.PI) / 180;
            const steps = Math.max(4, Math.ceil(Math.abs(extent) / 3));

            for (let i = 1; i <= steps; i++) {
              const theta = startAngle - (extRad * i) / steps;
              const px = cx + R * Math.cos(theta);
              const py = cy + R * Math.sin(theta);
              if (isDown) currentStrokePoints.push({ x: px, y: py });
              if (currentFillPoints) currentFillPoints.push({ x: px, y: py });
            }

            currentX = cx + R * Math.cos(startAngle - extRad);
            currentY = cy + R * Math.sin(startAngle - extRad);
            currentHeading = (currentHeading - extent) % 360;
          }
        } else if (cmd.type === 'begin_fill') {
          currentFillPoints = [{ x: currentX, y: currentY }];
        } else if (cmd.type === 'end_fill') {
          if (currentFillPoints && currentFillPoints.length > 2) {
            fills.push({
              points: [...currentFillPoints],
              color: currentStrokeColor,
            });
          }
          currentFillPoints = null;
        }
      });
      flushStroke();
    });

    let totalPoints = 0;
    strokes.forEach((s) => (totalPoints += s.points.length));

    compiledPathsRef.current = {
      fills,
      strokes,
      totalSteps: totalPoints,
    };
  }, []);

  const renderCanvas = useCallback(
    (strokeRatio: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Deep dark background with subtle vignette & cosmic aura
      ctx.fillStyle = '#06060c';
      ctx.fillRect(0, 0, width, height);

      // Radial glowing background aura
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2 - 20,
        30,
        width / 2,
        height / 2,
        width * 0.55
      );
      if (colorTheme === 'gold') {
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.12)');
        grad.addColorStop(0.5, 'rgba(234, 179, 8, 0.05)');
        grad.addColorStop(1, 'rgba(6, 6, 12, 0)');
      } else if (colorTheme === 'romantic') {
        grad.addColorStop(0, 'rgba(244, 63, 94, 0.16)');
        grad.addColorStop(0.5, 'rgba(236, 72, 153, 0.06)');
        grad.addColorStop(1, 'rgba(6, 6, 12, 0)');
      } else {
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
        grad.addColorStop(0.5, 'rgba(234, 179, 8, 0.08)');
        grad.addColorStop(1, 'rgba(6, 6, 12, 0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Coordinate transformation from Turtle coordinates (center=0,0, Y up) to Canvas
      ctx.save();
      const scale = Math.min(width, height) / 780;
      ctx.translate(width / 2, height / 2 + 10);
      ctx.scale(scale, -scale); // Invert Y so positive Y is up

      // Pick theme stroke and fill colors
      let mainColor = '#FFD700'; // Gold
      let glowColor = '#FFA500';
      let fillColor = 'rgba(255, 215, 0, 0.85)';

      if (colorTheme === 'romantic') {
        mainColor = '#FDA4AF'; // Soft rose gold
        glowColor = '#F43F5E';
        fillColor = 'rgba(244, 63, 94, 0.85)';
      } else if (colorTheme === 'divine') {
        mainColor = '#FDE047'; // Divine golden yellow
        glowColor = '#38BDF8';
        fillColor = 'rgba(253, 224, 71, 0.9)';
      }

      // Draw Fills if progress reached full or partial
      if (strokeRatio >= 0.7) {
        const fillAlpha = Math.min(1, (strokeRatio - 0.7) / 0.3);
        compiledPathsRef.current.fills.forEach((fill) => {
          if (fill.points.length < 3) return;
          ctx.beginPath();
          ctx.moveTo(fill.points[0].x, fill.points[0].y);
          for (let i = 1; i < fill.points.length; i++) {
            ctx.lineTo(fill.points[i].x, fill.points[i].y);
          }
          ctx.closePath();
          ctx.fillStyle = fillColor.replace('0.85', (0.85 * fillAlpha).toString());
          ctx.fill();
        });
      }

      // Draw Strokes with glowing effect
      if (glowEffect) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
      } else {
        ctx.shadowBlur = 0;
      }

      let pointsToDraw = Math.floor(compiledPathsRef.current.totalSteps * strokeRatio);
      let drawnSoFar = 0;

      for (const stroke of compiledPathsRef.current.strokes) {
        if (drawnSoFar >= pointsToDraw) break;

        const remaining = pointsToDraw - drawnSoFar;
        const ptsCount = Math.min(stroke.points.length, remaining + 1);

        if (ptsCount >= 2) {
          ctx.beginPath();
          ctx.lineWidth = stroke.pensize;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = mainColor;

          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < ptsCount; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          }
          ctx.stroke();
        }

        drawnSoFar += stroke.points.length;
      }

      // Extra top glow pass for magical aura
      if (glowEffect && strokeRatio > 0.1) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#FFFFFF';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        // subtle highlight pass on current drawing head
      }

      ctx.restore();
    },
    [colorTheme, glowEffect]
  );

  // Initialize and auto play drawing on open
  useEffect(() => {
    if (isOpen) {
      compileTurtleScript();
      setProgress(0);
      setIsDrawing(true);

      let startTime: number | null = null;
      const duration = 4800; // 4.8 seconds smooth drawing

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const p = Math.min(1, elapsed / duration);
        setProgress(p);
        renderCanvas(p);

        if (p < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsDrawing(false);
          playPasscodeSuccessSound();
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#F59E0B', '#EC4899', '#38BDF8'],
          });
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [isOpen, compileTurtleScript, renderCanvas]);

  // Replay animation
  const handleReplay = () => {
    playKeySound();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(0);
    setIsDrawing(true);

    let startTime: number | null = null;
    const duration = 4000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      renderCanvas(p);

      if (p < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsDrawing(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  // Instant Complete
  const handleInstantView = () => {
    playKeySound();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(1);
    setIsDrawing(false);
    renderCanvas(1);
  };

  // Download artwork
  const handleDownload = () => {
    playKeySound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Radha-Krishna-Love-Art-${recipientName || 'Birthday'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-gray-950 via-gray-900 to-black rounded-3xl border border-yellow-500/40 shadow-2xl shadow-yellow-500/10 overflow-hidden flex flex-col my-auto"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-yellow-500/20 flex items-center justify-between bg-yellow-950/20">
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl animate-bounce">🪈</span>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  Divine Radha Krishna Love Art ✨
                </h3>
                <p className="text-[11px] sm:text-xs text-yellow-300/70 font-medium">
                  Sacred Eternal Bond & Flute Melody dedicated for {recipientName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-yellow-400/80 hover:text-white hover:bg-yellow-500/20 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Canvas Viewport */}
          <div className="relative p-2 sm:p-4 flex flex-col items-center justify-center bg-black/40">
            <div className="relative w-full aspect-square max-w-[500px] rounded-2xl overflow-hidden border border-yellow-500/30 shadow-inner flex items-center justify-center bg-black">
              <canvas
                ref={canvasRef}
                width={768}
                height={768}
                className="w-full h-full object-contain"
              />

              {/* Live drawing percentage badge */}
              {isDrawing && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm border border-yellow-500/40 rounded-full text-[11px] font-semibold text-yellow-300 flex items-center gap-1.5 shadow-md">
                  <Sparkles size={13} className="animate-spin text-yellow-400" />
                  <span>Drawing... {Math.round(progress * 100)}%</span>
                </div>
              )}
            </div>

            {/* Devotional Love Caption */}
            <div className="mt-3 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-center max-w-lg w-full">
              <p className="font-serif italic text-xs sm:text-sm text-yellow-200">
                "Like Radha's devotion and Krishna's eternal melody, may our love remain pure, magical, and timeless forever." 💖🪈
              </p>
            </div>
          </div>

          {/* Action Bar & Theme Controls */}
          <div className="px-5 py-4 border-t border-yellow-500/20 bg-gray-950/80 flex flex-wrap items-center justify-between gap-3">
            {/* Color Palette Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-400 font-medium mr-1">Theme:</span>
              <button
                onClick={() => {
                  setColorTheme('gold');
                  renderCanvas(progress);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  colorTheme === 'gold'
                    ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Golden 🌟
              </button>
              <button
                onClick={() => {
                  setColorTheme('romantic');
                  renderCanvas(progress);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  colorTheme === 'romantic'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Rose Gold 💖
              </button>
              <button
                onClick={() => {
                  setColorTheme('divine');
                  renderCanvas(progress);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  colorTheme === 'divine'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Divine ✨
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleReplay}
                className="px-3.5 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-full border border-yellow-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Replay Drawing"
              >
                <RotateCcw size={13} />
                <span>Replay</span>
              </button>

              {isDrawing && (
                <button
                  onClick={handleInstantView}
                  className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye size={13} />
                  <span>Show Full</span>
                </button>
              )}

              <button
                onClick={handleDownload}
                className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold rounded-full text-xs flex items-center gap-1.5 shadow-md shadow-yellow-500/20 transition-all cursor-pointer"
              >
                <Download size={13} />
                <span>Save Art 📥</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
