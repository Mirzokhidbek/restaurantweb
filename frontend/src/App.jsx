import React from 'react';
import { BrowserRouter, useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { RestaurantStatusProvider, useRestaurantStatus } from './context/RestaurantStatusContext';
import { formatCurrency } from './utils/formatCurrency';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomerChatWidget from './components/CustomerChatWidget';
import AppRoutes from './routes/AppRoutes';
import { ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react';

const MobileStickyCartButton = () => {
  const { totalItems, totalPrice } = useCart();
  const { t } = useLanguage();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isCartOrCheckout = location.pathname === '/cart' || location.pathname === '/checkout';

  if (isAdmin || isCartOrCheckout || totalItems === 0) return null;

  return (
    <div className="mobile-sticky-cart d-flex d-lg-none">
      <div className="d-flex align-items-center gap-2">
        <span className="badge rounded-pill bg-warning text-dark px-2 py-1 font-monospace fw-bold">
          {totalItems}
        </span>
        <span className="fw-extrabold text-white">{formatCurrency(totalPrice)}</span>
      </div>
      <Link to="/cart" className="text-warning text-decoration-none fw-bold d-flex align-items-center gap-1 small">
        <span>{t('cart')}</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

const RestaurantClosedBanner = () => {
  const { isRestaurantOpen, closingMessage } = useRestaurantStatus();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin || isRestaurantOpen) return null;

  return (
    <div className="bg-danger text-white py-2 px-3 text-center fw-bold small d-flex align-items-center justify-content-center gap-2 sticky-top shadow" style={{ zIndex: 1040 }}>
      <AlertTriangle size={18} className="animate-flame-bounce" />
      <span>⚠️ RESTORAN HOZIRDA VAQTINCHA YOPIQ! Buyurtmalar qabul qilinmaydi.</span>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      <RestaurantClosedBanner />
      {!isAdmin && <Navbar />}
      <div className="flex-grow-1">
        <AppRoutes />
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <CustomerChatWidget />}
      <MobileStickyCartButton />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <RestaurantStatusProvider>
                <AppContent />
              </RestaurantStatusProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
