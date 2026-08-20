import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  ChevronDown,
  User,
  Heart,
  HelpCircle,
  Award,
  Utensils,
  LogOut,
  PhoneCall,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, adminUser, logout } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-2 shadow-sm">
      <div className="container">
        {/* Advanced Brand Logo */}
        <BrandLogo showTagline={true} />

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none text-dark ms-auto"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={26} /> : <MenuIcon size={26} />}
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1 text-center align-items-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {t('home')}
              </NavLink>
            </li>

            {/* Dropdown 1: Menu Styles */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-no-caret nav-link-custom d-inline-flex align-items-center gap-1"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{t('menus')}</span>
                <ChevronDown size={14} className="text-muted ms-1" />
              </a>
              <ul className="dropdown-menu shadow-lg border-0 rounded-4 p-2">
                <li>
                  <Link to="/menu" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Utensils size={16} className="text-warning" /> {t('allMenu')}
                  </Link>
                </li>
                <li>
                  <Link to="/menu/fast-food" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                    {t('fastFoodMenu')}
                  </Link>
                </li>
                <li>
                  <Link to="/menu/restaurant" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                    {t('restaurantMenu')}
                  </Link>
                </li>
              </ul>
            </li>

            {/* Dropdown 2: About Pages */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-no-caret nav-link-custom d-inline-flex align-items-center gap-1"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{t('aboutUs')}</span>
                <ChevronDown size={14} className="text-muted ms-1" />
              </a>
              <ul className="dropdown-menu shadow-lg border-0 rounded-4 p-2">
                <li>
                  <Link to="/about" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                    {t('aboutStory')}
                  </Link>
                </li>
                <li>
                  <Link to="/chefs" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Award size={16} className="text-warning" /> {t('chefs')}
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                    {t('reviews')}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                    <HelpCircle size={16} className="text-warning" /> {t('faq')}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                    {t('terms')}
                  </Link>
                </li>
              </ul>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {t('contact')}
              </NavLink>
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="d-flex align-items-center justify-content-center gap-2 gap-md-3 mt-3 mt-lg-0">
            {/* Phone hotline indicator */}
            <a
              href="tel:+998773010005"
              className="d-none d-xl-flex align-items-center gap-2 text-decoration-none text-dark fw-bold small bg-white px-3 py-2 rounded-pill border border-warning border-opacity-30 shadow-sm"
              title="Qo‘ng‘iroq qilish"
            >
              <PhoneCall size={16} className="text-warning" />
              <span>+998 77 301 00 05</span>
            </a>

            {/* Account / User Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-white btn-sm rounded-circle p-2 border border-warning border-opacity-30 shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Profil / Hisob"
                style={{ width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justify: 'center' }}
              >
                <User size={18} className="text-dark" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 p-2">
                {isAuthenticated ? (
                  <>
                    <li className="px-3 py-2 bg-light rounded-3 mb-2">
                      <div className="fw-bold text-dark small">{adminUser?.name || 'Foydalanuvchi'}</div>
                      <small className="text-muted d-block text-truncate">{adminUser?.email}</small>
                    </li>
                    {adminUser?.role === 'admin' && (
                      <li>
                        <Link to="/admin" className="dropdown-item rounded-3 py-2 fw-bold text-warning d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                          <ShieldCheck size={16} /> {t('adminPortal')}
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link to="/account" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                        {t('myAccount')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/orders" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                        {t('myOrders')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/addresses" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                        {t('addresses')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/account/bookmarks" className="dropdown-item rounded-3 py-2 fw-semibold d-flex align-items-center gap-2" onClick={() => setIsOpen(false)}>
                        <Heart size={16} className="text-danger fill-danger" /> {t('bookmarks')}
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item rounded-3 py-2 text-danger fw-bold d-flex align-items-center gap-2">
                        <LogOut size={16} /> {t('logout')}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="dropdown-item rounded-3 py-2 fw-semibold" onClick={() => setIsOpen(false)}>
                        {t('login')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item rounded-3 py-2 fw-semibold text-warning" onClick={() => setIsOpen(false)}>
                        {t('register')}
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link to="/admin/login" className="dropdown-item rounded-3 py-2 text-muted small" onClick={() => setIsOpen(false)}>
                        {t('adminPortal')}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="btn btn-primary-custom d-flex align-items-center gap-2 position-relative px-3 py-2 shadow-md">
              <ShoppingBag size={18} />
              <span>{t('cart')}</span>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white shadow-sm font-monospace">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
