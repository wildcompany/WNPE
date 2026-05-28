const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Checkout Session
// @route   POST /api/checkout/create-session
// @access  Private (User must be logged in)
const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;

        // 1. Format the cart items exactly how Stripe requires them
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'usd', // or 'cad', 'eur', etc.
                product_data: {
                    name: item.name,
                    // Stripe requires full URLs for images, not just local paths
                    // images: [item.image] 
                },
                // Stripe calculates everything in cents! So $20.00 becomes 2000
                unit_amount: Math.round(item.price * 100), 
            },
            quantity: item.quantity, // e.g., 2 bottles of face wash
        }));

        // 2. Create the secure Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // Where Stripe sends the user if payment is successful
            success_url: `http://localhost:5173/checkout-success`, 
            // Where Stripe sends the user if they hit the back button
            cancel_url: `http://localhost:5173/cart`, 
        });

        // 3. Send the Stripe Session URL back to the React frontend
        res.status(200).json({ url: session.url });

    } catch (error) {
        res.status(500).json({ message: "Stripe Checkout Failed", error: error.message });
    }
};

module.exports = { createCheckoutSession };