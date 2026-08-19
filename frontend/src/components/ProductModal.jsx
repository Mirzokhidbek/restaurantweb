import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CheckCircle, Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatCurrency';
import bookmarkService from '../services/bookmarkService';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.isAvailable) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 900);
    }
  };

  const handleToggleBookmark = async (e) => {
    e.stopPropagation();
    try {
      await bookmarkService.toggleBookmark(product._id);
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      setIsBookmarked(!isBookmarked);
    }
  };

  const categoryName =
    typeof product.category === 'object' && product.category
      ? product.category.name
      : 'Food';

  const totalPrice = product.price * quantity;

  return (
    <div
      className="modal fade show d-block modal-backdrop-custom"
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg px-2 px-md-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-5 overflow-hidden shadow-lg position-relative bg-white">
          {/* Floating Close Button */}
          <button
            type="button"
            className="btn-close-custom position-absolute top-0 end-0 m-3 z-3 bg-white text-dark rounded-circle p-2 shadow-sm border-0 d-flex align-items-center justify-content-center"
            onClick={onClose}
            aria-label="Close modal"
            style={{ width: '38px', height: '38px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <X size={20} />
          </button>

          <div className="modal-body p-0">
            <div className="row g-0 align-items-stretch">
              {/* Product Image Column */}
              <div className="col-md-6 position-relative min-vh-25">
                <div className="h-100 position-relative" style={{ minHeight: '340px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t opacity-30"></div>

                  {/* Badges on Image */}
                  <span className="badge-category">
                    {categoryName}
                  </span>

                  <div className="position-absolute top-0 end-0 me-5 mt-3 d-flex align-items-center gap-2 z-2">
                    {product.isPopular && <span className="badge-popular">{t('popularBadge')}</span>}
                    <button
                      onClick={handleToggleBookmark}
                      className={`btn btn-sm rounded-circle border-0 d-flex align-items-center justify-content-center p-2 shadow-sm ${
                        isBookmarked ? 'bg-danger text-white' : 'bg-white text-dark bg-opacity-90'
                      }`}
                      style={{ width: '34px', height: '34px', backdropFilter: 'blur(8px)' }}
                      title={t('saveWishlist')}
                    >
                      <Heart size={16} fill={isBookmarked ? '#ffffff' : 'none'} className={isBookmarked ? 'text-white' : 'text-danger'} />
                    </button>
                  </div>

                  {/* Micro Info Pills on Bottom of Image */}
                  <div className="position-absolute bottom-0 start-0 m-3 d-flex align-items-center gap-2 z-2">
                    <span className="badge bg-dark bg-opacity-75 text-warning backdrop-blur rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1">
                      <Star size={14} fill="#ff9800" /> {t('ratingLabel')}
                    </span>
                    <span className="badge bg-dark bg-opacity-75 text-white backdrop-blur rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1">
                      <Clock size={14} /> {t('prepTime')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Details Column */}
              <div className="col-md-6 p-4 p-lg-5 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="badge bg-secondary bg-opacity-10 text-dark rounded-pill px-3 py-1 fw-bold text-uppercase" style={{ fontSize: '0.72rem' }}>
                      {categoryName}
                    </span>
                    {product.isAvailable ? (
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-semibold small">
                        {t('inStock')}
                      </span>
                    ) : (
                      <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1 fw-semibold small">
                        {t('unavailable')}
                      </span>
                    )}
                  </div>

                  <h2 className="fw-extrabold text-dark mb-3 font-heading lh-sm">{product.name}</h2>
                  <p className="text-secondary mb-4" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Price & Quantity Selector */}
                  <div className="d-flex align-items-center justify-content-between mb-4 pt-3 border-top">
                    <div>
                      <span className="text-muted small d-block fw-semibold" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        {t('unitPrice')}
                      </span>
                      <span className="fs-4 fw-extrabold text-primary font-heading">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="bg-light p-2 rounded-pill border d-flex align-items-center gap-3">
                      <button
                        className="qty-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1 || !product.isAvailable}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="fw-extrabold fs-5 px-1">{quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={!product.isAvailable}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.isAvailable || added}
                    className={`btn w-100 py-3 ${
                      added
                        ? 'btn-success'
                        : product.isAvailable
                        ? 'btn-primary-custom'
                        : 'btn-secondary'
                    } d-flex align-items-center justify-content-center gap-2 fs-6 fw-bold rounded-pill shadow-lg`}
                  >
                    {added ? (
                      <>
                        <CheckCircle size={20} />
                        <span>{t('addedToCart')}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        <span>
                          {product.isAvailable
                            ? `${t('addToCart')} • ${formatCurrency(totalPrice)}`
                            : t('unavailable')}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="d-flex align-items-center justify-content-center gap-1 text-muted small mt-3" style={{ fontSize: '0.78rem' }}>
                    <ShieldCheck size={16} className="text-success" />
                    <span>{t('guaranteeText')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
