import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import './Pricing.css';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter Developer",
      badge: "For Solo Makers",
      priceMonthly: 19,
      priceYearly: 14,
      desc: "Perfect for indie hackers and developers starting new side projects.",
      features: [
        "Full React + Express Source Code",
        "MVC Backend Setup",
        "Lead Capture & Contact API",
        "Community Support",
        "Unlimited Personal Projects"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Growth Pro",
      badge: "Most Popular",
      priceMonthly: 49,
      priceYearly: 39,
      desc: "Ideal for growing startups needing production-grade scalability.",
      features: [
        "Everything in Starter Developer",
        "Express Validator & Auth middleware",
        "Database Adapters (Mongo/PostgreSQL)",
        "Priority 24/7 Slack Support",
        "Free Lifetime Architecture Updates",
        "Commercial SaaS License"
      ],
      popular: true,
      cta: "Upgrade to Pro"
    },
    {
      name: "Enterprise Scale",
      badge: "For Teams",
      priceMonthly: 129,
      priceYearly: 99,
      desc: "Custom architectures, microservices, and dedicated engineering onboarding.",
      features: [
        "Everything in Growth Pro",
        "Custom Controller & Route Generator",
        "Docker & Kubernetes Configs",
        "Dedicated System Architect",
        "99.99% Uptime SLA Guarantee",
        "Custom Integration Support"
      ],
      popular: false,
      cta: "Contact Enterprise"
    }
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">

        <div className="section-header">
          <div className="badge">
            <Sparkles size={14} /> Transparent Pricing
          </div>
          <h2>Simple, Predictable <span className="text-gradient">Plans For Everyone</span></h2>
          <p>
            Choose the package that aligns with your scale. Upgrade or downgrade anytime with 0 hidden fees.
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
              Yearly <span className="discount-pill">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-card ${plan.popular ? 'popular-card' : ''}`}>
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={13} /> {plan.badge}
                </div>
              )}
              
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
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
                href="#contact" 
                className={`btn plan-btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </a>

              <div className="plan-divider"></div>

              <ul className="plan-features">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <div className="check-box">
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
