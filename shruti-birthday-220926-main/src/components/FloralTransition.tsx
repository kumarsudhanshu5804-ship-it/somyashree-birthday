import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloralTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const FloralTransition: React.FC<FloralTransitionProps> = ({ isActive, onComplete }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (onComplete) {
              setTimeout(onComplete, 400);
            }
          }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden bg-[#f7d6e0]"
        >
          {/* Floral Tile Background Pattern */}
          <div 
            className="absolute inset-0 opacity-95 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.25'%3E%3Ccircle cx='60' cy='60' r='22'/%3E%3Ccircle cx='60' cy='32' r='14' fill='%23f472b6' fill-opacity='0.5'/%3E%3Ccircle cx='60' cy='88' r='14' fill='%23f472b6' fill-opacity='0.5'/%3E%3Ccircle cx='32' cy='60' r='14' fill='%23f472b6' fill-opacity='0.5'/%3E%3Ccircle cx='88' cy='60' r='14' fill='%23f472b6' fill-opacity='0.5'/%3E%3Ccircle cx='40' cy='40' r='12' fill='%23fb7185' fill-opacity='0.4'/%3E%3Ccircle cx='80' cy='40' r='12' fill='%23fb7185' fill-opacity='0.4'/%3E%3Ccircle cx='40' cy='80' r='12' fill='%23fb7185' fill-opacity='0.4'/%3E%3Ccircle cx='80' cy='80' r='12' fill='%23fb7185' fill-opacity='0.4'/%3E%3Ccircle cx='60' cy='60' r='8' fill='%23fbbf24' fill-opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '120px 120px'
            }}
          />

          {/* Center Blooming Floral Mandalas */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Center Blooming Flowers */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-8xl md:text-9xl drop-shadow-2xl select-none"
            >
              🌸
            </motion.div>

            {/* Orbiting Blooming Flowers */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.1, 1],
                  x: Math.cos((deg * Math.PI) / 180) * 180,
                  y: Math.sin((deg * Math.PI) / 180) * 180,
                  opacity: 1,
                  rotate: deg + 90
                }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                className="absolute text-5xl md:text-7xl select-none"
              >
                {i % 2 === 0 ? '🌹' : '🌺'}
              </motion.div>
            ))}

            {/* Outer Petal Ring */}
            {[20, 70, 110, 160, 200, 250, 290, 340].map((deg, i) => (
              <motion.div
                key={`outer-${i}`}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  x: Math.cos((deg * Math.PI) / 180) * 320,
                  y: Math.sin((deg * Math.PI) / 180) * 320,
                  opacity: 0.9,
                  rotate: deg
                }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.03, ease: "easeOut" }}
                className="absolute text-4xl md:text-6xl select-none"
              >
                🌸
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
