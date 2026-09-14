import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Church, PartyPopper, Music2, Download, ExternalLink } from 'lucide-react';

export const Itinerary: React.FC = () => {
  const events = [
    {
      title: 'Holy Matrimony & Blessing',
      time: '11:00 AM WAT',
      location: 'Nkem Event Center',
      address: '32 Road by MRS Filling station, Festac, Lagos',
      description: 'Join us as Esther and John exchange sacred vows before God, family, and loved ones in a spirit-filled atmosphere.',
      icon: Church,
      color: 'bg-[#C85A17]',
    },
    {
      title: 'Royal Reception & Dinner',
      time: '01:00 PM WAT',
      location: 'Nkem Event Center (Grand Hall)',
      address: '32 Road by MRS Filling station, Festac, Lagos',
      description: 'An afternoon of royal dining, heartfelt toasts, joyful dancing, cutting of the cake, and unforgettable memories.',
      icon: PartyPopper,
      color: 'bg-[#3B1F14]',
    },
    {
      title: 'After-Party Celebration',
      time: '05:00 PM WAT Till Late',
      location: 'Nkem Event Center Lounge',
      address: '32 Road by MRS Filling station, Festac, Lagos',
      description: 'Celebrate into the night with great music, delicious chops, refreshing drinks, and non-stop celebration!',
      icon: Music2,
      color: 'bg-[#A3430B]',
    },
  ];

  const downloadCalendarFile = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Esther & John Wedding//EJ2026//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Esther & John Wedding (#EJ2026)
DESCRIPTION:The Holy Matrimony & Wedding Celebration of Esther Adedolapo Owoseni & John Tochukwu Ezeukwu #EJ2026
LOCATION:Nkem Event Center, 32 Road by MRS Filling station, Festac, Lagos, Nigeria
DTSTART:20261107T100000Z
DTEND:20261107T210000Z
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Esther_and_John_Wedding_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Esther+%26+John+Wedding+(%23EJ2026)&dates=20261107T100000Z/20261107T210000Z&details=The+Holy+Matrimony+%26+Wedding+Celebration+of+Esther+Adedolapo+Owoseni+%26+John+Tochukwu+Ezeukwu+%23EJ2026&location=Nkem+Event+Center,+32+Road+by+MRS+Filling+station,+Festac,+Lagos,+Nigeria`;

  return (
    <section id="itinerary" className="py-24 px-4 bg-[#F8F4EE] relative">
      <div className="max-w-6xl mx-auto">
        {/* Families Invitation Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 bg-[#FDFBF7] rounded-3xl p-8 sm:p-10 border border-[#C85A17]/30 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C85A17] via-[#3B1F14] to-[#C85A17]" />
          
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C85A17] mb-2 block font-sans">
            Formal Invitation
          </span>

          <h3 className="font-serif italic text-xl sm:text-2xl text-[#3B1F14] font-medium mb-4">
            THE FAMILIES OF
          </h3>

          <div className="space-y-1 font-display text-lg sm:text-xl text-[#1F130E] font-semibold">
            <p>Mr Samuel &amp; Mrs Victoria Owoseni</p>
            <p className="text-xs font-sans text-stone-500 font-normal italic">and</p>
            <p>Mr Colman &amp; Mrs Clementina Ezeukwu</p>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-stone-600 my-4">
            Cordially invite you to the wedding of their beloved children
          </p>

          <h2 className="font-display text-3xl sm:text-4xl text-[#C85A17] font-semibold">
            Esther <span className="font-serif italic text-[#3B1F14]">&amp;</span> John
          </h2>
          <p className="text-xs font-mono uppercase tracking-widest text-stone-500 mt-1">
            Adedolapo Owoseni &amp; Tochukwu Ezeukwu
          </p>

          <div className="my-6 w-24 h-0.5 bg-[#E5D9CE] mx-auto" />

          {/* Official Venue & Colour Code Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C85A17] block mb-1">
                Official Wedding Venue
              </span>
              <p className="font-display font-semibold text-sm text-[#1F130E] flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#C85A17] shrink-0 mt-0.5" />
                <span>Nkem Event Center, 32 Road by MRS Filling station, Festac, Lagos</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F4EE] border border-[#E5D9CE]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C85A17] block mb-1">
                Colour Code / Dress Code
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#C85A17] border border-white shadow-sm inline-block" />
                  <span className="w-4 h-4 rounded-full bg-[#3B1F14] border border-white shadow-sm inline-block" />
                </div>
                <span className="font-display font-semibold text-sm text-[#1F130E]">
                  Burnt Orange &amp; Chocolate Brown
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Schedule of Events
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            Wedding Itinerary
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            Saturday, 7th November 2026 • 11:00 AM WAT
          </p>

          {/* Add to Calendar Action */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={downloadCalendarFile}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3B1F14] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-[#F97316]" />
              Add to iCal / Outlook
            </button>
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C85A17] text-[#C85A17] text-xs uppercase tracking-widest font-semibold hover:bg-[#C85A17] hover:text-white transition-all"
            >
              <CalendarIcon className="w-4 h-4" />
              Add to Google Calendar
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Timeline Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#E5D9CE] shadow-lg hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`p-3.5 rounded-2xl text-white shadow-md ${event.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#F8F4EE] text-[#C85A17] border border-[#E5D9CE]">
                      Phase 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-[#1F130E] mb-2 group-hover:text-[#C85A17] transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-xs font-medium text-stone-600">
                    <div className="flex items-center gap-2 text-[#C85A17] font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span>{event.location}, {event.address}</span>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed font-sans">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5D9CE]/60 text-xs font-semibold uppercase tracking-widest text-[#C85A17]">
                  Nov 7, 2026
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
