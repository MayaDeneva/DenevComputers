// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // for demonstration
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next(); // only hash if password is new/changed
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
