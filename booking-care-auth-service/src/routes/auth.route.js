const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// API login
router.post('/login', authController.login);

module.exports = router;
