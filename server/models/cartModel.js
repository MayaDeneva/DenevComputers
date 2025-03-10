const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
  productId: { type: Number, required: true, ref: "products" },
  image: {type: String, required: false, ref: "products"},
  title: {type: String, required: true, ref: "products"},
  quantity: { type: Number, required: true },
  unitPrice: {type: Number, required: true},
  price: { type: Number, required: true }, 
  availableCount: { type: Number, required: true }
});

const cart = new mongoose.Schema({
  sessionId: { type: String, required: true }, // Link cart to a session
  items: [cartItem], // Array of cart items
  totalQuantity: { type: Number, default: 0 }, // Total quantity of all items in the cart
  totalPrice: { type: Number, default: 0 }, // Total price of all items in the cart
});



const Cart = mongoose.model("Cart", cart);

module.exports = Cart;
