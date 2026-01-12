const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new student
// @route   POST /api/students
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      user: req.user._id, // auto-assign user from token
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors });
    }
    res.status(400).json({ error: err.message });
  }
});

// @desc    Get all students
// @route   GET /api/students
// @access  Public
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("class").populate("user");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Get a single student
// @route   GET /api/students/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("class")
      .populate("user");
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors });
    }
    res.status(400).json({ error: err.message });
  }
});

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
