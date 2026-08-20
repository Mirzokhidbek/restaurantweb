import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import testimonialService from '../services/testimonialService';
import { Star, Send, Award, HeartHandshake, CheckCircle2, Sparkles, MessageSquareQuote } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const TestimonialPage = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    reviewText: '',
    rating: 5,
    position: 'Tasdiqlangan Mehmon',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await testimonialService.getTestimonials();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      setError(err.message || 'Sharhlarni yuklashda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await testimonialService.createTestimonial(form);
      toast.success(
        `Rahmat, ${form.customerName || 'Mehmon'}! Fikr va bahoingiz muvaffaqiyatli chop etildi.`,
        '⭐ Sharh Chop Etildi!'
      );
      setForm({
        customerName: '',
        reviewText: '',
        rating: 5,
        position: 'Tasdiqlangan Mehmon',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      fetchTestimonials();
    } catch (err) {
      toast.error(err.message || 'Sharh yuborishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="testimonial-page py-5 bg-light min-vh-100">
      <div className="container py-lg-3">
        {/* Header Section */}
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-15 text-dark px-3 py-2 rounded-pill fw-bold mb-2 border border-warning border-opacity-30">
            Mijozlarimiz Fikrlari
          </span>
          <h1 className="display-4 fw-extrabold text-dark font-heading">Mehmonlarimiz Izohlari</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '620px', fontSize: '1.05rem' }}>
            FAZO Restorani taomlari, oshpazlar mahorati va yetkazib berish xizmati haqida mehmonlarimizning haqiqiy fikrlari.
          </p>
        </div>

        {/* Statistics Breakdown Bar */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border border-warning border-opacity-30 d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
              >
                <Star size={24} fill="#ffffff" />
              </div>
              <div>
                <h3 className="fw-extrabold text-dark mb-0 font-heading">4.98 / 5.0</h3>
                <small className="text-muted fw-bold">Umumiy Mijozlar Bahosi</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border border-warning border-opacity-30 d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                }}
              >
                <HeartHandshake size={24} />
              </div>
              <div>
                <h3 className="fw-extrabold text-dark mb-0 font-heading">3,850+</h3>
                <small className="text-muted fw-bold">Mamnun Mehmonlarimiz</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm border border-warning border-opacity-30 d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <h3 className="fw-extrabold text-dark mb-0 font-heading">99.4%</h3>
                <small className="text-muted fw-bold">Ijobiy Fikrlar Ulushi</small>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        {loading ? (
          <Loading text="Sharhlar yuklanmoqda..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="row g-4 mb-5">
            {testimonials.map((test) => (
              <div key={test._id} className="col-12 col-md-6 col-lg-4">
                <TestimonialCard testimonial={test} />
              </div>
            ))}
          </div>
        )}

        {/* Interactive Submit Review Form */}
        <div className="card border-0 rounded-5 shadow-lg bg-white p-4 p-md-5 mx-auto border-top border-4 border-warning" style={{ maxWidth: '680px' }}>
          <div className="text-center mb-4">
            <span className="bg-warning bg-opacity-20 text-dark p-3 rounded-circle d-inline-block mb-3">
              <MessageSquareQuote size={28} className="text-warning" />
            </span>
            <h3 className="fw-extrabold text-dark mb-1 font-heading">Sharhingizni Qoldiring</h3>
            <p className="text-secondary small mb-0">FAZO Restorani xizmati haqidagi fikr va bahoingiz biz uchun muhim!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Ismingiz</label>
              <input
                type="text"
                className="form-control rounded-3 py-2"
                required
                placeholder="Ismingiz va familiyangiz"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              />
            </div>

            {/* Interactive 5-Star Rating Buttons */}
            <div className="mb-4 text-center p-3 bg-light rounded-4 border">
              <label className="form-label fw-bold text-dark d-block mb-2">Baho Berish (1 - 5 Yulduz)</label>
              <div className="d-flex align-items-center justify-content-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="btn btn-link p-1 border-0 transition-transform"
                    style={{ transform: (hoverRating || form.rating) >= star ? 'scale(1.25)' : 'scale(1)' }}
                  >
                    <Star
                      size={32}
                      fill={(hoverRating || form.rating) >= star ? '#f59e0b' : 'none'}
                      className={(hoverRating || form.rating) >= star ? 'text-warning' : 'text-muted'}
                    />
                  </button>
                ))}
              </div>
              <small className="text-warning fw-bold d-block mt-2">
                {form.rating === 5
                  ? '★★★★★ (5 Yulduz - A’lo darajada!)'
                  : form.rating === 4
                  ? '★★★★☆ (4 Yulduz - Juda Yaxshi)'
                  : form.rating === 3
                  ? '★★★☆☆ (3 Yulduz - Yaxshi)'
                  : form.rating === 2
                  ? '★★☆☆☆ (2 Yulduz - Qoniqarli)'
                  : '★☆☆☆☆ (1 Yulduz - Qoniqarsiz)'}
              </small>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Sharhingiz Matni</label>
              <textarea
                className="form-control rounded-3"
                rows="4"
                required
                placeholder="Taomlar mazasi, yetkazib berish tezligi yoki xizmat sifati haqida yozing..."
                value={form.reviewText}
                onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6 shadow-lg d-flex align-items-center justify-content-center gap-2"
            >
              <Send size={18} />
              <span>{submitting ? 'Yuborilmoqda...' : 'Sharhni Yuborish'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
