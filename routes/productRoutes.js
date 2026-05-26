const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Route
router.get('/', getProducts);

// Admin Protected Routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;