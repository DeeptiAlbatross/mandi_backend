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
      res.send(deletedItems);AddToCartModel
    });
  } catch (err) {
    console.log("Cannot delete item", err);
    res.send(err);
  }
});

// Api to update the price and the  quantity of the items.
router.post('/update', async (req, res) => {
  const { quantity, price, user } = req.body;
  let OB = {}
  if(quantity) OB.quantity = quantity
  if(price) OB.price = price

  try {
    // Find the user's cart and update the item quantity
    const updatedCart = await AddToCartModel.findOneAndUpdate({ user },OB);

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart or item not found' });
    }

    res.json({ message: 'Item quantity updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('An error occurred while updating item quantity:', error);
    res.status(500).json({ message: 'Failed to update item quantity' });
  }
});

// Api to delete the cart when the cart is empty.
router.delete('/delete/:userId', async (req, res) => {
  const { user } = req.body;

  try {
    // Check if the cart is fully empty
    const cart = await AddToCartModel.findOne({ user });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.cartItems.length === 0) {
      // Delete the cart if it is fully empty
      await cart.findOneAndDelete({ user: user});

      return res.json({ message: 'Cart deleted successfully' });
    }

    res.json({ message: 'Cart is not empty' });
  } catch (error) {
    console.error('An error occurred while deleting the cart:', error);
    res.status(500).json({ message: 'Failed to delete the cart' });
  }
});

// Api to find the no of items in the cart
router.get('/items/count/:userId', async (req, res) => {
  const { user } = req.body;


  
  try {
    // Find the user's cart
    const cart = await AddToCartModel.findOne({ user});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    // Get the number of items in the cart
    const itemCount = cart.cartItems.length;

    res.json({ itemCount });
    console.log("The no of items in the cart is :",itemCount);

  } catch (error) {
    console.error('An error occurred while retrieving the item count:', error);
    res.status(500).json({ message: 'Failed to retrieve the item count' });
  }
});



// Remove an item from the cart
router.delete('/remover-cart', async (req, res) => {
  const { user, id } = req.body;

    // Check if the cart is empty after removing the item
    if (cart.cartItems.length === 1) {
      // Delete the entire cart
      await AddToCartModel.findByIdAndDelete(user);
      res.json({ message: 'Cart deleted' });
    } else {
      res.json(cart);
    }

    try {
      // Remove the item from the cart
      const cart = await AddToCartModel.findByIdAndUpdate(
        user,
        { $pull: { cartItems: id } },
      );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
