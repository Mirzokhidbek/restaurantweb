import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="card border-0 rounded-5 shadow-sm bg-white p-4 h-100 position-relative d-flex flex-column justify-content-between hover-lift"
      style={{
        border: '1px solid rgba(245, 158, 11, 0.2)',
        transition: 'all 0.4s ease',
      }}
    >
      <Quote size={48} className="text-warning opacity-15 position-absolute top-0 end-0 m-3 pointer-events-none" />

      <div>
        {/* Star Rating Badges */}
        <div className="d-flex align-items-center gap-1 mb-3">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} size={18} fill="#f59e0b" className="text-warning" />
          ))}
          <span className="badge bg-warning bg-opacity-15 text-dark rounded-pill px-2 py-1 ms-2 small fw-bold">
            {testimonial.rating || 5}.0
          </span>
        </div>

        {/* Review Content */}
        <p className="text-dark mb-4 fst-italic" style={{ lineHeight: '1.7', fontSize: '0.98rem' }}>
          "{testimonial.reviewText}"
        </p>
      </div>

      {/* Customer Info Footer */}
      <div className="d-flex align-items-center gap-3 pt-3 border-top border-warning border-opacity-20">
        <img
          src={
            testimonial.avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          }
          alt={testimonial.customerName}
          className="rounded-circle object-fit-cover border border-2 border-warning shadow-sm"
          style={{ width: '50px', height: '50px' }}
        />
        <div>
          <div className="d-flex align-items-center gap-1">
            <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.95rem' }}>
              {testimonial.customerName}
            </h6>
            <CheckCircle2 size={16} className="text-success fill-success text-white" />
          </div>
          <small className="text-muted" style={{ fontSize: '0.78rem' }}>
            {testimonial.position || 'Tasdiqlangan Mehmon'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
