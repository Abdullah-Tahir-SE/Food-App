import React, { useState, useMemo } from 'react';
import { TwoTierCategoryNav } from '../components/TwoTierCategoryNav';
import { FoodCard } from '../components/FoodCard';
import { MENU_ITEMS, SPICE_LEVELS } from '../data/menuData';
import { Search, Flame, ChevronDown, Info } from 'lucide-react';

export const MenuPage = () => {
  const [activeTier1, setActiveTier1] = useState('pizzas');
  const [activeTier2, setActiveTier2] = useState('All Pizzas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high'

  // Filtered & Sorted Menu Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // 1. Tier 1 Category Filter
      if (item.category !== activeTier1) return false;

      // 2. Tier 2 Sub-Category Filter
      if (activeTier2 && !activeTier2.startsWith('All') && item.subCategory !== activeTier2) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tag ? item.tag.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      // 4. Spice Level
      if (selectedSpice !== 'all' && item.spiceLevel !== selectedSpice) {
        return false;
      }

      // 5. Max Price
      if (item.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [activeTier1, activeTier2, searchQuery, selectedSpice, maxPrice, sortBy]);

  return (
    <div className="bg-[#121417] min-h-screen pb-16">
      
      {/* Page Title Header */}
      <div className="py-8 text-center max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/30 px-3.5 py-1 rounded-full mb-3">
          <Flame className="w-4 h-4 text-[#E8590C]" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-300">
            FAST-FOOD CATALOG
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          CRAVINGS CATALOG & <span className="text-gradient-orange">MENU</span>
        </h1>
      </div>

      {/* 2-Tier Sticky Category Navigation */}
      <TwoTierCategoryNav
        activeTier1={activeTier1}
        setActiveTier1={setActiveTier1}
        activeTier2={activeTier2}
        setActiveTier2={setActiveTier2}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Advanced Filter Controls Toolbar */}
        <div className="bg-[#181B1E] p-4 sm:p-6 rounded-3xl border border-[#23272B] shadow-2xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Live Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pizza, burger, wings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
              />
            </div>

            {/* Spice Level Meter Selector */}
            <div className="flex items-center space-x-1 bg-[#121417] p-1 rounded-xl border border-[#23272B]">
              {SPICE_LEVELS.map(spice => (
                <button
                  key={spice.id}
                  onClick={() => setSelectedSpice(spice.id)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
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

        {/* Menu Item Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filteredItems.map(dish => (
              <FoodCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#181B1E] rounded-3xl border border-[#23272B]">
            <Info className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-xl font-black uppercase text-white mb-2">No Matching Dishes Found</h3>
            <p className="text-gray-400 text-xs mb-4">Try adjusting your sub-category, search query, or spice filters.</p>
            <button
              onClick={() => {
                setActiveTier2(TIER2_SUB_CATEGORIES[activeTier1]?.[0] || '');
                setSearchQuery('');
                setSelectedSpice('all');
                setMaxPrice(3000);
              }}
              className="bg-[#E8590C] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
