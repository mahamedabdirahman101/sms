// const mongoose = require("mongoose");

// const classSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
//   schedule: { type: String },
//   room: { type: String },
// });

// module.exports = mongoose.model("Class", classSchema);

const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Class name is required"],
    unique: true,
    trim: true,
  },
  section: {
    type: String,
    required: [true, "Section is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Class", classSchema);
