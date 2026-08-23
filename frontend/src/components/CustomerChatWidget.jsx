import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Headset,
  CheckCircle2,
  User,
  Phone,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import messageService from '../services/messageService';

const CustomerChatWidget = () => {
  const { adminUser } = useAuth();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const [formData, setFormData] = useState({
    senderName: adminUser?.name || '',
    senderPhone: adminUser?.phone || '',
    senderEmail: adminUser?.email || '',
    subject: 'Buyurtma bo‘yicha',
    messageText: '',
  });

  useEffect(() => {
    if (adminUser) {
      setFormData((prev) => ({
        ...prev,
        senderName: adminUser.name || prev.senderName,
        senderPhone: adminUser.phone || prev.senderPhone,
        senderEmail: adminUser.email || prev.senderEmail,
      }));
    }
  }, [adminUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await messageService.sendMessage({
        ...formData,
        userId: adminUser?._id || null,
      });

      setSentSuccess(true);
      toast.success(
        'Murojaatingiz qabul qilindi! Menejerimiz tez orada bog‘lanadi.',
        'Xabar Yuborildi'
      );

      setFormData((prev) => ({
        ...prev,
        messageText: '',
      }));

      setTimeout(() => {
        setSentSuccess(false);
      }, 4500);
    } catch (err) {
      toast.error(err.message || 'Xabar yuborishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-chat-widget position-fixed bottom-0 end-0 p-3 p-md-4" style={{ zIndex: 1050 }}>
      {/* Advanced 3D Floating Support Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn rounded-pill px-4 py-3 shadow-lg fw-extrabold text-white d-flex align-items-center gap-3 border border-2 border-warning border-opacity-40 transition-transform hover-lift"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            boxShadow: '0 12px 35px rgba(15, 23, 42, 0.4), 0 0 20px rgba(245, 158, 11, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Icon Container with Pulsing Online LED Dot */}
          <div className="position-relative d-flex align-items-center justify-content-center bg-warning text-dark p-2 rounded-circle shadow-sm" style={{ width: '38px', height: '38px' }}>
            <Headset size={20} className="text-dark" />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-white rounded-circle shadow-sm"
              style={{ width: '11px', height: '11px' }}
            ></span>
          </div>

          <div className="d-flex flex-column text-start">
            <span className="text-white fw-extrabold fs-6 font-heading" style={{ letterSpacing: '0.3px' }}>
              Yordam & Chat
            </span>
            <small className="text-warning opacity-90 fw-semibold" style={{ fontSize: '0.72rem' }}>
              🟢 Operator Onlayn
            </small>
          </div>
        </button>
      )}

      {/* Advanced Glassmorphic Chat Window Modal */}
      {isOpen && (
        <div
          className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white animate-fade-in"
          style={{
            width: '380px',
            maxWidth: '92vw',
            maxHeight: '600px',
            boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
          }}
        >
          {/* Premium Header */}
          <div
            className="p-3.5 px-4 text-white d-flex align-items-center justify-content-between border-bottom border-warning border-opacity-25"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning text-dark p-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <Headset size={22} />
              </div>
              <div>
                <h6 className="fw-extrabold text-white mb-0 font-heading" style={{ fontSize: '1rem' }}>
                  FAZO Restorani Yordam
                </h6>
                <small className="text-warning small d-flex align-items-center gap-1.5" style={{ fontSize: '0.75rem' }}>
                  <span className="spinner-grow spinner-grow-sm text-warning" style={{ width: '7px', height: '7px' }}></span>
                  24/7 Qo‘llab-quvvatlash Xizmati
                </small>
              </div>
            </div>

            <button
              className="btn btn-sm btn-outline-light text-white-50 border-0 rounded-circle p-1.5 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Form */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: '510px' }}>
            {sentSuccess ? (
              <div className="text-center py-4 px-2">
                <div className="bg-success bg-opacity-15 text-success p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                  <CheckCircle2 size={40} />
                </div>
                <h5 className="fw-extrabold text-dark mb-2 font-heading">Murojaatingiz Yuborildi!</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                  Menejerimiz qisqa vaqt ichida ko‘rsatilgan telefon raqamingiz orqali bog‘lanadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Subject Selector */}
                <div className="mb-3">
                  <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                    <HelpCircle size={14} className="text-warning" />
                    <span>Muammo Turi</span>
                  </label>
                  <div className="input-group rounded-3 overflow-hidden border">
                    <span className="input-group-text border-0 bg-light text-warning ps-3">
                      <HelpCircle size={16} />
                    </span>
                    <select
                      className="form-select border-0 bg-light py-2 shadow-none small fw-bold text-dark"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Buyurtma bo‘yicha">🛍️ Buyurtma bo‘yicha</option>
                      <option value="Yetkazib berish">🛵 Yetkazib berish</option>
                      <option value="To‘lov">💳 To‘lov masalasi</option>
                      <option value="Sifat va Taklif">⭐ Sifat va Taklif</option>
                      <option value="Boshqa">❓ Boshqa savol</option>
                    </select>
                  </div>
                </div>

                {/* Sender Name */}
                <div className="mb-3">
                  <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                    <User size={14} className="text-warning" />
                    <span>Ismingiz</span>
                  </label>
                  <div className="input-group rounded-3 overflow-hidden border">
                    <span className="input-group-text border-0 bg-light text-warning ps-3">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 bg-light py-2 shadow-none small fw-medium"
                      placeholder="Ismingizni kiriting"
                      required
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Sender Phone */}
                <div className="mb-3">
                  <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                    <Phone size={14} className="text-warning" />
                    <span>Telefon Raqamingiz</span>
                  </label>
                  <div className="input-group rounded-3 overflow-hidden border">
                    <span className="input-group-text border-0 bg-light text-warning ps-3">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      className="form-control border-0 bg-light py-2 shadow-none small fw-medium"
                      placeholder="+998 90 123 45 67"
                      required
                      value={formData.senderPhone}
                      onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="mb-4">
                  <label className="form-label small fw-extrabold text-dark mb-1 d-flex align-items-center gap-1">
                    <MessageSquare size={14} className="text-warning" />
                    <span>Muammo Tavsifi</span>
                  </label>
                  <div className="input-group rounded-3 overflow-hidden border">
                    <textarea
                      className="form-control border-0 bg-light p-3 shadow-none small fw-medium"
                      rows="3"
                      placeholder="Duch kelgan muammoingiz yoki savolingizni batafsil yozing..."
                      required
                      value={formData.messageText}
                      onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                {/* 3D Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-warning w-100 py-2.5 rounded-pill fw-extrabold text-white shadow d-flex align-items-center justify-content-center gap-2 transition-transform hover-lift"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                >
                  <Send size={18} />
                  <span>{loading ? 'Yuborilmoqda...' : 'Xabarni Yuborish'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerChatWidget;
