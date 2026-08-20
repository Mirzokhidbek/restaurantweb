import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Facebook, Send, Heart } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* About Column */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <BrandLogo isDark={true} showTagline={true} />
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

          {/* Menu Categories */}
          <div className="col-lg-3 col-md-6">
            <h5 className="font-heading mb-3 text-warning">{t('categoriesTitle')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 text-secondary mb-0">
              <li>
                <Link to="/menu/restaurant" className="text-decoration-none text-secondary hover-warning">
                  Namangan To‘y Oshi
                </Link>
              </li>
              <li>
                <Link to="/menu/fast-food" className="text-decoration-none text-secondary hover-warning">
                  Jaz & Qiyma Shashliklar
                </Link>
              </li>
              <li>
                <Link to="/menu/restaurant" className="text-decoration-none text-secondary hover-warning">
                  Turk Adana Kabob & Pide
                </Link>
              </li>
              <li>
                <Link to="/menu/fast-food" className="text-decoration-none text-secondary hover-warning">
                  Ribeye Steyk & Burger
                </Link>
              </li>
              <li>
                <Link to="/menu/restaurant" className="text-decoration-none text-secondary hover-warning">
                  Turk Baklavasi & Kunefe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="font-heading mb-3 text-warning">{t('contactInfo')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 text-secondary mb-0">
              <li className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
                <span className="small">{t('restAddressVal')}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={18} className="text-warning flex-shrink-0" />
                <span className="small">{t('phoneHotlineVal')}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Clock size={18} className="text-warning flex-shrink-0" />
                <span className="small">{t('workHoursVal')}</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-secondary small gap-3">
          <p className="mb-0">{t('copyright')}</p>
          <div className="d-flex align-items-center gap-1">
            <span>{t('madeWithLove')}</span>
            <Heart size={14} className="text-danger fill-danger" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
