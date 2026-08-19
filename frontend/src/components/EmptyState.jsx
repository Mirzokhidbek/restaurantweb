import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  title = 'No food found',
  description = 'We could not find any items matching your criteria.',
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div className="text-center py-5 px-3 rounded-4 bg-white border shadow-sm my-4">
      <div className="bg-light d-inline-flex p-3 rounded-circle text-muted mb-3">
        <UtensilsCrossed size={42} className="text-warning" />
      </div>
      <h4 className="fw-bold text-dark">{title}</h4>
      <p className="text-muted mx-auto" style={{ maxWidth: '400px' }}>
        {description}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary-custom mt-2">
          {actionText}
        </Link>
      )}
      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary-custom mt-2">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
