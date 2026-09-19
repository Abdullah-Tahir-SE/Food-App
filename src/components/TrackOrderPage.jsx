import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Clock, MapPin, Phone, User, CheckCircle, Truck, ChefHat, PackageCheck, Search, Flame } from 'lucide-react';

const STATUS_STEPS = [
  { id: 'Pending', label: 'Order Received', icon: Clock },
  { id: 'Kitchen Preparing', label: 'In Kitchen', icon: ChefHat },
  { id: 'Out for Delivery', label: 'Out For Delivery', icon: Truck },
  { id: 'Delivered', label: 'Delivered Hot', icon: PackageCheck }
];

export const TrackOrderPage = () => {
  const { orders, lastPlacedOrder, setActiveTab } = useCart();
  const [searchOrderId, setSearchOrderId] = useState('');

  // Find active order or default to last placed order or first order
  const activeOrder = searchOrderId.trim() !== ''
    ? orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase())
    : (lastPlacedOrder || orders[0]);

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Kitchen Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStepIndex = activeOrder ? getStepIndex(activeOrder.status) : 0;

  return (
    <div className="py-8 bg-[#121417] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#181B1E] border border-[#E8590C]/30 px-3.5 py-1 rounded-full mb-3">
            <Truck className="w-4 h-4 text-[#E8590C]" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              REAL-TIME ORDER TRACKER
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            LIVE EXPRESS <span className="text-gradient-orange">ORDER TRACKING</span>
          </h1>
        </div>

        {/* Search Order Bar */}
        <div className="bg-[#181B1E] p-4 rounded-2xl border border-[#23272B] mb-8 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Order ID e.g. #FC-8492"
                value={searchOrderId}
                onChange={e => setSearchOrderId(e.target.value)}
                className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none"
              />
            </div>
            <button
              onClick={() => setSearchOrderId('')}
              className="bg-[#23272B] hover:bg-[#E8590C] text-white px-4 py-3 rounded-xl font-bold text-xs uppercase transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {activeOrder ? (
          <div className="bg-[#181B1E] rounded-3xl p-6 sm:p-8 border border-[#23272B] shadow-2xl space-y-8">
            
            {/* Top Order Status Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#23272B] pb-6 gap-4">
              <div>
                <span className="text-xs font-bold text-[#E8590C] uppercase tracking-widest block">
                  ORDER REFERENCE
                </span>
                <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight">
                  {activeOrder.id}
                </h2>
                <span className="text-xs text-gray-400 block mt-1">
                  Placed at: {new Date(activeOrder.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Status Badge */}
              <div className="bg-[#121417] p-4 rounded-2xl border border-[#E8590C]/40 text-center sm:text-right">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Estimated Delivery</span>
                <span className="font-display font-black text-2xl text-amber-400">
                  {activeOrder.estimatedDeliveryTime || '25 Mins'}
                </span>
              </div>
            </div>

            {/* Visual Step Progress Timeline */}
            <div className="py-4">
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#23272B] -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#E8590C] to-[#FF922B] -translate-y-1/2 z-0 transition-all duration-700"
                  style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                />

                {/* Steps */}
                {STATUS_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#E8590C] text-white shadow-[0_0_20px_rgba(232,89,12,0.6)] scale-110 border-2 border-yellow-300'
                            : isCompleted
                            ? 'bg-[#E8590C]/80 text-white'
                            : 'bg-[#121417] text-gray-500 border border-[#23272B]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase mt-2 text-center max-w-[80px] ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer & Delivery Address Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121417] p-5 rounded-2xl border border-[#23272B]">
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-[#E8590C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">Customer Details</span>
                  <span className="block text-xs font-bold text-white">{activeOrder.customerName}</span>
                  <span className="block text-[11px] text-gray-400">{activeOrder.phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#E8590C] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">Delivery Address</span>
                  <span className="block text-xs font-bold text-white">{activeOrder.address}</span>
                  {activeOrder.notes && (
                    <span className="block text-[11px] text-amber-300 italic">Note: "{activeOrder.notes}"</span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items Breakdown Table */}
            <div>
              <h4 className="text-xs font-black uppercase text-gray-300 tracking-wider mb-3">
                Order Items ({activeOrder.items?.length || 0})
              </h4>
              <div className="space-y-2">
                {activeOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#121417] p-3 rounded-xl border border-[#23272B]/60 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="font-black text-[#E8590C] bg-[#E8590C]/10 px-2 py-1 rounded-md">
                        {item.quantity}x
                      </span>
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-gray-400">{item.variant}</span>
                      </div>
                    </div>
                    <span className="font-bold text-amber-400">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#23272B] mt-4 text-xs font-bold text-gray-300">
                <span>Total Amount Paid ({activeOrder.paymentMethod}):</span>
                <span className="font-display font-black text-xl text-[#FF922B]">
                  Rs. {Math.round(activeOrder.grandTotal).toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 bg-[#181B1E] rounded-3xl border border-[#23272B]">
            <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-xl font-black uppercase text-white mb-2">No Active Order Found</h3>
            <p className="text-gray-400 text-xs mb-4">You haven't placed an order yet in this session.</p>
            <button
              onClick={() => setActiveTab('menu')}
              className="bg-[#E8590C] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
            >
              Order Something Delicious
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
