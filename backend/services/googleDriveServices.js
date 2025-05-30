const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEYFILEPATH = path.join(__dirname, '../../credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

async function uploadFile(file, folderId) {
  const fileMetadata = {
    name: file.originalname,
    parents: [folderId],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id,webViewLink',
    });
    
    return {
      id: response.data.id,
      url: response.data.webViewLink,
      name: file.originalname
    };
  } catch (error) {
    console.error('Error al subir archivo a Google Drive:', error);
    throw error;
  }
}

module.exports = {
  uploadFile
};