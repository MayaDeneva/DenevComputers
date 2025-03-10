// productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  image: [{ type: String, required: false }],
  category: { type: String, required: true },
  price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  instock: { type: Number, required: false },
  features: { type: String, required: false },
  part_number: { type: Number, required: false },
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  order_count: { type: Number, default: 0 },

});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
