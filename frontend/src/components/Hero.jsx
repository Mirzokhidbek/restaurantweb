import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, ArrowRight, ShieldCheck, Clock, Award, Sparkles, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      className="position-relative py-5 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fffbe6 50%, #fff7ed 100%)',
        minHeight: '620px',
      }}
    >
      {/* Ambient Radial Golden Aura Blobs */}
      <div
        className="position-absolute top-0 end-0 translate-middle-y rounded-circle animate-glow-blob"
        style={{
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      ></div>

      <div
        className="position-absolute bottom-0 start-0 translate-middle-x rounded-circle"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      ></div>

      <div className="container position-relative py-lg-4" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          {/* Left Text Column */}
          <div className="col-lg-6">
            {/* Tagline Badge */}
            <div className="animate-fade-up-1 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white mb-4 shadow-sm border border-warning border-opacity-30">
              <span className="badge bg-warning text-dark rounded-circle p-1 animate-flame-bounce">🌙</span>
              <span className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                {t('heroBadge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-2 display-3 fw-extrabold text-dark mb-3 lh-sm font-heading">
              {t('heroTitleLine1')} <br />
              <span className="animated-gradient-text">{t('heroTitleLine2')}</span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up-3 lead text-secondary mb-4 pe-lg-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
              {t('heroDesc')}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up-4 d-flex flex-wrap align-items-center gap-3 mb-5">
              <Link
                to="/menu"
                className="btn btn-primary-custom btn-lg px-4 py-3 d-flex align-items-center gap-2 fs-6 shadow-lg rounded-pill"
              >
                <span>{t('viewMenuBtn')}</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/menu"
                className="btn btn-outline-custom btn-lg px-4 py-3 d-flex align-items-center gap-2 fs-6 rounded-pill"
              >
                <Utensils size={18} />
                <span>{t('orderNowBtn')}</span>
              </Link>
            </div>

            {/* Micro Highlights Bar inside Lighter Bright Cards */}
            <div className="animate-fade-up-4 row g-3 pt-3 border-top border-warning border-opacity-20">
              <div className="col-12 col-sm-4">
                <div
                  className="p-3 rounded-4 bg-white border border-warning border-opacity-30 shadow-sm d-flex align-items-center gap-3 hover-lift"
                  style={{ transition: 'all 0.3s ease' }}
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
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{t('fastDelivery30')}</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{t('fastDeliveryDesc')}</small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <div
                  className="p-3 rounded-4 bg-white border border-warning border-opacity-30 shadow-sm d-flex align-items-center gap-3 hover-lift"
                  style={{ transition: 'all 0.3s ease' }}
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
                    <Award size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{t('premiumQuality')}</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{t('qualityDesc')}</small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4">
                <div
                  className="p-3 rounded-4 bg-white border border-warning border-opacity-30 shadow-sm d-flex align-items-center gap-3 hover-lift"
                  style={{ transition: 'all 0.3s ease' }}
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
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>{t('topRating')}</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{t('topRatingDesc')}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Animated Hero Banner Image */}
          <div className="col-lg-6">
            <div className="position-relative animate-hero-float">
              {/* Main Food Frame with Bright Gold Glow Border */}
              <div
                className="rounded-5 overflow-hidden bg-white position-relative"
                style={{
                  border: '4px solid #ffffff',
                  boxShadow: '0 25px 50px -12px rgba(217, 119, 6, 0.25), 0 0 20px rgba(245, 158, 11, 0.2)',
                }}
              >
                <img
                  src="/assets/fazo_hero_banner.jpg"
                  alt="FAZO Restorani Namangan Milliy va Turk Oshxonasi"
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: '510px' }}
                />
                <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-to-t" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 100%)' }}>
                  <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
                    🔥 Top Taom: Namangan Maqom Oshi
                  </span>
                </div>
              </div>

              {/* Floating Chef Badge Card (Clean position without overlap) */}
              <div
                className="position-absolute bottom-0 start-0 mb-4 ms-4 bg-white p-3 rounded-4 shadow-lg border border-warning border-opacity-30 d-none d-md-flex align-items-center gap-3 animate-badge-float"
                style={{ maxWidth: '300px', backdropFilter: 'blur(14px)', zIndex: 3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80"
                  alt="Bosh Oshpaz Ahmadjon Yoqubov"
                  className="rounded-circle object-fit-cover border border-2 border-warning"
                  style={{ width: '52px', height: '52px' }}
                />
                <div>
                  <div className="d-flex align-items-center gap-1">
                    <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.88rem' }}>{t('chefChoice')}</h6>
                    <Sparkles size={14} className="text-warning fill-warning" />
                  </div>
                  <small className="text-warning fw-bold d-block mt-1">★★★★★ ({t('chefChoiceOrders')})</small>
                </div>
              </div>

              {/* Floating Delivery Time Pill on Top Right */}
              <div
                className="position-absolute top-0 end-0 me-4 mt-4 bg-white text-dark px-3 py-2 rounded-pill shadow-lg border border-warning border-opacity-30 d-flex align-items-center gap-2"
                style={{ backdropFilter: 'blur(14px)', zIndex: 3 }}
              >
                <Flame size={18} className="text-warning animate-flame-bounce" />
                <span className="fw-bold small">⚡ 25 Daqiqa Issiq Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
