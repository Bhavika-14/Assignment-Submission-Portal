const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');


// Register a new user (admin or user)
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { Name, Email, Password, Role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with role (admin or user)
    const user = new User({
      Name,
      Email,
      Password,
      Role: Role || 'User',
    });

    // Save user to database
    await user.save();

    res.status(201).json({ message: `${Role || 'User'} registered successfully.` });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login user or admin and generate JWT token
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const { Email, Password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ Email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if password is correct
      const isMatch = await user.comparePassword(Password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token including the user's role
      const token = jwt.sign(
        { UserId: user._id, Role: user.Role },  // Payload includes user ID and role (admin/user)
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // Token expiration time
      );
  
      // Send the token in the response
      res.json({ token, Role: user.Role });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  // Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
      const admins = await User.find({ Role: 'Admin' }).select('Name Email');
      res.json(admins);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };