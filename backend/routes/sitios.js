const express = require('express');
const router = express.Router();
const {
  createSitio,
  getSitio,
  getAllSitios,
  updateSitio,
  deleteSitio
} = require('../controllers/sitiosController');

// Crear un nuevo sitio
router.post('/', createSitio);

// Obtener todos los sitios
router.get('/', getAllSitios);

// Obtener un sitio específico por ID
router.get('/:id', getSitio);

// Actualizar un sitio
router.put('/:id', updateSitio);

// Eliminar un sitio
router.delete('/:id', deleteSitio);

module.exports = router;