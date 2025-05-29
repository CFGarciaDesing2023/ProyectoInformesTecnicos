const { executeStoredProcedure } = require('../config/database');

class Rol {
  static async getAll() {
    return await executeStoredProcedure('sp_GetAllRoles');
  }

  static async getById(id) {
    const [rol] = await executeStoredProcedure('sp_GetRol', { id });
    return rol;
  }

  static async create(nombre) {
    const [result] = await executeStoredProcedure('sp_CreateRol', { nombre });
    return { id: result.id, nombre };
  }

  static async update(id, nombre) {
    await executeStoredProcedure('sp_UpdateRol', { id, nombre });
    return { id, nombre };
  }

  static async delete(id) {
    await executeStoredProcedure('sp_DeleteRol', { id });
    return true;
  }
}

module.exports = Rol;