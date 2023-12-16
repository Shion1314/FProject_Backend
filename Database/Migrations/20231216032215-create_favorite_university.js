"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorite_university", {
      createdAt: Sequelize.DATE,
      universityId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "university",
          key: "id",
        },
      },
      updatedAt: Sequelize.DATE,
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    });

    await queryInterface.addIndex("favorite_university", ["userId"]);
    await queryInterface.addIndex("favorite_university", ["universityId"]);

    await queryInterface.addConstraint("favorite_university", {
      fields: ["userId", "universityId"],
      type: "unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("favorite_university");
  },
};
