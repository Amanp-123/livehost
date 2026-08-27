import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MapPin, Phone } from 'lucide-react';
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
          text: res.message || 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorMsg = (res.errors && res.errors.map(err => err.msg).join(', ')) || res.message || 'Submission failed';
        setStatus({ type: 'error', text: errorMsg });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Could not connect to backend server. Make sure backend is running on port 5000.'
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
            <Mail size={14} /> Contact & Support
          </div>
          <h2>Let's Discuss Your <span className="text-gradient">Next Project</span></h2>
          <p>
            Have custom requirements or need help architecting your web app? Reach out and our engineers will get back within 24 hours.
          </p>
        </div>

        <div className="contact-wrapper glass-card">
          
          <div className="contact-info">
            <h3>Get In Touch With Our Engineering Team</h3>
            <p>
              We provide end-to-end guidance from database schema modeling to high-conversion UI design.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Email Support</h4>
                  <p>engineering@novastack.dev</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Headquarters</h4>
                  <p>Tech Park Innovation Hub, Silicon Avenue</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (800) 555-NOVA</p>
                </div>
              </div>
            </div>

            <div className="info-glow-box">
              <Sparkles size={20} className="glow-sparkle" />
              <span>Full Express Backend validation active for this form.</span>
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
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Alex Morgan" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="alex@company.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                placeholder="Architecture Consulting / Inquiry" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                rows="4" 
                placeholder="Tell us about your project or questions..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" /> Submitting...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
