import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold mb-2">
            {t('contact')}
          </span>
          <h1 className="display-5 fw-extrabold text-dark">{t('contactHeading')}</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '580px' }}>
            {t('contactSubheading')}
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Contact Cards */}
          <div className="col-lg-4">
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-circle">
                  <MapPin size={24} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">{t('restAddressTitle')}</h6>
                  <p className="text-muted small mb-0">{t('restAddressVal')}</p>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-circle">
                  <Phone size={24} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">{t('phoneHotlineTitle')}</h6>
                  <p className="text-muted small mb-0">{t('phoneHotlineVal')}</p>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-warning bg-opacity-10 text-warning rounded-circle">
                  <Clock size={24} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">{t('workHoursTitle')}</h6>
                  <p className="text-muted small mb-0">{t('workHoursVal')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Booking Form */}
          <div className="col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <h4 className="fw-bold text-dark mb-4">{t('leaveMessageTitle')}</h4>
              {submitted && (
                <div className="alert alert-success rounded-3 p-3 mb-4 d-flex align-items-center gap-2">
                  <CheckCircle2 size={20} />
                  <span>{t('messageSuccess')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">{t('yourName')}</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      required
                      placeholder={t('yourName')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      className="form-control rounded-3 py-2"
                      required
                      placeholder={t('phonePlaceholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">{t('orderNotes')}</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="5"
                      required
                      placeholder={t('messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary-custom px-5 py-3 rounded-pill fw-bold">
                      <Send size={18} className="me-2 mb-1" />
                      {t('sendMessageBtn')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
