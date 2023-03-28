const router = require('express').Router();
const Project = require("../models/Project");
const { isDate } = require('date-fns');

// @desc    Create new project
// @route   POST /api/v1/project/create
// @access  Private
router.post('/create', async (req, res, next) => {;
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
        workers
    } = req.body;
    if (name === "" || !isDate(new Date(startDate)) || !isDate(new Date(endDate))) {
        res.status(400).json({ message: 'Please fill all the required fields' })
    };
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
        workers
    };
    try {
        await Project.create(newProject);
        res.status(201).json({ message: 'Project created succesfully' })
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;