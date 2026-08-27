const { statsData, testimonialsData, leadsData, contactMessages } = require('../models/mockData');

// GET /api/stats
const getStats = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: statsData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving stats', error: error.message });
  }
};

// GET /api/testimonials
const getTestimonials = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: testimonialsData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving testimonials', error: error.message });
  }
};

// POST /api/leads
const createLead = (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already registered
    const existing = leadsData.find(lead => lead.email === email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered on our early access list!'
      });
    }

    const newLead = {
      id: leadsData.length + 1,
      email,
      createdAt: new Date().toISOString()
    };
    leadsData.push(newLead);

    res.status(201).json({
      success: true,
      message: 'Thanks for subscribing! We will send you exclusive early updates.',
      data: newLead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to record lead', error: error.message });
  }
};

// POST /api/contact
const submitContact = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };
    contactMessages.push(newMessage);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you shortly.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit contact message', error: error.message });
  }
};

module.exports = {
  getStats,
  getTestimonials,
  createLead,
  submitContact
};
