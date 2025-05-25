const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const informeRoutes = require('./routes/informes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/informes', informeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
