import React from 'react';
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  ShieldCheck, 
  FileCheck2, 
  Pill, 
  Video, 
  Cpu, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import './Features.css';

export default function Features() {
  const hospitalFeatures = [
    {
      icon: <Cpu size={26} />,
      title: "AI Clinical Copilot",
      desc: "Instant clinical summarization, automatic drug interaction alerts, and AI-driven differential diagnostic suggestions.",
      badge: "AI Powered"
    },
    {
      icon: <Activity size={26} />,
      title: "Smart OPD & IPD Automation",
      desc: "Zero-queue smart patient triage, automated token systems, bed allocation matrix, and nurse station telemetry.",
      badge: "Core Operations"
    },
    {
      icon: <FileCheck2 size={26} />,
      title: "ABDM & ABHA Integration",
      desc: "Fully compliant with Indian Health Authority (NHA) standards. Instant ABHA creation and seamless longitudinal record sync.",
      badge: "Government Certified"
    },
    {
      icon: <Pill size={26} />,
      title: "Pharmacy & Lab (LIMS) Sync",
      desc: "Direct barcode prescription dispensing, stock auto-reorder thresholds, and direct diagnostic analyzer hardware interface.",
      badge: "Supply Chain"
    },
    {
      icon: <Video size={26} />,
      title: "HD Telemedicine & E-Prescribe",
      desc: "Encrypted WebRTC video consultations with digitally signed e-prescriptions and instant WhatsApp patient delivery.",
      badge: "Virtual Care"
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "NABH & HIPAA Audit Ready",
      desc: "Role-based doctor/nurse access control (RBAC), biometric audit trails, and automated NABH clinical quality indicators.",
      badge: "Enterprise Security"
    }
  ];

  return (
    <section className="section features-section" id="features">
      <div className="container">
        
        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} /> Comprehensive Clinical Platform
          </div>
          <h2>
            Engineered To Power <span className="text-gradient">Every Department</span>
          </h2>
          <p>
            From emergency triage to discharge summaries, mediOS eliminates operational friction so medical staff can focus on saving lives.
          </p>
        </div>

        <div className="features-grid">
          {hospitalFeatures.map((feat, index) => (
            <div key={index} className="feature-card glass-card">
              <div className="card-badge-top">
                <span className="feature-pill">{feat.badge}</span>
              </div>
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
              <a href="#contact" className="feature-link">
                <span>Explore Workflow</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
