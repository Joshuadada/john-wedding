import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C1810] text-white py-16 px-4 border-t border-[#C85A17]/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        {/* Monogram */}
        <div>
          <span className="font-display text-4xl sm:text-5xl text-[#F97316] tracking-widest font-normal">
            E <span className="font-serif italic text-white text-3xl">&amp;</span> J
          </span>
          <p className="font-serif italic text-stone-300 text-lg mt-2">
            Esther Adedolapo Owoseni &amp; John Tochukwu Ezeukwu
          </p>
          <p className="text-xs text-stone-400 font-light mt-1">
            Families of Mr Samuel &amp; Mrs Victoria Owoseni &amp; Mr Colman &amp; Mrs Clementina Ezeukwu
          </p>
        </div>

        {/* Wedding Date Pill */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
          Saturday, 7th November 2026 • Nkem Event Center, Festac, Lagos
          <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">
          <span>#EJ2026</span>
          <span className="text-stone-600">•</span>
          <span>#SupernaturalUnion2026</span>
        </div>

        <div className="w-24 h-0.5 bg-[#C85A17]/40 mx-auto" />

        {/* Closing Note */}
        <p className="text-xs text-stone-400 font-light flex items-center justify-center gap-1.5 max-w-md mx-auto">
          Crafted with <Heart className="w-3.5 h-3.5 text-[#C85A17] fill-current" /> for Esther &amp; John's Holy Matrimony. Glory to God!
        </p>
      </div>
    </footer>
  );
};
