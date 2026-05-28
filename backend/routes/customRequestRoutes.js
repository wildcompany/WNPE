const express = require('express');
const router = express.Router();
const { createCustomRequest } = require('../controllers/customRequestController');

router.post('/', createCustomRequest);

module.exports = router;