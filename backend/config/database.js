const sql = require('mssql');

const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'tu_servidor_sql', // Ejemplo: localhost
  database: 'tu_base_de_datos',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conexión a SQL Server exitosa');
    return pool;
  })
  .catch(err => console.error('Error de conexión a SQL Server', err));

module.exports = {
  sql, poolPromise
};
