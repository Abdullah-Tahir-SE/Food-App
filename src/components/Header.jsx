import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  MapPin, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  UtensilsCrossed, 
  Tag, 
  TrendingUp,
  LayoutDashboard,
  Truck,
  Store
} from 'lucide-react';

const LOCATIONS = [
  'Gulberg III, Lahore',
  'Model Town, Lahore',
  'DHA Phase 5, Lahore',
  'University Town, Peshawar',
  'Johar Town, Lahore'
];

export const Header = () => {
  const { 
    cart, 
    totalCartCount, 
    orders, 
    activeTab, 
    setActiveTab, 
    setIsCartOpen,
    orderMode,
    setOrderMode,
    deliveryLocation,
    setDeliveryLocation
  } = useCart();

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Kitchen Preparing').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121417]/95 backdrop-blur-md border-b border-[#23272B]">
      {/* 1. Top Moving Marquee Ticker */}
      <div className="bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] text-white py-1.5 px-4 overflow-hidden text-xs font-bold tracking-wide shadow-md">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-8">
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 animate-bounce text-yellow-300" /> 
            CRUNCHY SPECIALS • 30-MIN HOT & FRESH EXPRESS DELIVERY
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-200" /> 
            USE PROMO CODE: <span className="bg-black/30 px-2 py-0.5 rounded border border-yellow-300/40 text-yellow-300 font-extrabold">FOODCART20</span> FOR 20% OFF!
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> 
            100% FRESH DOUGH & HALAL INGREDIENTS GUARANTEED
          </span>
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-yellow-300" /> 
            TRY OUR NEW GOURMET STUFFED CRUST PIZZAS!
          </span>
          {/* Duplicate set for seamless looping */}
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 animate-bounce text-yellow-300" /> 
            CRUNCHY SPECIALS • 30-MIN HOT & FRESH EXPRESS DELIVERY
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-200" /> 
            USE PROMO CODE: <span className="bg-black/30 px-2 py-0.5 rounded border border-yellow-300/40 text-yellow-300 font-extrabold">FOODCART20</span> FOR 20% OFF!
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> 
            100% FRESH DOUGH & HALAL INGREDIENTS GUARANTEED
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center space-x-3 group focus:outline-none"
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

            {/* Location Picker Dropdown */}
            <div className="hidden lg:relative lg:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center space-x-2 bg-[#181B1E] border border-[#23272B] hover:border-[#E8590C]/50 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E8590C]" />
                <span className="text-gray-400">Deliver to:</span>
                <span className="text-white max-w-[130px] truncate">{deliveryLocation}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-[#181B1E] border border-[#23272B] rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-[#23272B]">
                    Select Delivery Zone
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setDeliveryLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-[#E8590C]/10 flex items-center justify-between ${
                        deliveryLocation === loc ? 'text-[#E8590C] font-bold bg-[#E8590C]/5' : 'text-gray-300'
                      }`}
                    >
                      <span>{loc}</span>
                      {deliveryLocation === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#E8590C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Order Mode Switcher & Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Delivery vs Takeaway Switcher */}
            <div className="flex bg-[#181B1E] p-1 rounded-full border border-[#23272B]">
              <button
                onClick={() => setOrderMode('delivery')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  orderMode === 'delivery'
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white shadow-lg shadow-[#E8590C]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setOrderMode('takeaway')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  orderMode === 'takeaway'
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white shadow-lg shadow-[#E8590C]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  activeTab === 'home' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  activeTab === 'menu' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Menu
              </button>

              <button
                onClick={() => setActiveTab('deals')}
                className={`relative px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center space-x-1 ${
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
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  activeTab === 'story' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Our Story
              </button>

              <button
                onClick={() => setActiveTab('track')}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  activeTab === 'track' ? 'text-[#E8590C] bg-[#E8590C]/10' : 'text-gray-300 hover:text-white hover:bg-[#181B1E]'
                }`}
              >
                Track Order
              </button>
            </nav>
          </div>

          {/* Right Action Buttons: Admin Quick Access & Cart Button */}
          <div className="flex items-center space-x-3">
            {/* Admin Portal Quick Access */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                activeTab === 'admin'
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-[#181B1E] border-[#23272B] text-gray-300 hover:border-amber-500/40 hover:text-amber-300'
              }`}
              title="Admin Live Order Stream"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Admin</span>
              {pendingOrdersCount > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 bg-amber-500 text-black text-[10px] font-black rounded-full animate-bounce">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-lg shadow-[#E8590C]/30 hover:scale-105 transition-all duration-200 focus:outline-none"
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
          </div>

        </div>
      </div>
    </header>
  );
};
