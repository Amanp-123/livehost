const { 
  statsData, 
  bannerAnnouncement,
  siteSettings,
  plansData,
  faqsData,
  testimonialsData, 
  leadsData, 
  contactMessages,
  activityLogs
} = require('../models/mockData');

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

// PUT /api/stats (Admin only)
const updateStats = (req, res) => {
  try {
    const { activeUsers, uptime, satisfactionRate, integrations } = req.body;
    if (activeUsers !== undefined) statsData.activeUsers = activeUsers;
    if (uptime !== undefined) statsData.uptime = uptime;
    if (satisfactionRate !== undefined) statsData.satisfactionRate = satisfactionRate;
    if (integrations !== undefined) statsData.integrations = integrations;

    activityLogs.unshift({ id: Date.now(), action: 'Updated Live Stats', time: 'Just now', type: 'edit' });

    res.status(200).json({
      success: true,
      message: 'Stats updated successfully!',
      data: statsData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update stats', error: error.message });
  }
};

// GET & PUT /api/banner
const getBanner = (req, res) => {
  res.status(200).json({ success: true, data: bannerAnnouncement });
};

const updateBanner = (req, res) => {
  try {
    const { enabled, badgeText, message, linkText, linkUrl } = req.body;
    if (enabled !== undefined) bannerAnnouncement.enabled = enabled;
    if (badgeText !== undefined) bannerAnnouncement.badgeText = badgeText;
    if (message !== undefined) bannerAnnouncement.message = message;
    if (linkText !== undefined) bannerAnnouncement.linkText = linkText;
    if (linkUrl !== undefined) bannerAnnouncement.linkUrl = linkUrl;

    activityLogs.unshift({ id: Date.now(), action: 'Updated Top Banner Announcement', time: 'Just now', type: 'edit' });

    res.status(200).json({ success: true, message: 'Top Announcement Banner updated!', data: bannerAnnouncement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update banner', error: error.message });
  }
};

// GET & PUT /api/pricing
const getPricing = (req, res) => {
  res.status(200).json({ success: true, data: plansData });
};

const updatePricingPlan = (req, res) => {
  try {
    const { id } = req.params;
    const plan = plansData.find(p => p.id === Number(id));
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const { priceMonthly, priceYearly, name, desc } = req.body;
    if (priceMonthly !== undefined) plan.priceMonthly = Number(priceMonthly);
    if (priceYearly !== undefined) plan.priceYearly = Number(priceYearly);
    if (name !== undefined) plan.name = name;
    if (desc !== undefined) plan.desc = desc;

    activityLogs.unshift({ id: Date.now(), action: `Updated Pricing Plan: ${plan.name}`, time: 'Just now', type: 'edit' });

    res.status(200).json({ success: true, message: 'Pricing plan updated!', data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update plan', error: error.message });
  }
};

// GET, POST, DELETE /api/faqs
const getFaqs = (req, res) => {
  res.status(200).json({ success: true, data: faqsData });
};

const createFaq = (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.status(400).json({ success: false, message: 'Question and answer required' });

    const newFaq = {
      id: faqsData.length > 0 ? Math.max(...faqsData.map(f => f.id)) + 1 : 1,
      question,
      answer
    };
    faqsData.push(newFaq);

    activityLogs.unshift({ id: Date.now(), action: `Added new FAQ question`, time: 'Just now', type: 'edit' });
    res.status(201).json({ success: true, message: 'FAQ added successfully', data: newFaq });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add FAQ', error: error.message });
  }
};

const deleteFaq = (req, res) => {
  try {
    const { id } = req.params;
    const index = faqsData.findIndex(f => f.id === Number(id));
    if (index === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });
    faqsData.splice(index, 1);
    res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete FAQ', error: error.message });
  }
};

// GET & PUT /api/settings
const getSettings = (req, res) => {
  res.status(200).json({ success: true, data: siteSettings });
};

const updateSettings = (req, res) => {
  try {
    const { siteName, supportEmail, maintenanceMode, allowRegistrations } = req.body;
    if (siteName !== undefined) siteSettings.siteName = siteName;
    if (supportEmail !== undefined) siteSettings.supportEmail = supportEmail;
    if (maintenanceMode !== undefined) siteSettings.maintenanceMode = maintenanceMode;
    if (allowRegistrations !== undefined) siteSettings.allowRegistrations = allowRegistrations;

    activityLogs.unshift({ id: Date.now(), action: 'Updated Site Settings & Maintenance Mode', time: 'Just now', type: 'config' });

    res.status(200).json({ success: true, message: 'Settings saved!', data: siteSettings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings', error: error.message });
  }
};

// GET /api/admin/logs
const getLogs = (req, res) => {
  res.status(200).json({ success: true, data: activityLogs });
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

// POST /api/testimonials (Admin only)
const createTestimonial = (req, res) => {
  try {
    const { name, role, avatar, comment, rating } = req.body;
    if (!name || !role || !comment) {
      return res.status(400).json({ success: false, message: 'Name, role and comment are required' });
    }

    const newTestimonial = {
      id: testimonialsData.length > 0 ? Math.max(...testimonialsData.map(t => t.id)) + 1 : 1,
      name,
      role,
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      comment,
      rating: Number(rating) || 5
    };

    testimonialsData.unshift(newTestimonial);
    activityLogs.unshift({ id: Date.now(), action: `Added Testimonial for ${name}`, time: 'Just now', type: 'edit' });

    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully!',
      data: newTestimonial
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add testimonial', error: error.message });
  }
};

// DELETE /api/testimonials/:id (Admin only)
const deleteTestimonial = (req, res) => {
  try {
    const { id } = req.params;
    const index = testimonialsData.findIndex(t => t.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    testimonialsData.splice(index, 1);
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial', error: error.message });
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
    leadsData.unshift(newLead);
    activityLogs.unshift({ id: Date.now(), action: `New Subscriber: ${email}`, time: 'Just now', type: 'lead' });

    res.status(201).json({
      success: true,
      message: 'Thanks for subscribing! We will send you exclusive early updates.',
      data: newLead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to record lead', error: error.message });
  }
};

// GET /api/leads (Admin only)
const getLeads = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: leadsData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving leads', error: error.message });
  }
};

// DELETE /api/leads/:id
const deleteLead = (req, res) => {
  try {
    const { id } = req.params;
    const index = leadsData.findIndex(l => l.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    leadsData.splice(index, 1);
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete lead', error: error.message });
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
    contactMessages.unshift(newMessage);
    activityLogs.unshift({ id: Date.now(), action: `Contact inquiry from ${name}`, time: 'Just now', type: 'contact' });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you shortly.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit contact message', error: error.message });
  }
};

// GET /api/contact (Admin only)
const getContactMessages = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: contactMessages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving messages', error: error.message });
  }
};

// DELETE /api/contact/:id
const deleteContactMessage = (req, res) => {
  try {
    const { id } = req.params;
    const index = contactMessages.findIndex(m => m.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    contactMessages.splice(index, 1);
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
};

// POST /api/admin/login
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin123') {
      activityLogs.unshift({ id: Date.now(), action: 'Admin Logged in successfully', time: 'Just now', type: 'auth' });
      return res.status(200).json({
        success: true,
        message: 'Admin login successful!',
        data: {
          user: {
            name: 'Super Admin',
            email: 'admin@example.com',
            role: 'ADMIN'
          },
          token: 'mock-jwt-admin-token-' + Date.now()
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password. Use admin@example.com / admin123'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

module.exports = {
  getStats,
  updateStats,
  getBanner,
  updateBanner,
  getPricing,
  updatePricingPlan,
  getFaqs,
  createFaq,
  deleteFaq,
  getSettings,
  updateSettings,
  getLogs,
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
  createLead,
  getLeads,
  deleteLead,
  submitContact,
  getContactMessages,
  deleteContactMessage,
  adminLogin
};

