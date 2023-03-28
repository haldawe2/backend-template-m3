const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, "Project name required"]
    },
    workspace: {
        type: mongoose.Types.ObjectId,
        ref: "Workspace",
        required: [true, "Workspace required"]
    },
    founder: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "founder required"]
    },
    info: {
        type: String
    },
    acronym: {
        type: String
    },
    profilePicture: {
        type: String
    },
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
    }]
});

module.exports = model("Project", projectSchema);