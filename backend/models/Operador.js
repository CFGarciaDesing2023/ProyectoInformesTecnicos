const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Operador = sequelize.define('Operador', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    },
    rol: {
      type: DataTypes.ENUM('OPERADOR', 'COORDINADOR'),
      allowNull: false,
      defaultValue: 'OPERADOR'
    }
  }, {
    tableName: 'Operadores',
    timestamps: false
  });

  Operador.associate = (models) => {
    Operador.hasMany(models.Informe, { foreignKey: 'operadorId' });
  };

  // Método para comparar contraseñas
  Operador.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Operador;
};