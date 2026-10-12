require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./Models/User");
const Product = require("./Models/Products");
const Order = require("./Models/Order");

async function seedData() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in the .env file");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const user = await User.create({
      name: "Test User",
      email: "test@test.com"
    });

    const product1 = await Product.create({
      name: "Laptop",
      price: 50000,
      createdBy: user._id
    });

    const product2 = await Product.create({
      name: "Phone",
      price: 20000,
      createdBy: user._id
    });

    await Order.create({
      user: user._id,
      products: [product1._id, product2._id],
      totalAmount: 70000
    });

    console.log("Database seeded!");
  } finally {
    await mongoose.disconnect();
  }
}

seedData().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
});