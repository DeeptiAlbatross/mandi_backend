var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },
  password:String,
  phone:String,
  city:String,
  state:String,
  country:String,
  image:String
});



const User=mongoose.model("User",userSchema);
export default User;
