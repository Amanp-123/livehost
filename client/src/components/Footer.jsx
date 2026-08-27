import React from 'react';
import { Sparkles, Heart, Globe, MessageSquare, Share2 } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <Sparkles size={20} />
              </div>
              <span className="logo-text">Nova<span className="text-gradient">Stack</span></span>
            </div>
            <p className="brand-desc">
              The modern Full-Stack standard combining high-conversion React presentation layers with secure, scalable Express backends.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Website"><Globe size={18} /></a>
              <a href="#" aria-label="Community"><MessageSquare size={18} /></a>
              <a href="#" aria-label="Share"><Share2 size={18} /></a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="links-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#architecture">Architecture</a>
              <a href="#pricing">Pricing Plans</a>
              <a href="#early-access">Early Access</a>
            </div>

            <div className="links-col">
              <h4>Backend Stack</h4>
              <a href="#">Express REST Router</a>
              <a href="#">Express Validator</a>
              <a href="#">CORS Security</a>
              <a href="#">JSON Controller Engine</a>
            </div>

            <div className="links-col">
              <h4>Frontend Stack</h4>
              <a href="#">React 18 + Vite</a>
              <a href="#">Vanilla Glassmorphism</a>
              <a href="#">Lucide Icons</a>
              <a href="#">Responsive Breakpoints</a>
            </div>

            <div className="links-col">
              <h4>Company</h4>
              <a href="#contact">Contact Support</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Changelog</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NovaStack Ecosystem. Built with fullstack precision.</p>
          <div className="footer-badge">
            <span>Crafted with</span>
            <Heart size={14} className="heart-icon" />
            <span>for Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
