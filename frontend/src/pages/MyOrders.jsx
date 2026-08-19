import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatCurrency';
import { ShoppingBag, Clock, MapPin } from 'lucide-react';

const MyOrders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await authService.getMyOrders();
        if (res.success && res.data) {
          setOrders(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch your orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
      case 'confirmed': return 'bg-info text-white';
      case 'preparing': return 'bg-primary text-white';
      case 'ready': return 'bg-success text-white';
      case 'completed': return 'bg-secondary text-white';
      case 'cancelled': return 'bg-danger text-white';
      default: return 'bg-light text-dark';
    }
  };

  return (
    <div className="my-orders-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-extrabold text-dark mb-1">{t('ordersHistoryTitle')}</h1>
          <p className="text-secondary">{t('ordersHistoryDesc')}</p>
        </div>

        {loading ? (
          <Loading text="Buyurtmalar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : orders.length === 0 ? (
          <EmptyState
            title={t('noOrdersTitle')}
            description={t('noOrdersDesc')}
            actionText={t('browseMenuBtn')}
            actionLink="/menu"
          />
        ) : (
          <div className="row g-4">
            {orders.map((ord) => (
              <div key={ord._id} className="col-12 col-lg-6">
                <div className="card border-0 rounded-4 shadow-sm bg-white p-4">
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <span className="text-muted small d-block">{t('orderRef')}</span>
                      <span className="fw-extrabold text-dark font-monospace">#{ord._id}</span>
                    </div>
                    <span className={`badge rounded-pill px-3 py-2 text-uppercase ${getStatusBadgeClass(ord.status)}`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="text-muted small d-block mb-1">Items:</span>
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between small text-dark mb-1">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="fw-bold">{formatCurrency(item.subtotal)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top bg-light p-3 rounded-3">
                    <div>
                      <small className="text-muted d-block">{new Date(ord.createdAt).toLocaleDateString()}</small>
                    </div>
                    <span className="fs-5 fw-extrabold text-primary">
                      {t('totalPrice')}: {formatCurrency(ord.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
