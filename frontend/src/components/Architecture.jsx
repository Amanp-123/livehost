import React from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Activity, 
  Database, 
  Server, 
  Cpu, 
  Lock, 
  Network, 
  Workflow
} from 'lucide-react';
import './Architecture.css';

export default function Architecture() {
  const hospitalLayers = [
    {
      title: "1. Doctor & Clinical Presentation Layer",
      desc: "Zero-latency React clinical console with touch-friendly OPD token kiosks, OT displays, and nurse bedside tablets with instant offline sync.",
      icon: <HeartPulse size={22} className="layer-icon" style={{ color: '#10b981' }} />,
      tag: "Doctor & Patient UI"
    },
    {
      title: "2. HL7 / FHIR & ABDM Gateway",
      desc: "National Health Authority (NHA) certified bridge for longitudinal ABHA health ID linking, insurance TPA claims, and lab analyzers.",
      icon: <Network size={22} className="layer-icon" style={{ color: '#34d399' }} />,
      tag: "Government & Hardware Sync"
    },
    {
      title: "3. Real-time Telemetry & Clinical Engine",
      desc: "Sub-millisecond WebSockets broker for ICU multi-para monitors, ventilator alarms, smart OT scheduling, and AI drug interaction checks.",
      icon: <Activity size={22} className="layer-icon" style={{ color: '#10b981' }} />,
      tag: "Live ICU Stream"
    },
    {
      title: "4. HIPAA-Compliant Encrypted Data Lake",
      desc: "Multi-tenant medical imaging PACS (DICOM) storage, automated discharge summaries, and AES-256 encrypted patient EHR vault.",
      icon: <Database size={22} className="layer-icon" style={{ color: '#34d399' }} />,
      tag: "EHR Medical Vault"
    }
  ];

  return (
    <section className="section architecture-section" id="architecture">
      <div className="container">
        
        <div className="section-header">
          <div className="badge">
            <ShieldCheck size={14} /> HIPAA & ABDM Certified Cloud
          </div>
          <h2>
            Designed For Mission-Critical <span className="text-gradient">Hospital Reliability</span>
          </h2>
          <p>
            Explore how mediOS guarantees zero hospital downtime, ultra-secure patient EHR privacy, and seamless multi-branch scalability.
          </p>
        </div>

        <div className="architecture-content">
          
          <div className="layers-list">
            {hospitalLayers.map((layer, idx) => (
              <div key={idx} className="layer-card glass-card">
                <div className="layer-header">
                  <div className="layer-icon-wrapper">
                    {layer.icon}
                  </div>
                  <span className="layer-tag">{layer.tag}</span>
                </div>
                <h3 className="layer-title">{layer.title}</h3>
                <p className="layer-desc">{layer.desc}</p>
              </div>
            ))}
          </div>

          <div className="tree-card glass-card">
            <div className="tree-header">
              <span className="tree-title">🏥 mediOS Hospital Architecture Topology</span>
            </div>
            <pre className="tree-code">
              <code>
{`mediOS-Hospital-Ecosystem/
├── 🌐 Clinical Presentation Tier
│   ├── 🩺 OPD Doctor Workstation & Telemedicine
│   ├── 🛏️ IPD Ward & Bed Allocation Matrix
│   ├── 💊 Central Pharmacy & Inventory Dispatch
│   └── 🔬 Diagnostic Lab (LIMS Analyzer Bridge)
│
├── 🛡️ ABDM & Security Gateway
│   ├── 🆔 ABHA ID Generation & Health Locker Sync
│   ├── 📜 NABH Clinical Quality Indicator Audit
│   └── 🔐 End-to-End AES-256 Patient EHR Vault
│
└── ⚡ Real-time Telemetry & Microservices
    ├── 💓 ICU Multi-Para Monitor WebSocket Broker
    ├── 🤖 AI Diagnostic & Drug Conflict Engine
    └── 🏢 Central Multi-Branch Hospital Cloud Sync`}
              </code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}

