// models/info.js
const sequelize=require('sequelize');
const db = require('../Connect');



const Info = db.define('Info', {
  University_Name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  GPA: {
    type: sequelize.FLOAT,
  },
  Admissions_Rate: {
    type: sequelize.FLOAT,
  },
  tution_in_state: {
    type: sequelize.INTEGER,
  },
  tution_out_state: {
    type: sequelize.INTEGER,
  },
  popular_major: {
    type: sequelize.STRING,
  },
}, {
  tableName: 'University_Info',
  timestamps: false,
  freezeTableName: true,
});

module.exports = Info;





