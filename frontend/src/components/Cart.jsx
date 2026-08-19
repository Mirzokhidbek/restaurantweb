import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import EmptyState from './EmptyState';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, deliveryFee, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        description="Looks like you haven't added any savory dishes to your cart yet."
        actionText="Explore Menu"
        actionLink="/menu"
      />
    );
  }

  return (
    <div className="row g-4">
      {/* Cart Items List */}
      <div className="col-lg-8">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold text-dark mb-0">Selected Items ({cart.length})</h4>
          <Link to="/menu" className="text-warning fw-semibold text-decoration-none d-flex align-items-center gap-1">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cart.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      {/* Summary Card */}
      <div className="col-lg-4">
        <div className="card border-0 rounded-4 shadow-sm p-4 sticky-top" style={{ top: '90px' }}>
          <h5 className="fw-bold text-dark mb-4 border-bottom pb-3">Order Summary</h5>

          <div className="d-flex justify-content-between mb-3 text-secondary">
            <span>Subtotal</span>
            <span className="fw-bold text-dark">${subtotal.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between mb-3 text-secondary">
            <span className="d-flex align-items-center gap-1">
              <Truck size={16} className="text-warning" /> Delivery Fee
            </span>
            <span className="fw-bold text-dark">
              {deliveryFee === 0 ? (
                <span className="badge bg-success bg-opacity-10 text-success">FREE</span>
              ) : (
                `$${deliveryFee.toFixed(2)}`
              )}
            </span>
          </div>

          {subtotal < 35 && (
            <div className="alert alert-warning py-2 px-3 small rounded-3 border-0 mb-3" style={{ fontSize: '0.82rem' }}>
              💡 Add <strong>${(35 - subtotal).toFixed(2)}</strong> more to get FREE delivery!
            </div>
          )}

          <hr className="my-3" />

          <div className="d-flex justify-content-between mb-4">
            <span className="fs-5 fw-extrabold text-dark">Total Price</span>
            <span className="fs-4 fw-extrabold text-primary">${totalPrice.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="btn btn-primary-custom w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold fs-6 rounded-pill"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
