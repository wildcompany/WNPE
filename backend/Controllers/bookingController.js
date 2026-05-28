const Booking = require('../models/Booking');

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ date: 1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500);
        throw new Error('Failed to fetch bookings');
    }
};

// @desc    Get available time slots for a specific date
// @route   POST /api/bookings/available
// @access  Public
const getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.body; // Frontend sends a specific date
       
        const requestedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Stop them immediately if the date is in the past
        if (requestedDate < today) {
            res.status(400);
            throw new Error('You cannot select a date in the past.');
        }
        // Define your company's standard business hours
        const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

        // Find all bookings that already exist on this exact date
        const existingBookings = await Booking.find({ date: new Date(date) });

        // Extract just the time slots that are already taken
        const takenSlots = existingBookings.map(booking => booking.timeSlot);

        // Filter out the taken slots from the available slots
        const availableSlots = allSlots.filter(slot => !takenSlots.includes(slot));

        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500);
        throw new Error('Failed to fetch available slots');
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { service, date, timeSlot, notes } = req.body;

        // 1. Double-check that the time slot hasn't been sniped by someone else in the last few seconds!
        const isTaken = await Booking.findOne({ date: new Date(date), timeSlot });
        if (isTaken) {
            res.status(400);
            throw new Error('This time slot is already booked. Please choose another.');
        }

        // 2. Create the booking
        const booking = await Booking.create({
            user: req.user._id, // Coming from your auth middleware!
            service,
            date: new Date(date),
            timeSlot,
            notes
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || 'Failed to create booking');
    }
};

module.exports = { getMyBookings, getAvailableSlots, createBooking };