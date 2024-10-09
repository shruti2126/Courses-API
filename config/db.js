const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: 5432, // Default PostgreSQL port
  logging: false, // We need query logs
});

module.exports = sequelize;
