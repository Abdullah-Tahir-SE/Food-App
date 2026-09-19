import React from 'react';
import { useCart } from '../context/CartContext';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';

export const DealCard = ({ deal }) => {
  const { setDealModal } = useCart();

  return (
    <div className="group bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/70 shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col sm:flex-row">
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
            <span>Customize Deal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
