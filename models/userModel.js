const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombres:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    apellidos:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    correo:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    contrasenia:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    ocupacion:{
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
      default: 'Persona Natural'
    }
  });
}
