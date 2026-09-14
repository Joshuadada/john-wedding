import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#2C1810]">
      {/* Background Image Carousel/Overlay with Editorial Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/proposal-1.jpg"
          alt="Esther & John Proposal"
          className="w-full h-full object-cover object-top opacity-35 filter brightness-90 contrast-105 scale-105 transform animate-pulse transition-all duration-10000"
          style={{ animationDuration: '20s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/70 to-[#2C1810]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#2C1810]/60 to-[#2C1810]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Editorial Sub-header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C85A17]/50 bg-[#C85A17]/20 text-[#F97316] text-xs font-semibold uppercase tracking-[0.25em] mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Holy Matrimony &amp; Union
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Main Names Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.1] mb-4 drop-shadow-md">
            Esther <span className="font-serif italic text-[#F97316] font-light">&amp;</span> John
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-[#E5D9CE] italic tracking-wide max-w-2xl mx-auto font-light">
            "Esther Adedolapo Owoseni &amp; John Tochukwu Ezeukwu"
          </p>
        </motion.div>

        {/* Event Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-stone-200 uppercase tracking-widest font-medium"
        >
          <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
            <Calendar className="w-4 h-4 text-[#F97316]" />
            Saturday, 7th November 2026
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            11:00 AM WAT • Nkem Event Center, Festac, Lagos
          </div>
        </motion.div>

        {/* Hashtags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-3 flex items-center justify-center gap-3 text-xs tracking-[0.2em] font-semibold text-[#F97316] uppercase"
        >
          <span>#EJ2026</span>
          <span className="text-stone-500">•</span>
          <span>#SupernaturalUnion2026</span>
        </motion.div>

        {/* Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Dual Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C85A17] hover:bg-[#A3430B] text-white font-semibold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#C85A17]/40 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            RSVP Now
          </a>

          <a
            href="#registry"
            className="w-full sm:w-auto px-8 py-4 rounded-full dark-glass text-white font-semibold text-sm uppercase tracking-widest border border-white/30 hover:border-[#C85A17] hover:bg-[#C85A17]/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4 text-[#F97316]" />
            Send a Gift / Bless Couple
          </a>
        </motion.div>
      </div>

      {/* Decorative Bottom Curve / Line Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FDFBF7] to-transparent pointer-events-none" />
    </section>
  );
};
