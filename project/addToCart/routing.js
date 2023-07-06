// Require necessary dependencies
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const AddToCartModel = require("../../models/addtocart");
var ObjectID = mongoose.Types.ObjectId;

//Api to add-to-cart items
router.post("/add", async (req, res) => {
  const { user, cartItems } = req.body;

  // check if user exits or not
  const isUserExist = await AddToCartModel.findOne({ user });

  // if exists then add the data
  if (isUserExist) {
    //   use $addToSet ,to prevent adding of duplicate items.and use findoneandupdate means that the useer already exists and we are adding item to its existing item cart
    const data = await AddToCartModel.findOneAndUpdate(
      { user },
      { $addToSet: { cartItems: cartItems } }
    );
    res.send({ success: true, data });
  } else {
    //if user doesn't exists then create the cart for new user.

    const AddNewItems = new AddToCartModel({
      ...req.body,
    });
    await AddNewItems.save();
    res.send({ success: true });
  }
});

// api to get the list of the product items.
router.get("/list", async (req, res) => {
  AddToCartModel.find()
    .populate("user cartItems")
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
});

//   api to delete the items from the cart

router.delete("/delete", async (req, res) => {
  try {
    const { user, id } = req.body;
    // console.log("ID", id);
    AddToCartModel.updateOne(
      { user: user },
      { $pull: { cartItems: id } }
    ).then((deletedItems) => {
      console.log("Deleted Items", id);
      res.send(deletedItems);
    });
  } catch (err) {
    console.log("Cannot delete item", err);
    res.send(err);
  }
});


// Endpoint for updating the quantity of an item in the cart
router.post('/update', async (req, res) => {
  const { quantity, price, user } = req.body;
  let OB = {}
  if(quantity) OB.quantity = quantity
  if(price) OB.price = price

  try {
    // Find the user's cart and update the item quantity
    const updatedCart = await AddToCartModel.findOneAndUpdate(
      { user },
      OB
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart or item not found' });
    }

    res.json({ message: 'Item quantity updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('An error occurred while updating item quantity:', error);
    res.status(500).json({ message: 'Failed to update item quantity' });
  }
});

module.exports = router;
