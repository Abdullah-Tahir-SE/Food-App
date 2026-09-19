import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, CATEGORIES, SPICE_LEVELS } from '../data/menuData';
import { 
  Search, 
  Filter, 
  Flame, 
  Star, 
  Plus, 
  Minus, 
  Sparkles, 
  Flame as FireIcon, 
  SlidersHorizontal,
  ChevronDown,
  Info
} from 'lucide-react';

export const MenuPage = () => {
  const { cart, addToCart, updateQuantity } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high'
  const [selectedVariants, setSelectedVariants] = useState({}); // { itemId: variantId }

  // Handle variant selection change per item
  const handleVariantChange = (itemId, variantObj) => {
    setSelectedVariants(prev => ({
      ...prev,
      [itemId]: variantObj
    }));
  };

  // Filtered & Sorted Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // 1. Category Filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // 2. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tag ? item.tag.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      // 3. Spice Level
      if (selectedSpice !== 'all' && item.spiceLevel !== selectedSpice) {
        return false;
      }
      // 4. Max Price
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.rating - a.rating; // default popularity/rating
    });
  }, [activeCategory, searchQuery, selectedSpice, maxPrice, sortBy]);

  return (
    <div className="py-8 bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/30 px-3.5 py-1 rounded-full mb-3">
            <Flame className="w-4 h-4 text-[#E8590C]" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              EXPLORE OUR FAST-FOOD CATALOG
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            CRAVINGS CATALOG & <span className="text-gradient-orange">MENU</span>
          </h1>
        </div>

        {/* Sticky Top Category Bar */}
        <div className="sticky top-[80px] z-30 bg-[#121417]/95 backdrop-blur-md py-3 border-y border-[#23272B] mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white shadow-lg shadow-[#E8590C]/30 scale-105'
                    : 'bg-[#181B1E] text-gray-300 hover:bg-[#23272B] hover:text-white border border-[#23272B]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#181B1E] p-4 sm:p-6 rounded-3xl border border-[#23272B] shadow-2xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Live Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pizza, burger, tenders..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
              />
            </div>

            {/* Spice Level Selector */}
            <div className="flex items-center space-x-1 bg-[#121417] p-1 rounded-xl border border-[#23272B]">
              {SPICE_LEVELS.map(spice => (
                <button
                  key={spice.id}
                  onClick={() => setSelectedSpice(spice.id)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                    selectedSpice === spice.id
                      ? 'bg-[#E8590C] text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {spice.label}
                </button>
              ))}
            </div>

            {/* Price Filter Slider */}
            <div className="bg-[#121417] px-4 py-2 rounded-xl border border-[#23272B] flex flex-col justify-center">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase mb-1">
                <span>Max Price:</span>
                <span className="text-[#FF922B] font-black">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E8590C] cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs font-bold rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer"
              >
                <option value="popular">Sort: Popularity & Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const currentVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : null);
              const variantName = currentVariant ? currentVariant.name : 'Standard';
              const priceModifier = currentVariant ? (currentVariant.priceModifier || 0) : 0;
              const computedPrice = Math.max(0, item.price + priceModifier);

              const cartItemId = `${item.id}_${variantName}__`;
              const inCartItem = cart.find(i => i.cartItemId === cartItemId);

              return (
                <div
                  key={item.id}
                  className="group bg-[#181B1E] rounded-3xl overflow-hidden border border-[#23272B] hover:border-[#E8590C]/60 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181B1E] via-transparent to-transparent opacity-90" />

                    {/* Tag Badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                        <span>{item.tag}</span>
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#121417]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-yellow-400 flex items-center space-x-1 border border-[#23272B]">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{item.rating}</span>
                    </div>

                    {/* Spice indicator */}
                    {item.spiceLevel !== 'none' && (
                      <div className="absolute top-3 right-3 bg-[#121417]/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border border-[#23272B]">
                        {item.spiceLevel === 'fiery' ? '🔥 Fiery' : item.spiceLevel === 'spicy' ? '🌶️ Spicy' : '🌿 Mild'}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display text-lg font-black text-white uppercase tracking-tight group-hover:text-[#E8590C] transition-colors leading-tight">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {/* Variant Selector Dropdown */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mb-4">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                            Choose Crust / Portion:
                          </label>
                          <select
                            value={currentVariant ? currentVariant.id : ''}
                            onChange={e => {
                              const found = item.variants.find(v => v.id === e.target.value);
                              handleVariantChange(item.id, found);
                            }}
                            className="w-full bg-[#121417] border border-[#23272B] text-gray-200 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-[#E8590C]"
                          >
                            {item.variants.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name} {v.priceModifier !== 0 ? `(${v.priceModifier > 0 ? '+' : '-'}Rs. ${Math.abs(v.priceModifier)})` : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#23272B]">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-400">Total Price</span>
                        <span className="font-display font-black text-2xl text-[#FF922B]">
                          Rs. {Math.round(computedPrice).toLocaleString()}
                        </span>
                      </div>

                      {/* Button Morphing */}
                      {inCartItem ? (
                        <div className="flex items-center bg-[#23272B] rounded-xl border border-[#E8590C]/60 p-1 space-x-2">
                          <button
                            onClick={() => updateQuantity(inCartItem.cartItemId, -1)}
                            className="w-8 h-8 bg-[#121417] hover:bg-[#E8590C] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-white px-2">
                            {inCartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(inCartItem.cartItemId, 1)}
                            className="w-8 h-8 bg-[#E8590C] hover:bg-[#D9480F] text-white rounded-lg font-black text-sm flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, currentVariant)}
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
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#181B1E] rounded-3xl border border-[#23272B]">
            <Info className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-xl font-black uppercase text-white mb-2">No Matching Dishes Found</h3>
            <p className="text-gray-400 text-xs mb-4">Try clearing your search query or adjusting your filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSpice('all');
                setMaxPrice(3000);
              }}
              className="bg-[#E8590C] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
