import React, { useState } from 'react';
import { Plus, Check, Eye, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatCurrency';
import bookmarkService from '../services/bookmarkService';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.isAvailable) {
      addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
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

  return (
    <div
      className="card-food rounded-4 bg-white shadow-sm border overflow-hidden h-100 d-flex flex-column transition-all"
      onClick={() => onViewDetails && onViewDetails(product)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image & Badges Container */}
      <div className="food-image-wrapper position-relative overflow-hidden" style={{ height: '210px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="food-image w-100 h-100 object-fit-cover transition-transform"
          loading="lazy"
        />

        {/* Top-Left Category Badge */}
        <span className="badge-category">
          {categoryName}
        </span>

        {/* Top-Right Popular Badge / Wishlist Toggle */}
        <div className="position-absolute top-0 end-0 m-3 d-flex align-items-center gap-2 z-2">
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

        {/* Unavailable Overlay */}
        {!product.isAvailable && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-70 d-flex align-items-center justify-content-center z-3">
            <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill fw-bold">{t('unavailable')}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between flex-grow-1">
        <div>
          {/* Rating stars & review indicator */}
          <div className="d-flex align-items-center gap-1 mb-2">
            <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.8rem' }}>
              <Star size={14} fill="#ff9800" />
              <Star size={14} fill="#ff9800" />
              <Star size={14} fill="#ff9800" />
              <Star size={14} fill="#ff9800" />
              <Star size={14} fill="#ff9800" />
            </div>
            <span className="text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
              {t('ratingLabel')}
            </span>
          </div>

          {/* Title */}
          <h5 className="fw-extrabold text-dark mb-2 text-truncate font-heading" title={product.name} style={{ fontSize: '1.1rem' }}>
            {product.name}
          </h5>

          {/* Description */}
          <p
            className="text-secondary small mb-3"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.5',
              height: '38px',
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Bottom Footer: Price & Actions */}
        <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
          <div>
            <span className="text-muted d-block fw-semibold" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('priceLabel')}
            </span>
            <span className="fs-5 fw-extrabold text-primary font-heading">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails && onViewDetails(product);
              }}
              className="btn btn-light btn-sm rounded-circle p-2 border"
              title={t('quickView')}
              style={{ width: '38px', height: '38px', display: 'inline-flex', alignItems: 'center', justify: 'center' }}
            >
              <Eye size={18} className="text-secondary" />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable || added}
              className={`btn ${
                added
                  ? 'btn-success'
                  : product.isAvailable
                  ? 'btn-primary-custom'
                  : 'btn-secondary opacity-50'
              } d-flex align-items-center justify-content-center gap-1 px-3 py-2 rounded-pill fw-bold shadow-sm`}
              style={{ minWidth: '85px', fontSize: '0.88rem' }}
              title={product.isAvailable ? t('addToCart') : t('unavailable')}
            >
              {added ? (
                <>
                  <Check size={16} />
                  <span>{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>+</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
