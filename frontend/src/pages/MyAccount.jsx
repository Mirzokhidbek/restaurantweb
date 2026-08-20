import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';
import { User, Phone, Mail, Lock, CheckCircle } from 'lucide-react';

const MyAccount = () => {
  const { adminUser } = useAuth();
  const [formData, setFormData] = useState({
    name: adminUser?.name || '',
    phone: adminUser?.phone || '',
    password: '',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authService.updateProfile(formData);
      if (res.success) {
        setSuccess('Profil ma’lumotlari muvaffaqiyatli saqlandi!');
      }
    } catch (err) {
      setError(err.message || 'Profilni saqlashda xatolik yuz berdi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-account-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h1 className="fw-extrabold text-dark mb-1">Mening Profilim</h1>
          <p className="text-secondary">Shaxsiy ma’lumotlaringiz, telefon raqamingiz va xavfsizlik sozlamalarini boshqaring.</p>
        </div>

        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 mx-auto" style={{ maxWidth: '600px' }}>
          {error && <ErrorMessage message={error} />}
          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4">
              <CheckCircle size={20} /> <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Ism va Familiya</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <User size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Manzil (O‘zgartirib bo‘lmaydi)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Mail size={18} className="text-muted" />
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  value={adminUser?.email || ''}
                  disabled
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Telefon Raqam</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Phone size={18} className="text-muted" />
                </span>
                <input
                  type="tel"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Yangi Parol (O‘zgarmasa bo‘sh qoldiring)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Lock size={18} className="text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6">
              {saving ? 'Saqlanmoqda...' : 'O‘zgarishlarni Saqlash'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
