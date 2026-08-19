import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  const itemSubtotal = product.price * quantity;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 mb-3 bg-white">
      <div className="row align-items-center g-3">
        {/* Product Image */}
        <div className="col-auto">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3 object-fit-cover"
            style={{ width: '70px', height: '70px' }}
          />
        </div>

        {/* Product Info */}
        <div className="col">
          <h6 className="fw-bold text-dark mb-1">{product.name}</h6>
          <div className="text-muted small">
            ${product.price.toFixed(2)} × {quantity}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-auto">
          <div className="d-flex align-items-center gap-2 bg-light p-1 rounded-pill border">
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product._id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="fw-bold px-2" style={{ minWidth: '24px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(product._id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Subtotal & Delete */}
        <div className="col-auto text-end" style={{ minWidth: '100px' }}>
          <div className="fw-extrabold text-primary fs-6 mb-1">
            ${itemSubtotal.toFixed(2)}
          </div>
          <button
            onClick={() => onRemove(product._id)}
            className="btn btn-link text-danger p-0 border-0 text-decoration-none small d-inline-flex align-items-center gap-1"
            title="Remove from cart"
          >
            <Trash2 size={15} />
            <span className="d-none d-sm-inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
