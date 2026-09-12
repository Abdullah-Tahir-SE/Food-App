import React, { useState, useEffect } from 'react';
import { MEGA_DEALS } from '../data/dealsData';
import { DealCard } from '../components/DealCard';
import { DealCustomizerModal } from '../components/DealCustomizerModal';
import { Flame, Clock } from 'lucide-react';

export const TopDealsPage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-8 bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Deal Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#181B1E] via-[#23272B] to-[#181B1E] rounded-3xl p-8 sm:p-12 border border-[#E8590C]/40 shadow-[0_0_50px_rgba(232,89,12,0.2)] mb-12 text-center">
          
          <div className="inline-flex items-center space-x-2 bg-[#E8590C]/20 border border-[#E8590C]/50 px-4 py-1.5 rounded-full mb-4">
            <Flame className="w-4 h-4 text-[#FF922B] animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              LIMITED TIME FLASH SAVINGS
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            CRAVING MEETS SAVINGS — <span className="text-gradient-orange">FOOD CART MEGA DEALS</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Get up to 45% OFF on our hand-curated mega meal combos! Customize your drinks, dips, and crust style.
          </p>

          {/* Animated Countdown Timer */}
          <div className="inline-flex items-center space-x-3 bg-[#121417] border border-[#23272B] px-6 py-3 rounded-2xl shadow-xl">
            <Clock className="w-5 h-5 text-[#E8590C] animate-pulse" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Midnight Rush Ends In:</span>
            <div className="flex items-center space-x-1 font-display font-black text-amber-400 text-lg">
              <span className="bg-[#181B1E] px-2 py-0.5 rounded border border-[#23272B]">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-[#181B1E] px-2 py-0.5 rounded border border-[#23272B]">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-[#181B1E] px-2 py-0.5 rounded border border-[#23272B] text-[#E8590C]">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

        </div>

        {/* Mega Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {MEGA_DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* Customizer Modal render */}
        <DealCustomizerModal />

      </div>
    </div>
  );
};
