const { executeProcedure } = require('../config/database.js');

async function getAllRoles(req, res) {
  try {
    const roles = await executeProcedure('sp_GetAllRoles');
    res.json(roles);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getRolById(req, res) {
  try {
    const { id } = req.params;
    const [rol] = await executeProcedure('sp_GetRol', { id });
    if (rol) {
      res.json(rol);
    } else {
      res.status(404).send('Rol no encontrado');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function createRol(req, res) {
  try {
    const { nombre } = req.body;
    const [result] = await executeProcedure('sp_CreateRol', { nombre });
    res.status(201).json({ id: result.id, nombre });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateRol(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    await executeProcedure('sp_UpdateRol', { id, nombre });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteRol(req, res) {
  try {
    const { id } = req.params;
    await executeProcedure('sp_DeleteRol', { id });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol
};