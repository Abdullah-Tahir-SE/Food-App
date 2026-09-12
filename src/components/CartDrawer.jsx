import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Sparkles, 
  CreditCard, 
  DollarSign, 
  User, 
  Phone, 
  MapPin, 
  FileText,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    taxAmount,
    grandTotal,
    promoCode,
    setPromoCode,
    applyPromoCode,
    appliedPromo,
    promoError,
    promoSuccess,
    placeOrder,
    orderMode
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout'
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [formError, setFormError] = useState('');

  if (!isCartOpen) return null;

  const handleConfirmCheckout = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (orderMode === 'delivery' && !address.trim())) {
      setFormError('Please fill out all required name, phone, and address fields!');
      return;
    }
    setFormError('');
    placeOrder({
      name: customerName,
      phone,
      address,
      notes,
      paymentMethod
    });
    setCheckoutStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121417] border-l border-[#23272B] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-[#181B1E] border-b border-[#23272B] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#E8590C]" />
              <h2 className="font-display text-xl font-black uppercase text-white tracking-tight">
                {checkoutStep === 'cart' ? 'Your Food Basket' : 'Express Checkout'}
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#121417] hover:bg-[#E8590C] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {checkoutStep === 'cart' ? (
              <>
                {/* Itemized Cart List */}
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex items-center space-x-3 bg-[#181B1E] p-3 rounded-2xl border border-[#23272B] relative group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-[#23272B]"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-white uppercase truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-amber-300 font-bold block">
                            {item.variant}
                          </span>
                          {item.selectedDrink && (
                            <span className="text-[9px] text-gray-400 block truncate">
                              🥤 {item.selectedDrink}
                            </span>
                          )}

                          <div className="font-display font-black text-sm text-[#FF922B] mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Quantity Controller */}
                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-center bg-[#121417] rounded-lg border border-[#23272B] p-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-300 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-xs font-black text-white px-1.5">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#E8590C]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-red-400 hover:text-red-300 p-1 text-[10px] flex items-center space-x-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-black uppercase text-white mb-2">Cart is empty</h3>
                    <p className="text-gray-400 text-xs mb-4">Add your favorite pizzas or burgers to start your order!</p>
                  </div>
                )}

                {/* Promo Code Box */}
                {cart.length > 0 && (
                  <div className="bg-[#181B1E] p-4 rounded-2xl border border-[#23272B]">
                    <label className="block text-[10px] font-extrabold text-amber-300 uppercase mb-2 flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a Promo Code?</span>
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="FOODCART20"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-[#121417] border border-[#23272B] text-white text-xs rounded-xl px-3 py-2 uppercase font-extrabold outline-none focus:border-[#E8590C]"
                      />
                      <button
                        onClick={() => applyPromoCode(promoCode)}
                        className="bg-[#E8590C] hover:bg-[#D9480F] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {promoSuccess && (
                      <p className="text-emerald-400 text-[11px] font-bold mt-2 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{promoSuccess}</span>
                      </p>
                    )}
                    {promoError && (
                      <p className="text-red-400 text-[11px] font-bold mt-2">
                        {promoError}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleConfirmCheckout} className="space-y-4">
                {formError && (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl text-xs font-bold">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad Hassan"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-[#181B1E] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#FF922B] uppercase mb-1 flex items-center justify-between">
                    <span>WhatsApp Number (for Order Updates) *</span>
                    <span className="text-emerald-400 font-extrabold text-[9px]">📱 WhatsApp Enabled</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-[#181B1E] border border-emerald-500/40 focus:border-emerald-500 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none"
                    />
                  </div>
                </div>

                {orderMode === 'delivery' && (
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        required
                        rows="2"
                        placeholder="House / Apartment #, Street, Area, City"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full bg-[#181B1E] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Special Cooking / Delivery Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      rows="2"
                      placeholder="Extra sauce, double cheese, ring bell twice..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full bg-[#181B1E] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center space-x-2 transition-all ${
                        paymentMethod === 'Cash on Delivery'
                          ? 'bg-[#E8590C]/15 border-[#E8590C] text-white'
                          : 'bg-[#181B1E] border-[#23272B] text-gray-400'
                      }`}
                    >
                      <DollarSign className="w-4 h-4 text-[#E8590C]" />
                      <span>Cash on Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card on Delivery')}
                      className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center space-x-2 transition-all ${
                        paymentMethod === 'Card on Delivery'
                          ? 'bg-[#E8590C]/15 border-[#E8590C] text-white'
                          : 'bg-[#181B1E] border-[#23272B] text-gray-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#E8590C]" />
                      <span>Card on Delivery</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>

          {/* Footer Calculation & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#181B1E] border-t border-[#23272B] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="font-bold text-white">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8% GST):</span>
                  <span className="font-bold text-white">${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#23272B]">
                <span className="font-display font-black text-sm uppercase text-white">Grand Total</span>
                <span className="font-display font-black text-2xl text-[#FF922B]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full bg-gradient-to-r from-[#E8590C] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 bg-[#121417] text-gray-300 hover:text-white py-3.5 rounded-2xl font-bold text-xs uppercase border border-[#23272B]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmCheckout}
                    className="w-2/3 bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/40 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Flame className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span>Confirm Order</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
