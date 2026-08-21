import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@restaurant.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Email yoki parol noto‘g‘ri kiritildi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page min-vh-100 bg-dark d-flex align-items-center justify-content-center py-5 px-3">
      <div className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white w-100" style={{ maxWidth: '440px' }}>
        <div className="bg-warning p-4 text-center text-dark position-relative">
          <div className="bg-dark text-white p-3 rounded-circle d-inline-flex mb-2 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h3 className="fw-extrabold font-heading mb-1">Admin Portal</h3>
          <p className="small mb-0 opacity-75">FAZO Restorani Boshqaruv Tizimi</p>
        </div>

        <div className="card-body p-4 p-md-5">
          {error && <ErrorMessage message={error} />}

          {/* Seed hint box */}
          <div className="alert alert-info py-2 px-3 small rounded-3 border-0 mb-4 d-flex align-items-center gap-2">
            <Info size={18} className="flex-shrink-0 text-info" />
            <div>
              <strong>Boshlang‘ich Kirish Ma’lumotlari:</strong><br />
              Email: <code>admin@restaurant.com</code><br />
              Parol: <code>admin123</code>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Email Manzil</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Mail size={18} className="text-muted" />
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  placeholder="admin@restaurant.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">Parol</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 rounded-start-3">
                  <Lock size={18} className="text-muted" />
                </span>
                <input
                  type="password"
                  className="form-control bg-light border-start-0 rounded-end-3 py-2"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 fs-6"
            >
              {loading ? (
                <span>Kirilmoqda...</span>
              ) : (
                <>
                  <span>Boshqaruv Paneliga Kirish</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 border-top pt-3">
            <Link to="/" className="text-muted text-decoration-none small hover-warning">
              ← Restoran Bosh Sahifasiga Qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
