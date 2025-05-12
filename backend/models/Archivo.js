module.exports = (sequelize, DataTypes) => {
  const Archivo = sequelize.define('Archivo', {
    tipo: {
      type: DataTypes.ENUM('FOTO', 'VIDEO', 'DOCUMENTO'),
      allowNull: false
    },
    nombreArchivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaGoogleDrive: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaSubida: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Archivos',
    timestamps: false
  });

  Archivo.associate = (models) => {
    Archivo.belongsTo(models.Informe, { foreignKey: 'informeId' });
  };

  return Archivo;
};