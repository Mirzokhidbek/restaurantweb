import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await register(formData.name, formData.email, formData.password, formData.phone);
      if (res.success || res.data) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Ro‘yxatdan o‘tishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden mx-auto" style={{ maxWidth: '480px' }}>
          <div className="bg-dark p-4 text-center text-white">
            <span className="bg-warning text-dark p-2 rounded-circle fs-5 d-inline-block mb-2">🌙</span>
            <h3 className="fw-extrabold font-heading mb-1 text-white">Ro‘yxatdan O‘tish</h3>
            <p className="small text-secondary mb-0">FAZO Restorani tizimida yangi akkaunt yaratish.</p>
          </div>

          <div className="card-body p-4 p-md-5">
            {error && <ErrorMessage message={error} />}

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
                    placeholder="Masalan: Anvar Alimov"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Manzil</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="anvar@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                <label className="form-label fw-semibold">Parol</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6">
                {loading ? 'Yaratilmoqda...' : 'Ro‘yxatdan O‘tish'}
              </button>
            </form>

            <div className="text-center mt-4 border-top pt-3">
              <span className="text-muted small">Avval ro‘yxatdan o‘tganmisiz? </span>
              <Link to="/login" className="text-warning fw-bold text-decoration-none small">
                Tizimga kirish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
