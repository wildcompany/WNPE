const mongoose = require('mongoose');

const customRequestSchema = mongoose.Schema({
    // If they are logged in, link it to their user account
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, 
        ref: 'User',
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
    },
    ingredients: [{
        type: String, // Will store ['Rosemary', 'Lemon', etc.]
    }],
    skinNeeds: {
        type: String,
        required: [true, 'Please describe your skin needs'],
    },
    consultationOption: {
        type: String,
        required: true,
        default: 'PDF Recommendation'
    },
    // To track the progress of the custom formulation
    status: {
        type: String,
        enum: ['Pending Review', 'Formulating', 'Ready for Final Payment', 'Completed'],
        default: 'Pending Review'
    },
    // To track if they paid that 50% deposit!
    isDepositPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('CustomRequest', customRequestSchema);