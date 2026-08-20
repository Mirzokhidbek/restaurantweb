import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import bookmarkService from '../services/bookmarkService';
import { Heart } from 'lucide-react';

const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await bookmarkService.getBookmarks();
        if (res.success && res.data) {
          setBookmarks(res.data);
        }
      } catch (err) {
        setError(err.message || 'Saqlangan taomlarni yuklashda xatolik.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="bookmark-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-extrabold text-dark mb-1 d-flex align-items-center gap-2">
            <Heart size={32} className="text-danger fill-danger" /> Tanlangan Taomlar
          </h1>
          <p className="text-secondary">O‘zingiz yoqtirgan sevimli taomlaringizga tezkor kirish.</p>
        </div>

        {loading ? (
          <Loading text="Tanlangan taomlar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : bookmarks.length === 0 ? (
          <EmptyState
            title="Saqlangan Taomlar Yo‘q"
            description="Siz hali hech qanday taomni tanlanganlarga saqlamadingiz."
            actionText="Menyuni Ko‘rish"
            actionLink="/menu"
          />
        ) : (
          <div className="row g-4">
            {bookmarks.map((product) => (
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

export default BookmarkPage;
