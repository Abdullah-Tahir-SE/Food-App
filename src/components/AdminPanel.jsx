import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  LayoutDashboard, 
  Banknote, 
  ShoppingBag, 
  Clock, 
  ChefHat, 
  Truck, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  Filter, 
  Search, 
  Phone, 
  MapPin, 
  Flame,
  Bell
} from 'lucide-react';

export const AdminPanel = () => {
  const { 
    orders, 
    updateOrderStatus, 
    adminAudioAlert, 
    setAdminAudioAlert 
  } = useCart();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Pending' | 'Kitchen Preparing' | 'Out for Delivery' | 'Delivered'
  const [searchTerm, setSearchTerm] = useState('');

  // Dashboard Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalOrdersCount = orders.length;
  const activeKitchenCount = orders.filter(o => o.status === 'Pending' || o.status === 'Kitchen Preparing').length;
  const avgPrepTime = '14.5 mins';

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
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Kitchen Preparing':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Out for Delivery':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div className="py-8 bg-[#121417] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header & Live Stream Indicator */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#23272B] gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                LIVE ORDER STREAM ACTIVE
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mt-1">
              FOOD CART <span className="text-gradient-orange">KITCHEN ADMIN</span>
            </h1>
          </div>

          {/* Sound Audio Chime Simulation Toggle */}
          <button
            onClick={() => setAdminAudioAlert(!adminAudioAlert)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all ${
              adminAudioAlert
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-[#181B1E] border-[#23272B] text-gray-500'
            }`}
          >
            {adminAudioAlert ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span>Audio Alert Chime: {adminAudioAlert ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Quick Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-[#181B1E] p-6 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Revenue</span>
              <span className="font-display font-black text-3xl text-amber-400">
                Rs. {Math.round(totalRevenue).toLocaleString()}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Banknote className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-6 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Orders Placed</span>
              <span className="font-display font-black text-3xl text-white">
                {totalOrdersCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8590C]/10 border border-[#E8590C]/30 flex items-center justify-center text-[#E8590C]">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-6 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Active Kitchen Orders</span>
              <span className="font-display font-black text-3xl text-[#FF922B] flex items-center space-x-2">
                <span>{activeKitchenCount}</span>
                {activeKitchenCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-[#E8590C] animate-ping" />}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#181B1E] p-6 rounded-3xl border border-[#23272B] shadow-xl flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Avg Kitchen Speed</span>
              <span className="font-display font-black text-3xl text-emerald-400">
                {avgPrepTime}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Filter Toolbar & Search */}
        <div className="bg-[#181B1E] p-4 rounded-3xl border border-[#23272B] mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status Filter Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['all', 'Pending', 'Kitchen Preparing', 'Out for Delivery', 'Delivered'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? 'bg-[#E8590C] text-white shadow'
                    : 'bg-[#121417] text-gray-400 hover:text-white border border-[#23272B]'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#121417] border border-[#23272B] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#E8590C]"
            />
          </div>

        </div>

        {/* Live Orders Table */}
        <div className="bg-[#181B1E] rounded-3xl border border-[#23272B] shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121417] border-b border-[#23272B] text-gray-400 font-extrabold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order ID & Time</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Ordered Items & Notes</th>
                  <th className="p-4">Total & Payment</th>
                  <th className="p-4 text-center">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23272B]">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-[#121417]/50 transition-colors">
                      
                      {/* Order ID & Time */}
                      <td className="p-4 align-top">
                        <span className="font-display font-black text-sm text-white block">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
                          {order.orderMode.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Customer Details */}
                      <td className="p-4 align-top max-w-[200px]">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[10px] text-gray-400 block">{order.phone}</span>
                        <span className="text-[10px] text-gray-500 truncate block mt-1">
                          📍 {order.address}
                        </span>
                      </td>

                      {/* Items & Notes */}
                      <td className="p-4 align-top">
                        <div className="space-y-1 mb-2">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-gray-300 font-medium">
                              <span className="text-[#E8590C] font-black">{item.quantity}x</span> {item.name} ({item.variant})
                            </div>
                          ))}
                        </div>
                        {order.notes && (
                          <div className="bg-[#121417] p-2 rounded-lg text-[10px] text-amber-300 italic border border-[#23272B]">
                            Note: "{order.notes}"
                          </div>
                        )}
                      </td>

                      {/* Total & Payment */}
                      <td className="p-4 align-top">
                        <span className="font-display font-black text-sm text-amber-400 block">
                          Rs. {Math.round(order.grandTotal).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold block mt-1">
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* Interactive Status Switcher Dropdown */}
                      <td className="p-4 align-top text-center">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-2 rounded-xl text-xs font-black uppercase outline-none border cursor-pointer ${getStatusBadgeStyle(order.status)}`}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Kitchen Preparing">👨‍🍳 Kitchen Preparing</option>
                          <option value="Out for Delivery">🛵 Out for Delivery</option>
                          <option value="Delivered">✅ Delivered</option>
                        </select>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-gray-500 font-bold">
                      No matching orders found in admin stream.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
