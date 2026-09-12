import React from 'react';
import { AMBIENCE_HIGHLIGHTS, LIVE_STATS } from '../data/ambienceData';
import { Building2, Users, Clock, Zap, ShieldCheck, Sparkles, Award } from 'lucide-react';

const getStatIcon = (iconName) => {
  switch (iconName) {
    case 'Users': return <Users className="w-6 h-6 text-[#E8590C]" />;
    case 'Clock': return <Clock className="w-6 h-6 text-amber-400" />;
    case 'Zap': return <Zap className="w-6 h-6 text-yellow-300" />;
    case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    default: return <Sparkles className="w-6 h-6 text-[#E8590C]" />;
  }
};

export const AboutUsPage = () => {
  return (
    <div className="py-12 bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/30 px-4 py-1.5 rounded-full mb-4">
            <Building2 className="w-4 h-4 text-[#E8590C]" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              STORE ARCHITECTURE & BRAND HERITAGE
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight mb-4">
            WHERE ARCHITECTURE MEETS <span className="text-gradient-orange">CULINARY EXCELLENCE</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Inspired by sleek modern fast-casual architecture. FOOD CART combines matte industrial black perforated mesh exteriors with cozy fluted timber dining booths and 24-hr cold fermented dough.
          </p>
        </div>

        {/* 3 Architectural Showcase Cards */}
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

        {/* Live Stats Counter Grid */}
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
    </div>
  );
};
