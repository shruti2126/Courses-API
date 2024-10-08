const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("courseapi", "postgres", "Unique26!", {
  host: "localhost",
  dialect: "postgres",
  port: 5432, // Default PostgreSQL port
  logging: false, // We need query logs
});

module.exports = sequelize;
