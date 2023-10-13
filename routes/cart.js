const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
var fetchuser = require('../middleware/fetchuser');

// ROUTE:1 
// Route to add multiple items to the cart
router.post('/addcart',fetchuser , async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Create an array to store saved cart items
    const savedCartItems = [];

    // Loop through the array of cart items and save them to MongoDB
    for (const cartItem of cartItems) {
      const { productId,title, price, imageLink, quantity } = cartItem;
      const newCartItem = new CartItem({ productId,title, price, imageLink, quantity, user: req.user.id });
      await newCartItem.save();
      savedCartItems.push(newCartItem);
    }

    // Respond with a success message or the saved cart items
    res.json({ message: 'Items added to cart', cartItems: savedCartItems });
  } catch (error) {
    console.error('Error adding items to cart:', error);
    res.status(500).json({ error: 'An error occurred while adding the items to the cart' });
  }
});



// ROUTE:2 - Fetch all product IDs
router.get('/fetchallproducts', fetchuser, async (req, res) => {
  try {
    // Fetch all product IDs from the Cart model
    const orderProduct = await CartItem.find({ user: req.user.id });

    res.json(orderProduct );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});


// ROUTE:3 - Delete an item from the cart
router.delete('/delete/:itemId', fetchuser, async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the item by ID and ensure it belongs to the authenticated user
    const cartItem = await CartItem.findOne({ _id: itemId, user: req.user.id });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in the cart' });
    }

    // Delete the item
    await cartItem.remove();

    res.json({ message: 'Item removed from the cart' });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ error: 'An error occurred while deleting the item from the cart' });
  }
});



module.exports = router;











