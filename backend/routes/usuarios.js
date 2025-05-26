const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken, restringirRol } = require('../middleware/authMiddleware.js');

// Obtener todos los usuarios (solo para Admin)
router.get('/', verificarToken, restringirRol([1]), usuarioController.obtenerUsuarios);

// Obtener perfil del usuario autenticado
router.get('/perfil', verificarToken, usuarioController.obtenerPerfil);

module.exports = router;
