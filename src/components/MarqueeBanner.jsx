import React from 'react';
import { Flame, Sparkles, ShieldCheck } from 'lucide-react';

export const MarqueeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] text-white py-1.5 px-4 overflow-hidden text-xs font-bold tracking-wide shadow-md select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
        <span className="flex items-center gap-2">
          <Flame className="w-4 h-4 animate-bounce text-yellow-300" /> 
          CRUNCHY SPECIALS • 30-MIN HOT & FRESH EXPRESS DELIVERY
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-200" /> 
          USE PROMO CODE: <span className="bg-black/30 px-2 py-0.5 rounded border border-yellow-300/40 text-yellow-300 font-extrabold">FOODCART20</span> FOR 20% OFF!
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-300" /> 
          100% FRESH DOUGH & HALAL INGREDIENTS GUARANTEED
        </span>
        <span className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-yellow-300" /> 
          TRY OUR NEW GOURMET STUFFED CRUST PIZZAS!
        </span>
        {/* Looping twin set */}
        <span className="flex items-center gap-2">
          <Flame className="w-4 h-4 animate-bounce text-yellow-300" /> 
          CRUNCHY SPECIALS • 30-MIN HOT & FRESH EXPRESS DELIVERY
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-200" /> 
          USE PROMO CODE: <span className="bg-black/30 px-2 py-0.5 rounded border border-yellow-300/40 text-yellow-300 font-extrabold">FOODCART20</span> FOR 20% OFF!
        </span>
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-300" /> 
          100% FRESH DOUGH & HALAL INGREDIENTS GUARANTEED
        </span>
      </div>
    </div>
  );
};
