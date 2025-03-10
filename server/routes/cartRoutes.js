const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.post("/remove", cartController.removeOneFromCart);
router.post('/remove-item', cartController.removeItemFromCart);
router.delete('/clear-cart', cartController.clearCart);

  // Example route to test session
router.get("/test-session", (req, res) => {
    if (req.session) {
      res.json({ sessionId: req.sessionID, sessionData: req.session });
    } else {
      res.status(404).send("No session found");
    }
  });

  
module.exports = router;