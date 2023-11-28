"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("university", {
      university_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sat_score_25th: {
        type: Sequelize.INTEGER,
      },
      sat_score_75th: {
        type: Sequelize.INTEGER,
      },
      act_score_25th: {
        type: Sequelize.INTEGER,
      },
      act_score_75th: {
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
    await queryInterface.dropTable("university");
  },
};
