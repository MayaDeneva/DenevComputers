const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Product routes
router.get("/top", productController.getTopProducts);
router.get("/", productController.getAllProducts);
router.get("/category", productController.getAllCategories);
router.get("/by-category", productController.getProductsByCategory);
router.get("/by-category/prices", productController.getPriceRangeByCategory);
router.get("/by-category/product/:id", productController.getProductById)
router.get("/by-category/attributes", productController.getProductAttributes);
router.get("/search", productController.searchProducts);


module.exports = router;
