// routes/auth.js
const express = require('express');
const passport = require('passport');
const User = require('../models/UserModel');

const router = express.Router();

// Registration route
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // 1) Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // 2) Create user
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login route using passport local strategy
exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info.message || 'Login failed' });
    }
    // Log the user in (establish session)
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};

// Logout route
exports.logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    return res.json({ message: 'Logged out successfully' });
  });
};

// Protected route example
exports.getProfile = async  (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  // req.user is loaded from session
  return res.json({ message: 'This is a protected profile route', user: req.user });
};

