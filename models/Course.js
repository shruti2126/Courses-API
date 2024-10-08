const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

// Course model using Sequelize
const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER, // Auto-incrementing integer
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER, // Reference userId as an integer
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // descriptions can be long
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, //in months
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable automatic timestamps
  }
);

module.exports = Course;
