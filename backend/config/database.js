const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Para Azure SQL
        trustServerCertificate: true // Solo para desarrollo local
      }
    },
    logging: false // Desactiva los logs de SQL en producción
  }
);

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a SQL Server establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
  }
};

testConnection();

module.exports = sequelize;