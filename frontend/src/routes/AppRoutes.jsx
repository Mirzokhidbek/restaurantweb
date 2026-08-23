/**
 * FAZO Restorani Namangan - Centralized React Router Configuration
 * 
 * Clean Code Architecture Principles:
 * - Single Source of Truth for Route Navigation & Layout Nesting.
 * - Grouped Route Structure: Customer Public Pages, User Account Portal, Auth Pages, and Protected Admin Portal.
 * - Wildcard 404 Catch-All handling.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Customer Pages
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import FastFoodMenu from '../pages/FastFoodMenu';
import RestaurantFoodMenu from '../pages/RestaurantFoodMenu';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import About from '../pages/About';
import Contact from '../pages/Contact';

// Specialty & Information Pages
import ChefPage from '../pages/ChefPage';
import ChefDetails from '../pages/ChefDetails';
import TestimonialPage from '../pages/TestimonialPage';
import FaqPage from '../pages/FaqPage';
import TermsConditions from '../pages/TermsConditions';
import NotFound from '../pages/NotFound';

// Customer Portal & Authentication Pages
import Register from '../pages/Register';
import CustomerLogin from '../pages/CustomerLogin';
import ForgotPassword from '../pages/ForgotPassword';
import MyAccount from '../pages/MyAccount';
import MyOrders from '../pages/MyOrders';
import AddressPage from '../pages/AddressPage';
import BookmarkPage from '../pages/BookmarkPage';

// Admin Portal Components & Protected Layouts
import AdminLogin from '../admin/AdminLogin';
import AdminLayout from '../admin/AdminLayout';
import AdminDashboard from '../admin/AdminDashboard';
import AdminProducts from '../admin/AdminProducts';
import AdminCategories from '../admin/AdminCategories';
import AdminOrders from '../admin/AdminOrders';
import AdminCustomers from '../admin/AdminCustomers';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home & Overview */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Menu & Food Catalog Routes */}
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/fast-food" element={<FastFoodMenu />} />
      <Route path="/menu/restaurant" element={<RestaurantFoodMenu />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Order & Checkout Pipeline */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* Chefs, Reviews & Information Portal */}
      <Route path="/chefs" element={<ChefPage />} />
      <Route path="/chefs/:id" element={<ChefDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<TestimonialPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/terms" element={<TermsConditions />} />

      {/* Customer User Account Portal */}
      <Route path="/account" element={<MyAccount />} />
      <Route path="/account/orders" element={<MyOrders />} />
      <Route path="/account/addresses" element={<AddressPage />} />
      <Route path="/account/bookmarks" element={<BookmarkPage />} />

      {/* Authentication Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 404 Fallback View */}
      <Route path="/404" element={<NotFound />} />

      {/* Protected Admin Portal */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Route>

      {/* Wildcard Catch-All 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
