import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo = ({ isDark = false, showTagline = true }) => {
  return (
    <Link to="/" className="d-inline-flex align-items-center gap-3 text-decoration-none group">
      {/* 3D Gold Emblem Badge */}
      <div
        className="brand-emblem position-relative d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 shadow-md"
        style={{
          width: '46px',
          height: '46px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4), 0 0 10px rgba(245, 158, 11, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <span style={{ fontSize: '1.3rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          🌙
        </span>
      </div>

      {/* Brand Typography */}
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex align-items-center gap-1 font-heading lh-1">
          <span
            className={`fw-extrabold ${isDark ? 'text-white' : 'text-dark'}`}
            style={{ fontSize: '1.4rem', letterSpacing: '-0.5px' }}
          >
            FAZO
          </span>
          <span
            className="badge rounded-pill fw-bold text-uppercase shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontSize: '0.68rem',
              letterSpacing: '1px',
              padding: '0.35em 0.7em',
            }}
          >
            Namangan
          </span>
        </div>

        {showTagline && (
          <small
            className={`${isDark ? 'text-light text-opacity-75' : 'text-muted'} fw-semibold mt-1`}
            style={{ fontSize: '0.68rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}
          >
            Restorani • 100% Halol
          </small>
        )}
      </div>
    </Link>
  );
};

export default BrandLogo;
