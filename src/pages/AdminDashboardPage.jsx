import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Banknote, 
  ShoppingBag, 
  Clock, 
  ChefHat, 
  Volume2, 
  VolumeX, 
  Search, 
  ArrowLeft,
  MessageSquare,
  Send,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { 
    orders, 
    updateOrderStatus, 
    sendWhatsAppNotification,
    adminAudioAlert, 
    setAdminAudioAlert,
    autoWhatsApp,
    setAutoWhatsApp,
    setActiveTab 
  } = useCart();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dashboard KPI Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalOrdersCount = orders.length;
  const activeKitchenCount = orders.filter(o => o.status === 'Pending' || o.status === 'Kitchen Preparing').length;
  const completedCount = orders.filter(o => o.status === 'Delivered').length;

  // Filtered orders list
  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchPhone = order.phone.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'Kitchen Preparing':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Out for Delivery':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const handleStatusChange = (order, newStatus) => {
    updateOrderStatus(order.id, newStatus, true);
  };

  return (
    <div className="py-8 bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Settings */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-[#23272B] gap-4">
          <div>
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                LIVE KITCHEN STREAM & WHATSAPP SYNC ACTIVE
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              FOOD CART <span className="text-gradient-orange">SIMPLE ADMIN PORTAL</span>
            </h1>
          </div>

          {/* Quick Settings Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Auto WhatsApp Toggle */}
            <button
              onClick={() => setAutoWhatsApp(!autoWhatsApp)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                autoWhatsApp
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md'
                  : 'bg-[#181B1E] border-[#23272B] text-gray-500'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Auto WhatsApp Update: {autoWhatsApp ? 'ON 🟢' : 'OFF 🔴'}</span>
            </button>

            {/* Audio Alert Toggle */}
            <button
              onClick={() => setAdminAudioAlert(!adminAudioAlert)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                adminAudioAlert
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                  : 'bg-[#181B1E] border-[#23272B] text-gray-500'
              }`}
            >
              {adminAudioAlert ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span>Chime Alert: {adminAudioAlert ? 'ON 🔔' : 'OFF 🔕'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#181B1E] p-5 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Sales Revenue</span>
              <span className="font-display font-black text-2xl text-amber-400">
                Rs. {Math.round(totalRevenue).toLocaleString()}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Banknote className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-5 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Orders</span>
              <span className="font-display font-black text-2xl text-white">
                {totalOrdersCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#E8590C]/10 border border-[#E8590C]/30 flex items-center justify-center text-[#E8590C]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-5 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Kitchen Preparing</span>
              <span className="font-display font-black text-2xl text-[#FF922B]">
                {activeKitchenCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ChefHat className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-5 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Delivered Orders</span>
              <span className="font-display font-black text-2xl text-emerald-400">
                {completedCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Filter Tabs & Live Search Bar */}
        <div className="bg-[#181B1E] p-4 rounded-3xl border border-[#23272B] mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['all', 'Pending', 'Kitchen Preparing', 'Out for Delivery', 'Delivered'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#E8590C] text-white shadow'
                    : 'bg-[#121417] text-gray-400 hover:text-white border border-[#23272B]'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ID, customer, phone..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#121417] border border-[#23272B] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#E8590C]"
            />
          </div>
        </div>

        {/* Orders Card Grid View (Simple & Easy to Use) */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-[#181B1E] rounded-3xl p-6 border border-[#23272B] hover:border-[#E8590C]/50 shadow-2xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Col 1: Order ID & Time */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-display font-black text-xl text-white">
                        {order.id}
                      </span>
                      <span className="bg-[#E8590C]/15 text-[#E8590C] border border-[#E8590C]/30 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                        {order.orderMode}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400 block font-medium">
                      🕒 {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(order.timestamp).toLocaleDateString()}
                    </span>

                    {/* Status Dropdown */}
                    <div className="mt-3">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Change Order Status:
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-black uppercase outline-none border cursor-pointer ${getStatusBadgeStyle(order.status)}`}
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="Kitchen Preparing">👨‍🍳 Kitchen Preparing</option>
                        <option value="Out for Delivery">🛵 Out for Delivery</option>
                        <option value="Delivered">✅ Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Col 2: Customer Info & Address */}
                  <div className="lg:col-span-3 bg-[#121417] p-4 rounded-2xl border border-[#23272B]">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-white mb-1">
                      <span>👤 {order.customerName}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-extrabold text-emerald-400 mb-1">
                      <span>📱 {order.phone}</span>
                    </div>

                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      📍 {order.address}
                    </p>

                    {order.notes && (
                      <p className="text-[10px] text-amber-300 italic mt-1.5 bg-[#181B1E] p-1.5 rounded-lg border border-[#23272B]">
                        Note: "{order.notes}"
                      </p>
                    )}
                  </div>

                  {/* Col 3: Ordered Items Breakdown */}
                  <div className="lg:col-span-3">
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1.5">
                      Items Ordered ({order.items?.length || 0}):
                    </span>
                    <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-300 font-medium flex justify-between">
                          <span>
                            <strong className="text-[#E8590C]">{item.quantity}x</strong> {item.name} ({item.variant})
                          </span>
                          <span className="text-gray-400 text-[10px] font-bold">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#23272B] flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-bold">Grand Total:</span>
                      <span className="font-display font-black text-base text-[#FF922B]">
                        Rs. {Math.round(order.grandTotal).toLocaleString()} ({order.paymentMethod})
                      </span>
                    </div>
                  </div>

                  {/* Col 4: Quick Action Buttons (WhatsApp Button!) */}
                  <div className="lg:col-span-3 flex flex-col justify-center gap-2">
                    {/* Direct WhatsApp Update Button */}
                    <button
                      onClick={() => sendWhatsAppNotification(order)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>📲 Send WhatsApp Update</span>
                    </button>

                    <div className="text-[10px] text-gray-400 text-center font-semibold">
                      Clicking updates WhatsApp directly to {order.phone}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#181B1E] rounded-3xl border border-[#23272B]">
            <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-xl font-black uppercase text-white mb-2">No Active Orders</h3>
            <p className="text-gray-400 text-xs">No orders match your filter criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};
