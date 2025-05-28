const sql = require('mssql');

const config = {
  user: 'CFGarciaDesing_SQLLogin_1',
  password: 'CFgp03131996',
  server: 'gomdsaszomac.mssql.somee.com', // Ejemplo: localhost
  database: 'gomdsaszomac',
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
