const router = require("express").Router();
const Dependency = require("../models/Dependency");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Workspace = require("../models/Workspace");
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Creates a workspace
// @route   POST /api/v1/workspace/create
// @access  Private
router.post("/create", isAuthenticated, async (req, res, next) => {
    const {
        name,
        founder,
        acronym,
        profilepicture,
        members,
        admins,
        info,
        projects
    } = req.body;
    if (name === "") {
        res.status(400).json({ message: 'Need to name the workspace' })
    };
    const newWorkspace = {
        name,
        founder,
        acronym,
        profilepicture,
        members,
        admins,
        info,
        projects
    };
    try {
        const createdWorkspace = await Workspace.create(newWorkspace);
        res.status(201).json(createdWorkspace);
    } catch (error) {
        next(error);
    }
});

// @desc    Edit info of a workspace
// @route   PUT /api/v1/workspace/edit/:workspaceId
// @access  Private
router.put("/edit/:workspaceId", isAuthenticated, async (req, res, next) => {
    const { workspaceId } = req.params;
    const {
        name,
        founder,
        acronym,
        profilepicture,
        members,
        admins,
        info,
        projects
    } = req.body;
    if (name === "") {
        res.status(400).json({ message: 'Need to name the workspace' })
    };
    const newWorkspace = {
        name,
        founder,
        acronym,
        profilepicture,
        members,
        admins,
        info,
        projects
    };
    try {
        const createdWorkspace = await Workspace.findByIdAndUpdate( workspaceId, newWorkspace, {new: true});
        res.status(201).json(createdWorkspace);
    } catch (error) {
        next(error);
    }
});

// @desc    Delete a workspace
// @route   DELETE /api/v1/workspace/delete/:workspaceId
// @access  Private
router.delete("/delete/:workspaceId", isAuthenticated, async (req, res, next) => {
    const { workspaceId } = req.params;
    try {
        const projectsToDelete = await Project.find({ workspace: workspaceId }).select({ _id: 1});
        await Dependency.deleteMany({ project: { $in: projectsToDelete}});
        await Task.deleteMany({ project: { $in: projectsToDelete}});
        await Project.deleteMany({ workspace: workspaceId })
        await Workspace.findByIdAndDelete(workspaceId);
        res.status(204).json({ message: 'Content deleted succesfully' });
    } catch (error) {
        next(error);
    }
});


// @desc    Get data of a workspace
// @route   GET /api/v1/workspace/:workspaceId
// @access  Private
router.get("/:workspaceId", isAuthenticated, async (req, res, next) => {
    const { workspaceId } = req.params;
    try {
        const workspaceFromDB = await Workspace.findById(workspaceId)
            .populate("founder").populate("members")
            .populate("admins").populate("projects");
        res.status(200).json(workspaceFromDB);
    } catch (error) {
        next(error);
    }
});


module.exports = router;