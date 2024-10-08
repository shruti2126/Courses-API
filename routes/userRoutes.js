const express = require('express')
const User = require("../models/user")
const bcrypt = require("bcrypt");

const router = express.Router();

//Create User
router.post('/', async (req, res) => {
    try {
        //hash the password using bcrypt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//READ Users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// UPDATE User
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
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