const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Fetch live stats
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Using fallback stats data', error);
      return {
        success: true,
        data: {
          activeUsers: "50K+",
          uptime: "99.99%",
          satisfactionRate: "98.5%",
          integrations: "120+"
        }
      };
    }
  },

  // Fetch dynamic testimonials
  getTestimonials: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Using fallback testimonials', error);
      return {
        success: true,
        data: [
          {
            id: 1,
            name: "Aarav Sharma",
            role: "CTO, CloudTech Labs",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            comment: "This platform cut our deployment workflows by 65%. The performance, real-time analytics, and sleek UI are unmatched.",
            rating: 5
          },
          {
            id: 2,
            name: "Sarah Jenkins",
            role: "Product Lead, ScaleUp AI",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
            comment: "From on-boarding to shipping high-converting funnels, it has revolutionized how our team collaborates.",
            rating: 5
          },
          {
            id: 3,
            name: "Rohan Verma",
            role: "Founder & CEO, ApexVentures",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            comment: "The built-in backend architecture and speed are insane. The best investment we made for our growth this year.",
            rating: 5
          }
        ]
      };
    }
  },

  // Submit Lead (Newsletter / Early Access)
  subscribeLead: async (email) => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    return await response.json();
  },

  // Submit Contact Form
  submitContactForm: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await response.json();
  },

  // ===== ADMIN API METHODS =====
  adminLogin: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  },

  updateStats: async (stats) => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats)
    });
    return await response.json();
  },

  addTestimonial: async (testimonial) => {
    const response = await fetch(`${API_BASE_URL}/admin/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testimonial)
    });
    return await response.json();
  },

  deleteTestimonial: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  },

  getLeads: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/leads`);
    return await response.json();
  },

  deleteLead: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  },

  // Dynamic Announcements & Content
  getBanner: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/banner`);
      return await res.json();
    } catch {
      return { success: true, data: { enabled: true, badgeText: "🚀 NEW V2 RELEASE", message: "LiveHost 2.0 is now live!", linkText: "Learn More", linkUrl: "#features" } };
    }
  },

  updateBanner: async (banner) => {
    const res = await fetch(`${API_BASE_URL}/admin/banner`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(banner)
    });
    return await res.json();
  },

  // Dynamic Pricing
  getPricing: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/pricing`);
      return await res.json();
    } catch {
      return { success: true, data: [] };
    }
  },

  updatePricingPlan: async (id, plan) => {
    const res = await fetch(`${API_BASE_URL}/admin/pricing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    });
    return await res.json();
  },

  // FAQs
  getFaqs: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`);
      return await res.json();
    } catch {
      return { success: true, data: [] };
    }
  },

  addFaq: async (faq) => {
    const res = await fetch(`${API_BASE_URL}/admin/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq)
    });
    return await res.json();
  },

  deleteFaq: async (id) => {
    const res = await fetch(`${API_BASE_URL}/admin/faqs/${id}`, { method: 'DELETE' });
    return await res.json();
  },

  // Site Settings & Maintenance Mode
  getSettings: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      return await res.json();
    } catch {
      return { success: true, data: { siteName: "NovaStack", supportEmail: "support@novastack.io", maintenanceMode: false, allowRegistrations: true } };
    }
  },

  updateSettings: async (settings) => {
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return await res.json();
  },

  // Activity Logs
  getLogs: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/logs`);
      return await res.json();
    } catch {
      return { success: true, data: [] };
    }
  },

  getContactMessages: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/contact`);
    return await response.json();
  },

  deleteContactMessage: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/contact/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  }
};


