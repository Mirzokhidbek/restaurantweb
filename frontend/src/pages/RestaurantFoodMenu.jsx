import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import productService from '../services/productService';
import { useLanguage } from '../context/LanguageContext';
import { Utensils } from 'lucide-react';

const RestaurantFoodMenu = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchFineDining = async () => {
      try {
        setLoading(true);
        const res = await productService.getProducts();
        if (res.success && res.data) {
          const gourmetCategories = ['Milliy Taomlar', 'Turk Oshxonasi', 'Shirinliklar'];
          const filtered = res.data.filter((p) => {
            const catName = typeof p.category === 'object' ? p.category.name : '';
            return gourmetCategories.includes(catName);
          });
          setProducts(filtered.length > 0 ? filtered : res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load restaurant dishes.');
      } finally {
        setLoading(false);
      }
    };
    fetchFineDining();
  }, []);

  return (
    <div className="restaurant-food-menu-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-dark fw-bold mb-2">
            <Utensils size={16} className="text-warning" /> Gourmet Fine Dining
          </div>
          <h1 className="display-5 fw-extrabold text-dark">{t('restaurantHeading')}</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
            {t('restaurantSubheading')}
          </p>
        </div>

        {loading ? (
          <Loading text="Taomlar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ProductCard product={product} onViewDetails={(prod) => setSelectedProduct(prod)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default RestaurantFoodMenu;
