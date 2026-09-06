import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/admin') || path.includes('/login') || hash === '#admin') {
      const token = localStorage.getItem('adminToken');
      return token ? 'dashboard' : 'login';
    }
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (token && storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }

    // Handle browser back/forward buttons or URL changes
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || path.includes('/login') || hash === '#admin') {
        const token = localStorage.getItem('adminToken');
        setCurrentView(token ? 'dashboard' : 'login');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (view, path = '/') => {
    setCurrentView(view);
    window.history.pushState({}, '', path);
  };

  const handleOpenAdmin = () => {
    if (adminUser) {
      navigateTo('dashboard', '/admin');
    } else {
      navigateTo('login', '/admin/login');
    }
  };

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    navigateTo('dashboard', '/admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    navigateTo('login', '/admin/login');
  };

  if (currentView === 'login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => navigateTo('landing', '/')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <AdminDashboard 
        user={adminUser}
        onLogout={handleLogout}
        onGoToLanding={() => navigateTo('landing', '/')}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* Background Ambient Glowing Orbs */}
      <div className="bg-ambient">
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>
        <div className="ambient-blob-3"></div>
      </div>

      <Navbar onOpenAdmin={handleOpenAdmin} />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Architecture />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


