const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const config = require('../config/database.js');

const SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

exports.registrar = async (req, res) => {
  const { nombre, correo, contraseña, rol, departamento, ciudad, sitio } = req.body;

  try {
    const hashedPass = await bcrypt.hash(contraseña, 10);
    const pool = await sql.connect(config);
    await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('correo', sql.NVarChar, correo)
      .input('contraseña', sql.NVarChar, hashedPass)
      .input('rol', sql.NVarChar, rol)
      .input('departamento', sql.NVarChar, departamento)
      .input('ciudad', sql.NVarChar, ciudad)
      .input('sitio', sql.NVarChar, sitio)
      .query(`INSERT INTO Usuarios (nombre, correo, contraseña, rol, departamento, ciudad, sitio) VALUES (@nombre, @correo, @contraseña, @rol, @departamento, @ciudad, @sitio)`);

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('correo', sql.NVarChar, correo)
      .query(`SELECT * FROM Usuarios WHERE correo = @correo`);

    const usuario = result.recordset[0];

    if (!usuario) return res.status(401).json({ error: 'Correo no registrado' });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET, { expiresIn: '8h' });

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en login' });
  }
};
