import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus, Sparkles, Flame } from 'lucide-react';

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
    <div className="group bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/60 shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden bg-black/40">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181B1E] via-transparent to-transparent opacity-90" />

        {/* Tag Badge */}
        {dish.tag && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>{dish.tag}</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-[#121417]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-yellow-400 flex items-center space-x-1 border border-[#23272B]">
          <Star className="w-3.5 h-3.5 fill-yellow-400" />
          <span>{dish.rating}</span>
        </div>

        {/* Spice level */}
        {dish.spiceLevel !== 'none' && (
          <div className="absolute top-3 right-3 bg-[#121417]/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border border-[#23272B]">
            {dish.spiceLevel === 'fiery' ? '🔥 Fiery' : dish.spiceLevel === 'spicy' ? '🌶️ Spicy' : '🌿 Mild'}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-lg font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-tight mb-2">
            {dish.name}
          </h3>

          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
            {dish.description}
          </p>

          {/* Variant / Crust Selector Dropdown */}
          {dish.variants && dish.variants.length > 0 && (
            <div className="mb-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                Choose Portion / Crust:
              </label>
              <select
                value={selectedVariant ? selectedVariant.id : ''}
                onChange={e => {
                  const found = dish.variants.find(v => v.id === e.target.value);
                  setSelectedVariant(found);
                }}
                className="w-full bg-[#121417] border border-[#23272B] text-gray-200 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-[#E8590C]"
              >
                {dish.variants.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} {v.priceModifier !== 0 ? `(${v.priceModifier > 0 ? '+' : ''}$${v.priceModifier.toFixed(2)})` : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#23272B]">
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400">Total Price</span>
            <span className="font-display font-black text-2xl text-[#FF922B]">
              ${computedPrice.toFixed(2)}
            </span>
          </div>

          {/* Quantity Controller / Add Button */}
          {inCartItem ? (
            <div className="flex items-center bg-[#23272B] rounded-xl border border-[#E8590C]/60 p-1 space-x-2">
              <button
                onClick={() => updateQuantity(inCartItem.cartItemId, -1)}
                className="w-8 h-8 bg-[#121417] hover:bg-[#E8590C] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-black text-white px-2">
                {inCartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(inCartItem.cartItemId, 1)}
                className="w-8 h-8 bg-[#E8590C] hover:bg-[#D9480F] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(dish, selectedVariant)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/25 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
