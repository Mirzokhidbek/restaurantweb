import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatCurrency';
import orderService from '../services/orderService';
import ErrorMessage from '../components/ErrorMessage';
import { ShieldCheck, Truck, CreditCard, ShoppingBag, ArrowRight, UserCheck, Info } from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { adminUser, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: adminUser?.name || '',
    customerEmail: adminUser?.email || '',
    phone: adminUser?.phone || '',
    street: adminUser?.addresses?.[0]?.street || '',
    city: 'Namangan',
    paymentMethod: 'Cash on Delivery',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = totalPrice >= 150000 ? 0 : 15000;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderPayload = {
      items: cartItems.map((i) => ({
        product: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      })),
      totalPrice: finalTotal,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      phone: formData.phone,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
      },
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
    };

    try {
      const res = await orderService.createOrder(orderPayload);
      if (res.success) {
        clearCart();
        navigate('/order-success', { state: { order: res.data } });
      }
    } catch (err) {
      setError(err.message || 'Buyurtma berishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page py-5 bg-light min-vh-100">
      <div className="container">
        <h1 className="fw-extrabold text-dark mb-4 font-heading">{t('checkoutTitle')}</h1>

        {/* Login Notification Banner */}
        {!isAuthenticated ? (
          <div className="card border-0 rounded-4 shadow-sm p-4 mb-4 bg-white border-start border-4 border-warning">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-warning bg-opacity-15 text-dark rounded-circle flex-shrink-0">
                  <UserCheck size={26} className="text-warning" />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1 fs-6">
                    💡 Buyurtmani Kuzatish Uchun Tizimga Kiring!
                  </h6>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>
                    Tizimga kirsangiz, buyurtma holatini real vaqtda kuzatishingiz va keyingi safar 1-klikda buyurtma berishingiz mumkin.
                  </p>
                </div>
              </div>
              <Link to="/login" className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 text-nowrap shadow-sm">
                Tizimga Kirish
              </Link>
            </div>
          </div>
        ) : (
          <div className="alert alert-success border-0 rounded-4 p-3 mb-4 d-flex align-items-center gap-2 shadow-sm">
            <ShieldCheck size={22} className="text-success flex-shrink-0" />
            <span className="small text-dark">
              Xush kelibsiz, <strong>{adminUser?.name}</strong>! Ushbu buyurtma shaxsiy profilingizga biriktiriladi.
            </span>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmitOrder}>
          <div className="row g-4">
            {/* Customer Details & Address Form */}
            <div className="col-lg-7">
              <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 mb-4">
                <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <Truck size={20} className="text-warning" /> {t('customerInfo')}
                </h5>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">{t('fullName')}</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      required
                      placeholder="Ismingiz va familiyangiz"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      className="form-control rounded-3 py-2"
                      required
                      placeholder="+998 (90) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">{t('deliveryAddress')}</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      required
                      placeholder="Masalan: Islom Karimov ko‘chasi, 25-uy"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">{t('deliveryCity')}</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">{t('orderNotes')}</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="3"
                      placeholder="Masalan: Achchiq solinmasin, kelganda qo‘ng‘iroq qiling..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <CreditCard size={20} className="text-warning" /> {t('paymentMethod')}
                </h5>
                <div className="form-check p-3 border rounded-3 bg-light d-flex align-items-center gap-2">
                  <input
                    className="form-check-input ms-0 me-2"
                    type="radio"
                    checked
                    readOnly
                  />
                  <label className="form-check-label fw-semibold text-dark mb-0">
                    {t('cashOnDelivery')}
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="col-lg-5">
              <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 position-sticky" style={{ top: '90px' }}>
                <h5 className="fw-bold text-dark mb-4">{t('orderSummary')}</h5>

                <div className="mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="d-flex justify-content-between text-dark small mb-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="fw-bold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between text-secondary mb-2">
                  <span>{t('subtotal')}</span>
                  <span className="fw-bold text-dark">{formatCurrency(totalPrice)}</span>
                </div>

                <div className="d-flex justify-content-between text-secondary mb-3">
                  <span>{t('deliveryFee')}</span>
                  <span className="fw-bold text-success">
                    {deliveryFee === 0 ? t('freeDelivery') : formatCurrency(deliveryFee)}
                  </span>
                </div>

                <div className="d-flex justify-content-between text-dark fs-4 fw-extrabold mb-4 font-heading">
                  <span>{t('totalPrice')}</span>
                  <span className="text-primary">{formatCurrency(finalTotal)}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6 shadow-lg"
                >
                  {loading ? t('processingOrder') : t('placeOrderBtn')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
