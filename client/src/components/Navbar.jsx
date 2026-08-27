import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
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
          <div className="logo-icon">
            <Sparkles size={22} className="sparkle-icon" />
          </div>
          <span className="logo-text">Nova<span className="text-gradient">Stack</span></span>
        </a>

        <nav className="nav-desktop">
          <a href="#features" className="nav-link">Features</a>
          <a href="#architecture" className="nav-link">Architecture</a>
          <a href="#stats" className="nav-link">Metrics</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-secondary btn-sm">Sign In</a>
          <a href="#early-access" className="btn btn-primary btn-sm">
            Get Started <ArrowRight size={16} />
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
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="mobile-actions">
            <a href="#early-access" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
