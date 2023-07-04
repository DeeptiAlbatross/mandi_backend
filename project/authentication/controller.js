const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const UserModel = require("../../models/user");
const ItemModel = require("../../models/categoryItems");
var router = express.Router();

// Api to post the user data.
router.post("/user/add", function (req, res, next) {
  const { firstname, email, password, phone, city, state, country, image ,category} = req.body;

  const NewUser = new UserModel({
    firstname,
    email,
    password,
    phone,
    city,
    state,
    country,
    image,
    category
  });

  NewUser.save()
    .then((SavedUser) => {
      console.log(" User Category saved:", SavedUser);
      res.send(SavedUser);
    })
    .catch((error) => {
      res.send(error);
    });
});



// Ab konsi api bnani hai bhai ?

module.exports = router;
