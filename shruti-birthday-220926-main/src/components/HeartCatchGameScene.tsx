import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, ArrowRight, RotateCcw, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { playPopSound, playKeySound } from '../utils/audio';
import { launchHeartConfetti } from '../utils/heartConfetti';

interface HeartCatchGameSceneProps {
  recipientName: string;
  onNext: () => void;
}

interface FallingItem {
  id: number;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  speed: number;
  symbol: string;
  points: number;
  label: string;
}

interface FloatingScore {
  id: number;
  x: number;
  y: number;
  text: string;
}

const ITEM_TYPES = [
  { symbol: '❤️', points: 10, label: '+10 Love ❤️' },
  { symbol: '💖', points: 20, label: '+20 Sparkle 💖' },
  { symbol: '🧿', points: 30, label: '+30 Nazar Shield 🧿' },
  { symbol: '🌸', points: 15, label: '+15 Blossom 🌸' },
  { symbol: '🎂', points: 25, label: '+25 Cake 🎂' },
  { symbol: '🌟', points: 20, label: '+20 Star 🌟' },
  { symbol: '💕', points: 15, label: '+15 Sweetness 💕' },
];

export const HeartCatchGameScene: React.FC<HeartCatchGameSceneProps> = ({
  recipientName,
  onNext,
}) => {
  const [score, setScore] = useState(0);
  const targetScore = 100;
  const isWon = score >= targetScore;

  // Basket position (0 to 100%)
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Sound effects on score
  const handleCatch = (item: FallingItem) => {
    playPopSound();
    setScore((prev) => {
      const nextScore = Math.min(prev + item.points, targetScore);
      if (nextScore >= targetScore && prev < targetScore) {
        launchHeartConfetti();
      }
      return nextScore;
    });

    // Add floating text
    const newScorePopup: FloatingScore = {
      id: Date.now() + Math.random(),
      x: item.x,
      y: 82,
      text: item.label,
    };
    setFloatingScores((prev) => [...prev.slice(-4), newScorePopup]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setBasketX((x) => Math.max(x - 8, 8));
      } else if (e.key === 'ArrowRight') {
        setBasketX((x) => Math.min(x + 8, 92));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game loop for falling items
  useEffect(() => {
    if (isWon) return;

    // Spawn interval
    const spawnTimer = setInterval(() => {
      setItems((currentItems) => {
        if (currentItems.length >= 6) return currentItems;
        const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
        const newItem: FallingItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * 84 + 8,
          y: -10,
          speed: Math.random() * 0.8 + 1.2,
          symbol: randomType.symbol,
          points: randomType.points,
          label: randomType.label,
        };
        return [...currentItems, newItem];
      });
    }, 700);

    // Physics step
    const physicsTimer = setInterval(() => {
      setItems((currentItems) => {
        const nextItems: FallingItem[] = [];
        for (const item of currentItems) {
          const newY = item.y + item.speed;

          // Check collision with basket (basket is around y: 80% to 92%, width around 18%)
          const basketMinX = basketX - 12;
          const basketMaxX = basketX + 12;

          if (newY >= 78 && newY <= 90 && item.x >= basketMinX && item.x <= basketMaxX) {
            handleCatch(item);
            continue; // Caught!
          }

          // If still on screen, keep falling
          if (newY < 105) {
            nextItems.push({ ...item, y: newY });
          }
        }
        return nextItems;
      });
    }, 30);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(physicsTimer);
    };
  }, [basketX, isWon]);

  // Touch / Mouse drag handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, relativeX)));
  };

  const handleResetGame = () => {
    setScore(0);
    setItems([]);
    setFloatingScores([]);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 bg-gradient-to-b from-[#FFF0F5] via-[#FFF5F8] to-[#FFE4E6] select-none overflow-y-auto pb-16 sm:pb-8">
      
      {/* BACKGROUND FLOATING HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              opacity: 0.25,
              scale: 0.7 + Math.random() * 0.5,
            }}
            animate={{
              y: -50,
              opacity: [0.25, 0.75, 0.15],
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 4,
            }}
            className="absolute text-xl sm:text-2xl text-rose-500 filter drop-shadow-sm"
          >
            {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '💖' : '💕'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center my-auto py-3">
        
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
            <span>🎮</span>
            <span>Friendship Mini-Game</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm">
            <span>🧿</span>
            <span>Nazar Shielded</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-1">
          Catch Somyashree's Birthday Hearts! 💖
        </h1>
        <p className="text-sm sm:text-base text-pink-700 font-semibold mb-3">
          Drag the basket to catch falling hearts, flowers & 🧿 Nazar shields!
        </p>

        {/* LOVE METER & SCORE BAR */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border-2 border-pink-200 shadow-md p-3.5 mb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800">
            <span className="flex items-center gap-1.5 text-pink-700">
              <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
              <span>Friendship Meter:</span>
            </span>
            <span className="text-pink-600 font-black">
              {score} / {targetScore} Points ({Math.round((score / targetScore) * 100)}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(score / targetScore) * 100}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>
        </div>

        {/* GAME PLAY AREA */}
        <div
          ref={gameAreaRef}
          onPointerDown={(e) => {
            isDraggingRef.current = true;
            handlePointerMove(e);
          }}
          onPointerMove={(e) => {
            if (isDraggingRef.current) handlePointerMove(e);
          }}
          onPointerUp={() => {
            isDraggingRef.current = false;
          }}
          className="relative w-full max-w-md h-80 xs:h-96 sm:h-[420px] bg-gradient-to-b from-white/95 via-pink-50/80 to-pink-100/90 rounded-3xl border-3 border-pink-300 shadow-2xl shadow-pink-300/30 overflow-hidden cursor-crosshair select-none touch-none"
        >
          {/* Subtle guide text */}
          <div className="absolute top-2 inset-x-0 text-center pointer-events-none text-xs text-pink-400 font-semibold">
            Slide finger or mouse left & right to catch ✨
          </div>

          {/* FALLING ITEMS */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow-md select-none animate-bounce">
                {item.symbol}
              </span>
            </div>
          ))}

          {/* FLOATING SCORE POPUPS */}
          <AnimatePresence>
            {floatingScores.map((fs) => (
              <motion.div
                key={fs.id}
                initial={{ opacity: 1, scale: 0.8, y: 0 }}
                animate={{ opacity: 0, scale: 1.2, y: -45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute transform -translate-x-1/2 text-xs sm:text-sm font-black text-rose-600 bg-white/90 border border-pink-300 px-2 py-0.5 rounded-full shadow-md pointer-events-none z-30"
                style={{
                  left: `${fs.x}%`,
                  top: `${fs.y}%`,
                }}
              >
                {fs.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* BASKET CONTROLLED BY USER */}
          <div
            className="absolute bottom-4 transform -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center transition-all duration-75"
            style={{ left: `${basketX}%` }}
          >
            {/* Basket decoration with pink bow and Nazar Battu */}
            <div className="relative flex flex-col items-center">
              {/* Cute top rim */}
              <div className="w-18 sm:w-22 h-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full border-2 border-amber-400 shadow-sm flex items-center justify-center">
                <span className="text-xs">🎀 🧿</span>
              </div>
              {/* Basket body */}
              <div className="w-16 sm:w-20 h-11 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-2xl border-2 border-amber-400 shadow-xl flex items-center justify-center text-amber-900 font-extrabold text-xs">
                🧺 Friends
              </div>
            </div>
          </div>

          {/* TOUCH / MOBILE ARROW CONTROLS */}
          <div className="absolute bottom-2 inset-x-4 flex justify-between pointer-events-auto sm:hidden z-30">
            <button
              onClick={() => setBasketX((x) => Math.max(x - 12, 8))}
              className="w-11 h-11 rounded-full bg-white/90 border-2 border-pink-300 text-pink-700 flex items-center justify-center shadow-lg active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setBasketX((x) => Math.min(x + 12, 92))}
              className="w-11 h-11 rounded-full bg-white/90 border-2 border-pink-300 text-pink-700 flex items-center justify-center shadow-lg active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* GAME WON MODAL OVERLAY */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center z-40"
              >
                <div className="w-18 h-18 rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-4xl mb-2 shadow-md">
                  🏆
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                  100% Love Caught! 🎉
                </h3>
                <p className="text-sm font-bold text-pink-600 mb-2">
                  Friendship Meter Fully Charged 💖
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-xs mb-5">
                  Somyashree, you caught every ounce of positive energy, warm wishes, and protective 🧿 Nazar shields! Happy Birthday! ✨
                </p>

                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      playKeySound();
                      onNext();
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Spin the Birthday Wheel 🎡</span>
                    <ArrowRight size={18} />
                  </motion.button>

                  <button
                    onClick={handleResetGame}
                    className="w-full py-2 px-4 rounded-full bg-white hover:bg-pink-50 border border-pink-300 text-pink-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RotateCcw size={14} />
                    <span>Play Again 🔄</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM SKIP / ADVANCE BUTTON */}
        {!isWon && (
          <div className="flex items-center justify-between w-full max-w-md mt-4 px-2">
            <button
              onClick={handleResetGame}
              className="text-xs font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Restart Game</span>
            </button>

            <button
              onClick={() => {
                playKeySound();
                onNext();
              }}
              className="text-xs sm:text-sm font-bold text-pink-700 hover:text-pink-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Next: Spin Wheel 🎡</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
