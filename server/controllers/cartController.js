
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const sessionId = req.sessionID;

    // 1) Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 2) Fetch or create the cart
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [], totalPrice: 0, totalQuantity: 0 });
    }

    // 3) Find if this product already exists in cart
    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex > -1) {
      // Product is already in the cart
      const currentQuantity = cart.items[itemIndex].quantity;

      // Compare cart's availableCount to currentQuantity
      if (cart.items[itemIndex].availableCount > currentQuantity) {
        // Increment item
        cart.items[itemIndex].quantity += 1;
        cart.totalQuantity += 1;

        // Add price safely as a number
        cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(cart.items[itemIndex].price);
        cart.totalPrice = parseFloat(cart.totalPrice.toFixed(2));

        // Decrement the availableCount in the cart
        cart.items[itemIndex].availableCount -= 1;
      } else {
        // No more stock available
        return res.status(400).json({ error: "No more stock available" });
      }

    } else {

      if (product.instock < 1) {
        return res.status(400).json({ error: "No more stock available" });
      }

      // Create a new cart item
      cart.items.push({
        productId: product._id,
        image: product.image[0],
        title: product.title,
        quantity: 1,
        unitPrice: product.price,
        price: product.price,
        availableCount: product.instock,
      });

      const newIndex = cart.items.length - 1;

      // Update cart totals
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(product.price);
      cart.totalPrice = parseFloat(cart.totalPrice.toFixed(2));
      cart.totalQuantity += 1;

      // Decrement the in-cart availableCount by 1 (since we used 1)
      cart.items[newIndex].availableCount -= 1;
    }

    // 5) Save the cart
    await cart.save();

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Failed to add product to cart" });
  }
};




// Get Cart for the current session
exports.getCart = async (req, res) => {
  try {
    const sessionId = req.session.id;
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }
    res
      .status(200)
      .json({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the cart" });
  }
};

exports.removeOneFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const sessionId = req.sessionID;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      // Decrease the quantity of the item
      if (cart.items[itemIndex].quantity > 1) {
        // Decrease quantity and update total
        cart.items[itemIndex].quantity -= 1;
        cart.items[itemIndex].availableCount += 1;
        cart.totalQuantity -= 1;
        cart.totalPrice -= parseFloat(cart.items[itemIndex].price);
        cart.totalPrice = cart.totalPrice.toFixed(2);
      } else {
        // If quantity is 1, remove the item from the cart
        cart.totalQuantity -= 1;
        cart.totalPrice -= cart.items[itemIndex].price;
        cart.items = cart.items.filter((item) => item.productId !== productId);
      }
    }
    // Save cart
    cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};
// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const sessionId = req.session.id;

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }


    cart.totalQuantity -= cart.items[itemIndex].quantity;
    cart.totalPrice -=
      cart.items[itemIndex].price * cart.items[itemIndex].quantity;
    cart.items = cart.items.filter((item) => item.productId !== productId);

    // Save updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

//clear cart
exports.clearCart = async (req,res) => {
  try {
    const sessionId = req.session.id;

    const result = await Cart.deleteOne({ sessionId });
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch(error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart." });
  }
}
