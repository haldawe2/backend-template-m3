const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dependencySchema = new Schema({
    type: {
        type: String,
        enum: ["finishStart", "startStart", "finishFinish", "startFinish"],
        default: "finishStart"
    },
    firstTask: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        required: [true, "First task required"]
    },
    secondTask: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
        required: [true, "Second task required"]
    }
});

module.exports = model("Dependency", dependencySchema);