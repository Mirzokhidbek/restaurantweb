import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold mb-2">
            {t('aboutStory')}
          </span>
          <h1 className="display-5 fw-extrabold text-dark">{t('aboutHeading')}</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '580px' }}>
            {t('aboutSubheading')}
          </p>
        </div>

        {/* Story Section */}
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white mb-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="FAZO Restorani Zali"
                className="img-fluid rounded-4 object-fit-cover w-100 shadow-sm"
                style={{ height: '380px' }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-extrabold text-dark mb-3">{t('aboutStoryTitle')}</h2>
              <p className="text-secondary mb-3" style={{ lineHeight: '1.8' }}>
                {t('aboutStoryPara1')}
              </p>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                {t('aboutStoryPara2')}
              </p>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <CheckCircle2 size={18} className="text-warning" />
                  <span>Sifatli va Pokiza Masalliqlar</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <CheckCircle2 size={18} className="text-warning" />
                  <span>Devzira Guruchidan Namangan To‘y Oshi</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-dark fw-semibold">
                  <CheckCircle2 size={18} className="text-warning" />
                  <span>Turk Oshpazlaridan Pide va Adana Kabob</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 text-center">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle d-inline-flex mx-auto mb-3">
                <Award size={32} />
              </div>
              <h5 className="fw-bold text-dark mb-2">{t('val1Title')}</h5>
              <p className="text-secondary small mb-0">{t('val1Desc')}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 text-center">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle d-inline-flex mx-auto mb-3">
                <Sparkles size={32} />
              </div>
              <h5 className="fw-bold text-dark mb-2">{t('val2Title')}</h5>
              <p className="text-secondary small mb-0">{t('val2Desc')}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white h-100 text-center">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle d-inline-flex mx-auto mb-3">
                <Heart size={32} className="text-danger" />
              </div>
              <h5 className="fw-bold text-dark mb-2">{t('val3Title')}</h5>
              <p className="text-secondary small mb-0">{t('val3Desc')}</p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-dark text-white rounded-5 p-5 text-center position-relative overflow-hidden">
          <h2 className="fw-extrabold mb-3">{t('aboutCtaTitle')}</h2>
          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '500px' }}>
            {t('aboutCtaDesc')}
          </p>
          <Link to="/menu" className="btn btn-primary-custom px-5 py-3 fs-6">
            {t('viewMenuBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
