const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    // required: true
  },
  status: {
    type: String,
    enum: ["complete", "in progress", "pending", "cancelled", "failed", "assigned", "rejected"],
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
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  plannedEndDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
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