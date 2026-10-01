import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, Delete, Heart } from 'lucide-react';
import { playKeySound, playPasscodeSuccessSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CountdownPasscodeSceneProps {
  passcode: string;
  recipientName: string;
  onSuccess: () => void;
  onBack?: () => void;
}

export const CountdownPasscodeScene: React.FC<CountdownPasscodeSceneProps> = ({
  passcode,
  recipientName,
  onSuccess,
  onBack,
}) => {
  const [enteredDigits, setEnteredDigits] = useState<string[]>([]);
  const [errorShake, setErrorShake] = useState(false);

  const handleDigitPress = (digit: string) => {
    playKeySound();

    if (digit === 'del') {
      setEnteredDigits((prev) => prev.slice(0, -1));
      return;
    }

    if (enteredDigits.length >= 4) return;

    const next = [...enteredDigits, digit];
    setEnteredDigits(next);

    if (next.length === 4) {
      const code = next.join('');
      if (code === passcode || passcode === '') {
        playPasscodeSuccessSound();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#EC4899', '#FBBF24', '#60A5FA', '#C084FC'],
        });
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        setErrorShake(true);
        setTimeout(() => {
          setErrorShake(false);
          setEnteredDigits([]);
        }, 600);
      }
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-4 bg-gradient-to-b from-[#180d22] via-[#241233] to-[#12081a] select-none text-white overflow-x-hidden pb-16 sm:pb-4">
      {/* Subtle floating glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full max-w-xs flex flex-col items-center text-center my-auto py-2 ${
          errorShake ? 'animate-shake' : ''
        }`}
      >
        {/* Time Stamp (Matching Video 2 00:02) */}
        <h2 className="text-4xl xs:text-5xl sm:text-6xl font-mono font-bold tracking-wider text-pink-100 mb-0.5">
          29:10
        </h2>
        <p className="text-xs xs:text-sm sm:text-base text-pink-300/80 font-medium flex items-center gap-1.5 mb-3 sm:mb-5">
          <span>Birthday Surprise</span>
          <span className="text-rose-400">💖</span>
          <span className="text-cyan-400">🧿</span>
        </p>

        {/* Lock Icon */}
        <div className="w-11 h-11 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-pink-500/30 flex items-center justify-center text-amber-300 mb-2 sm:mb-3 shadow-inner">
          <Lock size={22} className="text-amber-300 drop-shadow-sm" />
        </div>

        {/* Enter Code Prompt */}
        <p className="text-sm xs:text-base sm:text-lg font-bold text-pink-100 mb-1">
          Enter the secret code
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs sm:text-sm text-pink-200 font-semibold mb-4 sm:mb-6">
          <span>💡</span>
          <span>Somyashree's Date (2910)</span>
          <span>♾️</span>
        </div>

        {/* 4 Code Dots (Matching Video 2 00:02) */}
        <div className="flex justify-center gap-3.5 sm:gap-4 mb-5 sm:mb-7">
          {[0, 1, 2, 3].map((idx) => {
            const filled = enteredDigits.length > idx;
            return (
              <motion.div
                key={idx}
                animate={filled ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                className={`w-4 h-4 xs:w-5 xs:h-5 rounded-full border-2 transition-all duration-200 ${
                  filled
                    ? 'bg-rose-500 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.9)]'
                    : 'bg-white/10 border-pink-400/40'
                }`}
              />
            );
          })}
        </div>

        {/* Numeric Keypad Grid (Optimized with responsive button size for mobile touch) */}
        <div className="grid grid-cols-3 gap-2.5 xs:gap-3.5 w-full max-w-[260px] xs:max-w-[280px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigitPress(digit)}
              className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 rounded-full bg-white/[0.08] hover:bg-pink-500/25 active:bg-pink-500/40 border border-pink-500/20 flex items-center justify-center font-mono text-xl xs:text-2xl font-bold text-pink-100 shadow-md transition-all cursor-pointer mx-auto"
            >
              {digit}
            </button>
          ))}
          <div className="w-14 h-14 xs:w-16 xs:h-16" />
          <button
            onClick={() => handleDigitPress('0')}
            className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 rounded-full bg-white/[0.08] hover:bg-pink-500/25 active:bg-pink-500/40 border border-pink-500/20 flex items-center justify-center font-mono text-xl xs:text-2xl font-bold text-pink-100 shadow-md transition-all cursor-pointer mx-auto"
          >
            0
          </button>
          <button
            onClick={() => handleDigitPress('del')}
            className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 rounded-full bg-white/[0.05] hover:bg-pink-500/20 active:bg-pink-500/30 border border-pink-500/15 flex items-center justify-center text-pink-300 transition-all cursor-pointer mx-auto"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Quick auto-fill button */}
        <button
          onClick={() => {
            setEnteredDigits(['2', '2', '0', '9']);
            playPasscodeSuccessSound();
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#F472B6', '#EC4899', '#FBBF24', '#60A5FA'],
            });
            setTimeout(() => {
              onSuccess();
            }, 450);
          }}
          className="mt-4 sm:mt-6 text-xs sm:text-sm text-pink-400/80 hover:text-pink-300 underline font-semibold cursor-pointer"
        >
          Quick Unlock (2910) ✨
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-2.5 sm:mt-3.5 text-xs sm:text-base text-pink-300/80 hover:text-pink-200 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>← Back to Countdown ⏳</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
