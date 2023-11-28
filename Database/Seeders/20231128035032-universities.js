const universities = require("./universities.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("university", universities);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("university", null, {});
  },
};
