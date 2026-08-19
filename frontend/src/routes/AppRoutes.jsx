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

// Figma Expanded Pages
import ChefPage from '../pages/ChefPage';
import ChefDetails from '../pages/ChefDetails';
import TestimonialPage from '../pages/TestimonialPage';
import FaqPage from '../pages/FaqPage';
import TermsConditions from '../pages/TermsConditions';
import NotFound from '../pages/NotFound';

// Customer Portal & Auth Pages
import Register from '../pages/Register';
import CustomerLogin from '../pages/CustomerLogin';
import ForgotPassword from '../pages/ForgotPassword';
import MyAccount from '../pages/MyAccount';
import MyOrders from '../pages/MyOrders';
import AddressPage from '../pages/AddressPage';
import BookmarkPage from '../pages/BookmarkPage';

// Admin Components & Pages
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
      {/* 01_Home_page */}
      <Route path="/" element={<Home />} />

      {/* 02_About_us_page */}
      <Route path="/about" element={<About />} />

      {/* 03_Food_product_list_page */}
      <Route path="/menu" element={<Menu />} />
      {/* 10_Fast_Food_menu_page */}
      <Route path="/menu/fast-food" element={<FastFoodMenu />} />
      {/* 11_Restaurant_Food_menu_page */}
      <Route path="/menu/restaurant" element={<RestaurantFoodMenu />} />

      {/* 05_Food_product_details_page */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* 06_Cart_page */}
      <Route path="/cart" element={<CartPage />} />

      {/* 07_Checkout_page & Order Success */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* 08_Chef_page & 09_Chef_Details_page */}
      <Route path="/chefs" element={<ChefPage />} />
      <Route path="/chefs/:id" element={<ChefDetails />} />

      {/* 14_Contact_us_page */}
      <Route path="/contact" element={<Contact />} />

      {/* 15_Testimonial_page */}
      <Route path="/testimonials" element={<TestimonialPage />} />

      {/* 16_FAQ_page */}
      <Route path="/faq" element={<FaqPage />} />

      {/* 17_My_Account, 18_My_Orders, 19_Address, 20_Book_Mark */}
      <Route path="/account" element={<MyAccount />} />
      <Route path="/account/orders" element={<MyOrders />} />
      <Route path="/account/addresses" element={<AddressPage />} />
      <Route path="/account/bookmarks" element={<BookmarkPage />} />

      {/* 21_Terms_&_Conditions_page */}
      <Route path="/terms" element={<TermsConditions />} />

      {/* 23_Register, 26_Login, 29_Forgot_password */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 22_404_page */}
      <Route path="/404" element={<NotFound />} />

      {/* Admin Routes */}
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

      {/* Wildcard Fallback 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
