const mongoose = require("mongoose");

// Define the schema for the cart item

const addToCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryItems",
    unique: true
  } ],
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const AddToCartModel = mongoose.model("AddToCart", addToCartSchema);
module.exports = AddToCartModel;
