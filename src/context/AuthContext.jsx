import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const INITIAL_CUSTOMERS = [
  { name: 'Ahmad Hassan', phone: '0300-1234567', password: 'password123' },
  { name: 'Sara Khan', phone: '0321-9876543', password: 'password123' }
];

export const AuthProvider = ({ children }) => {
  // 1. Logged-in User Session from LocalStorage
  const [user, setUser] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const savedUser = localStorage.getItem('foodcart_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // 2. Registered Customers Database in LocalStorage
  const [customers, setCustomers] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return INITIAL_CUSTOMERS;
      const saved = localStorage.getItem('foodcart_customers');
      if (saved) {
        return JSON.parse(saved);
      } else {
        localStorage.setItem('foodcart_customers', JSON.stringify(INITIAL_CUSTOMERS));
        return INITIAL_CUSTOMERS;
      }
    } catch (e) {
      return INITIAL_CUSTOMERS;
    }
  });

  // 3. Modal State & Guest Checkout Interception Action
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [pendingAuthAction, setPendingAuthAction] = useState(null);
  const [accessDeniedNotice, setAccessDeniedNotice] = useState(null);

  // Sync user session to LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (user) {
          localStorage.setItem('foodcart_user', JSON.stringify(user));
        } else {
          localStorage.removeItem('foodcart_user');
        }
      }
    } catch (e) {}
  }, [user]);

  // Sync customers to LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('foodcart_customers', JSON.stringify(customers));
      }
    } catch (e) {}
  }, [customers]);

  // Open modal with optional post-auth callback
  const openAuthModal = useCallback((callback = null, mode = 'login') => {
    setAuthMode(mode);
    setPendingAuthAction(callback ? () => callback : null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPendingAuthAction(null);
  }, []);

  // Helper to normalize phone digits for matching
  const normalizePhone = (p) => {
    if (!p) return '';
    return p.replace(/\D/g, '');
  };

  // Login handler
  const login = ({ identifier, password }) => {
    const cleanId = (identifier || '').trim();
    const cleanPass = (password || '').trim();

    // 1. Staff / Kitchen Admin Portal Check
    if (cleanId.toLowerCase() === 'admin' && cleanPass === 'admin') {
      const adminUser = {
        name: 'Kitchen Admin',
        phone: 'admin',
        role: 'admin'
      };
      setUser(adminUser);
      setIsAuthModalOpen(false);
      setAccessDeniedNotice(null);

      // Execute any pending callback
      if (typeof pendingAuthAction === 'function') {
        try { pendingAuthAction(adminUser); } catch (e) {}
        setPendingAuthAction(null);
      }
      return { success: true, role: 'admin' };
    }

    // 2. Customer Credentials Check
    const normalizedInput = normalizePhone(cleanId);
    const existing = customers.find(c => {
      const cNorm = normalizePhone(c.phone);
      return cNorm === normalizedInput || c.phone.toLowerCase() === cleanId.toLowerCase();
    });

    if (existing) {
      if (existing.password === cleanPass) {
        const customerUser = {
          name: existing.name,
          phone: existing.phone,
          role: 'customer'
        };
        setUser(customerUser);
        setIsAuthModalOpen(false);
        setAccessDeniedNotice(null);

        // Execute pending guest callback if intercepted during checkout
        if (typeof pendingAuthAction === 'function') {
          try { pendingAuthAction(customerUser); } catch (e) {}
          setPendingAuthAction(null);
        }
        return { success: true, role: 'customer' };
      } else {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
    }

    // If no existing customer found, allow quick seamless login if format is valid phone
    if (normalizedInput.length >= 10 && cleanPass.length >= 3) {
      // Auto-register demo customer for seamless onboarding
      const newCustomer = {
        name: 'Valued Foodie',
        phone: cleanId,
        password: cleanPass
      };
      setCustomers(prev => [...prev, newCustomer]);
      const customerUser = {
        name: newCustomer.name,
        phone: newCustomer.phone,
        role: 'customer'
      };
      setUser(customerUser);
      setIsAuthModalOpen(false);

      if (typeof pendingAuthAction === 'function') {
        try { pendingAuthAction(customerUser); } catch (e) {}
        setPendingAuthAction(null);
      }
      return { success: true, role: 'customer' };
    }

    return { 
      success: false, 
      error: 'Account not found. Please check your WhatsApp number or click "Create Account".' 
    };
  };

  // Sign-up handler
  const signup = ({ name, phone, password }) => {
    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanPhone || normalizePhone(cleanPhone).length < 10) {
      return { success: false, error: 'Please enter a valid Pakistani WhatsApp number (e.g. 0300-1234567).' };
    }
    if (!cleanPass || cleanPass.length < 3) {
      return { success: false, error: 'Password must be at least 3 characters long.' };
    }

    const norm = normalizePhone(cleanPhone);
    const existing = customers.find(c => normalizePhone(c.phone) === norm);
    if (existing) {
      return { success: false, error: 'An account with this WhatsApp number already exists. Please log in.' };
    }

    const newCustomer = {
      name: cleanName,
      phone: cleanPhone,
      password: cleanPass
    };

    setCustomers(prev => [...prev, newCustomer]);
    const customerUser = {
      name: cleanName,
      phone: cleanPhone,
      role: 'customer'
    };
    setUser(customerUser);
    setIsAuthModalOpen(false);
    setAccessDeniedNotice(null);

    // Execute pending guest callback if intercepted during checkout
    if (typeof pendingAuthAction === 'function') {
      try { pendingAuthAction(customerUser); } catch (e) {}
      setPendingAuthAction(null);
    }

    return { success: true };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setPendingAuthAction(null);
  };

  // Trigger Access Denied banner
  const triggerAccessDenied = (msg = 'Access Denied: You must be logged in as Kitchen Admin to view the Kitchen Portal.') => {
    setAccessDeniedNotice(msg);
    setTimeout(() => {
      setAccessDeniedNotice(null);
    }, 5000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        accessDeniedNotice,
        setAccessDeniedNotice,
        triggerAccessDenied
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthModalOpen: false,
      authMode: 'login',
      setAuthMode: () => {},
      openAuthModal: () => {},
      closeAuthModal: () => {},
      login: () => ({ success: false }),
      signup: () => ({ success: false }),
      logout: () => {},
      accessDeniedNotice: null,
      setAccessDeniedNotice: () => {},
      triggerAccessDenied: () => {}
    };
  }
  return context;
};
