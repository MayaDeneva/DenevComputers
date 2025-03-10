const Cart = require("../models/cartModel"); // Import the Cart model
const Order = require("../models/orderModel"); // Import the Order model
const Product = require("../models/productModel");
const nodemailer = require("nodemailer");

exports.saveOrder = async (req, res) => {
  try {
    const sessionId = req.session.id;

    const {
      phone,
      email,
      items,
      totalQuantity,
      totalPrice,
      "full-name": fullName, // Map frontend keys to expected schema field names
      "delivery-type": deliveryType,
      "payment-type": paymentType,
      billingAddress,
      city,
      state,
      zip,
    } = req.body;

    console.log(req.body);

    // Retrieve userId from authenticated session or set to null
    const userId = req.user ? req.user.id : null;

    // Create a new order using the cart details
    const order = new Order({
      userId, // Include userId
      fullName,
      phone,
      email,
      deliveryType,
      billingAddress,
      city,
      state,
      zip,
      paymentType,
      items,
      totalQuantity,
      totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Send email notification
    await sendEmail({
      to: email,
      subject: "Вашата поръчка от Денев Компютърс е получена.",
      text: `Благодарности за поръчката, ${
        fullName.split(" ")[0]
      }! Вашата поръчка  #${order._id} е получена и в момента се обработва.`,
    });

    res
      .status(201)
      .json({ message: "Order saved successfully", orderId: order._id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};


//   // Email sending function
const sendEmail = async ({ to, subject, text }) => {
  try {
 
    const transporter = nodemailer.createTransport({
      host: "smtp.abv.bg",
      port: 465,  // 587 for secure connections
      secure: true, // Use true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Send the email
    await transporter.sendMail({
      from: '"Denev Computers" <denevcomputers@abv.bg>', // Sender address
      to, // Receiver address
      subject, // Subject line
      text, // Plain text body
    });

    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

exports.updateOrderCount = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Received productId:", productId, "Quantity:", quantity);
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Product ID and quantity are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: {
          order_count: quantity,
          instock: -quantity,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      console.error(`Product with ID ${productId} not found`);
      return res.status(404).json({ error: "Product not found" });
    }

    console.log(`Order count for product ${productId} updated successfully`);
    return res
      .status(200)
      .json({ message: "Order count updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating order count:", error);
    res.status(500).json({ error: "Failed to update order count" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete order" });
  }
};

exports.setOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res
      .status(200)
      .json({ message: "Order updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Failed to update order" });
  }
};



exports.getUserOrders = async (req, res) => {
  try {
    // Retrieve the authenticated user's ID from the request
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in." });
    }

    // Fetch orders associated with the user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders retrieved successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders." });
  }
};
