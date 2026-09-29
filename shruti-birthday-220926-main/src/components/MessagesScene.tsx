import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Shuffle, Heart } from 'lucide-react';
import { BESTIE_MESSAGES } from '../data/defaultData';
import { MessageCard } from '../types';
import { playKeySound, playPopSound } from '../utils/audio';

interface MessagesSceneProps {
  recipientName: string;
  onNext: () => void;
}

export const MessagesScene: React.FC<MessagesSceneProps> = ({
  recipientName,
  onNext,
}) => {
  const [messages, setMessages] = useState<MessageCard[]>(BESTIE_MESSAGES);
  const [likedCardIds, setLikedCardIds] = useState<string[]>([]);

  const handleShuffle = () => {
    playPopSound();
    setMessages((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  };

  const handleToggleLike = (id: string) => {
    playKeySound();
    setLikedCardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start p-3.5 sm:p-6 lg:p-8 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-8">
      {/* Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center my-auto py-3 sm:py-6">
        
        {/* Title (Matches video 00:22) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 sm:mb-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 shadow-sm">
            <span>💌</span>
            <span>Reminders for {recipientName}</span>
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Messages Just for You 💌
          </h2>
          <p className="text-xs sm:text-base text-pink-700 font-semibold mt-1">
            A collection of sweet reminders of how special you are 💕
          </p>
        </motion.div>

        {/* Shuffle Button (Matches video 00:24) */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShuffle}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
          >
            <Shuffle size={14} className="sm:w-4 sm:h-4" />
            <span>Shuffle Messages 🔀</span>
          </motion.button>
        </div>

        {/* 12 Cards Grid (Matches video 00:23) */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 w-full mb-6 sm:mb-8">
          <AnimatePresence>
            {messages.map((card) => {
              const isLiked = likedCardIds.includes(card.id);
              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleToggleLike(card.id)}
                  className="relative p-3 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-pink-200/90 shadow-sm hover:shadow-md hover:border-pink-300 transition-all cursor-pointer flex flex-col justify-between text-center min-h-[110px] sm:min-h-[125px]"
                >
                  {/* Top tag & heart */}
                  <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
                    <span className="text-[9px] sm:text-xs font-bold text-pink-600 px-2 py-0.5 rounded-full bg-pink-50 border border-pink-100 uppercase tracking-wider truncate max-w-[80%]">
                      {card.tag}
                    </span>
                    <Heart
                      size={14}
                      className={`transition-colors shrink-0 ${
                        isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-300'
                      }`}
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col items-center my-auto">
                    <p className="font-serif text-xs sm:text-base font-bold text-gray-900 leading-snug">
                      {card.title}
                    </p>
                  </div>

                  {/* Emoji bottom indicator */}
                  <div className="text-right text-xs sm:text-sm mt-0.5 sm:mt-1">
                    <span>{card.emoji}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Proceed to Finale Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            playKeySound();
            onNext();
          }}
          className="w-full max-w-sm sm:max-w-md py-3.5 sm:py-4 px-5 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Final Birthday Surprise 🎉</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};
