module.exports = (sequelize, DataTypes) => {
  const Informe = sequelize.define('Informe', {
    fechaEnvio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'REVISADO', 'APROBADO', 'RECHAZADO'),
      allowNull: false,
      defaultValue: 'PENDIENTE'
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Informes',
    timestamps: false
  });

  Informe.associate = (models) => {
    Informe.belongsTo(models.Operador, { foreignKey: 'operadorId' });
    Informe.belongsTo(models.Sitio, { foreignKey: 'sitioId' });
    Informe.hasMany(models.Archivo, { foreignKey: 'informeId' });
  };

  return Informe;
};