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
  }
};
