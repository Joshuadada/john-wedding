import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { WishMessage } from '../types/wedding';

interface WishesProps {
  webhookUrl?: string;
}

export const WishesSection: React.FC<WishesProps> = ({ webhookUrl }) => {
  const initialWishes: WishMessage[] = [];

  const [wishes, setWishes] = useState<WishMessage[]>(initialWishes);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<WishMessage['relationship']>('Mutual Friend');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const wishesEndpoint = webhookUrl || import.meta.env.VITE_WISHES_WEBHOOK_URL;

  React.useEffect(() => {
    if (wishesEndpoint) {
      fetch(wishesEndpoint)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.wishes && Array.isArray(data.wishes) && data.wishes.length > 0) {
            setWishes([...data.wishes.reverse(), ...initialWishes]);
          }
        })
        .catch((err) => console.log('Google Sheet DB live fetch:', err));
    }
  }, [wishesEndpoint]);

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: WishMessage = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relationship,
      message: message.trim(),
      timestamp: 'Just now',
    };

    try {
      if (wishesEndpoint) {
        const params = new URLSearchParams();
        params.append('type', 'WISH');
        params.append('name', newWish.name);
        params.append('relationship', newWish.relationship);
        params.append('message', newWish.message);
        params.append('timestamp', new Date().toLocaleString());

        await fetch(wishesEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: params,
        });
      }

      setWishes([newWish, ...wishes]);
      setName('');
      setMessage('');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C85A17', '#F97316', '#3B1F14', '#FFFDF9'],
      });

      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err) {
      console.error('Error posting wish:', err);
      setWishes([newWish, ...wishes]);
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-24 px-4 bg-[#F8F4EE] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Guestbook &amp; Prayers
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            Goodwill Wishes &amp; Blessings
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            "Leave a prayer, warm wish, or loving message for Esther &amp; John as they begin their lifelong journey."
          </p>
        </div>

        {/* Dual Column Layout: Form & Live Wish Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Wish Input Form */}
          <div className="lg:col-span-5 bg-[#FDFBF7] rounded-3xl p-8 border border-[#E5D9CE] shadow-xl h-fit">
            <div className="flex items-center gap-2 mb-6 text-[#C85A17]">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-display text-xl font-semibold text-[#1F130E]">
                Send Your Blessing
              </h3>
            </div>

            {submittedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#1EBE5D] text-xs font-medium flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Your prayer &amp; wish has been published with love!
              </motion.div>
            )}

            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace &amp; Michael"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Relationship to Couple
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans"
                >
                  <option value="Bride's Friend/Family">Bride's Friend / Family</option>
                  <option value="Groom's Friend/Family">Groom's Friend / Family</option>
                  <option value="Mutual Friend">Mutual Friend</option>
                  <option value="Church Family (CDM)">Church Family (CDM)</option>
                  <option value="Well Wisher">Well Wisher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Goodwill Message / Prayer *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your prayers, encouragement, or congratulatory words..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#C85A17] hover:bg-[#A3430B] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Posting Wish...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Goodwill Wish
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Wish Stream */}
          <div className="lg:col-span-7 space-y-4 max-h-[620px] overflow-y-auto pr-2">
            <AnimatePresence>
              {wishes.length === 0 ? (
                <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#E5D9CE] shadow-sm text-center py-12 space-y-3">
                  <span className="p-3 rounded-full bg-[#C85A17]/10 text-[#C85A17] inline-block">
                    <Sparkles className="w-6 h-6" />
                  </span>
                  <h4 className="font-display text-xl font-semibold text-[#1F130E]">
                    Be the First to Send a Wish!
                  </h4>
                  <p className="text-stone-600 text-xs max-w-xs mx-auto font-light leading-relaxed">
                    Leave your heartfelt prayer, congratulatory words, or goodwill message for Esther &amp; John.
                  </p>
                </div>
              ) : (
                wishes.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FDFBF7] rounded-3xl p-6 border border-[#E5D9CE] shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-display text-lg font-semibold text-[#1F130E]">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#C85A17] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C85A17]/10 inline-block mt-0.5">
                        {item.relationship}
                      </span>
                    </div>

                    <span className="text-xs text-stone-400 font-sans">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed font-sans mb-4">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E5D9CE]/60">
                    <span className="text-xs text-stone-500 italic font-serif">
                      Esther &amp; John #EJ2026
                    </span>
                  </div>
                </motion.div>
              )))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
