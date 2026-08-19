import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Star, Award } from 'lucide-react';

const ChefCard = ({ chef }) => {
  return (
    <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden h-100 text-center hover-shadow transition-all">
      <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
        <img
          src={chef.image}
          alt={chef.name}
          className="w-100 h-100 object-fit-cover transition-transform"
        />
        <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-warning rounded-pill px-3 py-1 fw-bold">
          ★ {chef.rating || 4.9}
        </span>
      </div>

      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div>
          <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-1 mb-2 fw-semibold">
            {chef.title}
          </span>
          <h5 className="fw-extrabold text-dark mb-2">
            <Link to={`/chefs/${chef._id}`} className="text-decoration-none text-dark hover-warning">
              {chef.name}
            </Link>
          </h5>
          <p className="text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {chef.bio}
          </p>

          <div className="d-flex justify-content-center gap-1 mb-3 flex-wrap">
            {chef.specialties && chef.specialties.map((spec, i) => (
              <span key={i} className="badge bg-light text-secondary border small">
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 border-top pt-3">
          <a href={chef.socialLinks?.instagram || '#'} className="btn btn-light btn-sm rounded-circle p-2 text-dark" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href={chef.socialLinks?.facebook || '#'} className="btn btn-light btn-sm rounded-circle p-2 text-dark" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href={chef.socialLinks?.twitter || '#'} className="btn btn-light btn-sm rounded-circle p-2 text-dark" aria-label="Twitter">
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
