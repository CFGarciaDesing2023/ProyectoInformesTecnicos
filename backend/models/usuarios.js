const sql = require('./database.js');

const registrarUsuario = async (usuario) => {
  const { nombre, correo, contrasenaHash, rolId, departamento, ciudad, sitioId } = usuario;
  const request = new sql.Request();
  await request.query(`
    INSERT INTO Usuarios (Nombre, Correo, Contrasena, RolId, Departamento, Ciudad, SitioId)
    VALUES ('${nombre}', '${correo}', '${contrasenaHash}', ${rolId}, '${departamento}', '${ciudad}', ${sitioId})
  `);
};

const buscarPorCorreo = async (correo) => {
  const request = new sql.Request();
  const result = await request.query(`SELECT * FROM Usuarios WHERE Correo = '${correo}'`);
  return result.recordset[0];
};

module.exports = { registrarUsuario, buscarPorCorreo };
