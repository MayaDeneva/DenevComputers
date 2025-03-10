const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController')

router.post("/", orderController.saveOrder);
router.post("/product-order-count", orderController.updateOrderCount);
router.delete("/:orderId", orderController.deleteOrder);
router.post("/:orderId/updateStatus", orderController.setOrderStatus);
router.get("/my-orders", orderController.getUserOrders);

module.exports = router;