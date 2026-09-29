import confetti from 'canvas-confetti';

/**
 * Resets and cleans up any canvas-confetti instances to prevent particles
 * or canvas elements from getting stuck on screen during transitions.
 */
export const resetConfetti = () => {
  try {
    if (typeof confetti.reset === 'function') {
      confetti.reset();
    }
    // Also remove any rogue canvas-confetti elements that might have detached or frozen
    if (typeof document !== 'undefined') {
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach((c) => {
        // canvas-confetti sets pointer-events: none and fixed positioning
        if (c.style.pointerEvents === 'none' && c.style.position === 'fixed' && !c.getAttribute('data-keep')) {
          c.remove();
        }
      });
    }
  } catch (e) {
    // Graceful fallback
  }
};

/**
 * Triggers a celebratory explosion of confetti with vibrant pink, rose, and gold colors.
 * Uses 100% reliable standard geometric shapes ('circle', 'square') to guarantee
 * silky 60fps performance without DOMMatrix / Path2D crashes on mobile devices.
 */
export const launchHeartConfetti = () => {
  const celebrationColors = ['#FF1493', '#FF69B4', '#F43F5E', '#EC4899', '#FDA4AF', '#FBBF24', '#F472B6'];

  const baseConfig = {
    spread: 360,
    ticks: 80,
    gravity: 0.9,
    decay: 0.92,
    startVelocity: 28,
    colors: celebrationColors,
    shapes: ['circle' as const, 'square' as const],
    disableForReducedMotion: true,
  };

  try {
    // Center burst
    confetti({
      ...baseConfig,
      particleCount: 50,
      origin: { x: 0.5, y: 0.5 },
    });

    // Left cannon
    setTimeout(() => {
      try {
        confetti({
          ...baseConfig,
          particleCount: 35,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.65 },
        });
      } catch (e) {}
    }, 180);

    // Right cannon
    setTimeout(() => {
      try {
        confetti({
          ...baseConfig,
          particleCount: 35,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.65 },
        });
      } catch (e) {}
    }, 360);
  } catch (e) {
    // Graceful fallback
  }
};

