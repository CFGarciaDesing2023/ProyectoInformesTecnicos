const { poolPromise, sql } = require('../config/database');

module.exports = {
  async crearInforme(datos) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('UsuarioId', sql.Int, datos.usuarioId)
      .input('Fecha', sql.DateTime, datos.fecha)
      .input('Descripcion', sql.VarChar, datos.descripcion)
      .input('Sitio', sql.VarChar, datos.sitio)
      .query(`
        INSERT INTO Informes (UsuarioId, Fecha, Descripcion, Sitio)
        VALUES (@UsuarioId, @Fecha, @Descripcion, @Sitio)
      `);
    return result;
  },

  async subirArchivo(idInforme, archivo) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('InformeId', sql.Int, idInforme)
      .input('NombreArchivo', sql.VarChar, archivo.nombre)
      .input('URL', sql.VarChar, archivo.url)
      .input('Tipo', sql.VarChar, archivo.tipo)
      .query(`
        INSERT INTO ArchivosInforme (InformeId, NombreArchivo, URL, Tipo)
        VALUES (@InformeId, @NombreArchivo, @URL, @Tipo)
      `);
    return result;
  },

  async obtenerInformes() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT i.Id, u.Nombre AS Usuario, i.Fecha, i.Descripcion, i.Sitio
      FROM Informes i
      JOIN Usuarios u ON i.UsuarioId = u.Id
      ORDER BY i.Fecha DESC
    `);
    return result.recordset;
  },

  async obtenerArchivos(idInforme) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('InformeId', sql.Int, idInforme)
      .query(`
        SELECT * FROM ArchivosInforme
        WHERE InformeId = @InformeId
      `);
    return result.recordset;
  }
};
