import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus } from 'lucide-react';

export const FoodCard = ({ dish }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    dish.variants ? dish.variants[0] : null
  );

  const variantName = selectedVariant ? selectedVariant.name : 'Standard';
  const priceModifier = selectedVariant ? (selectedVariant.priceModifier || 0) : 0;
  const computedPrice = Math.max(0, dish.price + priceModifier);

  const cartItemId = `${dish.id}_${variantName}__`;
  const inCartItem = cart.find(i => i.cartItemId === cartItemId || i.id === dish.id);

  return (
    <div className="group bg-[#16181B] rounded-2xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Sleek Compact Image Header */}
      <div className="relative h-28 sm:h-36 overflow-hidden bg-black/50">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16181B] via-transparent to-transparent opacity-80" />

        {/* Tag Badge */}
        {dish.tag && (
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow">
            {dish.tag}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-[#121417]/85 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold text-yellow-400 flex items-center space-x-0.5 border border-[#23272B]">
          <Star className="w-2.5 h-2.5 fill-yellow-400" />
          <span>{dish.rating}</span>
        </div>

        {/* Spice level */}
        {dish.spiceLevel !== 'none' && (
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-[#121417]/85 backdrop-blur-md text-amber-300 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase border border-[#23272B]">
            {dish.spiceLevel === 'fiery' ? '🔥 Fiery' : dish.spiceLevel === 'spicy' ? '🌶️ Spicy' : '🌿 Mild'}
          </div>
        )}
      </div>

      {/* Sleek Compact Content */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xs sm:text-sm font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-snug line-clamp-1 mb-1">
            {dish.name}
          </h3>

          <p className="text-gray-400 text-[9px] sm:text-[10px] leading-relaxed line-clamp-2 mb-2">
            {dish.description}
          </p>

          {/* Compact Portion Selector */}
          {dish.variants && dish.variants.length > 0 && (
            <div className="mb-2">
              <select
                value={selectedVariant ? selectedVariant.id : ''}
                onChange={e => {
                  const found = dish.variants.find(v => v.id === e.target.value);
                  setSelectedVariant(found);
                }}
                className="w-full bg-[#121417] border border-[#23272B] text-gray-300 text-[9px] sm:text-[10px] font-semibold rounded-lg px-1.5 sm:px-2 py-1 outline-none focus:border-[#E8590C] cursor-pointer truncate"
              >
                {dish.variants.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} {v.priceModifier !== 0 ? `(${v.priceModifier > 0 ? '+' : '-'}Rs. ${Math.abs(v.priceModifier)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Compact Price & Action Button */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#23272B] mt-auto">
          <div>
            <span className="block text-[7px] sm:text-[8px] uppercase font-bold text-gray-400">Price</span>
            <span className="font-display font-black text-sm sm:text-base text-[#FF922B] leading-none">
              Rs. {Math.round(computedPrice).toLocaleString()}
            </span>
          </div>

          <div>
            {inCartItem ? (
              <div className="flex items-center space-x-1 bg-[#121417] p-0.5 sm:p-1 rounded-xl border border-[#23272B]">
                <button
                  onClick={() => updateQuantity(inCartItem.cartItemId, inCartItem.quantity - 1)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#23272B] hover:bg-[#E8590C] text-white flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="font-display font-black text-xs text-white px-1 sm:px-1.5">
                  {inCartItem.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(inCartItem.cartItemId, inCartItem.quantity + 1)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#E8590C] hover:bg-[#D9480F] text-white flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(dish, selectedVariant)}
                className="bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white p-1.5 sm:p-2 rounded-xl text-xs font-black shadow hover:scale-105 active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline uppercase text-[10px]">Add</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
