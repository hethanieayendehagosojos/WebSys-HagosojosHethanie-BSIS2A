const express = require("express");
const Order = require("../Models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to get orders:", err.message);
    return res.status(500).json({ error: "Failed to get orders" });
  }
});

module.exports = router;
