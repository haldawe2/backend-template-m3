const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// @desc    Edit user data
// @route   GET /api/v1/user/:userId
// @access  Private
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @desc    Edit user data
// @route   PUT /api/v1/user/edit/:userId
// @access  Private
router.put("/edit/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const {
    email,
    password1,
    password2,
    name,
    surname,
    profilePicture,
    company,
    availability,
  } = req.body;
  // Check if email or password or name are provided as empty string
  if (
    email === "" ||
    password1 === "" ||
    password2 === "" ||
    name === "" ||
    surname === ""
  ) {
    res
      .status(400)
      .json({ message: "Please fill all the required fields to register" });
    return;
  }
  // Check if both passwords are the same
  if (!(password1 === password2)) {
    res.status(400).json({ message: "Passwords are not the same" });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Not a valid email format" });
    return;
  }
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password1)) {
    res
      .status(400)
      .json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
      });
    return;
  }
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password1, salt);
    const newUser = await User.findByIdAndUpdate(
      userId,
      {
        email,
        hashedPassword,
        name,
        surname,
        profilePicture,
        company,
        availability,
      },
      {
        new: true,
      }
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// @desc    Delete user
// @route   DELETE /api/v1/user/delete/:userId
// @access  Private
router.delete("/delete/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "User deleted succesfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
