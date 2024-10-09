const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

// Create User (with password hashing)
router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user with the hashed password
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Store hashed password
    });
    // Remove password before sending response
    const { password, ...userWithoutPassword } = user.toJSON(); // Exclude password in response
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ Users (exclude password in response)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password from the result
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user first
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update only the fields present in the request body
    const updatedFields = {};

    if (req.body.username) {
      updatedFields.username = req.body.username;
    }
    if (req.body.email) {
      updatedFields.email = req.body.email;
    }
    if (req.body.password) {
      // Hash the new password before updating
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updatedFields.password = hashedPassword;
    }
    await user.update(updatedFields); // This will update only the given fields
    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE User
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
