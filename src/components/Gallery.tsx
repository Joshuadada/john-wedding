import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { PhotoItem } from '../types/wedding';

export const Gallery: React.FC = () => {
  const photos: PhotoItem[] = [
    {
      id: 'photo-1',
      url: '/images/proposal-1.jpg',
      title: 'The Proposal',
      category: 'proposal',
      caption: 'John down on one knee asking Esther to spend forever with him.',
      aspectRatio: 'vertical',
    },
    {
      id: 'photo-2',
      url: '/images/proposal-2.jpg',
      title: 'Eye to Eye Connection',
      category: 'moments',
      caption: 'A sacred gaze of love, joy, and deep spiritual connection.',
      aspectRatio: 'vertical',
    },
    {
      id: 'photo-3',
      url: '/images/ring-hug.jpg',
      title: 'She Said Yes!',
      category: 'ring',
      caption: 'Esther proudly showing her engagement ring wrapped in John\'s arms.',
      aspectRatio: 'vertical',
    },
    {
      id: 'photo-4',
      url: '/images/ring-close-up.jpg',
      title: 'The Sparkle of Love',
      category: 'ring',
      caption: 'The diamond engagement ring glowing atop vibrant red roses.',
      aspectRatio: 'square',
    },
    {
      id: 'photo-5',
      url: '/images/embrace.jpg',
      title: 'Warm Embrace',
      category: 'embrace',
      caption: 'Pure warmth, safety, and joy in each other\'s arms.',
      aspectRatio: 'vertical',
    },
    {
      id: 'photo-6',
      url: '/images/pencil-sketch.jpg',
      title: 'Fine Art Pencil Sketch',
      category: 'artwork',
      caption: 'A custom charcoal & pencil illustration capturing Esther & John\'s embrace.',
      aspectRatio: 'horizontal',
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Captured Moments
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            Photo Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            "A glimpse into our journey of love, laughter, and answered prayers."
          </p>
        </div>

        {/* Bento / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer border border-[#E5D9CE] shadow-md hover:shadow-2xl transition-all duration-500 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1 h-[420px]' : 'h-[380px]'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/85 via-[#2C1810]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#F97316] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {photo.category}
                  </span>
                  <h3 className="font-display text-xl text-white font-semibold mt-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 mt-1 font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1F130E]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#C85A17] transition-colors z-50"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-[#C85A17] transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-[#C85A17] transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Selected Image Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center p-2"
            >
              <motion.img
                key={photos[selectedIndex].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={photos[selectedIndex].url}
                alt={photos[selectedIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
              />

              <div className="mt-4 text-white">
                <h3 className="font-display text-2xl font-semibold text-amber-200">
                  {photos[selectedIndex].title}
                </h3>
                <p className="text-sm text-stone-300 mt-1 max-w-lg mx-auto font-light">
                  {photos[selectedIndex].caption}
                </p>
                <span className="text-xs text-[#F97316] tracking-widest uppercase mt-2 inline-block">
                  Photo {selectedIndex + 1} of {photos.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
