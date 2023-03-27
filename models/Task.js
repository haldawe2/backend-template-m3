const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project"
  },
  status: {
    type: String,
    enum: ["complete", "in progress", "to do", "pending"],
    default: "to do"
  },
  notes: {
    type: String
  },
  color: {
    type: String
  },
  tags: [{
    type: String
  }],
  plannedStartDate: {
    type: Date
  },
  startDate: {
    type: Date
  },
  plannedEndDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  dependencies: [{
    type: mongoose.Types.ObjectId,
    ref: "Dependency"
  }],
  workers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  links: [{
    type: String
  }]
},
  {
    timestamps: true
  });

module.exports = model("Task", taskSchema);