import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

const INITIAL_ORDERS = [
  {
    id: 'FC-8492',
    customerName: 'Ahmad Hassan',
    phone: '+92 300 1234567',
    address: 'House 42, Block H, Gulberg III, Lahore',
    notes: 'Extra garlic mayo dip please!',
    orderMode: 'delivery',
    items: [
      { id: 'pz-stuffed-supreme', name: 'Gourmet Stuffed Crust Supreme', variant: 'Medium 12"', price: 1490, quantity: 1 },
      { id: 'dr-nutella-brownie-shake', name: 'Monster Nutella & Fudge Brownie Shake', variant: 'Regular 16oz', price: 590, quantity: 2 }
    ],
    subtotal: 2670,
    deliveryFee: 150,
    tax: 214,
    discount: 0,
    grandTotal: 3034,
    paymentMethod: 'Cash on Delivery',
    status: 'Kitchen Preparing',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    estimatedDeliveryTime: '15 mins'
  },
  {
    id: 'FC-8491',
    customerName: 'Sara Khan',
    phone: '+92 321 9876543',
    address: 'Villa 14, DHA Phase 5, Lahore',
    notes: 'Please keep chicken extra spicy',
    orderMode: 'delivery',
    items: [
      { id: 'bg-zinger-stacker', name: 'Ultimate Zinger Double Stacker', variant: 'Double Stacker', price: 690, quantity: 2 },
      { id: 'fr-cheesy-jalapeno-loaded', name: 'Monster Cheesy Jalapeño Fries', variant: 'Regular Size', price: 590, quantity: 1 }
    ],
    subtotal: 1970,
    deliveryFee: 150,
    tax: 126,
    discount: 394,
    grandTotal: 1852,
    paymentMethod: 'Card on Delivery',
    status: 'Out for Delivery',
    timestamp: new Date(Date.now() - 32 * 60000).toISOString(),
    estimatedDeliveryTime: '8 mins'
  }
];

export const CartProvider = ({ children }) => {
  // Sync state with LocalStorage safely
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const saved = localStorage.getItem('foodcart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return INITIAL_ORDERS;
      const saved = localStorage.getItem('foodcart_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  const [orderMode, setOrderMode] = useState(() => {
    try {
      return (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('foodcart_ordermode')) || 'delivery';
    } catch (e) {
      return 'delivery';
    }
  });

  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      return (typeof window !== 'undefined' && window.localStorage && localStorage.getItem('foodcart_location')) || 'Gulberg III, Lahore';
    } catch (e) {
      return 'Gulberg III, Lahore';
    }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [adminAudioAlert, setAdminAudioAlert] = useState(true);
  const [autoWhatsApp, setAutoWhatsApp] = useState(true);
  const [dealModal, setDealModal] = useState({ isOpen: false, deal: null });

  // Scroll to top of window whenever activeTab changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } catch (e) {}
  }, [activeTab]);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('foodcart_cart', JSON.stringify(cart));
      }
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('foodcart_orders', JSON.stringify(orders));
      }
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('foodcart_ordermode', orderMode);
      }
    } catch (e) {}
  }, [orderMode]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('foodcart_location', deliveryLocation);
      }
    } catch (e) {}
  }, [deliveryLocation]);

  // Audio chime play function for new orders
  const playNewOrderChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio chime not supported or allowed', e);
    }
  };

  // Helper to format clean WhatsApp phone number (e.g., +92 300 1234567 -> 923001234567)
  const formatWhatsAppPhone = (phoneStr) => {
    if (!phoneStr) return '';
    let digits = phoneStr.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = '92' + digits.substring(1);
    }
    return digits;
  };

  // Function to trigger WhatsApp notification message
  const sendWhatsAppNotification = (order, customStatus = null) => {
    const statusText = customStatus || order.status;
    const cleanPhone = formatWhatsAppPhone(order.phone);
    
    let statusEmoji = '⏳';
    let statusMsg = 'Assalam-o-Alaikum! Your order has been received and is pending confirmation.';

    if (statusText === 'Kitchen Preparing') {
      statusEmoji = '👨‍🍳';
      statusMsg = 'Assalam-o-Alaikum! Our chef is now preparing your hot & fresh order in the kitchen!';
    } else if (statusText === 'Out for Delivery') {
      statusEmoji = '🛵';
      statusMsg = 'Assalam-o-Alaikum! Your order is hot, packed, and out for express delivery to your address!';
    } else if (statusText === 'Delivered') {
      statusEmoji = '✅';
      statusMsg = 'Assalam-o-Alaikum! Your order has been delivered! Enjoy your meal. Thank you for choosing FOOD CART!';
    }

    const itemsSummary = order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || '';

    const message = `🍔 *FOOD CART Order Update* ${statusEmoji}

*Order ID:* ${order.id}
*Customer Name:* ${order.customerName}
*Status:* ${statusText}

${statusMsg}

📦 *Items:* ${itemsSummary}
💰 *Total Amount:* Rs. ${Math.round(order.grandTotal).toLocaleString()} (${order.paymentMethod})

Need help? Reply to this chat or call +92 (042) 111-FOOD-CART.
Thank you! 🔥`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const addToCart = (item, selectedVariant = null, options = {}) => {
    const variantObj = selectedVariant || (item.variants && item.variants.length > 0 ? item.variants[0] : null);
    const variantName = variantObj ? variantObj.name : 'Standard';
    const priceModifier = variantObj ? (variantObj.priceModifier || 0) : 0;
    const finalPrice = Math.max(0, (item.price || item.dealPrice || 0) + priceModifier);

    const cartItemId = `${item.id}_${variantName}_${options.drink || ''}_${options.dip || ''}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(i => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: item.id,
            name: item.name || item.title,
            price: Math.round(finalPrice),
            variant: variantName,
            image: item.image,
            quantity: 1,
            selectedDrink: options.drink || null,
            selectedDip: options.dip || null,
            selectedCrust: options.crust || null,
            customNotes: options.notes || ''
          }
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FOODCART20') {
      setAppliedPromo({ code: 'FOODCART20', discount: 20 });
      setPromoSuccess('🎉 Promo Code Applied! You save 20% on your order.');
      setPromoError('');
    } else {
      setPromoError('Invalid Promo Code. Try "FOODCART20" for 20% off!');
      setPromoSuccess('');
    }
  };

  // Calculations in PKR
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discount) / 100) : 0;
  const deliveryFee = subtotal > 0 ? (orderMode === 'delivery' ? 150 : 0) : 0;
  const taxAmount = 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order Action
  const placeOrder = (customerDetails) => {
    const randomId = `#FC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: randomId,
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      address: orderMode === 'delivery' ? customerDetails.address : 'Store Pickup / Dine-In',
      notes: customerDetails.notes || '',
      orderMode,
      items: [...cart],
      subtotal: Math.round(subtotal),
      deliveryFee: Math.round(deliveryFee),
      tax: Math.round(taxAmount),
      discount: Math.round(discountAmount),
      grandTotal: Math.round(grandTotal),
      paymentMethod: customerDetails.paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      timestamp: new Date().toISOString(),
      estimatedDeliveryTime: '25-30 mins'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);

    if (adminAudioAlert) {
      playNewOrderChime();
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti failed', e);
    }

    clearCart();
    setIsCartOpen(false);
    setActiveTab('track');
  };

  // Admin Order Status Update with WhatsApp Notification integration
  const updateOrderStatus = (orderId, newStatus, triggerWhatsApp = false) => {
    setOrders(prev => {
      const targetOrder = prev.find(o => o.id === orderId);
      if (targetOrder && (triggerWhatsApp || autoWhatsApp)) {
        sendWhatsAppNotification(targetOrder, newStatus);
      }
      return prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o));
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        orderMode,
        setOrderMode,
        deliveryLocation,
        setDeliveryLocation,
        activeTab,
        setActiveTab,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        promoError,
        promoSuccess,
        subtotal,
        discountAmount,
        deliveryFee,
        taxAmount,
        grandTotal,
        totalCartCount,
        placeOrder,
        updateOrderStatus,
        sendWhatsAppNotification,
        lastPlacedOrder,
        dealModal,
        setDealModal,
        adminAudioAlert,
        setAdminAudioAlert,
        autoWhatsApp,
        setAutoWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      orders: [],
      orderMode: 'delivery',
      setOrderMode: () => {},
      deliveryLocation: 'Gulberg III, Lahore',
      setDeliveryLocation: () => {},
      activeTab: 'home',
      setActiveTab: () => {},
      isCartOpen: false,
      setIsCartOpen: () => {},
      addToCart: () => {},
      updateQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      promoCode: '',
      setPromoCode: () => {},
      appliedPromo: null,
      applyPromoCode: () => {},
      promoError: '',
      promoSuccess: '',
      subtotal: 0,
      discountAmount: 0,
      deliveryFee: 0,
      taxAmount: 0,
      grandTotal: 0,
      totalCartCount: 0,
      placeOrder: () => {},
      updateOrderStatus: () => {},
      sendWhatsAppNotification: () => {},
      lastPlacedOrder: null,
      dealModal: { isOpen: false, deal: null },
      setDealModal: () => {},
      adminAudioAlert: false,
      setAdminAudioAlert: () => {},
      autoWhatsApp: false,
      setAutoWhatsApp: () => {}
    };
  }
  return context;
};
