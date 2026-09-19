import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { TopDealsPage } from './pages/TopDealsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CartDrawer } from './components/CartDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ShieldAlert, X, ChefHat } from 'lucide-react';

const AppContent = () => {
  const { activeTab, setActiveTab } = useCart();
  const { user, accessDeniedNotice, setAccessDeniedNotice, triggerAccessDenied, openAuthModal } = useAuth();

  // Unified Login for Staff / Kitchen Admin Portal Guard:
  // "Restrict direct URL/tab access to AdminDashboardPage.jsx: if the active user role is not 'admin', redirect to Home and display an access-denied notification."
  useEffect(() => {
    if (activeTab === 'admin' && user?.role !== 'admin') {
      setActiveTab('home');
      triggerAccessDenied('Access Denied: You must be logged in as Kitchen Admin to access the Admin Portal.');
    }
  }, [activeTab, user, setActiveTab, triggerAccessDenied]);

  return (
    <div className="min-h-screen bg-[#121417] text-[#FAF6F0] flex flex-col font-sans relative">
      {/* Access Denied Notification Banner */}
      {accessDeniedNotice && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-3 shadow-xl z-50 fixed top-20 left-4 right-4 max-w-2xl mx-auto rounded-2xl border border-red-400/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-black/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-xs uppercase block text-amber-200">Security Alert</span>
              <p className="text-xs font-bold leading-tight text-white">{accessDeniedNotice}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                setAccessDeniedNotice(null);
                openAuthModal(null, 'login');
              }}
              className="bg-black/30 hover:bg-black/50 text-amber-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Login Admin</span>
            </button>
            <button
              onClick={() => setAccessDeniedNotice(null)}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Navbar />

      <main className="flex-grow">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'deals' && <TopDealsPage />}
        {activeTab === 'story' && <AboutUsPage />}
        {activeTab === 'track' && <TrackOrderPage />}
        {activeTab === 'admin' && user?.role === 'admin' && <AdminDashboardPage />}
      </main>

      <Footer />
      <CartDrawer />
      <MobileBottomNav />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
