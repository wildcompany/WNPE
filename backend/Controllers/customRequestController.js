const CustomRequest = require('../models/CustomRequest');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Submit a new customization request and trigger Stripe deposit
// @route   POST /api/customizations
// @access  Public (or Private if you require login)
const createCustomRequest = async (req, res) => {
    try {
        const { email, ingredients, skinNeeds, consultationOption } = req.body;

        // 1. Save the request to MongoDB
        const newRequest = await CustomRequest.create({
            email,
            ingredients,
            skinNeeds,
            consultationOption
        });

        // 2. Create a Stripe Checkout Session for the 50% Deposit
        // Let's assume the base deposit is always $50.00 (5000 cents)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Custom Skincare Consultation Deposit',
                            description: `Consultation Type: ${consultationOption}`,
                        },
                        unit_amount: 5000, // $50.00 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Pass the database ID to Stripe so we know which request was paid for later!
            client_reference_id: newRequest._id.toString(), 
            success_url: `http://localhost:5173/customization-success`,
            cancel_url: `http://localhost:5173/customize`,
        });

        // 3. Send the Stripe URL back to the React frontend
        res.status(201).json({ 
            message: "Request saved successfully", 
            url: session.url 
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to process request", error: error.message });
    }
};

module.exports = { createCustomRequest };