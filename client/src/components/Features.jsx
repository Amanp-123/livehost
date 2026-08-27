import React from 'react';
import { Cpu, Server, Lock, Gauge, Database, GitBranch, RefreshCw, Smartphone } from 'lucide-react';
import './Features.css';

export default function Features() {
  const features = [
    {
      icon: <Server size={28} className="feat-icon blue" />,
      title: "Modular MVC Architecture",
      desc: "Clean separation between Routes, Controllers, Middlewares, and Models for limitless maintainability."
    },
    {
      icon: <Cpu size={28} className="feat-icon purple" />,
      title: "React + Vite High Velocity",
      desc: "Instant HMR, tree-shaking, and component-first architecture for silky smooth 60fps rendering."
    },
    {
      icon: <Lock size={28} className="feat-icon pink" />,
      title: "Express Validator & Security",
      desc: "Built-in request sanitization, CORS security headers, error tracking, and input validation."
    },
    {
      icon: <Database size={28} className="feat-icon cyan" />,
      title: "RESTful API Integration",
      desc: "Pre-wired dynamic services for lead capture, live stats, and contact inbox with JSON responses."
    },
    {
      icon: <Gauge size={28} className="feat-icon emerald" />,
      title: "Optimized Web Vitals",
      desc: "Ultra-lean bundle size, zero layout shift, and instant sub-millisecond response benchmarks."
    },
    {
      icon: <GitBranch size={28} className="feat-icon amber" />,
      title: "Scalable Fullstack Monorepo",
      desc: "Single-command concurrent scripts (`npm run dev`) to run both client and server effortlessly."
    }
  ];

  return (
    <section className="section" id="features">
      <div className="container">
        
        <div className="section-header">
          <div className="badge">
            <RefreshCw size={14} /> Fullstack Excellence
          </div>
          <h2>Everything You Need To Build <span className="text-gradient">World-Class Web Apps</span></h2>
          <p>
            Say goodbye to boilerplate mess. Get a production-ready template that balances developer ergonomics with enterprise speed.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="feature-card glass-card">
              <div className="feat-icon-box">
                {feat.icon}
              </div>
              <h3 className="feat-title">{feat.title}</h3>
              <p className="feat-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
