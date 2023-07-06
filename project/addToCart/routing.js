// Require necessary dependencies
const express = require("express");
const router = express.Router();
const AddToCartModel = require("../../models/addtocart");

let cart = [];

const users = [
  {  username: _id }
];

router.post("/cart/add", (req, res) => {
  const { product, quantity, price } = req.body;

  // Check if the user exists
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Retrieve the item details based on the itemId
  const item = AddToCartModel(itemId);

  
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Add product to cart.
  const cartItem = {
    product,
    quantity,
    price,
  };
  cart.push(cartItem);

  res.json({ message: "Item added to cart successfully", cart: cartItem });

});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = router;