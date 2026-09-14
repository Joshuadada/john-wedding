import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, CheckCircle2, User, Users, Mail, Utensils, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { RSVPData } from '../types/wedding';

interface RSVPProps {
  webhookUrl?: string;
}

export const RSVP: React.FC<RSVPProps> = ({ webhookUrl }) => {
  const [formData, setFormData] = useState<RSVPData>({
    fullName: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestCount: 1,
    dietary: '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const rsvpEndpoint = webhookUrl || import.meta.env.VITE_RSVP_WEBHOOK_URL;

    try {
      if (rsvpEndpoint) {
        // Send URLSearchParams which populates e.parameter in Apps Script (no CORS issue)
        const params = new URLSearchParams();
        params.append('type', 'RSVP');
        params.append('fullName', formData.fullName);
        params.append('phone', formData.phone);
        params.append('email', formData.email || '');
        params.append('attending', formData.attending);
        params.append('guestCount', String(formData.guestCount));
        params.append('note', formData.note || '');
        params.append('timestamp', new Date().toLocaleString());

        await fetch(rsvpEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: params,
        });
      }

      // Celebrate with confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C85A17', '#F97316', '#3B1F14', '#FFFDF9'],
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Still set submitted locally so user UX is non-blocking
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      name: 'Colman',
      role: 'Groom\'s RSVP Manager',
      phone: '+2348148610500',
      telLink: 'tel:+2348148610500',
      waLink: 'https://wa.me/2348148610500?text=Hello%20Colman,%20confirming%20my%20attendance%20for%20Esther%20and%20John\'s%20Wedding!',
    },
    {
      name: 'Doyin',
      role: 'Bride\'s RSVP Manager',
      phone: '+2349053532676',
      telLink: 'tel:+2349053532676',
      waLink: 'https://wa.me/2349053532676?text=Hello%20Doyin,%20confirming%20my%20attendance%20for%20Esther%20and%20John\'s%20Wedding!',
    },
  ];

  return (
    <section id="rsvp" className="py-24 px-4 bg-[#F8F4EE] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Confirm Your Presence
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            RSVP &amp; Direct Contacts
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            Please kindly confirm your attendance by October 1st, 2026.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contacts.map((contact) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#E5D9CE] shadow-lg flex flex-col justify-between hover:border-[#C85A17] transition-all group"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C85A17]">
                  {contact.role}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#1F130E] mt-1 mb-2">
                  {contact.name}
                </h3>
                <p className="text-stone-600 font-mono text-lg mb-6">
                  {contact.phone}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={contact.telLink}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#3B1F14] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#C85A17] transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#F97316]" />
                  Direct Call
                </a>

                <a
                  href={contact.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#25D366] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  WhatsApp RSVP
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Online RSVP Form Card */}
        <div className="bg-[#FDFBF7] rounded-3xl p-8 sm:p-12 border border-[#E5D9CE] shadow-xl max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl text-[#3B1F14] font-semibold">
              Online RSVP Form
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Submit your attendance details directly below.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-4"
            >
              <div className="w-16 h-16 bg-[#C85A17]/20 text-[#C85A17] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl text-[#1F130E] font-semibold">
                RSVP Received with Love!
              </h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you for confirming, <span className="font-semibold text-[#C85A17]">{formData.fullName}</span>! We are counting down to celebrating our special day with you!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full border border-[#C85A17] text-[#C85A17] text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] hover:text-white transition-colors"
              >
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#C85A17]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pastor David Okonkwo"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#C85A17]" />
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#C85A17]" />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C85A17]" />
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans transition-all"
                  >
                    <option value={1}>1 Guest (Just Me)</option>
                    <option value={2}>2 Guests (Me + Plus One)</option>
                    <option value={3}>3 Guests (Family)</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'yes', label: 'Joyfully Attend' },
                    { value: 'no', label: 'Regretfully Decline' },
                    { value: 'maybe', label: 'Not Sure Yet' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: option.value as any })}
                      className={`py-3 px-4 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                        formData.attending === option.value
                          ? 'bg-[#C85A17] text-white border-[#C85A17] shadow-md'
                          : 'bg-[#F8F4EE] text-stone-700 border-[#E5D9CE] hover:border-[#C85A17]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#C85A17]" />
                  Dietary Preferences / Special Wishes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any dietary requirements or special messages for the couple..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE] focus:border-[#C85A17] focus:ring-2 focus:ring-[#C85A17]/20 outline-none text-stone-800 text-sm font-sans transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#C85A17] hover:bg-[#A3430B] text-white font-semibold text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:shadow-[#C85A17]/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit RSVP Response
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
