import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Plus, Sparkles, Settings, Eye, Heart } from 'lucide-react';
import { PhotoItem } from '../types';
import { PhotoLightbox } from './PhotoLightbox';

interface SpaceGallerySceneProps {
  photos: PhotoItem[];
  recipientName: string;
  onReplay: () => void;
  onOpenSettings: () => void;
  onAddPhotos: (files: FileList) => void;
  onOpenLoveReasons?: () => void;
  onOpenRadhaKrishna?: () => void;
}

export const SpaceGalleryScene: React.FC<SpaceGallerySceneProps> = ({
  photos,
  recipientName,
  onReplay,
  onOpenSettings,
  onAddPhotos,
  onOpenLoveReasons,
  onOpenRadhaKrishna,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number; animDuration: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate starry sky
  useEffect(() => {
    const starList = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      animDuration: Math.random() * 3 + 2,
    }));
    setStars(starList);
  }, []);

  // Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  // Touch parallax for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = (touch.clientX / innerWidth - 0.5) * 15;
      const y = (touch.clientY / innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    }
  };

  // Ensure default positions for any added photos
  const positionedPhotos = photos.map((photo, index) => {
    const defaultPositions = [
      { x: 18, y: 22, z: 40, r: -5 },
      { x: 76, y: 20, z: -20, r: 6 },
      { x: 26, y: 68, z: 20, r: -7 },
      { x: 74, y: 64, z: -10, r: 5 },
      { x: 50, y: 42, z: 80, r: -1 },
      { x: 12, y: 46, z: -50, r: 8 },
      { x: 88, y: 44, z: -40, r: -6 },
      { x: 42, y: 15, z: 10, r: 4 },
      { x: 60, y: 78, z: 30, r: -3 },
    ];
    const pos = defaultPositions[index % defaultPositions.length];
    return {
      ...photo,
      x: photo.x ?? pos.x,
      y: photo.y ?? pos.y,
      z: photo.z ?? pos.z,
      rotation: photo.rotation ?? pos.r,
      scale: photo.scale ?? 1,
    };
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#06070e] text-white flex flex-col justify-between select-none"
    >
      {/* Background Cosmic Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white transition-opacity"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: star.size > 2 ? '0 0 6px rgba(255, 255, 255, 0.8)' : 'none',
              animation: `pulse-slow ${star.animDuration}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Ambient Nebula Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-pink-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-purple-900/15 rounded-full blur-[120px]" />
      </div>

      {/* Floating Header Banner */}
      <header className="relative z-20 pt-16 sm:pt-6 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 bg-clip-text text-transparent tracking-tight">
            Our Constellation of Memories ✨
          </h2>
          <p className="text-[11px] sm:text-sm text-pink-300/80 mt-1 font-medium">
            Tap any star photo to view memories in detail
          </p>
        </motion.div>
      </header>

      {/* 3D FLOATING PHOTO GALAXY (Matching 00:17 - 00:24 in reference video) */}
      <div className="relative flex-1 w-full perspective-1000 overflow-hidden">
        <div
          className="relative w-full h-full preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.4}deg)`,
          }}
        >
          {positionedPhotos.map((photo, index) => (
            <motion.div
              key={photo.id || index}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: photo.scale,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: index * 0.1 },
                scale: { duration: 0.8, delay: index * 0.1 },
                y: {
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                },
              }}
              style={{
                position: 'absolute',
                left: `${photo.x}%`,
                top: `${photo.y}%`,
                transform: `translate(-50%, -50%) translateZ(${photo.z}px) rotate(${photo.rotation}deg)`,
              }}
              className="group cursor-pointer z-10"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Polaroid Frame */}
              <div className="w-28 sm:w-36 md:w-44 bg-[#18181f] p-2 pb-3.5 sm:p-2.5 sm:pb-4 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] border border-white/15 transition-all duration-300 group-hover:scale-110 group-hover:border-pink-400 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                {/* Photo Thumbnail */}
                <div className="w-full aspect-[4/4.5] rounded-lg overflow-hidden bg-black/60 relative">
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Memory'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle view hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye size={18} className="drop-shadow-md" />
                  </div>
                </div>

                {/* Caption / Label at bottom */}
                <div className="mt-2 text-center">
                  <p className="text-[10px] sm:text-xs font-medium text-gray-300 group-hover:text-pink-300 truncate max-w-full px-1">
                    {photo.caption || photo.date || 'Memory ❤️'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Control Bar */}
      <footer className="relative z-30 pb-6 px-4 flex items-center justify-center gap-3 sm:gap-4">
        {/* Replay Experience Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw size={16} className="text-pink-400" />
          <span>Replay Journey ✨</span>
        </motion.button>

        {/* Add More Photos Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Photos 📸</span>
        </motion.button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onAddPhotos(e.target.files);
            }
          }}
        />

        {/* Love Reasons / Sweet Quotes Button */}
        {onOpenLoveReasons && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLoveReasons}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-full text-xs sm:text-sm font-semibold text-rose-200 shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <Heart size={16} className="text-pink-400 fill-pink-400" />
            <span>Love Reasons 💖</span>
          </motion.button>
        )}

        {/* Radha Krishna Divine Art Button */}
        {onOpenRadhaKrishna && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenRadhaKrishna}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-600/30 hover:bg-amber-500/40 border border-amber-400/50 rounded-full text-xs sm:text-sm font-semibold text-yellow-200 shadow-lg shadow-amber-500/10 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="text-sm">🪈</span>
            <span>Radha Krishna ✨</span>
          </motion.button>
        )}

        {/* Customization Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          title="Customize Photos & Messages"
        >
          <Settings size={18} className="text-pink-400" />
        </motion.button>
      </footer>

      {/* Lightbox Modal for Photo Details */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};
