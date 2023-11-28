const { Sequelize } = require("sequelize");

const { database } = require("../database.json");

module.exports = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  dialect: database.dialect,
});
