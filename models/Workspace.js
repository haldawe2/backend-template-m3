const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Workspace name required"]
  },
  founder: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Founder required"]
  },
  acronym: {
    type: String
  },
  profilePicture: {
    type: String
  },
  members: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  admins: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  info: {
    type: String
  },
  projects: [{
    type: mongoose.Types.ObjectId,
    ref: "Project"
  }]
},
  {
    timestamps: true
  });

module.exports = model("Workspace", workspaceSchema);