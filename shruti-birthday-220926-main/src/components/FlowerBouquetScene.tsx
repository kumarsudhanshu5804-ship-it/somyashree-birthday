import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { playPopSound, playKeySound } from '../utils/audio';
import { launchHeartConfetti } from '../utils/heartConfetti';

interface FlowerBouquetSceneProps {
  recipientName: string;
  onNext: () => void;
}

export const FlowerBouquetScene: React.FC<FlowerBouquetSceneProps> = ({
  recipientName,
  onNext,
}) => {
  const [tapCount, setTapCount] = useState(0);
  const [sparkleEffects, setSparkleEffects] = useState<{ id: number; x: number; y: number }[]>([]);

  // Launch gentle confetti on enter
  useEffect(() => {
    launchHeartConfetti();
  }, []);

  const handleTapBouquet = (e?: React.MouseEvent) => {
    playPopSound();
    setTapCount((prev) => prev + 1);
    launchHeartConfetti();

    const rect = (e?.currentTarget as HTMLElement)?.getBoundingClientRect?.();
    const clickX = e && rect ? e.clientX - rect.left : 150;
    const clickY = e && rect ? e.clientY - rect.top : 150;

    const newSparkle = { id: Date.now() + Math.random(), x: clickX, y: clickY };
    setSparkleEffects((prev) => [...prev.slice(-6), newSparkle]);
  };

  const flowerBlessings = [
    { emoji: '🪷', name: 'Blush Lotus & Blossoms', meaning: 'Pure friendship, sweet grace & eternal glow 🌸' },
    { emoji: '🌹', name: 'Pink & Crimson Roses', meaning: 'Infinite loyalty, warmth & unmatched kindness 💖' },
    { emoji: '🌻', name: 'Golden Sunflowers', meaning: 'Endless laughter, joy & sunny friendship days ☀️' },
    { emoji: '🪻', name: 'Lavender & Hibiscus 🌺', meaning: 'Peace, cheer & sweet unforgettable moments ✨' },
    { emoji: '🧿', name: '4x Nazar Battu Shields', meaning: 'Absolute protection from bad vibes & evil eye ♾️' },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 bg-gradient-to-b from-[#F0F7FF] via-[#FDF2F8] to-[#FFF1F2] select-none overflow-y-auto pb-16 sm:pb-8">
      
      {/* BACKGROUND FLOATING RED & PINK HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              opacity: 0.2,
              scale: 0.7 + Math.random() * 0.5,
            }}
            animate={{
              y: -50,
              opacity: [0.2, 0.75, 0.15],
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 4,
            }}
            className="absolute text-xl sm:text-2xl text-rose-500 filter drop-shadow-sm"
          >
            {i % 4 === 0 ? '❤️' : i % 4 === 1 ? '💖' : i % 4 === 2 ? '🌸' : '💕'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-auto py-3">
        
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
            <span>🌺</span>
            <span>Handcrafted Flower Delivery</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm">
            <span>🧿</span>
            <span>Nazar Battu Protected</span>
          </span>
        </motion.div>

        {/* Big Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-1">
          Somyashree's Special Birthday Bouquet 💐
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-pink-700 font-semibold mb-4">
          Lush pink blossoms with 4 sacred Nazar Battu shields for my friend! 🌸🧿
        </p>

        {/* BOUQUET STAGE CONTAINER (Matches IMG_20260908_195930.jpg with Pink Flowers & Nazar Battu) */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-200 shadow-2xl shadow-pink-300/30 p-5 sm:p-8 flex flex-col items-center select-none"
        >
          
          {/* Confetti / Sparkles floating surrounding the bouquet (matches photo sparkles) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {/* Top & side decorative confetti chips in cyan, blue, gold, pink */}
            <div className="absolute top-4 left-6 w-3 h-1.5 bg-blue-400/80 rounded rotate-12" />
            <div className="absolute top-10 left-12 w-2 h-2 bg-pink-400/80 rounded-full" />
            <div className="absolute top-6 right-8 w-3.5 h-1.5 bg-amber-400/80 rounded -rotate-45" />
            <div className="absolute top-14 right-6 w-2 h-3 bg-blue-500/80 rounded rotate-25" />
            <div className="absolute top-28 left-4 w-2 h-2 bg-rose-400/80 rounded-full" />
            <div className="absolute top-36 right-5 w-3 h-1 bg-cyan-400/80 rounded rotate-12" />
            <div className="absolute bottom-24 left-8 w-2 h-2 bg-amber-300/80 rounded" />
            <div className="absolute bottom-28 right-8 w-2.5 h-1.5 bg-pink-400/80 rounded -rotate-12" />
          </div>

          {/* TAP INTERACTION ON BOUQUET */}
          <div
            onClick={handleTapBouquet}
            className="relative w-full flex flex-col items-center cursor-pointer group py-2"
          >
            {/* Ambient flower glow */}
            <div className="absolute top-8 w-72 h-72 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />

            {/* BOUQUET ILLUSTRATION AS IN IMG_20260908_195930.jpg */}
            <div className="relative z-20 flex flex-col items-center">
              
              {/* TOP FLOWER DOME (Lush Pink 🌺🌹🪷🌸🌻🪻🌸 with 3 Large Nazar Battu Eyes) */}
              <div className="relative w-72 sm:w-84 h-56 sm:h-64 flex flex-col items-center justify-center -mb-8 z-20">
                
                {/* Background greenery & peacock feather pins on sides */}
                <div className="absolute -top-3 inset-x-4 flex justify-between items-center pointer-events-none">
                  {/* Left emerald leaf & sprig */}
                  <div className="flex items-center -rotate-25">
                    <span className="text-3xl filter drop-shadow">🍃</span>
                    <span className="text-2xl filter drop-shadow -ml-2">🌿</span>
                  </div>
                  {/* Right sprig & peacock feather detail 🪶 as shown in user photo */}
                  <div className="flex items-center rotate-25">
                    <span className="text-2xl filter drop-shadow">🌿</span>
                    <span className="text-3xl filter drop-shadow -ml-1">🪶</span>
                  </div>
                </div>

                {/* Dense Floral Cloud of Pink & Colorful Flowers */}
                <div className="relative w-64 sm:w-76 h-48 sm:h-54 rounded-full bg-gradient-to-b from-pink-200/70 via-rose-100/80 to-pink-300/60 p-3 shadow-lg border-2 border-pink-200/60 flex flex-wrap items-center justify-center gap-1.5 overflow-hidden">
                  
                  {/* Layer of Pink & Colorful Blooms: 🌺 🌹 🪷 🌸 🌻 🪻 */}
                  <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-2 opacity-90">
                    <span className="text-3xl sm:text-4xl transform -rotate-12 animate-pulse">🌸</span>
                    <span className="text-3xl sm:text-4xl transform rotate-6">🌹</span>
                    <span className="text-3xl sm:text-4xl transform -rotate-6">🪷</span>
                    <span className="text-3xl sm:text-4xl transform rotate-12">🌺</span>
                    <span className="text-3xl sm:text-4xl transform -rotate-15">🌻</span>
                    <span className="text-3xl sm:text-4xl transform rotate-6">🪻</span>
                    <span className="text-3xl sm:text-4xl transform -rotate-6">🌸</span>
                    <span className="text-3xl sm:text-4xl transform rotate-12">🌹</span>
                    <span className="text-3xl sm:text-4xl transform -rotate-12">🪷</span>
                    <span className="text-3xl sm:text-4xl transform rotate-6">🌺</span>
                    <span className="text-3xl sm:text-4xl transform -rotate-6">🌸</span>
                    <span className="text-3xl sm:text-4xl transform rotate-15">🪻</span>
                  </div>

                  {/* 3 LARGE GLOSSY NAZAR BATTU (EVIL EYE) AMULETS (Exact match to IMG_20260908_195930.jpg) */}
                  <div className="relative z-30 flex items-center justify-center gap-2 sm:gap-3 mt-4 filter drop-shadow-xl">
                    
                    {/* Left Nazar Battu */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-700 p-1 shadow-lg border-2 border-white flex items-center justify-center transform -rotate-6 cursor-pointer"
                    >
                      <div className="w-full h-full rounded-full bg-cyan-400 p-1 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black shadow-inner" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Center Top Nazar Battu (Slightly elevated) */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-700 p-1 shadow-2xl border-2 border-white flex items-center justify-center -translate-y-2 cursor-pointer"
                    >
                      <div className="w-full h-full rounded-full bg-cyan-400 p-1.5 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-black shadow-inner" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Nazar Battu */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-700 p-1 shadow-lg border-2 border-white flex items-center justify-center transform rotate-6 cursor-pointer"
                    >
                      <div className="w-full h-full rounded-full bg-cyan-400 p-1 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black shadow-inner" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Golden flower pin stems on top */}
                  <div className="absolute -top-1 inset-x-12 flex justify-between pointer-events-none opacity-80">
                    <div className="w-1 h-3 bg-amber-400 rounded-full" />
                    <div className="w-1 h-4 bg-amber-400 rounded-full" />
                    <div className="w-1 h-3 bg-amber-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* CONICAL WRAPPER WITH WOODEN STICKS & STITCHED LINES (Exact match to IMG_20260908_195930.jpg) */}
              <div className="relative w-56 sm:w-64 h-52 sm:h-60 flex flex-col items-center">
                
                {/* Slanted Wooden Support Sticks along both sides */}
                <div className="absolute top-0 -left-1 w-3 h-52 sm:h-60 bg-amber-200/90 border-r border-amber-300 transform -rotate-15 origin-top rounded-full shadow-md" />
                <div className="absolute top-0 -right-1 w-3 h-52 sm:h-60 bg-amber-200/90 border-l border-amber-300 transform rotate-15 origin-top rounded-full shadow-md" />

                {/* Cone Wrapping paper (Light ivory / craft card as in photo) */}
                <div className="relative w-48 sm:w-56 h-48 sm:h-54 bg-gradient-to-b from-[#FAF5EF] via-[#F5EBE1] to-[#EADBC8] rounded-b-[40px] border-2 border-[#D7C3AD] shadow-xl overflow-hidden flex flex-col items-center pt-3">
                  
                  {/* Dashed vertical stitch lines down the center */}
                  <div className="w-0 h-32 border-r-2 border-dashed border-[#B89F82] opacity-70" />

                  {/* ROYAL BLUE SATIN BOW RIBBON & 4th HANGING NAZAR BATTU (Exact match to IMG_20260908_195930.jpg) */}
                  <div className="absolute top-16 z-30 flex flex-col items-center">
                    
                    {/* Blue Ribbon Bow */}
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-5 rounded-full bg-blue-600 border border-blue-400 transform -rotate-25 shadow-md" />
                      <div className="w-4 h-4 rounded-full bg-blue-700 border border-blue-300 -mx-1 z-10 shadow-sm" />
                      <div className="w-8 h-5 rounded-full bg-blue-600 border border-blue-400 transform rotate-25 shadow-md" />
                    </div>

                    {/* Dangling Blue Ribbon Tails */}
                    <div className="flex items-center justify-center gap-3 -mt-1">
                      <div className="w-2.5 h-12 bg-blue-600 rounded-b-md transform -rotate-12 shadow-sm" />
                      <div className="w-2.5 h-14 bg-blue-600 rounded-b-md transform rotate-12 shadow-sm" />
                    </div>

                    {/* 4th Large Glossy Nazar Battu Pendant hanging on ribbon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-700 p-1 shadow-2xl border-3 border-white -mt-10 z-40 flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-full h-full rounded-full bg-cyan-400 p-1.5 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-black shadow-inner" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sparkle pop animations on click */}
            <AnimatePresence>
              {sparkleEffects.map((sp) => (
                <motion.div
                  key={sp.id}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ scale: 1.8, opacity: 0, y: -45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute z-50 text-2xl pointer-events-none"
                  style={{ left: sp.x, top: sp.y }}
                >
                  ✨💖✨
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TAP BOUQUET FOR SPARKLES PILL BUTTON (Matching IMG_20260908_195930.jpg) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTapBouquet()}
            className="mt-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-50 via-white to-pink-50 border-2 border-cyan-300 text-blue-800 text-sm sm:text-base font-bold shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles size={18} className="text-cyan-500 animate-spin" />
            <span>✨ Tap bouquet for sparkles ✨</span>
            {tapCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-xs font-black">
                {tapCount}
              </span>
            )}
          </motion.button>

          {/* FLOWER MEANINGS & NAZAR BATTU SHIELD ACCENT */}
          <div className="w-full mt-5 pt-4 border-t-2 border-pink-100 text-left">
            <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-pink-600 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-blue-500" />
              <span>Special Friendship Floral Blessings for {recipientName}:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {flowerBlessings.map((b, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-50/90 to-blue-50/60 border border-pink-200 flex items-center gap-2.5 shadow-sm"
                >
                  <span className="text-2xl flex-shrink-0">{b.emoji}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{b.name}</p>
                    <p className="text-[11px] sm:text-xs text-pink-800 font-medium">{b.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BUTTON TO PLAY HEART CATCHING GAME */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playKeySound();
            onNext();
          }}
          className="w-full max-w-md mt-5 py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <span>Play Heart Catching Game 💖</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};
