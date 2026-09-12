import React from 'react';
import { useCart } from '../context/CartContext';
import { Flame, ArrowRight, ShieldCheck, Zap, Award, Sparkles, Star } from 'lucide-react';

export const Hero = () => {
  const { setActiveTab, setIsCartOpen } = useCart();

  return (
    <section className="relative overflow-hidden bg-mesh-pattern pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#23272B]">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8590C]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#FF922B]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/40 px-4 py-2 rounded-full mb-6 shadow-xl shadow-[#E8590C]/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF922B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8590C]" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                🔥 Hot & Fresh Fast Express
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
              CRUNCH THE BITE, <br />
              <span className="text-gradient-orange drop-shadow-[0_5px_25px_rgba(232,89,12,0.4)]">
                TASTE THE DELIGHT
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience hand-crafted 24-hr fermented stuffed crust pizzas, double-stacked crispy zinger burgers, and 11-spice secret fried chicken delivered piping hot to your door in 30 mins!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <button
                onClick={() => setActiveTab('menu')}
                className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] text-white px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(232,89,12,0.4)] hover:shadow-[0_0_45px_rgba(232,89,12,0.7)] hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <Flame className="w-5 h-5 animate-pulse text-yellow-300" />
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('deals')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#181B1E] hover:bg-[#23272B] text-white border border-[#23272B] hover:border-[#E8590C]/60 px-8 py-4 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Explore Super Deals</span>
              </button>
            </div>

            {/* Delivery Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#23272B]/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-left bg-[#181B1E]/60 p-2.5 rounded-xl border border-[#23272B]">
                <Zap className="w-6 h-6 text-[#FF922B] shrink-0" />
                <div>
                  <span className="block text-xs font-black text-white uppercase">30 Mins</span>
                  <span className="block text-[10px] text-gray-400">Express Delivery</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-left bg-[#181B1E]/60 p-2.5 rounded-xl border border-[#23272B]">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-xs font-black text-white uppercase">100% Fresh</span>
                  <span className="block text-[10px] text-gray-400">Fermented Dough</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-left bg-[#181B1E]/60 p-2.5 rounded-xl border border-[#23272B]">
                <Award className="w-6 h-6 text-yellow-400 shrink-0" />
                <div>
                  <span className="block text-xs font-black text-white uppercase">Piping Hot</span>
                  <span className="block text-[10px] text-gray-400">Quality Guarantee</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Showcase Dish with Steam Effect & Aura */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Ambient Aura Ring */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-[#E8590C]/40 animate-spin-slow pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-tr from-[#E8590C]/30 to-transparent blur-xl pointer-events-none" />

            {/* Rising Steam Simulated Particles */}
            <div className="absolute -top-10 flex space-x-6 z-20 pointer-events-none">
              <span className="w-3 h-10 bg-white/20 rounded-full blur-md animate-steam" />
              <span className="w-4 h-12 bg-white/30 rounded-full blur-md animate-steam delay-300" />
              <span className="w-2 h-8 bg-white/20 rounded-full blur-md animate-steam delay-700" />
            </div>

            {/* Main Hero Image Frame */}
            <div className="relative z-10 p-3 rounded-full bg-gradient-to-b from-[#E8590C]/40 to-[#23272B]/60 shadow-[0_0_60px_rgba(232,89,12,0.4)] animate-float">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
                alt="Stuffed Crust Pizza & Crispy Chicken Combo"
                className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] object-cover rounded-full border-4 border-[#E8590C]"
              />

              {/* Floating Floating Rating Badge */}
              <div className="absolute top-4 -right-2 bg-[#181B1E]/90 backdrop-blur-md border border-[#E8590C] px-3.5 py-2 rounded-2xl shadow-xl flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" />
                <div>
                  <span className="block text-xs font-black text-white">4.9 / 5.0</span>
                  <span className="block text-[9px] text-gray-400 uppercase font-bold">12K+ Foodie Reviews</span>
                </div>
              </div>

              {/* Floating Bestseller Tag */}
              <div className="absolute -bottom-4 left-4 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-4 py-2 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-wider flex items-center space-x-1.5 border border-amber-300/40">
                <Flame className="w-4 h-4 text-yellow-300" />
                <span>Gourmet Stuffed Crust</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
