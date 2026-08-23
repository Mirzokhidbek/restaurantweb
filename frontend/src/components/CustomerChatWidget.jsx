import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Headset, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
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
        'Murojaatingiz qabul qilindi! Menejerimiz tez orada javob beradi.',
        '💬 Xabar Yuborildi'
      );

      setFormData((prev) => ({
        ...prev,
        messageText: '',
      }));

      setTimeout(() => {
        setSentSuccess(false);
      }, 4000);
    } catch (err) {
      toast.error(err.message || 'Xabar yuborishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-chat-widget position-fixed bottom-0 end-0 p-3 p-md-4 z-3" style={{ zIndex: 1050 }}>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-warning rounded-pill px-4 py-3 shadow-lg fw-extrabold text-dark d-flex align-items-center gap-2 border border-2 border-white transition-transform hover-lift"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)',
          }}
        >
          <div className="position-relative">
            <MessageSquare size={22} className="text-white" />
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
              style={{ width: '10px', height: '10px' }}
            ></span>
          </div>
          <span className="text-white fs-6 font-heading ms-1">💬 Yordam & Chat</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white animate-fade-in"
          style={{ width: '360px', maxWidth: '90vw', maxHeight: '550px' }}
        >
          {/* Header */}
          <div
            className="p-3 text-white d-flex align-items-center justify-content-between"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="bg-warning text-dark p-2 rounded-circle">
                <Headset size={20} />
              </div>
              <div>
                <h6 className="fw-extrabold mb-0 font-heading">FAZO Restorani Yordam</h6>
                <small className="text-success small d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                  <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '8px', height: '8px' }}></span>
                  Onlayn (Admin Faol)
                </small>
              </div>
            </div>
            <button className="btn btn-sm text-white-50 border-0" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Body Form */}
          <div className="p-3 overflow-y-auto" style={{ maxHeight: '460px' }}>
            {sentSuccess ? (
              <div className="text-center py-4 px-2">
                <div className="bg-success bg-opacity-15 text-success p-3 rounded-circle d-inline-block mb-3">
                  <CheckCircle2 size={40} />
                </div>
                <h6 className="fw-bold text-dark mb-1">Murojaatingiz Yuborildi!</h6>
                <p className="text-muted small mb-0">
                  Menejerimiz qisqa vaqt ichida telefon raqamingiz orqali bog‘lanadi yoki chatda javob beradi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label small fw-bold text-muted mb-1">Muammo Turi</label>
                  <select
                    className="form-select form-select-sm rounded-3 fw-semibold"
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

                <div className="mb-2">
                  <label className="form-label small fw-bold text-muted mb-1">Ismingiz</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-3"
                    placeholder="Ismingizni kiriting"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-bold text-muted mb-1">Telefon Raqamingiz</label>
                  <input
                    type="tel"
                    className="form-control form-control-sm rounded-3"
                    placeholder="+998 90 123 45 67"
                    required
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted mb-1">Muammo va Xabar Tavsifi</label>
                  <textarea
                    className="form-control form-control-sm rounded-3"
                    rows="3"
                    placeholder="Duch kelgan muammoingiz yoki savolingizni yozing..."
                    required
                    value={formData.messageText}
                    onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-warning w-100 py-2 rounded-pill fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                >
                  <Send size={16} />
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
