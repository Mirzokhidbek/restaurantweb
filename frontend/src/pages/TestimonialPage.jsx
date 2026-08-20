import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import testimonialService from '../services/testimonialService';

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    reviewText: '',
    rating: 5,
    position: 'Mijoz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

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
    setSuccessMsg(null);
    try {
      await testimonialService.createTestimonial(form);
      setSuccessMsg('Rahmat! Sharhingiz muvaffaqiyatli chop etildi.');
      setForm({
        customerName: '',
        reviewText: '',
        rating: 5,
        position: 'Mijoz',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      fetchTestimonials();
    } catch (err) {
      setError(err.message || 'Sharh yuborishda xatolik yuz berdi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="testimonial-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-dark px-3 py-2 rounded-pill fw-bold mb-2">
            Mijozlarimiz Fikrlari
          </span>
          <h1 className="display-5 fw-extrabold text-dark">Mehmonlarimiz Izohlari</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
            Restoranimiz taomlari, xizmat ko‘rsatish sifati va yetkazib berish haqida mehmonlarimiz fikrlari.
          </p>
        </div>

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

        {/* Submit Review Card */}
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 mx-auto mt-5" style={{ maxWidth: '640px' }}>
          <h4 className="fw-bold text-dark mb-3 text-center">Sharhingizni Qoldiring</h4>
          {successMsg && <div className="alert alert-success rounded-3">{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Ismingiz</label>
              <input
                type="text"
                className="form-control rounded-3"
                required
                placeholder="Ismingizni kiriting"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Baho Berish (1 - 5 Yulduz)</label>
              <select
                className="form-select rounded-3"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                <option value={5}>★★★★★ (5 Yulduz - A’lo)</option>
                <option value={4}>★★★★☆ (4 Yulduz - Juda Yaxshi)</option>
                <option value={3}>★★★☆☆ (3 Yulduz - Yaxshi)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Sharhingiz Matni</label>
              <textarea
                className="form-control rounded-3"
                rows="4"
                required
                placeholder="Fikr va takliflaringizni yozing..."
                value={form.reviewText}
                onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold">
              {submitting ? 'Yuborilmoqda...' : 'Sharhni Yuborish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
