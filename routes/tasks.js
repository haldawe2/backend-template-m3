const { isDate } = require('date-fns');

const router = require("express").Router();
const Task = require("../models/Task");

// @desc    Sets dates as Date objects and creates a task
// @route   POST /tasks/create
// @access  User
router.post("/create", async (req, res, next) => {
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
    await Task.create(newTask);
    res.status(201).json({ message: 'Task created' });
  } catch (error) {
    res.status(400).json(error)
  }
});

// @desc    Deletes a task by Id
// @route   DELETE /tasks/delete/:taskId
// @access  User
router.delete("/delete/:taskId", async (req, res, next) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).json({ message: 'Content deleted succesfully'});
  } catch (error) {
    res.status(400).json(error)
  }
});

// @desc    Edits a task
// @route   PUT /tasks/edit/:taskId
// @access  User
router.put("/edit/:taskId", async (req, res, next) => {
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
    res.status(400).json(error)
  }
});

// @desc    Returns a task by Id
// @route   DELETE /tasks/:taskId
// @access  User
router.get("/:taskId", async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const taskFromDB = await Task.findById(taskId);
    res.status(200).json(taskFromDB);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
