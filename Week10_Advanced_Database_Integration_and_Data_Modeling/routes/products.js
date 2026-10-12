const express = require("express");
const router = express.Router();
const Product = require("../Models/Products");

// Create product
router.post("/", async (req, res) => {
const product = await Product.create(req.body);
res.json(product);
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.error("Failed to get products:", err.message);
    return res.status(500).json({ error: "Failed to get products" });
  }
});

module.exports = router;