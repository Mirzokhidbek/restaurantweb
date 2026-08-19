import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-login-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden mx-auto" style={{ maxWidth: '440px' }}>
          <div className="bg-dark p-4 text-center text-white">
            <span className="bg-warning text-dark p-2 rounded-circle fs-5 d-inline-block mb-2">🍔</span>
            <h3 className="fw-extrabold font-heading mb-1 text-white">Customer Login</h3>
            <p className="small text-secondary mb-0">Sign in to track your orders and saved addresses.</p>
          </div>

          <div className="card-body p-4 p-md-5">
            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="customer@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-semibold mb-0">Password</label>
                  <Link to="/forgot-password" className="text-warning small fw-bold text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0 rounded-end-3 py-2"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6 mt-3">
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-4 border-top pt-3">
              <span className="text-muted small">Don't have an account yet? </span>
              <Link to="/register" className="text-warning fw-bold text-decoration-none small">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
