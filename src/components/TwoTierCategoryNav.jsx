import React from 'react';
import { TIER1_CATEGORIES, TIER2_SUB_CATEGORIES } from '../data/menuData';
import { motion } from 'framer-motion';

export const TwoTierCategoryNav = ({
  activeTier1,
  setActiveTier1,
  activeTier2,
  setActiveTier2
}) => {
  const currentSubCategories = TIER2_SUB_CATEGORIES[activeTier1] || [];

  const handleTier1Click = (catId) => {
    setActiveTier1(catId);
    const defaultSub = TIER2_SUB_CATEGORIES[catId]?.[0] || 'All';
    setActiveTier2(defaultSub);
  };

  return (
    <div className="sticky top-[80px] z-30 w-full shadow-2xl">
      {/* Tier 1: Main Category Pills Bar */}
      <div className="bg-[#121417]/95 backdrop-blur-md py-3 border-b border-[#23272B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-0.5">
            {TIER1_CATEGORIES.map((cat) => {
              const isSelected = activeTier1 === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleTier1Click(cat.id)}
                  className={`relative flex items-center space-x-2 shrink-0 px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white border-[#FF922B] shadow-[0_0_20px_rgba(232,89,12,0.4)] scale-105'
                      : 'bg-[#181B1E] text-gray-300 border-[#23272B] hover:border-[#E8590C]/50 hover:bg-[#23272B] hover:text-white'
                  }`}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tier 2: Sub-Category Bar (Dark Matte Charcoal #1A1D20) */}
      <div className="bg-[#1A1D20] py-2.5 border-b border-[#23272B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {currentSubCategories.map((subCat) => {
              const isSubSelected = activeTier2 === subCat;

              return (
                <button
                  key={subCat}
                  onClick={() => setActiveTier2(subCat)}
                  className={`relative px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSubSelected
                      ? 'bg-[#E8590C] text-white shadow-md font-extrabold'
                      : 'text-gray-400 hover:text-white hover:bg-[#23272B]'
                  }`}
                >
                  {subCat}
                  {isSubSelected && (
                    <motion.div
                      layoutId="subCatActive"
                      className="absolute inset-0 bg-[#E8590C] rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
