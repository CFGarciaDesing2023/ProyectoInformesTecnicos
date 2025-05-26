const express = require('express');
const cors = require('cors');
const app = express();

// Importar rutas
const rolesRoutes = require('./routes/rolesRoutes');
const sitiosRoutes = require('./routes/sitiosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const informesRoutes = require('./routes/informesRoutes');
const archivosRoutes = require('./routes/archivosRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/roles', rolesRoutes);
app.use('/api/sitios', sitiosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/informes', informesRoutes);
app.use('/api/archivos', archivosRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});