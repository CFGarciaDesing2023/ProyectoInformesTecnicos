const express = require('express');
const router = express.Router();
const InformeController = require('../controllers/InformeController');

// POST /api/informes - Crear un nuevo informe
router.post('/', InformeController.create);

// GET /api/informes - Listar informes (para coordinadores)
router.get('/', InformeController.list);

module.exports = router;