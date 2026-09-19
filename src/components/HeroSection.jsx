import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MEGA_DEALS } from '../data/dealsData';
import { 
  Flame, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Award, 
  Star,
  ShoppingBag
} from 'lucide-react';

// Professional Snappy Typewriter Text Component
const TypewriterText = ({ text, speed = 25, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
    let index = 0;
    if (!text) return;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        setIsDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span 
        className={`inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-[#FF922B] ml-1 sm:ml-1.5 align-middle rounded-sm transition-opacity ${
          isDone ? 'animate-pulse opacity-75' : 'opacity-100 animate-pulse'
        }`} 
      />
    </span>
  );
};

export const HeroSection = () => {
  const { setActiveTab, setDealModal, addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance banner every 3 seconds
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
          <div className="relative min-h-[460px] sm:min-h-[400px] lg:min-h-[350px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDeal.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full p-4 sm:p-7 lg:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-center"
              >
                
                {/* Content Column: Clean Animated Typewriter Title & Details */}
                <div className="w-full lg:col-span-7 flex flex-col justify-center text-left space-y-3 order-2 lg:order-1">
                  
                  {/* Deal Title with Smooth Typewriter Effect (Clean, No top tags) */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.35 }}
                    className="font-display text-xl sm:text-2xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight min-h-[2.4em] sm:min-h-[2em] flex items-center"
                  >
                    <TypewriterText text={currentDeal.title} speed={22} />
                  </motion.h2>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.35 }}
                    className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl line-clamp-2"
                  >
                    {currentDeal.description}
                  </motion.p>

                  {/* Deal Included Items Tags */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.35 }}
                    className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
                  >
                    {currentDeal.itemsIncluded.map((item, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center space-x-1.5 bg-[#121417]/80 border border-[#23272B] text-gray-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </motion.div>

                  {/* Price & Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-3 sm:gap-6"
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
                      <div className="font-display font-black text-2xl sm:text-3xl text-gradient-orange mt-0.5">
                        Rs. {currentDeal.dealPrice.toLocaleString()}
                      </div>
                    </div>

                    {/* Action Buttons (Full width on mobile for easy tapping) */}
                    <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => handleClaimDeal(currentDeal)}
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Claim Deal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('deals')}
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 bg-[#121417] hover:bg-[#23272B] text-amber-300 hover:text-white border border-[#23272B] hover:border-[#E8590C]/50 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>All Deals</span>
                      </button>
                    </div>
                  </motion.div>

                </div>

                {/* Right Column: Clean Food Showcase (No price on image, subtle rating badge) */}
                <div className="w-full lg:col-span-5 relative flex justify-center items-center order-1 lg:order-2">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="relative w-full max-w-sm sm:max-w-md lg:max-w-[360px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#E8590C]/40 shadow-[0_0_35px_rgba(232,89,12,0.25)] group"
                  >
                    <img 
                      src={currentDeal.image} 
                      alt={currentDeal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Subtle Rating Badge on Top Right */}
                    <div className="absolute top-2.5 right-2.5 bg-[#121417]/90 backdrop-blur-md border border-[#23272B] px-2 py-0.5 rounded-lg flex items-center space-x-1 shadow-md">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black text-white">4.9</span>
                      <span className="text-[8px] text-gray-400 font-bold uppercase">HOT</span>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Bottom Navigation (No 'Paused' text, clean arrows & pills) */}
          <div className="bg-[#121417]/90 backdrop-blur-sm border-t border-[#23272B] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
            
            {/* 5 Deal Indicators with Active Animated Progress Fill */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 overflow-x-auto no-scrollbar max-w-full py-0.5">
              {MEGA_DEALS.map((deal, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={deal.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shrink-0 overflow-hidden ${
                      isActive 
                        ? 'bg-[#181B1E] text-white border border-[#E8590C]' 
                        : 'bg-[#16181B] text-gray-400 hover:text-white border border-[#23272B]'
                    }`}
                  >
                    {/* Active Progress Bar */}
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
                    <span className="max-w-[75px] sm:max-w-[110px] truncate">{deal.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Clean Previous / Next Arrow Controls */}
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={prevSlide}
                aria-label="Previous Deal"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#181B1E] hover:bg-[#E8590C] border border-[#23272B] hover:border-[#E8590C] text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Deal"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#181B1E] hover:bg-[#E8590C] border border-[#23272B] hover:border-[#E8590C] text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Compact Trust Features Strip Below Banner (Mobile Optimized) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 mt-3 sm:mt-4">
          <div className="flex items-center space-x-2 sm:space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF922B] shrink-0" />
            <div>
              <span className="block text-[11px] sm:text-xs font-black text-white uppercase leading-tight">30 Mins Express</span>
              <span className="block text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Hot Doorstep Delivery</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="block text-[11px] sm:text-xs font-black text-white uppercase leading-tight">100% Fresh Dough</span>
              <span className="block text-[9px] sm:text-[10px] text-gray-400 mt-0.5">24-hr Hand Fermented</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8590C] shrink-0" />
            <div>
              <span className="block text-[11px] sm:text-xs font-black text-white uppercase leading-tight">11 Secret Spices</span>
              <span className="block text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Golden Fried Chicken</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-2.5 bg-[#181B1E]/60 border border-[#23272B] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 shrink-0" />
            <div>
              <span className="block text-[11px] sm:text-xs font-black text-white uppercase leading-tight">Best Price In PKR</span>
              <span className="block text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Huge Mega Savings</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
