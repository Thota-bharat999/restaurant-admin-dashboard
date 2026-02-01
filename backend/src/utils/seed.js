import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItemModel.js";
import Order from "../models/OrderModel.js";

dotenv.config();

const menuItems = [
  {
    name: "Margherita Pizza",
    category: "Main Course",
    price: 299,
    ingredients: ["Cheese", "Tomato"],
    preparationTime: 15,
  },
  {
    name: "Veg Burger",
    category: "Main Course",
    price: 199,
    ingredients: ["Bun", "Veg Patty"],
  },
  {
    name: "French Fries",
    category: "Appetizer",
    price: 149,
    ingredients: ["Potato", "Salt"],
  },
  {
    name: "Paneer Tikka",
    category: "Appetizer",
    price: 249,
    ingredients: ["Paneer", "Spices"],
  },
  {
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 179,
    ingredients: ["Chocolate"],
  },
  {
    name: "Vanilla Ice Cream",
    category: "Dessert",
    price: 129,
    ingredients: ["Milk", "Vanilla"],
  },
  {
    name: "Cold Coffee",
    category: "Beverage",
    price: 149,
    ingredients: ["Coffee", "Milk"],
  },
  {
    name: "Lemon Juice",
    category: "Beverage",
    price: 99,
    ingredients: ["Lemon", "Water"],
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await MenuItem.deleteMany();
    await Order.deleteMany();

    const createdMenuItems = await MenuItem.insertMany(menuItems);

    const orders = [
  {
    orderNumber: `ORD-${Date.now()}-1`,
    items: [
      {
        menuItem: createdMenuItems[0]._id,
        quantity: 2,
        price: createdMenuItems[0].price,
      },
      {
        menuItem: createdMenuItems[2]._id,
        quantity: 1,
        price: createdMenuItems[2].price,
      },
    ],
    totalAmount: 747,
    customerName: "Amit",
    tableNumber: 3,
    status: "Delivered",
  },
  {
    orderNumber: `ORD-${Date.now()}-2`,
    items: [
      {
        menuItem: createdMenuItems[1]._id,
        quantity: 1,
        price: createdMenuItems[1].price,
      },
    ],
    totalAmount: 199,
    customerName: "Sneha",
    tableNumber: 1,
    status: "Pending",
  },
];


    await Order.insertMany(orders);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedData();
