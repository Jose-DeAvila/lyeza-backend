const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const userModel = require('./models/userModel');

const sequelize = new Sequelize('lyeza', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = userModel(sequelize, Sequelize);

sequelize.sync({force: false}).then(() => {
  console.log("Tablas sincronizadas");
})

module.exports = { User };
