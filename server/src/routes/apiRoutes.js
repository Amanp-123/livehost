const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/apiController');
const { validateLead, validateContact } = require('../middleware/validators');

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Dynamic Data Routes (Public)
router.get('/stats', getStats);
router.get('/banner', getBanner);
router.get('/pricing', getPricing);
router.get('/faqs', getFaqs);
router.get('/settings', getSettings);
router.get('/testimonials', getTestimonials);

// Form Submissions (Public)
router.post('/leads', validateLead, createLead);
router.post('/contact', validateContact, submitContact);

// Admin Routes
router.post('/admin/login', adminLogin);
router.put('/admin/stats', updateStats);
router.put('/admin/banner', updateBanner);
router.put('/admin/pricing/:id', updatePricingPlan);
router.post('/admin/faqs', createFaq);
router.delete('/admin/faqs/:id', deleteFaq);
router.put('/admin/settings', updateSettings);
router.get('/admin/logs', getLogs);
router.post('/admin/testimonials', createTestimonial);
router.delete('/admin/testimonials/:id', deleteTestimonial);
router.get('/admin/leads', getLeads);
router.delete('/admin/leads/:id', deleteLead);
router.get('/admin/contact', getContactMessages);
router.delete('/admin/contact/:id', deleteContactMessage);


module.exports = router;

