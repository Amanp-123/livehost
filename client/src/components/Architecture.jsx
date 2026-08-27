import React from 'react';
import { Layers, Database, Shield, ArrowRight, Code, Globe, Terminal } from 'lucide-react';
import './Architecture.css';

export default function Architecture() {
  const layers = [
    {
      title: "1. Presentation Layer (React + Vite)",
      desc: "Componentized UI featuring custom hooks, glassmorphic layout system, and lightning-fast HMR bundled for top-tier Core Web Vitals.",
      icon: <Layers size={22} className="layer-icon" />,
      tag: "Client-Side"
    },
    {
      title: "2. API Gateway & Routing Layer (Express Router)",
      desc: "RESTful architecture dividing leads, statistics, authentication, and contact controllers with custom validation middleware.",
      icon: <Terminal size={22} className="layer-icon" />,
      tag: "REST Server"
    },
    {
      title: "3. Controller & Business Logic",
      desc: "Decoupled services handling request lifecycles, data sanitization, response formatting, and status code management.",
      icon: <Code size={22} className="layer-icon" />,
      tag: "Business Logic"
    },
    {
      title: "4. Model & Persistence Store",
      desc: "Flexible data adapter structure ready to connect with MongoDB, PostgreSQL, or Redis cache layers with minimal config.",
      icon: <Database size={22} className="layer-icon" />,
      tag: "Data Store"
    }
  ];

  return (
    <section className="section architecture-section" id="architecture">
      <div className="container">
        
        <div className="section-header">
          <div className="badge">
            <Globe size={14} /> Clean Architecture
          </div>
          <h2>Designed for Maintainability <span className="text-gradient">& Scalability</span></h2>
          <p>
            Explore how the frontend and backend interact seamlessly with a production-grade folder structure.
          </p>
        </div>

        <div className="architecture-content">
          
          <div className="layers-list">
            {layers.map((layer, idx) => (
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
              <span className="tree-title">📁 Project Structure Overview</span>
            </div>
            <pre className="tree-code">
              <code>
{`landing-page/
├── 📁 server/                # Express Backend
│   ├── 📁 src/
│   │   ├── 📁 controllers/   # Request Handlers
│   │   │   └── apiController.js
│   │   ├── 📁 middleware/    # Express Validator
│   │   │   └── validators.js
│   │   ├── 📁 models/        # Data Models
│   │   │   └── mockData.js
│   │   ├── 📁 routes/        # API Routes
│   │   │   └── apiRoutes.js
│   │   └── server.js         # Entry Point (:5000)
│   └── package.json
│
├── 📁 client/                # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/    # UI Components
│   │   ├── 📁 services/      # API Handlers
│   │   ├── 📁 styles/        # CSS Design System
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json              # Root Concurrently runner`}
              </code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
