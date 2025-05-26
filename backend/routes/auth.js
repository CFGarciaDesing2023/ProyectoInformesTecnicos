const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Registro de usuario
router.post('/register', authController.registrar);

// Login de usuario
router.post('/login', authController.login);

module.exports = router;
