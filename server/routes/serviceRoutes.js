const serviceController = require("../controllers/serviceController");
const express = require("express");
const router = express.Router();

router.get('/', serviceController.getServiceByCategory);
module.exports = router;