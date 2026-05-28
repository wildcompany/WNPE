const express = require('express');
const router = express.Router();
const { getMyBookings, getAvailableSlots, createBooking } = require('../controllers/bookingController');

// I am assuming your auth middleware is named 'protect' and located here based on standard MERN architecture. 
// Update the path if yours is different!
const { protect } = require('../middleware/authMiddleware'); 

// Public route to check availability before logging in
router.post('/available', getAvailableSlots);

// Protected routes (User must have a valid JWT)
router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;