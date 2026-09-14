import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoveStory } from './components/LoveStory';
import { Itinerary } from './components/Itinerary';
import { Gallery } from './components/Gallery';
import { RSVP } from './components/RSVP';
import { GiftRegistry } from './components/GiftRegistry';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';

export function App() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  // Audio Ref for background ambient music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/for-life.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
          setShowMusicPrompt(false);
        })
        .catch((err) => {
          console.log('Browser blocked autoplay:', err);
        });
    }
  };

  useEffect(() => {
    // Attempt instant autoplay on mount
    startMusic();

    // Attach global user gesture listeners to trigger music on FIRST click or tap ANYWHERE on screen
    const handleGlobalGesture = () => {
      startMusic();
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener('pointerdown', handleGlobalGesture, true);
      document.removeEventListener('click', handleGlobalGesture, true);
      document.removeEventListener('touchstart', handleGlobalGesture, true);
      document.removeEventListener('scroll', handleGlobalGesture, true);
    };

    document.addEventListener('pointerdown', handleGlobalGesture, true);
    document.addEventListener('click', handleGlobalGesture, true);
    document.addEventListener('touchstart', handleGlobalGesture, true);
    document.addEventListener('scroll', handleGlobalGesture, true);

    return () => {
      removeListeners();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/for-life.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
          setShowMusicPrompt(false);
        })
        .catch((err) => console.log('Audio playback permission:', err));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F130E] font-sans relative selection:bg-[#C85A17] selection:text-white">
      {/* Floating Ambient Music Invitation Pill for First-Time Visitors */}
      <AnimatePresence>
        {showMusicPrompt && !isPlayingMusic && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onClick={startMusic}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 cursor-pointer max-w-sm w-[90%]"
          >
            <div className="bg-[#3B1F14]/90 backdrop-blur-md text-white p-4 rounded-full shadow-2xl border border-[#C85A17]/50 flex items-center justify-between gap-3 hover:scale-105 transition-all group">
              <div className="flex items-center gap-3 pl-2">
                <span className="p-2.5 rounded-full bg-[#C85A17] text-white animate-pulse">
                  <Music className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-display text-sm font-semibold tracking-wide text-[#FDFBF7] flex items-center gap-1.5">
                    Esther &amp; John #EJ2026
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h5>
                  <p className="text-[11px] text-stone-300 font-sans">
                    Tap here to play celebration music
                  </p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-full bg-[#C85A17] group-hover:bg-[#F97316] text-white text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-md">
                Play 🎵
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Navbar
        isPlaying={isPlayingMusic}
        toggleMusic={toggleMusic}
      />

      {/* Main Page Sections */}
      <main>
        {/* Editorial Magazine Hero Section */}
        <Hero />

        {/* Our Love Story (Dual Perspectives + Uncut Behind the Scenes) */}
        <LoveStory />

        {/* Wedding Schedule & Itinerary */}
        <Itinerary />

        {/* Photo Gallery Bento Grid with Lightbox */}
        <Gallery />

        {/* RSVP Section (Colman & Doyin Contacts + Form) */}
        <RSVP />

        {/* Gift Registry & Financial Blessings */}
        <GiftRegistry />

        {/* Guestbook & Wishes Section */}
        <WishesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
