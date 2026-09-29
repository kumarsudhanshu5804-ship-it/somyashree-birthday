import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { DEFAULT_CONFIG } from './data/defaultData';
import { CUSTOM_AUDIO_CONFIG } from './audioConfig';
import { AppConfig, SceneType } from './types';
import { musicPlayer } from './utils/audio';

import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { FloralTransition } from './components/FloralTransition';
import { resetConfetti } from './utils/heartConfetti';

import { CountdownScene } from './components/CountdownScene';
import { CountdownPasscodeScene } from './components/CountdownPasscodeScene';
import { GiftBoxScene } from './components/GiftBoxScene';
import { WelcomeScene } from './components/WelcomeScene';
import { MilestoneScene } from './components/MilestoneScene';
import { BestieTriviaScene } from './components/BestieTriviaScene';
import { BestFriendAwardScene } from './components/BestFriendAwardScene';
import { HeartCatchGameScene } from './components/HeartCatchGameScene';
import { SpinWheelScene } from './components/SpinWheelScene';
import { CakeBakerScene } from './components/CakeBakerScene';
import { BestieLetterScene } from './components/BestieLetterScene';
import { ReasonsScene } from './components/ReasonsScene';
import { MessagesScene } from './components/MessagesScene';
import { FinaleCelebrationScene } from './components/FinaleCelebrationScene';

const STORAGE_KEY = 'somyashree_17th_birthday_bestie_v2';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      // Ignore
    }
    return DEFAULT_CONFIG;
  });

  // Photo countdown screen comes FIRST as requested!
  const [currentScene, setCurrentScene] = useState<SceneType>('countdown');
  const [isFloralActive, setIsFloralActive] = useState(false);
  const [hasUnlockedBadge, setHasUnlockedBadge] = useState(true);

  // Sync custom audio if configured via src/audioConfig.ts or user upload
  useEffect(() => {
    if (CUSTOM_AUDIO_CONFIG.songUrl && CUSTOM_AUDIO_CONFIG.songUrl.trim() !== '') {
      musicPlayer.setCustomAudio(CUSTOM_AUDIO_CONFIG.songUrl);
      if (typeof CUSTOM_AUDIO_CONFIG.defaultVolume === 'number') {
        musicPlayer.setVolume(CUSTOM_AUDIO_CONFIG.defaultVolume);
      }
    } else if (config.customAudioUrl) {
      musicPlayer.setCustomAudio(config.customAudioUrl);
    }

    // Direct auto-play on website start
    if (CUSTOM_AUDIO_CONFIG.autoPlayDirectOnLoad) {
      musicPlayer.play();
    }
  }, [config.customAudioUrl]);

  // Ensure seamless playback on first touch/click anywhere on the screen
  useEffect(() => {
    if (!CUSTOM_AUDIO_CONFIG.autoPlayOnFirstClick) return;

    const handleFirstInteraction = () => {
      if (!musicPlayer.getIsPlaying()) {
        musicPlayer.play();
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const activeSongTitle =
    CUSTOM_AUDIO_CONFIG.songUrl && CUSTOM_AUDIO_CONFIG.songUrl.trim() !== ''
      ? CUSTOM_AUDIO_CONFIG.songTitle
      : config.musicTitle || 'Cute Birthday Melody 🎵';

  // Automatically clear and reset any confetti or canvas particles on scene change
  useEffect(() => {
    resetConfetti();
  }, [currentScene]);

  // Handle Enter Passcode button on Countdown screen
  const handleEnterPasscodeFromCountdown = () => {
    if (!musicPlayer.getIsPlaying()) {
      musicPlayer.play();
    }
    setCurrentScene('passcode');
  };

  // Handle Passcode Success (2910) -> Unlocks Gift Box
  const handlePasscodeSuccess = () => {
    setCurrentScene('giftbox');
  };

  // Handle Gift Box Opened (No 🧿 on gift box) -> Triggers floral bloom into Welcome
  const handleGiftBoxOpened = () => {
    setIsFloralActive(true);
  };

  const handleFloralComplete = () => {
    setIsFloralActive(false);
    setCurrentScene('welcome');
  };

  const handleRestart = () => {
    setCurrentScene('countdown');
  };

  const isDarkScene =
    currentScene === 'countdown' ||
    currentScene === 'passcode' ||
    currentScene === 'giftbox';

  return (
    <main className="relative min-h-[100dvh] w-full font-sans antialiased overflow-x-hidden select-none bg-plaid-pink">
      {/* Background Floating Red & Pink Hearts Ambiance (Continuous) */}
      <FloatingHearts count={22} dark={isDarkScene} />

      {/* Persistent Cute Music Player */}
      <MusicPlayer
        customMusicTitle={activeSongTitle}
        onUploadCustomMusic={(file) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (ev.target?.result) {
              const url = ev.target.result as string;
              const updated = {
                ...config,
                customAudioUrl: url,
                musicTitle: file.name.replace(/\.[^/.]+$/, ''),
              };
              setConfig(updated);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
              } catch (e) {}
            }
          };
          reader.readAsDataURL(file);
        }}
        dark={isDarkScene}
      />

      {/* Floral Blossom Burst Transition */}
      <FloralTransition
        isActive={isFloralActive}
        onComplete={handleFloralComplete}
      />

      {/* SCENE ROUTER */}
      <AnimatePresence mode="wait">
        {/* 1. COUNTDOWN SCENE (Matching uploaded photo: Not yet... Come back at 12:00 AM on 29 October 💖) */}
        {currentScene === 'countdown' && (
          <CountdownScene
            key="countdown"
            recipientName={config.recipientName}
            onEnterPasscode={handleEnterPasscodeFromCountdown}
          />
        )}

        {/* 2. PHONE PASSCODE SCENE (Secret Code 2910) */}
        {currentScene === 'passcode' && (
          <CountdownPasscodeScene
            key="passcode"
            passcode={config.passcode}
            recipientName={config.recipientName}
            onSuccess={handlePasscodeSuccess}
            onBack={() => setCurrentScene('countdown')}
          />
        )}

        {/* 3. GIFT BOX SCENE (Surprise Gift Box - without 🧿, tap to open 🎁) */}
        {currentScene === 'giftbox' && (
          <GiftBoxScene
            key="giftbox"
            recipientName={config.recipientName}
            onOpen={handleGiftBoxOpened}
          />
        )}

        {/* 3. WELCOME SCENE (Pink Gingham + Cute Mochi Bunny with Birthday Hat) */}
        {currentScene === 'welcome' && (
          <WelcomeScene
            key="welcome"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('milestone')}
          />
        )}

        {/* 4. MILESTONE 17TH BIRTHDAY SCENE (6,209 Days, 🧿 Nazar Battu, ♾️ Infinity) */}
        {currentScene === 'milestone' && (
          <MilestoneScene
            key="milestone"
            recipientName={config.recipientName}
            milestoneAge={config.milestoneAge}
            milestoneDays={config.milestoneDays}
            onNext={() => setCurrentScene('trivia')}
          />
        )}

        {/* 5. BESTIE TRIVIA SCENE (3 Friendship Questions -> Unlocks Best Friend Badge) */}
        {currentScene === 'trivia' && (
          <BestieTriviaScene
            key="trivia"
            recipientName={config.recipientName}
            onCompleteTrivia={(badgeUnlocked) => {
              setHasUnlockedBadge(badgeUnlocked);
              setCurrentScene('award');
            }}
          />
        )}

        {/* 6. SURPRISE BEST FRIEND AWARD SCENE (Question with runaway No button + Downloadable Award) */}
        {currentScene === 'award' && (
          <BestFriendAwardScene
            key="award"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('heartgame')}
          />
        )}

        {/* 7. HEART CATCHING MINI-GAME (Catch falling hearts, flowers & Nazar shields!) */}
        {currentScene === 'heartgame' && (
          <HeartCatchGameScene
            key="heartgame"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('spinwheel')}
          />
        )}

        {/* 8. BESTIE BIRTHDAY SPIN WHEEL (Lucky Coupons: Cafe treat, snacks, hugs!) */}
        {currentScene === 'spinwheel' && (
          <SpinWheelScene
            key="spinwheel"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('cake')}
          />
        )}

        {/* 8. INTERACTIVE CAKE BAKERY & CUTTING (Choose cake, toppings, candles, blow & slice 🔪) */}
        {currentScene === 'cake' && (
          <CakeBakerScene
            key="cake"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('letter')}
          />
        )}

        {/* 9. BESTIE LETTER SCENE (Unfolds with falling hearts ❤️ shower & 🧿) */}
        {currentScene === 'letter' && (
          <BestieLetterScene
            key="letter"
            title={config.letterTitle}
            greeting={config.letterGreeting}
            body={config.letterBody}
            closing={config.letterClosing}
            senderName={config.senderName}
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('reasons')}
          />
        )}

        {/* 10. 12 REASONS WHY YOU'RE INCREDIBLE (Interactive flip reason cards) */}
        {currentScene === 'reasons' && (
          <ReasonsScene
            key="reasons"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('messages')}
          />
        )}

        {/* 11. MESSAGES JUST FOR YOU (12 Affirmation cards with Shuffle) */}
        {currentScene === 'messages' && (
          <MessagesScene
            key="messages"
            recipientName={config.recipientName}
            onNext={() => setCurrentScene('finale')}
          />
        )}

        {/* 12. FINALE CELEBRATION (Best Friend Award 🏆, ♾️ Infinity, 🧿 Nazar Battu, Confetti) */}
        {currentScene === 'finale' && (
          <FinaleCelebrationScene
            key="finale"
            recipientName={config.recipientName}
            senderName={config.senderName}
            hasUnlockedBadge={hasUnlockedBadge}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
