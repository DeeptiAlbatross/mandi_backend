const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
var router = express.Router();
const AuthenticateModel = require("../../models/user");
const { db, aggregate } = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Api to save the user data.
router.post("/user/save", function (req, res, next) {
  const { username, email, password, phone } = req.body;

  const NewUser = new AuthenticateModel({
    username,
    email,
    password,
    phone,
  });

  NewUser.save()
    .then((savedUser) => {
      console.log("User details saved:", savedUser);
      res.send(savedUser);
    })
    .catch((error) => {
      res.send(error);
      console.log("Error occured");
    });
});

//Api to Signup/Register.
router.post("/signup", async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await AuthenticateModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    } else {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            // user.password = hash
            const NewUser = new AuthenticateModel({
              username,
              email,
              password: hash,
              phone,
            });
      
            NewUser.save().then((savedUser) => {
              console.log("Signup successfully:", savedUser);
              res.send(savedUser);
            });
          })
        }
      })
      
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await AuthenticateModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'Secret-Key', { expiresIn: '24h' });
    
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
