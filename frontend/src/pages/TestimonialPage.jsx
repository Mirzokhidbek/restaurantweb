import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import testimonialService from '../services/testimonialService';
import { Star, Send } from 'lucide-react';

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    reviewText: '',
    rating: 5,
    position: 'Customer',
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
      setError(err.message || 'Failed to load reviews.');
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
      setSuccessMsg('Thank you! Your review has been published.');
      setForm({
        customerName: '',
        reviewText: '',
        rating: 5,
        position: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      fetchTestimonials();
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="testimonial-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold mb-2">
            Real Feedback
          </span>
          <h1 className="display-5 fw-extrabold text-dark">What Our Guests Say</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '560px' }}>
            Hear from real customers about our food quality, fast delivery, and dining experience.
          </p>
        </div>

        {loading ? (
          <Loading text="Loading testimonials..." />
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
          <h4 className="fw-bold text-dark mb-3 text-center">Share Your Dining Experience</h4>
          {successMsg && <div className="alert alert-success rounded-3">{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Your Name</label>
              <input
                type="text"
                className="form-control rounded-3"
                required
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Rating (1 - 5 Stars)</label>
              <select
                className="form-select rounded-3"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                <option value={3}>★★★☆☆ (3 Stars - Good)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Your Review</label>
              <textarea
                className="form-control rounded-3"
                rows="4"
                required
                placeholder="Write your feedback..."
                value={form.reviewText}
                onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" disabled={submitting} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
