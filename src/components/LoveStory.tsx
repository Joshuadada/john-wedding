import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, ChevronUp, Quote, Flame } from 'lucide-react';

export const LoveStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'john' | 'esther'>('john');
  const [showUncut, setShowUncut] = useState(false);

  return (
    <section id="story" className="py-24 px-4 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A17]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B1F14]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C85A17] bg-[#C85A17]/10 px-4 py-1.5 rounded-full inline-block mb-3">
            Divine Romance &amp; Testimony
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1F130E] font-normal tracking-tight">
            Our Love Story
          </h2>
          <div className="w-16 h-0.5 bg-[#C85A17] mx-auto my-4" />
          <p className="font-serif italic text-lg text-stone-600">
            "A supernatural joining ordained by God, sustained by mercy, and fulfilled in love."
          </p>
        </div>

        {/* Story Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#F8F4EE] p-1.5 rounded-full border border-[#E5D9CE] flex space-x-2 shadow-inner">
            <button
              onClick={() => setActiveTab('john')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'john'
                  ? 'bg-[#3B1F14] text-white shadow-lg shadow-[#3B1F14]/30'
                  : 'text-[#1F130E] hover:text-[#C85A17]'
              }`}
            >
              <Flame className={`w-4 h-4 ${activeTab === 'john' ? 'text-[#F97316]' : 'text-stone-400'}`} />
              His Story (John)
            </button>

            <button
              onClick={() => setActiveTab('esther')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'esther'
                  ? 'bg-[#C85A17] text-white shadow-lg shadow-[#C85A17]/30'
                  : 'text-[#1F130E] hover:text-[#C85A17]'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeTab === 'esther' ? 'text-amber-200 fill-current' : 'text-stone-400'}`} />
              Her Story (Esther)
            </button>
          </div>
        </div>

        {/* Story Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'john' ? (
            <motion.div
              key="john"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F8F4EE] rounded-3xl p-6 sm:p-10 border border-[#E5D9CE] shadow-xl"
            >
              {/* Photo Side */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-[#C85A17]/20">
                <img
                  src="/images/proposal-2.jpg"
                  alt="John & Esther Reconnected"
                  className="w-full h-[420px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#F97316] font-semibold">The Groom's Perspective</span>
                    <h3 className="font-display text-xl text-white font-semibold">John Tochukwu Ezeukwu</h3>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-7 space-y-6">
                <Quote className="w-12 h-12 text-[#C85A17]/30" />
                <h3 className="font-display text-2xl sm:text-3xl text-[#3B1F14] font-semibold">
                  "I Am Getting Married to My Best Friend"
                </h3>
                <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
                  "Our love story is a perfect example of God's ordained relationship. I met my love in 2020 while Ministering, she was introduced to me by a friend. The moment I saw her, I knew that there was something different about her, though I had no intention to date her."
                </p>
                <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
                  "At first we were just prayer partners because I led her to Christ and got her filled with the holy ghost, so I started mentoring her. Few months later, I noticed that I felt something different for her, so I had to pray about it, so that I don't miss it 😅, and that was when I got the leading that she was the one. God spoke to me about her and she is the only person till date that God actually spoke to me about and gave me lots of signs too, but we still got separated and lost contact until 2023, when I invited her for CDM church camp meeting, then 2024 reconnected again, and the rest is history."
                </p>
                <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg font-medium italic text-[#8B4513]">
                  "I have always loved Esther from the very beginning, and I am so happy that we are finally at this point, this is really a great joy because I am getting married to my best friend. I am grateful to God for making this possible and I thank you Esther too for your patience, love and care towards me. I love you baby girl."
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="esther"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Part 1: Esther's Core Story */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F8F4EE] rounded-3xl p-6 sm:p-10 border border-[#E5D9CE] shadow-xl">
                {/* Text Side */}
                <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                  <Quote className="w-12 h-12 text-[#C85A17]/30" />
                  <h3 className="font-display text-2xl sm:text-3xl text-[#3B1F14] font-semibold">
                    "My Answered Prayers &amp; Everything I Prayed For"
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
                    "(Remembering how I first met him and laughing so hard😅). I remember the first day I saw him, in an Ankara shirt and trousers, during a meeting. I was asking myself, 'Who is this guy that is speaking with so much confidence?' I saw how he prayed and gave people word of knowledge. I remember saying to myself: 'I must talk to this guy, I must know him, I must be his friend', and of course I met him after the meeting. And that was how we became friends. And of course, He led me to Christ and helped me pray in tongues."
                  </p>
                  <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
                    "Then he started traveling out, pursuing his football career and somehow somehow we stopped being in touch. The story between us is a story that shows the mercy of God. It shows how far God can go just to be merciful to his children."
                  </p>
                  <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
                    "Years later, he called me, inviting me to CDM church camp meeting and that was how we somehow got in touch again. A year later I became a full member of CDM and the supernatural joining that my prophet has always been declaring happened 😅. It was honestly a supernatural joining because I never saw it coming."
                  </p>
                  <p className="text-stone-700 leading-relaxed font-sans text-base sm:text-lg font-medium italic text-[#8B4513]">
                    "I'm really grateful to God for this journey so far. This happened by the mercies of God. God has really been so intentional about us and I honestly can't take this for granted. God blessed me with the best Man on Earth to be honest. I call him my Answered Prayers because he is everything I prayed for and even more. I have the most caring, loving, selfless, honest, loyal, intentional and blessed partner in this world 😂. I'm glad God directed our steps, and here's to 🥂🍻 many more years 🥂🥂"
                  </p>
                </div>

                {/* Photo Side */}
                <div className="lg:col-span-5 order-1 lg:order-2 relative group overflow-hidden rounded-2xl shadow-2xl border-2 border-[#C85A17]/20">
                  <img
                    src="/images/embrace.jpg"
                    alt="Esther & John Embrace"
                    className="w-full h-[450px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#F97316] font-semibold">The Bride's Perspective</span>
                      <h3 className="font-display text-xl text-white font-semibold">Esther Adedolapo Owoseni</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Expandable Uncut Behind The Scenes Accordion */}
              <div className="bg-gradient-to-r from-[#3B1F14] to-[#2C1810] rounded-3xl border border-[#C85A17]/40 shadow-2xl overflow-hidden text-white">
                <button
                  onClick={() => setShowUncut(!showUncut)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-full bg-[#C85A17]/30 text-[#F97316]">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-display text-xl sm:text-2xl font-semibold text-amber-100 flex items-center gap-2">
                        Part 2: Behind the Scenes 🤫 <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#C85A17] text-white">Uncut</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-300 font-light mt-0.5">
                        The hilarious truth about the proposal &amp; playing hard guy!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#F97316] font-semibold text-xs uppercase tracking-widest">
                    <span>{showUncut ? 'Hide Story' : 'Read Uncut'}</span>
                    {showUncut ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {showUncut && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-8 pb-8 pt-2 border-t border-white/10 space-y-4 text-stone-200 text-base leading-relaxed"
                    >
                      <p>
                        "I remember how he audaciously asked me out😅; it was the most unromantic thing I had ever heard. And I remembered how I kept on refusing because I expected him to sound more romantic 😏, but I later agreed; he must have gone to pray earnestly because how could I have said yes😂 to such a rude guy😒😅."
                      </p>
                      <p>
                        "But I later discovered that he was only trying to play hard guy. I saw how my words melted his heart each time I spoke, and how my tears broke him, and how much price he was willing to pay to ensure that I was perfectly fine, and how he put me through in my works, studies and business. I have always known him to be a very selfless person, always truthful even though it hurts."
                      </p>
                      <div className="p-4 rounded-xl bg-white/10 border border-white/15 italic text-amber-200 font-serif text-lg">
                        "To my babe: You have always led by example and you are indeed a true leader. Since the day I said yes to you, I have never regretted it, though there were times of misunderstanding, anger, hurts, but never a time of regret. I love you to the moon and back, my babe. I love you soooooo muchhhhh."
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
