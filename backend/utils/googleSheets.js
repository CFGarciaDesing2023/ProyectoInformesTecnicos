const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'credenciales.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Reemplaza con tu ID real de la hoja de cálculo
const SPREADSHEET_ID = 'TU_SHEET_ID';

async function registrarEnHoja({ fecha, nombreArchivo, url, sitio, tipoSitio, tipoArchivo, usuario }) {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: 'Informes!A:G',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[fecha, nombreArchivo, url, sitio, tipoSitio, tipoArchivo, usuario]],
    },
    auth,
  };

  await sheets.spreadsheets.values.append(request);
}

module.exports = { registrarEnHoja };
