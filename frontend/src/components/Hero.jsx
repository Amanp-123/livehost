import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  HeartPulse, 
  Users, 
  FileText, 
  Stethoscope, 
  Lock
} from 'lucide-react';
import { apiService } from '../services/api';
import './Hero.css';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await apiService.subscribeLead(email);
      if (response.success) {
        setFeedback({ type: 'success', message: response.message || 'Hospital demo scheduled! Our clinical specialist will contact you.' });
        setEmail('');
      } else {
        setFeedback({ type: 'error', message: response.message || 'Email already requested demo.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Hospital network timeout. Please retry.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section" id="early-access">
      <div className="container hero-container">
        
        {/* Left Content */}
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            <HeartPulse size={15} />
            <span>ABDM Certified • Next-Gen Hospital Operating System</span>
          </div>

          <h1 className="hero-title">
            The Intelligent <span className="text-gradient">Hospital Operating System</span> For Modern Healthcare
          </h1>

          <p className="hero-subtitle">
            Unify OPD/IPD workflows, patient EHRs, intelligent OT scheduling, billing, and NABH compliance under one lightning-fast, secure cloud architecture.
          </p>

          {/* Clinical Demo Form */}
          <form className="hero-form" onSubmit={handleSubscribe}>
            <div className="input-wrap">
              <input
                type="email"
                placeholder="Enter doctor / hospital work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="hero-input"
              />
              <button 
                type="submit" 
                className="btn btn-primary hero-btn"
                disabled={loading}
              >
                {loading ? <span className="loader"></span> : <>Request Live Demo <ArrowRight size={18} /></>}
              </button>
            </div>
          </form>

          {feedback.message && (
            <div className={`form-feedback ${feedback.type}`}>
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Trust Highlights */}
          <div className="hero-trust">
            <div className="trust-item">
              <ShieldCheck size={16} className="text-emerald" />
              <span>HIPAA & ISO 27001 Certified</span>
            </div>
            <div className="trust-item">
              <Activity size={16} className="text-emerald" />
              <span>99.99% Clinical Uptime SLA</span>
            </div>
            <div className="trust-item">
              <Lock size={16} className="text-emerald" />
              <span>End-to-End EHR Encryption</span>
            </div>
          </div>
        </div>

        {/* Right Preview - Live Clinical Dashboard Mockup */}
        <div className="hero-preview-wrapper">
          <div className="preview-glow"></div>
          
          <div className="ehr-console-card">
            {/* Window Header */}
            <div className="ehr-console-header">
              <div className="ehr-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="ehr-header-title">
                <HeartPulse size={16} className="pulse-icon" />
                <span>mediOS Clinical EHR Console • AI Patient Telemetry</span>
              </div>
              <div className="ehr-live-badge">
                <span className="live-dot"></span> LIVE OPD
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="ehr-metrics-row">
              <div className="ehr-metric-box">
                <div className="metric-top">
                  <span className="metric-title">Active Inpatients</span>
                  <span className="metric-pill">82.6% Bed Occupancy</span>
                </div>
                <div className="metric-value">248 <span className="metric-total">/ 300</span></div>
              </div>

              <div className="ehr-metric-box">
                <div className="metric-top">
                  <span className="metric-title">OPD Queue Today</span>
                  <span className="metric-pill info">Avg Wait: 8.4m</span>
                </div>
                <div className="metric-value">1,420 <span className="metric-total">Checked In</span></div>
              </div>

              <div className="ehr-metric-box">
                <div className="metric-top">
                  <span className="metric-title">Critical ICU Alerts</span>
                  <span className="metric-pill safe">0 Stable</span>
                </div>
                <div className="metric-value safe-text">Real-time <span className="metric-total">Telemetry</span></div>
              </div>
            </div>

            {/* Patient Telemetry Table */}
            <div className="ehr-table-wrapper">
              <table className="ehr-table">
                <thead>
                  <tr>
                    <th>Patient ID & Ward</th>
                    <th>Live Vitals (BP • SpO2 • Pulse)</th>
                    <th>Attending Specialist</th>
                    <th className="text-right">Clinical Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="patient-id-cell">
                        <strong>#MED-9021</strong>
                        <span>ICU Bed 04</span>
                      </div>
                    </td>
                    <td>
                      <div className="vitals-badge">
                        <Activity size={14} />
                        <span>120/80 mmHg • 99% • 72 bpm</span>
                      </div>
                    </td>
                    <td>
                      <div className="doc-cell">
                        <span>Dr. Vikram Mehta</span>
                        <small>Chief Cardiologist</small>
                      </div>
                    </td>
                    <td className="text-right">
                      <span className="status-badge-stable">Stable</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="patient-id-cell">
                        <strong>#MED-8842</strong>
                        <span>OPD Room 12</span>
                      </div>
                    </td>
                    <td>
                      <div className="vitals-badge normal">
                        <Activity size={14} />
                        <span>115/76 mmHg • 98% • 78 bpm</span>
                      </div>
                    </td>
                    <td>
                      <div className="doc-cell">
                        <span>Dr. Sarah Jenkins</span>
                        <small>Sr. Neurologist</small>
                      </div>
                    </td>
                    <td className="text-right">
                      <span className="status-badge-consulting">In Consultation</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="patient-id-cell">
                        <strong>#MED-7719</strong>
                        <span>Emergency ER-02</span>
                      </div>
                    </td>
                    <td>
                      <div className="vitals-badge normal">
                        <Activity size={14} />
                        <span>122/82 mmHg • 99% • 70 bpm</span>
                      </div>
                    </td>
                    <td>
                      <div className="doc-cell">
                        <span>Dr. Rajeshwar Rao</span>
                        <small>Trauma Specialist</small>
                      </div>
                    </td>
                    <td className="text-right">
                      <span className="status-badge-triaged">Triaged</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
