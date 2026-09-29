import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Award, Heart } from 'lucide-react';
import { playKeySound } from '../utils/audio';

interface MilestoneSceneProps {
  recipientName: string;
  milestoneAge: number;
  milestoneDays: number;
  onNext: () => void;
}

export const MilestoneScene: React.FC<MilestoneSceneProps> = ({
  recipientName,
  milestoneAge,
  milestoneDays,
  onNext,
}) => {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-6">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-2xl shadow-pink-300/25 p-5 sm:p-8 flex flex-col items-center text-center my-auto"
      >
        {/* Milestone Pill with Charms */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
          <div className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 border border-pink-300/70 text-[11px] sm:text-sm font-bold text-pink-700 tracking-wide sm:tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
            <span>🌸</span>
            <span>Milestone 17th Birthday</span>
            <span>✨</span>
          </div>
          <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] sm:text-sm font-bold flex items-center gap-1 shadow-sm">
            <span>🧿</span>
            <span>Nazar Battu</span>
          </span>
        </div>

        {/* You turned 17 today */}
        <h2 className="text-xs sm:text-base font-bold text-gray-500 uppercase tracking-wider">
          You turned
        </h2>
        <div className="font-serif text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 my-0.5 sm:my-1 drop-shadow-sm">
          {milestoneAge}
        </div>
        <p className="text-base sm:text-xl font-bold text-pink-800 flex items-center justify-center gap-1.5 mb-4 sm:mb-5">
          <span>today, Somyashree</span>
          <span>🎂</span>
        </p>

        {/* Days count banner */}
        <div className="w-full py-3 sm:py-4 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-pink-200/80 mb-4 sm:mb-5 shadow-sm">
          <p className="text-xs sm:text-sm text-pink-700 font-semibold">
            You've been shining for
          </p>
          <div className="font-mono text-2xl xs:text-3xl sm:text-4xl font-black text-pink-600 my-0.5 sm:my-1">
            {milestoneDays.toLocaleString()} days ✨
          </div>
          <p className="text-[11px] sm:text-sm text-pink-600 font-medium">
            and making this world a happier place every single second!
          </p>
        </div>

        {/* Friend Appreciation */}
        <p className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl text-gray-900 font-bold mb-1 sm:mb-2">
          Radiant, hilarious, and such a wonderful friend 🌸
        </p>
        <p className="text-xs sm:text-base text-pink-700 font-medium leading-relaxed mb-4 sm:mb-6">
          Nazar na lage hamari dosti ko! 🧿 May God protect our laughter, silly memories, and fun conversations forever to infinity ♾️💖
        </p>

        {/* Illustrated Friendship Badges */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 w-full mb-5 sm:mb-6">
          <div className="p-3 rounded-2xl bg-pink-50/80 border border-pink-200 flex items-center gap-2.5 text-left">
            <span className="text-2xl sm:text-3xl">🏆</span>
            <div>
              <p className="text-xs sm:text-base font-bold text-gray-900">Friendship Award</p>
              <p className="text-[11px] sm:text-sm text-pink-700 font-medium">True Friend 🥰 ♾️</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center gap-2.5 text-left">
            <span className="text-2xl sm:text-3xl">🧿</span>
            <div>
              <p className="text-xs sm:text-base font-bold text-gray-900">Evil Eye Shield</p>
              <p className="text-[11px] sm:text-sm text-blue-700 font-medium">Pure Protection</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-2.5 text-left">
            <span className="text-2xl sm:text-3xl">🍨</span>
            <div>
              <p className="text-xs sm:text-base font-bold text-gray-900">ice creem Partner</p>
              <p className="text-[11px] sm:text-sm text-amber-700 font-medium">Unstoppable Duo</p>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-center gap-2.5 text-left">
            <span className="text-2xl sm:text-3xl">🤝</span>
            <div>
              <p className="text-xs sm:text-base font-bold text-gray-900">Pure Friendship</p>
              <p className="text-[11px] sm:text-sm text-rose-700 font-medium">Bond to Infinity ♾️</p>
            </div>
          </div>
        </div>

        {/* Action Button: Go to Friendship Trivia */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playKeySound();
            onNext();
          }}
          className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Take Friendship Trivia Challenge 🧠✨</span>
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};
