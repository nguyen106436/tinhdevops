import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { ProductList } from './components/ProductList';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { useAuth } from './context/AuthContext';

const checkIsAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#admin' ||
    search.includes('admin')
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'contact' | 'admin'>(() => {
    return checkIsAdminRoute() ? 'admin' : 'products';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Listen for URL changes (back/forward navigation or hash changes)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminRoute()) {
        setActiveTab('admin');
      } else {
        const path = window.location.pathname.toLowerCase();
        if (path === '/' || path === '') {
          setActiveTab('products');
        }
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Sync browser URL with admin tab
  useEffect(() => {
    if (activeTab === 'admin') {
      if (window.location.pathname !== '/admin' && window.location.hash !== '#admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        window.history.pushState(null, '', '/');
      }
    }
  }, [activeTab]);

  const scrollToProducts = () => {
    setActiveTab('products');
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dedicated Admin Screen (Requires Admin authentication)
  if (activeTab === 'admin') {
    if (!isAuthenticated || !isAdmin) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AdminLogin onExit={() => setActiveTab('products')} />
          <ToastContainer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <AdminDashboard onExit={() => setActiveTab('products')} />
        <ProductDetailModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Areas based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'products' && (
          <>
            <Banner onExploreProducts={scrollToProducts} />
            <ProductList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </>
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal onAdminLogin={() => setActiveTab('admin')} />
      <OrderHistoryModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;

