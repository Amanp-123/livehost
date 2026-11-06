import React, { useState, useEffect } from 'react';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import { apiService } from '../services/api';
import './Pricing.css';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await apiService.getPricing();
        if (res && res.success && res.data && res.data.length > 0) {
          setPlans(res.data);
        } else {
          // Fallback if empty
          setPlans([
            {
              id: 1,
              name: "Clinic & Polyclinic",
              badge: "For Solo / Group Clinics",
              priceMonthly: 89,
              priceYearly: 69,
              desc: "Complete OPD queuing, digital e-prescriptions, WhatsApp patient updates, and billing.",
              popular: false,
              cta: "Start Clinic Trial"
            },
            {
              id: 2,
              name: "Hospital Multi-Specialty",
              badge: "Most Popular",
              priceMonthly: 299,
              priceYearly: 249,
              desc: "Full OPD/IPD beds management, OT Scheduling, LIMS Lab & Pharmacy sync, NABH reports.",
              popular: true,
              cta: "Schedule Hospital Onboarding"
            },
            {
              id: 3,
              name: "Enterprise Hospital Chain",
              badge: "For Hospital Networks",
              priceMonthly: 799,
              priceYearly: 649,
              desc: "Multi-branch EHR centralization, AI Diagnostic Copilot, custom HL7/FHIR integrations, and 24/7 dedicated clinical support.",
              popular: false,
              cta: "Contact Enterprise Healthcare"
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load pricing plans", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <section className="section" id="pricing">
      <div className="container">

        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} /> Transparent Healthcare Pricing
          </div>
          <h2>Hospital & Clinic <span className="text-gradient">Subscription Plans</span></h2>
          <p>
            Choose the package that aligns with your clinical institution. Upgrade or scale departments anytime with zero hidden fees.
          </p>

          {/* Toggle Switch */}
          <div className="pricing-toggle-wrapper">
            <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
            <button 
              className={`toggle-switch ${isYearly ? 'yearly' : ''}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing duration"
            >
              <div className="switch-thumb"></div>
            </button>
            <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
              Yearly <span className="discount-pill">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={plan.id || index} className={`pricing-card glass-card ${plan.popular ? 'popular-card' : ''}`}>
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={13} /> {plan.badge || 'Most Popular'}
                </div>
              )}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                {plan.badge && !plan.popular && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    {plan.badge}
                  </span>
                )}
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <div className="plan-price-box">
                <span className="currency">$</span>
                <span className="price-number">
                  {isYearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                <span className="price-period">/ month</span>
              </div>

              <a 
                href="#early-access" 
                className={`btn plan-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta || "Request Demo"}
              </a>

              <div className="plan-divider"></div>

              <ul className="plan-features">
                {plan.features ? (
                  plan.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <div className="check-box">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <div className="check-box"><Check size={14} /></div>
                      <span>EHR & ABDM M1/M2/M3 Compliance</span>
                    </li>
                    <li>
                      <div className="check-box"><Check size={14} /></div>
                      <span>Smart Patient Queuing & Vitals Sync</span>
                    </li>
                    <li>
                      <div className="check-box"><Check size={14} /></div>
                      <span>Automated Invoicing & NABH Audit Logs</span>
                    </li>
                    <li>
                      <div className="check-box"><Check size={14} /></div>
                      <span>24/7 Clinical & IT Support</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
