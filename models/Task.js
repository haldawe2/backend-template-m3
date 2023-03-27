const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Task name required"]
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: [true, "Project required"]
  },
  status: {
    type: String,
    enum: ["complete", "in progress", "pending", "cancelled", "failed", "assigned", "rejected"],
    default: "pending"
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
  startDate: {
    type: Date,
    required: [true, "Start date required"]
  },  
  plannedStartDate: {
    type: Date,
    required: [true, "Planned start date required"]
  },
  endDate: {
    type: Date,
    required: [true, "End date required"]
  },
  plannedEndDate: {
    type: Date,
    required: [true, "Planned end date required"]
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