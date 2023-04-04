const { isDate } = require('date-fns');
const router = require("express").Router();
const Task = require("../models/Task");
const Dependency = require('../models/Dependency');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Sets dates as Date objects and creates a task
// @route   POST /api/v1/tasks/create
// @access  User
router.post("/create", isAuthenticated, async (req, res, next) => {
  const {
    name,
    project,
    status,
    notes,
    color,
    tags,
    startDate,
    endDate,
    dependencies,
    workers,
    links
  } = req.body;
  if ( name === "" || !isDate(new Date(startDate)) || !isDate(new Date(endDate))) {
    res.status(400).json({ message: 'Please fill all the required fields' })
  };
  try {
    // Need to transform dates into Date object for validation in database
    const newTask = {
      name, 
      project, 
      status, 
      notes, 
      color, 
      tags, 
      startDate: new Date(startDate),
      plannedStartDate: new Date(startDate), 
      endDate: new Date(endDate), 
      plannedEndDate: new Date(endDate),
      dependencies, 
      workers, 
      links
    }
    const taskFromDB = await Task.create(newTask);
    res.status(201).json(taskFromDB);
  } catch (error) {
    next(error);
  }
});


// @desc    Edits a task
// @route   PUT /api/v1/tasks/edit/:taskId
// @access  User
router.put("/edit/:taskId", isAuthenticated, async (req, res, next) => {
  const { taskId } = req.params;
  const {
    name,
    project,
    status,
    notes,
    color,
    tags,
    startDate,
    plannedStartDate,
    endDate,
    plannedEndDate,
    dependencies,
    workers,
    links
  } = req.body;
  try {
    // Need to transform dates into Date object for validation in database
    const newTask = {
      name, 
      project, 
      status, 
      notes, 
      color, 
      tags, 
      startDate: new Date(startDate),
      plannedStartDate: new Date(plannedStartDate), 
      endDate: new Date(endDate), 
      plannedEndDate: new Date(plannedEndDate),
      dependencies, 
      workers, 
      links
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, newTask, {new: true});
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

// @desc    Returns a task by Id
// @route   DELETE /api/v1/tasks/delete/:taskId
// @access  User
router.delete("/delete/:taskId", isAuthenticated, async (req, res, next) => {
  const { taskId } = req.params;
  try {
    await Dependency.deleteMany({ $or: [{firstTask: taskId}, {secondTask: taskId}] })
    await Task.findByIdAndDelete(taskId);
    res.status(204).json({ message: 'Task deleted succesfully' });
  } catch (error) {
    next(error);
  }
});

// @desc    Gets tasks from a project
// @route   GET /api/v1/tasks/project/:projectId
// @access  User
router.get("/project/:projectId", isAuthenticated, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const tasksFromDB = await Task.find({project: projectId});
    res.status(200).json(tasksFromDB);
  } catch (error) {
    next(error);
  }
});

// @desc    Gets task info
// @route   GET /api/v1/tasks/:taskId
// @access  User
router.get("/:taskId", isAuthenticated, async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const taskFromDB = await Task.findById(taskId);
    res.status(200).json(taskFromDB);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
