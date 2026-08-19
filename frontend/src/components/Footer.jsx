import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Facebook, Send, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* About Column */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="bg-warning text-dark p-2 rounded-circle fs-5">🌙</span>
              <h4 className="font-heading mb-0 text-white">FAZO Restorani</h4>
            </div>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
              {t('footerDesc')}
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2" aria-label="Telegram">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="font-heading mb-3 text-warning">{t('quickLinks')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-secondary mb-0">
              <li>
                <Link to="/" className="text-decoration-none text-secondary hover-warning">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-decoration-none text-secondary hover-warning">
                  {t('allMenu')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-secondary hover-warning">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-secondary hover-warning">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-decoration-none text-secondary hover-warning">
                  {t('cart')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h5 className="font-heading mb-3 text-warning">{t('addressHeader')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 text-secondary mb-0">
              <li className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
                <span>{t('addressText')}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-warning flex-shrink-0" />
                <span>+998 77 301 00 05 / 302 00 05</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <Clock size={18} className="text-warning flex-shrink-0 mt-1" />
                <span>{t('workingHours')}</span>
              </li>
            </ul>
          </div>

          {/* Hours Card */}
          <div className="col-lg-3 col-md-6">
            <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary border-opacity-25">
              <h6 className="fw-bold text-white mb-2">{t('fastDeliveryDesc')}</h6>
              <p className="text-secondary small mb-3">{t('deliveryBanner')}</p>
              <div className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                ⚡ Telefon: +998 77 301 00 05
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary border-opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-secondary small gap-3">
          <p className="mb-0">{t('copyright')}</p>
          <p className="mb-0 d-flex align-items-center gap-1">
            FAZO Restorani Namangan <Heart size={14} className="text-danger fill-danger" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
