import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Sparkles,
  Flame,
  Wind,
  Scissors,
  ArrowRight,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Camera,
  Music,
  Heart,
  ShieldCheck,
  Utensils,
} from 'lucide-react';
import { playPopSound, playKeySound, playCakeSliceSound, playBlowCandlesSound } from '../utils/audio';
import { launchHeartConfetti, resetConfetti } from '../utils/heartConfetti';

interface CakeBakerSceneProps {
  recipientName: string;
  onNext: () => void;
}

// 4 Main Sidebar Tabs matching video
type CakeTab = 'base' | 'frosting' | 'toppings' | 'candles';

// Flavors matching video exactly
interface CakeFlavor {
  id: string;
  name: string;
  subtitle: string;
  spongeColor: string;
  textColor: string;
  iconColor: string;
}

const CAKE_FLAVORS: CakeFlavor[] = [
  { id: 'vanilla', name: 'Vanilla', subtitle: 'Sweet & Classic', spongeColor: '#FEF3C7', textColor: '#92400E', iconColor: '#FDE68A' },
  { id: 'chocolate', name: 'Chocolate', subtitle: 'Rich & Decadent', spongeColor: '#5C2E14', textColor: '#FFFFFF', iconColor: '#78350F' },
  { id: 'strawberry', name: 'Strawberry', subtitle: 'Fruity Delight', spongeColor: '#F472B6', textColor: '#831843', iconColor: '#FB7185' },
  { id: 'red_velvet', name: 'Red Velvet', subtitle: 'Classic Romance', spongeColor: '#991B1B', textColor: '#FFFFFF', iconColor: '#DC2626' },
  { id: 'lemon', name: 'Lemon', subtitle: 'Zesty Fresh', spongeColor: '#FDE047', textColor: '#854D0E', iconColor: '#FACC15' },
  { id: 'matcha', name: 'Matcha', subtitle: 'Earthy Bliss', spongeColor: '#84CC16', textColor: '#14532D', iconColor: '#65A30D' },
  { id: 'rainbow', name: 'Rainbow', subtitle: 'Bright & Festive', spongeColor: 'linear-gradient(135deg, #F43F5E, #FBBF24, #10B981, #3B82F6, #8B5CF6)', textColor: '#1E1B4B', iconColor: '#EC4899' },
];

// Frosting colors
const FROSTING_COLORS = [
  { id: 'white', name: 'Classic White', hex: '#FFFFFF', dripBorder: '#E5E7EB' },
  { id: 'pink', name: 'Sweet Pink', hex: '#F472B6', dripBorder: '#EC4899' },
  { id: 'blue', name: 'Baby Blue', hex: '#93C5FD', dripBorder: '#60A5FA' },
  { id: 'mint', name: 'Mint Green', hex: '#86EFAC', dripBorder: '#4ADE80' },
  { id: 'yellow', name: 'Sunshine Yellow', hex: '#FDE047', dripBorder: '#FACC15' },
  { id: 'lavender', name: 'Pastel Lavender', hex: '#C4B5FD', dripBorder: '#A78BFA' },
  { id: 'chocolate', name: 'Choco Ganache', hex: '#451A03', dripBorder: '#290E02' },
  { id: 'peach', name: 'Coral Peach', hex: '#FDBA74', dripBorder: '#FB923C' },
];

// Topping categories matching video
type ToppingCategory = 'FRUITS' | 'SWEETS' | 'FLORAL' | 'PARTY';

interface ToppingItem {
  id: string;
  name: string;
  emoji: string;
  category: ToppingCategory;
}

const TOPPINGS_CATALOG: ToppingItem[] = [
  // FRUITS
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', category: 'FRUITS' },
  { id: 'cherry', name: 'Cherry', emoji: '🍒', category: 'FRUITS' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', category: 'FRUITS' },
  { id: 'orange', name: 'Orange', emoji: '🍊', category: 'FRUITS' },
  { id: 'grape', name: 'Grapes', emoji: '🍇', category: 'FRUITS' },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', category: 'FRUITS' },

  // SWEETS
  { id: 'macaron', name: 'Macaron', emoji: '🍬', category: 'SWEETS' },
  { id: 'chocolate', name: 'Chocolate', emoji: '🍫', category: 'SWEETS' },
  { id: 'lollipop', name: 'Lollipop', emoji: '🍭', category: 'SWEETS' },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', category: 'SWEETS' },
  { id: 'candy', name: 'Candy', emoji: '🍬', category: 'SWEETS' },

  // FLORAL
  { id: 'rose', name: 'Rose', emoji: '🌹', category: 'FLORAL' },
  { id: 'blossom', name: 'Cherry Blossom', emoji: '🌸', category: 'FLORAL' },
  { id: 'hibiscus', name: 'Hibiscus', emoji: '🌺', category: 'FLORAL' },
  { id: 'sunflower', name: 'Sunflower', emoji: '🌻', category: 'FLORAL' },

  // PARTY
  { id: 'star', name: 'Star', emoji: '⭐', category: 'PARTY' },
  { id: 'heart', name: 'Heart', emoji: '💖', category: 'PARTY' },
  { id: 'sparkles', name: 'Sparkles', emoji: '✨', category: 'PARTY' },
  { id: 'nazar', name: 'Nazar Battu', emoji: '🧿', category: 'PARTY' },
  { id: 'ribbon', name: 'Pink Bow', emoji: '🎀', category: 'PARTY' },
];

interface PlacedTopping {
  id: number;
  emoji: string;
  name: string;
  x: number; // percentage on cake top
  y: number; // percentage
}

export const CakeBakerScene: React.FC<CakeBakerSceneProps> = ({
  recipientName,
  onNext,
}) => {
  // Sidebar active tab
  const [activeTab, setActiveTab] = useState<CakeTab>('base');

  // Layer State: array of flavors from bottom to top (1 to 3 tiers)
  const [layers, setLayers] = useState<CakeFlavor[]>([
    CAKE_FLAVORS[0], // Base: Vanilla
  ]);

  // Selected tier for editing flavor (0 = base, 1 = middle, 2 = top)
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);

  // Frosting State
  const [frostingColor, setFrostingColor] = useState(FROSTING_COLORS[1]); // Sweet Pink
  const [hasCreamDrip, setHasCreamDrip] = useState(true);

  // Topping State
  const [selectedCategory, setSelectedCategory] = useState<ToppingCategory>('FRUITS');
  const [placedToppings, setPlacedToppings] = useState<PlacedTopping[]>([
    { id: 1, emoji: '🍓', name: 'Strawberry', x: 26, y: 38 },
    { id: 2, emoji: '🍒', name: 'Cherry', x: 74, y: 40 },
    { id: 3, emoji: '🧿', name: 'Nazar Battu', x: 50, y: 30 },
    { id: 4, emoji: '🌸', name: 'Blossom', x: 38, y: 55 },
    { id: 5, emoji: '🍫', name: 'Chocolate', x: 62, y: 52 },
  ]);

  // Candle State
  const [candleCount, setCandleCount] = useState(3);
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Cake Cutting Ceremony State
  const [isCuttingActive, setIsCuttingActive] = useState(false);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [hasEatenSlice, setHasEatenSlice] = useState(false);

  // Clean up any active confetti on unmount
  React.useEffect(() => {
    return () => {
      resetConfetti();
    };
  }, []);

  // Layer management
  const handleAddLayer = () => {
    if (layers.length >= 3) return;
    playPopSound();
    const nextFlavor = CAKE_FLAVORS[layers.length % CAKE_FLAVORS.length];
    setLayers((prev) => [...prev, nextFlavor]);
    setSelectedTierIndex(layers.length); // focus on newly added top layer
  };

  const handleRemoveTopLayer = () => {
    if (layers.length <= 1) return;
    playPopSound();
    setLayers((prev) => prev.slice(0, -1));
    setSelectedTierIndex((prev) => Math.max(0, Math.min(prev, layers.length - 2)));
  };

  const handleSelectFlavorForTier = (flavor: CakeFlavor, tierIdx: number) => {
    playPopSound();
    setLayers((prev) => {
      const copy = [...prev];
      if (tierIdx >= 0 && tierIdx < copy.length) {
        copy[tierIdx] = flavor;
      }
      return copy;
    });
  };

  // Add topping to cake top
  const handleAddTopping = (item: ToppingItem) => {
    playPopSound();
    if (placedToppings.length >= 16) return;
    // Spread evenly across top cake tier surface
    const randomX = Math.floor(Math.random() * 66) + 17; // 17% to 83%
    const randomY = Math.floor(Math.random() * 45) + 24; // 24% to 69%
    const newTopping: PlacedTopping = {
      id: Date.now() + Math.random(),
      emoji: item.emoji,
      name: item.name,
      x: randomX,
      y: randomY,
    };
    setPlacedToppings((prev) => [...prev, newTopping]);
  };

  const handleRemoveTopping = (id: number) => {
    playPopSound();
    setPlacedToppings((prev) => prev.filter((t) => t.id !== id));
  };

  // Candle handlers
  const handleAddCandle = () => {
    if (candleCount >= 7) return;
    playPopSound();
    setCandleCount((c) => c + 1);
  };

  const handleRemoveAllCandles = () => {
    playPopSound();
    setCandleCount(0);
    setCandlesLit(false);
    setCandlesBlown(false);
  };

  const handleLightCandles = () => {
    playKeySound();
    setCandlesLit(true);
    setCandlesBlown(false);
  };

  const handleBlowCandles = () => {
    playBlowCandlesSound();
    setCandlesLit(false);
    setCandlesBlown(true);
    launchHeartConfetti();
    setTimeout(() => {
      setIsCuttingActive(true);
    }, 800);
  };

  const handleRelightCandles = () => {
    playKeySound();
    setCandlesLit(true);
    setCandlesBlown(false);
  };

  const handleCutCakeAction = () => {
    playCakeSliceSound();
    setIsCakeCut(true);
    launchHeartConfetti();
  };

  const handleBiteCakeAction = () => {
    playPopSound();
    setHasEatenSlice(true);
    launchHeartConfetti();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-2.5 sm:p-5 lg:p-6 bg-[#FAF7F2] select-none overflow-y-auto pb-16 sm:pb-6">
      
      {/* BACKGROUND FLOATING RED & PINK HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
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
              opacity: [0.2, 0.7, 0.15],
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

      {/* TOP HEADER BAR (Matches video 00:00) */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pt-12 sm:pt-2 pb-2 px-3 border-b border-pink-100/80 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🎂</span>
          <h1 className="font-serif text-lg sm:text-2xl font-black text-rose-800 tracking-tight">
            Let's Bake a Cake! 🎂
          </h1>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
            For {recipientName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <span className="hidden sm:inline">Crafted with love</span>
          <span className="text-pink-500">💕 🧿</span>
        </div>
      </header>

      {/* MAIN BUILDER WORKSPACE: SIDEBAR + CAKE DISPLAY (Matches video layout) */}
      <div className="relative z-10 w-full max-w-5xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* TOP CUSTOMIZATION PANEL (order-1 on mobile, order-1 / 5 cols on large) */}
        <div className="order-1 lg:order-1 lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-200/90 shadow-xl p-3.5 sm:p-5 flex flex-col min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] max-h-[580px] overflow-hidden">
          
          {/* 4 ICON TABS HEADER (Base, Frosting, Toppings, Candles) */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4 gap-1">
            <button
              onClick={() => setActiveTab('base')}
              className={`flex-1 py-2 px-2 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'base'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-400/30'
                  : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/70'
              }`}
            >
              <Layers size={18} />
              <span>Base</span>
            </button>

            <button
              onClick={() => setActiveTab('frosting')}
              className={`flex-1 py-2 px-2 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'frosting'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-400/30'
                  : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/70'
              }`}
            >
              <span className="text-base">🧁</span>
              <span>Frosting</span>
            </button>

            <button
              onClick={() => setActiveTab('toppings')}
              className={`flex-1 py-2 px-2 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'toppings'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-400/30'
                  : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/70'
              }`}
            >
              <span className="text-base">🍓</span>
              <span>Toppings</span>
            </button>

            <button
              onClick={() => setActiveTab('candles')}
              className={`flex-1 py-2 px-2 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'candles'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-400/30'
                  : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/70'
              }`}
            >
              <Flame size={18} />
              <span>Candles</span>
            </button>
          </div>

          {/* TAB 1: BASE (Layers & Flavors) */}
          {activeTab === 'base' && (
            <div className="flex-1 flex flex-col overflow-y-auto pr-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                  Layers ({layers.length}/3)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleAddLayer}
                    disabled={layers.length >= 3}
                    className="px-2.5 py-1 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add Layer</span>
                  </button>
                  <button
                    onClick={handleRemoveTopLayer}
                    disabled={layers.length <= 1}
                    className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 text-xs font-bold cursor-pointer"
                  >
                    Remove Top
                  </button>
                </div>
              </div>

              {/* Tier selector pills */}
              <div className="flex items-center gap-1.5 mb-3 bg-pink-50/70 p-1 rounded-xl border border-pink-100">
                {layers.map((layer, idx) => {
                  const isSelected = selectedTierIndex === idx;
                  const label =
                    idx === 0
                      ? 'Base Tier 🍰'
                      : idx === layers.length - 1
                      ? 'Top Tier (Toppings) 🎂'
                      : 'Middle Tier 🧁';
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate ${
                        isSelected
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-transparent text-gray-600 hover:bg-pink-100/60'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500 font-medium mb-2.5">
                Flavor for {selectedTierIndex === 0 ? 'Base Tier' : selectedTierIndex === layers.length - 1 ? 'Top Tier' : 'Middle Tier'}:{' '}
                <strong className="text-rose-600">{layers[selectedTierIndex]?.name}</strong>
              </p>

              {/* Flavors Grid matching video */}
              <div className="grid grid-cols-2 gap-2">
                {CAKE_FLAVORS.map((fl) => {
                  const isCurrent = layers[selectedTierIndex]?.id === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => handleSelectFlavorForTier(fl, selectedTierIndex)}
                      className={`p-2.5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                        isCurrent
                          ? 'border-rose-500 bg-rose-50/70 shadow-sm'
                          : 'border-pink-100 bg-white hover:border-pink-300'
                      }`}
                    >
                      {isCurrent && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-5 h-5 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                          style={{ background: fl.spongeColor }}
                        />
                        <span className="font-bold text-xs text-gray-900">{fl.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {fl.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FROSTING (Cream Drips & Colors) */}
          {activeTab === 'frosting' && (
            <div className="flex-1 flex flex-col overflow-y-auto pr-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                  Frosting Colors & Drips
                </span>
                <button
                  onClick={() => setHasCreamDrip(!hasCreamDrip)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    hasCreamDrip
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {hasCreamDrip ? 'Remove Cream Drip' : 'Add Cream Drip ✨'}
                </button>
              </div>

              <p className="text-xs text-gray-500 font-medium mb-3">
                Selected Frosting: <strong>{frostingColor.name}</strong>
              </p>

              {/* Frosting Color Swatches Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {FROSTING_COLORS.map((fc) => {
                  const isSelected = frostingColor.id === fc.id;
                  return (
                    <button
                      key={fc.id}
                      onClick={() => {
                        playPopSound();
                        setFrostingColor(fc);
                      }}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    >
                      <div
                        className={`w-11 h-11 rounded-full border-2 shadow-md flex items-center justify-center transition-all group-hover:scale-110 ${
                          isSelected
                            ? 'border-rose-600 ring-2 ring-rose-300'
                            : 'border-gray-200'
                        }`}
                        style={{ background: fc.hex }}
                      >
                        {isSelected && (
                          <Check
                            size={14}
                            className={fc.hex === '#FFFFFF' || fc.hex === '#FDE047' ? 'text-gray-900' : 'text-white'}
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-700 font-semibold text-center leading-tight">
                        {fc.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TOPPINGS (Fruits, Sweets, Floral, Party) */}
          {activeTab === 'toppings' && (
            <div className="flex-1 flex flex-col overflow-y-auto pr-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                  Toppings ({placedToppings.length}/14)
                </span>
                {placedToppings.length > 0 && (
                  <button
                    onClick={() => {
                      playPopSound();
                      setPlacedToppings([]);
                    }}
                    className="text-[11px] text-rose-500 hover:text-rose-700 font-bold underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Pills matching video */}
              <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
                {(['FRUITS', 'SWEETS', 'FLORAL', 'PARTY'] as ToppingCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-pink-600 font-medium mb-2">
                Tap items below to drop them onto {recipientName}'s cake! ✨
              </p>

              {/* Items Grid for active category */}
              <div className="grid grid-cols-4 gap-2">
                {TOPPINGS_CATALOG.filter((t) => t.category === selectedCategory).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddTopping(item)}
                    className="p-2 rounded-2xl bg-white border border-pink-200 hover:border-pink-400 hover:bg-pink-50 flex flex-col items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] text-gray-700 font-bold text-center leading-tight">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CANDLES (Add & Light Candles) */}
          {activeTab === 'candles' && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                    Candles Placed: {candleCount}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleAddCandle}
                      disabled={candleCount >= 7}
                      className="px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={12} />
                      <span>Add Candle</span>
                    </button>
                    {candleCount > 0 && (
                      <button
                        onClick={handleRemoveAllCandles}
                        className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer"
                      >
                        Remove All
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200 mb-4 text-left">
                  <p className="text-xs font-bold text-pink-800 mb-1">
                    Candle Status: {candlesLit ? '🔥 Lit & Glowing!' : candlesBlown ? '💨 Blown with Birthday Wish!' : 'Ready to light'}
                  </p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Light the candles, make a secret wish for Somyashree, and blow them out with your breath or the button below!
                  </p>
                </div>
              </div>

              {/* Candle Action Controls */}
              <div className="flex flex-col gap-2 pt-2 border-t border-pink-100">
                {!candlesLit && !candlesBlown && (
                  <button
                    onClick={handleLightCandles}
                    disabled={candleCount === 0}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Flame size={16} />
                    <span>Light Candles 🔥</span>
                  </button>
                )}

                {candlesLit && (
                  <button
                    onClick={handleBlowCandles}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                  >
                    <Wind size={16} />
                    <span>Blow Candles 💨</span>
                  </button>
                )}

                {candlesBlown && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRelightCandles}
                      className="flex-1 py-2.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Flame size={14} />
                      <span>Relight Candles</span>
                    </button>
                    <button
                      onClick={() => {
                        playKeySound();
                        setIsCuttingActive(true);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow-md"
                    >
                      <Scissors size={14} />
                      <span>Cut the Cake 🔪</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM CAKE VISUAL STAGE (order-2 on mobile so cake appears below options, order-2 on large) */}
        <div className="order-2 lg:order-2 lg:col-span-7 flex flex-col items-center justify-center p-2 sm:p-4 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]">
          
          {/* Porcelain Cake Stand with stacked tiers */}
          <div className="relative w-full max-w-sm flex flex-col items-center justify-center select-none py-6">
            
            {/* CANDLES ROW PLACED ON TOPMOST TIER */}
            <div className="relative z-30 flex items-end justify-center gap-3 -mb-1">
              {[...Array(candleCount)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flickering Flame */}
                  {candlesLit && (
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 0.95, 1.1],
                        rotate: [-2, 3, -1, 2],
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-lg shadow-amber-400/80 -mb-1 z-40"
                    />
                  )}

                  {/* Smoke puff when blown */}
                  {candlesBlown && (
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -20, scale: 1.5 }}
                      transition={{ duration: 1 }}
                      className="text-xs -mb-1 text-gray-400"
                    >
                      💨
                    </motion.div>
                  )}

                  {/* Candle Stick (Striped pink & white) */}
                  <div className="w-2.5 h-11 rounded-t-sm border border-pink-300 shadow-sm bg-gradient-to-b from-white via-pink-200 to-rose-400" />
                </div>
              ))}
            </div>

            {/* STACKED CAKE TIERS (Rendered strictly from top tier down to base tier) */}
            <div className="relative z-20 flex flex-col items-center">
              {[...layers]
                .map((layer, originalIdx) => {
                  const isTopTier = originalIdx === layers.length - 1;
                  const isBaseTier = originalIdx === 0;

                  // Tier sizing: top tier smallest, base tier widest
                  let tierWidthClass = 'w-64 xs:w-72 sm:w-84 max-w-[85vw] h-20 sm:h-24';
                  if (layers.length === 3) {
                    if (isTopTier) tierWidthClass = 'w-48 xs:w-56 sm:w-64 max-w-[70vw] h-18 sm:h-22';
                    else if (originalIdx === 1) tierWidthClass = 'w-56 xs:w-66 sm:w-76 max-w-[78vw] h-20 sm:h-24';
                    else tierWidthClass = 'w-64 xs:w-76 sm:w-88 max-w-[85vw] h-22 sm:h-26';
                  } else if (layers.length === 2) {
                    if (isTopTier) tierWidthClass = 'w-52 xs:w-60 sm:w-72 max-w-[72vw] h-18 sm:h-22';
                    else tierWidthClass = 'w-64 xs:w-74 sm:w-86 max-w-[85vw] h-20 sm:h-24';
                  }

                  return {
                    layer,
                    originalIdx,
                    isTopTier,
                    isBaseTier,
                    tierWidthClass,
                  };
                })
                .reverse()
                .map(({ layer, originalIdx, isTopTier, isBaseTier, tierWidthClass }) => (
                  <div
                    key={originalIdx}
                    className={`relative ${tierWidthClass} rounded-2xl shadow-xl flex flex-col justify-between border-2 border-black/10 -mt-2.5 transition-all duration-300 select-none`}
                    style={{ background: layer.spongeColor }}
                  >
                    {/* Cream Frosting Top Lip */}
                    <div
                      className="w-full h-4 rounded-t-2xl shadow-sm overflow-hidden"
                      style={{ background: frostingColor.hex }}
                    />

                    {/* Drips of Frosting (if cream drip is enabled) */}
                    {hasCreamDrip && (
                      <div className="absolute top-3.5 inset-x-0 flex justify-around pointer-events-none z-10">
                        <div
                          className="w-3 h-5 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div
                          className="w-3.5 h-7 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div
                          className="w-2.5 h-4 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div
                          className="w-3 h-6 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div
                          className="w-3.5 h-7 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div
                          className="w-3 h-5 rounded-b-full shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                      </div>
                    )}

                    {/* Sponge texture & cream slice line */}
                    <div className="w-full h-1.5 bg-white/40 my-auto shadow-inner pointer-events-none" />

                    {/* TOP TIER EXCLUSIVE: RENDER PLACED TOPPINGS SITTING ON TOP OF THE CAKE */}
                    {isTopTier && (
                      <div className="absolute -top-5 inset-x-0 h-16 pointer-events-none z-30">
                        {placedToppings.map((tp) => (
                          <div
                            key={tp.id}
                            onClick={() => handleRemoveTopping(tp.id)}
                            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-130 active:scale-95 transition-transform filter drop-shadow-md text-2xl sm:text-3xl select-none"
                            style={{ left: `${tp.x}%`, top: `${tp.y}%` }}
                            title={`Tap to remove ${tp.name}`}
                          >
                            {tp.emoji}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* BIRTHDAY NAME BANNER/PLAQUE ON TOP TIER ("Somyashree 💖") */}
                    {isTopTier && (
                      <div className="absolute inset-x-0 bottom-1.5 flex items-center justify-center pointer-events-none z-20">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="px-3 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-300 shadow-md flex items-center gap-1"
                        >
                          <span className="text-[10px]">✨</span>
                          <span className="font-serif font-black text-[11px] sm:text-xs tracking-wider text-rose-700">
                            {recipientName} 💖
                          </span>
                          <span className="text-[10px]">✨</span>
                        </motion.div>
                      </div>
                    )}

                    {/* Tier bottom rim */}
                    <div className="w-full h-2 bg-black/10 rounded-b-2xl pointer-events-none" />
                  </div>
                ))}
            </div>

            {/* CERAMIC PORCELAIN CAKE PLATE & STAND */}
            <div className="relative z-10 w-72 xs:w-84 sm:w-96 max-w-[90vw] h-8 bg-gradient-to-b from-white via-gray-100 to-gray-200 rounded-full border-2 border-gray-300 shadow-2xl -mt-3 flex items-center justify-center">
              <div className="w-56 xs:w-64 h-3 rounded-full bg-black/5" />
            </div>
            {/* Stand Pedestal base */}
            <div className="w-24 h-5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl border border-gray-400 shadow-md -mt-1" />
          </div>

          {/* BOTTOM QUICK ACTIONS: Light, Blow, Cut Cake! */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {!candlesLit && !candlesBlown && (
              <button
                onClick={handleLightCandles}
                disabled={candleCount === 0}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Flame size={16} />
                <span>Light Candles 🔥</span>
              </button>
            )}

            {candlesLit && (
              <button
                onClick={handleBlowCandles}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <Wind size={16} />
                <span>Blow Candles 💨</span>
              </button>
            )}

            {candlesBlown && (
              <button
                onClick={handleRelightCandles}
                className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw size={14} />
                <span>Relight Candles</span>
              </button>
            )}

            {/* Cut the Cake Action Button */}
            <button
              onClick={() => {
                playKeySound();
                setIsCuttingActive(true);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Scissors size={15} />
              <span>Cut the Cake 🔪✨</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CAKE CUTTING CEREMONY MODAL */}
      <AnimatePresence>
        {isCuttingActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/65 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-3xl p-4 sm:p-7 text-center shadow-2xl border-3 sm:border-4 border-pink-300 flex flex-col items-center relative overflow-hidden max-h-[92vh] overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Official Cake Cutting Ceremony</span>
                <Sparkles size={13} />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-black text-rose-900 mb-1">
                Happy 17th Birthday, {recipientName}! 🎉🎂
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4">
                {!isCakeCut
                  ? 'Make a beautiful birthday wish and slice the cake! 💖🔪'
                  : 'The first delicious slice is ready for you! 🍰😋'}
              </p>

              {/* STAGE: EITHER CAKE WITH KNIFE OR SERVED SLICE */}
              {!isCakeCut ? (
                <div className="relative w-full py-6 flex flex-col items-center justify-center">
                  
                  {/* Floating Animated Golden Knife 🔪 */}
                  <motion.div
                    animate={{
                      y: [-8, 4, -8],
                      rotate: [-15, -25, -15],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-3 right-1/4 z-40 text-4xl sm:text-5xl filter drop-shadow-lg"
                  >
                    🔪
                  </motion.div>

                  {/* Visual Mini Cake representation with Name Plaque */}
                  <div className="relative flex flex-col items-center select-none">
                    {/* Top Tier */}
                    <div
                      className="w-48 sm:w-56 h-16 rounded-xl shadow-lg flex flex-col justify-between border-2 border-black/10 relative overflow-hidden"
                      style={{ background: layers[layers.length - 1]?.spongeColor }}
                    >
                      <div
                        className="w-full h-3.5 shadow-sm"
                        style={{ background: frostingColor.hex }}
                      />
                      {/* Name Plaque */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="px-3 py-0.5 rounded-full bg-white/95 border border-pink-300 shadow-sm text-xs font-serif font-black text-rose-700">
                          {recipientName} 💖
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-black/10" />
                    </div>

                    {/* Base Tier */}
                    <div
                      className="w-56 xs:w-64 sm:w-72 max-w-[75vw] h-18 rounded-xl shadow-xl flex flex-col justify-between border-2 border-black/10 -mt-2 relative overflow-hidden"
                      style={{ background: layers[0]?.spongeColor }}
                    >
                      <div
                        className="w-full h-3.5 shadow-sm"
                        style={{ background: frostingColor.hex }}
                      />
                      <div className="w-full h-1.5 bg-black/10" />
                    </div>

                    {/* Porcelain Base */}
                    <div className="w-64 xs:w-72 sm:w-80 max-w-[85vw] h-4 bg-gray-200 rounded-full border border-gray-300 shadow-md -mt-1" />

                    {/* Slicing dashed line guide */}
                    <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-rose-500 z-30" />
                  </div>

                  {/* Cut action button */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleCutCakeAction}
                    className="mt-6 py-3.5 px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-400/40 flex items-center gap-2 cursor-pointer z-30"
                  >
                    <Scissors size={18} />
                    <span>Slice the Cake Now! 🔪🎂</span>
                  </motion.button>
                </div>
              ) : (
                /* CAKE IS CUT: SERVED SLICE ON PORCELAIN PLATE */
                <div className="relative w-full py-4 flex flex-col items-center">
                  
                  {/* Porcelain Dessert Plate with Cake Slice */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative w-64 h-48 bg-gradient-to-b from-white via-pink-50/50 to-gray-100 rounded-full border-4 border-amber-300 shadow-2xl flex items-center justify-center mb-4 select-none"
                  >
                    {/* Golden Rim Accent */}
                    <div className="absolute inset-2 rounded-full border border-amber-200 pointer-events-none" />

                    {/* Cake Slice Graphic */}
                    <div className="relative flex flex-col items-center">
                      <div className="text-4xl -mb-1 animate-bounce">🍓</div>
                      
                      {/* Triangle Cake Slice Layer */}
                      <div
                        className="w-24 h-16 rounded-t-lg shadow-md flex flex-col justify-between border border-black/10 relative overflow-hidden"
                        style={{ background: layers[layers.length - 1]?.spongeColor }}
                      >
                        <div
                          className="w-full h-3 shadow-sm"
                          style={{ background: frostingColor.hex }}
                        />
                        <div className="w-full h-1 bg-white/50 my-auto" />
                        <div className="w-full h-1 bg-black/10" />
                      </div>

                      {/* Silver Fork */}
                      <div className="absolute -right-10 bottom-3 text-3xl transform rotate-45 filter drop-shadow">
                        🍴
                      </div>
                    </div>
                  </motion.div>

                  {/* Meaningful birthday note */}
                  <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200 text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                    "May every single bite of your 17th year be as sweet and joyful as you are, Somyashree! Always protected by 🧿 and blessed forever ♾️."
                  </div>

                  {/* BITE ACTION OR ATE SLICE REACTION */}
                  <div className="flex flex-col gap-2.5 w-full">
                    {!hasEatenSlice ? (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleBiteCakeAction}
                        className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900 font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Utensils size={16} />
                        <span>Eat First Slice! 🍰😋</span>
                      </motion.button>
                    ) : (
                      <div className="p-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                        <span>😋 Mmm, super delicious! Happy Birthday Somyashree! 💖✨</span>
                      </div>
                    )}

                    {/* READ LETTER BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setIsCuttingActive(false);
                        playKeySound();
                        onNext();
                      }}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Read Birthday Letter 💌</span>
                      <ArrowRight size={18} />
                    </motion.button>

                    <button
                      onClick={() => setIsCuttingActive(false)}
                      className="w-full py-2 px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
                    >
                      Back to Cake Bakery 🎨
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
