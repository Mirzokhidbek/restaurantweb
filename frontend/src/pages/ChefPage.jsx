import React, { useState, useEffect } from 'react';
import ChefCard from '../components/ChefCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import chefService from '../services/chefService';

const ChefPage = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        setLoading(true);
        const res = await chefService.getChefs();
        if (res.success && res.data) {
          setChefs(res.data);
        }
      } catch (err) {
        setError(err.message || 'Oshpazlar ro‘yxatini yuklashda xatolik.');
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  return (
    <div className="chef-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-dark px-3 py-2 rounded-pill fw-bold mb-2">
            Mahoratli Oshpazlarimiz
          </span>
          <h1 className="display-5 fw-extrabold text-dark">Bosh Oshpazlar</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '580px' }}>
            Tajribali va mahoratli oshpazlarimiz tomonidan tayyorlanadigan masalliqli shirin taomlar.
          </p>
        </div>

        {loading ? (
          <Loading text="Oshpazlar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="row g-4">
            {chefs.map((chef) => (
              <div key={chef._id} className="col-12 col-sm-6 col-lg-3">
                <ChefCard chef={chef} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefPage;
