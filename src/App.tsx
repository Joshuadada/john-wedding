import { useState, useRef } from 'react';
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

  // Audio Ref for background ambient music
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Create HTML5 Audio with Orente by Adekunle Gold
      audioRef.current = new Audio('/music/orente.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => console.log('Audio playback permission:', err));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F130E] font-sans relative selection:bg-[#C85A17] selection:text-white">
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
