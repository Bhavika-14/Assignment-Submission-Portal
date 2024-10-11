const { body } = require("express-validator");

exports.registerValidator = [
  body("Name").notEmpty().withMessage("Name is required"),
  body("Role")
    .notEmpty()
    .withMessage("Name is required")
    .isIn(["Admin", "User"])
    .withMessage("Role must be either Admin or User"),
  body("Email").isEmail().withMessage("Please enter a valid email"),
  body("Password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]

exports.loginValidator = [
  body("Email").isEmail().withMessage("Please enter a valid email"),
  body("Password").notEmpty().withMessage("Password is required"),

]
exports.uploadAssignmentValidator =[
  body("Task").notEmpty().withMessage("Task is required"),
  body("AdminId").notEmpty().withMessage("Admin ID is required")
]