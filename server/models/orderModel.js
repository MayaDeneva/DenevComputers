const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
  productId: { type: Number, required: true, ref: "products" },
  image: {type: String, required: true, ref: "products"},
  title: {type: String, required: true, ref: "products"},
  quantity: { type: Number, required: true },
  unitPrice: {type: Number, required: true},
  price: { type: Number, required: true }, 
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false, 
  },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  deliveryType: { type: String, required: true },
  billingAddress: { type: String, required: false },
  city: { type: String, required: false},
  zip: { type: String, required: false },
  paymentType: { type: String, required: true },
  items: [cartItem], // Use the same cartItem schema for order items
  totalQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    default: "pending",  // sets the default status to "pending"
    enum: ["pending", "placed", "cancelled", "shipped", "completed"] 
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
