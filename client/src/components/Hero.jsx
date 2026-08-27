import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import './Hero.css';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await apiService.subscribeLead(email);
      if (res.success) {
        setStatusMessage({ type: 'success', text: res.message });
        setEmail('');
      } else {
        setStatusMessage({
          type: 'error',
          text: res.message || (res.errors && res.errors[0]?.msg) || 'Failed to submit'
        });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Server connection failed. Please ensure backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section" id="early-access">
      <div className="container hero-container">
        
        {/* Top Feature Pill */}
        <div className="badge">
          <span className="badge-dot"></span>
          <span>Next-Gen Fullstack Architecture v2.0 Released</span>
          <Sparkles size={14} style={{ color: '#ec4899' }} />
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Build & Scale Modern Web Apps <br />
          <span className="text-gradient">With Enterprise Elegance</span>
        </h1>

        <p className="hero-subtitle">
          Supercharge your development with a production-grade React frontend and ultra-fast Node/Express backend structure. Engineered for speed, clean code, and unstoppable growth.
        </p>

        {/* Lead Capture Interactive Form */}
        <div className="hero-form-wrapper">
          <form className="hero-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your work email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="hero-input"
            />
            <button type="submit" className="btn btn-primary hero-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" /> Joining...
                </>
              ) : (
                <>
                  Get Early Access <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {statusMessage.text && (
            <div className={`status-alert ${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="hero-trust">
          <div className="trust-item">
            <CheckCircle2 size={18} className="trust-icon" />
            <span>Full REST API integration</span>
          </div>
          <div className="trust-item">
            <Zap size={18} className="trust-icon" />
            <span>Sub-millisecond latency</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={18} className="trust-icon" />
            <span>Production ready MVC setup</span>
          </div>
        </div>

        {/* Hero Interactive Code/Dashboard Preview */}
        <div className="hero-preview-wrapper">
          <div className="preview-glow"></div>
          <div className="hero-preview glass-card">
            <div className="preview-header">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="preview-title">server/src/server.js • Express + React API Sync</span>
              <span className="preview-badge">Live Ready</span>
            </div>
            <div className="preview-code">
              <pre>
                <code>
                  <span className="c-keyword">const</span> app = <span className="c-func">express</span>();<br />
                  app.<span className="c-func">use</span>(<span className="c-func">cors</span>(&#123; origin: <span className="c-str">'http://localhost:5173'</span> &#125;));<br />
                  app.<span className="c-func">use</span>(<span className="c-str">'/api'</span>, apiRoutes);<br />
                  <span className="c-comment">// Handshake established with React Client layer ⚡</span><br />
                  app.<span className="c-func">listen</span>(PORT, () =&gt; console.<span className="c-func">log</span>(<span className="c-str">'✨ NovaStack is running'</span>));
                </code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
