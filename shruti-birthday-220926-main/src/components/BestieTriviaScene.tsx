import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Award, CheckCircle2, Heart } from 'lucide-react';
import { playKeySound, playPasscodeSuccessSound, playPopSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BestieTriviaSceneProps {
  recipientName: string;
  onCompleteTrivia: (badgeUnlocked: boolean) => void;
}

interface Question {
  id: number;
  question: string;
  options: { text: string; isCorrect: boolean; reaction: string }[];
}

const TRIVIA_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Who is the certified mastermind behind our spontaneous 2-hour long fun calls? ☕📞",
    options: [
      { text: "Somyashree, with all the exciting stories! 👑", isCorrect: true, reaction: "Haha 100%! You never run out of fun stories! 😂" },
      { text: "Both of us chatting away non-stop! ☕", isCorrect: true, reaction: "Guilty as charged, time flies when we talk! 🤭" },
      { text: "Pure friendship vibes & endless laughs! ✨", isCorrect: true, reaction: "BINGO! Great connection always! ✨" },
    ],
  },
  {
    id: 2,
    question: "What is our official, undisputed emergency remedy for stressful days and mood swings? 🍟🍦",
    options: [
      { text: "Studying math formulas silently 📚", isCorrect: false, reaction: "As if! Who even does that?! 🤣" },
      { text: "Snacks, ice cream, venting & jamming to songs! 🍟🎵", isCorrect: true, reaction: "YESSS! The ultimate cure every single time! 💖" },
      { text: "Going to sleep quietly at 8:00 PM 😴", isCorrect: false, reaction: "Sleep? At 8 PM? In what universe! 🤪" },
    ],
  },
  {
    id: 3,
    question: "According to our sacred friendship bond, when does our True Friendship expire? ♾️🧿",
    options: [
      { text: "Valid only for 1 year ⏳", isCorrect: false, reaction: "Nope! No expiration dates allowed! 🙅‍♀️" },
      { text: "Expires on college graduation 🎓", isCorrect: false, reaction: "Never! True friendship stays strong! 💕" },
      { text: "Lifetime, unbreakable & to infinity and beyond! ♾️🧿💖", isCorrect: true, reaction: "FOREVER & EVER! Nazar na lage, my friend! 🧿🏆" },
    ],
  },
];

export const BestieTriviaScene: React.FC<BestieTriviaSceneProps> = ({
  recipientName,
  onCompleteTrivia,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const opt = currentQ.options[index];

    if (opt.isCorrect) {
      playPasscodeSuccessSound();
      setCorrectCount((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FBBF24', '#34D399'],
      });
    } else {
      playKeySound();
    }
  };

  const handleNextQuestion = () => {
    playPopSound();
    if (currentIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      playPasscodeSuccessSound();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#EC4899', '#FBBF24', '#60A5FA', '#A78BFA'],
      });
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-plaid-pink select-none overflow-y-auto pb-16 sm:pb-6">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-pink-200/90 shadow-2xl shadow-pink-300/25 p-5 sm:p-8 flex flex-col items-center text-center my-auto"
      >
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3">
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-[11px] sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider flex items-center gap-1.5 shadow-sm">
            <span>✨</span>
            <span>Friendship Trivia Challenge</span>
          </span>
          <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] sm:text-sm font-bold flex items-center gap-1 shadow-sm">
            <span>🧿</span>
            <span>Nazar Battu</span>
          </span>
        </div>

        {!isCompleted ? (
          <>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1.5">
              Question {currentIdx + 1} of {TRIVIA_QUESTIONS.length} 🌸
            </h2>
            <p className="text-xs sm:text-base text-pink-700 font-semibold mb-4 sm:mb-5">
              Let's see how well you know our friendship bond, {recipientName}!
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {TRIVIA_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIdx
                      ? 'w-8 sm:w-10 bg-pink-500'
                      : i < currentIdx
                      ? 'w-4 sm:w-5 bg-pink-300'
                      : 'w-2 sm:w-2.5 bg-pink-100'
                  }`}
                />
              ))}
            </div>

            {/* Question Card */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border-2 border-pink-200/80 mb-4 sm:mb-5 shadow-sm">
              <p className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="w-full space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'border-pink-200/80 bg-white hover:border-pink-400 hover:bg-pink-50/50';

                if (selectedOption !== null) {
                  if (isSelected) {
                    btnStyle = opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-200'
                      : 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full p-3 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between text-xs xs:text-sm sm:text-base lg:text-lg font-semibold transition-all cursor-pointer shadow-sm ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOption !== null && isSelected && (
                      <span className="text-lg sm:text-xl">{opt.isCorrect ? '✅' : '❌'}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reaction Feedback */}
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-3.5 rounded-2xl bg-pink-100/80 border border-pink-200 text-sm sm:text-base font-bold text-pink-800 mb-5 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles size={16} className="text-amber-500 flex-shrink-0" />
                  <span>{currentQ.options[selectedOption].reaction}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {selectedOption !== null && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextQuestion}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2.5 cursor-pointer transition-all"
              >
                <span>
                  {currentIdx < TRIVIA_QUESTIONS.length - 1
                    ? 'Next Question ✨'
                    : 'Claim Your Friendship Award 🏆'}
                </span>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </>
        ) : (
          /* TRIVIA COMPLETED -> UNLOCKS BEST FRIEND BADGE */
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center w-full py-2"
          >
            {/* Golden Trophy & Infinity Charm */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 border-4 border-amber-400 shadow-xl flex items-center justify-center text-5xl">
                🏆
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-base shadow-md">
                🧿
              </div>
              <div className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-xs font-black shadow-md">
                ♾️
              </div>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1.5">
              Trivia Mastered! 🌟
            </h3>
            <p className="text-sm sm:text-base font-bold text-pink-700 mb-5">
              You scored {correctCount}/{TRIVIA_QUESTIONS.length} — Perfection!
            </p>

            {/* The Hidden True Friend Badge */}
            <div className="w-full p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 border-2 border-amber-300/90 shadow-md mb-6 text-center">
              <p className="text-xs uppercase font-extrabold text-amber-800 tracking-widest mb-1.5">
                Official Friendship Honor
              </p>
              <h4 className="font-serif text-xl sm:text-2xl font-black text-gray-900 mb-2">
                True Friend of the Century Award 🥇
              </h4>
              <p className="text-sm sm:text-base text-pink-900 font-medium leading-relaxed">
                Awarded to <strong>{recipientName}</strong> for genuine friendship ♾️,
                unmatched laughs, and being such a wonderful, kind-hearted friend! 🧿💖
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onCompleteTrivia(true)}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-lg shadow-xl shadow-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Claim Your True Friend Award 🏆💖</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
