const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// User model using Sequelize
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER, // Auto-incrementing integer
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // To ensure usernames are unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //To ensure email addresses are unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Store hashed passwords
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = User;
