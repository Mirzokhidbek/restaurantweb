import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { useLanguage } from '../context/LanguageContext';
import { Search, Utensils } from 'lucide-react';

const Menu = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
        ]);

        if (prodRes.success && prodRes.data) setProducts(prodRes.data);
        if (catRes.success && catRes.data) {
          setCategories(catRes.data);
          if (categoryParam) {
            const matchedCat = catRes.data.find(
              (c) => c.name.toLowerCase() === categoryParam.toLowerCase() || c._id === categoryParam
            );
            if (matchedCat) {
              setSelectedCategory(matchedCat._id);
            }
          }
        }
      } catch (err) {
        setError(err.message || 'Ma’lumotlarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryParam]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (typeof product.category === 'object'
        ? product.category._id === selectedCategory
        : product.category === selectedCategory);

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Title */}
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-2 border border-warning border-opacity-30">
            FAZO Restorani Namangan • 100% Halol
          </span>
          <h1 className="display-5 fw-extrabold text-dark font-heading">{t('menuHeading')}</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
            {t('menuSubheading')}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="row g-3 justify-content-between align-items-center mb-4">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="input-group bg-white rounded-pill shadow-sm overflow-hidden border border-warning border-opacity-30">
              <span className="input-group-text border-0 bg-transparent ps-3">
                <Search size={18} className="text-warning" />
              </span>
              <input
                type="text"
                className="form-control border-0 py-2 shadow-none"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-8">
            <div className="d-flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                className={`category-pill border-0 ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                {t('allCategories')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className={`category-pill border-0 ${selectedCategory === cat._id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat._id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <Loading text="Barcha taomlar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div className="p-3 bg-white rounded-circle d-inline-flex mb-3 shadow-sm">
              <Utensils size={36} className="text-muted" />
            </div>
            <h5 className="fw-bold text-dark">{t('noProductsFound')}</h5>
            <p className="text-muted small">{t('noProductsDesc')}</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ProductCard product={product} onViewDetails={(prod) => setSelectedProduct(prod)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Details Modal */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default Menu;
