const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, default: 'Skincare' }, 
    imageUrl: { type: String, required: true },
    countInStock: { type: Number, default: 10 }, // Good for managing that one product
    isFeatured: { type: Boolean, default: false } // You can mark the current product as "Featured" for the Home Page
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);