import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between rounded-4 p-3 my-4 shadow-sm" role="alert">
      <div className="d-flex align-items-center gap-2">
        <AlertCircle size={22} className="text-danger flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
