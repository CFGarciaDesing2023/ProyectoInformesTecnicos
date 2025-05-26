const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informeController');
const { verificarToken, restringirRol } = require('../middleware/authMiddleware.js');

// Crear nuevo informe (solo Operador)
router.post('/crear', verificarToken, restringirRol([2]), informeController.crearInforme);

// Subir archivo a informe (solo Operador)
router.post('/:id/subir-archivo', verificarToken, restringirRol([2]), informeController.subirArchivo);

// Obtener informes por sitio o usuario (para Coordinador o Admin)
router.get('/todos', verificarToken, restringirRol([1, 3]), informeController.obtenerInformes);

// Descargar URLs de archivos de informe (para Coordinador)
router.get('/:id/archivos', verificarToken, restringirRol([3]), informeController.obtenerArchivosPorInforme);

module.exports = router;
