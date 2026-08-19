import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingBag, CheckCircle, ShieldCheck } from 'lucide-react';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductById(id);
        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.isAvailable) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  if (loading) return <Loading text="Loading food details..." />;
  if (error) return <div className="container py-5"><ErrorMessage message={error} /></div>;
  if (!product) return null;

  return (
    <div className="product-details-page py-5 bg-light min-vh-100">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-outline-dark btn-sm rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Menu
        </button>

        <div className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white p-4 p-lg-5">
          <div className="row g-5 align-items-center">
            {/* Image Column */}
            <div className="col-lg-6">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ height: '400px' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-100 h-100 object-fit-cover"
                />
                {product.isPopular && <span className="badge-popular">Popular 🔥</span>}
              </div>
            </div>

            {/* Info Column */}
            <div className="col-lg-6">
              <div className="mb-3">
                <span className="badge bg-dark bg-opacity-75 rounded-pill px-3 py-1 text-white me-2">
                  {typeof product.category === 'object' ? product.category.name : 'Category'}
                </span>
                {product.isAvailable ? (
                  <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1">
                    Available
                  </span>
                ) : (
                  <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1">
                    Unavailable
                  </span>
                )}
              </div>

              <h1 className="display-6 fw-extrabold text-dark mb-3">{product.name}</h1>
              <p className="text-secondary lead mb-4" style={{ lineHeight: '1.7' }}>
                {product.description}
              </p>

              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                <span className="text-muted fw-semibold">Price per item</span>
                <span className="display-6 fw-extrabold text-primary">${product.price.toFixed(2)}</span>
              </div>

              {/* Quantity selector */}
              <div className="d-flex align-items-center justify-content-between mb-4 bg-light p-3 rounded-4">
                <span className="fw-bold text-dark">Select Quantity</span>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !product.isAvailable}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="fw-extrabold fs-4 px-2">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={!product.isAvailable}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                className={`btn w-100 py-3 ${
                  added ? 'btn-success' : product.isAvailable ? 'btn-primary-custom' : 'btn-secondary'
                } d-flex align-items-center justify-content-center gap-2 fs-5 fw-bold rounded-pill shadow-lg`}
              >
                {added ? (
                  <>
                    <CheckCircle size={22} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={22} />
                    <span>
                      {product.isAvailable
                        ? `Add to Cart • $${(product.price * quantity).toFixed(2)}`
                        : 'Currently Unavailable'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
