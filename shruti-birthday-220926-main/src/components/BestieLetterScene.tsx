import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { playEnvelopeOpenSound, playKeySound, playPasscodeSuccessSound } from '../utils/audio';
import { launchHeartConfetti, resetConfetti } from '../utils/heartConfetti';

interface BestieLetterSceneProps {
  title: string;
  greeting: string;
  body: string[];
  closing: string;
  senderName: string;
  recipientName: string;
  onNext: () => void;
}

export const BestieLetterScene: React.FC<BestieLetterSceneProps> = ({
  title,
  greeting,
  body,
  closing,
  senderName,
  recipientName,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Clean up any confetti animations when navigating away
  useEffect(() => {
    return () => {
      resetConfetti();
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    playEnvelopeOpenSound();
    setIsOpen(true);
    launchHeartConfetti();
  };

  const handleCompleteLetter = () => {
    setIsCompleted(true);
    playPasscodeSuccessSound();
    launchHeartConfetti();

    // Secondary burst
    setTimeout(() => {
      launchHeartConfetti();
    }, 600);

    // Give time to enjoy the celebratory heart storm before moving forward
    setTimeout(() => {
      onNext();
    }, 1600);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 lg:p-8 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-8">
      
      {/* SHOWER OF FLOATING HEARTS PARTICLES */}
      <AnimatePresence>
        {(isOpen || isCompleted) && (
          <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {[...Array(28)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: isCompleted ? (typeof window !== 'undefined' ? window.innerHeight : 800) : -40,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                  opacity: 0.9,
                  scale: 0.8 + Math.random() * 0.8,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: isCompleted ? -100 : (typeof window !== 'undefined' ? window.innerHeight : 800) + 60,
                  opacity: [0.95, 0.8, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: (isCompleted ? 2.5 : 4) + Math.random() * 3,
                  ease: isCompleted ? 'easeOut' : 'linear',
                  delay: Math.random() * (isCompleted ? 0.8 : 2),
                }}
                className="absolute text-2xl sm:text-3xl text-rose-500 filter drop-shadow-md"
              >
                {i % 5 === 0 ? '❤️' : i % 5 === 1 ? '💖' : i % 5 === 2 ? '💕' : i % 5 === 3 ? '🌸' : '💝'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-auto py-3 sm:py-6">
        
        {/* Title & Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 sm:mb-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 shadow-sm">
            <span>💌</span>
            <span>Handwritten Letter for {recipientName}</span>
            <span>♾️</span>
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            A Letter for you, my Friend... ✉️
          </h2>
          <p className="text-xs sm:text-base text-pink-700 font-semibold mt-1">
            Every line written straight from the heart 💕
          </p>
        </motion.div>

        {/* Closed Envelope vs Opened Letter */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ENVELOPE */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className="group relative w-72 xs:w-80 sm:w-96 max-w-[90vw] h-52 sm:h-64 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 rounded-3xl border-2 border-pink-300/80 shadow-2xl shadow-pink-400/30 flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all overflow-hidden my-3 sm:my-4"
            >
              {/* Envelope flap */}
              <div className="absolute inset-0 border-[18px] border-t-pink-300 border-x-transparent border-b-transparent pointer-events-none" />

              {/* Heart Seal with Nazar Battu & Infinity */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xl border-3 sm:border-4 border-pink-200"
              >
                <Heart size={28} fill="white" className="drop-shadow-md sm:w-8 sm:h-8" />
              </motion.div>

              <span className="relative z-10 mt-3 sm:mt-4 font-serif text-sm sm:text-lg font-bold text-pink-900 tracking-wide flex items-center gap-1.5">
                <span>Tap to open your letter</span>
                <span>💌</span>
              </span>
              <span className="relative z-10 text-[11px] sm:text-sm text-pink-700 font-semibold flex items-center gap-1.5 mt-0.5 sm:mt-1">
                <span>To: {recipientName}</span>
                <span>•</span>
                <span>With All My Love 💖</span>
              </span>
            </motion.div>
          ) : (
            /* OPENED LETTER CARD WITH LARGE, CLEAR FONTS */
            <motion.div
              key="letter-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-200 shadow-2xl shadow-pink-300/30 p-4 sm:p-9 text-left flex flex-col my-2 sm:my-3"
            >
              {/* Top Letterhead */}
              <div className="flex flex-wrap items-center justify-between border-b border-pink-100 pb-2.5 sm:pb-3.5 mb-3 sm:mb-4 gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl">🌸</span>
                  <span className="font-serif text-sm sm:text-lg font-bold text-gray-900">
                    From your Friend Forever 🥰
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-sm font-mono text-pink-600 font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-pink-50 border border-pink-200">
                    29 october • 17th Birthday
                  </span>
                  <span className="text-sm sm:text-base">♾️ 💖</span>
                </div>
              </div>

              {/* Greeting */}
              <h3 className="font-script text-2xl sm:text-4xl text-pink-600 font-bold mb-2.5 sm:mb-4">
                {greeting}
              </h3>

              {/* Body Paragraphs - Large, crisp, comfortable reading */}
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg lg:text-xl text-gray-800 leading-relaxed font-sans max-h-[50vh] sm:max-h-80 overflow-y-auto pr-1.5 custom-scrollbar">
                {body.map((p, idx) => (
                  <p key={idx} className="leading-relaxed font-normal">
                    {p}
                  </p>
                ))}
                <p className="font-bold text-pink-800 pt-1.5 sm:pt-2 text-sm sm:text-lg">
                  May God protect our bond, keep your smile as radiant as the sun, and grant you all your biggest dreams! ♾️✨
                </p>
              </div>

              {/* Sign-off & Completed Button with Heart Particles */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <p className="font-script text-xl sm:text-3xl text-pink-600 font-bold">
                    {closing}
                  </p>
                  <p className="text-xs sm:text-base font-semibold text-gray-600 mt-0.5">
                    — {senderName} 👭
                  </p>
                </div>

                <motion.button
                  id="complete-letter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompleteLetter}
                  disabled={isCompleted}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs sm:text-base rounded-full shadow-lg shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isCompleted ? '💖 Celebrating Our Bond! 💖' : "12 Reasons Why You're Incredible"}</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
