import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
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

const AppContent = () => {
  const { activeTab } = useCart();

  return (
    <div className="min-h-screen bg-[#121417] text-[#FAF6F0] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'deals' && <TopDealsPage />}
        {activeTab === 'story' && <AboutUsPage />}
        {activeTab === 'track' && <TrackOrderPage />}
        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      <Footer />
      <CartDrawer />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
