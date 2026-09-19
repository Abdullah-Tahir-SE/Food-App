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
      <div className="relative h-32 sm:h-36 overflow-hidden bg-black/50">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16181B] via-transparent to-transparent opacity-80" />

        {/* Tag Badge */}
        {dish.tag && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow">
            {dish.tag}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-2 right-2 bg-[#121417]/85 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] font-bold text-yellow-400 flex items-center space-x-0.5 border border-[#23272B]">
          <Star className="w-2.5 h-2.5 fill-yellow-400" />
          <span>{dish.rating}</span>
        </div>

        {/* Spice level */}
        {dish.spiceLevel !== 'none' && (
          <div className="absolute top-2 right-2 bg-[#121417]/85 backdrop-blur-md text-amber-300 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase border border-[#23272B]">
            {dish.spiceLevel === 'fiery' ? '🔥 Fiery' : dish.spiceLevel === 'spicy' ? '🌶️ Spicy' : '🌿 Mild'}
          </div>
        )}
      </div>

      {/* Sleek Compact Content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xs sm:text-sm font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-snug line-clamp-1 mb-1">
            {dish.name}
          </h3>

          <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2 mb-2">
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
                className="w-full bg-[#121417] border border-[#23272B] text-gray-300 text-[10px] font-semibold rounded-lg px-2 py-1 outline-none focus:border-[#E8590C] cursor-pointer truncate"
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
        <div className="flex items-center justify-between pt-2 border-t border-[#23272B] mt-auto">
          <div>
            <span className="block text-[8px] uppercase font-bold text-gray-400">Price</span>
            <span className="font-display font-black text-base sm:text-lg text-[#FF922B] leading-none">
              Rs. {Math.round(computedPrice).toLocaleString()}
            </span>
          </div>

          {/* Quantity Controller / Add Button */}
          {inCartItem ? (
            <div className="flex items-center bg-[#23272B] rounded-xl border border-[#E8590C]/60 p-0.5 space-x-1">
              <button
                onClick={() => updateQuantity(inCartItem.cartItemId, -1)}
                className="w-6 h-6 bg-[#121417] hover:bg-[#E8590C] text-white rounded-lg font-black text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-black text-white px-1.5">
                {inCartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(inCartItem.cartItemId, 1)}
                className="w-6 h-6 bg-[#E8590C] hover:bg-[#D9480F] text-white rounded-lg font-black text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(dish, selectedVariant)}
              className="flex items-center space-x-1 bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-2.5 py-1.5 rounded-xl font-extrabold text-[10px] uppercase tracking-wider shadow-md shadow-[#E8590C]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
