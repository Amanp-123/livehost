import React from 'react';
import { HeartPulse, Heart, Globe, MessageSquare, Share2, Shield } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-hospital">
      <div className="container footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon-hospital">
                <HeartPulse size={20} />
              </div>
              <span className="logo-text">medi<span className="text-gradient">OS</span></span>
            </div>
            <p className="brand-desc">
              The intelligent healthcare operating system that unifies care, operations and intelligence for modern providers.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Website"><Globe size={18} /></a>
              <a href="#" aria-label="Community"><MessageSquare size={18} /></a>
              <a href="#" aria-label="Security"><Shield size={18} /></a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="links-col">
              <h4>Platform</h4>
              <a href="#features">Features</a>
              <a href="#features">AI Copilot</a>
              <a href="#architecture">ABDM & Security</a>
              <a href="#pricing">Pricing Plans</a>
            </div>

            <div className="links-col">
              <h4>Resources</h4>
              <a href="#testimonials">Customer Stories</a>
              <a href="#faqs">FAQs & Guides</a>
              <a href="#about">About MediOS</a>
              <a href="#admin" style={{ color: '#34d399', fontWeight: '600' }}>🔒 Hospital Admin</a>
            </div>

            <div className="links-col">
              <h4>Company</h4>
              <a href="#contact">Contact Sales</a>
              <a href="#contact">Request Demo</a>
              <a href="#">Careers</a>
              <a href="#">Press Kit</a>
            </div>

            <div className="links-col">
              <h4>Legal & Trust</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">HIPAA Compliance</a>
              <a href="#">ABDM Certified</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MediOS Healthcare Technologies. All clinical data protected under HIPAA & ABDM.</p>
          <div className="footer-badge">
            <span>Built for</span>
            <Heart size={14} className="heart-icon" />
            <span>Modern Hospitals & Doctors</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

