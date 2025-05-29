const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Configuración de entorno
dotenv.config();

// Importar rutas
const rolesRouter = require('./routes/roles');
const sitiosRouter = require('./routes/sitios');
const usuariosRouter = require('./routes/usuarios');
const informesRouter = require('./routes/informes');
const archivosRouter = require('./routes/archivos');

// Crear aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/roles', rolesRouter);
app.use('/api/sitios', sitiosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/informes', informesRouter);
app.use('/api/archivos', archivosRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de gomdsaszomac funcionando');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;