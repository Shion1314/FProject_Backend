const argon2 = require("argon2");
const sequelize = require("sequelize");

const db = require("../Connect");

const capitalizeFirstLetter = (name) => {
  const trimmed = name.trim();

  return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
};

module.exports = db.define(
  "User",
  {
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("firstName", capitalizeFirstLetter(value));
      },
    },
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("lastName", normalizeName(value));
      },
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
    hooks: {
      async beforeCreate(user) {
        user.password = await argon2.hash(user.password);
      },
      async beforeUpdate(user) {
        if (user.changed("password")) {
          user.password = await argon2.hash(user.password);
        }
      },
    },
  }
);
