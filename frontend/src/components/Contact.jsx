import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  HeartPulse, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Clock 
} from 'lucide-react';
import { apiService } from '../services/api';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await apiService.submitContactForm(formData);
      if (res.success) {
        setStatus({
          type: 'success',
          text: res.message || 'Thank you! Your hospital consultation request has been received. Our clinical specialist will call you shortly.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorMsg = (res.errors && res.errors.map(err => err.msg).join(', ')) || res.message || 'Submission failed';
        setStatus({ type: 'error', text: errorMsg });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Hospital network timeout. Make sure server is running.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">

        <div className="section-header">
          <div className="badge">
            <HeartPulse size={14} /> Clinical Advisory & Onboarding
          </div>
          <h2>
            Schedule A Live <span className="text-gradient">Hospital Walkthrough</span>
          </h2>
          <p>
            Join 450+ healthcare institutions that have modernized their patient care and eliminated operational bottlenecks.
          </p>
        </div>

        <div className="contact-wrapper glass-card">
          
          <div className="contact-info">
            <h3>Consult With Our Healthcare Solutions Team</h3>
            <p>
              Our clinical informatics team provides end-to-end guidance from NABH workflow configuration to ABHA / ABDM patient records integration.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Clinical Support & Demos</h4>
                  <p>clinical-onboarding@medios.health</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4>Medical Informatics Center</h4>
                  <p>MedTech Health Park, Cyber City, Gurugram / Bengaluru</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>24/7 Hospital Priority Line</h4>
                  <p>+91 (800) 102-MEDI (6334)</p>
                </div>
              </div>
            </div>

            <div className="info-glow-box">
              <ShieldCheck size={20} className="glow-sparkle" />
              <span>100% HIPAA & ABDM Data Confidentiality Agreement Guaranteed.</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            
            {status.text && (
              <div className={`form-status ${status.type}`}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{status.text}</span>
              </div>
            )}

            <div className="form-group-row">
              <div className="form-group">
                <label>Doctor / Administrator Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Dr. Rajeshwar Rao" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Official Hospital Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="doctor@hospital.org" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Hospital / Clinic Name & Bed Capacity *</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="e.g. Apollo City Hospital (150 Beds) • OPD + IPD" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label>Clinical Requirements / Departments *</label>
              <textarea 
                name="message" 
                rows="4" 
                placeholder="Tell us about your departments (OPD, IPD, OT, Pharmacy, ICU Telemetry, ABDM Sync)..." 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" /> Submitting Request...
                </>
              ) : (
                <>
                  Book Hospital Demo & Pricing <Send size={18} />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

