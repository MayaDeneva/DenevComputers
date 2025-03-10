const express = require("express");
const router = express.Router();


const productRoutes = require("./productRoutes");
const commonRoutes = require("./commonRoutes")
const categoryRoutes = require('./categoryRoutes');
const cartRoutes = require('./cartRoutes');
const paymentRoutes = require('./paymentRoutes');
const orderRoutes = require('./orderRoutes');
const serviceRoutes = require('./serviceRoutes');
const authRoutes = require('./authRoutes');


router.use("/products", productRoutes);
router.use("/", commonRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes)
router.use("/", paymentRoutes);
router.use("/orders", orderRoutes);
router.use("/services", serviceRoutes);
router.use("/auth", authRoutes);


module.exports = router;
