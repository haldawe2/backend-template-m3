const router = require("express").Router();
const Project = require("../models/Project");
const { isDate } = require("date-fns");
const Dependency = require("../models/Dependency");
const Task = require("../models/Task");
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Create new project
// @route   POST /api/v1/project/create
// @access  Private
router.post("/create", isAuthenticated, async (req, res, next) => {
  const {
    name,
    workspace,
    founder,
    info,
    acronym,
    profilePicture,
    startDate,
    endDate,
    dependencies,
    workers,
  } = req.body;
  if (
    name === "" ||
    !isDate(new Date(startDate)) ||
    !isDate(new Date(endDate))
  ) {
    res.status(400).json({ message: "Please fill all the required fields" });
  }
  const newProject = {
    name,
    workspace,
    founder,
    info,
    acronym,
    profilePicture,
    startDate: new Date(startDate),
    plannedStartDate: new Date(startDate),
    endDate: new Date(endDate),
    plannedEndDate: new Date(endDate),
    dependencies,
    workers,
  };
  try {
    const projectFromDB = await Project.create(newProject);
    res.status(201).json(projectFromDB);
  } catch (error) {
    next(error);
  }
});

// @desc    Get projects related to a workspace
// @route   GET /api/v1/project/workspace/:workspaceId
// @access  Private
router.get("/workspace/:workspaceId", isAuthenticated, async (req, res, next) => {
  const { workspaceId } = req.params;
  try {
    const projectFromDB = await Project.find({ workspace: workspaceId });
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
});

// @desc    Update project info
// @route   PUT /api/v1/project/edit/:projectId
// @access  Private
router.put("/edit/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;
  const {
    name,
    workspace,
    founder,
    info,
    acronym,
    profilePicture,
    startDate,
    plannedStartDate,
    endDate,
    plannedEndDate,
    dependencies,
    workers,
  } = req.body;
  if (
    name === "" ||
    !isDate(new Date(startDate)) ||
    !isDate(new Date(endDate)) ||
    !isDate(new Date(plannedStartDate)) ||
    !isDate(new Date(plannedEndDate))
  ) {
    res.status(400).json({ message: "Please fill all the required fields" });
    return;
  }
  const newProject = {
    name,
    workspace,
    founder,
    info,
    acronym,
    profilePicture,
    startDate: new Date(startDate),
    plannedStartDate: new Date(plannedStartDate),
    endDate: new Date(endDate),
    plannedEndDate: new Date(plannedEndDate),
    dependencies,
    workers,
  };
  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, newProject, {new: true});
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a project by ID
// @route   DELETE /api/v1/project/delete/:projectId
// @access  Private
router.delete("/delete/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    await Dependency.deleteMany({ project: projectId });
    await Task.deleteMany({ project: projectId });
    await Project.findByIdAndDelete(projectId);
    res.status(204).json({ message: 'Project deleted succesfully' })
  } catch (error) {
    next(error);
  }
});

// @desc    Get project info
// @route   GET /api/v1/project/:projectId
// @access  Private
router.get("/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const projectFromDB = await Project.findById(projectId)
      .populate("workspace")
      .populate("founder")
      .populate("workers")
      .populate("dependencies");
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
