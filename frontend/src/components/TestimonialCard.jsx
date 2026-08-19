import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card border-0 rounded-4 shadow-sm bg-white p-4 h-100 position-relative d-flex flex-column justify-content-between">
      <Quote size={40} className="text-warning opacity-20 position-absolute top-0 end-0 m-3" />

      <div>
        <div className="d-flex gap-1 mb-3">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} size={16} fill="#ff9800" className="text-warning" />
          ))}
        </div>
        <p className="text-secondary mb-4 italic" style={{ lineHeight: '1.7' }}>
          "{testimonial.reviewText}"
        </p>
      </div>

      <div className="d-flex align-items-center gap-3 pt-3 border-top">
        <img
          src={testimonial.avatar}
          alt={testimonial.customerName}
          className="rounded-circle object-fit-cover"
          style={{ width: '48px', height: '48px' }}
        />
        <div>
          <h6 className="fw-bold mb-0 text-dark">{testimonial.customerName}</h6>
          <small className="text-muted">{testimonial.position || 'Customer'}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
