import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatCurrency';
import EmptyState from '../components/EmptyState';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const freeDeliveryThreshold = 150000;
  const isFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const progressPercent = Math.min(100, (totalPrice / freeDeliveryThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page py-5 bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <EmptyState
            title={t('emptyCartTitle')}
            description={t('emptyCartDesc')}
            actionText={t('browseMenuBtn')}
            actionLink="/menu"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="fw-extrabold text-dark mb-0 font-heading">{t('cartTitle')}</h1>
          <button onClick={clearCart} className="btn btn-outline-danger btn-sm rounded-pill px-3">
            {t('clearCart')}
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold text-dark small">
              {isFreeDelivery
                ? '🎉 Tabriklaymiz! Siz bepul yetkazib berish huquqiga egasiz!'
                : `Yana ${formatCurrency(freeDeliveryThreshold - totalPrice)} qo‘shing va bepul yetkazib berishga ega bo‘ling!`}
            </span>
            <span className="fw-bold text-primary small">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="progress rounded-pill style-progress" style={{ height: '8px' }}>
            <div
              className={`progress-bar rounded-pill ${isFreeDelivery ? 'bg-success' : 'bg-warning'}`}
              style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease' }}
            ></div>
          </div>
        </div>

        <div className="row g-4">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden p-3 p-md-4">
              <div className="d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between p-3 rounded-4 bg-light gap-3 border"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-3 object-fit-cover flex-shrink-0"
                        style={{ width: '80px', height: '80px' }}
                      />
                      <div>
                        <h6 className="fw-bold text-dark mb-1">{item.name}</h6>
                        <small className="text-muted d-block">{t('unitPrice')}: {formatCurrency(item.price)}</small>
                        <span className="fw-extrabold text-primary">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 w-100-mobile">
                      <div className="d-flex align-items-center gap-2 bg-white px-2 py-1 rounded-pill border">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="fw-bold px-2">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-link text-danger p-0 border-0"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
              <h5 className="fw-bold text-dark mb-4">{t('orderSummary')}</h5>

              <div className="d-flex justify-content-between text-secondary mb-3">
                <span>{t('subtotal')}</span>
                <span className="fw-bold text-dark">{formatCurrency(totalPrice)}</span>
              </div>

              <div className="d-flex justify-content-between text-secondary mb-3">
                <span>{t('deliveryFee')}</span>
                <span className={`fw-bold ${isFreeDelivery ? 'text-success' : 'text-dark'}`}>
                  {isFreeDelivery ? t('freeDelivery') : formatCurrency(15000)}
                </span>
              </div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between text-dark fs-5 fw-extrabold mb-4 font-heading">
                <span>{t('totalPrice')}</span>
                <span className="text-primary">{formatCurrency(totalPrice + (isFreeDelivery ? 0 : 15000))}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-lg"
              >
                <span>{t('proceedCheckout')}</span>
                <ArrowRight size={18} />
              </button>

              <Link to="/menu" className="btn btn-light w-100 py-2 rounded-pill mt-2 text-muted fw-semibold small d-inline-flex align-items-center justify-content-center gap-1">
                <ArrowLeft size={14} /> {t('browseMenuBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
