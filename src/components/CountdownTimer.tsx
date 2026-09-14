import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date('2026-11-07T11:00:00+01:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isPassed) {
    return (
      <div className="py-4 px-8 rounded-2xl champagne-glass border border-[#C85A17]/40 text-center">
        <p className="font-display text-2xl text-[#C85A17] font-semibold">
          Today is the Day! Celebrating Esther &amp; John! 💍🎉
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto my-6">
      {units.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="dark-glass rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#C85A17]/30 shadow-xl backdrop-blur-md flex flex-col items-center justify-center transform transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C85A17]">
            <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#E5D9CE] mt-1 font-medium">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
