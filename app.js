const express = require("express");
const app = express();
const sequelize = require("./config/db");
const Course = require("./models/Course");
const User = require("./models/user");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const PORT = 3000;

app.use(express.json()); // For parsing application/json

//Test database connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Unable to connect to the database:", err));

User.hasMany(Course, {
  foreignKey: "userId",
});
Course.belongsTo(User, {
  foreignKey: "userId",
});

//Sync models (creates the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

//Routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

//start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
