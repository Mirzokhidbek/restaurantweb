import React from 'react';
import { ArrowRight, Utensils } from 'lucide-react';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`card text-center border-0 rounded-4 overflow-hidden shadow-sm h-100 transition-all ${
        isSelected ? 'bg-warning bg-opacity-10 border border-warning' : 'bg-white'
      }`}
      style={{
        cursor: 'pointer',
        border: isSelected ? '2px solid #d97706' : '1px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="p-4 d-flex flex-column align-items-center justify-content-between h-100">
        <div
          className="mx-auto rounded-circle overflow-hidden mb-3 border border-3 border-warning border-opacity-30 shadow-md flex-shrink-0"
          style={{ width: '90px', height: '90px' }}
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
          <p className="text-secondary small mb-3" style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
            {category.description || 'Shirin va mazzali taomlar to‘plami.'}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <span className="badge bg-warning bg-opacity-15 text-dark rounded-pill px-3 py-2 fw-bold small d-inline-flex align-items-center gap-1">
            <span>Ko‘rish</span>
            <ArrowRight size={14} className="text-warning" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
