const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController")
// Get all categories
router.get('/', categoryController.getCategories);
router.get('/services', categoryController.getServiceCategories);

module.exports = router;