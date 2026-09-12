import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, Flame, CupSoda, Utensils, Pizza } from 'lucide-react';

export const DealCustomizerModal = () => {
  const { dealModal, setDealModal, addToCart } = useCart();
  const deal = dealModal.deal;

  const [selectedDrink, setSelectedDrink] = useState(
    deal?.customizableOptions?.drinkOptions?.[0] || 'Default Drink'
  );
  const [selectedDip, setSelectedDip] = useState(
    deal?.customizableOptions?.dipOptions?.[0] || 'Garlic Aioli'
  );
  const [selectedCrust, setSelectedCrust] = useState(
    deal?.customizableOptions?.crustOptions?.[0] || 'Standard Stuffed Crust'
  );

  if (!dealModal.isOpen || !deal) return null;

  const handleAddDealToCart = () => {
    addToCart(deal, null, {
      drink: selectedDrink,
      dip: selectedDip,
      crust: selectedCrust
    });
    setDealModal({ isOpen: false, deal: null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#181B1E] border border-[#23272B] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-scale-up">
        
        {/* Header Banner Image */}
        <div className="relative h-48">
          <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181B1E] via-[#181B1E]/40 to-transparent" />
          
          <button
            onClick={() => setDealModal({ isOpen: false, deal: null })}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-[#E8590C] text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#E8590C] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              {deal.discountRibbon}
            </span>
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight mt-1">
              {deal.title}
            </h3>
          </div>
        </div>

        {/* Modal Body Options */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Drink Option */}
          {deal.customizableOptions?.drinkOptions?.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase text-amber-300 mb-2">
                <CupSoda className="w-4 h-4" />
                <span>Select Beverage Choice:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {deal.customizableOptions.drinkOptions.map(drink => (
                  <button
                    key={drink}
                    onClick={() => setSelectedDrink(drink)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedDrink === drink
                        ? 'bg-[#E8590C]/15 border-[#E8590C] text-white'
                        : 'bg-[#121417] border-[#23272B] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{drink}</span>
                      {selectedDrink === drink && <Check className="w-4 h-4 text-[#E8590C]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dip Sauce Option */}
          {deal.customizableOptions?.dipOptions?.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase text-amber-300 mb-2">
                <Utensils className="w-4 h-4" />
                <span>Select Dip Sauce:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {deal.customizableOptions.dipOptions.map(dip => (
                  <button
                    key={dip}
                    onClick={() => setSelectedDip(dip)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedDip === dip
                        ? 'bg-[#E8590C]/15 border-[#E8590C] text-white'
                        : 'bg-[#121417] border-[#23272B] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{dip}</span>
                      {selectedDip === dip && <Check className="w-4 h-4 text-[#E8590C]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Crust Option */}
          {deal.customizableOptions?.crustOptions?.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-black uppercase text-amber-300 mb-2">
                <Pizza className="w-4 h-4" />
                <span>Select Pizza Crust:</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {deal.customizableOptions.crustOptions.map(crust => (
                  <button
                    key={crust}
                    onClick={() => setSelectedCrust(crust)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedCrust === crust
                        ? 'bg-[#E8590C]/15 border-[#E8590C] text-white'
                        : 'bg-[#121417] border-[#23272B] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{crust}</span>
                      {selectedCrust === crust && <Check className="w-4 h-4 text-[#E8590C]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Confirm Button */}
        <div className="p-4 bg-[#121417] border-t border-[#23272B] flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400">Deal Price</span>
            <span className="font-display font-black text-2xl text-[#FF922B]">
              ${deal.dealPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddDealToCart}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-yellow-300" />
            <span>Add Deal To Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
