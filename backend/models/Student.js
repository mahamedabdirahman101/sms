// backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  // rollNumber: { type: String, required: true, unique: true },
  // class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  rollNumber: {
    type: String,
    required: [true, "Roll number is required"],
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Class reference is required"],
  },
  attendance: [
    {
      date: { type: Date },
      status: { type: String, enum: ["Present", "Absent"], default: "Present" },
    },
  ],
  grades: [
    {
      subject: String,
      score: Number,
    },
  ],
  fees: [
    {
      amount: Number,
      date: Date,
      status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
