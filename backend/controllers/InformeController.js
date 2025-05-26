const sql = require('mssql');
const config = require('../config/database.js');
const { subirArchivo } = require('../utils/googleDrive');
const { registrarEnHoja } = require('../utils/googleSheets');
const fs = require('fs');
const path = require('path');

exports.enviarInforme = async (req, res) => {
  const archivo = req.file;
  const { tipoArchivo, tipoSitio, sitio, usuario } = req.body;

  if (!archivo) return res.status(400).json({ error: 'Archivo no enviado' });

  try {
    // Subir a Google Drive
    const url = await subirArchivo({
      archivoPath: archivo.path,
      nombreArchivo: archivo.originalname,
      sitio,
      tipoSitio,
      tipoArchivo,
    });

    // Registrar en la hoja de cálculo
    await registrarEnHoja({
      fecha: new Date().toLocaleString(),
      nombreArchivo: archivo.originalname,
      url,
      sitio,
      tipoSitio,
      tipoArchivo,
      usuario,
    });

    // Registrar en la BD
    const pool = await sql.connect(config);
    await pool.request()
      .input('nombreArchivo', sql.NVarChar, archivo.originalname)
      .input('url', sql.NVarChar, url)
      .input('sitio', sql.NVarChar, sitio)
      .input('tipoSitio', sql.NVarChar, tipoSitio)
      .input('tipoArchivo', sql.NVarChar, tipoArchivo)
      .input('usuario', sql.NVarChar, usuario)
      .input('fecha', sql.DateTime, new Date())
      .query(`INSERT INTO Informes (nombreArchivo, url, sitio, tipoSitio, tipoArchivo, usuario, fecha) 
              VALUES (@nombreArchivo, @url, @sitio, @tipoSitio, @tipoArchivo, @usuario, @fecha)`);

    fs.unlinkSync(archivo.path); // limpiar archivo temporal
    res.status(200).json({ mensaje: 'Informe enviado con éxito', url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar informe' });
  }
};
