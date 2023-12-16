const sequelize = require("sequelize");

const db = require("../Connect");

const University = require("./University");
const User = require("./User");

const FavoriteUniversity = db.define(
  "FavoriteUniversity",
  {
    rank: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    universityId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: University,
        key: "id",
      },
    },
    userId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "favorite_university",
    timestamps: true,
    freezeTableName: true,
  }
);

FavoriteUniversity.hasOne(University, {
  foreignKey: "id",
  sourceKey: "universityId",
});

FavoriteUniversity.hasOne(User, {
  foreignKey: "id",
  sourceKey: "userId",
});

module.exports = FavoriteUniversity;
