const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    // Link the booking to the specific user who is logged in
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // The type of service they are booking
    service: {
        type: String,
        required: [true, 'Please specify the service type'],
        default: 'Online Skincare Consultation'
    },
   // ... inside your bookingSchema ...
    date: {
        type: Date,
        required: [true, 'Please choose a date'],
        validate: {
            validator: function(value) {
                // Get today's date and set the time to midnight for a clean comparison
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                // Return true if the chosen date is today or in the future
                return value >= today;
            },
            message: 'Booking date cannot be in the past. Please choose a future date.'
        }
    },
    // ... rest of your schema ...
    // The specific time (e.g., "10:00 AM", "2:30 PM")
    timeSlot: {
        type: String,
        required: [true, 'Please choose a time slot'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    notes: {
        type: String, // Any extra info they want to provide before the meeting
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);