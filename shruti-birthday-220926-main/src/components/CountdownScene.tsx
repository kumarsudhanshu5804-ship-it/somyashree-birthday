import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Key } from 'lucide-react';
import { playPopSound, musicPlayer } from '../utils/audio';

interface CountdownSceneProps {
  recipientName: string;
  onEnterPasscode: () => void;
}

export const CountdownScene: React.FC<CountdownSceneProps> = ({
  recipientName,
  onEnterPasscode,
}) => {
  // Target date: October 29 at 12:00 AM (00:00:00)
  const calculateTimeLeft = () => {
    const now = new Date();
    let currentYear = now.getFullYear();
    let target = new Date(currentYear, 9, 29, 0, 0, 0); // Month 9 is October (0-indexed)

    // If already passed this year, point to next year's Oct 29
    if (now.getTime() > target.getTime()) {
      target = new Date(currentYear + 1, 9, 29, 0, 0, 0);
    }

    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div
      id="countdown-scene"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-gradient-to-b from-[#14081c] via-[#210e2f] to-[#120619] select-none overflow-x-hidden text-white pb-16 sm:pb-6"
    >
      {/* Soft Ambient Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content (Pixel-matched with uploaded screenshot) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md flex flex-col items-center text-center my-auto py-4 sm:py-6 px-1 sm:px-2"
      >
        {/* Hourglass Icon */}
        <motion.div
          animate={{
            rotate: [0, -6, 6, 0],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-4xl sm:text-6xl mb-3 sm:mb-5 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          ⏳
        </motion.div>

        {/* Title */}
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-normal mb-2 leading-tight">
          Not yet...
        </h1>

        {/* Subtitle */}
        <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-pink-200 font-semibold mb-6 sm:mb-8 px-2">
          Come back at 12:00 AM on 29 October 💖
        </p>

        {/* 4 Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-sm sm:max-w-md mb-6 sm:mb-8">
          {timeUnits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="bg-[#241235]/90 border border-pink-500/25 rounded-xl sm:rounded-2xl py-3 sm:py-5 px-1 sm:px-3 flex flex-col items-center justify-center shadow-lg shadow-black/40 backdrop-blur-sm"
            >
              <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-pink-100 tracking-tight leading-none">
                {item.value}
              </span>
              <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-pink-400 tracking-wider sm:tracking-widest mt-1.5 sm:mt-2 uppercase">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Glowing Pink Secret Passcode Button */}
        <motion.button
          id="enter-passcode-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            playPopSound();
            musicPlayer.play();
            onEnterPasscode();
          }}
          className="w-full max-w-sm sm:max-w-md py-3.5 sm:py-5 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#FF2B85] via-[#FF1493] to-[#E6007E] hover:from-[#FF4092] hover:to-[#F50085] text-white font-bold text-sm xs:text-base sm:text-lg lg:text-xl shadow-[0_0_25px_rgba(255,20,147,0.6)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2 mb-3"
        >
          <span>🔑</span>
          <span>Enter Secret Passcode (2910)</span>
          <span>🌸</span>
        </motion.button>

        {/* Subtext below button */}
        <p className="text-xs sm:text-base text-pink-300/80 font-medium tracking-wide">
          Specially crafted for {recipientName} ✨
        </p>
      </motion.div>
    </div>
  );
};
