
const { Sequelize } = require('sequelize');

module.exports= new Sequelize('Testing', 'postgres', '224001800Jj@', {
  host: 'localhost',
  dialect: 'postgres',
});