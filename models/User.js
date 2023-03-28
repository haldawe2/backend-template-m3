const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  hashedPassword: {
    type: String,
    required: [true, "Hashed password is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"]
  },
  profilePicture: {
    type: String
  },
  company: {
    type: String
  },
  availability: {
    type: Number
  }
},
  {
    timestamps: true
  });

module.exports = model("User", userSchema);