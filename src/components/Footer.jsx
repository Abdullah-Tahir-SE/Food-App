import React from 'react';
import { useCart } from '../context/CartContext';
import { UtensilsCrossed, Phone, Mail, MapPin, Lock, Heart } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab } = useCart();

  return (
    <footer className="bg-[#181B1E] border-t border-[#23272B] pt-12 pb-24 md:pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8590C] flex items-center justify-center text-white shadow-lg shadow-[#E8590C]/30">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-2xl text-white uppercase tracking-tighter">
                FOOD <span className="text-[#E8590C]">CART</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              Ultra-fast 30-minute hot & fresh express delivery. Gourmet stuffed crust pizzas, crispy zinger burgers, and signature 11-spice chicken.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-black text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#E8590C] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('menu')} className="hover:text-[#E8590C] transition-colors cursor-pointer">
                  Explore Menu
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('deals')} className="hover:text-[#E8590C] transition-colors cursor-pointer">
                  Top Mega Deals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('story')} className="hover:text-[#E8590C] transition-colors cursor-pointer">
                  Our Story & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('track')} className="hover:text-[#E8590C] transition-colors cursor-pointer">
                  Track Active Order
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-display font-black text-white uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Mon - Thu:</span>
                <span className="text-white font-bold">11:00 AM - 02:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sun:</span>
                <span className="text-white font-bold">11:00 AM - 04:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Midnight Express:</span>
                <span className="text-amber-400 font-bold">24/7 Online</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-black text-white uppercase tracking-wider mb-4">
              Contact & Hotline
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#E8590C]" />
                <span className="text-white font-bold">+92 (042) 111-FOOD-CART</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#E8590C]" />
                <span>orders@foodcart.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#E8590C]" />
                <span>Gulberg Main Blvd, Lahore</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Embedded Staff / Kitchen Portal Button */}
        <div className="pt-6 border-t border-[#23272B] text-center text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 FOOD CART Fast-Food Express Inc. All rights reserved.</span>

          {/* Staff / Kitchen Portal Link */}
          <button
            onClick={() => setActiveTab('admin')}
            className="inline-flex items-center space-x-1.5 bg-[#121417] hover:bg-[#E8590C]/20 border border-[#23272B] hover:border-[#E8590C] text-gray-400 hover:text-amber-300 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>🔐 Staff / Kitchen Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
