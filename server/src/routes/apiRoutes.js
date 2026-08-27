const express = require('express');
const router = express.Router();
const { getStats, getTestimonials, createLead, submitContact } = require('../controllers/apiController');
const { validateLead, validateContact } = require('../middleware/validators');

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Dynamic Data Routes
router.get('/stats', getStats);
router.get('/testimonials', getTestimonials);

// Form Actions
router.post('/leads', validateLead, createLead);
router.post('/contact', validateContact, submitContact);

module.exports = router;
