const { executeProcedure } = require('../config/database.js');

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await executeProcedure('sp_GetAllUsuarios');
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const [usuario] = await executeProcedure('sp_GetUsuario', { id });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getUsuarioByCorreo(req, res) {
  try {
    const { correo } = req.params;
    const [usuario] = await executeProcedure('sp_GetUsuarioByCorreo', { correo });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createUsuario(req, res) {
  try {
    const { nombre, correo, contraseña, rol_id, sitio_id } = req.body;
    const [result] = await executeProcedure('sp_CreateUsuario', { 
      nombre, correo, contraseña, rol_id, sitio_id 
    });
    res.status(201).json({ id: result.id, nombre, correo });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol_id, sitio_id } = req.body;
    await executeProcedure('sp_UpdateUsuario', { 
      id, nombre, correo, contraseña, rol_id, sitio_id 
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    await executeProcedure('sp_DeleteUsuario', { id });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByCorreo,
  createUsuario,
  updateUsuario,
  deleteUsuario
};