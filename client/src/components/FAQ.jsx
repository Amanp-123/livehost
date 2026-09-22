import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';
import './FAQ.css';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await apiService.getFaqs();
        if (res && res.success && res.data && res.data.length > 0) {
          setFaqs(res.data);
          setOpenIndex(0); // Open first FAQ by default
        }
      } catch (err) {
        console.error("Failed to load FAQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!loading && faqs.length === 0) return null;

  return (
    <section className="section faq-section" id="faqs">
      <div className="container">
        
        <div className="section-header">
          <div className="badge">
            <HelpCircle size={14} /> Got Questions?
          </div>
          <h2>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p>
            Everything you need to know about our healthcare platform, compliance, security, and onboarding.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id || index} 
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <div className="faq-q-left">
                    <span className="faq-num">0{index + 1}</span>
                    <h3 className="faq-question-text">{faq.question}</h3>
                  </div>
                  <div className={`faq-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer-row">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
