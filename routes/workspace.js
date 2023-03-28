const router = require("express").Router();
const Workspace = require("../models/Workspace");

// @desc    Creates a workspace
// @route   POST /api/v1/workspace/create
// @access  Private
router.put("/create", async (req, res, next) => {
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
        res.status(400).json(error);
    }
});

// @desc    Get data of a workspace
// @route   GET /api/v1/workspace/:workspaceId
// @access  Private
router.get("/:workspaceId", async (req, res, next) => {
    const { workspaceId } = req.params;
    try {
        const workspaceFromDB = await Workspace.findById(workspaceId)
            .populate("founder").populate("members")
            .populate("admins").populate("projects");
        res.status(200).json(workspaceFromDB);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;