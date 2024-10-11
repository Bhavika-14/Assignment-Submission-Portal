const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  });
  
  // Compare password method
  userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.Password);
  };
  
  module.exports = mongoose.model('User', userSchema);
