import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, ArrowRight, ShieldCheck, Heart, Clock, MapPin, Phone } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import categoryService from '../services/categoryService';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const catRes = await categoryService.getCategories();
        if (isMounted && catRes.success && catRes.data) {
          setCategories(catRes.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Kategoriyalarni yuklashda xatolik yuz berdi.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/menu?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Food Categories Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-2 border border-warning border-opacity-30">
              Menyu Turlari
            </span>
            <h2 className="display-6 fw-extrabold text-dark font-heading">Taomlar Kategoriyalari</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
              O‘zingizga ma’qul taom turini tanlang va Namangan to‘y oshi, shashliklar hamda turk oshxona taomlarini kashf eting.
            </p>
          </div>

          {loading ? (
            <Loading text="Kategoriyalar yuklanmoqda..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="row g-3 g-md-4">
              {categories.map((category) => (
                <div key={category._id} className="col-6 col-md-4 col-lg-3">
                  <CategoryCard
                    category={category}
                    onClick={() => handleCategoryClick(category.name)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA to Full Menu Page */}
          <div className="text-center mt-5">
            <Link to="/menu" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg d-inline-flex align-items-center gap-2">
              <Utensils size={20} />
              <span>Barcha Taomlar Menyusini Ko‘rish</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. About Restaurant Story Section */}
      <section className="py-5 bg-light overflow-hidden">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="FAZO Restorani Zali"
                  className="img-fluid rounded-5 shadow-lg object-fit-cover w-100 border border-white border-4"
                  style={{ height: '440px' }}
                />
                <div className="position-absolute bottom-0 end-0 translate-middle-y me-4 mb-3 bg-white p-4 rounded-4 shadow-lg d-none d-sm-block border border-warning border-opacity-30">
                  <h3 className="fw-extrabold text-warning mb-0">15+ Yillik</h3>
                  <small className="text-dark fw-bold">Sifat va Mehmondostlik</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-3 border border-warning border-opacity-30">
                Oshxona Sifati va Tariximiz
              </span>
              <h2 className="display-6 fw-extrabold text-dark mb-4 font-heading">
                Yangi Masalliqlar. Oshxona Mahorati.
              </h2>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                Fazo restorani Namangan shahrida sifatli va yangi masalliqlar, saralangan qo‘y go‘shti va Devzira guruchidan tayyorlangan mazali taomlari bilan mashhur. Har bir taomimizda sharqona mehmondostlik va samimiyat mavjud.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-white rounded-4 border shadow-sm">
                    <ShieldCheck className="text-warning mb-2" size={24} />
                    <h6 className="fw-bold mb-1 text-dark">Oliy Sifat Kafolati</h6>
                    <small className="text-muted">Pokiza va sertifikatlangan</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-white rounded-4 border shadow-sm">
                    <Heart className="text-danger mb-2" size={24} />
                    <h6 className="fw-bold mb-1 text-dark">Mexr Bilan Pishirilgan</h6>
                    <small className="text-muted">Mualliflik retseptlari</small>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary-custom px-4 py-3 d-inline-flex align-items-center gap-2">
                <span>Biz haqimizda ko‘proq</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Restaurant Information Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-lg-4">
          <div className="row g-4 align-items-center">
            <div className="col-md-4">
              <div className="d-flex align-items-start gap-3">
                <div className="p-3 rounded-circle bg-warning text-dark flex-shrink-0">
                  <Clock size={26} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-1">Ish Vaqti</h5>
                  <p className="text-secondary mb-0">Dushanba – Yakshanba</p>
                  <small className="text-warning fw-semibold">08:00 – 23:00</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-start gap-3">
                <div className="p-3 rounded-circle bg-warning text-dark flex-shrink-0">
                  <MapPin size={26} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-1">Restoran Manzili</h5>
                  <p className="text-secondary mb-0">Namangan sh., Islom Karimov k., 17</p>
                  <small className="text-muted">"Buyuk Ipak Yo‘li" mehmonxonasi</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-start gap-3">
                <div className="p-3 rounded-circle bg-warning text-dark flex-shrink-0">
                  <Phone size={26} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-1">Delivery Hotline</h5>
                  <p className="text-secondary mb-0">+998 77 301 00 05</p>
                  <small className="text-warning fw-semibold">30 Daqiqada Yetkazib Berish</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
