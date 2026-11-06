import React, { useEffect, useState } from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { apiService } from '../services/api';
import './Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      const res = await apiService.getTestimonials();
      if (res && res.data) {
        setTestimonials(res.data);
      }
      setLoading(false);
    };
    loadTestimonials();
  }, []);

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">

        <div className="section-header">
          <div className="badge">
            <MessageSquareQuote size={14} /> Real Developer Stories
          </div>
          <h2>Trusted By High-Velocity <span className="text-gradient">Engineering Teams</span></h2>
          <p>
            Here is what engineering leaders and founders say about building fullstack applications on NovaStack.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card glass-card">
              <div className="rating-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-comment">"{item.comment}"</p>
              <div className="testimonial-author">
                <img src={item.avatar} alt={item.name} className="author-avatar" />
                <div className="author-info">
                  <span className="author-name">{item.name}</span>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
