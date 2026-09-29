import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  symbol: string;
}

export const FloatingHearts: React.FC<{ count?: number; dark?: boolean }> = ({ count = 22, dark = false }) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Red hearts and vibrant pink hearts requested: "heart ❤️ run thata hoy"
    const symbols = dark
      ? ['❤️', '💖', '✨', '💕', '⭐', '💗', '🤍']
      : ['❤️', '💖', '💕', '💗', '💓', '🌸', '✨'];
    const colors = dark
      ? ['#ef4444', '#f43f5e', '#ec4899', 'rgba(255, 255, 255, 0.8)', '#fb7185']
      : ['#dc2626', '#ef4444', '#f43f5e', '#ec4899', '#f472b6', '#fb7185'];

    const items: HeartParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.45 + 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));

    setParticles(items);
  }, [count, dark]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none filter drop-shadow-sm"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            animation: `float-heart ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
};
