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
        ref: "Task"
    },
    secondTask: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    }
});

module.exports = model("Dependency", dependencySchema);