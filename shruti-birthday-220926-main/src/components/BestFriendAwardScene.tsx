import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Award,
  Sparkles,
  Download,
  ArrowRight,
  Heart,
  CheckCircle2,
  RefreshCw,
  Share2,
} from 'lucide-react';
import { playPopSound, playKeySound } from '../utils/audio';
import { launchHeartConfetti } from '../utils/heartConfetti';

interface BestFriendAwardSceneProps {
  recipientName: string;
  onNext: () => void;
}

export const BestFriendAwardScene: React.FC<BestFriendAwardSceneProps> = ({
  recipientName,
  onNext,
}) => {
  // Step 1: Surprise question ("I am your best best friend? 😁💖🫶🏻")
  // Step 2: Award presentation & download
  const [step, setStep] = useState<'question' | 'award'>('question');

  // Runaway "No" button position & message
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const noPhrases = [
    'No 🙈',
    'Nice try! 😜',
    'Wrong button! 🏃‍♀️',
    'Nope, try again! 😂',
    'Error 404: No not found! ❌',
    'You know it is YES! 💕',
    'Impossible! 🫶🏻',
  ];

  const currentNoPhrase = noPhrases[noHoverCount % noPhrases.length];

  // Runaway handler when hovering or touching "No"
  const handleNoDodge = () => {
    playPopSound();
    setNoHoverCount((c) => c + 1);
    // Generate safe random jump delta within container bounds
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const randomX = (Math.random() - 0.5) * (isMobile ? 110 : 220);
    const randomY = (Math.random() - 0.5) * (isMobile ? 65 : 130);
    setNoPos({ x: randomX, y: randomY });
  };

  // When "Yes" is clicked
  const handleYesClick = () => {
    playKeySound();
    launchHeartConfetti();
    setTimeout(() => {
      setStep('award');
      launchHeartConfetti();
    }, 400);
  };

  // Canvas-based download generator for 1200x900 crystal-clear certificate
  const handleDownloadAward = () => {
    setIsDownloading(true);
    playKeySound();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (!canvas || !ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Background - Warm luxury cream & pastel pink gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 900);
      bgGrad.addColorStop(0, '#FFF5F7');
      bgGrad.addColorStop(0.5, '#FFFBF8');
      bgGrad.addColorStop(1, '#FFF0F5');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 900);

      // 2. Gold Outer Border with corner flourishes
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, 1128, 828);

      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, 1104, 804);

      // 3. Decorative Corner Accents
      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '24px serif';
        ctx.fillText('✨', x - 12, y + 8);
      };
      drawCorner(64, 64);
      drawCorner(1136, 64);
      drawCorner(64, 836);
      drawCorner(1136, 836);

      // 4. Medallion / Trophy Badge at top
      ctx.fillStyle = '#FFE4E6';
      ctx.beginPath();
      ctx.arc(600, 140, 56, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.font = '54px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏆', 600, 158);

      // 5. Header Subtitle
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = '#BE123C';
      ctx.fillText('★ OFFICIAL FRIENDSHIP CERTIFICATION ★', 600, 230);

      // 6. Award Main Title
      ctx.font = '900 42px serif';
      ctx.fillStyle = '#881337';
      ctx.fillText('TRUE FRIEND AWARD 🥰', 600, 280);

      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#4B5563';
      ctx.fillText('This honor is proudly and unconditionally presented to:', 600, 335);

      // 7. Recipient Name with Gold Underline
      ctx.font = 'italic bold 64px serif';
      ctx.fillStyle = '#E11D48';
      ctx.fillText(`${recipientName} 💖`, 600, 415);

      const nameWidth = ctx.measureText(`${recipientName} 💖`).width;
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(600 - nameWidth / 2 - 20, 435);
      ctx.lineTo(600 + nameWidth / 2 + 20, 435);
      ctx.stroke();

      // 8. Citation / Meaningful Friend Paragraph
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText('For being an extraordinary, supportive, and kind-hearted friend,', 600, 490);
      ctx.fillText('bringing smiles, laughter, and uplifting energy into every single day.', 600, 524);
      ctx.fillText('Our friendship is protected by Nazar shields 🧿 and sealed in infinity ♾️.', 600, 558);

      // 9. Verified Seals & Signature Blocks
      // Left Seal: 100% Pure Friendship
      ctx.fillStyle = '#FFF1F2';
      ctx.beginPath();
      ctx.arc(320, 680, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FDA4AF';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = '#9F1239';
      ctx.fillText('100% AUTHENTIC', 320, 672);
      ctx.fillText('FRIENDSHIP 💕', 320, 692);

      // Right Seal: Evil Eye Protection 🧿
      ctx.fillStyle = '#EFF6FF';
      ctx.beginPath();
      ctx.arc(880, 680, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#93C5FD';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = '36px serif';
      ctx.fillText('🧿', 880, 690);

      // Center Signature
      ctx.font = 'italic bold 28px serif';
      ctx.fillStyle = '#9D174D';
      ctx.fillText('Your Friend Forever & Always 💕', 600, 675);
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(460, 695);
      ctx.lineTo(740, 695);
      ctx.stroke();

      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#6B7280';
      ctx.fillText('OFFICIAL FRIENDSHIP SIGNATURE & SEAL', 600, 720);

      // Footer
      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText('Certificate ID: FRIEND-SWEET-17-SOMYASHREE • Issued on Birthday 2026 • Never Expires ♾️', 600, 810);

      // Trigger automatic file download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${recipientName}_True_Friend_Award.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      launchHeartConfetti();
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error('Download award error:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-3.5 sm:p-6 bg-[#FAF7F2] select-none overflow-y-auto pb-16 sm:pb-6">
      
      {/* FLOATING PARTICLES AMBIANCE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              opacity: 0.15,
            }}
            animate={{
              y: -40,
              opacity: [0.15, 0.6, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 4,
            }}
            className="absolute text-xl sm:text-2xl"
          >
            {i % 4 === 0 ? '🏆' : i % 4 === 1 ? '💖' : i % 4 === 2 ? '🧿' : '⭐'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center my-auto">
        
        {/* STEP 1: SURPRISE QUESTION CARD */}
        {step === 'question' && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="w-full bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-200 shadow-2xl p-5 sm:p-9 text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Top decorative ribbon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-400 to-pink-300 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-pink-300/40 mb-3 sm:mb-4 animate-bounce">
              🎁
            </div>

            <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-pink-600 mb-1">
              Surprise Checkpoint
            </span>

            <h2 className="font-serif text-xl sm:text-3xl font-black text-gray-900 mb-2.5 sm:mb-3">
              One quick & very serious question... 👀
            </h2>

            {/* The question */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200 shadow-inner mb-4 sm:mb-6 w-full">
              <p className="font-serif text-lg sm:text-2xl font-black text-rose-700 leading-snug">
                "We are true friends forever? 😁💖🫶🏻"
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1">
                (Answer honestly, Angry bird! 🙈)
              </p>
            </div>

            {/* INTERACTIVE BUTTONS WITH RUNAWAY "NO" BUTTON */}
            <div className="relative w-full min-h-[120px] sm:min-h-[140px] flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 py-1">
              
              {/* YES BUTTON (Large, Glowing, Inviting) */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleYesClick}
                className="py-3.5 px-6 sm:px-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm sm:text-lg shadow-xl shadow-pink-400/40 flex items-center justify-center gap-2 cursor-pointer z-20 w-full sm:w-auto"
              >
                <span>YES! True Friends! 🥰💖</span>
              </motion.button>

              {/* RUNAWAY "NO" BUTTON (Runs away when mouse hovers or touch touches) */}
              <motion.button
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
                onMouseEnter={handleNoDodge}
                onTouchStart={handleNoDodge}
                onClick={handleNoDodge}
                className="py-2.5 px-5 sm:py-3 sm:px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm shadow border border-gray-300 cursor-pointer whitespace-nowrap z-10 select-none touch-none"
              >
                <span>{currentNoPhrase}</span>
              </motion.button>
            </div>

            <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-2">
              Hint: The "No" button seems to be physically afraid of being clicked! 😂
            </p>
          </motion.div>
        )}

        {/* STEP 2: TRUE FRIEND AWARD REVEAL & DOWNLOAD */}
        {step === 'award' && (
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-5"
          >
            {/* AWARD CARD FRAME (Matching certificate aesthetics) */}
            <div className="w-full bg-white rounded-3xl p-4 sm:p-8 shadow-2xl border-3 sm:border-4 border-amber-300 relative overflow-hidden flex flex-col items-center text-center">
              
              {/* Inner gold frame line */}
              <div className="absolute inset-1.5 sm:inset-2 border-2 border-amber-200/70 rounded-2xl pointer-events-none" />

              {/* Corner sparkles */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-amber-500 text-lg sm:text-xl pointer-events-none">✨</div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-amber-500 text-lg sm:text-xl pointer-events-none">✨</div>
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-amber-500 text-lg sm:text-xl pointer-events-none">✨</div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-amber-500 text-lg sm:text-xl pointer-events-none">✨</div>

              {/* Top Trophy Medallion */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-3 sm:border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl mb-2 sm:mb-3">
                🏆
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles size={12} />
                <span>Certified & Sealed Friendship 🥰</span>
                <Sparkles size={12} />
              </div>

              <h2 className="font-serif text-xl xs:text-2xl sm:text-4xl font-black text-rose-900 tracking-tight mb-1.5 sm:mb-2">
                True Friend Award 💖
              </h2>

              <p className="text-[11px] sm:text-sm text-gray-600 font-medium mb-3 sm:mb-4">
                This prestigious, non-transferable lifetime award is officially presented to:
              </p>

              {/* Recipient Name in gold-highlighted display */}
              <div className="relative inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-100 to-pink-50 border border-pink-200 shadow-sm">
                <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-black text-rose-700">
                  {recipientName} 💖
                </h3>
              </div>

              {/* Cute Citation Description */}
              <div className="max-w-lg p-3 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/80 text-[11px] sm:text-sm text-gray-700 leading-relaxed mb-4 sm:mb-5 shadow-inner">
                "For being such an extraordinary and loyal friend, bringing smiles, laughter, support, and positive vibes into every day! Protected by Nazar shields 🧿 and forever sealed in infinity ♾️."
              </div>

              {/* Badges and Signatures Row */}
              <div className="w-full grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-gray-100 mb-1 sm:mb-2">
                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-pink-50/60 border border-pink-100">
                  <span className="text-lg sm:text-xl mb-0.5">🧿</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-pink-800">100% Evil Eye Shielded</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500">Unbreakable Friendship</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                  <span className="text-lg sm:text-xl mb-0.5">♾️</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-800">Valid For Eternity</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500">No Expiration Date</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: DOWNLOAD AWARD & NEXT SCENE */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              
              {/* Download button as explicitly requested */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleDownloadAward}
                disabled={isDownloading}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-gray-950 font-black text-sm sm:text-base shadow-lg shadow-amber-300/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Download size={18} />
                <span>{isDownloading ? 'Generating Award PNG...' : 'Download Award Certificate 🏆✨'}</span>
              </motion.button>

              {/* Continue to next scene */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playKeySound();
                  onNext();
                }}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue Birthday Journey 🎂</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-sm"
              >
                <CheckCircle2 size={15} />
                <span>Award downloaded successfully to your device! 🎉</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
