const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
const CategoryModel = require("../../models/category");
const { db, aggregate } = require("../../models/categoryItems");
const CategoryItemModel = require("../../models/categoryItems");
const User = require('../models/user');
var router = express.Router();


// POST /register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
});

module.exports = router;
var router = express.Router();
