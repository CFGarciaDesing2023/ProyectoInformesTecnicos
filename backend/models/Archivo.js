const { executeStoredProcedure } = require('../config/database');

class Archivo {
  static async getAll() {
    return await executeStoredProcedure('sp_GetAllArchivos');
  }

  static async getById(id) {
    const [archivo] = await executeStoredProcedure('sp_GetArchivo', { id });
    return archivo;
  }

  static async getByInforme(informe_id) {
    return await executeStoredProcedure('sp_GetArchivosByInforme', { informe_id });
  }

  static async create(informe_id, nombre, tipo, url) {
    const [result] = await executeStoredProcedure('sp_CreateArchivo', { 
      informe_id, 
      nombre, 
      tipo, 
      url 
    });
    return { id: result.id, informe_id, nombre, tipo, url };
  }

  static async update(id, nombre, tipo, url) {
    await executeStoredProcedure('sp_UpdateArchivo', { id, nombre, tipo, url });
    return { id, nombre, tipo, url };
  }

  static async delete(id) {
    await executeStoredProcedure('sp_DeleteArchivo', { id });
    return true;
  }
}

module.exports = Archivo;