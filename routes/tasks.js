const { isDate } = require('date-fns');

const router = require("express").Router();
const Task = require("../models/Task");

// @desc    Creates a task in the DB
// @route   POST /tasks/create
// @access  User
router.get("/create", async (req, res, next) => {
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
    links,
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
    res.status(201).json({ message: 'task created' });
  } catch (error) {
    res.status(400).json({ message: 'Could not process your request' })
  }
});

module.exports = router;
