import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Utensils, Flame, ShoppingBag } from 'lucide-react';

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, totalCartCount, setIsCartOpen } = useCart();

  // Hide mobile bottom navigation dock completely when in Admin Portal mode
  if (activeTab === 'admin') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121417]/95 backdrop-blur-lg border-t border-[#23272B] px-4 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        {/* Menu */}
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'menu' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Menu</span>
        </button>

        {/* Deals */}
        <button
          onClick={() => setActiveTab('deals')}
          className={`relative flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'deals' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Flame className="w-5 h-5 text-[#FF922B] animate-pulse" />
          <span className="text-[10px] font-bold mt-1">Deals</span>
          <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-[#E8590C]" />
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center w-16 py-1 rounded-xl text-gray-400 hover:text-gray-200 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-white" />
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-3.5 bg-[#E8590C] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#121417] animate-bounce">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 text-white">Cart</span>
        </button>
      </div>
    </div>
  );
};
