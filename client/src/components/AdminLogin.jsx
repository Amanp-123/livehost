import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import './AdminLogin.css';

export default function AdminLogin({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await apiService.adminLogin({ email, password });
      if (res.success) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
        onLoginSuccess(res.data.user);
      } else {
        setError(res.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection failed. Make sure server is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background Glow */}
      <div className="admin-glow-orb orb-top"></div>
      <div className="admin-glow-orb orb-bottom"></div>

      <div className="admin-login-card">
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-badge">
            <ShieldCheck size={16} /> Admin Portal
          </div>
          <h2 className="admin-title">Welcome Back</h2>
          <p className="admin-subtitle">Sign in to manage dynamic data and content</p>
        </div>

        {/* Demo Credentials Quick Fill Banner */}
        <div className="demo-credentials-box" onClick={fillDemoCredentials}>
          <div className="demo-info">
            <Sparkles size={16} className="demo-icon" />
            <span>Click to auto-fill <strong>Admin Demo Credentials</strong></span>
          </div>
          <span className="demo-fill-btn">Auto Fill</span>
        </div>

        {error && (
          <div className="admin-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-spinner"></span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-footer-links">
          <button 
            type="button" 
            className="back-to-site-btn"
            onClick={onBackToLanding}
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
