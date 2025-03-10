const paymentController = require("../controllers/paymentController");
const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", paymentController.createSession);
module.exports = router;