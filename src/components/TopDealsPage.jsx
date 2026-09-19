import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { MEGA_DEALS } from '../data/dealsData';
import { DealCustomizerModal } from './DealCustomizerModal';
import { Flame, Clock, Sparkles, CheckCircle2, ArrowRight, Tag } from 'lucide-react';

export const TopDealsPage = () => {
  const { setDealModal, addToCart } = useCart();

  // Flash deal countdown state (02h : 45m : 12s)
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
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Midnight Crunch Ends In:</span>
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
            <div
              key={deal.id}
              className="group bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/70 shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col sm:flex-row"
            >
              {/* Image Side */}
              <div className="relative sm:w-1/2 h-64 sm:h-auto overflow-hidden bg-black/40">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-[#181B1E]/40 to-[#181B1E]" />

                {/* Floating Discount Ribbon */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xl border border-amber-300/40 flex items-center space-x-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{deal.discountRibbon}</span>
                </div>

                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-[#121417]/90 backdrop-blur-md text-amber-300 border border-[#23272B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {deal.badge}
                </div>
              </div>

              {/* Details Side */}
              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-snug mb-2">
                    {deal.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    {deal.description}
                  </p>

                  {/* Included Items list */}
                  <div className="space-y-1.5 mb-6">
                    <span className="block text-[10px] font-extrabold uppercase text-[#E8590C] tracking-wider">
                      Includes:
                    </span>
                    {deal.itemsIncluded.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Customizer Trigger */}
                <div className="pt-4 border-t border-[#23272B] flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-gray-400 line-through font-bold">
                      Was Rs. {deal.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-display font-black text-2xl text-[#FF922B]">
                      Rs. {deal.dealPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setDealModal({ isOpen: true, deal })}
                    className="flex items-center space-x-1.5 bg-[#E8590C] hover:bg-[#D9480F] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/25 hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Claim Deal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal render */}
        <DealCustomizerModal />

      </div>
    </div>
  );
};
