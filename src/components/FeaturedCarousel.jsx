import React from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { Flame, Star, Plus, Check, Sparkles, Clock, Flame as FireIcon } from 'lucide-react';

export const FeaturedCarousel = () => {
  const { cart, addToCart, updateQuantity, setActiveTab } = useCart();

  // Filter trending bestsellers
  const bestsellers = MENU_ITEMS.filter(item => item.tag === 'Bestseller' || item.tag === "Chef's Pick").slice(0, 6);

  return (
    <section className="py-12 bg-mesh-pattern border-b border-[#23272B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-[#E8590C] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-[#E8590C]">
                TRENDING BESTSELLERS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
              Crowd Favorites
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('menu')}
            className="text-xs font-extrabold uppercase tracking-wider text-amber-400 hover:text-white transition-colors bg-[#181B1E] px-4 py-2 rounded-xl border border-[#23272B] hover:border-[#E8590C]/50"
          >
            View All Dishes
          </button>
        </div>

        {/* Bestsellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((dish) => {
            const defaultVariant = dish.variants ? dish.variants[0] : null;
            const variantName = defaultVariant ? defaultVariant.name : 'Standard';
            const cartItemId = `${dish.id}_${variantName}__`;
            const inCartItem = cart.find(i => i.cartItemId === cartItemId || i.id === dish.id);

            return (
              <div
                key={dish.id}
                className="group relative bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-black/40">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181B1E] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  {dish.tag && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      <span>{dish.tag}</span>
                    </div>
                  )}

                  {/* Spice Level Badge */}
                  {dish.spiceLevel === 'fiery' && (
                    <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 border border-red-400/30">
                      <FireIcon className="w-3 h-3" />
                      <span>Fiery Hot</span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 bg-[#121417]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-yellow-400 flex items-center space-x-1 border border-[#23272B]">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-tight mb-2">
                      {dish.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#23272B]/80">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400">Starting from</span>
                      <span className="font-display font-black text-xl text-[#FF922B]">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controller / Add Button */}
                    {inCartItem ? (
                      <div className="flex items-center bg-[#23272B] rounded-xl border border-[#E8590C]/50 p-1 space-x-2">
                        <button
                          onClick={() => updateQuantity(inCartItem.cartItemId, -1)}
                          className="w-7 h-7 bg-[#121417] hover:bg-[#E8590C] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-white px-1">
                          {inCartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(inCartItem.cartItemId, 1)}
                          className="w-7 h-7 bg-[#E8590C] hover:bg-[#D9480F] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(dish, defaultVariant)}
                        className="flex items-center space-x-1.5 bg-[#E8590C] hover:bg-[#D9480F] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/25 hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add To Cart</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
