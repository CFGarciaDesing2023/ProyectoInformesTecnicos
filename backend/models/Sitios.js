module.exports = (sequelize, DataTypes) => {
  const Sitio = sequelize.define('Sitio', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tipo: {
      type: DataTypes.ENUM('PTAR', 'PTAP', 'CEA', 'MANTENIMIENTO', 'FLANDES', 'MELGAR', 'CERRO MARIA'),
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Sitios',
    timestamps: false
  });

  Sitio.associate = (models) => {
    Sitio.hasMany(models.Informe, { foreignKey: 'sitioId' });
  };

  return Sitio;
};