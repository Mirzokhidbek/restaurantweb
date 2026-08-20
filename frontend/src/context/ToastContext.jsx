import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, title = '', type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, title, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const toast = {
    success: (message, title = 'Muvaffaqiyatli!') => showToast(message, title, 'success'),
    info: (message, title = 'Ma’lumot') => showToast(message, title, 'info'),
    warning: (message, title = 'Diqqat!') => showToast(message, title, 'warning'),
    error: (message, title = 'Xatolik!') => showToast(message, title, 'error'),
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={22} className="text-success flex-shrink-0" />;
      case 'info': return <Info size={22} className="text-info flex-shrink-0" />;
      case 'warning': return <AlertTriangle size={22} className="text-warning flex-shrink-0" />;
      case 'error': return <XCircle size={22} className="text-danger flex-shrink-0" />;
      default: return <Info size={22} className="text-info flex-shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'info': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}

      {/* Floating Top-Right Toast Notification Container */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999, maxWidth: '420px', width: '100%', pointerEvents: 'none' }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-card bg-white rounded-4 shadow-lg p-3 mb-3 d-flex align-items-start justify-content-between gap-3 animate-fade-in-down"
            style={{
              pointerEvents: 'auto',
              borderLeft: `5px solid ${getBorderColor(t.type)}`,
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="d-flex align-items-start gap-3">
              {getIcon(t.type)}
              <div>
                {t.title && <h6 className="fw-bold text-dark mb-1 fs-6">{t.title}</h6>}
                <p className="text-secondary small mb-0" style={{ lineHeight: '1.5' }}>{t.message}</p>
              </div>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="btn btn-link text-muted p-0 ms-2 text-decoration-none border-0"
              style={{ lineHeight: 1 }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
