const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const Message = require("../models/messageModel");

router.post("/contact", async (req, res) => {
    try {
      const message = new Message(req.body);
      await message.save();
      res.status(201).send({ message: "Survey saved successfully!" });
    } catch (error) {
      res.status(500).send({ error: "Failed to save survey data." });
    }
  });
  
module.exports = router;