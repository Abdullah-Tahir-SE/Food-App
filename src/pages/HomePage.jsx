import React, { useState } from 'react';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { HeroSection } from '../components/HeroSection';
import { TwoTierCategoryNav } from '../components/TwoTierCategoryNav';
import { FoodCard } from '../components/FoodCard';
import { MENU_ITEMS } from '../data/menuData';
import { AMBIENCE_HIGHLIGHTS, LIVE_STATS } from '../data/ambienceData';
import { useCart } from '../context/CartContext';
import { Flame, Building2, ChevronRight, Users, Clock, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const getStatIcon = (iconName) => {
  switch (iconName) {
    case 'Users': return <Users className="w-6 h-6 text-[#E8590C]" />;
    case 'Clock': return <Clock className="w-6 h-6 text-amber-400" />;
    case 'Zap': return <Zap className="w-6 h-6 text-yellow-300" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    default: return <Sparkles className="w-6 h-6 text-[#E8590C]" />;
  }
};

export const HomePage = () => {
  const { setActiveTab } = useCart();
  const [activeTier1, setActiveTier1] = useState('pizzas');
  const [activeTier2, setActiveTier2] = useState('All Pizzas');

  // Filter items matching active tier 1 and tier 2
  const previewItems = MENU_ITEMS.filter(item => {
    if (item.category !== activeTier1) return false;
    if (activeTier2 && !activeTier2.startsWith('All') && item.subCategory !== activeTier2) {
      return false;
    }
    return true;
  }).slice(0, 8);

  return (
    <div className="bg-[#121417] min-h-screen">
      {/* 1. Infinite Moving Marquee Ticker */}
      <MarqueeBanner />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Listed Items & Category Navigation Section */}
      {/* The category bar only sticks within this section and hides when scrolled past listed items */}
      <section className="relative bg-mesh-pattern border-b border-[#23272B] pb-16">
        <TwoTierCategoryNav
          activeTier1={activeTier1}
          setActiveTier1={setActiveTier1}
          activeTier2={activeTier2}
          setActiveTier2={setActiveTier2}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-[#E8590C] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-[#E8590C]">
                  TRENDING CRAVINGS
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
                Featured Selection
              </h2>
            </div>

            <button
              onClick={() => setActiveTab('menu')}
              className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 hover:text-white transition-colors bg-[#181B1E] px-4 py-2 rounded-xl border border-[#23272B] hover:border-[#E8590C]/50 cursor-pointer"
            >
              <span>Explore Full Menu</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {previewItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {previewItems.map((dish) => (
                <FoodCard key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#181B1E] rounded-3xl border border-[#23272B]">
              <p className="text-gray-400 text-xs">No items in this sub-category preview.</p>
              <button
                onClick={() => setActiveTab('menu')}
                className="mt-3 bg-[#E8590C] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase"
              >
                View Full Menu Catalog
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Our Story & Ambience Section */}
      <section className="py-16 bg-[#121417] relative overflow-hidden border-b border-[#23272B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/30 px-4 py-1.5 rounded-full mb-4">
              <Building2 className="w-4 h-4 text-[#E8590C]" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                OUR CRAFT & ARCHITECTURE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
              WHERE ARCHITECTURE MEETS <span className="text-gradient-orange">CULINARY EXCELLENCE</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Designed for modern foodies. From our iconic industrial black perforated mesh facade to warm fluted wood interiors and 24-hr fermented dough recipes, every detail is engineered for perfection.
            </p>
          </div>

          {/* Architectural Feature Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {AMBIENCE_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/50 shadow-2xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181B1E] via-[#181B1E]/30 to-transparent opacity-90" />
                  <span className="absolute top-4 left-4 bg-[#121417]/80 backdrop-blur-md text-amber-300 border border-[#E8590C]/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#E8590C] uppercase tracking-widest block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-display text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Stats Counter */}
          <div className="bg-gradient-to-r from-[#181B1E] via-[#23272B] to-[#181B1E] rounded-3xl p-8 border border-[#23272B] shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {LIVE_STATS.map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-2xl bg-[#121417]/60 border border-[#23272B]/60">
                  <div className="flex justify-center mb-3">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
