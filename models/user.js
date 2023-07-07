var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone: String,
  
});

const User = mongoose.model("User", userSchema);
module.exports = User;
