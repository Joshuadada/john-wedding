import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, VolumeX, Heart } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isPlaying, toggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'RSVP', href: '#rsvp' },
    { name: 'Registry', href: '#registry' },
    { name: 'Wishes', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'champagne-glass shadow-md py-3 border-b border-[#E5D9CE]/60'
          : 'bg-gradient-to-b from-[#2C1810]/70 via-[#2C1810]/30 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span
            className={`font-display text-2xl sm:text-3xl tracking-widest font-semibold transition-colors duration-300 ${
              scrolled ? 'text-[#3B1F14] group-hover:text-[#C85A17]' : 'text-white group-hover:text-[#F97316]'
            }`}
          >
            E <span className="text-[#C85A17] font-serif italic text-xl sm:text-2xl">&amp;</span> J
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.25em] px-2 py-0.5 rounded-full border border-[#C85A17]/40 text-[#C85A17] font-medium bg-[#C85A17]/10">
            #EJ2026
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:text-[#C85A17] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A17] after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? 'text-[#1F130E]' : 'text-stone-200'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Audio Player Toggle */}
          <button
            onClick={toggleMusic}
            title={isPlaying ? 'Pause Music' : 'Play Romantic Music'}
            className={`p-2 sm:px-3 sm:py-2 rounded-full flex items-center gap-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 border ${
              isPlaying
                ? 'bg-[#C85A17] text-white border-[#C85A17] shadow-lg shadow-[#C85A17]/25 animate-pulse'
                : scrolled
                ? 'bg-[#F8F4EE] text-[#3B1F14] border-[#E5D9CE] hover:bg-[#C85A17] hover:text-white hover:border-[#C85A17]'
                : 'bg-white/10 text-white border-white/20 hover:bg-[#C85A17] hover:border-[#C85A17]'
            }`}
          >
            {isPlaying ? (
              <>
                <Music className="w-4 h-4 animate-spin text-amber-200" />
                <span className="hidden sm:inline">Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Music</span>
              </>
            )}
          </button>

          {/* Quick RSVP CTA */}
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#C85A17] text-white hover:bg-[#A3430B] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#C85A17]/30 transform hover:-translate-y-0.5"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            RSVP
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg md:hidden transition-colors ${
              scrolled ? 'text-[#3B1F14] hover:bg-[#F8F4EE]' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden champagne-glass border-b border-[#E5D9CE] overflow-hidden shadow-2xl"
          >
            <div className="px-6 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-4 text-base font-display font-medium text-[#3B1F14] hover:text-[#C85A17] hover:bg-[#F8F4EE] rounded-lg transition-colors border-l-2 border-transparent hover:border-[#C85A17]"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-[#E5D9CE] flex flex-col gap-2">
                <a
                  href="#rsvp"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#C85A17] text-white font-semibold text-sm tracking-widest uppercase shadow-md"
                >
                  RSVP Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
