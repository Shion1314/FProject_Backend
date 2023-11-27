// models/info.js
const sequelize=require('sequelize');
const db = require('../Connect');



const Score = db.define('score', {
  university_name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  sat_25: {
    type: sequelize.INTEGER,
  },
  sat_75: {
    type: sequelize.INTEGER,
  },
  act_25: {
    type: sequelize.INTEGER,
  },
  act_75: {
    type: sequelize.INTEGER,
  },
}, {
  tableName: 'university_score',
  timestamps: false,
  freezeTableName: true,
});

module.exports = Score;





