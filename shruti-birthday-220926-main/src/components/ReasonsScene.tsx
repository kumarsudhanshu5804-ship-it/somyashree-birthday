import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';
import { BESTIE_REASONS } from '../data/defaultData';
import { playKeySound, playPasscodeSuccessSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { resetConfetti } from '../utils/heartConfetti';

interface ReasonsSceneProps {
  recipientName: string;
  onNext: () => void;
}

export const ReasonsScene: React.FC<ReasonsSceneProps> = ({
  recipientName,
  onNext,
}) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([1]); // First card revealed by default
  const totalReasons = BESTIE_REASONS.length;

  // Clean up any active confetti on unmount
  useEffect(() => {
    return () => {
      resetConfetti();
    };
  }, []);

  const toggleReason = (id: number) => {
    playKeySound();
    setRevealedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length === totalReasons && !exists) {
        triggerAllRevealedCelebration();
      }
      return next;
    });
  };

  const handleRevealNext = () => {
    playKeySound();
    for (let i = 1; i <= totalReasons; i++) {
      if (!revealedIds.includes(i)) {
        const next = [...revealedIds, i];
        setRevealedIds(next);
        if (next.length === totalReasons) {
          triggerAllRevealedCelebration();
        }
        break;
      }
    }
  };

  const handleRevealAll = () => {
    playPasscodeSuccessSound();
    const all = BESTIE_REASONS.map((r) => r.id);
    setRevealedIds(all);
    triggerAllRevealedCelebration();
  };

  const triggerAllRevealedCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 75,
        ticks: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#ec4899', '#fbcfe8', '#fbbf24', '#c084fc'],
        shapes: ['circle', 'square'],
      });
    } catch (e) {}
  };

  const allRevealed = revealedIds.length === totalReasons;

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start p-3.5 sm:p-6 lg:p-8 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-8">
      {/* Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center my-auto py-3 sm:py-6">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 sm:mb-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100/90 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 shadow-sm">
            <span>🌸</span>
            <span>Dedicated to {recipientName}</span>
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            12 Reasons Why You're Incredible ✨
          </h2>
          <p className="text-xs sm:text-base text-pink-700 font-semibold mt-1">
            And why having you as a friend is such a blessing 💕
          </p>
        </motion.div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-pink-200 text-xs sm:text-sm font-bold text-pink-700 shadow-sm flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-pink-500" />
            <span>
              {revealedIds.length} / {totalReasons} Reasons 💖
            </span>
          </div>

          <button
            onClick={handleRevealNext}
            disabled={allRevealed}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-pink-50 text-pink-700 border border-pink-300 text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Reveal Next ✨</span>
          </button>

          <button
            onClick={handleRevealAll}
            className="px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Reveal All 💖</span>
          </button>
        </div>

        {/* 12 Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full mb-6 sm:mb-8">
          {BESTIE_REASONS.map((reason) => {
            const isRevealed = revealedIds.includes(reason.id);
            return (
              <motion.div
                key={reason.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleReason(reason.id)}
                className={`relative min-h-[120px] sm:min-h-[140px] p-3.5 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-center text-center select-none shadow-sm ${
                  isRevealed
                    ? 'bg-white/95 border-pink-300 shadow-pink-200/40'
                    : 'bg-white/60 hover:bg-white/80 border-pink-200/70 border-dashed'
                }`}
              >
                {isRevealed ? (
                  /* Revealed Content */
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl mb-1 sm:mb-1.5">{reason.icon}</span>
                    <h4 className="text-xs sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">
                      {reason.title}
                    </h4>
                    <p className="text-[11px] sm:text-sm text-pink-900 leading-relaxed font-medium">
                      {reason.text}
                    </p>
                  </div>
                ) : (
                  /* Hidden Card Back */
                  <div className="flex flex-col items-center justify-center py-2 sm:py-2.5">
                    <span className="text-xl sm:text-2xl text-pink-400 mb-0.5 sm:mb-1">🌸</span>
                    <p className="font-serif text-xs sm:text-base font-bold text-gray-800">
                      Reason #{reason.id}
                    </p>
                    <p className="text-[11px] sm:text-xs text-pink-600 font-semibold mt-0.5">
                      Tap to flip ✨
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Proceed Button */}
        <motion.div
          animate={allRevealed ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <button
            onClick={() => {
              playKeySound();
              onNext();
            }}
            className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Messages Just For You 💌</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
