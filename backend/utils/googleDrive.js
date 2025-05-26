const fs = require('fs');
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'credenciales.json', // archivo de credenciales del servicio
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

async function asegurarCarpeta(nombre, carpetaPadreId = null) {
  const res = await drive.files.list({
    q: `'${carpetaPadreId || 'root'}' in parents and name = '${nombre}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
  });

  if (res.data.files.length > 0) return res.data.files[0].id;

  const nuevaCarpeta = await drive.files.create({
    resource: {
      name: nombre,
      mimeType: 'application/vnd.google-apps.folder',
      parents: carpetaPadreId ? [carpetaPadreId] : [],
    },
    fields: 'id',
  });

  return nuevaCarpeta.data.id;
}

async function subirArchivo({ archivoPath, nombreArchivo, sitio, tipoSitio, tipoArchivo }) {
  const carpetaSitioId = await asegurarCarpeta(sitio);
  const carpetaTipoSitioId = await asegurarCarpeta(tipoSitio, carpetaSitioId);
  const carpetaTipoArchivoId = await asegurarCarpeta(tipoArchivo, carpetaTipoSitioId);

  const archivoMetadata = {
    name: nombreArchivo,
    parents: [carpetaTipoArchivoId],
  };

  const media = {
    body: fs.createReadStream(archivoPath),
  };

  const archivoSubido = await drive.files.create({
    resource: archivoMetadata,
    media,
    fields: 'id, webViewLink',
  });

  return archivoSubido.data.webViewLink;
}

module.exports = { subirArchivo };
