const googleDriveService = require('../services/googleDriveService');

exports.create = async (req, res) => {
  try {
    const { sitioId, tipoSitio, fecha } = req.body;
    
    // 1. Crear el informe en la base de datos
    const informe = await Informe.create({ sitioId, tipoSitio, fecha });
    
    // 2. Subir archivos a Google Drive
    const archivosSubidos = [];
    for (const file of req.files.fotos) {
      const resultado = await googleDriveService.uploadFile(file, process.env.GOOGLE_DRIVE_FOLDER_ID);
      archivosSubidos.push(resultado);
    }
    
    // 3. Guardar metadata de archivos en la base de datos
    await Archivo.bulkCreate(archivosSubidos.map(archivo => ({
      informeId: informe.id,
      tipo: 'FOTO',
      nombreArchivo: archivo.name,
      rutaGoogleDrive: archivo.url
    })));

    res.status(201).json({ informe, archivos: archivosSubidos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};