import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },

    customerName: {
      type: String,
      trim: true,
    },

    tableNumber: {
      type: Number,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

/* 🔢 Auto-generate order number */
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }

});

const Order = mongoose.model("Order", orderSchema);

export default Order;
