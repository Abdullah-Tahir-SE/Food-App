import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MEGA_DEALS } from '../data/dealsData';
import { 
  Flame, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Award, 
  Star,
  ShoppingBag
} from 'lucide-react';

export const HeroSection = () => {
  const { setActiveTab, setDealModal, addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance banner every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEGA_DEALS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const currentDeal = MEGA_DEALS[currentIndex] || MEGA_DEALS[0];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MEGA_DEALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MEGA_DEALS.length) % MEGA_DEALS.length);
  };

  const handleClaimDeal = (deal) => {
    if (setDealModal) {
      setDealModal({ isOpen: true, deal });
    } else {
      addToCart(deal);
    }
  };

  return (
    <section className="relative bg-[#121417] pt-3 pb-6 sm:pt-4 sm:pb-8 border-b border-[#23272B] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E8590C]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF922B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Deals Banner Carousel Card */}
        <div 
          className="relative rounded-3xl bg-gradient-to-br from-[#1B1E22] via-[#16181B] to-[#121416] border border-[#2A2E34] shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Banner Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F]" />

          {/* Carousel Slide Animation */}
          <div className="relative min-h-[420px] sm:min-h-[400px] lg:min-h-[370px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDeal.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                
                {/* Left Column: Deal Content & Animated Text */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-3.5">
                  
                  {/* Row 1: Badges */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <span className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md shadow-[#E8590C]/20 border border-amber-300/30">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{currentDeal.discountRibbon}</span>
                    </span>

                    <span className="inline-flex items-center space-x-1.5 bg-[#121417] border border-[#E8590C]/40 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5 text-[#FF922B] animate-pulse" />
                      <span>{currentDeal.badge}</span>
                    </span>

                    <span className="hidden sm:inline-flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      <Clock className="w-3 h-3" />
                      <span>3s Auto-Deal Express</span>
                    </span>
                  </motion.div>

                  {/* Row 2: Animated Title */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight"
                  >
                    {currentDeal.title}
                  </motion.h2>

                  {/* Row 3: Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl line-clamp-2"
                  >
                    {currentDeal.description}
                  </motion.p>

                  {/* Row 4: Deal Items Checklist */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {currentDeal.itemsIncluded.map((item, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center space-x-1.5 bg-[#121417]/80 border border-[#23272B] text-gray-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </motion.div>

                  {/* Row 5: Price & Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.35 }}
                    className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
                  >
                    {/* Pricing */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 line-through font-semibold">
                          Rs. {currentDeal.originalPrice.toLocaleString()}
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase">
                          SAVE Rs. {(currentDeal.originalPrice - currentDeal.dealPrice).toLocaleString()}
                        </span>
                      </div>
                      <div className="font-display font-black text-2xl sm:text-3xl text-gradient-orange">
                        Rs. {currentDeal.dealPrice.toLocaleString()}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => handleClaimDeal(currentDeal)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Claim Deal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('deals')}
                        className="flex items-center space-x-1.5 bg-[#121417] hover:bg-[#23272B] text-amber-300 hover:text-white border border-[#23272B] hover:border-[#E8590C]/50 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>All Deals</span>
                      </button>
                    </div>
                  </motion.div>

                </div>

                {/* Right Column: High-Impact Visual Food Showcase */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#E8590C]/40 shadow-[0_0_35px_rgba(232,89,12,0.3)] group"
                  >
                    <img 
                      src={currentDeal.image} 
                      alt={currentDeal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating Rating Badge */}
                    <div className="absolute top-3 right-3 bg-[#121417]/90 backdrop-blur-md border border-[#23272B] px-2.5 py-1 rounded-xl flex items-center space-x-1.5 shadow-lg">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-black text-white">4.9</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">HOT</span>
                    </div>

                    {/* Floating Deal Price Tag */}
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3 py-1.5 rounded-xl shadow-xl border border-amber-300/40 flex items-center space-x-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-200" />
                      <span className="text-xs font-black uppercase">
                        Only Rs. {currentDeal.dealPrice.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Bottom Navigation & 3-Second Indicator Bar */}
          <div className="bg-[#121417]/90 backdrop-blur-sm border-t border-[#23272B] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* 5 Deal Indicators with 3-Second Active Animated Fill */}
            <div className="flex items-center space-x-2 sm:space-x-2.5 overflow-x-auto max-w-full py-1">
              {MEGA_DEALS.map((deal, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={deal.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-xl px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 overflow-hidden ${
                      isActive 
                        ? 'bg-[#181B1E] text-white border border-[#E8590C]' 
                        : 'bg-[#16181B] text-gray-400 hover:text-white border border-[#23272B]'
                    }`}
                  >
                    {/* 3-Second Progress Bar on Active Pill */}
                    {isActive && (
                      <motion.div
                        key={`timer-${currentIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '100%' : '100%' }}
                        transition={{ 
                          duration: isPaused ? 0 : 3, 
                          ease: 'linear' 
                        }}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F]"
                      />
                    )}
                    <span className="text-amber-400 font-black">0{idx + 1}</span>
                    <span className="max-w-[90px] sm:max-w-[120px] truncate">{deal.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-1 hidden sm:inline">
                {isPaused ? '⏸ Paused' : '⚡ 3s Auto-Slide'}
              </span>

              <button
                onClick={prevSlide}
                aria-label="Previous Deal"
                className="w-8 h-8 rounded-xl bg-[#181B1E] hover:bg-[#E8590C] border border-[#23272B] hover:border-[#E8590C] text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Deal"
                className="w-8 h-8 rounded-xl bg-[#181B1E] hover:bg-[#E8590C] border border-[#23272B] hover:border-[#E8590C] text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Compact Trust Features Strip Below Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
          <div className="flex items-center space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2.5 rounded-2xl">
            <Zap className="w-5 h-5 text-[#FF922B] shrink-0" />
            <div>
              <span className="block text-xs font-black text-white uppercase leading-none">30 Mins Express</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Hot Doorstep Delivery</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2.5 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="block text-xs font-black text-white uppercase leading-none">100% Fresh Dough</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">24-hr Hand Fermented</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2.5 rounded-2xl">
            <Flame className="w-5 h-5 text-[#E8590C] shrink-0" />
            <div>
              <span className="block text-xs font-black text-white uppercase leading-none">11 Secret Spices</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Golden Fried Chicken</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2.5 rounded-2xl">
            <Award className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <span className="block text-xs font-black text-white uppercase leading-none">Best Price In PKR</span>
              <span className="block text-[10px] text-gray-400 mt-0.5">Huge Mega Deal Discounts</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
