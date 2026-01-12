// const express = require("express");
// const router = express.Router();
// const Class = require("../models/Class");

// // ✅ Create a new class
// router.post("/", async (req, res) => {
//   try {
//     const newClass = new Class(req.body);
//     await newClass.save();
//     res.status(201).json(newClass);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Get all classes
// router.get("/", async (req, res) => {
//   try {
//     const classes = await Class.find().populate("teacher");
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Get a single class by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const classItem = await Class.findById(req.params.id).populate("teacher");
//     if (!classItem) return res.status(404).json({ error: "Class not found" });
//     res.json(classItem);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Update a class
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedClass = await Class.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedClass);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Delete a class
// router.delete("/:id", async (req, res) => {
//   try {
//     await Class.findByIdAndDelete(req.params.id);
//     res.json({ message: "Class deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const { protect } = require("../middleware/authMiddleware");

// Create a new class
router.post("/", protect, async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
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

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
