import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, isSelected, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/menu', { state: { selectedCategory: category._id || category.name } });
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`card text-center border-0 rounded-5 overflow-hidden shadow-sm h-100 transition-all ${
        isSelected ? 'bg-warning bg-opacity-10 border border-warning' : 'bg-white'
      }`}
      style={{
        cursor: 'pointer',
        border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isSelected
          ? '0 12px 28px -8px rgba(245, 158, 11, 0.35)'
          : '0 8px 20px -6px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="p-4 d-flex flex-column align-items-center justify-content-between h-100 position-relative">
        {/* Glow ambient background pill */}
        <div
          className="position-absolute top-0 start-50 translate-middle-x rounded-circle"
          style={{
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        ></div>

        <div
          className="mx-auto rounded-circle overflow-hidden mb-3 border border-3 border-warning shadow-md flex-shrink-0 position-relative group"
          style={{ width: '96px', height: '96px', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)' }}
        >
          <img
            src={category.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80'}
            alt={category.name}
            className="w-100 h-100 object-fit-cover transition-transform"
            style={{ transition: 'transform 0.5s ease' }}
          />
        </div>

        <div>
          <h5 className={`fw-extrabold mb-2 font-heading ${isSelected ? 'text-warning' : 'text-dark'}`}>
            {category.name}
          </h5>
          <p className="text-secondary small mb-3" style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
            {category.description || 'Namangan milliyligi va sharqona mazzali taomlar to‘plami.'}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <span
            className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 small d-inline-flex align-items-center gap-2 shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.85rem',
            }}
          >
            <span>Taomlarni Ko‘rish</span>
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
