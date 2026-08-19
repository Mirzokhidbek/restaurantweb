import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import ErrorMessage from './ErrorMessage';

const OrderForm = () => {
  const { cart, subtotal, deliveryFee, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError('Please fill in all required fields (Full Name, Phone Number, and Address).');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty. Please add items before checking out.');
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }));

      const payload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        items: orderItems,
      };

      const response = await orderService.createOrder(payload);

      if (response.success && response.data) {
        clearCart();
        navigate('/order-success', { state: { order: response.data } });
      } else {
        setError(response.message || 'Failed to place order.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <div className="row g-4">
        {/* Customer Information Form */}
        <div className="col-lg-7">
          <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
            <h4 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <User size={24} className="text-warning" /> Customer Information
            </h4>

            <div className="mb-4">
              <label htmlFor="customerName" className="form-label fw-semibold text-dark">
                Full Name <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-4">
                  <User size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  className="form-control bg-light border-start-0 rounded-end-4 py-2"
                  placeholder="e.g. John Doe"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label fw-semibold text-dark">
                Phone Number <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-4">
                  <Phone size={18} className="text-muted" />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control bg-light border-start-0 rounded-end-4 py-2"
                  placeholder="e.g. +1 (555) 000-1234"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="form-label fw-semibold text-dark">
                Delivery Address <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-4">
                  <MapPin size={18} className="text-muted" />
                </span>
                <textarea
                  id="address"
                  name="address"
                  className="form-control bg-light border-start-0 rounded-end-4 py-2"
                  rows="3"
                  placeholder="Street name, house/apartment number, city, and zip code"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="notes" className="form-label fw-semibold text-dark">
                Delivery Instructions / Notes (Optional)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-4">
                  <FileText size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  className="form-control bg-light border-start-0 rounded-end-4 py-2"
                  placeholder="e.g. Please leave at front door, ring bell"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 text-muted small bg-light p-3 rounded-3">
              <ShieldCheck size={18} className="text-success flex-shrink-0" />
              <span>Cash on delivery / Card payment upon arrival. Safe and fast.</span>
            </div>
          </div>
        </div>

        {/* Right Side Order Summary */}
        <div className="col-lg-5">
          <div className="card border-0 rounded-4 shadow-sm p-4 sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold text-dark mb-4 border-bottom pb-3">Order Summary</h5>

            <div className="mb-4" style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.product._id} className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="rounded-3 object-fit-cover"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-0 text-dark small">{item.product.name}</h6>
                    <small className="text-muted">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </small>
                  </div>
                  <span className="fw-bold text-dark">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-2 text-secondary">
              <span>Subtotal</span>
              <span className="fw-bold text-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 text-secondary">
              <span>Delivery Fee</span>
              <span className="fw-bold text-dark">
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-4 pt-2 border-top">
              <span className="fs-5 fw-extrabold text-dark">Total</span>
              <span className="fs-4 fw-extrabold text-primary">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold fs-6 rounded-pill"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Placing Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Confirm & Place Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
