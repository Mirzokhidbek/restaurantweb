import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Calendar, Users, Sparkles, MessageSquare, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState('table'); // 'table' | 'vip' | 'delivery' | 'general'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '18:00',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const typeText =
      requestType === 'table'
        ? 'Stol band qilish'
        : requestType === 'vip'
        ? 'VIP xona bron qilish'
        : requestType === 'delivery'
        ? 'Delivery ma’lumoti'
        : 'Savol va taklif';

    toast.success(
      `Rahmat, ${formData.name || 'Mehmon'}! ${typeText} so‘rovingiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.`,
      '✅ Xabaringiz Yuborildi!'
    );

    setFormData({ name: '', phone: '', guests: '2', date: '', time: '18:00', message: '' });
  };

  return (
    <div className="contact-page py-5 bg-light min-vh-100">
      <div className="container py-lg-3">
        {/* Header Badge & Title */}
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-2 border border-warning border-opacity-30">
            {t('contact')}
          </span>
          <h1 className="display-4 fw-extrabold text-dark font-heading">{t('contactHeading')}</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '620px', fontSize: '1.05rem' }}>
            Stol band qilish, VIP xonalar bron qilish va yetkazib berish xizmati bo‘yicha biz bilan bog‘laning.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Left Contact & Location Cards */}
          <div className="col-lg-4">
            {/* Card 1: Address */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-3 hover-lift border-start border-4 border-warning">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                  style={{
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1 fs-6">{t('restAddressTitle')}</h6>
                  <p className="text-secondary small mb-1" style={{ lineHeight: '1.6' }}>
                    {t('restAddressVal')}
                  </p>
                  <small className="text-warning fw-semibold">Mo‘ljal: "Buyuk Ipak Yo‘li" mehmonxonasi</small>
                </div>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-3 hover-lift border-start border-4 border-warning">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                  style={{
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1 fs-6">{t('phoneHotlineTitle')}</h6>
                  <a href="tel:+998773010005" className="text-warning fw-extrabold text-decoration-none d-block fs-6">
                    +998 77 301 00 05
                  </a>
                  <a href="tel:+998773020005" className="text-secondary small text-decoration-none d-block mt-1">
                    +998 77 302 00 05 (Delivery Hotline)
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Work Hours */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-3 hover-lift border-start border-4 border-warning">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white shadow-sm"
                  style={{
                    width: '46px',
                    height: '46px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-1 fs-6">{t('workHoursTitle')}</h6>
                  <p className="text-secondary small mb-1">{t('workHoursVal')}</p>
                  <small className="text-success fw-bold">● Hozir Ochiq va Xizmatingizda</small>
                </div>
              </div>
            </div>

            {/* VIP Card */}
            <div
              className="card border-0 rounded-4 p-4 text-white shadow-lg overflow-hidden position-relative"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Sparkles size={20} className="text-warning fill-warning" />
                <h6 className="fw-bold text-warning mb-0">VIP Bron va Tadbirlar</h6>
              </div>
              <p className="small text-light text-opacity-75 mb-0" style={{ lineHeight: '1.6' }}>
                Tug‘ilgan kunlar, oilaviy marosimlar va biznes uchrashuvlar uchun 10-50 kishilik VIP xonalarimizni oldindan band qiling.
              </p>
            </div>
          </div>

          {/* Right Advanced Booking & Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <h4 className="fw-bold text-dark mb-2 font-heading">Savol yoki Bron Xabari Qoldiring</h4>
              <p className="text-secondary small mb-4">
                Muassasamizga kelishingizdan oldin stol band qilish yoki boshqa savollaringizni qoldiring.
              </p>

              {/* Interactive Request Type Selector Pills */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setRequestType('table')}
                  className={`btn rounded-pill px-3 py-2 btn-sm fw-bold transition-all ${
                    requestType === 'table'
                      ? 'btn-warning text-dark shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  🪑 Stol Band Qilish
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('vip')}
                  className={`btn rounded-pill px-3 py-2 btn-sm fw-bold transition-all ${
                    requestType === 'vip'
                      ? 'btn-warning text-dark shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  🏛️ VIP Xona Bron
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('delivery')}
                  className={`btn rounded-pill px-3 py-2 btn-sm fw-bold transition-all ${
                    requestType === 'delivery'
                      ? 'btn-warning text-dark shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  🛵 Delivery Xizmati
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('general')}
                  className={`btn rounded-pill px-3 py-2 btn-sm fw-bold transition-all ${
                    requestType === 'general'
                      ? 'btn-warning text-dark shadow-sm'
                      : 'btn-light text-secondary border'
                  }`}
                >
                  💬 Umumiy Savol
                </button>
              </div>

              {submitted && (
                <div className="alert alert-success rounded-4 p-3 mb-4 d-flex align-items-center gap-2 shadow-sm">
                  <CheckCircle2 size={22} className="text-success flex-shrink-0" />
                  <span className="small text-dark fw-medium">{t('messageSuccess')}</span>
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
                      placeholder="Ismingiz va familiyangiz"
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
                      placeholder="+998 (90) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Extra Booking Fields if Table/VIP selected */}
                  {(requestType === 'table' || requestType === 'vip') && (
                    <>
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Mehmonlar Soni</label>
                        <select
                          className="form-select rounded-3 py-2"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                          <option value="1">1-2 kishi</option>
                          <option value="4">3-4 kishi</option>
                          <option value="8">5-8 kishi</option>
                          <option value="12">10+ kishi (VIP)</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Tashrif Kuni</label>
                        <input
                          type="date"
                          className="form-control rounded-3 py-2"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Vaqti</label>
                        <input
                          type="time"
                          className="form-control rounded-3 py-2"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  <div className="col-12">
                    <label className="form-label fw-semibold">Oshnazga yoki kuryerga izoh (ixtiyoriy)</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="4"
                      placeholder="Stol band qilish, VIP xona yoki boshqa savollaringizni yozing..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary-custom px-5 py-3 rounded-pill fw-bold fs-6 shadow-lg d-inline-flex align-items-center gap-2"
                    >
                      <Send size={18} />
                      <span>Xabarni yuborish</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Live Interactive Map Frame */}
        <div className="card border-0 rounded-5 overflow-hidden shadow-lg mb-4 bg-white p-2">
          <div className="p-3 bg-white d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <MapPin size={20} className="text-warning" />
              <h6 className="fw-bold text-dark mb-0">FAZO Restorani Namangan - Xaritadagi Joylashuv</h6>
            </div>
            <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fw-bold small">
              📍 Namangan sh., 2-mikrorayon
            </span>
          </div>
          <div className="ratio ratio-21x9 rounded-4 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48342.34892019!2d71.611111!3d41.001111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4be111111111%3A0x1111111111111111!2sNamangan%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="FAZO Restorani Namangan Xaritasi"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
