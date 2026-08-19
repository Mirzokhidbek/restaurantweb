import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import authService from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authService.register(formData.name, formData.email, formData.password, formData.phone);
      if (res.success) {
        navigate('/account');
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden mx-auto" style={{ maxWidth: '480px' }}>
          <div className="bg-dark p-4 text-center text-white">
            <span className="bg-warning text-dark p-2 rounded-circle fs-5 d-inline-block mb-2">🍔</span>
            <h3 className="fw-extrabold font-heading mb-1 text-white">Join SavoryBites</h3>
            <p className="small text-secondary mb-0">Create an account for 1-click orders and rewards.</p>
          </div>

          <div className="card-body p-4 p-md-5">
            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <User size={18} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Phone size={18} className="text-muted" />
                  </span>
                  <input
                    type="tel"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="+1 (555) 000-1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
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
                {loading ? 'Creating Account...' : 'Register Account'}
              </button>
            </form>

            <div className="text-center mt-4 border-top pt-3">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/login" className="text-warning fw-bold text-decoration-none small">
                Sign In Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
