// models/info.js
const sequelize = require("sequelize");
const db = require("../Connect");

const University = db.define(
  "University",
  {
    university_name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    avg_sat: {
      type: sequelize.INTEGER,
    },
    avg_act: {
      type: sequelize.INTEGER,
    },
    gpa_avg: {
      type: sequelize.FLOAT,
    },
    admissions_rate: {
      type: sequelize.FLOAT,
    },
    tuition_instate_full: {
      type: sequelize.INTEGER,
    },
    tuition_outstate_full: {
      type: sequelize.INTEGER,
    },
    popular_major: {
      type: sequelize.STRING,
    },
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: "university_table",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = University;
