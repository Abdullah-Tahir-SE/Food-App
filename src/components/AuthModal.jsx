import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  X, 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ChefHat, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    login, 
    signup 
  } = useAuth();

  const { setActiveTab, setIsCartOpen } = useCart();

  // Form states
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Clear fields when modal opens/closes or changes mode
  useEffect(() => {
    setErrorMessage('');
    setShowPassword(false);
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      if (authMode === 'login') {
        const res = login({ identifier, password });
        setIsLoading(false);
        if (res.success) {
          if (res.role === 'admin') {
            // Unified Staff Login Requirement:
            // "When these exact credentials are submitted, authenticate as 'Kitchen Admin' and redirect directly to AdminDashboardPage.jsx"
            setActiveTab('admin');
            setIsCartOpen(false);
          }
        } else {
          setErrorMessage(res.error || 'Invalid credentials. Please try again.');
        }
      } else {
        const res = signup({ name, phone: identifier, password });
        setIsLoading(false);
        if (!res.success) {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      }
    }, 250);
  };

  const handleQuickAdminFill = () => {
    setAuthMode('login');
    setIdentifier('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#181B1E] border border-[#23272B] rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top Decorative Glow Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F]" />

          {/* Modal Header */}
          <div className="p-6 pb-4 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-[#E8590C]/15 border border-[#E8590C]/30 text-[#FF922B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>FOOD CART FAST-PASS</span>
              </div>
              <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {authMode === 'login'
                  ? 'Sign in to confirm your order and track live kitchen updates.'
                  : 'Join FOOD CART with your WhatsApp number for express checkout.'}
              </p>
            </div>

            <button
              onClick={closeAuthModal}
              className="w-8 h-8 rounded-full bg-[#121417] hover:bg-[#E8590C] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="px-6">
            <div className="flex bg-[#121417] p-1 rounded-2xl border border-[#23272B]">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMessage(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-[#E8590C] to-[#D9480F] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/15 border border-red-500/40 text-red-300 p-3 rounded-xl text-xs font-bold flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Full Name field (Sign Up only) */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmad Hassan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* WhatsApp Number / Admin Username */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1.5 flex items-center justify-between">
                <span>{authMode === 'signup' ? 'WhatsApp Number *' : 'WhatsApp Number / Admin *'}</span>
                <span className="text-emerald-400 font-bold text-[9px]">📱 03XX-XXXXXXX</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  type="text"
                  required
                  placeholder={authMode === 'signup' ? '0300-1234567' : '0300-1234567 or admin'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#121417] border border-[#23272B] focus:border-emerald-500 text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121417] border border-[#23272B] focus:border-[#E8590C] text-white text-xs rounded-xl pl-10 pr-10 py-3 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-[#E8590C] via-[#FF922B] to-[#D9480F] hover:from-[#D9480F] hover:to-[#E8590C] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#E8590C]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>
                {isLoading 
                  ? 'Processing...' 
                  : authMode === 'login' 
                    ? 'Sign In to Food Cart' 
                    : 'Create Account & Continue'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Unified Staff / Kitchen Portal Hint Box */}
          <div className="p-4 bg-[#121417] border-t border-[#23272B] flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2 text-gray-400">
              <ChefHat className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Kitchen Staff? Use <strong className="text-white">admin</strong> / <strong className="text-white">admin</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdminFill}
              className="text-[#FF922B] hover:text-[#E8590C] font-extrabold text-[10px] uppercase underline cursor-pointer"
            >
              Fill Staff Admin
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
