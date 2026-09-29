import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCw, Ticket, Sparkles } from 'lucide-react';
import { playKeySound, playPasscodeSuccessSound, playPopSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SpinWheelSceneProps {
  recipientName: string;
  onNext: () => void;
}

interface WheelSlice {
  id: number;
  title1: string;
  title2: string;
  label: string;
  emoji: string;
  color: string;
  desc: string;
}

const WHEEL_PRIZES: WheelSlice[] = [
  {
    id: 1,
    title1: 'CAFE',
    title2: 'TREAT',
    label: 'Cafe Treat',
    emoji: '☕',
    color: '#EC4899', // Rose pink
    desc: 'Next coffee, boba & pastries are 100% on me anytime you say!',
  },
  {
    id: 2,
    title1: 'MIDNIGHT',
    title2: 'SNACKS',
    label: 'Midnight Snacks',
    emoji: '🍟',
    color: '#F59E0B', // Warm amber gold
    desc: 'Instant late-night food run anytime, no questions asked!',
  },
  {
    id: 3,
    title1: 'UNLIMITED',
    title2: 'HUGS',
    label: 'Unlimited Hugs',
    emoji: '🫂',
    color: '#E11D48', // Crimson rose
    desc: 'Free warm hugs and an endless friend chat pass!',
  },
  {
    id: 4,
    title1: 'SECRET',
    title2: 'WISH',
    label: '1 Secret Wish',
    emoji: '🧞',
    color: '#8B5CF6', // Royal violet
    desc: 'One birthday wish granted by your friend unconditionally!',
  },
  {
    id: 5,
    title1: 'QUEEN OF',
    title2: 'THE DAY',
    label: 'Queen of the Day',
    emoji: '👑',
    color: '#3B82F6', // Sky blue
    desc: 'Exempt from doing any tasks today, VIP princess treatment only!',
  },
  {
    id: 6,
    title1: 'LIFETIME',
    title2: 'PASS',
    label: 'Lifetime Pass',
    emoji: '♾️',
    color: '#10B981', // Emerald mint
    desc: 'Infinite friendship guaranteed with unbreakable Nazar Battu 🧿!',
  },
];

export const SpinWheelScene: React.FC<SpinWheelSceneProps> = ({
  recipientName,
  onNext,
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<WheelSlice | null>(null);

  const SLICE_COUNT = WHEEL_PRIZES.length; // 6
  const SLICE_DEG = 360 / SLICE_COUNT; // 60 deg

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);
    playPopSound();

    // Randomly pick a winning slice index (0 to 5)
    const prizeIndex = Math.floor(Math.random() * SLICE_COUNT);

    // Coordinate Math:
    // Slice i is drawn with its center at (i * 60) degrees from 12 o'clock (top).
    // The pointer needle is fixed at 12 o'clock (0 degrees).
    // When the wheel rotates clockwise by R degrees, a point at angle Theta moves to (Theta + R) mod 360.
    // For Slice k (center at k * 60 deg) to land squarely under the 12 o'clock pointer:
    // (k * 60 + R) mod 360 === 0  =>  R mod 360 === (360 - (k * 60)) mod 360.
    const currentMod = ((rotation % 360) + 360) % 360;
    const targetMod = (360 - (prizeIndex * SLICE_DEG)) % 360;

    let forwardSteps = (targetMod - currentMod + 360) % 360;
    if (forwardSteps === 0) {
      forwardSteps = 360;
    }

    const minFullSpins = 360 * 5; // 5 full 360-degree spins
    const nextRotation = rotation + minFullSpins + forwardSteps;

    setRotation(nextRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(WHEEL_PRIZES[prizeIndex]);
      playPasscodeSuccessSound();
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#E11D48'],
      });
    }, 4000);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-6">
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center my-auto py-3">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 sm:mb-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-[11px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider mb-1.5 shadow-sm">
            <span>🎡</span>
            <span>Friendship Birthday Spin Wheel</span>
            <span>✨</span>
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Spin Your Birthday Perk! 🎯
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 font-semibold mt-0.5">
            Every spin wins an official friendship coupon for {recipientName}!
          </p>
        </motion.div>

        {/* THE WHEEL STAGE */}
        <div className="relative w-72 h-72 xs:w-80 xs:h-80 sm:w-96 sm:h-96 max-w-[88vw] max-h-[88vw] my-2 sm:my-3 flex items-center justify-center">
          
          {/* Outer Decorative Gold/Pink Carnival Rim */}
          <div className="absolute inset-0 rounded-full border-4 sm:border-6 border-pink-400 bg-gradient-to-tr from-pink-300 via-rose-200 to-pink-300 shadow-2xl shadow-pink-400/40 p-1.5 sm:p-2.5">
            {/* 12 Outer Carnival Light Bulbs */}
            {[...Array(12)].map((_, idx) => {
              const bulbAngle = (idx * 30 * Math.PI) / 180;
              const xPercent = 50 + 48.5 * Math.sin(bulbAngle);
              const yPercent = 50 - 48.5 * Math.cos(bulbAngle);
              return (
                <div
                  key={idx}
                  className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-200 border border-amber-400 shadow-[0_0_6px_#f59e0b] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                />
              );
            })}
          </div>

          {/* Top Indicator Arrow / Ticker Needle */}
          <div className="absolute -top-3.5 sm:-top-4 z-30 flex flex-col items-center pointer-events-none drop-shadow-lg">
            {/* Ticker needle triangle pointing DOWN into the winning top slice */}
            <div className="w-0 h-0 border-l-[13px] sm:border-l-[17px] border-l-transparent border-r-[13px] sm:border-r-[17px] border-r-transparent border-t-[24px] sm:border-t-[30px] border-t-rose-600" />
            {/* Pin head */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-100 border-2 border-rose-600 -mt-2.5 shadow-md flex items-center justify-center text-[9px] font-black text-rose-700">
              ▼
            </div>
          </div>

          {/* ROTATING WHEEL (SVG SLICES + CLEAN LABELS) */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.15, 0.9, 0.25, 1] }}
            className="relative w-full h-full rounded-full overflow-hidden shadow-inner"
          >
            {/* SVG Pie Slices: Each slice i is centered at (i * 60) degrees from 12 o'clock */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {WHEEL_PRIZES.map((slice, i) => {
                // Slice i spans from (i * 60 - 30) deg to (i * 60 + 30) deg
                const startRad = ((i * SLICE_DEG - 30) * Math.PI) / 180;
                const endRad = ((i * SLICE_DEG + 30) * Math.PI) / 180;

                // With 12 o'clock at 0 degrees, x = 50 + 50 * sin, y = 50 - 50 * cos
                const x1 = 50 + 50 * Math.sin(startRad);
                const y1 = 50 - 50 * Math.cos(startRad);
                const x2 = 50 + 50 * Math.sin(endRad);
                const y2 = 50 - 50 * Math.cos(endRad);

                return (
                  <path
                    key={slice.id}
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    fill={slice.color}
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                  />
                );
              })}
            </svg>

            {/* Slices Overlay: Emojis and Stacked Titles placed precisely in each slice */}
            {WHEEL_PRIZES.map((slice, i) => {
              const sliceCenterAngle = i * SLICE_DEG; // 0, 60, 120, 180, 240, 300
              return (
                <div
                  key={slice.id}
                  className="absolute inset-0 flex items-start justify-center pt-3.5 sm:pt-4 pointer-events-none"
                  style={{
                    transform: `rotate(${sliceCenterAngle}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center max-w-[70px] sm:max-w-[90px] select-none">
                    {/* Emoji */}
                    <span className="text-xl xs:text-2xl sm:text-3xl filter drop-shadow-md mb-0.5 sm:mb-1">
                      {slice.emoji}
                    </span>
                    {/* Clean 2-line title that never touches borders */}
                    <span className="text-white font-black text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-wider leading-[1.15] drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                      {slice.title1}
                      <br />
                      {slice.title2}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Central Spin Button Pin */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute z-20 w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-500 border-3 sm:border-4 border-white shadow-xl flex flex-col items-center justify-center text-white font-extrabold cursor-pointer hover:scale-105 active:scale-95 transition-all disabled:opacity-85"
            title="Click to spin the wheel!"
          >
            <RotateCw
              size={18}
              className={`text-white drop-shadow ${isSpinning ? 'animate-spin' : ''}`}
            />
            <span className="text-[11px] sm:text-xs tracking-wider font-black drop-shadow mt-0.5">
              {isSpinning ? 'WAIT...' : 'SPIN'}
            </span>
          </button>
        </div>

        {/* WON COUPON CARD MODAL */}
        <AnimatePresence>
          {wonPrize && (
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              className="w-full max-w-sm sm:max-w-md mt-2 p-4 sm:p-5 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl text-center"
            >
              <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-2.5">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-pink-600 flex items-center gap-1.5">
                  <Ticket size={15} />
                  <span>Official Friendship Coupon 🎟️</span>
                </span>
                <span className="text-xs sm:text-sm">🧿 ♾️</span>
              </div>
              
              <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow-sm">
                {wonPrize.emoji}
              </div>
              
              <h4 className="font-serif text-lg sm:text-2xl font-black text-gray-900 mb-0.5 sm:mb-1">
                {wonPrize.label}! 🎉
              </h4>
              
              <p className="text-xs sm:text-base text-pink-700 font-semibold mb-2 sm:mb-3">
                {wonPrize.desc}
              </p>
              
              <div className="p-2.5 rounded-2xl bg-pink-50 border border-pink-200/80 mb-3">
                <p className="text-[11px] sm:text-xs text-pink-800 font-bold">
                  ✨ Needle landed on: {wonPrize.label}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5">
                  Redeemable anytime by showing this to your friend! 🤝
                </p>
              </div>

              {/* Spin Again Option */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="text-xs sm:text-sm text-pink-600 hover:text-pink-700 font-bold underline cursor-pointer"
              >
                Want to spin again? Click here! 🎲
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button: Bake & Cut Cake */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playKeySound();
            onNext();
          }}
          className="w-full max-w-sm sm:max-w-md mt-3.5 sm:mt-4 py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Bake & Cut Somyashree's Cake 🎂</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};
