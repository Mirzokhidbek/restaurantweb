import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found-page py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <div className="bg-warning bg-opacity-10 text-warning p-4 rounded-circle d-inline-flex mb-4">
          <UtensilsCrossed size={64} />
        </div>
        <h1 className="display-1 fw-extrabold text-dark mb-0 font-heading">404</h1>
        <h3 className="fw-bold text-dark mb-3">Dish Not Found!</h3>
        <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '480px' }}>
          Oops! The page or food item you are looking for seems to have been moved or eaten by our hungry chefs.
        </p>
        <Link to="/" className="btn btn-primary-custom px-4 py-3 rounded-pill fw-bold d-inline-flex align-items-center gap-2">
          <ArrowLeft size={18} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
