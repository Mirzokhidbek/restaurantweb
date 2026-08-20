import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, ArrowRight, ShieldCheck, Heart, Clock, MapPin, Phone, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryImages = [
    {
      url: '/assets/fazo_terrace_view.jpg',
      title: 'FAZO Yozgi Terassa va Favvorali Bog‘',
      desc: 'Ochiq havoda mehmondostlik va shirin kechki ovqatlar',
      badge: '🌄 Yozgi Terassa',
    },
    {
      url: '/assets/fazo_interior_main.jpg',
      title: 'Muxtasham Fazo Asosiy Zali',
      desc: 'Sharqona yog‘och oymakorligi va muxtasham qandillar',
      badge: '👑 Asosiy Zal',
    },
    {
      url: '/assets/fazo_vip_hall.jpg',
      title: 'Shinam VIP Xonalar',
      desc: 'Oila va maxsus uchrashuvlar uchun shinam VIP xonalar',
      badge: '🏛️ VIP Xonalar',
    },
    {
      url: '/assets/fazo_hero_banner.jpg',
      title: 'Devzira Oshi va Milliy Dasturxon',
      desc: 'Namangan maqom oshi va ko‘mir cho‘g‘i shashliklari',
      badge: '🔥 Milliy Oshxona',
    },
  ];

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

  // Automatic Slideshow Timer (Every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const handleNextGallery = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevGallery = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Food Categories Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-3">
          <div className="text-center mb-5">
            <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-2 border border-warning border-opacity-30">
              {t('categoriesBadge')}
            </span>
            <h2 className="display-5 fw-extrabold text-dark font-heading">{t('categoriesTitle')}</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '580px' }}>
              {t('categoriesDesc')}
            </p>
          </div>

          {loading ? (
            <Loading text="Kategoriyalar yuklanmoqda..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="row g-4">
              {categories.map((category) => (
                <div key={category._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <CategoryCard category={category} />
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

      {/* 3. About Restaurant & 3D Interactive Auto-Slideshow Gallery Section */}
      <section className="py-5 bg-light overflow-hidden">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            {/* Left Interactive 3D Gallery Column */}
            <div className="col-lg-6">
              <div className="position-relative animate-fade-in">
                {/* Main Active 3D Image Display with Auto-Zoom Ken-Burns */}
                <div
                  className="rounded-5 overflow-hidden bg-white position-relative shadow-2xl group border border-white border-4"
                  style={{
                    height: '420px',
                    boxShadow: '0 20px 40px -15px rgba(217, 119, 6, 0.3), 0 0 20px rgba(245, 158, 11, 0.2)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {/* Top Glowing Gold Progress Bar */}
                  <div
                    key={activeGalleryIndex}
                    className="position-absolute top-0 start-0 h-1 bg-warning gallery-timer-progress"
                    style={{ zIndex: 4, height: '4px', boxShadow: '0 0 10px #f59e0b' }}
                  ></div>

                  <img
                    key={galleryImages[activeGalleryIndex].url}
                    src={galleryImages[activeGalleryIndex].url}
                    alt={galleryImages[activeGalleryIndex].title}
                    className="w-100 h-100 object-fit-cover gallery-auto-zoom"
                  />

                  {/* Overlaid Gradient Title Badge */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-4 d-flex justify-content-between align-items-end"
                    style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%)', zIndex: 3 }}
                  >
                    <div>
                      <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>
                        {galleryImages[activeGalleryIndex].badge}
                      </span>
                      <h5 className="fw-bold text-white mb-0 font-heading">{galleryImages[activeGalleryIndex].title}</h5>
                      <small className="text-light text-opacity-75">{galleryImages[activeGalleryIndex].desc}</small>
                    </div>

                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="btn btn-light btn-sm rounded-circle p-2 shadow-sm flex-shrink-0"
                      title="Kattalashtirib ko‘rish"
                    >
                      <Eye size={18} className="text-dark" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevGallery}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 btn btn-white btn-sm rounded-circle p-2 shadow-lg opacity-80 hover-opacity-100 border border-warning"
                    style={{ zIndex: 5 }}
                    aria-label="Oldingi rasm"
                  >
                    <ChevronLeft size={20} className="text-dark" />
                  </button>

                  <button
                    onClick={handleNextGallery}
                    className="position-absolute top-50 end-0 translate-middle-y me-3 btn btn-white btn-sm rounded-circle p-2 shadow-lg opacity-80 hover-opacity-100 border border-warning"
                    style={{ zIndex: 5 }}
                    aria-label="Keyingi rasm"
                  >
                    <ChevronRight size={20} className="text-dark" />
                  </button>
                </div>

                {/* Floating Experience Badge with 3D Gold Gradient Icon */}
                <div
                  className="position-absolute bottom-0 end-0 translate-middle-y me-3 mb-2 bg-white p-3 rounded-4 shadow-lg d-none d-sm-flex align-items-center gap-3 border border-warning border-opacity-30 animate-badge-float"
                  style={{ backdropFilter: 'blur(14px)', zIndex: 6, maxWidth: '250px' }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                    style={{
                      width: '42px',
                      height: '42px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    <Sparkles size={20} className="fill-white" />
                  </div>
                  <div>
                    <h5 className="fw-extrabold text-warning mb-0" style={{ fontSize: '1.1rem' }}>15+ Yillik</h5>
                    <small className="text-dark fw-bold" style={{ fontSize: '0.75rem' }}>Sifat va Mehmondostlik</small>
                  </div>
                </div>

                {/* Interactive Thumbnails Row below */}
                <div className="row g-2 mt-3">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="col-3">
                      <div
                        onClick={() => setActiveGalleryIndex(idx)}
                        className={`rounded-3 overflow-hidden border-2 cursor-pointer transition-all ${
                          activeGalleryIndex === idx ? 'border-warning shadow-md scale-105' : 'border-transparent opacity-60'
                        }`}
                        style={{ height: '70px', cursor: 'pointer' }}
                      >
                        <img src={img.url} alt={img.title} className="w-100 h-100 object-fit-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Story Text Column */}
            <div className="col-lg-6">
              <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-3 border border-warning border-opacity-30">
                Oshxona Sifati va Tariximiz
              </span>
              <h2 className="display-6 fw-extrabold text-dark mb-4 font-heading">
                Yangi Masalliqlar. Oshxona Mahorati.
              </h2>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                FAZO restorani Namangan shahrining eng fayzli maskani bo‘lib, oliy sifatli masalliqlar, saralangan qo‘y go‘shti va afsonaviy Devzira guruchidan pishirilgan Namangan Maqom Oshi va Turk oshxonasi taomlari bilan mashhur. Har bir taomimizda sharqona mehmondostlik va samimiyat mavjud.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-white rounded-4 border border-warning border-opacity-30 shadow-sm d-flex align-items-center gap-3 hover-lift">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                      style={{
                        width: '42px',
                        height: '42px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      }}
                    >
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>Oliy Sifat Kafolati</h6>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>Pokiza va sertifikatlangan</small>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 bg-white rounded-4 border border-warning border-opacity-30 shadow-sm d-flex align-items-center gap-3 hover-lift">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                      style={{
                        width: '42px',
                        height: '42px',
                        background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      <Heart size={20} className="fill-white" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>Mexr Bilan Pishirilgan</h6>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>Mualliflik retseptlari</small>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary-custom px-4 py-3 rounded-pill d-inline-flex align-items-center gap-2 shadow-md">
                <span>Biz haqimizda ko‘proq</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-flex align-items-center justify-content-center p-3 animate-fade-in"
          style={{ zIndex: 10000, backdropFilter: 'blur(10px)' }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="position-relative max-w-4xl w-100 text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[activeGalleryIndex].url}
              alt={galleryImages[activeGalleryIndex].title}
              className="img-fluid rounded-4 shadow-2xl object-fit-contain"
              style={{ maxHeight: '80vh' }}
            />
            <h4 className="text-white mt-3 fw-bold">{galleryImages[activeGalleryIndex].title}</h4>
            <p className="text-light text-opacity-75">{galleryImages[activeGalleryIndex].desc}</p>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 mt-2"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

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
                  <h5 className="fw-bold text-white mb-1">Manzilimiz</h5>
                  <p className="text-secondary mb-0">Namangan sh., 2-mikrorayon</p>
                  <small className="text-warning fw-semibold">Islom Karimov k., 17-uy</small>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-start gap-3">
                <div className="p-3 rounded-circle bg-warning text-dark flex-shrink-0">
                  <Phone size={26} />
                </div>
                <div>
                  <h5 className="fw-bold text-white mb-1">Stol va VIP Bron</h5>
                  <p className="text-secondary mb-0">Qo‘ng‘iroq qiling:</p>
                  <a href="tel:+998773010005" className="text-warning fw-bold text-decoration-none">
                    +998 77 301 00 05
                  </a>
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
