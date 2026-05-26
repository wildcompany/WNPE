const express = require('express');
const router = express.Router();

const {
  submitInquiry,
  getInquiries
} = require('../controllers/inquiryController');

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

router.post('/', submitInquiry);

router.get(
  '/',
  protect,
  adminOnly,
  getInquiries
);

module.exports = router;