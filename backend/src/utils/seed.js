import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItemModel.js";
import Order from "../models/OrderModel.js";

dotenv.config();

/* ---------------- ORDER NUMBER GENERATOR ---------------- */
const generateOrderNumber = () => {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
};

/* ---------------- MENU DATA ---------------- */
const menuItemsData = [
  {
    name: "Margherita Pizza",
    category: "Main Course",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Veg Burger",
    category: "Main Course",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "French Fries",
    category: "Appetizer",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Paneer Tikka",
    category: "Appetizer",
    price: 249,
    imageUrl:
      "https://images.unsplash.com/photo-1604908177522-4293c7f5c2c6?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 179,
    imageUrl:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Vanilla Ice Cream",
    category: "Dessert",
    price: 129,
    imageUrl:
      "https://images.unsplash.com/photo-1505253716362-afaea1b47f13?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Cold Coffee",
    category: "Beverage",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=60"
  },
  {
    name: "Lemon Juice",
    category: "Beverage",
    price: 99,
    imageUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=60"
  }
];



/* ---------------- SEED FUNCTION ---------------- */
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    console.log("🧹 Clearing existing data...");
    await MenuItem.deleteMany();
    await Order.deleteMany();

    console.log("🍽️ Seeding menu items...");
    const menuItems = await MenuItem.insertMany(menuItemsData);

    console.log("📦 Seeding orders...");
    const ordersData = [
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[0]._id, quantity: 2, price: 299 },
          { menuItem: menuItems[2]._id, quantity: 1, price: 149 }
        ],
        totalAmount: 747,
        customerName: "Amit",
        tableNumber: 1,
        status: "Delivered"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[1]._id, quantity: 1, price: 199 }
        ],
        totalAmount: 199,
        customerName: "Sneha",
        tableNumber: 2,
        status: "Pending"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[3]._id, quantity: 2, price: 249 }
        ],
        totalAmount: 498,
        customerName: "Rahul",
        tableNumber: 3,
        status: "Preparing"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[4]._id, quantity: 2, price: 179 }
        ],
        totalAmount: 358,
        customerName: "Neha",
        tableNumber: 4,
        status: "Ready"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[0]._id, quantity: 1, price: 299 },
          { menuItem: menuItems[6]._id, quantity: 1, price: 149 }
        ],
        totalAmount: 448,
        customerName: "Karan",
        tableNumber: 5,
        status: "Delivered"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[5]._id, quantity: 3, price: 129 }
        ],
        totalAmount: 387,
        customerName: "Anjali",
        tableNumber: 6,
        status: "Pending"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[7]._id, quantity: 2, price: 99 }
        ],
        totalAmount: 198,
        customerName: "Vikram",
        tableNumber: 7,
        status: "Delivered"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[3]._id, quantity: 1, price: 249 },
          { menuItem: menuItems[2]._id, quantity: 1, price: 149 }
        ],
        totalAmount: 398,
        customerName: "Pooja",
        tableNumber: 8,
        status: "Cancelled"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[1]._id, quantity: 2, price: 199 }
        ],
        totalAmount: 398,
        customerName: "Suresh",
        tableNumber: 9,
        status: "Preparing"
      },
      {
        orderNumber: generateOrderNumber(),
        items: [
          { menuItem: menuItems[0]._id, quantity: 3, price: 299 }
        ],
        totalAmount: 897,
        customerName: "Ramesh",
        tableNumber: 10,
        status: "Ready"
      }
    ];

    await Order.insertMany(ordersData);

    console.log("🎉 Database seeded successfully with 10 orders");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
