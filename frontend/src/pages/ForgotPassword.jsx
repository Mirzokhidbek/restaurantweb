import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import authService from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authService.forgotPassword(email);
      if (res.success) {
        setSuccess(res.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to process password reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-lg bg-white overflow-hidden mx-auto" style={{ maxWidth: '440px' }}>
          <div className="bg-dark p-4 text-center text-white">
            <h3 className="fw-extrabold font-heading mb-1 text-white">Forgot Password</h3>
            <p className="small text-secondary mb-0">Enter your email to receive password reset instructions.</p>
          </div>

          <div className="card-body p-4 p-md-5">
            {error && <ErrorMessage message={error} />}
            {success && (
              <div className="alert alert-success rounded-3 p-3 mb-4 small">
                <CheckCircle size={20} className="me-1 mb-1" />
                {success}
              </div>
            )}

            {!success ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Your Email Address</label>
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

                <button type="submit" disabled={loading} className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6">
                  {loading ? 'Sending Link...' : 'Send Reset Instructions'}
                </button>
              </form>
            ) : (
              <div className="text-center pt-2">
                <Link to="/login" className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold">
                  Back to Sign In
                </Link>
              </div>
            )}

            <div className="text-center mt-4 border-top pt-3">
              <Link to="/login" className="text-muted text-decoration-none small d-inline-flex align-items-center gap-1">
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
