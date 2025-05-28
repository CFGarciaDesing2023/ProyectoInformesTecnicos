const express = require('express');
const router = express.Router();
const {
  createUsuario,
  getUsuario,
  getUsuarioByCorreo,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuariosController');

router.post('/', createUsuario);
router.get('/:id', getUsuario);
router.get('/correo/:correo', getUsuarioByCorreo);
router.get('/', getAllUsuarios);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;