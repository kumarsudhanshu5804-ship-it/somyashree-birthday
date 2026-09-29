import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Heart, PartyPopper, Award } from 'lucide-react';
import { playPasscodeSuccessSound, playKeySound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ScreenFillingHeartBurst } from './ScreenFillingHeartBurst';

interface FinaleCelebrationSceneProps {
  recipientName: string;
  senderName: string;
  hasUnlockedBadge?: boolean;
  onRestart: () => void;
}

export const FinaleCelebrationScene: React.FC<FinaleCelebrationSceneProps> = ({
  recipientName,
  senderName,
  hasUnlockedBadge = true,
  onRestart,
}) => {
  const [burstKey, setBurstKey] = useState<number>(1);
  const [showBurstBanner, setShowBurstBanner] = useState(true);

  useEffect(() => {
    playPasscodeSuccessSound();
    setShowBurstBanner(true);
    const bannerTimer = setTimeout(() => {
      setShowBurstBanner(false);
    }, 5200);

    return () => clearTimeout(bannerTimer);
  }, [burstKey]);

  const handleTriggerBurst = () => {
    playPasscodeSuccessSound();
    setBurstKey((k) => k + 1);
    setShowBurstBanner(true);
  };

  const handleShootConfetti = () => {
    playPasscodeSuccessSound();
    confetti({
      particleCount: 110,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#EC4899', '#FBBF24', '#60A5FA', '#A78BFA'],
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-6">
      
      {/* 5-SECOND HIGH-DENSITY SCREEN-FILLING HEART PARTICLE BURST */}
      <ScreenFillingHeartBurst
        key={`burst-${burstKey}`}
        durationMs={5000}
        triggerKey={burstKey}
      />

      {/* Floating 5-Second Celebration Indicator Banner */}
      <AnimatePresence>
        {showBurstBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            className="fixed top-3 sm:top-4 z-50 pointer-events-none px-3.5 py-1.5 sm:px-4 sm:py-2 max-w-[92vw] rounded-full bg-white/95 backdrop-blur-md border-2 border-pink-400 shadow-xl shadow-pink-400/30 flex items-center gap-1.5 sm:gap-2 text-center"
          >
            <span className="text-sm sm:text-base animate-bounce">💖</span>
            <span className="text-[11px] sm:text-sm font-black text-rose-700 tracking-wide truncate">
              5-Second Screen-Filling Heart Burst Active! ✨
            </span>
            <span className="text-sm sm:text-base animate-bounce">💖</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-2xl shadow-pink-300/30 p-4 sm:p-8 flex flex-col items-center text-center my-auto"
      >
        {/* Top Floating Charms */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3.5">
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-[11px] sm:text-sm flex items-center gap-1 sm:gap-1.5 border border-pink-300 shadow-sm">
            <span>♾️</span>
            <span>Infinite Friendship</span>
          </span>
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] sm:text-sm flex items-center gap-1 sm:gap-1.5 border border-blue-300 shadow-sm">
            <span>🧿</span>
            <span>Nazar Battu Shield</span>
          </span>
        </div>

        {/* UNLOCKED HIDDEN BEST FRIEND AWARD BADGE (From Trivia) */}
        {hasUnlockedBadge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-50 to-pink-100 border-2 border-amber-400 shadow-md mb-3.5 sm:mb-5 text-center relative overflow-hidden"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
              <span className="text-2xl sm:text-3xl">🏆</span>
              <h3 className="font-serif text-base sm:text-xl font-black text-amber-900">
                Official True Friend Award 🥇
              </h3>
              <span className="text-xl sm:text-2xl">🧿</span>
            </div>
            <p className="text-[11px] sm:text-sm text-amber-950 font-bold">
              Certified: <strong>{recipientName}</strong> is an irreplaceable, wonderful, and cherished friend across the universe to infinity ♾️!
            </p>
          </motion.div>
        )}

        {/* Main Title */}
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-1.5 sm:mb-2">
          Happiest 17th Birthday, Somyashree! 💖🎉
        </h1>

        <p className="text-xs sm:text-base text-pink-700 font-bold mb-3.5 sm:mb-5">
          To an amazing person, a true friend, and my partner in fun and laughter! ✨
        </p>

        {/* Heartfelt Birthday Blessing */}
        <div className="w-full p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2.5 sm:space-y-3 mb-4 sm:mb-6 text-left">
          <p>
            🌸 <strong>To dearest Somyashree:</strong> Thank you for every single smile, every spontaneous laughing fit, and for being such a wonderful friend.
          </p>
          <p>
            🧿 <strong>Nazar na lage:</strong> May all negative vibes and evil eyes stay miles away from you, and may God bless you with limitless health, joy, and grand success!
          </p>
          <p>
            ♾️ <strong>Forever Promise:</strong> No matter where life takes us, true friendship remains strong, sealed, and cherished to infinity and beyond! 🤝💕
          </p>
        </div>

        {/* Signature */}
        <p className="font-script text-2xl sm:text-4xl text-pink-600 font-bold mb-0.5 sm:mb-1">
          Forever your friend & number one supporter,
        </p>
        <p className="text-xs sm:text-base font-semibold text-gray-600 mb-4 sm:mb-6">
          {senderName} 💕 (Nazar Battu 🧿 & Infinity ♾️)
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleTriggerBurst}
            className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-400/30 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer transition-all"
          >
            <Sparkles size={16} />
            <span>Launch 5-Second Heart Storm 💖✨</span>
          </motion.button>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShootConfetti}
              className="w-full sm:w-1/2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-800 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <PartyPopper size={15} />
              <span>Send Hugs & Confetti 🫂</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playKeySound();
                onRestart();
              }}
              className="w-full sm:w-1/2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw size={14} />
              <span>Replay from Start 🔄</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
