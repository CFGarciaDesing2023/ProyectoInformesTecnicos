const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise } = require('../config/database.js');

exports.registrar = async (req, res) => {
  const { nombre, email, password, rolID, departamento, ciudad, sitio } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .input('rolID', sql.Int, rolID)
      .input('departamento', sql.VarChar, departamento)
      .input('ciudad', sql.VarChar, ciudad)
      .input('sitio', sql.VarChar, sitio)
      .query(`INSERT INTO Usuarios (NombreCompleto, Email, PasswordHash, RolID, Departamento, Ciudad, SitioAsignado)
              VALUES (@nombre, @email, @password, @rolID, @departamento, @ciudad, @sitio)`);
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(`SELECT * FROM Usuarios WHERE Email = @email`);

    const usuario = result.recordset[0];
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.PasswordHash);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.UsuarioID, rol: usuario.RolID }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
