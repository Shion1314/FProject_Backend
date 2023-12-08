"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("university_table", {
      university_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avg_sat: {
        type: Sequelize.INTEGER,
      },
      avg_act: {
        type: Sequelize.INTEGER,
      },
      gpa_avg: {
        type: Sequelize.FLOAT,
      },
      admissions_rate: {
        type: Sequelize.FLOAT,
      },
      tuition_instate_full: {
        type: Sequelize.INTEGER,
      },
      tuition_outstate_full: {
        type: Sequelize.INTEGER,
      },
      popular_major: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("university_table");
  },
};
