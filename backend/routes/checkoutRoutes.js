const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/stripeController');
// Assuming you have an auth middleware to protect this route
// const { protect } = require('../middleware/authMiddleware'); 

router.post('/create-session', createCheckoutSession); // Add 'protect' here if users must be logged in

module.exports = router;