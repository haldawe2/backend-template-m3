const router = require("express").Router();
const User = require("../models/User");

// @desc    Edit user data
// @route   GET /api/v1/user/edit/:userId
// @access  Private
router.get("/edit/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        delete user.hashedPassword;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc    Edit user data
// @route   PUT /api/v1/user/edit/:userId
// @access  Private
// router.put("/edit/:userId", async (req, res, next) => {
//     const { userId } = req.params;
//     try {
//         const user = await User.findById(userId);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// @desc    Delete user
// @route   DELETE /api/v1/user/edit/:userId
// @access  Private
// router.get("/delete/:userId", async (req, res, next) => {
//     const { userId } = req.params;
//     try {
//         const user = await User.findById(userId);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

module.exports = router