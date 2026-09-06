import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, ArrowRight, HeartPulse } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">
          <div className="logo-icon-hospital">
            <HeartPulse size={22} className="heart-pulse-icon" />
          </div>
          <span className="logo-text">medi<span className="text-gradient">OS</span></span>
        </a>

        <nav className="nav-desktop">
          <a href="#features" className="nav-link">Features</a>
          <a href="#architecture" className="nav-link">Architecture</a>
          <a href="#stats" className="nav-link">Metrics</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#testimonials" className="nav-link">Reviews</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="nav-actions">
          <button 
            type="button" 
            onClick={onOpenAdmin} 
            className="btn btn-secondary btn-sm nav-admin-btn"
          >
            🔒 Hospital Admin
          </button>
          <a href="#contact" className="btn btn-primary btn-sm">
            Request Demo <ArrowRight size={16} />
          </a>
        </div>

        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#architecture" onClick={() => setMobileMenuOpen(false)}>Architecture</a>
          <a href="#stats" onClick={() => setMobileMenuOpen(false)}>Metrics</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="mobile-actions">
            <button 
              type="button"
              className="btn btn-secondary" 
              style={{ width: '100%', marginBottom: '10px' }}
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            >
              🔒 Hospital Admin
            </button>
            <a 
              href="#contact" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Demo Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

