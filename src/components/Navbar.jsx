import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  ChevronDown, 
  UtensilsCrossed, 
  Flame, 
  User, 
  LogOut, 
  ChefHat, 
  Phone 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    totalCartCount, 
    activeTab, 
    setActiveTab, 
    setIsCartOpen 
  } = useCart();

  const { user, logout, openAuthModal } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121417]/95 backdrop-blur-md border-b border-[#23272B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center space-x-3 group focus:outline-none cursor-pointer"
            >
              {/* Glowing Crust Emblem */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8590C] to-[#D9480F] shadow-[0_0_20px_rgba(232,89,12,0.5)] group-hover:scale-105 transition-transform duration-300">
                <UtensilsCrossed className="w-6 h-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF922B] rounded-full border-2 border-[#121417] flex items-center justify-center">
                  <span className="block w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>
              </div>

              <div className="text-left">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-white uppercase block leading-none">
                  FOOD <span className="text-[#E8590C]">CART</span>
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 font-bold uppercase block mt-1">
                  CRUNCH & DELIGHT
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'home' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'menu' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Menu
              </button>

              <button
                onClick={() => setActiveTab('deals')}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer ${
                  activeTab === 'deals' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-[#FF922B] animate-pulse" />
                <span>Top Deals</span>
                <span className="absolute -top-1 -right-1 bg-[#E8590C] text-white text-[9px] font-black px-1 rounded-full">
                  HOT
                </span>
              </button>

              <button
                onClick={() => setActiveTab('story')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'story' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Our Story
              </button>
            </nav>
          </div>

          {/* Right Action: Auth & Cart */}
          <div className="flex items-center space-x-3">
            
            {/* 1. Auth Controls */}
            {user ? (
              /* Logged In Account Pill with Dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-[#181B1E] hover:bg-[#23272B] border border-[#23272B] hover:border-[#E8590C]/50 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8590C] to-[#D9480F] flex items-center justify-center text-white font-black text-xs shadow">
                    {user.role === 'admin' ? (
                      <ChefHat className="w-4 h-4" />
                    ) : (
                      <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                    )}
                  </div>
                  <span className="max-w-[100px] sm:max-w-[120px] truncate font-extrabold">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Account Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#181B1E] border border-[#23272B] rounded-2xl shadow-2xl py-3 z-50 animate-fade-in">
                    {/* User Info Header */}
                    <div className="px-4 pb-3 border-b border-[#23272B]">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-white block truncate">
                          {user.name}
                        </span>
                        {user.role === 'admin' && (
                          <span className="bg-amber-500/20 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded border border-amber-500/30 uppercase">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold mt-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{user.phone === 'admin' ? 'Kitchen Admin Access' : user.phone}</span>
                      </div>
                    </div>

                    {/* Admin Portal Quick Switch */}
                    {user.role === 'admin' && (
                      <div className="p-2 border-b border-[#23272B]">
                        <button
                          onClick={() => {
                            setActiveTab('admin');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'admin' 
                              ? 'bg-[#E8590C] text-white' 
                              : 'text-amber-300 hover:bg-[#23272B]'
                          }`}
                        >
                          <ChefHat className="w-4 h-4" />
                          <span>Kitchen Admin Dashboard</span>
                        </button>
                      </div>
                    )}

                    {/* Logout Option */}
                    <div className="pt-2 px-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest "Login / Sign Up" Button */
              <button
                onClick={() => openAuthModal()}
                className="flex items-center space-x-2 bg-[#181B1E] hover:bg-[#23272B] border border-[#23272B] hover:border-[#E8590C]/60 text-white px-3 sm:px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <User className="w-4 h-4 text-[#FF922B]" />
                <span className="hidden sm:inline">Login / Sign Up</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* 2. Cart Button / Kitchen Portal Active Badge */}
            {activeTab === 'admin' ? (
              <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="hidden sm:inline">👨‍🍳 Kitchen Portal</span>
                <span className="sm:hidden">Admin</span>
              </div>
            ) : (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-2.5 bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-lg shadow-[#E8590C]/30 hover:scale-105 transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline uppercase">Cart</span>
                {totalCartCount > 0 ? (
                  <span className="bg-white text-[#E8590C] px-2 py-0.5 rounded-full font-black text-xs animate-bounce shadow-md">
                    {totalCartCount}
                  </span>
                ) : (
                  <span className="bg-black/20 text-white/80 px-1.5 py-0.5 rounded-full font-bold text-xs">
                    0
                  </span>
                )}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
