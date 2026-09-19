import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, Utensils, Flame, ShoppingBag, User, ChefHat, LogOut } from 'lucide-react';

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, totalCartCount, setIsCartOpen } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);

  // Hide mobile bottom navigation dock completely when in Admin Portal mode
  if (activeTab === 'admin') return null;

  return (
    <>
      {/* Mobile Profile Action Sheet / Menu */}
      {showMobileProfileMenu && user && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div 
            className="fixed inset-0"
            onClick={() => setShowMobileProfileMenu(false)}
          />
          <div className="relative w-full bg-[#181B1E] border-t border-[#23272B] rounded-t-3xl p-6 space-y-4 z-10 shadow-2xl">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#23272B]">
              <div className="w-12 h-12 rounded-2xl bg-[#E8590C] flex items-center justify-center text-white font-black text-lg">
                {user.role === 'admin' ? <ChefHat className="w-6 h-6" /> : (user.name?.charAt(0).toUpperCase() || 'U')}
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">{user.name}</h4>
                <p className="text-xs text-emerald-400 font-semibold">{user.phone === 'admin' ? 'Kitchen Admin Access' : user.phone}</p>
              </div>
            </div>

            {user.role === 'admin' && (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setShowMobileProfileMenu(false);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 py-3 rounded-2xl font-bold text-xs uppercase"
              >
                <ChefHat className="w-4 h-4" />
                <span>Go to Kitchen Portal</span>
              </button>
            )}

            <button
              onClick={() => {
                logout();
                setShowMobileProfileMenu(false);
                if (activeTab === 'admin') setActiveTab('home');
              }}
              className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-2xl font-bold text-xs uppercase"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <button
              onClick={() => setShowMobileProfileMenu(false)}
              className="w-full py-2.5 text-xs text-gray-400 font-bold uppercase text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121417]/95 backdrop-blur-lg border-t border-[#23272B] px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'home' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Home</span>
          </button>

          {/* Menu */}
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'menu' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Menu</span>
          </button>

          {/* Deals */}
          <button
            onClick={() => setActiveTab('deals')}
            className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'deals' ? 'text-[#E8590C]' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Flame className="w-5 h-5 text-[#FF922B] animate-pulse" />
            <span className="text-[10px] font-bold mt-1">Deals</span>
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#E8590C]" />
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center w-14 py-1 rounded-xl text-gray-400 hover:text-gray-200 cursor-pointer"
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

          {/* Account / Login */}
          <button
            onClick={() => {
              if (user) {
                setShowMobileProfileMenu(true);
              } else {
                openAuthModal();
              }
            }}
            className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-gray-400 hover:text-gray-200 cursor-pointer"
          >
            {user ? (
              <div className="w-5 h-5 rounded-full bg-[#E8590C] text-white flex items-center justify-center text-[10px] font-black">
                {user.role === 'admin' ? '⚙️' : user.name?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User className="w-5 h-5 text-[#FF922B]" />
            )}
            <span className="text-[10px] font-bold mt-1 text-white truncate max-w-[50px]">
              {user ? 'Account' : 'Login'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
