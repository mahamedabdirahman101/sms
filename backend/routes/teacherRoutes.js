// backend/routes/teacherRoutes.js
const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// Create a new teacher
router.post("/", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("subjects")
      .populate("classes")
      .populate("user");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single teacher
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("subjects")
      .populate("classes")
      .populate("user");
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a teacher
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a teacher
router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
