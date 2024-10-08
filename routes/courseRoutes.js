const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// CREATE Course
router.post("/", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Course
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Course.update(req.body, { where: { id } });
    if (updated) {
      const updatedCourse = await Course.findOne({ where: { id } });
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Course
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json({ message: "Course deleted" });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
