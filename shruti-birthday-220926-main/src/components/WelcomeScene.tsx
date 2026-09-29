import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { playKeySound } from '../utils/audio';

interface WelcomeSceneProps {
  recipientName: string;
  onNext: () => void;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({
  recipientName,
  onNext,
}) => {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-plaid-pink select-none overflow-x-hidden pb-16 sm:pb-6">
      {/* Floating Sparkles & Little Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
              opacity: 0.3,
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
            className="absolute text-pink-300 text-sm"
          >
            {i % 2 === 0 ? '🌸' : '✨'}
          </motion.div>
        ))}
      </div>

      {/* Main Glass Card (matches video 00:02) */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-pink-200/80 shadow-2xl shadow-pink-300/20 p-5 sm:p-9 flex flex-col items-center text-center my-auto"
      >
        {/* Animated Cute Mochi Bunny Sticker Illustration (Zero Photos) */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative mb-5"
        >
          {/* Bunny Character Icon */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-200 p-2 border-2 border-pink-200 shadow-md flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ears */}
              <ellipse cx="38" cy="24" rx="9" ry="20" fill="#FFF5F7" stroke="#F472B6" strokeWidth="2.5" />
              <ellipse cx="38" cy="25" rx="5" ry="14" fill="#FBCFE8" />
              <ellipse cx="62" cy="24" rx="9" ry="20" fill="#FFF5F7" stroke="#F472B6" strokeWidth="2.5" />
              <ellipse cx="62" cy="25" rx="5" ry="14" fill="#FBCFE8" />

              {/* Head */}
              <ellipse cx="50" cy="58" rx="34" ry="28" fill="#FFF5F7" stroke="#F472B6" strokeWidth="2.5" />

              {/* Party Hat */}
              <polygon points="50,14 40,38 60,38" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
              <circle cx="50" cy="13" r="3.5" fill="#FBBF24" />
              <circle cx="46" cy="30" r="1.5" fill="#FEF08A" />
              <circle cx="54" cy="34" r="1.5" fill="#FEF08A" />

              {/* Cheeks */}
              <ellipse cx="32" cy="64" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
              <ellipse cx="68" cy="64" rx="5" ry="3" fill="#F472B6" opacity="0.6" />

              {/* Eyes */}
              <circle cx="39" cy="54" r="3.5" fill="#374151" />
              <circle cx="40" cy="53" r="1" fill="#FFFFFF" />
              <circle cx="61" cy="54" r="3.5" fill="#374151" />
              <circle cx="62" cy="53" r="1" fill="#FFFFFF" />

              {/* Cute smile */}
              <path d="M47 62 Q50 65 53 62" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Floating tiny heart */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 text-rose-500 text-lg"
          >
            💖
          </motion.div>
        </motion.div>

        {/* Heading */}
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight mb-2">
          Happy Birthday, {recipientName}! 💖✨
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-pink-700/85 font-medium mb-2 leading-relaxed">
          Another year more radiant, funny, and incredible than the last 🌸
        </p>

        <p className="text-[11px] sm:text-xs text-gray-500 font-normal mb-8">
          ✨ A special birthday surprise pack crafted just for you 🎁
        </p>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playKeySound();
            onNext();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Start the Surprise</span>
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    </div>
  );
};
