import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { playEnvelopeOpenSound, playPasscodeSuccessSound, playPopSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GiftBoxSceneProps {
  recipientName: string;
  onOpen: () => void;
}

export const GiftBoxScene: React.FC<GiftBoxSceneProps> = ({
  recipientName,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleTapGift = () => {
    if (isOpening) return;
    setIsOpening(true);
    playEnvelopeOpenSound();

    // Burst confetti and particles
    setTimeout(() => {
      playPasscodeSuccessSound();
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#FBBF24', '#EC4899', '#60A5FA', '#C084FC'],
      });
    }, 400);

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#180d22] via-[#241233] to-[#12081a] select-none overflow-x-hidden text-white pb-16 sm:pb-4">
      {/* Floating ambient hearts & stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
              opacity: 0.2,
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3,
            }}
            className="absolute text-pink-400 text-xs sm:text-sm"
          >
            {i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '🌸'}
          </motion.div>
        ))}
      </div>

      {/* Main Content Box (Matching Video 2 00:00 - 00:01) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-sm w-full px-4"
      >
        {/* Title Header */}
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-pink-100 flex items-center justify-center gap-2 mb-1">
          <span>A surprise awaits you...</span>
          <span className="text-amber-300">🌟</span>
        </h1>
        <p className="text-xs sm:text-sm text-pink-300/85 font-medium mb-8">
          ✨ Something special, just for {recipientName} ✨
        </p>

        {/* 3D-styled Gift Box (Matching Video 2) */}
        <div
          onClick={handleTapGift}
          className="relative group cursor-pointer my-4 flex flex-col items-center justify-center"
        >
          {/* Glowing Aura behind gift box */}
          <div className="absolute w-48 h-48 bg-pink-500/20 rounded-full blur-2xl group-hover:bg-pink-400/30 transition-all pointer-events-none" />

          <motion.div
            animate={
              isOpening
                ? { scale: [1, 1.15, 0.95] }
                : {
                    y: [0, -8, 0],
                    rotate: [0, -1, 1, 0],
                  }
            }
            transition={
              isOpening
                ? { duration: 0.4 }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative flex flex-col items-center"
          >
            {/* GIFT LID */}
            <motion.div
              animate={
                isOpening
                  ? {
                      y: -90,
                      rotate: -20,
                      opacity: 0,
                    }
                  : {}
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-20 w-44 h-12 rounded-xl bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] border-2 border-amber-300/80 shadow-lg flex items-center justify-center"
            >
              {/* Golden Ribbon Cross on Lid */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-sm" />

              {/* Golden Bow Ribbons on Top */}
              <div className="absolute -top-6 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-4 border-amber-300 bg-amber-400/30 transform -rotate-45 shadow-md" />
                <div className="w-8 h-8 rounded-full border-4 border-amber-300 bg-amber-400/30 transform rotate-45 -ml-3 shadow-md" />
                <div className="absolute w-4 h-4 rounded-full bg-amber-300 shadow-sm" />
              </div>
            </motion.div>

            {/* GIFT BOX BASE */}
            <div className="relative z-10 w-40 h-36 rounded-b-2xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-2 border-t-0 border-blue-500/40 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Vertical Gold Ribbon */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 shadow-inner" />
              {/* Horizontal Gold Ribbon */}
              <div className="absolute w-full h-7 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-400 shadow-inner" />

              {/* Floating Heart emerging when opening */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1.5, y: -40, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-3xl text-pink-400 pointer-events-none"
                  >
                    💖
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Tap Prompt */}
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-sm font-semibold text-pink-300 flex items-center gap-1.5 mt-4"
        >
          <span>Tap the gift to open</span>
          <span className="text-base">🎁</span>
        </motion.p>
      </motion.div>
    </div>
  );
};
