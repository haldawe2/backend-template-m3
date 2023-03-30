const router = require('express').Router();
const Dependency = require('../models/Dependency');

// @desc    Create a dependency between two tasks
// @route   POST /api/v1/dependency/create
// @access  Private
router.post("/create", async (req, res, next) => {;
  const { type, firstTask, secondTask } = req.body;
  try {
    const dependency = {type, firstTask, secondTask};
    const newDependency = await Dependency.create(dependency);
    res.status(200).json(newDependency);
  } catch (error) {
    res.status(400).json(error)
  }
});

// @desc    Get dependency info
// @route   GET /api/v1/dependency/:dependencyId
// @access  Private
router.get("/:dependencyId", async (req, res, next) => {
    const { dependencyId } = req.params;
    try {
        const dependencyFromDB = await Dependency.findById(dependencyId);
        res.status(200).json(dependencyFromDB);
    } catch (error) {
        res.status(400).json(error);
    };
});

// @desc    Edit dependency
// @route   PUT /api/v1/dependency/:dependencyId
// @access  Private
router.put("/:dependencyId", async (req, res, next) => {
    const { dependencyId } = req.params;
    const { type, firstTask, secondTask } = req.body;
    try {
      const dependency = {type, firstTask, secondTask};
      const newDependency = await Dependency.findByIdAndUpdate(dependencyId, dependency, {new: true});
      res.status(201).json(newDependency);
    } catch (error) {
      res.status(400).json(error)
    }
});

// @desc    Delete dependency
// @route   DELETE /api/v1/dependency/:dependencyId
// @access  Private
router.delete("/:dependencyId", async (req, res, next) => {
    const { dependencyId } = req.params;
    try {
      await Dependency.findByIdAndDelete(dependencyId);
      res.status(204).json({ message: 'Dependency deleted succesfully'});
    } catch (error) {
      res.status(400).json(error)
    }
});

module.exports = router;