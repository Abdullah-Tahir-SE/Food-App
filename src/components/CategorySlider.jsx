import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/menuData';
import { 
  Pizza, 
  Flame, 
  UtensilsCrossed, 
  CupSoda, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

// Icon mapping helper
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'Pizza': return <Pizza className="w-5 h-5" />;
    case 'Burger': return <span className="text-lg leading-none">🍔</span>;
    case 'Drumstick': return <span className="text-lg leading-none">🍗</span>;
    case 'Fries': return <span className="text-lg leading-none">🍟</span>;
    case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
    case 'CupSoda': return <CupSoda className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
};

export const CategorySlider = ({ selectedCategory, onSelectCategory }) => {
  const { setActiveTab } = useCart();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setActiveTab('menu');
    }
  };

  return (
    <section className="py-8 bg-[#121417] border-b border-[#23272B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#E8590C]">
              CRAVING CATEGORIES
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Explore By Flavor
            </h2>
          </div>

          <button 
            onClick={() => setActiveTab('menu')}
            className="flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-white transition-colors"
          >
            <span>Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Swipeable Pills Container */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-3 pt-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center space-x-3 shrink-0 px-5 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white border-[#FF922B] shadow-[0_0_20px_rgba(232,89,12,0.4)] scale-105'
                    : 'bg-[#181B1E] text-gray-300 border-[#23272B] hover:border-[#E8590C]/50 hover:bg-[#23272B] hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-[#23272B] text-[#E8590C]'}`}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${isSelected ? 'bg-black/30 text-white' : 'bg-black/40 text-gray-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
