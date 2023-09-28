const { DataTypes } = require("sequelize");
const sequel = require("../db");

const User = sequel.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING
  }
});


sequel
  .sync()
  .then(() => {
    console.log("user table created successfully");
  })
  .catch((err) => {
    console.log("Error occured while creating table", err);
  });

module.exports = User;
